import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  try {
    const q = `SELECT c.commentId, c.desc, c.postId, u.userId AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.userId = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC`;
    db.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) res.status(403).json("Token is valid!");
    const q =
      "INSERT INTO comments (`desc`,  `createdAt`, `userId`, `postId`) VALUES (?)";
    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created!");
    });
  });
};
