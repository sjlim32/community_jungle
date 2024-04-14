import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 24);

  return cookies.set("refresh", refreshToken, {
    sameSite: "None",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const setAccessToken = (accessToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 24);

  return cookies.set("token", accessToken, {
    sameSite: "None",
    path: "/",
    expires: new Date(expireDate),
  });
};
