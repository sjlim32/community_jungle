import { useNavigate } from "react-router-dom";

import SignUp from "../../components/User/SignUp";
import SignIn from "../../components/User/SignIn";
import useToggle from "../../hooks/useToggle";
import * as API from "../../utils/api";
// import { axiosInstance } from "../../utils/axiosInstance"; // refreshToken을 통한 token 재발급 구현하다 중지
// import { setAccessToken, setRefreshToken } from "../../utils/storage/Cookie"; // token을 cookie에 담으려다 중지

export default function SignInPage({ onLogin }) {
  const navigate = useNavigate();
  const { isOn, toggle } = useToggle(false);

  const handleLogIn = async (formData) => {
    const { id, password } = formData;

    try {
      // const res = await axiosInstance.API.post("/community/user/login", { id, password }, { withCredentials: true });
      const res = await API.post("/community/user/login", { id, password }, { withCredentials: true });

      // setAccessToken(res.data.access_token);
      // setRefreshToken(res.data.refresh_token);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("refresh", res.data.refresh_token);
      onLogin();
      alert("로그인 성공! 🥳");
      navigate("/main");
    } catch (err) {
      if (err.response.status === 404) return alert(`${err.response.data} 🥺`);
      alert("로그인 실패 🥺");
    }
  };

  const handleSingUp = async (formData) => {
    const { id, nickname, password } = formData;

    try {
      const res = await API.post("/community/user/signup", { id, nickname, password });
      if (!res) throw new Error("가입 실패");

      alert("정상적으로 가입되었습니다! 🥰");
      toggle();
    } catch (err) {
      if (err.response.status === 404) return alert(`${err.response.data} 😧`);
      alert("가입에 실패했습니다. 😧");
    }
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
