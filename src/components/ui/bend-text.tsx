"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * A fancy 3D text component that uses THREE.js and React.
 *
 * Features:
 * - High-resolution text texture with theme support
 * - Displacement shader material with ease-in-out cubic animation
 * - Shadow shader material with improved shadow effect
 * - Raycasting with invisible hit plane for interactive displacement
 * - Automatic handling of window resize
 * - Automatic cleanup of THREE.js resources on unmount
 *
 * @returns A JSX element containing the 3D text component
 */
export default function BendText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.OrthographicCamera;
    renderer?: THREE.WebGLRenderer;
    animationId?: number;
    cleanup?: () => void;
  }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mounted) return;

    const isDark = true;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance", // 优化性能
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 限制像素比以平衡性能和质量
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    /**
     * Creates a high-resolution text texture with theme support.
     *
     * @param text - The text to render.
     * @param blur - Whether to apply a blur effect.
     * @returns A THREE.CanvasTexture containing the rendered text.
     */
    const createTextTexture = (text: string, blur = false) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      canvas.width = 1024;
      canvas.height = 1024;

      // Enable high-quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Clear canvas
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties based on theme
      const textColor = isDark ? "#ffffff" : "#000000";
      const shadowColor = isDark
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(0, 0, 0, 0.3)";

      if (blur) {
        // Optimize shadow effect
        ctx.fillStyle = shadowColor;
        ctx.filter = "blur(15px)";
        ctx.font = "bold 160px system-ui, -apple-system, sans-serif";
      } else {
        ctx.fillStyle = textColor;
        ctx.font = "bold 160px system-ui, -apple-system, sans-serif";
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
      return texture;
    };

    const textTexture = createTextTexture("21st.dev");
    const shadowTexture = createTextTexture("21st.dev", true);

    // Displacement shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: textTexture },
        uDisplacement: { value: new THREE.Vector3(999, 999, 999) },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform vec3 uDisplacement;
        
        float easeInOutCubic(float x) {
          return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
        }

        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main() {
          vUv = uv;
          vec3 newPosition = position;
          
          vec4 localPosition = vec4(position, 1.0);
          vec4 worldPosition = modelMatrix * localPosition;
          
          float dist = length(uDisplacement - worldPosition.xyz);
          float minDistance = 2.5; // 减小影响范围，让效果更精确
          
          if (dist < minDistance) {
            float distanceMapped = map(dist, 0.0, minDistance, 1.0, 0.0);
            float val = easeInOutCubic(distanceMapped) * 1.5; // 减小位移强度，让效果更自然
            newPosition.z += val;
          }
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        
        void main() {
          vec4 color = texture2D(uTexture, vUv);
          gl_FragColor = vec4(color);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // Shadow shader material with improved shadow effect
    const shadowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: shadowTexture },
        uDisplacement: { value: new THREE.Vector3(999, 999, 999) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float dist;
        uniform vec3 uDisplacement;

        void main() {
          vUv = uv;
          
          vec4 localPosition = vec4(position, 1.0);
          vec4 worldPosition = modelMatrix * localPosition;
          dist = length(uDisplacement - worldPosition.xyz);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float dist;
        uniform sampler2D uTexture;
        
        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }
        
        float easeOutQuad(float x) {
          return 1.0 - (1.0 - x) * (1.0 - x);
        }

        void main() {
          vec4 color = texture2D(uTexture, vUv);
          float minDistance = 2.5; // 与主材质保持一致
          
          if (dist < minDistance) {
            float normalizedDist = map(dist, 0.0, minDistance, 1.0, 0.0);
            float easedDist = easeOutQuad(normalizedDist);
            float alpha = easedDist * color.a * 0.8; // 调整阴影强度
            color.a = alpha;
          } else {
            color.a = 0.0; // 超出范围时完全透明
          }
          
          gl_FragColor = vec4(color);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // Create geometries with higher subdivision for smoother displacement
    const geometry = new THREE.PlaneGeometry(15, 15, 150, 150);

    // Create meshes
    const textMesh = new THREE.Mesh(geometry, shaderMaterial);
    const shadowMesh = new THREE.Mesh(geometry, shadowMaterial);
    shadowMesh.position.z = -0.05; // Adjust shadow position to be closer to text

    scene.add(textMesh);
    scene.add(shadowMesh);

    // Create invisible hit plane for raycasting
    const hitGeometry = new THREE.PlaneGeometry(20, 20);
    const hitMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    });
    const hitPlane = new THREE.Mesh(hitGeometry, hitMaterial);
    hitPlane.name = "hit";
    scene.add(hitPlane);

    // Raycasting setup
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    /**
     * Event handler for pointer move events.
     *
     * This function updates the raycaster to get the intersection point
     * between the ray and the hit plane. If there's an intersection, it
     * updates the shader uniforms with the intersection point, which will
     * then be used to bend the text.
     *
     * @param {MouseEvent} event - The pointer move event
     */
    const onPointerMove = (event: MouseEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(hitPlane);

      if (intersects.length > 0) {
        const { point } = intersects[0];
        // Update shader uniforms
        shaderMaterial.uniforms.uDisplacement.value.copy(point);
        shadowMaterial.uniforms.uDisplacement.value.copy(point);
      }
    };

    /**
     * Resets the displacement position to a far-off point when the pointer leaves.
     *
     * This is necessary because the raycaster will not intersect with the hit plane
     * when the pointer is outside of the container, causing the displacement to be
     * stuck in the last position it was in.
     */
    const onPointerLeave = () => {
      // Reset displacement position when pointer leaves
      const farPoint = new THREE.Vector3(999, 999, 999);
      shaderMaterial.uniforms.uDisplacement.value.copy(farPoint);
      shadowMaterial.uniforms.uDisplacement.value.copy(farPoint);
    };

    // Animation loop
    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    // Event listeners
    const container = containerRef.current;
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    // Handle resize
    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = -10 * aspect;
      camera.right = 10 * aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Store references and start animation
    sceneRef.current = {
      scene,
      camera,
      renderer,
      /**
       * Cleans up all event listeners, the Three.js scene, renderer, and textures.
       * This should be called when the component is unmounted.
       */
      cleanup: () => {
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("resize", handleResize);
        if (sceneRef.current.animationId) {
          cancelAnimationFrame(sceneRef.current.animationId);
        }
        renderer.dispose();
        textTexture.dispose();
        shadowTexture.dispose();
        geometry.dispose();
        hitGeometry.dispose();
        shaderMaterial.dispose();
        shadowMaterial.dispose();
        hitMaterial.dispose();
      },
    };

    animate();

    return () => {
      sceneRef.current.cleanup?.();
    };
  }, [theme, mounted]);

  return (
    <div className="bg-transparent">
      {mounted && <div ref={containerRef} />}
    </div>
  );
}
