import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as API from "../../utils/api";

import GetPostOne from "../../components/Post/GetPostOne";

export default function CommunitySinglePage() {
  const [post, setPost] = useState("");
  const { post_id } = useParams();
  const navigate = useNavigate();

  //? 페이지 이동 시 보여줄 위치 지정 ?//
  window.scrollTo({ top: window.innerHeight / 5 });

  useEffect(() => {
    API.get(`/community/post/${post_id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert("게시물 정보를 받아오지 못했습니다. 😱");
      });
  }, [post_id]);

  const handleDelete = (e) => {
    e.preventDefault();

    try {
      const res = API.delete(`/community/post/${post_id}`);

      console.log(res); //debug//
      alert("게시물이 삭제되었습니다! 😇");
    } catch (err) {
      console.log(err.response.data); //debug//
      alert("게시물이 삭제되지 않았습니다. 🤯");
    }

    navigate("/main");
  };

  return (
    <article className="w-11/12 mx-auto">
      <div className="min-h-160 my-16 pb-8 bg-custom-dark rounded-2xl shadow-2xl shadow-custom-dark">
        <GetPostOne post={post} />
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