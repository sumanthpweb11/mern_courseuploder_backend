import express from "express";
import {
  changePassword,
  getMyProfile,
  login,
  logout,
  register,
  updateProfile,
  updateProfilePicture,
  forgotPassword,
  resetPassword,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteMyProfile,
} from "../controllers/userController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// To register a new user
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);
// Logout
router.route("/logout").get(logout);
// Get My Profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Delete My Profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// Change Password
router.route("/changepassword").put(isAuthenticated, changePassword);
// Update Profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);
// Update Profile Picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);

// Forgot Password
router.route("/forgotpassword").post(forgotPassword);
// Reset Password
router.route("/resetpassword/:token").put(resetPassword);

// Add To Playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

//Remove From Playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// Admin Routes

// Get All Users
router.route("/admin/users").get(isAuthenticated, authorizedAdmin, getAllUsers);

// Update user role and Delete user
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizedAdmin, updateUserRole)
  .delete(isAuthenticated, authorizedAdmin, deleteUser);

export default router;
