import { sql } from "../../../db";
import type { Iuser } from "./userRegistration.interface";
import bcrypt from "bcryptjs";

const userRegistrationInToDB = async (payload: Iuser) => {
  const { name, email, password, role } = payload;

  const hashPassword = await bcrypt.hash(password, 12);

  const result = await sql.query(
    `
    INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *
    `,
    [name, email, hashPassword, role],
  );
  delete result.rows[0].password;
  return result;
};

export const userService = {
  userRegistrationInToDB,
};
