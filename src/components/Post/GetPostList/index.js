import React, { useCallback } from "react";
import { Link } from "react-router-dom";

export default function GetPostList({ posts }) {
  const showPost = useCallback(() => {
    return posts.map((post, idx) => {
      const { _id, title, writer, likes, totalComments, createdAt } = post;
      const date = createdAt.substring(2, 10).replaceAll("-", ". ");
      const time = createdAt.substring(11, 16);

      if (!posts) {
        return <h1>게시글이 없습니다 !</h1>;
      } else
        return (
          <Link
            key={_id}
            to={`post/${_id}`}
            className="w-10/12 py-2 mx-auto m-4 flex justify-evenly items-center text-2xl rounded
          hover:outline-none hover:ring hover:ring-custom-dark
          hover:bg-yellow-500 hover:shadow-2xl hover:shadow-custom-dark active:bg-white"
          >
            <div className={"w-96"}>{title}</div>
            <div className={"w-56"}>{writer}</div>
            <div className={"w-44 text-zinc-600 text-xl"}>
              {date}, {time}
            </div>
            <div className={"w-20 text-zinc-600 text-xl"}>{likes}</div>
            <div className={"w-20 text-zinc-600 text-xl"}>{totalComments}</div>
          </Link>
        );
    });
  }, [posts]);

  return (
    <div className="mt-8 flex flex-col">
      <p
        className="w-10/12 h-12 mb-4 mx-auto 
      flex justify-evenly font-DOTBOGI items-center text-2xl text-white
      bg-custom-dark shadow-2xl shadow-custom-dark"
      >
        <span className={"w-96"}>제목</span>
        <span className={"w-56"}>글쓴이</span>
        <span className={"w-44"}>작성일시</span>
        <span className={"w-20"}>좋아요</span>
        <span className={"w-20"}>댓글</span>
      </p>
      <div className="min-h-48 mb-12">
        {!posts ? (
          <h3>게시글을 불러오는 중입니다...</h3> //
        ) : (
          showPost(posts)
        )}
      </div>
    </div>
  );
}
