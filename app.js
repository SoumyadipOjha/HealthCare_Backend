import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./Database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import fileUpload from "express-fileupload";
import ItemRouter from "./routes/ItemRouter.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(_dirname,"./config/config.env") });
console.log(process.env.MONGO_URL);
const app = express();
app.use(
  cors()
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", ItemRouter);

dbConnection();

app.use(errorMiddleware);
export default app;
