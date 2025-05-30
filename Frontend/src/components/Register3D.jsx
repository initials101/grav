"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Box, Environment, OrbitControls, Float } from "@react-three/drei"

const GrowingPlant = ({ position, color, size = 0.6 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
      meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <Box ref={meshRef} position={position} args={[size * 0.3, size * 1.5, size * 0.3]}>
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </Box>
    </Float>
  )
}

const EcoSphere = ({ position, color, size = 0.4 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.4
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={meshRef} position={position} args={[size, 20, 20]}>
        <meshStandardMaterial color={color} transparent opacity={0.5} wireframe />
      </Sphere>
    </Float>
  )
}

const Scene3D = () => {
  return (
    <>
      <Environment preset="park" />
      <ambientLight intensity={0.5} />
      <pointLight position={[8, 8, 8]} intensity={1} color="#22c55e" />
      <directionalLight position={[-8, -8, -5]} intensity={0.4} color="#10b981" />

      {/* Growing plants */}
      <GrowingPlant position={[-2.5, -1, -2]} color="#22c55e" size={0.5} />
      <GrowingPlant position={[2.5, -1.5, -1]} color="#16a34a" size={0.6} />
      <GrowingPlant position={[-1, -2, 1]} color="#15803d" size={0.4} />
      <GrowingPlant position={[1.5, -1, -3]} color="#059669" size={0.7} />

      {/* Eco spheres */}
      <EcoSphere position={[3, 1, -2]} color="#10b981" size={0.3} />
      <EcoSphere position={[-3, 0, -1]} color="#22c55e" size={0.4} />
      <EcoSphere position={[0, 2, -4]} color="#16a34a" size={0.2} />

      {/* Floating particles representing growth */}
      {Array.from({ length: 20 }).map((_, i) => (
        <EcoSphere
          key={i}
          position={[(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6]}
          color="#22c55e"
          size={0.08 + Math.random() * 0.12}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  )
}

const Register3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full opacity-25">
      <Canvas camera={{ position: [0, 0, 9], fov: 75 }}>
        <Scene3D />
      </Canvas>
    </div>
  )
}

export default Register3D
