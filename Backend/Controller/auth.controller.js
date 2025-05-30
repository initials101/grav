import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { validationResult } from "express-validator"
import prisma from "../config/database.js"
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
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return next(new AppError("User already exists with this email", 400))
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      isActive: true,
    },
  })

  // Generate token
  const token = generateToken(user.id)

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  })

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user,
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
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return next(new AppError("Invalid credentials", 401))
  }

  // Check if user is active
  if (!user.isActive) {
    return next(new AppError("Account is deactivated", 401))
  }

  // Check password
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    return next(new AppError("Invalid credentials", 401))
  }

  // Generate token
  const token = generateToken(user.id)

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  })

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: userWithoutPassword,
      token,
    },
  })
})

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
    },
  })

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
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  })

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  // Check current password
  const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, user.password)
  if (!isCurrentPasswordCorrect) {
    return next(new AppError("Current password is incorrect", 400))
  }

  // Hash new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 10)

  // Update password
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedNewPassword },
  })

  // Generate new token
  const token = generateToken(user.id)

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
    data: {
      token,
    },
  })
})
