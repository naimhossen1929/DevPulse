import { sql } from "../../../db";
import type { Iuser } from "./userRegistration.interface";

const userRegistrationInToDB = async (payload: Iuser) => {
  const { name, email, password, role } = payload;

  const result = await sql`
    INSERT INTO users(name,email,password,role) VALUES(${name},${email},${password},${role}) RETURNING *
    `;

  return result;
};

export const userService = {
  userRegistrationInToDB,
};
