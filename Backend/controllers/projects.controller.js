import { validationResult } from "express-validator"
import Project from "../models/Project.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js"

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res, next) => {
  const page = Number.parseInt(req.query.page) || 1
  const limit = Number.parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  // Build query
  const query = {}

  // Filter by status
  if (req.query.status) {
    query.status = req.query.status
  }

  // Filter by technology
  if (req.query.tech) {
    query.tech = { $in: [req.query.tech] }
  }

  // Filter by owner (if user is authenticated)
  if (req.query.owner && req.user) {
    query.owner = req.query.owner
  }

  // Only show public projects for non-authenticated users
  if (!req.user) {
    query.isPublic = true
  } else if (req.user.role !== "admin") {
    // For regular users, show public projects and their own projects
    query.$or = [{ isPublic: true }, { owner: req.user.id }, { "collaborators.user": req.user.id }]
  }

  // Search by name or description
  if (req.query.search) {
    query.$and = query.$and || []
    query.$and.push({
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ],
    })
  }

  const projects = await Project.find(query)
    .populate("owner", "name email")
    .populate("collaborators.user", "name email")
    .sort({ lastUpdated: -1 })
    .skip(skip)
    .limit(limit)

  const total = await Project.countDocuments(query)

  res.status(200).json({
    success: true,
    data: {
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  })
})

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id)
    .populate("owner", "name email avatar")
    .populate("collaborators.user", "name email avatar")

  if (!project) {
    return next(new AppError("Project not found", 404))
  }

  // Check if user has access to private project
  if (
    !project.isPublic &&
    (!req.user ||
      (project.owner._id.toString() !== req.user.id &&
        req.user.role !== "admin" &&
        !project.collaborators.some((collab) => collab.user._id.toString() === req.user.id)))
  ) {
    return next(new AppError("Access denied to this project", 403))
  }

  res.status(200).json({
    success: true,
    data: {
      project,
    },
  })
})

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
export const createProject = asyncHandler(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const projectData = {
    ...req.body,
    owner: req.user.id,
  }

  const project = await Project.create(projectData)

  // Populate owner information
  await project.populate("owner", "name email")

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: {
      project,
    },
  })
})

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = asyncHandler(async (req, res, next) => {
  let project = await Project.findById(req.params.id)

  if (!project) {
    return next(new AppError("Project not found", 404))
  }

  // Check if user owns the project or is admin
  if (project.owner.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new AppError("Not authorized to update this project", 403))
  }

  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("owner", "name email")

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: {
      project,
    },
  })
})

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    return next(new AppError("Project not found", 404))
  }

  // Check if user owns the project or is admin
  if (project.owner.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new AppError("Not authorized to delete this project", 403))
  }

  await Project.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  })
})

// @desc    Add collaborator to project
// @route   POST /api/projects/:id/collaborators
// @access  Private
export const addCollaborator = asyncHandler(async (req, res, next) => {
  const { userId, role = "viewer" } = req.body

  const project = await Project.findById(req.params.id)

  if (!project) {
    return next(new AppError("Project not found", 404))
  }

  // Check if user owns the project
  if (project.owner.toString() !== req.user.id) {
    return next(new AppError("Not authorized to add collaborators", 403))
  }

  // Check if user is already a collaborator
  const existingCollaborator = project.collaborators.find((collab) => collab.user.toString() === userId)

  if (existingCollaborator) {
    return next(new AppError("User is already a collaborator", 400))
  }

  project.collaborators.push({ user: userId, role })
  await project.save()

  await project.populate("collaborators.user", "name email")

  res.status(200).json({
    success: true,
    message: "Collaborator added successfully",
    data: {
      project,
    },
  })
})

// @desc    Get project statistics
// @route   GET /api/projects/stats
// @access  Private/Admin
export const getProjectStats = asyncHandler(async (req, res, next) => {
  const totalProjects = await Project.countDocuments()
  const activeProjects = await Project.countDocuments({ status: "active" })
  const developmentProjects = await Project.countDocuments({ status: "development" })
  const publicProjects = await Project.countDocuments({ isPublic: true })

  // Projects created in the last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const newProjects = await Project.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  })

  // Most used technologies
  const techStats = await Project.aggregate([
    { $unwind: "$tech" },
    { $group: { _id: "$tech", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ])

  res.status(200).json({
    success: true,
    data: {
      totalProjects,
      activeProjects,
      developmentProjects,
      inactiveProjects: totalProjects - activeProjects - developmentProjects,
      publicProjects,
      privateProjects: totalProjects - publicProjects,
      newProjects,
      topTechnologies: techStats,
    },
  })
})
