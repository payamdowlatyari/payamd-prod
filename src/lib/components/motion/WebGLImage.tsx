"use client";

import {
  ScrollScene,
  UseCanvas,
  styles,
  useImageAsTexture,
} from "@14islands/r3f-scroll-rig";
import Image from "next/image";
import { useRef } from "react";
import "@14islands/r3f-scroll-rig/css";
// eslint-disable-next-line import/order
import { MeshDistortMaterial } from "@react-three/drei";

const ImageMesh = ({ track, ...props }: any) => {
  const texture = useImageAsTexture(track);
  return (
    <mesh {...props}>
      <planeGeometry />
      <MeshDistortMaterial speed={5} distort={0.2} map={texture} />
    </mesh>
  );
};

export default function WebGLImage({ id, size }: any) {
  const el: any = useRef();

  return (
    <>
      <Image
        ref={el}
        className={`${styles.hidden} WebGLImage`}
        src={`/${id}`}
        alt="test"
        width={size}
        height={size}
        loading="lazy"
      />
      <UseCanvas>
        <ScrollScene track={el}>
          {(props) => <ImageMesh {...props} />}
        </ScrollScene>
      </UseCanvas>
    </>
  );
}
