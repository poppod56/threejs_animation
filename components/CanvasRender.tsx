"use client";

import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import ModelRender from "./ModelRender";
import { button, useControls } from "leva";
import styled from "styled-components";

type Props = {};

const CanvasRender = (props: Props) => {
  const [animationsUrl, setAminUrl] = useState<string>("");
  const [labelChange, setLabel] = useState<string>("คำที่ 1");
  // useControls({
  //   annoying: button(() => {
  //     setAminUrl("./assets/models/annoying.glb");
  //   }),
  //   arrogant: button(() => {
  //     setAminUrl("./assets/models/arrogant.glb");
  //   }),
  //   bestfriend: button(() => {
  //     setAminUrl("./assets/models/bestfriend.glb");
  //   }),
  //   born: button(() => {
  //     setAminUrl("./assets/models/born.glb");
  //   }),
  // });
  const OnClickButton = (value: string) => {
    setLabel(value);
  };
  return (
    <>
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
      <LabelChangeDiv>{labelChange}</LabelChangeDiv>
      <PoseSelectedDiv>
        <ButtonSelected
          onClick={() => {
            OnClickButton("คำที่ 1");
            setAminUrl("./assets/models/annoying.glb");
          }}
        >
          1
        </ButtonSelected>
        <ButtonSelected
          onClick={() => {
            OnClickButton("คำที่ 2");
            setAminUrl("./assets/models/arrogant.glb");
          }}
        >
          2
        </ButtonSelected>
        <ButtonSelected
          onClick={() => {
            OnClickButton("คำที่ 3");
            setAminUrl("./assets/models/bestfriend.glb");
          }}
        >
          3
        </ButtonSelected>
        <ButtonSelected
          onClick={() => {
            OnClickButton("คำที่ 4");
            setAminUrl("./assets/models/born.glb");
          }}
        >
          4
        </ButtonSelected>
      </PoseSelectedDiv>
    </>
  );
};

export default CanvasRender;

const LabelChangeDiv = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: baseline;
  width: 100vw;
  /* background-color: #f0f0f0; */
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  font-size: 22px;
  font-weight: 500;
`;

const PoseSelectedDiv = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: flex-end;
  /* height: 130px; */
  width: 100vw;
  //border: 3px solid green;
  //background-color: #f0f0f0;
  top: 90%;
  /* bottom: 50%; */
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  @media only screen and (max-width: 600px) {
    justify-content: start;
  }
`;
const ButtonSelected = styled.button`
  min-width: 100px;
  height: 100px;
  background-color: #00ffea;
  margin: 10px;
  border-radius: 5px;
`;
