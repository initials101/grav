"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Torus, Environment, OrbitControls, Float } from "@react-three/drei"

const FloatingLeaf = ({ position, color, size = 0.5 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} position={position} args={[size, 16, 16]}>
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </Sphere>
    </Float>
  )
}

const GreenTorus = ({ position, color }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <Torus ref={meshRef} position={position} args={[0.8, 0.2, 16, 100]}>
        <meshStandardMaterial color={color} transparent opacity={0.4} />
      </Torus>
    </Float>
  )
}

const Scene3D = () => {
  return (
    <>
      <Environment preset="forest" />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#22c55e" />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#10b981" />

      {/* Floating elements */}
      <FloatingLeaf position={[-3, 1, -2]} color="#22c55e" size={0.4} />
      <FloatingLeaf position={[3, -1, -1]} color="#10b981" size={0.3} />
      <FloatingLeaf position={[-1, -2, 1]} color="#059669" size={0.5} />
      <FloatingLeaf position={[2, 2, -3]} color="#16a34a" size={0.3} />

      <GreenTorus position={[2, 0, -2]} color="#15803d" />
      <GreenTorus position={[-2, -1, 0]} color="#166534" />

      {/* Small floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <FloatingLeaf
          key={i}
          position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8]}
          color="#22c55e"
          size={0.1 + Math.random() * 0.15}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  )
}

const Login3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full opacity-30">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <Scene3D />
      </Canvas>
    </div>
  )
}

export default Login3D
