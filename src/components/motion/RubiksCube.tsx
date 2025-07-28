/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-restricted-syntax */

"use client";

import {
  PerspectiveCamera,
  SpotLight,
  useDepthBuffer,
  RoundedBox,
} from "@react-three/drei";
import {
  Canvas,
  useThree,
  useFrame,
  Euler,
  ExtendedColors,
  Layers,
  NodeProps,
  NonFunctionKeys,
  Overwrite,
} from "@react-three/fiber";
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";
import {
  Suspense,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useMemo,
  useCallback,
  useImperativeHandle,
  JSX,
  PropsWithChildren,
  RefAttributes,
} from "react";
import * as THREE from "three";
import { Vector3, Matrix4, Quaternion } from "three";

const RubiksCubeModel: any = forwardRef((props, ref) => {
  const ANIMATION_DURATION: number = 1.2;
  const GAP: number = 0.01;
  const RADIUS: number = 0.075;

  const mainGroupRef: any = useRef();
  const isAnimatingRef: any = useRef(false);
  const currentRotationRef: any = useRef(0);
  const lastMoveAxisRef: any = useRef(null);
  const currentMoveRef: any = useRef(null);
  const animationFrameRef: any = useRef(null);
  const isMountedRef: any = useRef(true);
  const viewportSizeRef: any = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const isResizingRef: any = useRef(false);
  const resizeTimeoutRef: any = useRef(null);

  const [size, setSize] = useState(0.8);

  const [cubes, setCubes] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [deviceSettings, setDeviceSettings] = useState(() => {
    const isMobile = window.innerWidth < 768;
    return {
      smoothness: isMobile ? 2 : 4,
      castShadow: !isMobile,
      receiveShadow: !isMobile,
    };
  });

  const reusableVec3: any = useMemo(() => new Vector3(), []);
  const reusableMatrix4: any = useMemo(() => new Matrix4(), []);
  const reusableQuaternion: any = useMemo(() => new Quaternion(), []);

  useImperativeHandle(ref, () => ({
    reset: resetCube,
    /**
     * Getter for the main group reference of the Rubik's Cube model.
     * @returns The current reference to the main group.
     */
    get group() {
      return mainGroupRef.current;
    },
  }));

  const initializeCubes = useCallback(() => {
    const initial = [];
    const positions = [-1, 0, 1];

    for (const x of positions) {
      for (const y of positions) {
        for (const z of positions) {
          initial.push({
            position: new Vector3(x, y, z),
            rotationMatrix: new Matrix4().identity(),
            id: `cube-${x}-${y}-${z}`,
            originalCoords: { x, y, z },
          });
        }
      }
    }
    return initial;
  }, []);

  useEffect(() => {
    setCubes(initializeCubes());

    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
        resizeTimeoutRef.current = null;
      }
    };
  }, [initializeCubes]);

  const resetCube = useCallback(() => {
    if (!isMountedRef.current) return;

    setCubes(initializeCubes());
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.set(0, 0, 0);
    }
    isAnimatingRef.current = false;
    currentRotationRef.current = 0;
    lastMoveAxisRef.current = null;
    currentMoveRef.current = null;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, [initializeCubes]);

  const handleViewportChange = useCallback(() => {
    if (!isMountedRef.current) return;

    isResizingRef.current = true;

    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const visualViewportWidth = window.visualViewport
        ? window.visualViewport.width
        : width;
      const visualViewportHeight = window.visualViewport
        ? window.visualViewport.height
        : height;

      const effectiveWidth = Math.min(width, visualViewportWidth);
      const effectiveHeight = Math.min(height, visualViewportHeight);

      const prevSize = viewportSizeRef.current;
      if (
        Math.abs(prevSize.width - effectiveWidth) < 10 &&
        Math.abs(prevSize.height - effectiveHeight) < 10
      ) {
        isResizingRef.current = false;
        return;
      }

      viewportSizeRef.current = {
        width: effectiveWidth,
        height: effectiveHeight,
      };

      const isMobile = effectiveWidth < 768;
      setDeviceSettings((prevSettings) => {
        const newSettings = {
          smoothness: isMobile ? 2 : 4,
          castShadow: !isMobile,
          receiveShadow: !isMobile,
        };

        if (
          prevSettings.smoothness !== newSettings.smoothness ||
          prevSettings.castShadow !== newSettings.castShadow ||
          prevSettings.receiveShadow !== newSettings.receiveShadow
        ) {
          return newSettings;
        }
        return prevSettings;
      });

      isResizingRef.current = false;
    }, 150);
  }, [resetCube]);

  useEffect(() => {
    handleViewportChange();

    let throttleTimer: NodeJS.Timeout | null = null;

    /**
     * Throttles the invocation of `handleViewportChange` to at most once per 100ms.
     * This is necessary because the `resize` event is fired very frequently,
     * and we don't want to thrash the browser with too many layout calculations.
     */
    const throttledHandler = () => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        handleViewportChange();
        throttleTimer = null;
      }, 100);
    };

    window.addEventListener("resize", throttledHandler);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", throttledHandler);
      window.visualViewport.addEventListener("scroll", throttledHandler);
    }

    /**
     * Handles the `orientationchange` event by resetting the cube if it's
     * currently animating, and then waits 100ms before recalculating the
     * viewport size. This is necessary because the `orientationchange` event is
     * fired before the `resize` event, and we don't want to prematurely
     * recalculate the viewport size.
     */
    const handleOrientationChange = () => {
      if (isAnimatingRef.current) {
        resetCube();
      }
      setTimeout(handleViewportChange, 100);
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", throttledHandler);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", throttledHandler);
        window.visualViewport.removeEventListener("scroll", throttledHandler);
      }
      window.removeEventListener("orientationchange", handleOrientationChange);

      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
    };
  }, [handleViewportChange, resetCube]);

  useEffect(() => {
    /**
     * Handles changes in the document's visibility state.
     * Updates the visibility state of the component and resets the Rubik's Cube
     * when the page is not visible. Recalculates the viewport size when the page
     * becomes visible again after a short delay.
     */
    const handleVisibilityChange = () => {
      if (!isMountedRef.current) return;
      const isPageVisible = document.visibilityState === "visible";
      setIsVisible(isPageVisible);

      if (!isPageVisible) {
        resetCube();
      } else {
        setTimeout(() => {
          if (isMountedRef.current) {
            handleViewportChange();
          }
        }, 100);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [resetCube, handleViewportChange]);

  const possibleMoves = useMemo(() => {
    const moves = [];
    for (const axis of ["x", "y", "z"]) {
      for (const layer of [-1, 0, 1]) {
        for (const direction of [1, -1]) {
          moves.push({ axis, layer, direction });
        }
      }
    }
    return moves;
  }, []);

  const isInLayer = useCallback(
    (position: { x: any; y: any; z: any }, axis: string, layer: number) => {
      const coord =
        axis === "x" ? position.x : axis === "y" ? position.y : position.z;
      return Math.abs(coord - layer) < 0.1;
    },
    []
  );

  const selectNextMove = useCallback(() => {
    if (
      !isAnimatingRef.current &&
      isVisible &&
      isMountedRef.current &&
      !isResizingRef.current
    ) {
      const availableMoves = possibleMoves.filter(
        (move) => move.axis !== lastMoveAxisRef.current
      );

      const move =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      const rotationAngle = Math.PI / 2;

      currentMoveRef.current = { ...move, rotationAngle };
      lastMoveAxisRef.current = move.axis;
      isAnimatingRef.current = true;
      currentRotationRef.current = 0;
    } else {
      isAnimatingRef.current = false;
    }
  }, [possibleMoves, isVisible]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    /**
     * Schedules the next move of the Rubik's Cube animation.
     * Determines the appropriate delay based on whether the cube is currently animating
     * or resizing, and then recursively schedules the next move.
     * If the cube is animating, it uses the animation duration as the delay; otherwise,
     * a shorter delay is used. If resizing, it waits longer before checking again.
     * Ensures that scheduling continues as long as the component is mounted and visible.
     */
    const scheduleNextMove = () => {
      if (isVisible && isMountedRef.current && !isResizingRef.current) {
        const delay = isAnimatingRef.current ? ANIMATION_DURATION * 1000 : 200;

        timeoutId = setTimeout(() => {
          selectNextMove();
          if (isMountedRef.current) {
            scheduleNextMove();
          }
        }, delay);
      } else if (isResizingRef.current && isVisible && isMountedRef.current) {
        setTimeout(() => {
          if (isMountedRef.current) {
            scheduleNextMove();
          }
        }, 500);
      }
    };

    scheduleNextMove();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible, selectNextMove]);

  const createRotationMatrix = useCallback(
    (axis: string | number, angle: number) => {
      reusableMatrix4.identity();
      reusableQuaternion.identity();
      reusableVec3.set(0, 0, 0);

      reusableVec3[axis] = 1;
      reusableQuaternion.setFromAxisAngle(reusableVec3, angle);
      return reusableMatrix4.makeRotationFromQuaternion(reusableQuaternion);
    },
    [reusableMatrix4, reusableQuaternion, reusableVec3]
  );

  const easeInOutQuad = useCallback((t: number) => {
    return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
  }, []);

  const matrixToQuaternion = useCallback(
    (matrix: THREE.Matrix4) => {
      reusableQuaternion.setFromRotationMatrix(matrix);
      return reusableQuaternion.clone();
    },
    [reusableQuaternion]
  );

  const normalizePositions = useCallback((cubes: any[]) => {
    return cubes.map(
      (cube: { position: { x: number; y: number; z: number } }) => {
        const x = Math.round(cube.position.x);
        const y = Math.round(cube.position.y);
        const z = Math.round(cube.position.z);

        const newPosition =
          Math.abs(cube.position.x - x) > 0.001 ||
          Math.abs(cube.position.y - y) > 0.001 ||
          Math.abs(cube.position.z - z) > 0.001
            ? new Vector3(x, y, z)
            : cube.position;

        return {
          ...cube,
          position: newPosition,
        };
      }
    );
  }, []);

  const checkCubeIntegrity = useCallback((cubes: string | any[]) => {
    if (cubes.length !== 27) {
      console.warn("Incorrect number of cubes:", cubes.length);
      return false;
    }

    for (const cube of cubes) {
      const { x, y, z } = cube.position;
      if (Math.abs(x) > 1.1 || Math.abs(y) > 1.1 || Math.abs(z) > 1.1) {
        console.warn("Cube out of range:", cube.id, x, y, z);
        return false;
      }
    }

    return true;
  }, []);

  const updateCubes = useCallback(
    (
      prevCubes: any[],
      move: { axis: string; layer: number },
      stepRotationMatrix: THREE.Matrix4
    ) => {
      return prevCubes.map(
        (cube: {
          position: { x: any; y: any; z: any };
          rotationMatrix: THREE.Matrix4;
        }) => {
          if (isInLayer(cube.position, move.axis, move.layer)) {
            const tempVec3 = new Vector3(
              cube.position.x,
              cube.position.y,
              cube.position.z
            );

            tempVec3.applyMatrix4(stepRotationMatrix);

            const newRotationMatrix = new Matrix4().multiplyMatrices(
              stepRotationMatrix,
              cube.rotationMatrix
            );

            return {
              ...cube,
              position: tempVec3,
              rotationMatrix: newRotationMatrix,
            };
          }
          return cube;
        }
      );
    },
    [isInLayer]
  );

  useFrame((_, delta) => {
    if (!isVisible || !isMountedRef.current) return;

    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.x += delta * 0.3;
      mainGroupRef.current.rotation.y += delta * 0.5;
      mainGroupRef.current.rotation.z += delta * 0.2;
    }

    if (isResizingRef.current && isAnimatingRef.current) {
      resetCube();
      return;
    }

    if (isAnimatingRef.current && currentMoveRef.current) {
      const move = currentMoveRef.current;
      const targetRotation = move.rotationAngle;
      const rotation = delta / ANIMATION_DURATION;

      if (currentRotationRef.current < 1) {
        const newRotation = Math.min(currentRotationRef.current + rotation, 1);
        const prevRotation = currentRotationRef.current;
        currentRotationRef.current = newRotation;

        const easedProgress = easeInOutQuad(newRotation);
        const prevEasedProgress = easeInOutQuad(prevRotation);
        const currentAngle = easedProgress * targetRotation;
        const prevAngle = prevEasedProgress * targetRotation;
        const stepRotation = currentAngle - prevAngle;

        const stepRotationMatrix = createRotationMatrix(
          move.axis,
          stepRotation * move.direction
        );

        if (isMountedRef.current && !isResizingRef.current) {
          setCubes((prevCubes) => {
            const updatedCubes = updateCubes(
              prevCubes,
              move,
              stepRotationMatrix
            );

            if (newRotation >= 1) {
              const normalizedCubes = normalizePositions(updatedCubes);

              if (!checkCubeIntegrity(normalizedCubes)) {
                console.warn("Found a cube out of bounds");
                if (isMountedRef.current) {
                  setTimeout(() => resetCube(), 0);
                }
              }

              isAnimatingRef.current = false;
              currentRotationRef.current = 0;
              currentMoveRef.current = null;

              return normalizedCubes;
            }

            return updatedCubes;
          });
        }
      }
    }
  });

  const chromeMaterial = useMemo(
    () => ({
      color: "#000000",
      metalness: 0.5,
      roughness: 0.5,
      clearcoat: 0,
      clearcoatRoughness: 0,
      reflectivity: 0.5,
      iridescence: 0,
      iridescenceIOR: 0,
      iridescenceThicknessRange: [100, 400] as [number, number],
      envMapIntensity: 8,
    }),
    []
  );

  const sharedMaterial = useMemo(
    () => <meshPhysicalMaterial {...chromeMaterial} />,
    [chromeMaterial]
  );

  return (
    <group ref={mainGroupRef} {...props}>
      {cubes.map((cube) => (
        <group
          key={cube.id}
          position={[
            cube.position.x * (size + GAP),
            cube.position.y * (size + GAP),
            cube.position.z * (size + GAP),
          ]}
          quaternion={matrixToQuaternion(cube.rotationMatrix)}
        >
          <RoundedBox
            args={[size, size, size]}
            radius={RADIUS}
            smoothness={deviceSettings.smoothness}
            castShadow={deviceSettings.castShadow}
            receiveShadow={deviceSettings.receiveShadow}
          >
            {sharedMaterial}
          </RoundedBox>
        </group>
      ))}
    </group>
  );
});

