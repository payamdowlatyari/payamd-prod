/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unknown-property */
/* eslint-disable consistent-return */

"use client";

import { OrthographicCamera, useFBO, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * A hook to get the current width, height, and pixel ratio of the window.
 *
 * Returns an object with the following properties:
 * - width: The width of the window in pixels.
 * - height: The height of the window in pixels.
 * - pixelRatio: The device pixel ratio of the window.
 *
 * The returned values update automatically when the window is resized.
 */
function useDimension() {
  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
    pixelRatio: 1,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const resize = () => {
        setDimension({
          width: window.innerWidth,
          height: window.innerHeight,
          pixelRatio: window.devicePixelRatio,
        });
      };

      resize();

      window.addEventListener("resize", resize);

      return () => window.removeEventListener("resize", resize);
    }
  }, []);

  return dimension;
}

/**
 * A hook to get the current mouse position and pixel ratio of the window.
 *
 * Returns an object with the following properties:
 * - x: The x-coordinate of the mouse pointer in pixels.
 * - y: The y-coordinate of the mouse pointer in pixels.
 * - pixelRatio: The device pixel ratio of the window.
 *
 * The returned values update automatically when the mouse is moved.
 */
function useMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0, pixelRatio: 0 });

  const mouseMove = (e: { clientX: any; clientY: any }) => {
    const { clientX, clientY } = e;
    setMouse({
      x: clientX,
      y: clientY,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return mouse;
}

/**
 * A React component for rendering a 3D scene with a ripple effect.
 *
 * @description A model for rendering a 3D scene with a ripple effect.
 *
 * @example
 * <Canvas>
 *   <ambientLight />
 *   <Model />
 * </Canvas>
 */
function Model() {
  const { viewport } = useThree();
  const texture = useTexture("/10.jpg");
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const [meshes, setMeshes] = useState<JSX.Element[]>([]);
  const mouse = useMouse();
  const device = useDimension();
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });
  const [currentWave, setCurrentWave] = useState(0);
  const { camera } = useThree();

  const scene = new THREE.Scene();
  const max = 100;

  const uniforms = useRef({
    uDisplacement: { value: new THREE.Texture() },
    uTexture: { value: new THREE.Texture() },
    winResolution: {
      value: new THREE.Vector2(0, 0),
    },
  });

  const fboBase = useFBO(device.width, device.height);
  const fboTexture = useFBO(device.width, device.height);

  /**
   * Images is a function that returns a scene with an image.
   *
   * @description Returns a Three.js scene with an orthographic camera and a plane
   * that displays a texture.
   *
   * @param {THREE.Vector2} viewportSize The size of the viewport.
   * @returns {{scene: THREE.Scene, camera: THREE.Camera}} A scene and camera that
   * can be used to render the image.
   */
  function Images(viewportSize: THREE.Vector2): {
    scene: THREE.Scene;
    camera: THREE.Camera;
  } {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      viewportSize.width / -2,
      viewportSize.width / 2,
      viewportSize.height / 2,
      viewportSize.height / -2,
      -1000,
      1000
    );
    camera.position.z = 2;
    scene.add(camera);
    const geometry = new THREE.PlaneGeometry(1, 1);
    const group = new THREE.Group();

    const texture1 = useTexture("/me-ai-red_processed.jpeg");
    const material1 = new THREE.MeshBasicMaterial({ map: texture1 });
    const image1 = new THREE.Mesh(geometry, material1);
    image1.position.x = -0.3 * viewportSize.width;
    image1.position.y = 0;
    image1.position.z = 1;
    image1.scale.x = viewport.width;
    image1.scale.y = viewport.width;
    group.add(image1);

    // const texture2 = useTexture("/picture1.jpeg");
    // const material2 = new THREE.MeshBasicMaterial({ map: texture2 });
    // const image2 = new THREE.Mesh(geometry, material2);
    // image2.position.x = -0.001 * viewportSize.width;
    // image2.position.y = 0;
    // image2.position.z = 1;
    // image2.scale.x = 1080 / 4;
    // image2.scale.y = 1920 / 4;
    // group.add(image2);

    // const texture3 = useTexture('/picture3.jpeg');
    // const material3 = new THREE.MeshBasicMaterial({ map: texture3 });
    // const image3 = new THREE.Mesh(geometry, material3);
    // image3.position.x = 0.25 * viewport.width;
    // image3.position.y = 0;
    // image3.position.z = 1;
    // image3.scale.x = viewport.width / 5;
    // image3.scale.y = viewport.width / 4;
    // group.add(image3);

    scene.add(group);
    return { scene, camera };
  }

  const { scene: imageScene, camera: imageCamera } = Images(
    new THREE.Vector2(viewport.width, viewport.height)
  );

  useEffect(() => {
    const generatedMeshes = Array.from({ length: max }).map((_, i) => {
      const meshKey = `mesh-${i}-${Math.random().toString(36).substr(2, 9)}`;
      return (
        <mesh
          key={meshKey}
          position={[0, 0, 0]}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          rotation={[0, 0, Math.random()]}
          visible={false}
        >
          <planeGeometry args={[60, 60, 1, 1]} />
          <meshBasicMaterial transparent map={texture} />
        </mesh>
      );
    });
    setMeshes(generatedMeshes);
  }, [texture]);

  /**
   * Updates the position and scale of a single mesh, given its index in the `meshRefs` array.
   * Also sets the mesh's visibility to true and its opacity to 1.
   * @param {number} x - The x coordinate to set the mesh's position to.
   * @param {number} y - The y coordinate to set the mesh's position to.
   * @param {number} currentWave - The index of the mesh to update in the `meshRefs` array.
   */
  function setNewWave(x: number, y: number, currentWave: number) {
    const mesh = meshRefs.current[currentWave];
    if (mesh) {
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.visible = true;
      (mesh.material as THREE.Material).opacity = 1;
      mesh.scale.x = 1.75;
      mesh.scale.y = 1.75;
    }
  }

  /**
   * Keeps track of the position of the mouse, and updates the currentWave variable
   * and calls setNewWave when the mouse has moved more than 0.1 units since the
   * last frame.
   *
   * @param {number} x - The x coordinate of the mouse.
   * @param {number} y - The y coordinate of the mouse.
   */
  function trackMousePos(x: number, y: number) {
    if (Math.abs(x - prevMouse.x) > 0.1 || Math.abs(y - prevMouse.y) > 0.1) {
      setCurrentWave((currentWave + 1) % max);
      setNewWave(x, y, currentWave);
    }
    setPrevMouse({ x, y });
  }

  useFrame(({ gl, scene: finalScene }) => {
    const x = mouse.x - device.width / 1.65;
    const y = -mouse.y + device.height / 1.5;
    trackMousePos(x, y);
    meshRefs.current.forEach((mesh) => {
      if (mesh && mesh.visible) {
        mesh.rotation.z += 0.025;
        (mesh.material as THREE.MeshBasicMaterial).opacity *= 0.95;
        mesh.scale.x = 0.98 * mesh.scale.x + 0.155;
        mesh.scale.y = 0.98 * mesh.scale.y + 0.155;
      }
    });

    if (device.width > 0 && device.height > 0) {
      // uniforms.current.uTexture.value = imageTexture;

      // Render to base texture with meshes
      gl.setRenderTarget(fboBase);
      gl.clear();
      meshRefs.current.forEach((mesh) => {
        if (mesh && mesh.visible) {
          scene.add(mesh);
        }
      });
      gl.render(scene, camera);
      meshRefs.current.forEach((mesh) => {
        if (mesh && mesh.visible) {
          scene.remove(mesh);
        }
      });
      uniforms.current.uTexture.value = fboTexture.texture;

      gl.setRenderTarget(fboTexture);
      gl.render(imageScene, imageCamera);
      uniforms.current.uDisplacement.value = fboBase.texture;

      gl.setRenderTarget(null);
      gl.render(finalScene, camera);

      // Render the scene with updated displacement
      gl.setRenderTarget(fboTexture);
      gl.clear();
      gl.render(scene, camera);
      uniforms.current.uTexture.value = fboTexture.texture;
      gl.setRenderTarget(null);

      uniforms.current.winResolution.value = new THREE.Vector2(
        device.width,
        device.height
      ).multiplyScalar(device.pixelRatio);
    }
  }, 1);

  return (
    <group>
      {meshes}
      <mesh>
        <planeGeometry args={[device.width, device.height, 1, 1]} />
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent
          uniforms={uniforms.current}
        />
      </mesh>
    </group>
  );
}

