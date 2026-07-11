import { Router } from "express";
import { userLoginController } from "./userLogin.controller";

const router = Router();

router.post("/login", userLoginController.userLogin);

export const userLoginRoute = router;
