import React, { useCallback } from "react";
import { Link } from "react-router-dom";

export default function GetPostList({ posts }) {
  const showPost = useCallback(() => {
    return posts.map((post, idx) => {
      // console.log(post);
      const { _id, title, createdAt } = post;
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
            <div className={"w-56"}>없음</div>
            <div className={"w-56"}>
              {date}, {time}
            </div>
            <div className={"w-36"}>없음</div>
            <div className={"w-36"}>없음</div>
          </Link>
        );
    });
  }, [posts]);

  return (
    <div className="mt-8 flex flex-col">
      <p
        className="w-10/12 h-12 mb-4 mx-auto 
      flex justify-evenly items-center text-3xl text-white
      bg-custom-dark shadow-2xl shadow-custom-dark"
      >
        <div className={"w-96"}>제목</div>
        <div className={"w-56"}>글쓴이</div>
        <div className={"w-56"}>작성일시</div>
        <div className={"w-36"}>좋아요 수</div>
        <div className={"w-36"}>댓글 수</div>
      </p>
      <div className="min-h-full max-h-lvh mb-12">
        {!posts ? (
          <h3>게시글을 불러오는 중입니다...</h3> //
        ) : (
          showPost(posts)
        )}
      </div>
    </div>
  );
}
