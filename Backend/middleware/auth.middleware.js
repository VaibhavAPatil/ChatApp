import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided. " });
    }

    //Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({ message: "Invalid Token" });
    }

    // req.user = await User.findById(decoded.userId).select("-password");
    req.id = decoded.UserId;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
