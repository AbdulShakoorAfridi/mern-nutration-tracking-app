import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import CustomError from "../utils/customeError.js";
import util from "util";
import { UserModel } from "../models/user.model.js";

export const protectMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  if (!token) {
    return next(new CustomError("Not Authorized", 401));
  }
  try {
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    // checking if the user exist
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return next(new CustomError("Not Authorized", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new CustomError(401, "Not Authorized"));
  }
});
