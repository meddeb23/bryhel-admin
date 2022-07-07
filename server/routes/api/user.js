const express = require("express");
const routes = express.Router();
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { auth } = require("../../middlewares/auth");

const JWT_SECRET = process.env.JWT_SECRET || "CKJ$%sGKGF$KJJfHFL";

// @route   POST /api/v1/user/login
// @desc    login user
// @access  Public
routes.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });
  console.log(email, password);
  // search for existing user
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: "User dose not exist" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {});
  if (!token) throw Error("Couldnt sign the token");

  res
    .status(200)
    .cookie("token", token, { httpOnly: true })
    .json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
});

// @route   GET /api/v1/user/register
// @desc    register user
// @access  public
routes.post("/register", async (req, res, next) => {
  const { name, email, password, cPassword } = req.body;
  if (!name || !cPassword || !email || !password)
    return res.status(400).json({ message: "All fields required" });
  if (password !== cPassword)
    return res.status(400).json({ message: "Passwords don't matchs" });
  // search for existing user
  const user = await User.findOne({ where: { email } });
  if (user) return res.status(400).json({ message: "Email already used" });

  const salt = await bcrypt.genSalt(10);
  if (!salt) throw Error("Something went wrong with bcrypt");

  const hash = await bcrypt.hash(password, salt);
  if (!hash) throw Error("Something went wrong hashing the password");

  const savedUser = await User.create({
    name,
    password: hash,
    email,
  });
  if (!savedUser) throw Error("Something went wrong saving the user");

  const token = jwt.sign({ id: savedUser.id }, JWT_SECRET, {});
  if (!token) throw Error("Couldnt sign the token");

  res
    .status(200)
    .cookie("token", token, { httpOnly: true })
    .json({
      user: {
        id: savedUser.id,
        email: savedUser.email,
        name: savedUser.name,
      },
    });
});

// @route   GET /api/v1/user/logout
// @desc    login user
// @access  public
routes.get("/logout", auth, (req, res) => {
  res.clearCookie("token");
  res.status(200).send("logout user");
});

// @route   GET /api/v1/user
// @desc    user info
// @access  privat
routes.get("/", auth, async (req, res) => {
  const { user } = req.body;
  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});

module.exports = routes;
