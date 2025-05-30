import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      maxlength: [100, "Project name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    tech: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["active", "development", "inactive", "completed"],
      default: "development",
    },
    users: {
      type: Number,
      default: 0,
      min: [0, "Users count cannot be negative"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["viewer", "editor", "admin"],
          default: "viewer",
        },
      },
    ],
    repository: {
      url: String,
      branch: {
        type: String,
        default: "main",
      },
    },
    deployment: {
      url: String,
      status: {
        type: String,
        enum: ["deployed", "deploying", "failed", "not-deployed"],
        default: "not-deployed",
      },
    },
    tags: [String],
    isPublic: {
      type: Boolean,
      default: false,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Update lastUpdated on save
projectSchema.pre("save", function (next) {
  this.lastUpdated = new Date()
  next()
})

// Virtual for formatted creation date
projectSchema.virtual("createdAtFormatted").get(function () {
  return this.createdAt.toLocaleDateString()
})

// Virtual for formatted last updated
projectSchema.virtual("lastUpdatedFormatted").get(function () {
  const now = new Date()
  const diff = now - this.lastUpdated
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
})

// Ensure virtual fields are serialized
projectSchema.set("toJSON", { virtuals: true })

const Project = mongoose.model("Project", projectSchema)

export default Project
