import React, { useRef } from "react";

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
      <form ref={formRef}>
        <input required placeholder="제목을 입력해주세요." ref={titleRef} name="title" autoComplete="off"></input>
        <input required placeholder="내용을 입력해주세요." ref={contentRef} name="content" autoComplete="off"></input>
        <button onClick={submitPost}>등록 하기</button>
        <button type="button">뒤로 가기</button>
      </form>
    </>
  );
}
