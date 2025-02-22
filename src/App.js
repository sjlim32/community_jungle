import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/header/header";
import Opening from "./pages/opening";
import Main from "./pages/community/main";
import SignIn from "./pages/user/signin";
import CommunityPostingPage from "./pages/community/communityPostingPage";
import CommunitySinglePage from "./pages/community/communitySinglePage";
import CommunityModifyPage from "./pages/community/communityModifyPage";

// "start": "HTTPS=true SSL_CRT_FILE=localhost.pem SSL_KEY_FILE=localhost-key.pem react-scripts start",

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const ROUTES = {
    WELCOME: "/",
    MAIN: "/main",
    SIGNIN: "/main/login",
    // SIGNUP: "/main/signup",
    POST: "/main/posting",
    FINDPOST: "/main/post/:postId",
    MODIFYPOST: "/main/post/modify/:postId",
    NOTFOUND: "/",
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        style={{ width: "25rem", textAlign: "center" }}
        limit={4}
        pauseOnHover={false}
        closeButton={true}
        autoClose={1500}
        theme="colored"
        stacked
        hideProgressBar
      />
      <Router>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path={ROUTES.WELCOME} element={<Opening />} />
          <Route path={ROUTES.MAIN} element={<Main isLoggedIn={isLoggedIn} />} />
          <Route path={ROUTES.SIGNIN} element={<SignIn onLogin={handleLogin} />} />
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
