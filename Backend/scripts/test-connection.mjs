#!/usr/bin/env node

/**
 * Script to test SQL Server connection
 * Usage: node scripts/test-connection.mjs
 */

import sql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'DMTEducation2024',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'master',
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT !== 'false',
    enableArithAbort: true,
    connectTimeout: 10000
  }
};

async function testConnection() {
  console.log('🔌 Testing SQL Server Connection');
  console.log('='.repeat(60));
  console.log('\n📋 Configuration:');
  console.log(`   Server:   ${config.server}:${config.port}`);
  console.log(`   Database: ${config.database}`);
  console.log(`   User:     ${config.user}`);
  console.log(`   Password: ${'*'.repeat(config.password.length)}`);
  console.log(`   Encrypt:  ${config.options.encrypt}`);
  console.log(`   Trust Cert: ${config.options.trustServerCertificate}`);
  console.log('');

  let pool;
  
  try {
    console.log('⏳ Connecting...');
    pool = await sql.connect(config);
    console.log('✅ Connected successfully!\n');

    // Get SQL Server version
    console.log('📊 Server Information:');
    const version = await pool.request().query('SELECT @@VERSION AS version');
    const versionStr = version.recordset[0].version.split('\n')[0];
    console.log(`   ${versionStr}\n`);

    // List all databases
    console.log('📁 Available Databases:');
    const databases = await pool.request().query(`
      SELECT name, database_id, create_date, state_desc
      FROM sys.databases
      ORDER BY name
    `);
    databases.recordset.forEach((db, index) => {
      console.log(`   ${index + 1}. ${db.name} (${db.state_desc})`);
    });
    console.log('');

    // If connected to a specific database, show tables
    if (config.database !== 'master') {
      console.log('📊 Tables in \'' + config.database + '\':');
      const tables = await pool.request().query(
        'SELECT TABLE_SCHEMA, TABLE_NAME, TABLE_TYPE ' +
        'FROM INFORMATION_SCHEMA.TABLES ' +
        'WHERE TABLE_TYPE = \'BASE TABLE\' ' +
        'ORDER BY TABLE_NAME'
      );

      if (tables.recordset.length > 0) {
        tables.recordset.forEach((table, index) => {
          console.log('   ' + (index + 1) + '. ' + table.TABLE_SCHEMA + '.' + table.TABLE_NAME);
        });
      } else {
        console.log('   No tables found (database may be empty)');
      }
      console.log('');

      // Count records in some key tables
      const keyTables = ['users', 'roles', 'students', 'teachers', 'courses', 'classes'];
      console.log('📈 Record Counts:');
      
      for (const tableName of keyTables) {
        try {
          const result = await pool.request().query(
            'SELECT COUNT(*) as count FROM ' + tableName
          );
          console.log('   ' + tableName + ': ' + result.recordset[0].count + ' records');
        } catch (err) {
          console.log('   ' + tableName + ': Table not found or error');
        }
      }
      console.log('');
    }

    await pool.close();

    console.log('='.repeat(60));
    console.log('✅ Connection test passed!');
    console.log('='.repeat(60));
    console.log('');

  } catch (err) {
    console.error('\n❌ Connection failed!');
    console.error('Error:', err.message);
    
    if (err.code === 'ELOGIN') {
      console.error('\n💡 Hints:');
      console.error('   - Check username and password');
      console.error('   - Verify SQL Server authentication is enabled');
      console.error('   - Check if sa account is enabled');
    } else if (err.code === 'ESOCKET') {
      console.error('\n💡 Hints:');
      console.error('   - Check if SQL Server is running');
      console.error('   - Verify server address and port');
      console.error('   - Check firewall settings');
    }
    
    console.error('\nFull error:', err);
    process.exit(1);
  }
}

// Run the test
testConnection();
