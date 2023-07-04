import Register from "../models/Register.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Rest of the code remains the same


export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Register({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the user has a valid token
    if (user.token && user.tokenExpiration > Date.now()) {
      return res.json({ token: user.token });
    }

    // Generate a new token
    const token = jwt.sign({ userId: user._id }, "secretkey", {
      expiresIn: "5m",
    });

    // Update the user with the new token
    user.token = token;
    user.tokenExpiration = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
