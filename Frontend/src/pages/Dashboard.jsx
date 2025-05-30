"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Award, TrendingUp, Camera, Users, Leaf, Calendar, MapPin, Star, Trophy, Target, Activity } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const StatCard = ({ icon: Icon, title, value, change, color = "green" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        {change && (
          <p className={`text-sm mt-1 flex items-center ${color === "green" ? "text-green-600" : "text-blue-600"}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {change}
          </p>
        )}
      </div>
      <div
        className={`p-3 rounded-xl bg-gradient-to-r ${color === "green" ? "from-green-500 to-emerald-500" : "from-blue-500 to-cyan-500"}`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
)

const ActionCard = ({ action, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-200 hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-start space-x-4">
      <img
        src={action.image || "/placeholder.svg"}
        alt={action.title}
        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">{action.title}</h3>
          <span className="text-green-600 font-bold text-sm">+{action.reward} GRAVAX</span>
        </div>
        <p className="text-gray-600 text-sm mb-2">{action.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {action.date}
            </span>
            {action.location && (
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {action.location}
              </span>
            )}
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              action.status === "verified"
                ? "bg-green-100 text-green-700"
                : action.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {action.status}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
)

const AchievementBadge = ({ achievement, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className={`bg-white/70 backdrop-blur-sm rounded-xl p-4 border-2 text-center ${
      achievement.unlocked ? "border-yellow-300 bg-yellow-50/50" : "border-gray-200"
    }`}
  >
    <div className={`text-3xl mb-2 ${achievement.unlocked ? "" : "grayscale opacity-50"}`}>{achievement.icon}</div>
    <h3 className="font-semibold text-gray-800 text-sm mb-1">{achievement.title}</h3>
    <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
    <div className="text-xs text-green-600 font-medium">+{achievement.reward} GRAVAX</div>
  </motion.div>
)

const Dashboard = () => {
  const { user } = useAuth()
  const [userStats, setUserStats] = useState(null)
  const [recentActions, setRecentActions] = useState([])
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setUserStats({
        totalRewards: 1250,
        actionsCompleted: 23,
        rank: 156,
        impactScore: 89,
        monthlyGrowth: "+15%",
        weeklyActions: "+3",
      })

      setRecentActions([
        {
          id: 1,
          title: "Tree Planting Initiative",
          description: "Planted 5 oak trees in Central Park",
          reward: 50,
          date: "2 days ago",
          location: "Central Park, NY",
          status: "verified",
          image: "/placeholder.svg?height=64&width=64",
        },
        {
          id: 2,
          title: "Beach Cleanup",
          description: "Collected 10kg of plastic waste from the beach",
          reward: 30,
          date: "5 days ago",
          location: "Santa Monica Beach",
          status: "verified",
          image: "/placeholder.svg?height=64&width=64",
        },
        {
          id: 3,
          title: "Recycling Drive",
          description: "Organized community recycling event",
          reward: 40,
          date: "1 week ago",
          location: "Community Center",
          status: "pending",
          image: "/placeholder.svg?height=64&width=64",
        },
      ])

      setAchievements([
        {
          id: 1,
          title: "Eco Warrior",
          description: "Complete 10 environmental actions",
          icon: "🌟",
          reward: 100,
          unlocked: true,
        },
        {
          id: 2,
          title: "Tree Hugger",
          description: "Plant 20 trees",
          icon: "🌳",
          reward: 200,
          unlocked: true,
        },
        {
          id: 3,
          title: "Ocean Guardian",
          description: "Complete 5 beach cleanups",
          icon: "🌊",
          reward: 150,
          unlocked: false,
        },
        {
          id: 4,
          title: "Green Pioneer",
          description: "Earn 1000 GRAVAX tokens",
          icon: "🏆",
          reward: 500,
          unlocked: true,
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to view your dashboard</p>
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
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, <span className="text-green-600">{user.name}</span>! 🌱
          </h1>
          <p className="text-gray-600">Track your environmental impact and GRAVAX rewards</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Award}
            title="Total GRAVAX Earned"
            value={userStats.totalRewards.toLocaleString()}
            change={userStats.monthlyGrowth}
          />
          <StatCard
            icon={Activity}
            title="Actions Completed"
            value={userStats.actionsCompleted}
            change={userStats.weeklyActions}
          />
          <StatCard icon={Trophy} title="Global Rank" value={`#${userStats.rank}`} color="blue" />
          <StatCard icon={Target} title="Impact Score" value={`${userStats.impactScore}%`} color="blue" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Actions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Camera className="w-6 h-6 text-green-600 mr-2" />
                  Recent Actions
                </h2>
                <a
                  href="/upload"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                >
                  Upload New Action
                </a>
              </div>

              <div className="space-y-4">
                {recentActions.map((action, index) => (
                  <ActionCard key={action.id} action={action} index={index} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Achievements */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                Achievements
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <AchievementBadge key={achievement.id} achievement={achievement} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 mt-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 text-green-600 mr-2" />
                Community Impact
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Trees Planted</span>
                  <span className="font-semibold text-gray-800">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Waste Collected</span>
                  <span className="font-semibold text-gray-800">125 kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">CO₂ Saved</span>
                  <span className="font-semibold text-gray-800">2.3 tons</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Community Rank</span>
                  <span className="font-semibold text-green-600">#156</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
