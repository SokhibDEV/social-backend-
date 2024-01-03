import express from "express";
import userRouter from "./routes/usersRoute.js";
import authRouter from "./routes/authRoute.js";
import likeRouter from "./routes/likesRoute.js";
import postRouter from "./routes/postsRoute.js";
import commentRouter from "./routes/commentsRoute.js";
import relationRouter from "./routes/relationshipsRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);

  next();
});
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/likes", likeRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/relationships", relationRouter);

app.listen(8800, () => {
  console.log("Api working...");
});
