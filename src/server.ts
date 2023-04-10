import express from "express";
import router from "./router";

const app = express();

app.get("/", (req, res, next) => {
  console.log("Hello from express");
  res.status(200).json({ message: "Hello" });
});

app.use("/api", router);
export default app;
