import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  console.log("Hello from express");
  res.status(200).json({ message: "Hello" });
});

export default app;
