import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config";
import { neon } from "@neondatabase/serverless";
const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "DevPulse Server",
    author: "Naim Hossen",
  });
});
app.post("/", async (req: Request, res: Response) => {
  // console.log(req.body);
  const { name, email, password, role } = req.body;
  try {
    const result = await sql`
    INSERT INTO users(name,email,password,role) VALUES(${name},${email},${password},${role}) RETURNING *
    `;
    console.log(result);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

const sql = neon(config.database_url);

const initDB = async () => {
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
initDB();

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
