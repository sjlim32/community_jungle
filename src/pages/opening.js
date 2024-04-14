import React from "react";
import { Link } from "react-router-dom";

export default function Opening() {
  return (
    <div className="h-dvh text-center flex flex-col justify-center text-custom-dark">
      <h1 className="m-16 text-9xl text-inherit">정글러 게시판</h1>
      <div className="font-DOTBOGI">
        <p className="mb-8 text-3xl text-inherit">
          재방문이라면 :{"   "}
          <Link className="text-5xl hover:text-white" to="/main">
            커뮤니티로
          </Link>
        </p>
        <p className="text-3xl text-inherit">
          처음이시라면 :{"   "}
          <Link className="text-5xl hover:text-white" to="/main/signup">
            회원가입으로
          </Link>
        </p>
      </div>
    </div>
  );
}
