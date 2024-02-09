// import { useRef, Suspense, useState, useEffect } from 'react'
// import { GlobalCanvas, ScrollScene, UseCanvas, SmoothScrollbar, useImageAsTexture, styles, useScrollRig } from '@14islands/r3f-scroll-rig'
// import { Box, MeshDistortMaterial } from '@react-three/drei'
// import { useFrame } from '@react-three/fiber'
// import '@14islands/r3f-scroll-rig/css'

// function LoadingIndicator({ scale }: any) {
//     const box: any = useRef()
//     useFrame((_, delta) => {
//       box.current.rotation.x = box.current.rotation.y += delta * Math.PI
//     })
//     return (
//       <Box ref={box} scale={scale.xy.min() * 0.25}>
//         <meshNormalMaterial />
//       </Box>
//     )
//   }

//   function WebGLImage({ imgRef, ...props }: any) {
//     // Load texture from the <img/> and suspend until its ready
//     const texture = useImageAsTexture(imgRef)
//     return (
//       <mesh {...props}>
//         <planeGeometry args={[1, 1, 16, 16]} />
//         <MeshDistortMaterial transparent map={texture} radius={0.99} distort={0.2} speed={3} />
//       </mesh>
//     )
//   }

//   export function ImageComponent() {
//     const el: any = useRef()
//     const img: any = useRef()
//     const { hasSmoothScrollbar } = useScrollRig()
//     return (
//       <>
//          <div ref={el} style={{ aspectRatio: '16/10', width: '50%'}}>
//         <picture>
//           <source media="(min-width: 1200px)" srcSet="https://source.unsplash.com/random/1920x1080?abstract" />
//           <source media="(min-width: 800px)" srcSet="https://source.unsplash.com/random/1280x720?abstract" />
//           <img
//             ref={img}
//             src="https://source.unsplash.com/random/800x600?abstract"

//             // src="https://storage.googleapis.com/www.payamd.com/Portfolio/anim/me-home-removebg-dotted-color.png"
//             alt="A description."
//             loading="lazy"
//             decoding="async"
//             className={styles.hiddenWhenSmooth}
//           />
//         </picture>
//       </div>
//       {hasSmoothScrollbar && (
//         <UseCanvas>
//           <ScrollScene track={el} debug={false}>
//             {(props) => (
//               <Suspense fallback={<LoadingIndicator {...props} />}>
//                 <WebGLImage imgRef={img} {...props} />
//               </Suspense>
//             )}
//           </ScrollScene>
//         </UseCanvas>
//       )}
//       </>
//     )
//   }

// export default function ImageEffect() {
//     const [enabled, setEnabled] = useState(true)
//     const [isTouch, setTouch] = useState(false)
//     useEffect(() => {
//       const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
//       setTouch(isTouch)
//     }, [])
//     return (
//       <>
//         {/* <GlobalCanvas style={{ pointerEvents: 'none' }}>
//           <ambientLight />
//         </GlobalCanvas>
//         <SmoothScrollbar enabled={enabled}>
//           {(bind) => (
//             <article {...bind}>
//               <header>
//                 @14islands/r3f-scroll-rig
//                 <button onClick={() => setEnabled(!enabled)}>{enabled ? 'Disable WebGL' : 'Enable WebGL'}</button>
//               </header> */}

//               {/* <section>
//                 <ImageComponent />
//               </section> */}

//             {/* </article>
//           )}
//         </SmoothScrollbar> */}
//       </>
//     )
//   }
