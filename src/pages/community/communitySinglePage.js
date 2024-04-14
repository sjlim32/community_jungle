import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as API from "../../utils/api";

import GetPostOne from "../../components/Post/GetPostOne";

export default function CommunitySinglePage() {
  const [post, setPost] = useState("");
  const [like, setLike] = useState(false);

  const { post_id } = useParams();

  const navigate = useNavigate();
  //* 페이지 최초 위치 설정
  useEffect(() => {
    window.scrollTo({ top: window.innerHeight / 3 });
  }, [post]);

  //* 좋아요 버튼 갱신
  useEffect(() => {
    API.get("/community/user/username").then((res) => {
      setLike(res.data.likedPosts.includes(post_id));
      console.log(`setLike`, like);
    });
  }, [like, post_id]);

  useEffect(() => {
    API.get(`/community/post/${post_id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err.response.data); //debug//
        alert(`${err.response.data}😱`);
        navigate("/main");
      });
  }, [post_id, navigate]);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await API.delete(`/community/post/${post_id}`);
      console.log(`delete Post`, res); //debug//

      console.log(res); //debug//
      alert("게시물이 삭제되었습니다! 😇");
      navigate("/main");
    } catch (err) {
      alert(`${err.response.data} 🤯`);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(`/community/post/like/${post_id}`);
      if (!res) throw new Error(`게시물 좋아요 실패`);

      alert("게시물 좋아요 성공 !");
      setLike(true);
    } catch (err) {
      alert(`${err.response.data}`);
    }
  };

  const handleDisLike = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/community/post/dislike/${post_id}`);
      if (!res) throw new Error(`게시물 좋아요 취소를 실패`);

      alert("게시물 좋아요 취소 !");
      setLike(false);
    } catch (err) {
      alert(`${err.response.data}`);
    }
  };

  return (
    <article className="w-11/12 mx-auto relative">
      <div className="min-h-160 my-16 pb-8 bg-custom-dark rounded-2xl shadow-2xl shadow-custom-dark">
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
            to={`/main/post/modify/${post_id}`}
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
      </div>
    </article>
  );
}