import { PrismaClient } from "@prisma/client"

// Create a single instance of Prisma Client
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
  errorFormat: "pretty",
})

// Handle Prisma Client connection
const connectDB = async () => {
  try {
    await prisma.$connect()
    console.log("📦 Database connected successfully with Prisma")

    // Test the connection
    await prisma.$queryRaw`SELECT 1`
    console.log("✅ Database connection test passed")
  } catch (error) {
    console.error("❌ Database connection failed:", error.message)
    process.exit(1)
  }
}

// Graceful shutdown
const disconnectDB = async () => {
  try {
    await prisma.$disconnect()
    console.log("📦 Database disconnected")
  } catch (error) {
    console.error("❌ Error disconnecting from database:", error.message)
  }
}

// Handle process termination
process.on("SIGINT", async () => {
  await disconnectDB()
  process.exit(0)
})

process.on("SIGTERM", async () => {
  await disconnectDB()
  process.exit(0)
})

export { prisma, connectDB, disconnectDB }
export default prisma
