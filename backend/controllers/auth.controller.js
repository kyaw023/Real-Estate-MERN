const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const createToken = require("../helpers/createToken");

const authController = {
  signUp: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if email is existed
      const isEmailExisted = await User.findOne({ email });

      // If email is existed
      if (isEmailExisted) {
        return res.status(403).json({ msg: "Email is already existed" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);

      // Hash password
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      // Create token
      const token = createToken(user._id);

      // Set cookie
      res.cookie("jwt", token, {
        httpOnly: false, // Prevent client-side JavaScript from accessing the cookie
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      // Send response
      return res.json({
        user,
        msg: "Sign up successfully",
        success: true,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  },

  signIn: async (req, res) => {
    try {
      // Get email and password from request body
      const { email, password } = req.body;

      // Check if email is existed
      const user = await User.findOne({ email });

      // If email is not existed
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Compare password
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      // If password is incorrect
      if (!isPasswordMatch) {
        return res.status(401).json({ msg: "Password is incorrect" });
      }

      // Create token
      const token = createToken(user._id);

      // Set cookie with token and maxAge (1 day)
      res.cookie("jwt", token, {
        httpOnly: false,

        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      // Remove password from user object
      const { password: pwd, ...others } = user._doc;

      // Send response with user and token
      return res.json({
        user: others,
        msg: "Sign in successfully",
        success: true,
      });

      // If error occurs
    } catch (error) {
      console.log(error);

      return res.status(500).json({ msg: "Internal server error" });
    }
  },

  googleAuth: async (req, res) => {
    try {
      // Get email, username, and photo from request body
      const { email, username, photo } = req.body;

      console.log(email, username, photo);

      // Check if email already exists
      let user = await User.findOne({ email });

      // If user exists, generate a token and return user data
      if (user) {
        const token = createToken(user._id);

        res.cookie("jwt", token, {
          httpOnly: false,
          maxAge: 24 * 60 * 60 * 1000, // 1 dayy
        });

        const newUser = await User.findByIdAndUpdate(
          user._id,
          {
            avatar: photo,
          },
          { new: true }
        );

        const { password, ...userWithoutPassword } = newUser?._doc || {};
        return res.json({ user: userWithoutPassword });
      } else {
        // If user does not exist, create a new user
        const generatePassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(generatePassword, salt);

        user = await User.create({
          email,
          username:
            (username || "").split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-8),
          password: hashedPassword,
          avatar: photo,
        });

        if (!user) {
          throw new Error("User creation failed");
        }

        const token = createToken(user._id);

        res.cookie("jwt", token, {
          httpOnly: false,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        const { password, ...userWithoutPassword } = user._doc || {};
        return res.json({ user: userWithoutPassword });
      }
    } catch (error) {
      console.error("Error during Google authentication:", error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  },

  gitHubAuth: async (req, res) => {
    try {
      const { email, username, photo } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        const token = createToken(user._id);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        const { password, ...userWithoutPassword } = user._doc || {};
        return res.json({ user: userWithoutPassword });
      } else {
        const generatePassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(generatePassword, salt);

        user = await User.create({
          email,
          username:
            (username || "").split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-8),
          password: hashedPassword,
          avatar: photo,
        });

        if (!user) {
          throw new Error("User creation failed");
        }

        const token = createToken(user._id);

        res.cookie("jwt", token, {
          httpOnly: false,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        const { password, ...userWithoutPassword } = user._doc || {};
        return res.json({ user: userWithoutPassword });
      }
    } catch (error) {
      console.error("Error during GitHub authentication:", error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  },
};

module.exports = authController;
