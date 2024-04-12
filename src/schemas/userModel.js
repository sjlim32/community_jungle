import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
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

const User = model("User", UserSchema);

export default User;
