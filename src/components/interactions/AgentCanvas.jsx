'use client';
import { Loader } from '@react-three/drei';
import { Leva } from 'leva';
import { AgentInteraction } from './AgentInteraction';
import { Canvas } from '@react-three/fiber';
import { AgentScenario } from './AgentScenario';

export const AgentCanvas = ({ agentPath }) => {
  return (
    <div>
      <Loader />
      <Leva collapsed hidden />
      <AgentInteraction />
      <Canvas
        shadows
        camera={{ position: [0, 0, 0], fov: 10 }}
        style={{
          backgroundImage: `url('/assets/agents/${agentPath}/background-${agentPath}.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        <AgentScenario agentPath={agentPath} />
      </Canvas>
    </div>
  );
};
