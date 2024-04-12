import React from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "../../components/User/SignUp";
import SignIn from "../../components/User/SignIn";
import useToggle from "../../hooks/useToggle";
import * as API from "../../utils/api";

export default function SignInPage() {
  const navigate = useNavigate();
  const { isOn, toggle } = useToggle(false);

  const handleLogIn = async (formData) => {
    const { id, password } = formData;

    try {
      // const { data } = await axios.post(
      //   "http://localhost:8080/community/user/login",
      //   { id, password },
      //   { withCredentials: true }
      // );

      // axios.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;
      const res = await API.post("/community/user/login", { id, password }, { withCredentials: true });

      const cookies = res.headers["set-cookie"];
      console.log("Received cookies:", cookies);

      console.log("login Complete ! =", res); //debug
      alert("로그인 성공! 🥳");
    } catch (err) {
      console.log(err.response.data); //debug
      alert("로그인 실패. 🥺");
    }

    // navigate("/main");
  };

  const handleSingUp = async (formData) => {
    const { id, nickname, password } = formData;

    try {
      const res = await API.post("/community/user/signup", { id, nickname, password });

      console.log("singUp Complete ! =", res.data.id, res.data.nickname); //debug
      alert("정상적으로 가입되었습니다! 🥰");
    } catch (err) {
      console.log(err.response.data.message, err); //debug
      alert("가입에 실패했습니다. 😧");
    }

    navigate("/main");
  };

  return (
    <div
      className="h-160 m-12 w-3/5 flex flex-col mx-auto bg-custom-dark rounded-2xl 
        shadow-2xl shadow-custom-dark"
    >
      <section className="w-max ml-16 flex text-2xl">
        <button
          className="w-36 py-2 my-6 text-2xl text-gray-200 rounded-xl
            transition ease-in-out delay-150 hover:shadow-inner hover:shadow-custom-dark
            hover:-translate-y-1 hover:text-custom-dark hover:bg-white hover:scale-110 duration-300"
          id="singin"
          onClick={toggle}
        >
          {isOn ? "로그인으로" : "회원가입으로"}
        </button>
      </section>
      {isOn ? <SignUp onSubmit={handleSingUp} /> : <SignIn onSubmit={handleLogIn} />}
    </div>
  );
}
