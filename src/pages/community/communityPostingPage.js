import React from "react";
import { useNavigate } from "react-router-dom";

import * as API from "../../utils/api";
import CreatePost from "../../components/Post/CreatePost";

export default function CommunityPostingPage() {
  const navigate = useNavigate();

  const handleSubmit = async (post) => {
    const { title, content } = post;

    try {
      const res = await API.post("/community/post", {
        title,
        content,
      });

      console.log(res); //debug//
      alert("게시물이 등록되었습니다! 😁");
    } catch (err) {
      console.log(err.response.data); //debug//
      alert("게시물이 등록되지 않았습니다. 😭");
    }

    navigate("/main");
  };

  return (
    <>
      <CreatePost onSubmit={handleSubmit} />
    </>
  );
}
