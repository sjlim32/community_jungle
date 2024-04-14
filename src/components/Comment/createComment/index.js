import React, { useState, useCallback, useRef } from "react";

function CreateComment({ user, onSubmit }) {
  const [commentValid, setCommentValid] = useState(false);
  const commentRef = useRef();

  const handleInputChange = useCallback(() => {
    const inputLength = commentRef.current.value.length;
    setCommentValid(inputLength === 0 || inputLength >= 150);
  }, []);

  const submitComment = useCallback(
    (e) => {
      e.preventDefault();

      const content = commentRef.current.value;

      if (!content) {
        commentRef.current.focus();
        alert("내용이 비었습니다.");
        return;
      }

      const comment = {
        commentContent: content,
        writer: user,
      };

      onSubmit(comment);
      commentRef.current.value = null;
    },
    [onSubmit, user]
  );

  return (
    <>
      {user ? (
        <section
          className="w-11/12 h-24 mt-10 flex flex-col mx-auto
            border-b"
        >
          <div className="w-full mx-auto flex flex-row justify-evenly">
            <input
              className={`w-10/12 h-12 p-3 text-lg bg-custom-dark text-gray-100 
              border-2 rounded-lg shadow-2xl shadow-custom-dark
              transition duration-300 focus:border-2 focus:border-blue-600 focus:outline-none ${
                commentValid ? "focus:invalid:border-red-500" : ""
              }`}
              onChange={() => handleInputChange(commentRef)}
              ref={commentRef}
              placeholder="코멘트를 입력해주세요."
              maxLength="150"
              autoComplete="off"
              required
            />
            <button
              className="w-20 font-Im text-xl text-gray-100 rounded-xl 
                transition ease-in-out delay-150 duration-300 hover:scale-125
                hover:shadow-inner hover:shadow-custom-dark
                hover:text-custom-dark hover:bg-gray-100"
              onClick={submitComment}
            >
              등록
            </button>
          </div>
          {commentValid ? (
            <p className="font-Im pt-2 text-xl text-gray-400 text-center">
              댓글은 0자 이상, 150자 이하로 입력해 주세요.
            </p>
          ) : (
            <div></div>
          )}
        </section>
      ) : (
        <></>
      )}
    </>
  );
}

export default React.memo(CreateComment);
