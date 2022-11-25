import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  // to access cookie we need cookie parser

  if (!token) return next(new ErrorHandler("You need to Login", 401));

  // if token present
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // from decoded object we will get _id sent suring jwt "sign"
  // and from this id we can find user

  req.user = await User.findById(decoded._id);

  next();
});
