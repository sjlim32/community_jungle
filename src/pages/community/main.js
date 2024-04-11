import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from "../../utils/api";

import GetPostList from "../../components/Post/GetPostList";

export default function Main() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    API.get("/post").then((res) => {
      console.log(res.data); //debug//
      setPostList(res.data);
    });
  }, []);

  return (
    <div className="w-screen min-h-120 max-h-screen text-center flex flex-col text-custom-dark">
      <p className="w-screen h-36 mb-4 flex justify-center items-center">
        <Link
          className="w-36 h-16 bg-white text-3xl flex justify-center items-center 
          border-4 border-custom-dark rounded-3xl 
          hover:text-white hover:bg-yellow hover:border-orange active:bg-gray active:border-black"
          to="/main/posting"
        >
          글쓰기
        </Link>
      </p>
      <GetPostList posts={postList} />
    </div>
  );
}
