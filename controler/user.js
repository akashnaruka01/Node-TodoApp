import { User } from "../models/user.js ";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import errorHandler from "./middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password"); // because we have declare user password select as false.

    if (!user) return next(new errorHandler("Invalid email or password", 404)); // here Error is a class.

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new errorHandler("Invalid email or password", 404)); // here Error is a class.

    sendCookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    next("invalid email or password");
  }
};
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new errorHandler("user already exit", 404)); // here Error is a class.

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "user registered succesfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyDetails = (req, res) => {
  res.status(200).json({
    message: "user details fetched successfully",
    user: req.user,
  });
  console.log("akash", req.user);
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.Node_ENV === "Development" ? "lax" : "none", // it is for our cookie to be sended on different url because in our case frontend and backend are on different url.
      secure: process.env.Node_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "logout succesfully",
    });
};
