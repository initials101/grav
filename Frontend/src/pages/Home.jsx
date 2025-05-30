import { Suspense } from "react"
import { Database, Server, Globe, Code, Users, Zap, Shield, Smartphone } from "lucide-react"
import Hero3D from "../components/Hero3D"

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
  </div>
)

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="glass-effect rounded-xl p-6 card-hover">
    <div
      className={`inline-flex p-3 rounded-lg mb-4`}
      style={{ backgroundColor: color + "20", border: `1px solid ${color}` }}
    >
      <Icon className="w-6 h-6" style={{ color }} />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
)

const Home = () => {
  const features = [
    {
      icon: Globe,
      title: "Frontend Development",
      description: "Modern React applications with stunning 3D UI/UX using Three.js and React Three Fiber",
      color: "#3b82f6",
    },
    {
      icon: Server,
      title: "Backend APIs",
      description: "Robust Node.js and Express.js APIs with RESTful architecture and middleware",
      color: "#10b981",
    },
    {
      icon: Database,
      title: "Database Integration",
      description: "MongoDB integration with Mongoose ODM for efficient data management",
      color: "#f59e0b",
    },
    {
      icon: Code,
      title: "Full Stack Development",
      description: "End-to-end JavaScript development from frontend to backend",
      color: "#ef4444",
    },
    {
      icon: Shield,
      title: "Security & Authentication",
      description: "JWT authentication, input validation, and security best practices",
      color: "#8b5cf6",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Code splitting, lazy loading, and performance monitoring",
      color: "#06b6d4",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first approach with responsive layouts and touch interactions",
      color: "#f97316",
    },
    {
      icon: Users,
      title: "User Experience",
      description: "Intuitive interfaces with smooth animations and micro-interactions",
      color: "#ec4899",
    },
  ]

  const techStack = [
    { name: "MongoDB", description: "NoSQL Database", color: "#47A248" },
    { name: "Express.js", description: "Web Framework", color: "#000000" },
    { name: "React.js", description: "Frontend Library", color: "#61DAFB" },
    { name: "Node.js", description: "Runtime Environment", color: "#339933" },
    { name: "Three.js", description: "3D Graphics", color: "#000000" },
    { name: "Tailwind CSS", description: "CSS Framework", color: "#06B6D4" },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero3D />
        </Suspense>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center z-10 px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">Build the Future</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Create scalable web applications with modern MERN stack and immersive 3D experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                Get Started
              </button>
              <button className="glass-effect text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors duration-300">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What We Offer</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive web development services using cutting-edge technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 bg-black bg-opacity-30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Tech Stack</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Modern technologies for building robust and scalable applications
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="glass-effect rounded-xl p-6 text-center card-hover">
                <div
                  className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: tech.color }}
                >
                  {tech.name.charAt(0)}
                </div>
                <h3 className="text-white font-semibold mb-2">{tech.name}</h3>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's create your next web application with modern technologies and stunning design
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              Start Your Project
            </button>
            <button className="glass-effect text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
