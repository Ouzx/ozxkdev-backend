import express, { Express, Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import postRoutes from "./routes/post.js";

const app: Express = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const CONNECTION_URL: string = process.env.CONNECTION_URL || "";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
