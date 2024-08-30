const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const AuthMiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    console.log(token, "token");

    if (!token) {
      return res
        .status(400)
        .json({ message: "Token is required for authentication." });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user by the decoded token's ID
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    // Handle token verification errors or other exceptions
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = AuthMiddleWare;
