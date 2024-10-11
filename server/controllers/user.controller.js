const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const envConstants = require("../constants/envConstants");
const errorResponse = require("../utils/errorResponse");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return errorResponse(res, 400, "All fields are required to login user");
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return errorResponse(res, 400, "Email not registered with us");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return errorResponse(res, 400, "Invalid password");
    }

    const payload = {
      id: user._id,
      name: user.name,
    };

    const token = await jwt.sign(payload, envConstants.JWT.JWT_SECRET, {
      expiresIn: envConstants.JWT.TOKEN_LIFE,
    });

    user.password = undefined;

    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log("SERVER ERROR WHILE LOGIN:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return errorResponse(res, 400, "All fields are required to register user");
  }
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return errorResponse(res, 401, "User already registered with this email");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    savedUser.password = undefined;

    const payload = {
      id: savedUser._id,
      name: savedUser.name,
    };

    const token = await jwt.sign(payload, envConstants.JWT.JWT_SECRET, {
      expiresIn: envConstants.JWT.TOKEN_LIFE,
    });

    return res.status(201).json({
      success: true,
      token,
      user: newUser,
    });
  } catch (error) {
    console.log("SERVER ERROR WHILE REGISTER USER:", error.message);
    errorResponse(res, 500, error.message);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return errorResponse(res, 500, "Server error in get profile");
  }
};

module.exports = {
  loginUser,
  registerUser,
  getProfile,
};
