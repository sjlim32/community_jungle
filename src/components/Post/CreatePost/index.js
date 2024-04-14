import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function CreatePost({ onSubmit }) {
  const [titleValid, setTitleValid] = useState(false);
  const [contentValid, setContentValid] = useState(false);

  const formRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  const handleInputChange = (ref) => {
    const inputLength = ref.current.value.length;
    if (ref === titleRef) {
      setTitleValid(inputLength === 0 || inputLength === 50);
    }
    if (ref === contentRef) {
      setContentValid(inputLength === 0 || inputLength === 500);
    }
  };

  const submitPost = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (!(title && content)) {
      if (!title) {
        alert("제목이 비었습니다.");
        titleRef.current.focus();
        return;
      }
      contentRef.current.focus();
      alert("내용이 비었습니다.");
      return;
    }

    const post = {
      title,
      content,
    };

    onSubmit(post);
    formRef.current.reset();
  };

  return (
    <>
      <form className="min-h-80 w-screen mx-auto flex flex-col text-white" ref={formRef}>
        <div className="h-36 w-11/12 mb-8 flex flex-col mx-auto">
          <input
            className={`h-24 w-full pl-6 text-2xl mx-auto 
              bg-custom-dark rounded-2xl shadow-2xl shadow-custom-dark
              border-4 border-custom-dark 
              transition duration-300 focus:border-blue-600 focus:outline-none ${
                titleValid ? "focus:invalid:border-red-500" : ""
              }`}
            name="title"
            onChange={() => handleInputChange(titleRef)}
            ref={titleRef}
            placeholder="제목을 입력해 주세요."
            maxLength="50"
            autoComplete="off"
            required
          ></input>
          {titleValid && (
            <p className="font-Im pt-2 text-2xl text-center">제목은 0자 이상, 50자 이하로 입력해 주세요.</p>
          )}
        </div>
        <div
          className="min-h-full w-11/12 mb-16 flex flex-col mx-auto
            rounded-2xl shadow-2xl shadow-custom-dark
            bg-custom-dark"
        >
          <textarea
            className={`h-128 w-full resize-none pl-6 pt-4 mb-4 text-2xl mx-auto
              bg-custom-dark rounded-2xl
              border-4 border-custom-dark 
              trasition duration-300 focus:border-blue-600 focus:outline-none ${
                contentValid ? "focus:invalid:border-red-500" : ""
              }`}
            name="content"
            onChange={() => handleInputChange(contentRef)}
            ref={contentRef}
            maxLength="500"
            placeholder="내용을 입력해 주세요."
            autoComplete="off"
            required
          ></textarea>
          {contentValid && (
            <p className="pt-2 mb-4 font-Im text-2xl text-center">내용은 0자 이상, 500자 이하로 입력해 주세요.</p>
          )}
          <div
            className="w-3/5 py-8 mb-4 mx-auto flex flex-row justify-evenly
              border-t-2 border-white "
          >
            <button
              className="w-36 h-16 text-3xl flex justify-center items-center text-yellow-500
                border-2 rounded-2xl border-yellow-500 active:border-black
                transition duration-300 hover:text-custom-dark hover:bg-yellow-500 active:bg-gray"
              onClick={submitPost}
            >
              등록 하기
            </button>
            <Link
              className="w-36 h-16 text-3xl flex justify-center items-center text-yellow-500
                border-2 rounded-2xl border-yellow-500 active:border-black
                transition duration-300 hover:text-custom-dark hover:bg-yellow-500 active:bg-gray"
              to="/main"
            >
              뒤로 가기
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
