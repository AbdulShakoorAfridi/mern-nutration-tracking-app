import { UserModel } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import CustomError from "../utils/customeError.js";
// register controller
// @access Public
// route   /api/vi/register
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, age } = req.body;
  const user = await UserModel.create({ name, email, password, age });
  res.status(201).json({
    status: "success",
    message: "user register successfully.",
    user,
  });
});

// login controller
// @access Public
// route   /api/vi/login

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    const error = new CustomError("user not found.", 404);
    return next(error);
  }

  // password checking
  const isMatch = await user.comparePassword(password, user.password);

  if (user && isMatch) {
    // generating a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).cookie("token", token).json({
      status: "success",
      message: "login successfully.",
      user: user.name,
      token,
    });
  } else {
    const error = new CustomError("wrong credentials.", 403);
    return next(error);
  }
});
