import express from "express"
import { body } from "express-validator"
import {
  getUsers,
  getUser,
  updateProfile,
  updateUser,
  deleteUser,
  getUserStats,
} from "../controllers/users.controller.js"
import { protect, authorize } from "../middleware/auth.js"

const router = express.Router()

// Validation rules
const profileUpdateValidation = [
  body("name").optional().trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
  body("email").optional().isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),
]

const userUpdateValidation = [
  body("name").optional().trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
  body("email").optional().isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("role").optional().isIn(["user", "admin"]).withMessage("Role must be either user or admin"),
  body("isActive").optional().isBoolean().withMessage("isActive must be a boolean value"),
]

// All routes require authentication
router.use(protect)

// Routes
router.get("/stats", authorize("admin"), getUserStats)
router.get("/", authorize("admin"), getUsers)
router.get("/:id", getUser)
router.put("/profile", profileUpdateValidation, updateProfile)
router.put("/:id", authorize("admin"), userUpdateValidation, updateUser)
router.delete("/:id", authorize("admin"), deleteUser)

export default router
