import type { Request, Response } from "express";
import { userLoginService } from "./userLogin.service";

const userLogin = async (req: Request, res: Response) => {
  try {
    const result = await userLoginService.userLoginIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userLoginController = {
  userLogin,
};
