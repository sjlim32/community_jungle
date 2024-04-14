import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as API from "../../utils/api";

function Nav({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const [userName, setUsername] = useState();

  useEffect(() => {
    if (isLoggedIn) {
      API.get("/community/user/username").then((res) => {
        console.log(`hello world`, res.data); //debug//
        setUsername(res.data.name);
      });
    }
  }, [isLoggedIn]);

  // const handleUserName = useCallback(async () => {
  //   const userInfo = await API.get("/community/user/username");
  //   setUsername(userInfo.data.name);
  // }, []);

  // useEffect(() => {
  //   console.log(`useEffect`);
  //   if (isLoggedIn) {
  //     console.log(`useEffect- set`);
  //     handleUserName();
  //   }
  // }, [isLoggedIn, handleUserName]);

  const handleLogout = (e) => {
    e.preventDefault();
    console.log(`LOG OUT !!!`); //debug//
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    alert("로그아웃 성공!");
    onLogout();
    navigate("/main");
  };

  const setLink = () => {
    return (
      <>
        {isLoggedIn ? (
          <button className="px-4 text-3xl font-thin hover:text-yellow-500 hover:font-bold" onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <Link className="px-4 text-3xl font-thin hover:text-yellow-500 hover:font-bold" to={"/main/login"}>
            로그인
          </Link>
        )}
      </>
    );
  };

  return (
    <>
      <div
        className=" h-28 w-full mb-8 font-DOTBOGI flex flex-row justify-between items-center px-4 text-end 
      bg-custom-dark text-white border-y-8 border-white"
      >
        {isLoggedIn ? (
          <span className="items-center text-xl font-Im">
            <span className="text-2xl hover:text-white hover:cursor-pointer">{userName}</span> 님 반가워요 👋🏻
          </span>
        ) : (
          <span className="items-center text-xl font-Im">로그인 해야 글을 쓸 수 있습니다.</span>
        )}
        <section className="flex-row ">
          <Link className="px-4 text-3xl font-thin hover:text-yellow-500 hover:font-bold" to={"/main"}>
            커뮤니티
          </Link>
          {setLink()}
        </section>
      </div>
    </>
  );
}

export default Nav;
