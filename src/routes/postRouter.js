import express from "express";
import { getPost, getPostOne, createPost, deletePost, modifyPost } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/", getPost);
postRouter.post("/", createPost);
postRouter.get("/:id", getPostOne);
postRouter.delete("/:id", deletePost);
postRouter.patch("/:id", modifyPost);

export { postRouter };