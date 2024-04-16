import express from "express";
import cors from "cors";
import passport from "passport";

import { postRouter, userRouter, commentRouter } from "./routes/index.js";
import { errorHandler, responseHandler } from "./middlewares/index.js";
import passportConfig from "./middlewares/passport.js";

const app = express();

app.use(
  cors({
    // origin: ["https://localhost:3000"],
    origin: true, // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
passportConfig(passport);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/community/post", postRouter);
app.use("/community/user", userRouter);
app.use("/community/comment", commentRouter);
// app.use("/api", categoryRouter);

app.use(errorHandler);
app.use(responseHandler);

export { app };