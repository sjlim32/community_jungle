import Post from "../schemas/postModel.js";
//! *** 게시글 목록 불러오기 *** !//
export const getPost = async (req, res) => {
  try {
    const post = await Post.find({})
    res.status(200).json(post);
  } catch (err) {
    console.error("getPost FAILED !!")    //debug//
    res.status(500).json({ message : `에러 코드 { ${err} }`})
  };
}

//! *** 게시글 하나만 불러오기 *** !//
export const getPostOne = async (req, res) => {
  console.log(req.params);      //debug//
  const post_id = req.params.id;
  try {
    const post = await Post.findOne({ _id: post_id })
    res.status(200).json(post);
  } catch (err) {
    console.error("getPost FAILED !!")      //debug//
    res.status(500).json({ message : `에러 코드 { ${err} }`})
  };
}

//! *** 게시글 등록 *** !//
export const createPost = async (req, res) => {
  const {title, content} = req.body
  const newPost = {
    title,
    content
  };

  try {
    const post = await Post.create(newPost);

    res.status(201).json(post);
  } catch (err) {
    console.error("createPost FAILED !!")     //debug//
    res.status(500).json({ message : `에러 코드 { ${err} }`})
  };
}

//! *** 포스트 수정 *** !//


//! *** 포스트 삭제 *** !//


//! *** 댓글 달기 *** !//

