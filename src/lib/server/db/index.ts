import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const pool = mysql.createPool({
  uri: env.DATABASE_URL,
  connectionLimit: 10, // Több kapcsolat kezelése
});

export const db = drizzle(pool);
