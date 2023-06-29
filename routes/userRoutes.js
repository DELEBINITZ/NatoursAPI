const express = require("express")
const userController = require("./../controllers/userController")
const authController = require("./../controllers/authController")

const router = express.Router()

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/forgotPassword", authController.forgotPassword)
router.post("/resetPassword/:token", authController.resetPassword)

router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
)
router.patch(
  "/updateProfile",
  authController.protect,
  userController.updateProfile
)
router.delete(
  "/deleteProfile",
  authController.protect,
  userController.deleteProfile
)

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser)


router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router
