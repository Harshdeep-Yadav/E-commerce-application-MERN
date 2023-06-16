import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";



// Protected routes token Based

// next->jab tak previous code success ni hoga tab tak aage ni jayega
export const requireSignIn = async (req, res, next) => {
  try {
    // jo token hota hai to headers me rehta hai isiliye req.body use ni karenge
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized User",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middlware",
    });
  }
};
