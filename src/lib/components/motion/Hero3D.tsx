/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/order */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-duplicates */

"use client";

import { useHelper, Html } from "@react-three/drei";
import { useFrame, useThree, Canvas } from "@react-three/fiber";
import html2canvas from "html2canvas";
import { Leva, useControls } from "leva";
import { debounce } from "lodash";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { PointLightHelper } from "three";
import CustomShaderMaterial from "three-custom-shader-material";

import fragmentShader from "./utils/shaders/fragment.glsl";
import vertexShader from "./utils/shaders/vertex.glsl";
import { FlipWords } from "./FlipWords";
import { portfolio } from "../data/data";
import Scramble from "./Scramble";
import { GridBeam } from "./BackgroundBeams";
import ParallaxText from "./ParallaxText";

const useDomToCanvas = (domEl: any) => {
  const [texture, setTexture] = useState();
  useEffect(() => {
    if (!domEl) return;
    const convertDomToCanvas = async () => {
      const canvas = await html2canvas(domEl, { backgroundColor: null });

      // @ts-ignore
      setTexture(new THREE.CanvasTexture(canvas));
    };

    convertDomToCanvas();

    const debouncedResize = debounce(() => {
      convertDomToCanvas();
    }, 100);

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [domEl]);

  return texture;
};

function Lights() {
  const pointLightRef: any = useRef();

  useHelper(pointLightRef, PointLightHelper, 0.7, "cyan");

  const config = useControls("Lights", {
    color: "#ffffff",
    intensity: { value: 30, min: 0, max: 5000, step: 0.01 },
    distance: { value: 12, min: 0, max: 100, step: 0.1 },
    decay: { value: 1, min: 0, max: 5, step: 0.1 },
    position: { value: [2, 4, 6] },
  });
  return <pointLight ref={pointLightRef} {...config} />;
}

function Scene() {
  const state = useThree();
  const { width, height } = state.viewport;
  const [domEl, setDomEl] = useState<HTMLDivElement | null>(null);

  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const textureDOM = useDomToCanvas(domEl);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: textureDOM },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [textureDOM]
  );

  const mouseLerped = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const { mouse } = state;
    mouseLerped.current.x = THREE.MathUtils.lerp(
      mouseLerped.current.x,
      mouse.x,
      0.1
    );
    mouseLerped.current.y = THREE.MathUtils.lerp(
      mouseLerped.current.y,
      mouse.y,
      0.1
    );
    if (materialRef.current) {
      materialRef.current.uniforms.uMouse.value.x = mouseLerped.current.x;
      materialRef.current.uniforms.uMouse.value.y = mouseLerped.current.y;
    }
  });

  return (
    <>
      <Html zIndexRange={[-1, -10]} prepend fullscreen>
        <div ref={(el) => setDomEl(el)} className="dom-element">
          <p className="flex flex-col text-neutral-500">
            PAYAM <br />
            DOWLATYARI
          </p>
        </div>
      </Html>
      <mesh>
        <planeGeometry args={[width, height, 254, 254]} />
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          flatShading
          transparent
          silent
        />
        <Lights />
      </mesh>
    </>
  );
}
function Title3D() {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        camera={{
          fov: 55,
          near: 0.1,
          far: 200,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

function Aside() {
  return (
    <div className="absolute flex flex-col self-end h-full w-screen items-end right-0">
      <GridBeam className="flex flex-col items-start justify-end h-[50vh] relative z-10">
        <div className="flex justify-center items-center px-8">
          <div className="text-3xl md:text-5xl font-normal text-neutral-300">
            <FlipWords words={portfolio.words} />
          </div>
        </div>
        <div className="h-48 w-screen uppercase flex justify-end">
          <Scramble url="#intro" title="Who I am" />
          <Scramble url="#services" title="What I do" />
        </div>
        <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
      </GridBeam>
    </div>
  );
}

export function Hero3D() {
  return (
    <div className="bg-transparent">
      <Leva
        collapsed={false}
        flat
        hidden
        theme={{
          sizes: {
            titleBarHeight: "28px",
          },
          fontSizes: {
            root: "10px",
          },
        }}
      />
      <main className="w-screen">
        <Title3D />
        <Aside />
      </main>
    </div>
  );
}
