const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailer = require("nodemailer");

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["customer", "supplier"], required: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date },
});

const User = mongoose.model("User", UserSchema);

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP Route
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  try {
    // Save OTP to user
    const user = await User.findOneAndUpdate({ email }, { otp, otpExpires }, { new: true });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Send OTP via email
    await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    });

    res.status(200).send("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).send("Error sending OTP: " + error.message);
  }
});

// Verify OTP Route
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send("Email and OTP are required");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found with email:", email);
      return res.status(404).send("User not found");
    }

    if (user.otp !== otp) {
      console.log("Invalid OTP for email:", email);
      return res.status(400).send("Invalid OTP");
    }

    if (user.otpExpires < Date.now()) {
      console.log("Expired OTP for email:", email);
      return res.status(400).send("Expired OTP");
    }

    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).send({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).send("Error verifying OTP");
  }
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { email, username, password, mode, phone } = req.body; // Include phone in the request

  // Map 'mode' to 'role' as per your schema
  const role = mode; // Rename 'mode' to 'role'

  console.log("Sign-Up Request Body:", req.body); // Debugging incoming request

  if (!email || !username || !role || !password || !phone) {
    return res.status(400).send("All fields are required");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return res.status(400).send("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({ email, username, role, password: hashedPassword, phone });
    await newUser.save();

    console.log("New user registered successfully:", email);
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send("Error in signing up");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Invalid credentials for email:", email);
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("User logged in successfully:", email);
    res.status(200).json({ token, role: user.role, username: user.username });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("Error in logging in");
  }
});

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));