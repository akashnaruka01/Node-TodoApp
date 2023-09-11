import express, { Router } from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errormiddleware } from "./controler/middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

// express js provides some middlewares for error handling.

// using middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routing
app.use("/api/v1/user", userRouter); // adding custom url
app.use("/api/v1/task", taskRouter);

// we can only access get request from browser not post requests in browser.
app.get("/", async (req, res) => {
  res.send("hello world");
});

// using error middleware
app.use(errormiddleware);
