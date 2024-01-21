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
  animationSeq: string[];
};

const ModelRender = ({ animationUrl, animationSeq }: ModelProps) => {
  useEffect(() => {
    // if (animationUrl == "") {
    //   //actions[names[0]]?.setLoop(THREE.LoopOnce, 0);
    //   actions[names[0]]?.reset().fadeIn(0.25).play();
    //   //console.log("animation", actions[names[0]], animations);
    // } else {
    //   actions[names[0]]?.reset().stop();
    //   LoadAnimation(animationUrl);
    // }
    //onLoaded();
  }, [animationUrl]);
  useEffect(() => {
    if (animationSeq.length <= 0) return;
    // actions[names[0]]?.reset().stop();

    mixer.removeEventListener("finished", onFinish);
    mixer.addEventListener("finished", onFinish);
    // if(lastAction)
    // {
    //     lastAction.clampWhenFinished = false;
    //     lastAction?.reset().stop();
    //     //lastAction?.reset().fadeOut(1).stop();
    // }
    LoadAnimation(animationSeq[currentIndex],lastAction);
  }, [animationSeq]);

  const gltfLoader = new GLTFLoader();
  const { scene, animations } = useGLTF(
    "./assets/models/annoying.glb",
    false,
    true
  );
  const [activeAction, setActiveAction] = useState<THREE.AnimationAction>();
  const [lastAction, setLastAction] = useState<THREE.AnimationAction>();
  const { ref, mixer, actions, names } = useAnimations(animations, scene);
  let currentIndex = 0;

  const onFinish = (e: any) => {
    console.log(e);
    //e.action?.reset().fadeOut(0.25).stop();
   
    if (currentIndex < animationSeq.length - 1) {
      currentIndex++;
    //   e.action?.reset().fadeOut(0.25).stop();
      LoadAnimation(animationSeq[currentIndex],e.action);
    } else {
      currentIndex = 0;
      //e.action?.reset().fadeOut(0.8).stop();
    //   if(e.action!=null)
    //   {
    //     e.action.clampWhenFinished = false;
    //     e.action?.reset().fadeOut(1).stop();
    //   }
      mixer.removeEventListener("finished", onFinish);
      
    }
    
    //e.action?.stop();
  
    //mixer.removeEventListener('finished');
  };
  const LoadAnimationSeq = (
    _url: string,
    _nextUrl: string,
    _onFinish: void
  ) => {
    gltfLoader.load(_url, (gltf) => {
      var animationAction = mixer?.clipAction((gltf as any).animations[0]);

      // setActiveAction(animationAction);
      if (animationAction) {
        animationAction.setLoop(THREE.LoopOnce, 0);
        animationAction?.reset().fadeOut(0.25).stop();
        animationAction?.reset().fadeIn(0.25).play();
        setAction(animationAction);
        if (_nextUrl != null) {
          mixer.addEventListener("finished", () => {
            actions[names[0]]?.reset().stop();
            LoadAnimation(_nextUrl,null);
          });
        }

        console.log(_url);
      }
    });
  };

  const LoadAnimation = (_poseURL: string,_lastAction:any) => {
    gltfLoader.load(_poseURL, (gltf) => {
        if(_lastAction!=null)
        {
            _lastAction.clampWhenFinished = false;
            _lastAction.stop();
        }
      var animationAction = mixer?.clipAction((gltf as any).animations[0]);

      // setActiveAction(animationAction);
      if (animationAction) {
        animationAction.setLoop(THREE.LoopOnce, 0);
        animationAction.clampWhenFinished = true;
       
        animationAction?.reset().fadeOut(0).stop();

        animationAction?.reset().fadeIn(0).play();
        setLastAction(animationAction);
        //setAction(animationAction);
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
      _lastAction?.fadeOut(0.25);
      lastAction?.stop();
      // setSelectPos(true);
      //_lastAction?.fadeOut(.25);

      //activeAction.stop();
      _activeAction.reset();
      _activeAction.fadeIn(0.25);
      _activeAction.play();

      //lastAction?.stop();
      console.log("activeAction.isRunning", _activeAction.isRunning());
    } else {
    }
  };

  return (
    <>
      <primitive object={scene} />;
    </>
  );
};

export default ModelRender;
