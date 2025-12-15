import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Mock user
const mockUser = {
  email: "admin@bluetruth.com",
  password: "123456"
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    return res.json({ success: true });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});

app.post("/signup", (req, res) => {
  // Always succeed (mock)
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
n