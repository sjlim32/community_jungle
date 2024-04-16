import { model, Schema } from "mongoose";

const CommentSchema = new Schema({
  writer: {
    type: String,
    maxLength: 20,
    required: true,
  },
  content: {
    type: String,
    maxLength: 150,
    required: true,
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  writer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    requierd: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now() + 9 * 60 * 60 * 1000, // 서버의 시간대 설정에 의존
  },
});

const Comment = model("Comment", CommentSchema);

export default Comment;
