import express from "express";
import { commentController } from "../controllers/commentController.js";

import { loginRequired } from "../middlewares/loginRequired.js";

const commentRouter = express.Router();

//! Comment
commentRouter.post("/:id", loginRequired, commentController.createComment);
commentRouter.get("/:id/all", commentController.getPostComments);
commentRouter.post("/del/:id", loginRequired, commentController.deleteComment);

export { commentRouter };
