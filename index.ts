// TODO: Configure Serverless
import express, { Express, Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import helmet from "helmet";
import morgan from "morgan";

import { image, post, auth, general } from "./routes/index.js";
import { verifyToken } from "./middlewares/auth.js";

import RateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

/* Config */
dotenv.config();
const CONNECTION_URL: string = process.env.CONNECTION_URL || "";
const PORT = process.env.PORT || 5000;

const app: Express = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));
app.use(cors());

/* Set up rate limiter */
var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 15,
});
app.use(limiter);

/* Sanitize data */
app.use(mongoSanitize());

app.use("/media", express.static(process.cwd() + "/public/uploads/"));

/* Routes */
app.use("/auth", auth);
app.use("/posts", verifyToken, post);
app.use("/media/imgs", verifyToken, image);

// TODO: Add Client Token
app.use("/general", general);

app.get("/", (_req: Request, res: Response) => {
  return res.send("ozxk blog api 🚀");
});

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});

app.listen(PORT, () => {
  return console.log(`Server is listening on ${PORT}`);
});

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

export default app;
