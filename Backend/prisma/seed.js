import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seeding...")

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@mernstack.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@mernstack.com",
      password: hashedPassword,
      role: "ADMIN",
      isActive: true,
    },
  })

  console.log("👤 Created admin user:", adminUser.email)

  // Create demo user
  const demoPassword = await bcrypt.hash("demo123", 10)

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@mernstack.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@mernstack.com",
      password: demoPassword,
      role: "USER",
      isActive: true,
    },
  })

  console.log("👤 Created demo user:", demoUser.email)

  // Create sample projects
  const sampleProjects = [
    {
      name: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with React frontend, Node.js backend, and MongoDB database. Features include user authentication, product catalog, shopping cart, and payment integration.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT"],
      status: "ACTIVE",
      users: 1250,
      isPublic: true,
      tags: ["ecommerce", "fullstack", "payment"],
      ownerId: adminUser.id,
    },
    {
      name: "Social Media Dashboard",
      description:
        "A comprehensive social media management dashboard built with MERN stack. Allows users to manage multiple social media accounts, schedule posts, and analyze engagement metrics.",
      tech: ["React", "Redux", "Node.js", "Express", "MongoDB", "Socket.io"],
      status: "DEVELOPMENT",
      users: 450,
      isPublic: true,
      tags: ["social-media", "dashboard", "analytics"],
      ownerId: adminUser.id,
    },
    {
      name: "Task Management System",
      description:
        "A collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.",
      tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "WebSocket"],
      status: "ACTIVE",
      users: 890,
      isPublic: true,
      tags: ["productivity", "collaboration", "realtime"],
      ownerId: demoUser.id,
    },
    {
      name: "Learning Management System",
      description:
        "An online learning platform with course creation, student enrollment, progress tracking, and interactive quizzes.",
      tech: ["React", "Node.js", "Express", "MongoDB", "AWS S3", "FFmpeg"],
      status: "DEVELOPMENT",
      users: 320,
      isPublic: false,
      tags: ["education", "lms", "video"],
      ownerId: demoUser.id,
    },
    {
      name: "Real Estate Portal",
      description:
        "A modern real estate listing platform with advanced search filters, virtual tours, and agent management system.",
      tech: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Mapbox"],
      status: "ACTIVE",
      users: 2100,
      isPublic: true,
      tags: ["real-estate", "maps", "search"],
      ownerId: adminUser.id,
    },
  ]

  for (const projectData of sampleProjects) {
    const project = await prisma.project.create({
      data: projectData,
    })
    console.log("📁 Created project:", project.name)
  }

  console.log("✅ Database seeding completed!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e)
    await prisma.$disconnect()
    process.exit(1)
  })
