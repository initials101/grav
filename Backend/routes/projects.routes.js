import express from "express"
import { body } from "express-validator"
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  addCollaborator,
  getProjectStats,
} from "../controllers/projects.controller.js"
import { protect, authorize, optionalAuth } from "../middleware/auth.js"

const router = express.Router()

// Validation rules
const projectValidation = [
  body("name").trim().isLength({ min: 2, max: 100 }).withMessage("Project name must be between 2 and 100 characters"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),
  body("tech").isArray({ min: 1 }).withMessage("At least one technology must be specified"),
  body("status")
    .optional()
    .isIn(["active", "development", "inactive", "completed"])
    .withMessage("Invalid status value"),
  body("isPublic").optional().isBoolean().withMessage("isPublic must be a boolean value"),
]

const collaboratorValidation = [
  body("userId").isMongoId().withMessage("Valid user ID is required"),
  body("role").optional().isIn(["viewer", "editor", "admin"]).withMessage("Role must be viewer, editor, or admin"),
]

// Routes
router.get("/stats", protect, authorize("admin"), getProjectStats)
router.get("/", optionalAuth, getProjects)
router.get("/:id", optionalAuth, getProject)
router.post("/", protect, projectValidation, createProject)
router.put("/:id", protect, projectValidation, updateProject)
router.delete("/:id", protect, deleteProject)
router.post("/:id/collaborators", protect, collaboratorValidation, addCollaborator)

export default router
