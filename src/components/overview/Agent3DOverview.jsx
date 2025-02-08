'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import { SpeechProvider } from '@tizzle-fe/hooks/useSpeech';
import { Leva } from 'leva';
import { CameraControls, Environment } from '@react-three/drei';
import { AgentAvatar } from '../interactions/AgentAvatar';
import { envPreset } from '@tizzle-fe/utils/common';

const Agent3DOverview = ({ agent }) => {
  return (
    <SpeechProvider>
      <Leva collapsed hidden />
      <Suspense fallback={null}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 0], fov: 10 }}
          className="!h-[50vh]"
        >
          <Agent3D agent={agent} />
        </Canvas>
      </Suspense>
    </SpeechProvider>
  );
};

const Agent3D = ({ agent }) => {
  const cameraControls = useRef();
  useEffect(() => {
    if (cameraControls)
      cameraControls?.current?.setLookAt(0, 1.5, 8, 0, 0.7, 0, true);
  }, [cameraControls]);

  return (
    <>
      <CameraControls
        ref={cameraControls}
        azimuthRotateSpeed={0}
        polarRotateSpeed={0}
        dollySpeed={0}
        truckSpeed={0}
      />
      <Environment preset={envPreset(agent)} />
      <AgentAvatar agentPath={agent} />
    </>
  );
};

export default Agent3DOverview;
