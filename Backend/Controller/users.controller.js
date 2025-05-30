import { validationResult } from "express-validator"
import User from "../models/User.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js"

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res, next) => {
  const page = Number.parseInt(req.query.page) || 1
  const limit = Number.parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  // Build query
  const query = {}

  // Filter by role
  if (req.query.role) {
    query.role = req.query.role
  }

  // Filter by active status
  if (req.query.isActive !== undefined) {
    query.isActive = req.query.isActive === "true"
  }

  // Search by name or email
  if (req.query.search) {
    query.$or = [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ]
  }

  const users = await User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)

  const total = await User.countDocuments(query)

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  })
})

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  })
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const { name, email, avatar } = req.body

  // Check if email is already taken by another user
  if (email && email !== req.user.email) {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return next(new AppError("Email is already taken", 400))
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: name || req.user.name,
      email: email || req.user.email,
      avatar: avatar || req.user.avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: {
      user,
    },
  })
})

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
  const { name, email, role, isActive } = req.body

  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new AppError("User not found", 404))
  }

  // Check if email is already taken by another user
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return next(new AppError("Email is already taken", 400))
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: name || user.name,
      email: email || user.email,
      role: role || user.role,
      isActive: isActive !== undefined ? isActive : user.isActive,
    },
    {
      new: true,
      runValidators: true,
    },
  )

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: {
      user: updatedUser,
    },
  })
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  // Prevent admin from deleting themselves
  if (user._id.toString() === req.user.id) {
    return next(new AppError("You cannot delete your own account", 400))
  }

  await User.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  })
})

// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private/Admin
export const getUserStats = asyncHandler(async (req, res, next) => {
  const totalUsers = await User.countDocuments()
  const activeUsers = await User.countDocuments({ isActive: true })
  const adminUsers = await User.countDocuments({ role: "admin" })

  // Users registered in the last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const newUsers = await User.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  })

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      adminUsers,
      newUsers,
    },
  })
})
