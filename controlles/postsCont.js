import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const userId = req.query.userId;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretKey", (err, userInfo) => {
      if (err) res.status(403).json("Token is valid!");
      const q =
        userId !== "undefined"
          ? `SELECT  p.desc, p.postId, p.createdAt, p.img, u.userId, name, profilePic FROM posts AS p join users as u on(u.userId = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
          : `SELECT  p.desc, p.postId, p.createdAt, p.img, u.userId, name, profilePic FROM posts AS p join users as u on(u.userId = p.userId) LEFT JOIN relationships as r on(p.userId= r.followedUserId) WHERE r.followerUserId= ? OR p.userId =? ORDER BY p.createdAt DESC`;
      const values =
        userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const addPost = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretKey", (err, userInfo) => {
      if (err) res.status(403).json("Token is valid!");
      const q =
        "INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
      const values = [
        req.body.desc,
        req.body.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been created!");
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretKey", (err, userInfo) => {
      if (err) res.status(403).json("Token is valid!");
      const q = "DELETE FROM posts WHERE `postId`=? AND `userId`= ?";
      db.query(q, [req.params.postId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0)
          return res.status(200).json("Post has been deleted!");
        return res.status(403).json("You can delete only your post");
      });
    });
  } catch (error) {
    console.log(error);
  }
};
