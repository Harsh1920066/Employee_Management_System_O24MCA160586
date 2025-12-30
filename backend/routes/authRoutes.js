import express from "express";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js"; // Sequelize model

const router = express.Router();

//////////////////////////
// Signup Route
//////////////////////////
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Signup Request body:", req.body);

    // Check if admin already exists
    const existingUser = await Admin.findOne({ where: { email } });
    if (existingUser) {
      console.log("Signup attempt failed: Admin already exists");
      return res.status(400).json({ message: "Admin already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword
    });

    console.log("Signup successful:", newAdmin.email);
    res.status(201).json({ message: "Admin registered successfully!", admin: newAdmin });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//////////////////////////
// Login Route
//////////////////////////
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Request body:", req.body);

    // Find admin by email
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      console.log("Login failed: Admin not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("Login failed: Incorrect password");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Login successful:", admin.email);
    // Optionally: generate JWT token here

    res.status(200).json({ message: "Login successful", admin: {
        id: admin.id,
        name: admin.name,  // <-- send name
        email: admin.email,
      }
 });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
