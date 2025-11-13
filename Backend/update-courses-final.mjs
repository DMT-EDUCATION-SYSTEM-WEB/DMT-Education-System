import sql from 'mssql';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const config = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'DMT_EDUCATION_SYSTEM',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

async function addColumnsAndUpdateCourses() {
  try {
    console.log('🔌 Connecting to SQL Server...');
    const pool = await sql.connect(config);
    console.log('✅ Connected successfully!\n');

    // Add thumbnail_url column if it doesn't exist
    console.log('📋 Adding thumbnail_url column...');
    try {
      await pool.request().query(`
        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
                      WHERE TABLE_NAME = 'courses' AND COLUMN_NAME = 'thumbnail_url')
        BEGIN
          ALTER TABLE courses ADD thumbnail_url NVARCHAR(500) NULL;
          PRINT '  ✓ Added thumbnail_url column';
        END
        ELSE
        BEGIN
          PRINT '  ℹ thumbnail_url column already exists';
        END
      `);
    } catch (e) {
      console.log('  ℹ Column may already exist');
    }

    // Add students_count column if it doesn't exist
    console.log('📋 Adding students_count column...');
    try {
      await pool.request().query(`
        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
                      WHERE TABLE_NAME = 'courses' AND COLUMN_NAME = 'students_count')
        BEGIN
          ALTER TABLE courses ADD students_count INT DEFAULT 0;
          PRINT '  ✓ Added students_count column';
        END
        ELSE
        BEGIN
          PRINT '  ℹ students_count column already exists';
        END
      `);
    } catch (e) {
      console.log('  ℹ Column may already exist');
    }

    console.log('\n📸 Updating course thumbnails and student counts...');
    
    const updates = [
      { pattern: '%Toán%THCS%', url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop', students: 320 },
      { pattern: '%Toán%THPT%', url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&h=450&fit=crop', students: 280 },
      { pattern: '%Toán%Lớp 6%', url: 'https://images.unsplash.com/photo-1509869175650-a1d97972541a?w=800&h=450&fit=crop', students: 156 },
      { pattern: '%Toán%Lớp 7%', url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&h=450&fit=crop', students: 142 },
      { pattern: '%Toán%Lớp 8%', url: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?w=800&h=450&fit=crop', students: 168 },
      { pattern: '%Toán%Lớp 9%', url: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800&h=450&fit=crop', students: 245 },
      { pattern: '%Toán%Lớp 10%', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop', students: 198 },
      { pattern: '%Toán%Lớp 11%', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=450&fit=crop', students: 176 },
      { pattern: '%Toán%Lớp 12%', url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&h=450&fit=crop', students: 312 },
      { pattern: '%Văn%THCS%', url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop', students: 290 },
      { pattern: '%Văn%THPT%', url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=450&fit=crop', students: 260 },
      { pattern: '%Anh%THCS%', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=450&fit=crop', students: 340 },
      { pattern: '%Anh%THPT%', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop', students: 310 },
      { pattern: '%Anh%Lớp 6%', url: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=450&fit=crop', students: 189 },
      { pattern: '%Anh%Lớp 7%', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop', students: 167 },
      { pattern: '%Anh%Lớp 8%', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop', students: 145 },
      { pattern: '%Anh%Lớp 9%', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=450&fit=crop', students: 234 },
      { pattern: '%IELTS%Foundation%', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop', students: 98 },
      { pattern: '%IELTS%Intermediate%', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop', students: 156 },
      { pattern: '%IELTS%Advanced%', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop', students: 87 },
      { pattern: '%Lý%THCS%', url: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=450&fit=crop', students: 270 },
      { pattern: '%Lý%THPT%', url: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&h=450&fit=crop', students: 240 },
      { pattern: '%Lý%Lớp 6%', url: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=450&fit=crop', students: 134 },
      { pattern: '%Lý%Lớp 8%', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=450&fit=crop', students: 123 },
      { pattern: '%Lý%Lớp 9%', url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop', students: 156 },
      { pattern: '%Hóa%THCS%', url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop', students: 250 },
      { pattern: '%Hóa%THPT%', url: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&h=450&fit=crop', students: 220 },
      { pattern: '%Hóa%Lớp 8%', url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop', students: 112 },
      { pattern: '%Hóa%Lớp 9%', url: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&h=450&fit=crop', students: 145 },
      { pattern: '%Hóa%Lớp 10%', url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop', students: 134 },
      { pattern: '%Sinh%THCS%', url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=450&fit=crop', students: 230 },
      { pattern: '%Sinh%THPT%', url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=450&fit=crop', students: 210 },
      { pattern: '%Sinh%Lớp 6%', url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=450&fit=crop', students: 98 },
      { pattern: '%Sinh%Lớp 9%', url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=450&fit=crop', students: 123 },
      { pattern: '%Sinh%Lớp 12%', url: 'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=800&h=450&fit=crop', students: 187 },
      { pattern: '%Sử%', url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&h=450&fit=crop', students: 180 },
      { pattern: '%Địa%', url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=450&fit=crop', students: 170 },
      { pattern: '%GDCD%', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop', students: 150 },
      { pattern: '%iSMART%', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=450&fit=crop', students: 200 },
      { pattern: '%giỏi%', url: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=800&h=450&fit=crop', students: 120 }
    ];

    let totalUpdated = 0;
    for (const update of updates) {
      const result = await pool.request()
        .input('pattern', sql.NVarChar, update.pattern)
        .input('url', sql.NVarChar, update.url)
        .input('students', sql.Int, update.students)
        .query('UPDATE courses SET thumbnail_url = @url, students_count = @students WHERE name LIKE @pattern');
      if (result.rowsAffected[0] > 0) {
        console.log(`  ✓ Updated ${result.rowsAffected[0]} course(s) matching "${update.pattern}"`);
        totalUpdated += result.rowsAffected[0];
      }
    }

    console.log(`\n✅ Total ${totalUpdated} courses updated!`);
    
    // Get current course count
    const countResult = await pool.request().query('SELECT COUNT(*) as total FROM courses');
    console.log(`\n📊 Current total courses: ${countResult.recordset[0].total}`);
    
    // Show sample of updated courses
    const sampleResult = await pool.request().query(`
      SELECT TOP 5 name, thumbnail_url, students_count 
      FROM courses 
      WHERE thumbnail_url IS NOT NULL
      ORDER BY id
    `);
    console.log('\n📋 Sample updated courses:');
    sampleResult.recordset.forEach(course => {
      console.log(`  - ${course.name} (${course.students_count} students)`);
    });
    
    await pool.close();
    console.log('\n🎉 Done!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code) console.error('   Code:', error.code);
    process.exit(1);
  }
}

addColumnsAndUpdateCourses();
