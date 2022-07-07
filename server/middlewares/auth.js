const jwt = require("jsonwebtoken");
const User = require("../models/User");
const httpError = require("../utilities/httpError");

const JWT_SECRET = process.env.JWT_SECRET || "CKJ$%sGKGF$KJJfHFL";

const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decode = jwt.verify(token, JWT_SECRET);
    if (!decode) throw new httpError("Access Deneied", 401);
    const user = await User.findOne({ where: { id: decode.id } });
    if (!user) throw new httpError("Access Deneied", 401);
    req.body = {
      ...req.body,
      user,
    };
    next();
  } else {
    throw new httpError("Access Deneied", 401);
  }
};
/*
const isAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decode = jwt.verify(token, JWT_SECRET);
    if (!decode) throw new httpError("Access Deneied", 401);

    const user = await User.findById(decode._id);
    if (!user) throw new httpError("Access Deneied", 401);

    if (user.isAdmin) {
      req.body = {
        ...req.body,
        user: decode._id,
      };
      next();
    } else {
      throw new httpError("Access Forbidden", 401);
    }
  } else {
    throw new httpError("Access Deneied", 401);
  }
};
*/
module.exports = { auth };
