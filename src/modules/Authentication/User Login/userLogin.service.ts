import bcrypt from "bcryptjs";
import { sql } from "../../../db";
import type { Ipayload } from "./userLogin.interface";
import jwt from "jsonwebtoken";
import config from "../../../config";

const userLoginIntoDB = async (payload: Ipayload) => {
  const { email, password } = payload;

  // 1. Check if the user is exists
  // 2. Compare the password
  // 3. Generate the Token

  const userData = await sql.query(
    `
    SELECT * FROM users WHERE email = $1
    
    `,
    [email],
  );

  if (userData.rowCount === 0) {
    throw new Error("Invalid Credentials");
  }
  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid Credentials");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.secret, {
    expiresIn: "1d",
  });
  return { token, user };
};

export const userLoginService = {
  userLoginIntoDB,
};
