import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from "../../utils/api";

import GetPostList from "../../components/Post/GetPostList";

export default function Main({ isLoggedIn }) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    API.get("/community/post").then((res) => {
      console.log(res.data); //debug//
      setPostList(res.data);
    });
  }, []);

  return (
    <div className="h-full text-center flex flex-col text-custom-dark">
      <p className="font-DOTBOGI h-36 mb-4 flex justify-center items-center">
        {isLoggedIn ? (
          <Link
            className="w-36 py-2 my-6 text-2xl text-gray-200 rounded-xl border-2 border-custom-light bg-custom-dark
          transition ease-in-out delay-150 duration-300 hover:scale-110 hover:-translate-y-1
          hover:shadow-inner hover:shadow-custom-dark
          hover:border-custom-dark hover:text-custom-dark hover:bg-gray-200"
            to="/main/posting"
          >
            글쓰기
          </Link>
        ) : (
          ""
        )}
      </p>
      {postList.length !== 0 ? (
        <GetPostList posts={postList} />
      ) : (
        <div className="text-4xl font-Im"> 게시물이 없습니다. ㅠ@ㅠ </div>
      )}
    </div>
  );
}
