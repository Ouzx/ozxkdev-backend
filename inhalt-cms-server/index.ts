import express, { Express, Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { image, post, auth } from "./routes/index.js";
import { verifyToken } from "./middlewares/auth.js";

/* Config */
dotenv.config();
const CONNECTION_URL: string = process.env.CONNECTION_URL || "";
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));
app.use(cors());

// TODO: TEST THIS
// app.use("/assets", express.static(path.join(__dirname, "/public/assets")));

/* Routes */
app.use("/posts", verifyToken, post);
// app.use("/posts", postRoutes);
app.use("/auth", auth);
app.use("/media/imgs", auth, image);

/* MongoDB Connection */
mongoose.set("strictQuery", false);
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
