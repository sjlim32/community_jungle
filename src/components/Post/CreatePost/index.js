import React, { useRef } from "react";
import { Link } from "react-router-dom";

export default function CreatePost({ onSubmit }) {
  const formRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  const submitPost = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const content = contentRef.current.value;

    const post = {
      title,
      content,
    };

    onSubmit(post);
    formRef.current.reset();
  };

  return (
    <>
      <form className="h-screen w-screen mx-auto flex flex-col" ref={formRef}>
        <input
          className="h-24 w-11/12 p-4 mb-4 text-2xl mx-auto"
          required
          placeholder="제목을 입력해주세요."
          ref={titleRef}
          name="title"
          autoComplete="off"
        ></input>
        <textarea
          className="h-160 w-11/12 p-4 mb-4 text-2xl mx-auto"
          required
          placeholder="내용을 입력해주세요."
          ref={contentRef}
          name="content"
          autoComplete="off"
        ></textarea>
        <div className="w-2/5 mx-auto m-12 flex flex-row justify-around">
          <button
            className="w-36 h-16 bg-white text-3xl flex justify-center items-center 
          border-4 border-custom-dark rounded-3xl 
          hover:text-white hover:bg-yellow hover:border-orange active:bg-gray active:border-black"
            onClick={submitPost}
          >
            등록 하기
          </button>
          <Link
            className="w-36 h-16 bg-white text-3xl flex justify-center items-center 
          border-4 border-custom-dark rounded-3xl 
          hover:text-white hover:bg-yellow hover:border-orange active:bg-gray active:border-black"
            to="/main"
          >
            뒤로 가기
          </Link>
        </div>
      </form>
    </>
  );
}
