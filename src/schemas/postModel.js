import { model, Schema } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now() + 9 * 60 * 60 * 1000, // 서버의 시간대 설정에 의존
  },
  updatedAt: {
    type: Date,
    default: () => Date.now() + 9 * 60 * 60 * 1000, // 서버의 시간대 설정에 의존
  },
});

const Post = model("Post", PostSchema);

export default Post;
