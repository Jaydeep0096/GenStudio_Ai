import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(`${process.env.DATABASE_URL}`);
// console.log("DB URL:", process.env.DATABASES_URL);

export default sql; 
