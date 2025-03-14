const express = require("express");
const router = express.Router();
const { registerUser, login, getUsers } = require("../controller/authController"); // Ensure the correct path

// Routes for user authentication
router.post("/register", registerUser);
router.post("/login", login);
router.get("/users", getUsers);

module.exports = router;
