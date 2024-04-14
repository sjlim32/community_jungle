import express from "express";
import { userController } from "../controllers/userController.js";
import { loginRequired } from "../middlewares/loginRequired.js";

const userRouter = express.Router();

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.signIn);
userRouter.get("/username", loginRequired, userController.getUserName);

export { userRouter };
