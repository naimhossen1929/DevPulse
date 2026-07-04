import { neon } from "@neondatabase/serverless";
import config from "../config";

export const sql = neon(config.database_url);

export const initDB = async () => {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(20) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    role VARCHAR(15) DEFAULT 'contributor',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `;
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
