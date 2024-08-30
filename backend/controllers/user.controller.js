const { default: mongoose } = require("mongoose");
const User = require("../models/user.model");

const userController = {
  logout: (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 1 });
      res.status(200).json({ msg: "Logout successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      // get id from params
      const { id } = req.params;

      // check if id is valid
      if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ msg: "ID is not valid" });
      }

      // check if user exists
      const user = await User.findById(id);

      // if user does not exist
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // get data from body
      const { username, avatar, email } = req.body;

      console.log(username, avatar, email);

      // update user
      const newUser = await User.findByIdAndUpdate(
        id,
        { $set: { username, avatar, email } },
        { new: true }
      );

      const { password, ...others } = newUser._doc;

      res.status(200).json({
        msg: "Update user successfully",
        user: others,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      // get id from params
      const { id } = req.params; // check if id is valid

      if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ msg: "ID is not valid" });
      }

      // check if user exists
      const user = await User.findById(id);

      // if user does not exist
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // delete user
      await User.findByIdAndDelete(id);

      res.status(200).json({ msg: "Delete user successfully", success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userController;
