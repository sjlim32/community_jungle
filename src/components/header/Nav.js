import { Link } from "react-router-dom";
import React from "react";
import "./Nav.css";

function Nav() {
  return (
    <>
      <div className="navbar">
        <Link className="navbarMenu" to={"/main"}>
          커뮤니티
        </Link>
        <Link className="navbarMenu" to={"/main/signup"}>
          회원가입
        </Link>
      </div>
    </>
  );
}

export default Nav;
