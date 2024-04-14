import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  id: {
    type: String,
    maxLength: 30,
    unique: true,
    required: true,
  },
  nickname: {
    type: String,
    maxLength: 20,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  likedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  createdAt: {
    type: Date,
    default: () => Date.now() + 9 * 60 * 60 * 1000, // 서버의 시간대 설정에 의존
  },
  updatedAt: {
    type: Date,
    default: () => Date.now() + 9 * 60 * 60 * 1000, // 서버의 시간대 설정에 의존
  },
});

const User = model("User", UserSchema);

export default User;
