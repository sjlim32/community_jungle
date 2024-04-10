import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import * as API from "../../../utils/api";

export default function GetPostOne({ post }) {
  const postDate = useMemo(() => {
    if (!post || !post.createdAt) {
      return null;
    }
    const createdAt = post.createdAt;
    const date = createdAt.substring(2, 10).replaceAll("-", ". ");
    const time = createdAt.substring(11, 16);

    return `${date}, ${time}`;
  }, [post]);

  return (
    <>
      <div>{post.title}</div>
      <span>{postDate}</span>
      <div>{post.content}</div>
    </>
  );
}
