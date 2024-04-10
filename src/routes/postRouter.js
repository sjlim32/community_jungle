import express from "express";
import { getPost, getPostOne,  createPost } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get('/post', getPost);
postRouter.get('/post/:id', getPostOne);
postRouter.post('/post', createPost);

export { postRouter };