const fragment = `
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec4 winResolution;
varying vec2 vUv;
float PI = 3.141592653589793238;

void main() {
  vec2 vUvScreen = gl_FragCoord.xy / winResolution.xy;

  vec4 displacement = texture2D(uDisplacement, vUvScreen);
  float theta = displacement.r*2.0*PI;

  vec2 dir = vec2(sin(theta),cos(theta));
  vec2 uv = vUvScreen + dir*displacement.r*0.075;
  vec4 color = texture2D(uTexture,uv);

  gl_FragColor = color;
}
`;

const vertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/**
 * ImageRipple is a React component that renders a full-screen canvas
 * with an orthographic camera and a 3D model centered in view.
 *
 * It utilizes the device dimensions to correctly set the aspect ratio
 * and frustum size for the camera, ensuring the model is displayed
 * proportionately on different screen sizes.
 *
 * The component returns null if device dimensions are not available.
 */
export default function ImageRipple() {
  const device = useDimension();

  if (!device.width || !device.height) {
    return null;
  }

  const frustumSize = device.height;
  const aspect = device.width / device.height;

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <Canvas>
        <OrthographicCamera
          makeDefault
          args={[
            (frustumSize * aspect) / -2,
            (frustumSize * aspect) / 2,
            frustumSize / 2,
            frustumSize / -2,
            -1000,
            1000,
          ]}
          position={[0, 0, 2]}
        />
        <Model />
      </Canvas>
    </div>
  );
}
