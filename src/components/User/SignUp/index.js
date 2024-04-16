import React, { useRef } from "react";

export default function SignUp({ onSubmit }) {
  const formRef = useRef();
  const idRef = useRef();
  const NicknameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();

    const id = idRef.current.value;
    const nickname = NicknameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (id.length === 0 || nickname.length === 0 || password.length === 0) {
      alert("폼을 모두 채워주세요.");
      return;
    }

    if (confirmPassword !== password) {
      confirmPasswordRef.current.setCustomValidity("Different from password");
      return;
    }

    const formData = {
      id,
      nickname,
      password,
    };

    onSubmit(formData);
    // formRef.current.reset();
  };

  return (
    <>
      <form className="flex flex-col justify-center rounded-2xl" ref={formRef}>
        <input
          id="id"
          className="w-4/5 my-6 mx-auto text-2xl text-center text-gray-100 px-4 py-2 
          border-b-4 border-lightgray bg-custom-dark
          transition duration-500 focus:outline-none focus:border-yellow-500"
          type="id"
          ref={idRef}
          placeholder="Id"
          autoComplete="off"
          required
        />
        <input
          id="Nickname"
          className="w-4/5 my-6 mx-auto text-2xl text-center text-gray-100 px-4 py-2 
          border-b-4 border-lightgray bg-custom-dark
          transition duration-500 focus:outline-none focus:border-yellow-500"
          type="Nickname"
          ref={NicknameRef}
          placeholder="Nickname"
          autoComplete="off"
          required
        />

        <input
          className="w-4/5 my-6 mx-auto text-2xl text-center text-gray-100 px-4 py-2 
          border-b-4 border-lightgray bg-custom-dark
          transition duration-500 focus:outline-none focus:border-yellow-500"
          id="password"
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
        />

        <input
          className="w-4/5 my-6 mx-auto text-2xl text-center text-gray-100 px-4 py-2 
          border-b-4 border-lightgray bg-custom-dark
          transition duration-500 focus:outline-none focus:border-yellow-500"
          id="confirmPassword"
          type="password"
          ref={confirmPasswordRef}
          placeholder="Confirm Password"
          required
        />
        <button
          className="w-36 py-2 mt-12 mx-auto text-2xl text-yellow-500
            border-2 rounded-2xl border-yellow-500 active:border-black
            transition duration-300 hover:text-custom-dark hover:bg-yellow-500 active:bg-gray"
          onClick={submitForm}
        >
          회원가입
        </button>
      </form>
    </>
  );
}
