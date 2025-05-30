"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Award, Users, TrendingUp, Shield, Globe, Camera, Coins, ArrowRight, CheckCircle, Star } from "lucide-react"
import Hero3D from "../components/Hero3D"

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group hover:border-green-300"
  >
    <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

const StatCard = ({ number, label, suffix = "" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="text-center"
  >
    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
      {number}
      {suffix}
    </div>
    <div className="text-gray-600 font-medium">{label}</div>
  </motion.div>
)

const TokenomicsCard = ({ percentage, label, color, description }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-100"
  >
    <div className="flex items-center justify-between mb-2">
      <span className="font-semibold text-gray-800">{label}</span>
      <span className="text-2xl font-bold text-green-600">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </motion.div>
)

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: "Upload Environmental Actions",
      description: "Share photos of your eco-friendly activities and contribute to a greener planet.",
    },
    {
      icon: Award,
      title: "Earn GRAVAX Rewards",
      description: "Get rewarded with GRAVAX tokens for every verified environmental action you take.",
    },
    {
      icon: Users,
      title: "Join Green Community",
      description: "Connect with like-minded individuals who care about environmental sustainability.",
    },
    {
      icon: Shield,
      title: "Verified Actions",
      description: "All environmental actions are verified by our community to ensure authenticity.",
    },
    {
      icon: TrendingUp,
      title: "Track Impact",
      description: "Monitor your environmental impact and see how you're making a difference.",
    },
    {
      icon: Globe,
      title: "Global Movement",
      description: "Be part of a worldwide movement towards environmental sustainability.",
    },
  ]

  const tokenomics = [
    {
      percentage: 40,
      label: "Community Rewards",
      color: "bg-green-500",
      description: "Distributed to users for environmental actions",
    },
    {
      percentage: 25,
      label: "Ecosystem Development",
      color: "bg-emerald-500",
      description: "Platform development and improvements",
    },
    {
      percentage: 20,
      label: "Liquidity Pool",
      color: "bg-teal-500",
      description: "Ensuring stable trading and liquidity",
    },
    {
      percentage: 10,
      label: "Team & Advisors",
      color: "bg-green-400",
      description: "Core team and strategic advisors",
    },
    {
      percentage: 5,
      label: "Marketing",
      color: "bg-emerald-400",
      description: "Community growth and partnerships",
    },
  ]

  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Platform Launch",
      items: ["Website Launch", "Community Building", "Beta Testing"],
      status: "completed",
    },
    {
      phase: "Phase 2",
      title: "Token Launch",
      items: ["GRAVAX Token Creation", "Initial Distribution", "Reward System"],
      status: "current",
    },
    {
      phase: "Phase 3",
      title: "Exchange Listing",
      items: ["DEX Listing", "CEX Partnerships", "Liquidity Provision"],
      status: "upcoming",
    },
    {
      phase: "Phase 4",
      title: "Ecosystem Expansion",
      items: ["Mobile App", "NFT Integration", "Global Partnerships"],
      status: "upcoming",
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-eco-pattern opacity-30"></div>
        <Hero3D />
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                GreenAVAX
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing environmental sustainability through blockchain technology. Earn GRAVAX tokens by taking
              care of our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Join the Movement</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="bg-white/70 backdrop-blur-sm text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 border border-green-200 hover:border-green-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="10K+" label="Community Members" />
            <StatCard number="50K+" label="Environmental Actions" />
            <StatCard number="1M+" label="GRAVAX Distributed" />
            <StatCard number="95" label="CO₂ Reduction" suffix="%" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              How <span className="text-green-600">GreenAVAX</span> Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to earn rewards while making a positive environmental impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              <span className="text-green-600">GRAVAX</span> Tokenomics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fair distribution designed to reward environmental stewardship
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokenomics.map((item, index) => (
              <TokenomicsCard key={index} {...item} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-green-200">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Coins className="w-8 h-8 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-800">Total Supply</h3>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                1,000,000,000
              </div>
              <div className="text-gray-600">GRAVAX Tokens</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Project <span className="text-green-600">Roadmap</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our journey towards a sustainable future powered by blockchain
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white/70 backdrop-blur-sm rounded-xl p-6 border-2 ${
                  item.status === "completed"
                    ? "border-green-300 bg-green-50/50"
                    : item.status === "current"
                      ? "border-emerald-300 bg-emerald-50/50"
                      : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    {item.phase}
                  </span>
                  {item.status === "completed" && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {item.status === "current" && <Star className="w-5 h-5 text-emerald-500" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((listItem, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-600 flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>{listItem}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of eco-warriors earning GRAVAX tokens while protecting our planet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Start Earning Today</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/community"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Explore Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
