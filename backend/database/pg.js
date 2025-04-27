import pg from "pg";
const { Client } = pg;
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "FiveSeconds",
  password: process.env.DB_PASSWORD || "riverside",
  port: process.env.DB_PORT || 5432,
});

await client.connect();
export default client;
