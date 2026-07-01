import { pool } from './database.js'

const createCarsTable = async () => {
  if (!pool) {
    console.log('PostgreSQL environment variables are missing. Add a server/.env file before resetting the database.')
    return
  }

  await pool.query(`
    DROP TABLE IF EXISTS custom_cars;

    CREATE TABLE custom_cars (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      color TEXT NOT NULL,
      wheels TEXT NOT NULL,
      package TEXT NOT NULL,
      accessory TEXT NOT NULL,
      price INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `)

  console.log('custom_cars table reset')
  await pool.end()
}

createCarsTable()
