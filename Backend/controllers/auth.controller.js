import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.model.js";

dotenv.config();

const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
      confirmPassword,
      mobileNo,
      gender,
    } = req.body;

    if (!fullName || !username || !email || !password || !mobileNo || !gender) {
      return res.status(400).json({ message: "All feilds are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { mobileNo }],
    });

    if (existingUser) {
      let conflictField = "";

      if (existingUser.email === email) conflictField = "Email";
      else if (existingUser.username === username) conflictField = "Username";
      else if (existingUser.mobileNo === mobileNo)
        conflictField = "Mobile number";

      return res.status(400).json({
        success: false,
        message: `${conflictField} already exists`,
      });
    }

    // Paasword Match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password dont match" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      mobileNo,
      gender,
    });

    // Save User
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, userName: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Set Cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access (secure)
      secure: false, // true only for https
      sameSite: "lax", // CSRF protection
      maxAge: 1 * 60 * 60 * 1000, // 1 hour
    });
    // send Json response
    res.json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ⭐ NEW: Persistent Login Route
const getLoggedInUser = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) return res.status(401).json({ loggedIn: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    res.json({ loggedIn: true, user });
  } catch (error) {
    return res.status(401).json({ loggedIn: false });
  }
};

export { registerUser, loginUser, getLoggedInUser };
