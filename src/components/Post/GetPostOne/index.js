import React, { useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import * as API from "../../../utils/api";

export default function GetPostOne({ postlike, post }) {
  useEffect(() => {
    console.log(`rerender occured`);
  }, [postlike]);

  const postDate = useMemo(() => {
    if (!post || !post.createdAt) {
      return null;
    }

    const createdAt = post.createdAt;
    const year = createdAt.substring(0, 4);
    const month = createdAt.substring(5, 7);
    const day = createdAt.substring(8, 10);
    const hours = createdAt.substring(11, 13);
    const minutes = createdAt.substring(14, 16);
    const seconds = createdAt.substring(17, 19);

    return (
      <div className="flex flex-col text-xl text-white">
        <div className="w-72 flex justify-center items-center">
          {year}년 {month}월 {day}일
        </div>
        <div className="w-72 flex justify-center items-center">
          {hours}시 {minutes}분 {seconds}초
        </div>
      </div>
    );
  }, [post]);

  if (!post) {
    return <h1>게시글이 없습니다 !</h1>;
  } else
    return (
      <div className="min-h-128 text-gray-400">
        <section id="Title" className="min-h-24 px-4 mb-8 flex flex-row justify-evenly">
          <div className="w-full p-4 pb-8 mt-12 font-bold flex justify-around items-center border-b-4 border-gray text-2xl">
            제목 : <div className="w-11/12 flex justify-start items-center text-3xl text-white">{post.title}</div>
          </div>
        </section>
        <section id="Info" className="h-16 w-full px-4 mb-16 mx-auto flex flex-row justify-evenly">
          <div className="w-2/5 flex mr-4 justify-center border-b-2 border-gray items-center text-2xl">
            작성자 : <div className="w-60 flex justify-center items-center text-2xl text-white"> {post.writer} </div>
          </div>
          <div className="w-2/5 flex mr-4 justify-center border-b-2 border-gray items-center text-2xl">
            작성일시 : {postDate}
          </div>
          <div className="w-1/5 flex mr-4 justify-center border-b-2 border-gray items-center text-2xl">
            좋아요 : <div className="w-24 flex justify-center items-center text-xl text-white">{post.likes}</div>
          </div>
          <div className="w-1/5 flex justify-center border-b-2 border-gray items-center text-2xl">
            댓글 : <div className="w-24 flex justify-center items-center text-xl text-white">없음</div>
          </div>
        </section>
        <article
          id="Content"
          className="min-h-64 mx-4 font-bold flex flex-col p-4 border-y-2 border-gray text-3xl text-white
          whitespace-pre-wrap"
        >
          {post.content}
        </article>
      </div>
    );
}
