import { model, Schema } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    maxLength: 50,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    trim: true,
    maxLength: 500,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  writer_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  totalComments: {
    type: Number,
    default: 0,
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
