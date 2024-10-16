import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { button, useControls } from 'leva';
import { useSpeech } from '@tizzle-fe/hooks/useSpeech';

import facialExpressions from '../../constants/facialExpressions';
import morphTargets from '../../constants/morphTargets';
import visemesMapping from '../../constants/visemesMapping';
import { SkinnedMeshCortez } from '../agent/cortez/SkinnedMesh';
import { SkinnedMeshAkira } from '../agent/akira/SkinnedMesh';
import { SkinnedMeshBale } from '../agent/bale/SkinnedMesh';

export const AgentAvatar = ({ agentPath, props }) => {
  const { animations } = useGLTF(
    `/assets/agents/${agentPath}/animation/animations.glb`,
  );
  const { nodes, materials, scene } = useGLTF(
    `/assets/agents/${agentPath}/model/${agentPath}.glb`,
  );
  const group = useRef();

  const [setupMode, setSetupMode] = useState(false);
  const [facialExpression, setFacialExpression] = useState('');
  const [lipsync, setLipsync] = useState();
  const [blink, setBlink] = useState(false);
  const [audio, setAudio] = useState();
  const [animation, setAnimation] = useState(
    animations.find(a => a.name === 'Idle') ? 'Idle' : animations[0].name,
  );

  const { actions, mixer } = useAnimations(animations, group);
  const { loading, message, onMessagePlayed } = useSpeech();

  useEffect(() => {
    if (loading) {
      setAnimation('Listening');
    }
  }, [loading]);

  useEffect(() => {
    if (!message) {
      setAnimation('Idle');
      setFacialExpression('default');
      return;
    }
    setAnimation(message.animation);
    setFacialExpression(message.facialExpression);
    setLipsync(message.lipsync);
    const audio = new Audio('data:audio/mp3;base64,' + message.audio);
    audio.play();
    setAudio(audio);
    audio.onended = onMessagePlayed;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (actions[animation]) {
      actions[animation]
        .reset()
        .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
        .play();
      return () => {
        if (actions[animation]) {
          actions[animation].fadeOut(0.5);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation]);

  useEffect(() => {
    let blinkTimeout;
    const nextBlink = () => {
      blinkTimeout = setTimeout(
        () => {
          setBlink(true);
          setTimeout(() => {
            setBlink(false);
            nextBlink();
          }, 200);
        },
        THREE.MathUtils.randInt(1000, 5000),
      );
    };
    nextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  const lerpMorphTarget = (target, value, speed = 0.1) => {
    scene.traverse(child => {
      if (child.isSkinnedMesh && child.morphTargetDictionary) {
        const index = child.morphTargetDictionary[target];
        if (
          index === undefined ||
          child.morphTargetInfluences[index] === undefined
        ) {
          return;
        }
        child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
          child.morphTargetInfluences[index],
          value,
          speed,
        );
      }
    });
  };

  useFrame(() => {
    !setupMode &&
      morphTargets.forEach(key => {
        const mapping = facialExpressions[facialExpression];
        if (key === 'eyeBlinkLeft' || key === 'eyeBlinkRight') {
          return;
        }
        if (mapping && mapping[key]) {
          lerpMorphTarget(key, mapping[key], 0.1);
        } else {
          lerpMorphTarget(key, 0, 0.1);
        }
      });

    lerpMorphTarget('eyeBlinkLeft', blink ? 1 : 0, 0.5);
    lerpMorphTarget('eyeBlinkRight', blink ? 1 : 0, 0.5);

    if (setupMode) {
      return;
    }

    const appliedMorphTargets = [];
    if (message && lipsync) {
      const currentAudioTime = audio.currentTime;
      for (let i = 0; i < lipsync.mouthCues.length; i++) {
        const mouthCue = lipsync.mouthCues[i];
        if (
          currentAudioTime >= mouthCue.start &&
          currentAudioTime <= mouthCue.end
        ) {
          appliedMorphTargets.push(visemesMapping[mouthCue.value]);
          lerpMorphTarget(visemesMapping[mouthCue.value], 1, 0.2);
          break;
        }
      }
    }

    Object.values(visemesMapping).forEach(value => {
      if (appliedMorphTargets.includes(value)) {
        return;
      }
      lerpMorphTarget(value, 0, 0.1);
    });
  });

  useControls('FacialExpressions', {
    animation: {
      value: animation,
      options: animations.map(a => a.name),
      onChange: value => setAnimation(value),
    },
    facialExpression: {
      options: Object.keys(facialExpressions),
      onChange: value => setFacialExpression(value),
    },
    setupMode: button(() => {
      setSetupMode(!setupMode);
    }),
    logMorphTargetValues: button(() => {
      const emotionValues = {};
      Object.values(nodes).forEach(node => {
        if (node.morphTargetInfluences && node.morphTargetDictionary) {
          morphTargets.forEach(key => {
            if (key === 'eyeBlinkLeft' || key === 'eyeBlinkRight') {
              return;
            }
            const value =
              node.morphTargetInfluences[node.morphTargetDictionary[key]];
            if (value > 0.01) {
              emotionValues[key] = value;
            }
          });
        }
      });
      console.log(JSON.stringify(emotionValues, null, 2));
    }),
  });

  useControls('MorphTarget', () =>
    Object.assign(
      {},
      ...morphTargets.map(key => {
        return {
          [key]: {
            label: key,
            value: 0,
            min: 0,
            max: 1,
            onChange: val => {
              lerpMorphTarget(key, val, 0.1);
            },
          },
        };
      }),
    ),
  );

  return (
    <group {...props} dispose={null} ref={group} position={[0, -0.5, 0]}>
      <group {...props} dispose={null}>
        <primitive object={nodes.Hips} />
        {agentPath == 'cortez' ? (
          <SkinnedMeshCortez materials={materials} nodes={nodes} />
        ) : agentPath == 'akira' ? (
          <SkinnedMeshAkira materials={materials} nodes={nodes} />
        ) : (
          <SkinnedMeshBale materials={materials} nodes={nodes} />
        )}
      </group>
    </group>
  );
};
