import React from "react";
import { Link } from "react-router-dom";

function Opening() {
  return (
    <>
      <h1>안녕하세요 !</h1>
      <div>
        재방문이라면 : <Link to="/main">커뮤니티로</Link>
        <br />
        <br />
        처음이시라면 : <Link to="/main/signup">회원가입으로</Link>
      </div>
    </>
  );
}

export default Opening;
