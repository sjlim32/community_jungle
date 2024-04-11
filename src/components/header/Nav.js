import { Link } from "react-router-dom";
import React from "react";

function Nav() {
  return (
    <>
      <p
        className=" h-28 w-full mb-8 flex justify-end items-center px-4 text-end 
      bg-custom-dark text-white border-y-8 border-white"
      >
        <Link className="px-4 text-3xl font-thin hover:text-yellow hover:font-bold" to={"/main"}>
          커뮤니티
        </Link>
        <Link className="px-4 text-3xl font-thin hover:text-yellow hover:font-bold" to={"/main/signup"}>
          회원가입
        </Link>
      </p>
    </>
  );
}

export default Nav;
