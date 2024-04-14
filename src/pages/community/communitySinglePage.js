import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as API from "../../utils/api";

import GetPostOne from "../../components/Post/GetPostOne";
import CreateComment from "../../components/Comment/createComment";
import GetPostComments from "../../components/Comment/getPostComments";

export default function CommunitySinglePage() {
  const [post, setPost] = useState("");
  const [user, setUser] = useState("");
  const [like, setLike] = useState(false);
  const [comments, setComments] = useState([]);

  const { postId } = useParams();
  const navigate = useNavigate();

  const fetchComments = useCallback(async () => {
    const res = await API.get(`/community/comment/${postId}/all`);
    console.log(`comment res data`, res.data); //debug//

    setComments(res.data);
  }, [postId]);

  //* 댓글 조회 api
  const fetchPost = useCallback(async () => {
    const res = await API.get(`/community/post/${postId}`);
    if (!res) throw new Error(res.data);

    console.log(`post res data`, res.data); //debug//
    setPost(res.data);
  }, [postId]);

  //* 최초 페이지 loading
  useEffect(() => {
    try {
      fetchPost();
      fetchComments();
    } catch (err) {
      console.log(err.response.data); //debug//
      alert(`${err.response.data}😱`);
      navigate("/main");
    }
  }, [fetchPost, fetchComments, navigate]);

  //* 최초 페이지 view
  useEffect(() => {
    window.scrollTo({ top: window.innerHeight / 3 });
  }, [post]);

  //* JS animation 옵션 - 좋아요 버튼
  useEffect(() => {
    if (localStorage.getItem("token")) {
      API.get("/community/user/username").then((res) => {
        setUser(res.data);
        console.log(`singlePage - useEffect(like) : `, res.data); //debug//
        setLike(res.data.likedPosts.includes(postId));
      });
    }
  }, [postId, like]);

  //* 댓글 등록 API
  const handleSubmit = useCallback(
    async (comment) => {
      const { commentContent, writer } = comment;
      console.log(`postId`, postId);

      try {
        const res = await API.post(`/community/comment/${postId}`, {
          writer: writer.name,
          content: commentContent,
          writer_id: writer._id,
        });

        console.log(res); //debug//
        toast.success("댓글이 등록되었습니다! 😁"); // Success 알림
        fetchComments();
      } catch (err) {
        console.log(err.response.data); //debug//
        if (err.response.status === 401) toast.error(`${err.response.data.reason} 🤯`);
        else toast.error(`${err.response.data} 🤯`);
      }
    },
    [postId, fetchComments]
  );

  //* 삭제 API
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await API.delete(`/community/post/${postId}`);
      console.log(`delete Post`, res); //debug//

      console.log(res); //debug//
      toast.success("게시물이 삭제되었습니다! 😇");
      navigate("/main");
    } catch (err) {
      console.log(`delete Err`, err.response); //debug
      if (err.response.status === 401) toast.error(`${err.response.data.reason} 🤯`);
      else toast.error(`${err.response.data} 🤯`);
    }
  };

  //* 좋아요 API
  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/community/post/like/${postId}`);
      if (!res) throw new Error(`게시물 좋아요 실패`);

      toast.success("게시물 좋아요 성공 !");
      setLike(true);
      fetchPost();
      // window.location.reload();
    } catch (err) {
      if (err.response.status === 401) toast.error(`${err.response.data.reason} 🤯`);
      else toast.error(`${err.response.data} 🤯`);
    }
  };

  //* 좋아요 취소 API
  const handleDisLike = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/community/post/dislike/${postId}`);
      if (!res) throw new Error(`게시물 좋아요 취소를 실패`);

      toast.success("게시물 좋아요 취소 !");
      setLike(false);
      fetchPost();
    } catch (err) {
      if (err.response.status === 401) toast.error(`${err.response.data.reason} 🤯`);
      else toast.error(`${err.response.data} 🤯`);
    }
  };

  return (
    <>
      <article className="w-11/12 min-h-160 mt-16 pb-8 mx-auto relative bg-custom-dark rounded-t-2xl shadow-2xl shadow-custom-dark">
        {like ? (
          <button
            className="absolute w-12 h-12 top-12 right-10 text-2xl border-2 border-red-800 bg-red-600 rounded-full
          lg:hover:scale-150 transition transform ease-in-out duration-500"
            onClick={handleDisLike}
          >
            ❤️
          </button>
        ) : (
          <button
            className="absolute w-12 h-12 top-12 right-10 text-2xl border-2 border-white rounded-full
              lg:hover:scale-150 transition transform ease-in-out duration-500"
            onClick={handleLike}
          >
            🤍
          </button>
        )}
        <GetPostOne postlike={like} post={post} />
        <section id="ButtonWrap" className="w-3/5 mx-auto mt-8 flex flex-row justify-around">
          <Link
            className="w-36 h-16 text-3xl flex justify-center items-center text-yellow-500
              border-2 rounded-2xl border-yellow-500 active:border-black
              transition duration-300 hover:text-custom-dark hover:bg-yellow-500 active:bg-gray"
            to="/main"
          >
            뒤로가기
          </Link>
          <Link
            className="w-36 h-16 text-3xl flex justify-center items-center text-yellow-500
              border-2 rounded-2xl border-yellow-500 active:border-black
              transition duration-300 hover:text-custom-dark hover:bg-yellow-500 active:bg-gray"
            to={`/main/post/modify/${postId}`}
          >
            수정하기
          </Link>
          <button
            className="w-36 h-16 text-3xl flex justify-center items-center text-yellow-500
              border-2 rounded-2xl border-yellow-500 active:border-black
              transition duration-300 hover:text-custom-dark hover:bg-yellow-500 active:bg-gray"
            onClick={handleDelete}
          >
            삭제하기
          </button>
        </section>
      </article>
      <ToastContainer
        position="top-center"
        style={{ width: "30rem", textAlign: "center" }}
        limit={2}
        closeButton={true}
        autoClose={2000}
        hideProgressBar
      />
      <div
        className="w-11/12 min-h-60 my-12 pb-12 mx-auto bg-custom-dark rounded-b-2xl shadow-2xl shadow-custom-dark
        flex flex-col"
      >
        <CreateComment user={user} onSubmit={handleSubmit} />
        <GetPostComments commentList={comments} />
      </div>
    </>
  );
}
