import { useRef } from "react";
import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { MeshDistortMaterial, GradientTexture } from "@react-three/drei";

export default function Distorted({ url }: any) {
  const el: any = useRef();
  return (
    <>
      <div
        ref={el}
        style={{
          aspectRatio: "16/10",
          backgroundImage: `url(${url})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          backgroundSize: "contain",
          position: "absolute",
          zIndex: "0",
          width: "50%",
          height: "100%",
          top: "0",
          right: "0",
        }}
      />
      <UseCanvas>
        <ScrollScene track={el}>
          {(props) => (
            <mesh {...props}>
              {/* <planeGeometry args={[1, 1, 16, 16]} /> */}
              <MeshDistortMaterial speed={5} distort={0.1}>
                <GradientTexture
                  stops={[0, 1]} // As many stops as you want
                  colors={["#fff", "#222"]} // Colors need to match the number of stops
                  rotation={0.5}
                />
              </MeshDistortMaterial>
            </mesh>
          )}
        </ScrollScene>
      </UseCanvas>
    </>
  );
}
