import express from "express";
import {
  getPost,
  getPostOne,
  createPost,
  deletePost,
  modifyPost,
  addLike,
  removeLike,
} from "../controllers/postController.js";
import { loginRequired } from "../middlewares/loginRequired.js";

const postRouter = express.Router();

//! Posts
postRouter.get("/", getPost);
postRouter.post("/", loginRequired, createPost);
postRouter.get("/:id", getPostOne);
postRouter.delete("/del/:id", loginRequired, deletePost);
postRouter.patch("/:id", loginRequired, modifyPost);

//! Likes
postRouter.post("/like/:id", loginRequired, addLike);
postRouter.post("/dislike/:id", loginRequired, removeLike);

export { postRouter };