/**
 * CameraController is a component that uses the useThree hook to access
 * the camera from the react-three-fiber context. It utilizes the useFrame
 * hook to continuously update the camera's orientation to look at the origin
 * (0, 0, 0) on every frame render.
 */
function CameraController() {
  const { camera } = useThree();

  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * A wrapper around the react-three-fiber SpotLight component that adds a few
 * convenience features. It sets the `castShadow` property to false by default,
 * and sets the target of the spotlight to the origin (0, 0, 0) on every render.
 *
 * Note that the `ref` property is not forwarded to the underlying
 * react-three-fiber SpotLight component, but rather to an internal
 * THREE.SpotLight instance. This is necessary to allow the effect to use the
 * THREE.SpotLightHelper helper.
 *
 * @param {Object} props - The props to pass to the underlying
 * react-three-fiber SpotLight component.
 */
function EnhancedSpotlight(
  props: JSX.IntrinsicAttributes &
    Omit<
      PropsWithChildren<
        Omit<
          ExtendedColors<
            Overwrite<
              Partial<THREE.SpotLight>,
              NodeProps<THREE.SpotLight, typeof THREE.SpotLight>
            >
          >,
          NonFunctionKeys<{
            position?: Vector3;
            up?: Vector3;
            scale?: Vector3;
            rotation?: Euler;
            matrix?: Matrix4;
            quaternion?: Quaternion;
            layers?: Layers;
            dispose?: (() => void) | null;
          }>
        > & {
          position?: Vector3 | undefined | [number, number, number];
          up?: Vector3;
          scale?: Vector3;
          rotation?: Euler;
          matrix?: Matrix4;
          quaternion?: Quaternion;
          layers?: Layers;
          dispose?: (() => void) | null;
        } & EventHandlers & {
            depthBuffer?: THREE.DepthTexture;
            attenuation?: number;
            anglePower?: number;
            radiusTop?: number;
            radiusBottom?: number;
            opacity?: number;
            color?: string | number;
            volumetric?: boolean;
            debug?: boolean;
          }
      >,
      "ref"
    > &
    RefAttributes<THREE.SpotLight>
) {
  const light: any = useRef();

  useEffect(() => {
    if (light.current) {
      light.current.target.position.set(0, 0, 0);
      light.current.target.updateMatrixWorld();
    }
  }, []);

  return <SpotLight castShadow={false} ref={light} {...props} />;
}

/**
 * SceneContent is a component that renders the entire scene of the
 * react-three-fiber example. It uses the useDepthBuffer hook to create a
 * depth buffer, and the useFrame hook to continuously update the time
 * state variable. It then renders a spotlight, a perspective camera,
 * a CameraController component to control the camera orientation, and
 * a Suspense component wrapping a RubiksCubeModel component.
 */
function SceneContent() {
  const depthBuffer = useDepthBuffer({
    size: 2048,
    frames: 1,
    // disableRenderLoop: true,
  });

  const [time, setTime] = useState(0);
  useFrame((state) => {
    setTime(state.clock.getElapsedTime());
  });

  return (
    <>
      <EnhancedSpotlight
        depthBuffer={depthBuffer}
        color="#aaaace"
        position={[3, 3, 2]}
        volumetric
        opacity={1}
        penumbra={1}
        distance={17}
        angle={0.8}
        attenuation={30}
        anglePower={6}
        intensity={1}
        // shadowMapSize={2048}
        // shadowBias={-0.0001}
        // shadowAutoUpdate
        castShadow
      />

      <PerspectiveCamera
        makeDefault
        fov={50}
        position={[0, 0, 7]}
        near={0.1}
        far={1000}
      />

      <CameraController />

      <Suspense fallback={null}>
        <RubiksCubeModel position={[0, 0, 0]} scale={1} time={time} />
      </Suspense>
    </>
  );
}

/**
 * RubiksCube is a React component that renders a 3D Rubik's Cube scene
 * using the react-three-fiber library. It adjusts rendering settings
 * based on whether the user is on a desktop or mobile device.
 *
 * The component listens for window resize events to update its state
 * and determine the appropriate rendering settings. It uses a Canvas
 * element to render the 3D scene, incorporating features like shadows,
 * tone mapping, and performance optimizations based on the device type.
 */
export default function RubiksCube() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    /**
     * Updates the isDesktop state variable to reflect whether the window width is >= 768px.
     * @function
     */
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();

    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return (
    <div className="h-svh w-screen relative bg-black">
      <Canvas
        shadows
        gl={{
          antialias: isDesktop,
          preserveDrawingBuffer: isDesktop,
          powerPreference: isDesktop ? "high-performance" : "default",
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
