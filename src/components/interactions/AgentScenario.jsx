'use client';
import { CameraControls, Environment } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { AgentAvatar } from './AgentAvatar';
import { envPreset } from '@tizzle-fe/utils/common';

export const AgentScenario = ({ agentPath }) => {
  const cameraControls = useRef();
  useEffect(() => {
    cameraControls.current.setLookAt(0, 1.5, 5, 0, 1.0, 0, true);
  }, []);

  return (
    <>
      <CameraControls
        ref={cameraControls}
        azimuthRotateSpeed={0}
        polarRotateSpeed={0}
        dollySpeed={0}
        truckSpeed={0}
      />
      <Environment preset={envPreset(agentPath)} />
      <AgentAvatar agentPath={agentPath} />
    </>
  );
};
