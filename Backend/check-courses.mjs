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

async function checkCourses() {
  try {
    console.log('🔌 Connecting...');
    const pool = await sql.connect(config);
    console.log('✅ Connected!\n');

    // Get all courses
    const result = await pool.request().query(`
      SELECT id, code, name, thumbnail_url, students_count 
      FROM courses
    `);
    
    console.log(`📚 Found ${result.recordset.length} courses:\n`);
    result.recordset.forEach(course => {
      console.log(`  ${course.id}. [${course.code}] ${course.name}`);
      console.log(`     Thumbnail: ${course.thumbnail_url || 'NOT SET'}`);
      console.log(`     Students: ${course.students_count || 0}\n`);
    });
    
    await pool.close();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkCourses();
