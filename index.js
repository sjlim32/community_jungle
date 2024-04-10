// index.js
import dotenv from "dotenv";
import mongoose from "mongoose"
import { app } from "./src/app.js";


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


