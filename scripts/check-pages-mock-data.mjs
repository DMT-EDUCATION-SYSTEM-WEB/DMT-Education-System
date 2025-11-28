#!/usr/bin/env node

/**
 * Check All Pages for Mock Data Usage
 * Scans src/pages and src/components for mock data usage
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m'
};

const log = (msg, color = 'reset') => console.log(colors[color] + msg + colors.reset);

function findFiles(dir, extension = '.tsx', excludeDirs = ['node_modules', '.git', 'dist']) {
  const files = [];
  
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    if (excludeDirs.includes(item)) continue;
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findFiles(fullPath, extension, excludeDirs));
    } else if (item.endsWith(extension)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(path.resolve(__dirname, '..'), filePath);
  const fileName = path.basename(filePath);
  
  const analysis = {
    file: fileName,
    path: relativePath,
    hasMockData: false,
    hasAPICall: false,
    hasFallback: false,
    mockDataLines: [],
    apiCalls: [],
    apiImports: [],
    dataSource: 'UNKNOWN'
  };
  
  // Check for mock data patterns
  const mockPatterns = [
    /const\s+(mock|original)\w+\s*[:=]\s*\[/gi,
    /mockData|MOCK_DATA|mock_data|getMock\w+/gi,
    /\/\/\s*Mock|Legacy mock|mock courses|mock teachers/gi,
    /const\s+\w+\s*=\s*\[[\s\S]{100,}?\{[\s\S]{50,}?id:\s*\d+/g  // Large static arrays
  ];
  
  for (const pattern of mockPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      analysis.hasMockData = true;
      analysis.mockDataLines.push(...matches);
    }
  }
  
  // Check for API imports
  const apiImportPatterns = [
    /import.*from.*['"]\.\.\/services\/(publicApi|academic|auth)/gi,
    /import.*\{.*Api.*\}.*from/gi,
    /publicTeachersApi|publicCoursesApi|teachersApi|coursesApi/gi
  ];
  
  for (const pattern of apiImportPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      analysis.hasAPICall = true;
      analysis.apiImports.push(...matches);
    }
  }
  
  // Check for API calls
  const apiCallPatterns = [
    /\.getAll\(|\.getById\(|\.get\(|\.post\(|\.put\(|\.delete\(/g,
    /publicTeachersApi\.|publicCoursesApi\.|teachersApi\.|coursesApi\./g,
    /await.*Api\.\w+\(/g
  ];
  
  for (const pattern of apiCallPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      analysis.hasAPICall = true;
      analysis.apiCalls.push(...matches);
    }
  }
  
  // Check for fallback pattern
  const fallbackPatterns = [
    /catch.*\{[\s\S]*?(setTeachers|setCourses|setData)\(.*mock/gi,
    /catch.*\{[\s\S]*?getMock\w+\(/gi,
    /catch.*\{[\s\S]*?original\w+/gi
  ];
  
  for (const pattern of fallbackPatterns) {
    if (pattern.test(content)) {
      analysis.hasFallback = true;
      break;
    }
  }
  
  // Determine data source
  if (analysis.hasAPICall && analysis.hasFallback) {
    analysis.dataSource = 'API_WITH_FALLBACK';
  } else if (analysis.hasAPICall && !analysis.hasMockData) {
    analysis.dataSource = 'API_ONLY';
  } else if (analysis.hasMockData && !analysis.hasAPICall) {
    analysis.dataSource = 'MOCK_ONLY';
  } else if (analysis.hasMockData && analysis.hasAPICall) {
    analysis.dataSource = 'MIXED';
  } else {
    analysis.dataSource = 'NONE';
  }
  
  return analysis;
}

function analyzeDirectory(dirName, dirPath) {
  log(`\n${'='.repeat(70)}`, 'cyan');
  log(`${dirName.toUpperCase()} PAGES ANALYSIS`, 'cyan');
  log('='.repeat(70), 'cyan');
  
  const files = findFiles(dirPath, '.tsx');
  
  if (files.length === 0) {
    log(`\n⚠️  No files found in ${dirPath}`, 'yellow');
    return { summary: null, results: [] };
  }
  
  log(`\n📄 Found ${files.length} files\n`, 'blue');
  
  const summary = {
    total: files.length,
    apiOnly: 0,
    apiWithFallback: 0,
    mockOnly: 0,
    mixed: 0,
    none: 0
  };
  
  const results = [];
  
  for (const file of files) {
    const analysis = analyzeFile(file);
    results.push(analysis);
    
    let status = '';
    let statusColor = 'gray';
    
    switch (analysis.dataSource) {
      case 'API_WITH_FALLBACK':
        status = '✅ API + Fallback';
        statusColor = 'green';
        summary.apiWithFallback++;
        break;
      case 'API_ONLY':
        status = '✅ API Only';
        statusColor = 'green';
        summary.apiOnly++;
        break;
      case 'MOCK_ONLY':
        status = '❌ Mock Data Only';
        statusColor = 'red';
        summary.mockOnly++;
        break;
      case 'MIXED':
        status = '⚠️  Mixed (needs review)';
        statusColor = 'yellow';
        summary.mixed++;
        break;
      case 'NONE':
        status = '⚪ No data source';
        statusColor = 'gray';
        summary.none++;
        break;
    }
    
    log(`${status.padEnd(25)} ${analysis.file}`, statusColor);
    
    if (analysis.apiCalls.length > 0) {
      const uniqueCalls = [...new Set(analysis.apiCalls)].slice(0, 3);
      log(`   API Calls: ${uniqueCalls.join(', ')}`, 'gray');
    }
    
    if (analysis.mockDataLines.length > 0 && (analysis.dataSource === 'MOCK_ONLY' || analysis.dataSource === 'MIXED')) {
      const uniqueMocks = [...new Set(analysis.mockDataLines)].slice(0, 2);
      log(`   Mock Data: ${uniqueMocks.join(', ')}`, 'gray');
    }
    
    if (analysis.path) {
      log(`   Path: ${analysis.path}`, 'gray');
    }
  }
  
  // Print summary
  log(`\n📊 SUMMARY for ${dirName}:`, 'cyan');
  log(`   Total Files: ${summary.total}`, 'blue');
  log(`   ✅ API + Fallback: ${summary.apiWithFallback}`, 'green');
  log(`   ✅ API Only: ${summary.apiOnly}`, 'green');
  log(`   ❌ Mock Only: ${summary.mockOnly}`, 'red');
  log(`   ⚠️  Mixed: ${summary.mixed}`, 'yellow');
  log(`   ⚪ No Data: ${summary.none}`, 'gray');
  
  const apiIntegrated = summary.apiOnly + summary.apiWithFallback;
  const percentage = summary.total > 0 ? ((apiIntegrated / summary.total) * 100).toFixed(1) : 0;
  
  if (percentage >= 80) {
    log(`   Integration: ${percentage}% ✅`, 'green');
  } else if (percentage >= 50) {
    log(`   Integration: ${percentage}% ⚠️`, 'yellow');
  } else {
    log(`   Integration: ${percentage}% ❌`, 'red');
  }
  
  return { summary, results };
}

async function main() {
  console.log('\n');
  log('╔════════════════════════════════════════════════════════════════════╗', 'cyan');
  log('║          PAGES MOCK DATA DETECTION SCAN                           ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════════════╝', 'cyan');
  
  const projectRoot = path.resolve(__dirname, '..');
  const srcPath = path.join(projectRoot, 'src');
  
  const directories = [
    { name: 'Pages', path: path.join(srcPath, 'pages') },
    { name: 'Home Components', path: path.join(srcPath, 'components', 'home') },
    { name: 'Courses Components', path: path.join(srcPath, 'components', 'courses') },
  ];
  
  const allResults = {};
  
  for (const dir of directories) {
    if (fs.existsSync(dir.path)) {
      allResults[dir.name] = analyzeDirectory(dir.name, dir.path);
    } else {
      log(`\n⚠️  Directory not found: ${dir.path}`, 'yellow');
    }
  }
  
  // Overall summary
  log(`\n${'='.repeat(70)}`, 'cyan');
  log('OVERALL SUMMARY', 'cyan');
  log('='.repeat(70), 'cyan');
  
  let totalFiles = 0;
  let totalAPIIntegrated = 0;
  let totalMockOnly = 0;
  let totalMixed = 0;
  
  for (const [dirName, result] of Object.entries(allResults)) {
    if (!result || !result.summary) continue;
    
    const s = result.summary;
    totalFiles += s.total;
    totalAPIIntegrated += (s.apiOnly + s.apiWithFallback);
    totalMockOnly += s.mockOnly;
    totalMixed += s.mixed;
  }
  
  const overallIntegration = totalFiles > 0 ? ((totalAPIIntegrated / totalFiles) * 100).toFixed(1) : 0;
  
  log('\nOverall Statistics:', 'blue');
  log(`   Total Files: ${totalFiles}`, 'cyan');
  log(`   ✅ API Integrated: ${totalAPIIntegrated} (${overallIntegration}%)`, 'green');
  log(`   ❌ Mock Only: ${totalMockOnly}`, 'red');
  log(`   ⚠️  Mixed/Review: ${totalMixed}`, 'yellow');
  
  // List files that need attention
  log('\n📋 Files Needing Attention:', 'yellow');
  
  for (const [dirName, result] of Object.entries(allResults)) {
    if (!result || !result.results) continue;
    
    const mockOnlyFiles = result.results.filter(r => r.dataSource === 'MOCK_ONLY');
    const mixedFiles = result.results.filter(r => r.dataSource === 'MIXED');
    
    if (mockOnlyFiles.length > 0) {
      log(`\n${dirName} - Mock Only (${mockOnlyFiles.length}):`, 'red');
      mockOnlyFiles.forEach(file => {
        log(`   • ${file.file}`, 'gray');
      });
    }
    
    if (mixedFiles.length > 0) {
      log(`\n${dirName} - Mixed (${mixedFiles.length}):`, 'yellow');
      mixedFiles.forEach(file => {
        log(`   • ${file.file}`, 'gray');
      });
    }
  }
  
  if (overallIntegration >= 90) {
    log('\n🎉 EXCELLENT! Most pages are using real API data', 'green');
  } else if (overallIntegration >= 70) {
    log('\n👍 GOOD! Most pages are using real data', 'green');
  } else if (overallIntegration >= 50) {
    log('\n⚠️  MODERATE: Some pages still using mock data', 'yellow');
  } else {
    log('\n❌ NEEDS WORK: Many pages are still using mock data', 'red');
  }
  
  log('\n' + '='.repeat(70) + '\n', 'cyan');
}

main().catch(error => {
  log(`\n❌ Error: ${error.message}\n`, 'red');
  console.error(error);
  process.exit(1);
});





