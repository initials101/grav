import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import User from "../models/User.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js"

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const { name, email, password } = req.body

  // Check if user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return next(new AppError("User already exists with this email", 400))
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  })

  // Generate token
  const token = generateToken(user._id)

  // Update last login
  await user.updateLastLogin()

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    },
  })
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const { email, password } = req.body

  // Check if user exists and get password
  const user = await User.findOne({ email }).select("+password")
  if (!user) {
    return next(new AppError("Invalid credentials", 401))
  }

  // Check if user is active
  if (!user.isActive) {
    return next(new AppError("Account is deactivated", 401))
  }

  // Check password
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    return next(new AppError("Invalid credentials", 401))
  }

  // Generate token
  const token = generateToken(user._id)

  // Update last login
  await user.updateLastLogin()

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
      },
      token,
    },
  })
})

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  })
})

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Logout successful",
  })
})

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body

  // Get user with password
  const user = await User.findById(req.user.id).select("+password")

  // Check current password
  const isCurrentPasswordCorrect = await user.comparePassword(currentPassword)
  if (!isCurrentPasswordCorrect) {
    return next(new AppError("Current password is incorrect", 400))
  }

  // Update password
  user.password = newPassword
  await user.save()

  // Generate new token
  const token = generateToken(user._id)

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
    data: {
      token,
    },
  })
})
