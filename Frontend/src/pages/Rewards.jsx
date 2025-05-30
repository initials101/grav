"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Award, Calendar, Gift, Star, Coins, Target, Clock } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const RewardCard = ({ reward, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-200 hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{reward.icon}</div>
        <div>
          <h3 className="font-semibold text-gray-800">{reward.action}</h3>
          <p className="text-sm text-gray-600">{reward.date}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-green-600 font-bold">+{reward.amount}</div>
        <div className="text-xs text-gray-500">GRAVAX</div>
      </div>
    </div>
    <div className="flex items-center justify-between text-sm">
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          reward.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {reward.status}
      </span>
      {reward.multiplier && <span className="text-orange-600 font-medium">{reward.multiplier}x Bonus</span>}
    </div>
  </motion.div>
)

const MilestoneCard = ({ milestone, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className={`bg-white/70 backdrop-blur-sm rounded-xl p-6 border-2 ${
      milestone.completed ? "border-green-300 bg-green-50/50" : "border-gray-200"
    }`}
  >
    <div className="text-center">
      <div className={`text-4xl mb-3 ${milestone.completed ? "" : "grayscale opacity-50"}`}>{milestone.icon}</div>
      <h3 className="font-semibold text-gray-800 mb-2">{milestone.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>

      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>
            {milestone.current}/{milestone.target}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((milestone.current / milestone.target) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="text-green-600 font-bold">{milestone.reward} GRAVAX</div>
    </div>
  </motion.div>
)

const Rewards = () => {
  const { user } = useAuth()
  const [rewardHistory, setRewardHistory] = useState([])
  const [milestones, setMilestones] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setStats({
        totalEarned: 1250,
        thisMonth: 340,
        pendingRewards: 75,
        nextMilestone: 150,
        rank: 156,
        streak: 7,
      })

      setRewardHistory([
        {
          id: 1,
          action: "Tree Planting Event",
          amount: 50,
          date: "2 hours ago",
          status: "confirmed",
          icon: "🌱",
          multiplier: null,
        },
        {
          id: 2,
          action: "Beach Cleanup",
          amount: 30,
          date: "1 day ago",
          status: "confirmed",
          icon: "🏖️",
          multiplier: null,
        },
        {
          id: 3,
          action: "Weekly Streak Bonus",
          amount: 25,
          date: "2 days ago",
          status: "confirmed",
          icon: "🔥",
          multiplier: "2",
        },
        {
          id: 4,
          action: "Recycling Drive",
          amount: 40,
          date: "3 days ago",
          status: "pending",
          icon: "♻️",
          multiplier: null,
        },
        {
          id: 5,
          action: "Solar Panel Installation",
          amount: 100,
          date: "5 days ago",
          status: "confirmed",
          icon: "☀️",
          multiplier: null,
        },
      ])

      setMilestones([
        {
          id: 1,
          title: "Eco Beginner",
          description: "Complete your first 5 environmental actions",
          current: 5,
          target: 5,
          reward: 100,
          completed: true,
          icon: "🌱",
        },
        {
          id: 2,
          title: "Green Warrior",
          description: "Earn 500 GRAVAX tokens",
          current: 1250,
          target: 500,
          reward: 200,
          completed: true,
          icon: "⚔️",
        },
        {
          id: 3,
          title: "Tree Guardian",
          description: "Plant 25 trees",
          current: 18,
          target: 25,
          reward: 300,
          completed: false,
          icon: "🌳",
        },
        {
          id: 4,
          title: "Ocean Protector",
          description: "Complete 10 beach cleanups",
          current: 6,
          target: 10,
          reward: 250,
          completed: false,
          icon: "🌊",
        },
        {
          id: 5,
          title: "Community Leader",
          description: "Organize 5 community events",
          current: 2,
          target: 5,
          reward: 500,
          completed: false,
          icon: "👥",
        },
        {
          id: 6,
          title: "Sustainability Master",
          description: "Earn 2000 GRAVAX tokens",
          current: 1250,
          target: 2000,
          reward: 1000,
          completed: false,
          icon: "🏆",
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <div className="text-center">
          <Award className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to view your rewards</p>
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
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your <span className="text-green-600">Rewards</span>
          </h1>
          <p className="text-xl text-gray-600">Track your GRAVAX earnings and unlock amazing milestones</p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 text-center"
          >
            <Coins className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalEarned.toLocaleString()}</div>
            <div className="text-gray-600">Total GRAVAX Earned</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 text-center"
          >
            <Calendar className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.thisMonth}</div>
            <div className="text-gray-600">This Month</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 text-center"
          >
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.pendingRewards}</div>
            <div className="text-gray-600">Pending Rewards</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 text-center"
          >
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.nextMilestone}</div>
            <div className="text-gray-600">To Next Milestone</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Rewards */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Gift className="w-6 h-6 text-green-600 mr-2" />
                Recent Rewards
              </h2>

              <div className="space-y-4">
                {rewardHistory.map((reward, index) => (
                  <RewardCard key={reward.id} reward={reward} index={index} />
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
                  View All Rewards History
                </button>
              </div>
            </motion.div>
          </div>

          {/* Current Streak */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-6"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-3xl font-bold mb-1">{stats.streak} Days</div>
                <div className="text-orange-100">Current Streak</div>
                <div className="mt-4 text-sm text-orange-100">
                  Keep it up! Earn bonus rewards for maintaining your streak.
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/upload"
                  className="block w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-medium text-center hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                >
                  Upload New Action
                </a>
                <button className="block w-full bg-white border border-green-300 text-green-600 py-3 px-4 rounded-lg font-medium hover:bg-green-50 transition-all duration-300">
                  Refer a Friend
                </button>
                <button className="block w-full bg-white border border-green-300 text-green-600 py-3 px-4 rounded-lg font-medium hover:bg-green-50 transition-all duration-300">
                  Join Community Event
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-2" />
            Milestones & Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <MilestoneCard key={milestone.id} milestone={milestone} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Rewards
