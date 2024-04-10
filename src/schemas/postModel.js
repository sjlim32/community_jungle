import { model, Schema } from "mongoose";

const PostSchema = new Schema (
  {
    title : {
      type: String,
      required: true,
    },
    content : {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true 
  }
)

const Post = model("Post", PostSchema);

export default Post;