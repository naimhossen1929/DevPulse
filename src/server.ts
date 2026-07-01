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
  const { name, email, password } = req.body;
  res.status(201).json({
    message: "Created",
    data: {
      name,
      email,
    },
  });
});

const sql = neon(config.database_url);

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
