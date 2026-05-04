import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";
// Wrapped the whole middleware in asyncHandler → catches any async errors.
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Any JWT verification errors (like expired or malformed tokens) now automatically go to my global error handler in server.js.
//

// If token is missing or invalid → throws an error instead of calling next() manually.
