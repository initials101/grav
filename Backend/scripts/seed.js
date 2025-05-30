import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import User from "../models/User.model.js"
import Project from "../models/Project.model.js"

// Load environment variables
dotenv.config()

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mern_stack")
    console.log("📦 Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Project.deleteMany({})
    console.log("🗑️  Cleared existing data")

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10)
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@mernstack.com",
      password: adminPassword,
      role: "admin",
      isActive: true,
    })
    console.log("👤 Created admin user")

    // Create demo user
    const demoPassword = await bcrypt.hash("demo123", 10)
    const demoUser = await User.create({
      name: "Demo User",
      email: "demo@mernstack.com",
      password: demoPassword,
      role: "user",
      isActive: true,
    })
    console.log("👤 Created demo user")

    // Create sample projects
    const sampleProjects = [
      {
        name: "E-Commerce Platform",
        description:
          "A full-featured e-commerce platform with React frontend, Node.js backend, and MongoDB database. Features include user authentication, product catalog, shopping cart, and payment integration.",
        tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT"],
        status: "active",
        users: 1250,
        isPublic: true,
        tags: ["ecommerce", "fullstack", "payment"],
        owner: adminUser._id,
      },
      {
        name: "Social Media Dashboard",
        description:
          "A comprehensive social media management dashboard built with MERN stack. Allows users to manage multiple social media accounts, schedule posts, and analyze engagement metrics.",
        tech: ["React", "Redux", "Node.js", "Express", "MongoDB", "Socket.io"],
        status: "development",
        users: 450,
        isPublic: true,
        tags: ["social-media", "dashboard", "analytics"],
        owner: adminUser._id,
      },
      {
        name: "Task Management System",
        description:
          "A collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.",
        tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "WebSocket"],
        status: "active",
        users: 890,
        isPublic: true,
        tags: ["productivity", "collaboration", "realtime"],
        owner: demoUser._id,
      },
      {
        name: "Learning Management System",
        description:
          "An online learning platform with course creation, student enrollment, progress tracking, and interactive quizzes.",
        tech: ["React", "Node.js", "Express", "MongoDB", "AWS S3", "FFmpeg"],
        status: "development",
        users: 320,
        isPublic: false,
        tags: ["education", "lms", "video"],
        owner: demoUser._id,
      },
      {
        name: "Real Estate Portal",
        description:
          "A modern real estate listing platform with advanced search filters, virtual tours, and agent management system.",
        tech: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Mapbox"],
        status: "active",
        users: 2100,
        isPublic: true,
        tags: ["real-estate", "maps", "search"],
        owner: adminUser._id,
      },
    ]

    for (const projectData of sampleProjects) {
      await Project.create(projectData)
    }
    console.log("📁 Created sample projects")

    console.log("✅ Database seeding completed!")
    console.log("\n📋 Login Credentials:")
    console.log("Admin: admin@mernstack.com / admin123")
    console.log("Demo:  demo@mernstack.com / demo123")

    process.exit(0)
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

seedDatabase()
