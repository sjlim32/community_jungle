import React, { useMemo } from "react";
// import { Link } from "react-router-dom";
// import * as API from "../../../utils/api";

export default function GetPostOne({ post }) {
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
      <div className="flex flex-col text-xl">
        <div className="w-72 flex justify-center items-center">
          {year}년 {month}월 {day}일
        </div>
        <div className="w-72 flex justify-center items-center">
          {hours}시 {minutes}분 {seconds}초
        </div>
      </div>
    );
  }, [post]);

  return (
    <div className="w-11/12 min-h-lvh max-h-svh mx-auto text-dark">
      <section id="Title" className="min-h-fit mb-4 flex flex-row justify-evenly">
        <div className="w-full p-4 font-bold flex justify-start border-4 rounded-3xl border-white items-center text-2xl">
          제목 : <div className="w-96 flex justify-center items-center text-3xl">{post.title}</div>
        </div>
      </section>
      <section id="Info" className="h-20 w-full mb-12 mx-auto flex flex-row justify-evenly">
        <div className="w-2/5 flex mr-1 justify-center border-4 rounded-3xl border-white items-center text-2xl">
          작성자 : <div className="w-60 flex justify-center items-center text-2xl"> 없음 </div>
        </div>
        <div className="w-2/5 flex mr-1 justify-center border-4 rounded-3xl border-white items-center text-2xl">
          작성일시 : {postDate}
        </div>
        <div className="w-1/5 flex mr-1 justify-center border-4 rounded-3xl border-white items-center text-xl">
          좋아요 : <div className="w-24 flex justify-center items-center text-xl">없음</div>
        </div>
        <div className="w-1/5 flex justify-center border-4 rounded-3xl border-white items-center text-xl">
          댓글 : <div className="w-24 flex justify-center items-center text-xl">없음</div>
        </div>
      </section>
      <article id="Content" className="min-h-80 font-bold flex p-4 border-4 rounded-3xl border-white text-4xl">
        {post.content}
      </article>
    </div>
  );
}
