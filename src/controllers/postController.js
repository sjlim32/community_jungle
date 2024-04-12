import Post from "../schemas/postModel.js";

//! *** 게시글 목록 불러오기 *** !//
export const getPost = async (req, res) => {
  console.log(`getAll { ${req.url}, ${req.originalUrl}, ${req.method} }`);
  try {
    const post = await Post.find({});
    res.status(200).json(post);
  } catch (err) {
    console.error("getPost FAILED !!"); //debug//
    res.status(500).json({ message: `에러 코드 { ${err} }` });
  }
};

//! *** 게시글 하나만 불러오기 *** !//
export const getPostOne = async (req, res) => {
  console.log("getOne = ", req.params); //debug//
  const post_id = req.params.id;
  try {
    const post = await Post.findOne({ _id: post_id });
    res.status(200).json(post);
  } catch (err) {
    console.error("getPost FAILED !!"); //debug//
    res.status(500).json({ message: `에러 코드 { ${err} }` });
  }
};

//! *** 게시글 등록 *** !//
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    title,
    content,
  };

  try {
    const post = await Post.create(newPost);

    res.status(201).json(post);
  } catch (err) {
    console.error("createPost FAILED !!"); //debug//
    res.status(500).json({ message: `에러 코드 { ${err} }` });
  }
};

//! *** 포스트 수정 *** !//
export const modifyPost = async (req, res) => {
  console.log("modifyOne = ", req.params); //debug//
  const post_id = req.params.id;
  const { title, content } = req.body;
  const updatedAt = Date.now() + 9 * 60 * 60 * 1000;

  try {
    const updatePost = await Post.findByIdAndUpdate(post_id, { title, content, updatedAt }, { new: true });

    res.status(200).json(updatePost);
  } catch (err) {
    console.error("modifyPost FAILED !!"); //debug//
    res.status(500).json({ message: `에러 코드 { ${err} }` });
  }
};

//! *** 포스트 삭제 *** !//
export const deletePost = async (req, res) => {
  console.log("deleteOne = ", req.params); //debug//
  const post_id = req.params.id;
  try {
    const post = await Post.deleteOne({ _id: post_id });
    res.status(200).json(post);
  } catch (err) {
    console.error("deltePost FAILED !!"); //debug//
    res.status(500).json({ message: `에러 코드 { ${err} }` });
  }
};

//! *** 댓글 달기 *** !//

