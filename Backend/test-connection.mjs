import sql from 'mssql';

const config = {
  user: 'sa',
  password: 'DMT@Education2024',
  server: 'localhost',
  database: 'master',
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

async function test() {
  try {
    console.log('Testing connection...');
    const pool = await sql.connect(config);
    console.log('✅ Connected!');
    const result = await pool.request().query('SELECT @@VERSION');
    console.log(result.recordset[0]);
    await pool.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

test();
