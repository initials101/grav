"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Torus, Box, Environment, OrbitControls, Float } from "@react-three/drei"

const EcoSphere = ({ position, color, size = 1 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[size, 32, 32]}>
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </Sphere>
    </Float>
  )
}

const GreenTorus = ({ position, color }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Torus ref={meshRef} position={position} args={[1, 0.3, 16, 100]}>
        <meshStandardMaterial color={color} />
      </Torus>
    </Float>
  )
}

const EcoBox = ({ position, color }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3
    }
  })

  return (
    <Box ref={meshRef} position={position} args={[0.8, 0.8, 0.8]}>
      <meshStandardMaterial color={color} wireframe />
    </Box>
  )
}

const Scene3D = () => {
  return (
    <>
      <Environment preset="forest" />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22c55e" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#10b981" />

      {/* Floating eco elements */}
      <EcoSphere position={[-4, 2, -2]} color="#22c55e" size={0.8} />
      <EcoSphere position={[4, -1, -1]} color="#10b981" size={0.6} />
      <EcoSphere position={[-2, -2, 1]} color="#059669" size={0.7} />

      <GreenTorus position={[3, 1, -2]} color="#16a34a" />
      <GreenTorus position={[-3, -1, 0]} color="#15803d" />

      <EcoBox position={[2, -2, 1]} color="#84cc16" />
      <EcoBox position={[-4, 0, 2]} color="#65a30d" />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <EcoSphere
          key={i}
          position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}
          color="#22c55e"
          size={0.1 + Math.random() * 0.2}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

const Hero3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Scene3D />
      </Canvas>
    </div>
  )
}

export default Hero3D
