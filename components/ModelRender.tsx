"use client";
import {
  OrbitControls,
  Stage,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { debug } from "console";
import { button, useControls } from "leva";
import React, { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type ModelProps = {
  animationUrl: string;
};

const ModelRender = ({ animationUrl }: ModelProps) => {
  const gltfLoader = new GLTFLoader();
  const { scene, animations } = useGLTF(
    "./assets/models/annoying.glb",
    false,
    true
  );
  const [activeAction, setActiveAction] = useState<THREE.AnimationAction>();
  const [lastAction, setLastAction] = useState<THREE.AnimationAction>();
  const { ref, mixer, actions, names } = useAnimations(animations, scene);
  const LoadAnimation = (_poseURL: string) => {
    gltfLoader.load(_poseURL, (gltf) => {
      var animationAction = mixer?.clipAction((gltf as any).animations[0]);

      // setActiveAction(animationAction);
      if (animationAction) {
       // animationAction.setLoop(THREE.LoopOnce, 0);
        animationAction?.reset().fadeOut(0.25).stop();
        animationAction?.reset().fadeIn(0.25).play();
        setAction(animationAction);
        console.log(_poseURL);
      }
    });
  };
  const setAction = (toAction: THREE.AnimationAction) => {
    let _activeAction = activeAction;
    let _lastAction = lastAction;
    if (toAction != activeAction) {
      setLastAction(activeAction);
      _lastAction = activeAction;
      setActiveAction(toAction);
      _activeAction = toAction;
      lastAction?.reset();
      lastAction?.stop();
      // setSelectPos(true);
      _lastAction?.fadeOut(0.25);

      //activeAction.stop();
      _activeAction.reset();
      _activeAction.fadeIn(0.25);
      _activeAction.play();
      console.log("activeAction.isRunning", _activeAction.isRunning());
    } else {
    }
  };
  useEffect(() => {
    if (animationUrl == "") {
      //actions[names[0]]?.setLoop(THREE.LoopOnce, 0);
      actions[names[0]]?.reset().fadeIn(0.25).play();

      //console.log("animation", actions[names[0]], animations);
    } else {
      actions[names[0]]?.reset().stop();
      LoadAnimation(animationUrl);
    }

    //onLoaded();
  }, [animationUrl]);
  return (
    <>
      <primitive object={scene} />;
    </>
  );
};

export default ModelRender;
