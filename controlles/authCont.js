import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE username =?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User alredy exist!");
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);
    const value = [
      req.body.username,
      req.body.email,
      hashedPass,
      req.body.name,
    ];
    const q =
      "insert into users(`username`, `email`, `password`, `name`)values(?)";
    db.query(q, [value], (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const q = `SELECT * FROM users WHERE username = ?`;
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    const checkPas = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkPas) return res.status(400).json("Wrong password and username!");
    const token = jwt.sign({ id: data[0].userId }, "secretKey");

    const { password, ...others } = data[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .cookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out!");
};
