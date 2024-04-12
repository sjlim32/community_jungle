import { useNavigate } from "react-router-dom";
import SignUp from "../../components/User/SignUp";

import * as API from "../../utils/api";

export default function SignUpPage() {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    const { id, nickname, password } = formData;

    try {
      const res = await API.post("/community/user", { id, nickname, password });

      console.log("singUp Complete ! =", res.data.id, res.data.nickname); //debug
      alert("정상적으로 가입되었습니다! 🥰");
    } catch (err) {
      console.log(err.response.data.message, err); //debug
      alert("가입에 실패했습니다. 😧");
    }

    navigate("/main");
  };

  return (
    <>
      <SignUp onSubmit={handleSubmit} />
    </>
  );
}
