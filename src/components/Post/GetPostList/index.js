import React, { useCallback } from "react";
import { Link } from "react-router-dom";

export default function GetPostList({ posts }) {
  const showPost = useCallback(() => {
    return posts.map((post, idx) => {
      // console.log(post);
      const { _id, title, createdAt } = post;
      const date = createdAt.substring(2, 10).replaceAll("-", ". ");
      const time = createdAt.substring(11, 16);

      return (
        <div key={_id} style={{ width: 600 }}>
          <Link to={`post/${_id}`} style={{ display: "inline-block", width: 300, textDecoration: "none" }}>
            {title}
          </Link>
          <span>
            작성일시 : {date}, {time}
          </span>
        </div>
      );
    });
  }, [posts]);

  return (
    <>
      <div>
        {!posts ? (
          <h3>게시글을 불러오는 중입니다...</h3> //
        ) : (
          showPost(posts)
        )}
      </div>
    </>
  );
}
