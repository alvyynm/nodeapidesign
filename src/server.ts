import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./utils/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  console.log("Hello from express");
  res.status(200).json({ message: "Hello" });
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Ooops something went wrong" });
});
export default app;
