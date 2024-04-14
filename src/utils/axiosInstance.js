import axios from "axios";

const serverUrl = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`;

export const axiosInstance = axios.create({
  serverUrl,
  timeout: 10000,
});

const refreshAccessToken = async () => {
  try {
    const res = await axiosInstance.post(
      `/community/user/refresh`,
      {},
      {
        header: {
          AUtorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      }
    );

    const { accessToken } = res.data.data;
    localStorage.setItem("token", accessToken);

    return accessToken;
  } catch (err) {
    console.error("axiosInstance - refresh Error", err);
  }
};

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry && err.response.data.message === "jwt expired") {
      originalRequest._retry = true;
    }

    try {
      const newAccessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (err) {
      console.log(`axiosInstance { interceptors Error } :`, err);
    }
  }
);
