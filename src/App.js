import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Opening from "./pages/opening";
import Main from "./pages/community/main";
import LogIn from "./pages/user/login";
import SignUp from "./pages/user/signup";
import CommunityPostingPage from "./pages/community/communityPostingPage";
import CommunitySinglePage from "./pages/community/communitySinglePage";

function App() {
  const ROUTES = {
    WELCOME: "/",
    MAIN: "/main",
    LOGIN: "/main/login",
    SIGNUP: "/main/signup",
    POST: "/main/posting",
    FINDPOST: "/main/post/:post_id",
    NOTFOUND: "/",
  };
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path={ROUTES.WELCOME} element={<Opening />} />
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path={ROUTES.LOGIN} element={<LogIn />} />
          <Route path={ROUTES.SIGNUP} element={<SignUp />} />
          <Route path={ROUTES.POST} element={<CommunityPostingPage />} />
          <Route path={ROUTES.FINDPOST} element={<CommunitySinglePage />} />
          {/* <Route path={ROUTES.NOTFOUND} element={<NotFound />}></Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
