/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-namespace */

import { useTexture, shaderMaterial } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

declare global {
  namespace JSX {
    /**
     * @description Extends the JSX.IntrinsicElements interface to include the custom "imageFadeMaterial" element.
     */
    interface IntrinsicElements {
      imageFadeMaterial: any;
    }
  }
}

/**
 * A shader material for the image fading effect.
 */
export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: null,
    tex2: null,
    disp: null,
  },
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  `varying vec2 vUv;

    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;

    uniform float dispFactor;
    uniform float effectFactor;

    void main() {
        vec4 dispMap = texture2D(disp, vUv);
        float d = dispMap.r * effectFactor;

        vec2 distorted1 = vec2(vUv.x + dispFactor * d, vUv.y);
        vec2 distorted2 = vec2(vUv.x - (1.0 - dispFactor) * d, vUv.y);

        vec4 t1 = texture2D(tex, distorted1);
        vec4 t2 = texture2D(tex2, distorted2);

        vec4 finalColor = mix(t1, t2, dispFactor);

        gl_FragColor = finalColor;

        #include <tonemapping_fragment>
        #include <colorspace_fragment>
    }`
);

extend({ ImageFadeMaterial });

/**
 * Props for the FadingImage component.
 */
type FadingImageProps = {
  i1: string;
  i2: string;
};

/**
 * A mesh component that displays a fading image effect.
 *
 * It takes two image urls as props and displays them as a fading effect.
 * The effect is triggered by hovering over the component.
 *
 * @param {FadingImageProps} props - The props object.
 */
export function FadingImage({ i1, i2 }: FadingImageProps) {
  const ref = useRef<any>();

  const [tex1, tex2, disp] = useTexture([i1, i2, "/13.jpg"]);

  useMemo(() => {
    tex1.colorSpace = THREE.SRGBColorSpace;
    tex2.colorSpace = THREE.SRGBColorSpace;
    disp.colorSpace = THREE.SRGBColorSpace;
  }, [tex1, tex2, disp]);

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
      <planeGeometry args={[1, 1]} />
      <imageFadeMaterial
        ref={ref}
        tex={tex1}
        tex2={tex2}
        disp={disp}
        toneMapped={false}
      />
    </mesh>
  );
}

/**
 * Props for the ImageEffect component.
 */
type ImageEffectProps = {
  item1: string;
  item2: string;
};

/**
 * A Canvas component that renders a FadingImage component with two images.
 *
 * @param {ImageEffectProps} props - The props object.
 */
export default function ImageEffect({ item1, item2 }: ImageEffectProps) {
  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
      <FadingImage i1={item1} i2={item2} />
    </Canvas>
  );
}
