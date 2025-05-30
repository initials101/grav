"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Award, MapPin, Calendar, Heart, MessageCircle, Share2, Filter, Search } from "lucide-react"

const CommunityCard = ({ post, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-start space-x-4">
      <img
        src={post.user.avatar || "/placeholder.svg"}
        alt={post.user.name}
        className="w-12 h-12 rounded-full border-2 border-green-200"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-800">{post.user.name}</h3>
            <p className="text-sm text-gray-600 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {post.date}
              {post.location && (
                <>
                  <MapPin className="w-3 h-3 ml-3 mr-1" />
                  {post.location}
                </>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
            <Award className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-600">+{post.reward}</span>
          </div>
        </div>

        <h4 className="font-semibold text-gray-800 mb-2">{post.title}</h4>
        <p className="text-gray-600 mb-4">{post.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {post.images.map((image, imgIndex) => (
            <img
              key={imgIndex}
              src={image || "/placeholder.svg"}
              alt={`Action ${imgIndex + 1}`}
              className="w-full h-24 object-cover rounded-lg border border-gray-200"
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{post.comments}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

const LeaderboardCard = ({ user, index, rank }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className={`flex items-center space-x-4 p-4 rounded-xl border ${
      rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200" : "bg-white/70 border-green-200"
    }`}
  >
    <div
      className={`text-2xl font-bold ${
        rank === 1 ? "text-yellow-500" : rank === 2 ? "text-gray-400" : rank === 3 ? "text-orange-500" : "text-gray-600"
      }`}
    >
      #{rank}
    </div>
    <img
      src={user.avatar || "/placeholder.svg"}
      alt={user.name}
      className="w-10 h-10 rounded-full border-2 border-green-200"
    />
    <div className="flex-1">
      <h3 className="font-semibold text-gray-800">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.actions} actions</p>
    </div>
    <div className="text-right">
      <div className="font-bold text-green-600">{user.tokens.toLocaleString()}</div>
      <div className="text-xs text-gray-500">GRAVAX</div>
    </div>
  </motion.div>
)

const Community = () => {
  const [posts, setPosts] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          user: {
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=48&width=48",
          },
          title: "Community Tree Planting Event",
          description:
            "Organized a tree planting event in our local park. We planted 25 native oak trees that will help improve air quality and provide habitat for local wildlife.",
          date: "2 hours ago",
          location: "Central Park, NY",
          reward: 75,
          likes: 24,
          comments: 8,
          tags: ["treeplanting", "community", "airquality"],
          images: [
            "/placeholder.svg?height=96&width=96",
            "/placeholder.svg?height=96&width=96",
            "/placeholder.svg?height=96&width=96",
          ],
        },
        {
          id: 2,
          user: {
            name: "Mike Chen",
            avatar: "/placeholder.svg?height=48&width=48",
          },
          title: "Beach Cleanup Success",
          description:
            "Spent the morning cleaning up Sunset Beach with my family. Collected over 15kg of plastic waste and recyclables. Every small action counts!",
          date: "5 hours ago",
          location: "Sunset Beach, CA",
          reward: 45,
          likes: 18,
          comments: 5,
          tags: ["cleanup", "ocean", "plastic"],
          images: ["/placeholder.svg?height=96&width=96", "/placeholder.svg?height=96&width=96"],
        },
        {
          id: 3,
          user: {
            name: "Emma Rodriguez",
            avatar: "/placeholder.svg?height=48&width=48",
          },
          title: "Solar Panel Installation",
          description:
            "Finally installed solar panels on our roof! This will reduce our carbon footprint by an estimated 3 tons of CO₂ per year.",
          date: "1 day ago",
          location: "Austin, TX",
          reward: 100,
          likes: 32,
          comments: 12,
          tags: ["solar", "renewable", "energy"],
          images: ["/placeholder.svg?height=96&width=96"],
        },
        {
          id: 4,
          user: {
            name: "David Kim",
            avatar: "/placeholder.svg?height=48&width=48",
          },
          title: "Urban Garden Project",
          description:
            "Started an urban garden in our apartment building's rooftop. Growing organic vegetables and herbs for the community to share.",
          date: "2 days ago",
          location: "Seattle, WA",
          reward: 60,
          likes: 27,
          comments: 9,
          tags: ["gardening", "organic", "community"],
          images: [
            "/placeholder.svg?height=96&width=96",
            "/placeholder.svg?height=96&width=96",
            "/placeholder.svg?height=96&width=96",
          ],
        },
      ])

      setLeaderboard([
        { name: "Alex Thompson", avatar: "/placeholder.svg?height=40&width=40", tokens: 2450, actions: 48 },
        { name: "Maria Garcia", avatar: "/placeholder.svg?height=40&width=40", tokens: 2380, actions: 45 },
        { name: "John Smith", avatar: "/placeholder.svg?height=40&width=40", tokens: 2210, actions: 42 },
        { name: "Lisa Wang", avatar: "/placeholder.svg?height=40&width=40", tokens: 1950, actions: 38 },
        { name: "Carlos Silva", avatar: "/placeholder.svg?height=40&width=40", tokens: 1820, actions: 35 },
        { name: "Anna Kowalski", avatar: "/placeholder.svg?height=40&width=40", tokens: 1750, actions: 33 },
        { name: "Ahmed Hassan", avatar: "/placeholder.svg?height=40&width=40", tokens: 1680, actions: 31 },
        { name: "Sophie Martin", avatar: "/placeholder.svg?height=40&width=40", tokens: 1590, actions: 29 },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    if (filter === "all") return matchesSearch
    return matchesSearch && post.tags.includes(filter)
  })

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="text-green-600">Green</span> Community
          </h1>
          <p className="text-xl text-gray-600">Discover inspiring environmental actions from our global community</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters and Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 mb-6"
            >
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Filter className="w-5 h-5 text-green-600" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Actions</option>
                    <option value="treeplanting">Tree Planting</option>
                    <option value="cleanup">Cleanup</option>
                    <option value="renewable">Renewable Energy</option>
                    <option value="gardening">Gardening</option>
                    <option value="recycling">Recycling</option>
                  </select>
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search actions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Community Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <CommunityCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 text-yellow-500 mr-2" />
                Top Contributors
              </h2>

              <div className="space-y-3">
                {leaderboard.slice(0, 8).map((user, index) => (
                  <LeaderboardCard key={index} user={user} index={index} rank={index + 1} />
                ))}
              </div>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 text-green-600 mr-2" />
                Community Impact
              </h2>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">10,247</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">52,891</div>
                  <div className="text-sm text-gray-600">Actions Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">1.2M</div>
                  <div className="text-sm text-gray-600">GRAVAX Distributed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">847</div>
                  <div className="text-sm text-gray-600">Tons CO₂ Saved</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
