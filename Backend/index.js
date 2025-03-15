import express from "express";
import connectDB from "./config/db.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

if (connectDB() == true) {
  console.log("Database connected successfully");
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Server is running on port http://localhost:${port}`);
});
