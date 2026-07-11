import type { Request, Response } from "express";

import { userService } from "./userRegistration.service";

const userRegistration = async (req: Request, res: Response) => {
  // console.log(req.body);
  //   const { name, email, password, role } = req.body;
  try {
    const result = await userService.userRegistrationInToDB(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  userRegistration,
};
