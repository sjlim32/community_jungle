import Post from "../schemas/postModel.js";
import User from "../schemas/userModel.js";
import { Types } from "mongoose";

//! *** 게시글 목록 불러오기 *** !//
export const getPost = async (req, res) => {
  console.log(`getAll { ${req.url}, ${req.originalUrl}, ${req.method} }`); //debug//
  try {
    const posts = await Post.find({});
    if (!posts) throw new Error(`게시물 목록 불러오기에 실패했습니다.`);

    res.status(200).json(posts);
  } catch (err) {
    console.error("getPost FAILED !!"); //debug//
    res.status(500).json(err.message);
  }
};

//! *** 게시글 하나만 불러오기 *** !//
export const getPostOne = async (req, res) => {
  console.log("getOne = ", req.params); //debug//
  const post_id = req.params.id;
  try {
    if (!Types.ObjectId.isValid(post_id)) throw new Error(`유효하지 않은 게시물 ID입니다.`);

    const post = await Post.findOne({ _id: post_id });
    if (!post) throw new Error(`게시물 불러오기에 실패했습니다.`);

    res.status(200).json(post);
  } catch (err) {
    console.error("getPost FAILED !!"); //debug//
    res.status(500).json(err.message);
  }
};

//! *** 게시글 등록 *** !//
export const createPost = async (req, res) => {
  const { title, content, writer } = req.body;
  console.log(`body`, req.body);
  const newPost = {
    title,
    writer: writer.name,
    content,
    likes: 0,
    writer_id: writer._id,
  };

  try {
    const post = await Post.create(newPost);
    if (!post) throw new Error(`게시물 작성에 실패했습니다.`);

    res.status(201).json(post);
  } catch (err) {
    console.error("createPost FAILED !!"); //debug//
    res.status(401).json(err.message);
  }
};

//! *** 포스트 수정 *** !//
export const modifyPost = async (req, res) => {
  console.log("modifyOne = ", req.params); //debug//
  const post_id = req.params.id;
  const userToken = req.user;

  try {
    const user = await User.findById({ _id: userToken.userCode });
    const post = await Post.findById({ _id: post_id });

    if (user._id.toString() !== post.writer_id.toString()) throw new Error(`게시물 작성자 본인만 수정할 수 있습니다.`);

    const { title, content } = req.body;
    const updatedAt = Date.now() + 9 * 60 * 60 * 1000;
    const updatePost = await Post.findByIdAndUpdate(post_id, { title, content, updatedAt }, { new: true });
    if (!updatePost) throw new Error(`게시물 삭제에 실패했습니다.`);

    res.status(200).json(updatePost);
  } catch (err) {
    console.error("modifyPost FAILED !!"); //debug//
    res.status(401).json(err.message);
  }
};

//! *** 포스트 삭제 *** !//
export const deletePost = async (req, res) => {
  console.log("deleteOne = ", req.params); //debug//
  const post_id = req.params.id;
  const userToken = req.user;

  try {
    const user = await User.findById({ _id: userToken.userCode });
    const post = await Post.findById({ _id: post_id });

    if (user._id.toString() !== post.writer_id.toString()) throw new Error(`게시물 작성자 본인만 삭제할 수 있습니다.`);

    const deletePost = await Post.deleteOne({ _id: post_id });
    if (!deletePost) throw new Error(`게시물 삭제에 실패했습니다.`);

    res.status(200).json(deletePost);
  } catch (err) {
    console.error("deltePost - Failed"); //debug//
    res.status(401).json(err.message);
  }
};

//! *** 게시물 좋아요 *** !//
export const addLike = async (req, res) => {
  console.log("likePost = ", req.params); //debug//
  const post_id = req.params.id;
  const userToken = req.user;

  try {
    if (!Types.ObjectId.isValid(post_id)) throw new Error(`유효하지 않은 게시물 ID입니다.`);

    const user = await User.findById(userToken.userCode);
    if (!user) throw new Error("사용자를 찾을 수 없습니다.");

    if (user.likedPosts.includes(post_id)) throw new Error("이미 좋아요를 누른 게시물입니다.");

    const post = await Post.findById(post_id);
    if (!post) throw new Error(`게시물 불러오기에 실패했습니다.`);

    post.likes += 1;
    const updatePost = await post.save();
    if (!updatePost) throw new Error(`게시물 좋아요에 실패했습니다.`);

    user.likedPosts.push(post_id);
    const updateUser = await user.save();
    if (!updateUser) throw new Error(`유저의 게시물 좋아요 정보 업데이트에 실패했습니다.`);

    res.status(200).json(updatePost);
  } catch (err) {
    console.error("listPost - Failed"); //debug//
    res.status(400).json(err.message);
  }
};

export const removeLike = async (req, res) => {
  console.log("removeLike = ", req.params); //debug//
  const post_id = req.params.id;
  const userToken = req.user;

  try {
    if (!Types.ObjectId.isValid(post_id)) throw new Error(`유효하지 않은 게시물 ID입니다.`);

    const user = await User.findById(userToken.userCode);
    if (!user) throw new Error("사용자를 찾을 수 없습니다.");

    if (!user.likedPosts.includes(post_id)) throw new Error("좋아요를 누르지 않은 게시물입니다.");

    const post = await Post.findById(post_id);
    if (!post) throw new Error(`게시물 불러오기에 실패했습니다.`);

    post.likes -= 1;
    const updatePost = await post.save();
    if (!updatePost) throw new Error(`게시물 좋아요 취소에 실패했습니다.`);

    user.likedPosts = user.likedPosts.filter((likedPostId) => likedPostId.toString() !== post_id.toString());
    const updateUser = await user.save();
    if (!updateUser) throw new Error(`유저의 게시물 좋아요 정보 업데이트에 실패했습니다.`);

    res.status(200).json(updatePost);
  } catch (err) {
    console.error("removeLike - Failed"); //debug//
    res.status(400).json(err.message);
  }
};

//! *** 댓글 달기 *** !//