/* eslint-disable react/no-unknown-property */
import { useHelper, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import html2canvas from "html2canvas";
import { useControls } from "leva";
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from "lodash.debounce";
// eslint-disable-next-line import/order
import { useRef, useMemo, useEffect, useState } from "react";

// 3D
import * as THREE from "three";
import { PointLightHelper } from "three";
import CustomShaderMaterial from "three-custom-shader-material";

export const fragmentShader = `uniform sampler2D uTexture;
uniform vec2 uMouse;
varying vec2 vUv;

float circle(vec2 uv, vec2 circlePosition, float radius) {
	float dist = distance(circlePosition, uv);
	return 1. - smoothstep(0.0, radius, dist);
}

void main() {
	vec4 finalTexture = texture2D(uTexture, vUv);
	csm_DiffuseColor = finalTexture;
}`;

export const vertexShader = `uniform float time;
uniform vec2 uMouse;

varying vec2 vUv;

float circle(vec2 uv, vec2 circlePosition, float radius) {
	float dist = distance(circlePosition, uv);
	return 1. - smoothstep(0.0, radius, dist);
}

float elevation(float radius, float intensity) {
	float circleShape = circle(uv, (uMouse * 0.5) + 0.5, radius);
	return circleShape * intensity;
}

void main() {
	vec3 newPosition = position;
	newPosition.z += elevation(0.2, .7);

	csm_Position = newPosition;
	vUv = uv;
}`;

const useDomToCanvas = (domEl: any) => {
  const [texture, setTexture] = useState({});
  useEffect(() => {
    const convertDomToCanvas = async () => {
      const canvas = await html2canvas(domEl, { backgroundColor: null });
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

export default function TextEffect() {
  const state = useThree();
  const { width, height } = state.viewport;
  const [domEl, setDomEl] = useState<any>(null);

  const materialRef: any = useRef();
  const textureDOM = useDomToCanvas(domEl);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: textureDOM },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [textureDOM]
  );

  const mouseLerped = useRef({ x: 0, y: 0 });

  useFrame(() => {
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
    materialRef.current.uniforms.uMouse.value.x = mouseLerped.current.x;
    materialRef.current.uniforms.uMouse.value.y = mouseLerped.current.y;
  });

  return (
    <>
      <Html zIndexRange={[-1, -10]} prepend fullscreen>
        <div ref={(el) => setDomEl(el)} className="dom-element">
          <div className="dom-paragraph">
            WHEN <br />
            WILL <br />
            WE <br />
            MEET ?<br />
          </div>
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
          silent
        />
        <Lights />
      </mesh>
    </>
  );
}
