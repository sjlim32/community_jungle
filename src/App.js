import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Opening from "./pages/opening";
import Main from "./pages/community/main";
import SignIn from "./pages/user/signin";
import CommunityPostingPage from "./pages/community/communityPostingPage";
import CommunitySinglePage from "./pages/community/communitySinglePage";
import CommunityModifyPage from "./pages/community/communityModifyPage";

// "start": "HTTPS=true SSL_CRT_FILE=localhost.pem SSL_KEY_FILE=localhost-key.pem react-scripts start",

function App() {
  const ROUTES = {
    WELCOME: "/",
    MAIN: "/main",
    SIGNIN: "/main/login",
    // SIGNUP: "/main/signup",
    POST: "/main/posting",
    FINDPOST: "/main/post/:post_id",
    MODIFYPOST: "/main/post/modify/:post_id",
    NOTFOUND: "/",
  };
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path={ROUTES.WELCOME} element={<Opening />} />
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path={ROUTES.SIGNIN} element={<SignIn />} />
          {/* <Route path={ROUTES.SIGNUP} element={<SignUp />} /> */}
          <Route path={ROUTES.POST} element={<CommunityPostingPage />} />
          <Route path={ROUTES.FINDPOST} element={<CommunitySinglePage />} />
          <Route path={ROUTES.MODIFYPOST} element={<CommunityModifyPage />} />
          {/* <Route path={ROUTES.NOTFOUND} element={<NotFound />}></Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
