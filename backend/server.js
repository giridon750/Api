const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend Server is Working!",
    status: "success",
  });
});

app.get("/api/message", (req, res) => {
  res.json({
    message: "Backend is working!",
    status: "success",
  });
});

app.post("/api/login", (req, res) => {
  try {
    const { username, password } = req.body || {};
    const usernameForLog =
      typeof username === "string" && username.length > 0
        ? username
        : "(empty)";
    const passwordReceived =
      typeof password === "string" && password.length > 0;

    console.log("--- LOGIN REQUEST RECEIVED ---");
    console.log(`Username received: ${usernameForLog}`);
    console.log(`Password field received: ${passwordReceived ? "Yes" : "No"}`);

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      !password.trim()
    ) {
      console.log("Login result: FAILED");
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    if (username === "admin" && password === "12345") {
      console.log("Login result: SUCCESS");
      return res.json({
        success: true,
        message: "Login successful!",
        user: {
          username: username,
        },
      });
    }

    console.log("Login result: FAILED");
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  } catch (error) {
    console.error("Login request failed:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
