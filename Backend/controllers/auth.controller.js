import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// const registerUser = async (req, res) => {
//   try {
//     console.log("📥 Incoming body:", req.body);

//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//       console.warn("⚠️ Missing fields");
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.warn("⚠️ User already exists:", email);
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("🔐 Password hashed");

//     const newUser = new User({ username, email, password: hashedPassword });

//     await newUser.save();
//     console.log("✅ User saved to DB");

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("❌ Error in registerUser:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { registerUser, loginUser };
// Compare this snippet from Backend/models/user.model.js:
// import mongoose from "mongoose";
