import React, { useRef } from "react";

export default function LogIn({ onSubmit }) {
  const formRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();

    const id = idRef.current.value;
    const password = passwordRef.current.value;

    if (id.length === 0 || password.length === 0) {
      return;
    }

    const formData = {
      id,
      password,
    };

    onSubmit(formData);
    // formRef.current.reset();
  };
  return (
    <div>
      <form className="mx-auto flex flex-col justify-center" ref={formRef}>
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
          className="w-4/5 my-6 mx-auto text-2xl text-center text-gray-100 px-4 py-2 
        border-b-4 border-lightgray bg-custom-dark
        transition duration-500 focus:outline-none focus:border-yellow-500"
          id="password"
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
        />

        <button
          className="w-36 py-2 mt-12 mx-auto text-2xl text-yellow-500
          border-2 rounded-2xl border-yellow-500 active:border-black
          transition duration-300 hover:text-custom-dark hover:bg-yellow-500 active:bg-gray"
          onClick={submitForm}
        >
          로그인
        </button>
      </form>
    </div>
  );
}
