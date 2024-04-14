import React from "react";
import { useNavigate } from "react-router-dom";

import * as API from "../../utils/api";
import CreatePost from "../../components/Post/CreatePost";

export default function CommunityPostingPage() {
  const navigate = useNavigate();

  const handleSubmit = async (post) => {
    const { title, content } = post;

    try {
      const writer = await API.get("/community/user/userName");
      console.log(`writer ?`, writer.data);

      const res = await API.post("/community/post", {
        title,
        content,
        writer: writer.data,
      });

      console.log(res); //debug//
      alert("게시물이 등록되었습니다! 😁");
    } catch (err) {
      console.log(err.response.data); //debug//
      alert(`${err.response.data} 😭`);
    }

    navigate("/main");
  };

  return (
    <>
      <CreatePost onSubmit={handleSubmit} />
    </>
  );
}
