import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.Node_ENV === "Development" ? "lax" : "none", // it is for our cookie to be sended on different url because in our case frontend and backend are on different url.
      secure: process.env.Node_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
