import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const envValues = [
  process.env.PGUSER,
  process.env.PGPASSWORD,
  process.env.PGHOST,
  process.env.PGPORT,
  process.env.PGDATABASE
]

const hasPostgresConfig = envValues.every((value) => {
  return value && !String(value).includes('your_render_')
})

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false
  }
}

export const pool = hasPostgresConfig ? new pg.Pool(config) : null
export const usingPostgres = hasPostgresConfig
