"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Box, Sphere, Torus, Environment, OrbitControls } from "@react-three/drei"

const AnimatedSphere = ({ position, color }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[0.8, 32, 32]}>
      <meshStandardMaterial color={color} wireframe />
    </Sphere>
  )
}

const AnimatedTorus = ({ position, color }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Torus ref={meshRef} position={position} args={[0.8, 0.3, 16, 100]}>
      <meshStandardMaterial color={color} />
    </Torus>
  )
}

const Scene3D = () => {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <Text
        position={[0, 2, 0]}
        fontSize={1.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Bold.json"
      >
        MERN Stack
      </Text>

      <Text
        position={[0, 0.5, 0]}
        fontSize={0.8}
        color="#a855f7"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Regular.json"
      >
        3D Web Development
      </Text>

      <Text
        position={[0, -0.5, 0]}
        fontSize={0.4}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Regular.json"
        maxWidth={8}
        textAlign="center"
      >
        Building scalable applications with MongoDB, Express, React, and Node.js
      </Text>

      <AnimatedSphere position={[-4, 1, -2]} color="#10b981" />
      <AnimatedTorus position={[4, 0, -1]} color="#3b82f6" />

      <Box position={[-3, -2, 1]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#f59e0b" />
      </Box>

      <Box position={[3, -1.5, 0]} args={[0.8, 0.8, 0.8]}>
        <meshStandardMaterial color="#ef4444" wireframe />
      </Box>

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
    </>
  )
}

const Hero3D = () => {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Scene3D />
      </Canvas>
    </div>
  )
}

export default Hero3D
