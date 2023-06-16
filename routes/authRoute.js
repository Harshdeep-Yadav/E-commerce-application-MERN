import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//  routing object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// FORGOT-PASSWORD || POST
router.post("/forgot-password", forgotPasswordController);

// TEST
router.get("/test", requireSignIn, isAdmin, testController); // requireSignIn and isAdmin are Middlewares

// Protected routes (USER routes)
router.get("/user-auth", requireSignIn, (req, res) => { //?? yo galat h user-auth
  res.status(200).send({
    ok: true,
  });
});

// Protected routes (Admin routes)
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// update profile (user)
router.put("/profile", requireSignIn, updateProfileController);

// order
router.get("/orders", requireSignIn, getOrdersController);


// All order
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order update status

router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

export default router;
