import express from "express";
import dotenv from "dotenv";
import webhookRoute from "./routes/webhook";
const app = express();

app.use(express.json());

dotenv.config();

app.use((req, res, next) => {
  console.log(`Path ${req.path} with method ${req.method}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/facebook", webhookRoute);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
