import { Router } from "express";
import { userController } from "./userRegistration.controller";

const router = Router();

router.post("/", userController.userRegistration);

export const userRegistrationRoute = router;
