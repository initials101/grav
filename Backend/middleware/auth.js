import jwt from "jsonwebtoken"
import prisma from "../config/database.js"
import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js"

// Protect routes - require authentication
export const protect = asyncHandler(async (req, res, next) => {
  let token

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  // Make sure token exists
  if (!token) {
    return next(new AppError("Not authorized to access this route", 401))
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret")

    // Get user from token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    })

    if (!user) {
      return next(new AppError("No user found with this token", 401))
    }

    // Check if user is active
    if (!user.isActive) {
      return next(new AppError("User account is deactivated", 401))
    }

    req.user = user
    next()
  } catch (error) {
    return next(new AppError("Not authorized to access this route", 401))
  }
})

// Optional authentication - doesn't require token but sets user if present
export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret")

      // Get user from token
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
        },
      })

      if (user && user.isActive) {
        req.user = user
      }
    } catch (error) {
      // Token is invalid, but we continue without user
      console.log("Invalid token in optional auth:", error.message)
    }
  }

  next()
})

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Not authorized to access this route", 401))
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(`User role ${req.user.role} is not authorized to access this route`, 403))
    }

    next()
  }
}
