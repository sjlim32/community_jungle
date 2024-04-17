import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
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

  //* 댓글 조회 api
  const fetchComments = useCallback(async () => {
    const res = await API.get(`/community/comment/${postId}/all`);
    setComments(res.data);
  }, [postId]);

  //* 게시글 조회 api
  const fetchPost = useCallback(async () => {
    try {
      const res = await API.get(`/community/post/${postId}`);
      if (!res) throw new Error(`댓글 조회 실패`);
      setPost(res.data);
    } catch (err) {
      if (err.response.status === 404) return alert(`${err.response.data} 😱`);
      alert(`${err.response.data.reason} 😱`);
    }
  }, [postId]);

  //* 최초 페이지 loading
  useEffect(() => {
    try {
      fetchPost();
      fetchComments();
    } catch (err) {
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
        setLike(res.data.likedPosts.includes(postId));
      });
    }
  }, [postId, like]);

  //* 댓글 등록 API
  const handleSubmit = useCallback(
    async (comment) => {
      const { commentContent, writer } = comment;

      try {
        const res = await API.post(`/community/comment/${postId}`, {
          writer: writer.name,
          content: commentContent,
          writer_id: writer._id,
        });
        if (!res) throw new Error(`댓글 등록 실패`);

        toast.success("댓글이 등록되었습니다! 😁"); // Success 알림
        fetchComments();
      } catch (err) {
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
      const res = await API.delete(`/community/post/del/${postId}`);
      if (!res) throw new Error(`게시물 삭제 실패`);

      toast.error("게시물이 삭제되었습니다! 😇");
      navigate("/main");
    } catch (err) {
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
      if (!res) throw new Error(`게시물 좋아요 취소 실패`);

      toast.error("게시물 좋아요 취소 !");
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
      <div
        className="w-11/12 min-h-60 my-12 pb-12 mx-auto bg-custom-dark rounded-b-2xl shadow-2xl shadow-custom-dark
        flex flex-col"
      >
        <CreateComment user={user} onSubmit={handleSubmit} />
        <GetPostComments getCommentList={fetchComments} commentList={comments} />
      </div>
    </>
  );
}
