"use client";

import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import ModelRender from "./ModelRender";
import { button, useControls } from "leva";

type Props = {};

const CanvasRender = (props: Props) => {
  const [animationsUrl,setAminUrl] = useState<string>("");
  useControls({

    annoying: button(() => {setAminUrl("./assets/models/annoying.glb")}),
    arrogant: button(() => {setAminUrl("./assets/models/arrogant.glb")}),
    bestfriend: button(() => {setAminUrl("./assets/models/bestfriend.glb")}),
    born: button(() => {setAminUrl("./assets/models/born.glb")}),
  })
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 1.2, 1] }}
    >
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Stage>

        <ModelRender animationUrl={animationsUrl}></ModelRender>
        </Stage>
      </Suspense>
      <OrbitControls
        makeDefault
        autoRotate={false}
        enablePan={false}
        enableZoom={true}
      />
    </Canvas>
  );
};

export default CanvasRender;
