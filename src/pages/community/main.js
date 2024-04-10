import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from "../../utils/api";

import GetPostList from "../../components/Post/GetPostList";

export default function Main() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    API.get("/post").then((res) => {
      console.log(res.data); //debug//
      setPostList(res.data);
    });
  }, []);

  return (
    <>
      <h1>메인페이지</h1>
      <Link to="/main/posting">글쓰기</Link>
      <GetPostList posts={postList} />
    </>
  );
}
