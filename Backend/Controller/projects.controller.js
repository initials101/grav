import { validationResult } from "express-validator"
import prisma from "../config/database.js"
import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js"

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res, next) => {
  const page = Number.parseInt(req.query.page) || 1
  const limit = Number.parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  // Build where clause
  const where = {}

  // Filter by status
  if (req.query.status) {
    where.status = req.query.status.toUpperCase()
  }

  // Filter by technology
  if (req.query.tech) {
    where.tech = { has: req.query.tech }
  }

  // Filter by owner (if user is authenticated)
  if (req.query.owner && req.user) {
    where.ownerId = req.query.owner
  }

  // Only show public projects for non-authenticated users
  if (!req.user) {
    where.isPublic = true
  } else if (req.user.role !== "ADMIN") {
    // For regular users, show public projects and their own projects
    where.OR = [{ isPublic: true }, { ownerId: req.user.id }, { collaborators: { some: { userId: req.user.id } } }]
  }

  // Search by name or description
  if (req.query.search) {
    const searchCondition = {
      OR: [
        { name: { contains: req.query.search, mode: "insensitive" } },
        { description: { contains: req.query.search, mode: "insensitive" } },
      ],
    }

    if (where.OR) {
      where.AND = [{ OR: where.OR }, searchCondition]
      delete where.OR
    } else {
      where.OR = searchCondition.OR
    }
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        collaborators: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            collaborators: true,
          },
        },
      },
      orderBy: { lastUpdated: "desc" },
      skip,
      take: limit,
    }),
    prisma.project.count({ where }),
  ])

  // Add virtual fields
  const projectsWithVirtuals = projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toLocaleDateString(),
    lastUpdated: formatLastUpdated(project.lastUpdated),
  }))

  res.status(200).json({
    success: true,
    data: {
      projects: projectsWithVirtuals,
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
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
      collaborators: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
      },
    },
  })

  if (!project) {
    return next(new AppError("Project not found", 404))
  }

  // Check if user has access to private project
  if (
    !project.isPublic &&
    (!req.user ||
      (project.ownerId !== req.user.id &&
        req.user.role !== "ADMIN" &&
        !project.collaborators.some((collab) => collab.userId === req.user.id)))
  ) {
    return next(new AppError("Access denied to this project", 403))
  }

  // Add virtual fields
  const projectWithVirtuals = {
    ...project,
    createdAt: project.createdAt.toLocaleDateString(),
    lastUpdated: formatLastUpdated(project.lastUpdated),
  }

  res.status(200).json({
    success: true,
    data: {
      project: projectWithVirtuals,
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
    ownerId: req.user.id,
    status: req.body.status ? req.body.status.toUpperCase() : "DEVELOPMENT",
  }

  const project = await prisma.project.create({
    data: projectData,
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  })

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
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
  })

  if (!project) {
    return next(new AppError("Project not found", 404))
  }

  // Check if user owns the project or is admin
  if (project.ownerId !== req.user.id && req.user.role !== "ADMIN") {
    return next(new AppError("Not authorized to update this project", 403))
  }

  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const updateData = {
    ...req.body,
    lastUpdated: new Date(),
  }

  if (req.body.status) {
    updateData.status = req.body.status.toUpperCase()
  }

  const updatedProject = await prisma.project.update({
    where: { id: req.params.id },
    data: updateData,
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  })

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: {
      project: updatedProject,
    },
  })
})

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = asyncHandler(async (req, res, next) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
  })

  if (!project) {
    return next(new AppError("Project not found", 404))
  }

  // Check if user owns the project or is admin
  if (project.ownerId !== req.user.id && req.user.role !== "ADMIN") {
    return next(new AppError("Not authorized to delete this project", 403))
  }

  await prisma.project.delete({
    where: { id: req.params.id },
  })

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  })
})

// @desc    Add collaborator to project
// @route   POST /api/projects/:id/collaborators
// @access  Private
export const addCollaborator = asyncHandler(async (req, res, next) => {
  const { userId, role = "VIEWER" } = req.body

  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
  })

  if (!project) {
    return next(new AppError("Project not found", 404))
  }

  // Check if user owns the project
  if (project.ownerId !== req.user.id) {
    return next(new AppError("Not authorized to add collaborators", 403))
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  // Check if user is already a collaborator
  const existingCollaborator = await prisma.projectCollaborator.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId: req.params.id,
      },
    },
  })

  if (existingCollaborator) {
    return next(new AppError("User is already a collaborator", 400))
  }

  await prisma.projectCollaborator.create({
    data: {
      userId,
      projectId: req.params.id,
      role: role.toUpperCase(),
    },
  })

  const updatedProject = await prisma.project.findUnique({
    where: { id: req.params.id },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
      collaborators: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
      },
    },
  })

  res.status(200).json({
    success: true,
    message: "Collaborator added successfully",
    data: {
      project: updatedProject,
    },
  })
})

// @desc    Get project statistics
// @route   GET /api/projects/stats
// @access  Private/Admin
export const getProjectStats = asyncHandler(async (req, res, next) => {
  const [totalProjects, activeProjects, developmentProjects, publicProjects, newProjects, techStats] =
    await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: "ACTIVE" } }),
      prisma.project.count({ where: { status: "DEVELOPMENT" } }),
      prisma.project.count({ where: { isPublic: true } }),
      prisma.project.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          },
        },
      }),
      // Get most used technologies
      prisma.$queryRaw`
      SELECT tech, COUNT(*) as count
      FROM (
        SELECT UNNEST(tech) as tech
        FROM projects
      ) as tech_list
      GROUP BY tech
      ORDER BY count DESC
      LIMIT 10
    `,
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

// Helper function to format last updated time
const formatLastUpdated = (lastUpdated) => {
  const now = new Date()
  const diff = now - lastUpdated
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours === 0) {
      const minutes = Math.floor(diff / (1000 * 60))
      return minutes <= 1 ? "Just now" : `${minutes} minutes ago`
    }
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`
  }
  return days === 1 ? "1 day ago" : `${days} days ago`
}
