import { Link } from "react-router-dom";
import React from "react";

function Nav() {
  /*
  TODO - 로그인 상태일 때, 웹 세션에 회원 정보 저장 후 '내 페이지'와 '로그아웃' 보여줌 + 00님 안녕하세요! 문구 출력, 
  TODO - 로그아웃 상태에선, '회원가입'과 '로그인' 보여줌
  */
  return (
    <>
      <p
        className=" h-28 w-full mb-8 flex justify-end items-center px-4 text-end 
      bg-custom-dark text-white border-y-8 border-white"
      >
        <Link className="px-4 text-3xl font-thin hover:text-yellow-500 hover:font-bold" to={"/main"}>
          커뮤니티
        </Link>
        <Link className="px-4 text-3xl font-thin hover:text-yellow-500 hover:font-bold" to={"/main/login"}>
          로그인
        </Link>
      </p>
    </>
  );
}

export default Nav;
