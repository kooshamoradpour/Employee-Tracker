import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'default_user',
  password: process.env.DB_PASSWORD || 'default_password',
  database: process.env.DB_NAME || 'default_db',
  host: process.env.DB_HOST || 'localhost', 
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

const connectToDb = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to the database.');
    client.release(); 
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

export { pool, connectToDb };
