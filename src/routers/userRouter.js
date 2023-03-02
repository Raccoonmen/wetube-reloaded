import express from "express";
import {
  logout,
  getEdit,
  postEdit,
  see,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

/**users가 루트URL인  Router */
const userRouter = express.Router();

userRouter.get("/logout",protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start",publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware,finishGithubLogin);
userRouter.get("/:id(\\d+)", see);

export default userRouter;
