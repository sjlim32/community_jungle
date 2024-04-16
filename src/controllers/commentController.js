import { commentService } from "../services/index.js";
import { Types } from "mongoose";
import Post from "../schemas/postModel.js";
import User from "../schemas/userModel.js";

class CommentController {
  async createComment(req, res, next) {
    const post_id = req.params.id;
    const user_id = req.user.userCode;
    // console.log(`commnet - req.params`, post_id);
    console.log(`commnet - req.user`, typeof user_id);
    console.log(`commnet - req.body`, typeof req.body.writer_id);
    try {
      if (!Types.ObjectId.isValid(post_id)) throw new Error(`유효하지 않은 게시물 ID입니다.`);
      const post = await Post.findById(post_id);
      if (!post) throw new Error(`게시물 불러오기에 실패했습니다.`);

      if (req.body.writer_id !== user_id) throw new Error(`유효하지 않은 사용자입니다.`);
      const user = await User.findById(user_id);
      if (!user) throw new Error("사용자를 찾을 수 없습니다.");

      const commentInfo = {
        ...req.body,
        post_id: post_id,
      };

      req.data = await commentService.addComment(commentInfo);

      next();
    } catch (err) {
      next(err);
    }
  }

  async getPostComments(req, res, next) {
    console.log(`getPostComments`, req.params);
    const post_id = req.params.id;
    try {
      req.data = await commentService.getComments(post_id);
      next();
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req, res, next) {
    console.log(`removeComment One`, req.params);
    console.log(`removeComment Data`, req.body);
    const comment_id = req.params.id;
    const post_id = req.body.post_id;
    try {
      req.data = await commentService.deleteComment(comment_id, post_id);
      next();
    } catch (err) {
      next(err);
    }
  }
}

const commentController = new CommentController();

export { commentController };
