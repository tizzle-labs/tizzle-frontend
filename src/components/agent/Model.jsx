import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Loader, OrbitControls, useGLTF } from '@react-three/drei';

function Model({ agentName }) {
  const { scene } = useGLTF(
    `/assets/agents/${agentName}/model/${agentName}.glb`,
  );
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.005;
  });

  return (
    <group ref={ref} scale={[2.5, 2.5, 2.5]} position={[0, -3.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

const AgentModel = ({ agentName }) => {
  return (
    <>
      <Loader />
      <Canvas
        className="w-full h-full electric-effect bg-primary"
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{
          borderRadius: '8px',
        }}
      >
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <directionalLight position={[-5, 5, 5]} intensity={1.5} />
        <directionalLight position={[5, -5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model agentName={agentName} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </>
  );
};

export default AgentModel;
