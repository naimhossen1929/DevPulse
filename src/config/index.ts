import dotenv from "dotenv";
dotenv.config({ quiet: true });
const config = {
  port: process.env.PORT as string,
  database_url: process.env.CONNECTION_STRING as string,
  secret: process.env.JWT_SECRET as string,
};

export default config;
