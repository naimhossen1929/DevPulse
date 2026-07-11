import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { sql } from "./db";
import { userRegistrationRoute } from "./modules/Authentication/User Registration/userRegistration.route";
import { userLoginRoute } from "./modules/Authentication/User Login/userLogin.route";
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

app.use("/api/auth/signup", userRegistrationRoute);

app.use("/api/auth", userLoginRoute);

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await sql.query(`
    SELECT * FROM users
    `);
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully!! ",
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

app.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
  } catch (error: any) {}
});

export default app;
