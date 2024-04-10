import { useLocation } from "react-router-dom";
import Title from "./title";
import Nav from "./Nav";

function Navbar() {
  const location = useLocation();
  const shouldRenderHeaderAndNav = location.pathname.includes("/main");

  if (!shouldRenderHeaderAndNav) {
    return null; // /main이 포함되지 않는 경우에는 null을 반환하여 아무것도 렌더링하지 않음
  }

  return (
    <>
      <Title />
      <Nav />
    </>
  );
}

export default Navbar;
