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

export const authorizedAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );

  next();
};

// Only subscribers can access lectures
export const authorizeSubscribers = (req, res, next) => {
  if (req.user.subscription.status !== "active" && req.user.role !== "admin")
    return next(
      new ErrorHandler("Only Subscribers Can Access This Resource", 403)
    );

  next();
};
