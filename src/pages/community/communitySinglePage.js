import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as API from "../../utils/api";

import GetPostOne from "../../components/Post/GetPostOne";

export default function CommunitySinglePage() {
  const [post, setPost] = useState("");
  const { post_id } = useParams();

  useEffect(() => {
    API.get(`/post/${post_id}`).then((res) => {
      setPost(res.data);
    });
  }, [post_id]);

  return (
    <>
      <GetPostOne post={post} />
    </>
  );
}
