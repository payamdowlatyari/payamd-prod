/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable react/no-unknown-property */
import { useTexture, shaderMaterial } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      imageFadeMaterial: any; // ???
    }
  }
}

export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: 0,
    tex2: 0,
    disp: 0,
  },
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  ` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }`
);
extend({ ImageFadeMaterial });

export function FadingImage({ i1, i2 }: any) {
  const ref: any = useRef();
  const [texture1, texture2, dispTexture] = useTexture([i1, i2, "/13.jpg"]);
  const [hovered, setHover] = useState(false);
  useFrame(() => {
    ref.current.dispFactor = THREE.MathUtils.lerp(
      ref.current.dispFactor,
      hovered ? 1 : 0,
      0.075
    );
  });
  return (
    <mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry />
      <imageFadeMaterial
        ref={ref}
        tex={texture1}
        tex2={texture2}
        disp={dispTexture}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function ImageEffect({
  item1,
  item2,
}: {
  item1: string;
  item2: string;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
      <FadingImage i1={item1} i2={item2} />
    </Canvas>
  );
}
