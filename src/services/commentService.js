import Comment from "../schemas/commentModel.js";
import Post from "../schemas/postModel.js";

//! *** 댓글 달기 *** !//
class CommentService {
  constructor(Comment) {
    this.Comment = Comment;
  }

  async addComment(commentInfo) {
    console.log(`Comment Info = { ${commentInfo.content}}`); //debug//
    const { writer, content, post_id, writer_id } = commentInfo;
    const newComment = {
      writer,
      content,
      post_id,
      writer_id,
    };

    const comment = await Comment.create(newComment);
    if (!comment) throw new Error(`DB에 댓글을 저장하지 못했습니다.`);

    const setTotalCommentsInc = await Post.findByIdAndUpdate(post_id, { $inc: { totalComments: 1 } });
    if (!setTotalCommentsInc) throw new Error(`DB에 게시물 정보를 업데이트하지 못했습니다.`);

    return comment;
  }

  async getComments(post_id) {
    const commentList = await Comment.find({ post_id: post_id });
    return commentList;
  }

  async deleteComment(comment_id, post_id) {
    const res = await Comment.deleteOne({ _id: comment_id });
    if (!res) throw new Error(`DB에서 댓글을 삭제하지 못했습니다.`);

    const setTotalCommentsDec = await Post.findByIdAndUpdate(post_id, { $inc: { totalComments: -1 } });
    if (!setTotalCommentsDec) throw new Error(`DB에 게시물 정보를 업데이트하지 못했습니다.`);

    return res;
  }
}

const commentService = new CommentService(Comment);

export { commentService };
