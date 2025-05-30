"use client"

import { motion } from "framer-motion"
import { Leaf, Users, Globe, Award, Shield, TrendingUp, Heart, Zap, Recycle } from "lucide-react"

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

const TeamMember = ({ name, role, image, bio, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 text-center hover:shadow-lg transition-all duration-300"
  >
    <img
      src={image || "/placeholder.svg?height=120&width=120"}
      alt={name}
      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-200"
    />
    <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
    <p className="text-green-600 font-medium mb-3">{role}</p>
    <p className="text-gray-600 text-sm">{bio}</p>
  </motion.div>
)

const ValueCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 text-center"
  >
    <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

const About = () => {
  const features = [
    {
      icon: Leaf,
      title: "Environmental Impact",
      description:
        "Every action on our platform contributes to real environmental change, from tree planting to waste reduction.",
    },
    {
      icon: Award,
      title: "Reward System",
      description:
        "Earn GRAVAX tokens for verified environmental actions, creating a sustainable economy around eco-friendly behavior.",
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Join thousands of eco-warriors worldwide working together to create a more sustainable future.",
    },
    {
      icon: Shield,
      title: "Verified Actions",
      description:
        "Our community-driven verification system ensures all environmental actions are authentic and impactful.",
    },
    {
      icon: TrendingUp,
      title: "Measurable Progress",
      description:
        "Track your environmental impact with detailed analytics and see how your actions make a difference.",
    },
    {
      icon: Globe,
      title: "Worldwide Reach",
      description: "Our platform operates globally, connecting environmental advocates across all continents.",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Sustainability",
      description:
        "We believe in creating lasting positive change for our planet through collective action and innovation.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive global network of individuals committed to environmental stewardship.",
    },
    {
      icon: Shield,
      title: "Transparency",
      description:
        "Open, honest, and accountable practices in everything we do, from token distribution to impact measurement.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging cutting-edge blockchain technology to revolutionize environmental action and rewards.",
    },
  ]

  const team = [
    {
      name: "Gachoki John",
      role: "Founder & CEO",
      bio: "Environmental scientist with 10+ years in sustainability and blockchain technology.",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Dennis Muriithi",
      role: "CTO",
      bio: "Backend Developer Blockchain enthusiast passionate about green technology.",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Environmental Science",
      bio: "PhD in Environmental Science, former UN climate advisor and sustainability expert.",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Alex Kim",
      role: "Head of Community",
      bio: "Community builder with experience in growing environmental movements worldwide.",
      image: "/placeholder.svg?height=120&width=120",
    },
  ]

  const milestones = [
    { year: "2023", title: "Project Inception", description: "GreenAVAX concept developed and team assembled" },
    { year: "2024 Q1", title: "Platform Development", description: "Core platform built and beta testing initiated" },
    { year: "2024 Q2", title: "Community Launch", description: "Public launch with initial community of 1,000 users" },
    { year: "2024 Q3", title: "Token Launch", description: "GRAVAX token created and reward system activated" },
    { year: "2024 Q4", title: "Global Expansion", description: "Platform scaled to 10,000+ users across 50 countries" },
    { year: "2025", title: "Future Goals", description: "1M users, major partnerships, and measurable global impact" },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                GreenAVAX
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Revolutionizing environmental action through blockchain technology, creating a sustainable future where
              every eco-friendly deed is rewarded.
            </p>
            <div className="flex items-center justify-center space-x-8 text-gray-600">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">10K+</div>
                <div className="text-sm">Community Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50K+</div>
                <div className="text-sm">Actions Verified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">1M+</div>
                <div className="text-sm">GRAVAX Distributed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              To create a world where environmental stewardship is rewarded, recognized, and celebrated. We believe that
              by incentivizing positive environmental actions through blockchain technology, we can accelerate the
              transition to a sustainable future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our vision for a sustainable future
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to start earning GRAVAX tokens while making a positive environmental impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Take Environmental Action</h3>
              <p className="text-gray-600">
                Plant trees, clean beaches, recycle, use renewable energy, or any other eco-friendly activity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload & Share</h3>
              <p className="text-gray-600">
                Take photos of your environmental action and share them with our global community for verification.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Earn GRAVAX Rewards</h3>
              <p className="text-gray-600">
                Receive GRAVAX tokens as rewards for your verified environmental actions and positive impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate individuals dedicated to creating a sustainable future through technology and community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600">From concept to global impact - the GreenAVAX story</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-green-200 shadow-lg">
                    <div className="text-green-600 font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-white shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-6xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Environmental Impact</h2>
            <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
              Together, our community has achieved remarkable environmental milestones
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Leaf className="w-12 h-12 mx-auto mb-4 text-green-200" />
                <div className="text-3xl font-bold mb-2">25,000+</div>
                <div className="text-green-100">Trees Planted</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Recycle className="w-12 h-12 mx-auto mb-4 text-green-200" />
                <div className="text-3xl font-bold mb-2">500 Tons</div>
                <div className="text-green-100">Waste Recycled</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Globe className="w-12 h-12 mx-auto mb-4 text-green-200" />
                <div className="text-3xl font-bold mb-2">1,200 Tons</div>
                <div className="text-green-100">CO₂ Reduced</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Users className="w-12 h-12 mx-auto mb-4 text-green-200" />
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-green-100">Countries</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Join the Green Revolution</h2>
            <p className="text-xl text-gray-600 mb-8">
              Be part of the solution. Start earning GRAVAX tokens today while making a positive impact on our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </a>
              <a
                href="/community"
                className="bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Explore Community
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
