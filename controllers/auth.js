const USER = require("../models/user");
const handleSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await USER.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      USER.create({ name, email, password });
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    } else {
      if (user.password === password) {
        return res.status(200).json({ message: "User logged in successfully" });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { handleSignup, handleLogin };
