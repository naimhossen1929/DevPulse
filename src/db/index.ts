import { Pool } from "pg";
import config from "../config";

export const sql = new Pool({ connectionString: config.database_url });

export const initDB = async () => {
  try {
    await sql.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(20) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(15) DEFAULT 'contributor',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);
    /* await sql`
    CREATE TABLE IF NOT EXISTS issues(
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT CHECK (LENGTH(description) >= 20),
    status VARCHAR(20) DEFAULT 'open',
    
    )    
    `; */

    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
