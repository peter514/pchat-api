const User = require("../models/User.js");
const bcrypt = require("bcrypt");



const login = async (req, res) => {
  console.log("Login Attempt...")
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }


  let foundUser = await User.findOne({userName }).exec();

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unauthorized, try again!" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Incorrect login details!" });

  const roles = foundUser.roles;
  const userId = foundUser._id;
  res.json({  roles, userId, message:"Access granted!" });
};
module.exports = {
    login
}
