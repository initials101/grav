"use client"

import { useState, useEffect } from "react"
import { Users, Database, Server, Activity, Plus, Search, Eye, Edit, Trash2 } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { projectsAPI } from "../services/api"

const StatCard = ({ title, value, icon: Icon, color, change }) => (
  <div className="glass-effect rounded-xl p-6 card-hover">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        {change && <p className="text-xs text-green-400 mt-1">{change}</p>}
      </div>
      <div className={`p-3 rounded-lg`} style={{ backgroundColor: color + "20", border: `1px solid ${color}` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
    </div>
  </div>
)

const ProjectCard = ({ project, onEdit, onDelete, onView }) => (
  <div className="glass-effect rounded-xl p-6 card-hover">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
        <p className="text-gray-400 text-sm mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tech.map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-purple-600 bg-opacity-30 text-purple-300 text-xs rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.status === "active"
            ? "bg-green-600 bg-opacity-30 text-green-300"
            : project.status === "development"
              ? "bg-yellow-600 bg-opacity-30 text-yellow-300"
              : "bg-gray-600 bg-opacity-30 text-gray-300"
        }`}
      >
        {project.status}
      </div>
    </div>

    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
      <span>{project.users} users</span>
      <span>Updated {project.lastUpdated}</span>
    </div>

    <div className="flex space-x-2">
      <button
        onClick={() => onView(project)}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center justify-center"
      >
        <Eye className="w-4 h-4 mr-1" />
        View
      </button>
      <button
        onClick={() => onEdit(project)}
        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center justify-center"
      >
        <Edit className="w-4 h-4 mr-1" />
        Edit
      </button>
      <button
        onClick={() => onDelete(project)}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center justify-center"
      >
        <Trash2 className="w-4 h-4 mr-1" />
        Delete
      </button>
    </div>
  </div>
)

const Dashboard = () => {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll()
      if (response.data.success) {
        setProjects(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleView = (project) => {
    console.log("Viewing project:", project)
  }

  const handleEdit = (project) => {
    console.log("Editing project:", project)
  }

  const handleDelete = (project) => {
    console.log("Deleting project:", project)
  }

  const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: Database,
      color: "#3b82f6",
      change: "+2 from last month",
    },
    {
      title: "Active Users",
      value: projects.reduce((sum, project) => sum + project.users, 0),
      icon: Users,
      color: "#10b981",
      change: "+15% from last week",
    },
    {
      title: "Server Status",
      value: "99.9%",
      icon: Server,
      color: "#f59e0b",
      change: "Uptime this month",
    },
    {
      title: "API Calls",
      value: "1.2M",
      icon: Activity,
      color: "#ef4444",
      change: "+8% from yesterday",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name || "User"}!</h1>
          <p className="text-gray-300">Manage your MERN stack applications</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Projects Section */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Projects</h2>
              <p className="text-gray-400">Manage your applications and services</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
                />
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first project"}
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                Create Project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
