import express from "express";
import cors from "cors";
import { postRouter } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/community", postRouter);
// app.use("/api", userRouter);
// app.use("/api", categoryRouter);
// app.use("/api", replyRouter);
// app.use("/api", chatRouter);


export { app };