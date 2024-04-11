import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as API from "../../utils/api";

import GetPostOne from "../../components/Post/GetPostOne";

export default function CommunitySinglePage() {
  const [post, setPost] = useState("");
  const { post_id } = useParams();

  useEffect(() => {
    API.get(`/post/${post_id}`).then((res) => {
      setPost(res.data);
    });
  }, [post_id]);

  return (
    <>
      <div>
        <GetPostOne post={post} />
        <div className="w-3/5 mx-auto m-12 flex flex-row justify-around">
          <button
            className="w-36 h-16 bg-white text-3xl flex justify-center items-center 
            border-4 border-custom-dark rounded-3xl 
            hover:text-white hover:bg-yellow hover:border-orange active:bg-gray active:border-black"
          >
            뒤로가기
          </button>
          <button
            className="w-36 h-16 bg-white text-3xl flex justify-center items-center 
              border-4 border-custom-dark rounded-3xl 
              hover:text-white hover:bg-yellow hover:border-orange active:bg-gray active:border-black"
          >
            수정하기
          </button>
          <button
            className="w-36 h-16 bg-white text-3xl flex justify-center items-center 
            border-4 border-custom-dark rounded-3xl 
            hover:text-white hover:bg-yellow hover:border-orange active:bg-gray active:border-black"
          >
            삭제하기
          </button>
        </div>
      </div>
    </>
  );
}
