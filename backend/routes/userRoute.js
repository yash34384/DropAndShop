const express = require("express");
const { registerUser, loginUser, logout, forgettPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controller/userController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgettPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizedRoles("admin"), getAllUser);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser).put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole).delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);
module.exports = router;