const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const getJSONWebToken = async (email, id) => {
  const payload = {
    email,
    id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return token;
};
const register = asyncHandler(async (req, res) => {
  const { email, fullName, password } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("User has already exist!!");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new UserModel({
    email,
    fullName: fullName ?? "",
    password: hashedPassword,
  });
  await newUser.save();
  res.status(200).json({
    message: "Register new user successfully!!",
    data: {
      email: newUser.email,
      id: newUser.id,
      accessToken: await getJSONWebToken(email, newUser?._id),
    },
  });
  console.log(hashedPassword);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    res.status(403);
    throw new Error("Email or password is not correct");
  }
  const isMatchPassword = await bcrypt.compare(password, existingUser.password);
  if (!isMatchPassword) {
    res.status(401);
    throw new Error("Email or password is not correct");
  }
  res.status(200).json({
    message: "Login successfully!!",
    data: {
      id: existingUser.id,
      email: existingUser.email,
      accessToken: await getJSONWebToken(email, existingUser?.id),
    },
  });
});
module.exports = register;
module.exports = login;
