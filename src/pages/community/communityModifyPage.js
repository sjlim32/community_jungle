import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as API from "../../utils/api";
import ModifyPost from "../../components/Post/ModifyPost";

export default function CommunityModifyPage() {
  const navigate = useNavigate();

  const { post_id } = useParams();

  const handleSubmit = async (post) => {
    const { title, content } = post;

    try {
      const res = await API.patch(`/community/post/${post_id}`, {
        title,
        content,
      });

      console.log(res); //debug//
      alert("게시물이 수정되었습니다! 😁");
    } catch (err) {
      console.log(err.response.data); //debug//
      alert(`${err.response.data} 😭`);
    }

    navigate(`/main/post/${post_id}`);
  };

  return (
    <>
      <ModifyPost onSubmit={handleSubmit} post_id={post_id} />
    </>
  );
}
