"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { Camera, UploadIcon, Award, CheckCircle, X, Leaf } from "lucide-react"
import toast from "react-hot-toast"
import { useAuth } from "../context/AuthContext"

const Upload = () => {
  const { user } = useAuth()
  const [selectedFiles, setSelectedFiles] = useState([])
  const [actionType, setActionType] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const actionTypes = [
    { id: "tree-planting", label: "Tree Planting", reward: 50, icon: "🌱" },
    { id: "cleanup", label: "Environmental Cleanup", reward: 30, icon: "🧹" },
    { id: "recycling", label: "Recycling Activity", reward: 20, icon: "♻️" },
    { id: "renewable-energy", label: "Renewable Energy Use", reward: 40, icon: "⚡" },
    { id: "water-conservation", label: "Water Conservation", reward: 25, icon: "💧" },
    { id: "sustainable-transport", label: "Sustainable Transport", reward: 35, icon: "🚲" },
    { id: "organic-farming", label: "Organic Farming", reward: 45, icon: "🌾" },
    { id: "wildlife-protection", label: "Wildlife Protection", reward: 55, icon: "🦋" },
  ]

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    }))
    setSelectedFiles((prev) => [...prev, ...newFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  const removeFile = (id) => {
    setSelectedFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!actionType || !description || selectedFiles.length === 0) {
      toast.error("Please fill all fields and upload at least one image")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const selectedAction = actionTypes.find((action) => action.id === actionType)
      const rewardAmount = selectedAction?.reward || 0

      toast.success(`Environmental action submitted! You earned ${rewardAmount} GRAVAX tokens!`)

      // Reset form
      setSelectedFiles([])
      setActionType("")
      setDescription("")
      setLocation("")
    } catch (error) {
      toast.error("Failed to submit environmental action")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to upload your environmental actions</p>
          <a
            href="/login"
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
          >
            Login Now
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Upload Environmental <span className="text-green-600">Action</span>
          </h1>
          <p className="text-xl text-gray-600">
            Share your eco-friendly activities and earn GRAVAX tokens for making a difference
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Action Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Award className="w-5 h-5 text-green-600 mr-2" />
              Select Action Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {actionTypes.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => setActionType(action.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    actionType === action.id
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-200 hover:border-green-300 bg-white/50"
                  }`}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <div className="font-semibold text-gray-800 text-sm mb-1">{action.label}</div>
                  <div className="text-green-600 font-bold text-sm">+{action.reward} GRAVAX</div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Image Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Camera className="w-5 h-5 text-green-600 mr-2" />
              Upload Photos
            </h3>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400 bg-gray-50/50"
              }`}
            >
              <input {...getInputProps()} />
              <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-green-600 font-semibold">Drop the images here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 font-semibold mb-2">Drag & drop images here, or click to select</p>
                  <p className="text-sm text-gray-500">Support: JPG, PNG, WebP (Max 5MB each, up to 5 images)</p>
                </div>
              )}
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {selectedFiles.map((fileObj) => (
                  <div key={fileObj.id} className="relative group">
                    <img
                      src={fileObj.preview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(fileObj.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Description and Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your environmental action in detail..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location (Optional)</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where did this action take place?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Submit Environmental Action</span>
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}

export default Upload
