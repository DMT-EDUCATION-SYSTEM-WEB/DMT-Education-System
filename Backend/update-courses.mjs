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
  password: process.env.DB_PASSWORD || '123',
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

async function updateCourses() {
  try {
    console.log('🔌 Connecting to SQL Server...');
    const pool = await sql.connect(config);
    console.log('✅ Connected successfully!\n');

    // Update existing courses with thumbnails
    console.log('📸 Updating course thumbnails...');
    
    const updates = [
      { pattern: '%Toán%THCS%', url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop' },
      { pattern: '%Toán%THPT%', url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&h=450&fit=crop' },
      { pattern: '%Văn%THCS%', url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop' },
      { pattern: '%Văn%THPT%', url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=450&fit=crop' },
      { pattern: '%Anh%THCS%', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=450&fit=crop' },
      { pattern: '%Lý%THCS%', url: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=450&fit=crop' },
      { pattern: '%Lý%THPT%', url: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&h=450&fit=crop' },
      { pattern: '%Hóa%THCS%', url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop' },
      { pattern: '%Hóa%THPT%', url: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&h=450&fit=crop' },
      { pattern: '%Sinh%THCS%', url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=450&fit=crop' },
      { pattern: '%Sinh%THPT%', url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=450&fit=crop' },
      { pattern: '%Sử%', url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&h=450&fit=crop' },
      { pattern: '%Địa%', url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=450&fit=crop' },
      { pattern: '%GDCD%', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop' },
      { pattern: '%iSMART%', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=450&fit=crop' },
      { pattern: '%giỏi%', url: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=800&h=450&fit=crop' }
    ];

    for (const update of updates) {
      const result = await pool.request()
        .input('pattern', sql.NVarChar, update.pattern)
        .input('url', sql.NVarChar, update.url)
        .query('UPDATE courses SET thumbnail_url = @url WHERE name LIKE @pattern');
      if (result.rowsAffected[0] > 0) {
        console.log(`  ✓ Updated ${result.rowsAffected[0]} course(s) matching "${update.pattern}"`);
      }
    }

    console.log('\n✅ Thumbnail updates completed!');
    
    // Get current course count
    const countResult = await pool.request().query('SELECT COUNT(*) as total FROM courses');
    console.log(`\n📊 Current total courses: ${countResult.recordset[0].total}`);
    
    await pool.close();
    console.log('\n🎉 Done!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code) console.error('   Code:', error.code);
    process.exit(1);
  }
}

updateCourses();
