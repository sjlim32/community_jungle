// index.js
import dotenv from "dotenv";
import mongoose from "mongoose"
// import http from "http";
// import https from "https";
// import fs from "fs";

import { app } from "./src/app.js";

// const options = {
//   key: fs.readFileSync("./localhost-key.pem"),
//   cert: fs.readFileSync("./localhost.pem"),
//   ca: fs.readFileSync("./rootca.crt"),
// };

//? ***** 환경변수 설정 ***** ?//
dotenv.config();
const port = process.env.SERVER_PORT;

//? ***** DB 연결 ***** ?//
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});
mongoose.connection.on("error", () => {
  console.error("MongoDB Connect Failed");
});

/*******************************************/

app.listen(port, () => {
  console.log(`${port}번 포트에서 대기중 🚀`);
});

// http.createServer(app).listen(8081, () => {
//   console.log(`${8081}번 포트에서 대기중 🚀`);
// });

// https.createServer(options, app).listen(port, () => {
//   console.log(`${port}번 포트에서 대기중 🚀`);
// });

