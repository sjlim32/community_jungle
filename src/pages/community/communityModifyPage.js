import React from "react";
import { useParams } from "react-router-dom";

import * as API from "../../utils/api";
import ModifyPost from "../../components/Post/ModifyPost";

export default function CommunityModifyPage() {
  const { postId } = useParams();

  const handleSubmit = async (post) => {
    const { title, content } = post;

    try {
      const res = await API.patch(`/community/post/${postId}`, {
        title,
        content,
      });
      if (!res) throw new Error("게시물 수정 실패");

      alert("게시물이 수정되었습니다! 😁");
    } catch (err) {
      console.log(`수정!!`);
      if (err.response.status === 401) alert(`${err.response.data.reason} 🤯`);
      else alert(`${err.response.data} 🤯`);
    }

    // navigate(`/main/post/${postId}`);
  };

  return (
    <>
      <ModifyPost onSubmit={handleSubmit} postId={postId} />
    </>
  );
}
