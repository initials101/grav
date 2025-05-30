import { validationResult } from "express-validator"
import prisma from "../config/database.js"
import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js"

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res, next) => {
  const page = Number.parseInt(req.query.page) || 1
  const limit = Number.parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  // Build where clause
  const where = {}

  // Filter by role
  if (req.query.role) {
    where.role = req.query.role.toUpperCase()
  }

  // Filter by active status
  if (req.query.isActive !== undefined) {
    where.isActive = req.query.isActive === "true"
  }

  // Search by name or email
  if (req.query.search) {
    where.OR = [
      { name: { contains: req.query.search, mode: "insensitive" } },
      { email: { contains: req.query.search, mode: "insensitive" } },
    ]
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
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
        _count: {
          select: {
            ownedProjects: true,
            collaborations: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.user.count({ where }),
  ])

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
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
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
      ownedProjects: {
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          isPublic: true,
          createdAt: true,
        },
      },
      collaborations: {
        select: {
          role: true,
          project: {
            select: {
              id: true,
              name: true,
              description: true,
              status: true,
            },
          },
        },
      },
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
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return next(new AppError("Email is already taken", 400))
    }
  }

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      ...(name && { name }),
      ...(email && { email }),
      ...(avatar !== undefined && { avatar }),
    },
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

  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
  })

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  // Check if email is already taken by another user
  if (email && email !== user.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return next(new AppError("Email is already taken", 400))
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: req.params.id },
    data: {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role: role.toUpperCase() }),
      ...(isActive !== undefined && { isActive }),
    },
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
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
  })

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  // Prevent admin from deleting themselves
  if (user.id === req.user.id) {
    return next(new AppError("You cannot delete your own account", 400))
  }

  await prisma.user.delete({
    where: { id: req.params.id },
  })

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  })
})

// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private/Admin
export const getUserStats = asyncHandler(async (req, res, next) => {
  const [totalUsers, activeUsers, adminUsers, newUsers] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isActive: true } }),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        },
      },
    }),
  ])

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
