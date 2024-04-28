// "use client";

// import Image from "next/image";
// import React from "react";
// import { CardBody, CardContainer, CardItem } from "./3d-card";
// import Link from "next/link";

// export function ThreeDCard({ item }: any) {
//   return (
//     <CardContainer className="inter-var">
//       <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
//         <CardItem
//           as="p"
//           translateZ="60"
//           className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
//         >
//           {item.description}
//         </CardItem>
//         <CardItem translateZ="100" className="w-full mt-4">
//           <div className="portfolio-img-wrapper">
//             <Image
//               src={item.img}
//               alt={item.title}
//               height="1000"
//               width="1000"
//               className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
//             />
//           </div>
//         </CardItem>
//         <div className="flex justify-between items-center mt-20">
//           <CardItem
//             translateZ={20}
//             as={Link}
//             href={item.url}
//             target="__blank"
//             className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
//           >
//             {item.title} →
//           </CardItem>
//         </div>
//       </CardBody>
//     </CardContainer>
//   );
// }

// export default function Card({ item }: any) {
//     return (
//       <figure className="portfolio-card">
//         <div className="portfolio-img-wrapper">
//           <img src={item.img} alt={item.title} />
//         </div>
//         <div className="portfolio-content">
//           <div>
//             <HoverLink url={item.url} title={item.title} out size="1.25em" />
//             <p>{item.description}</p>
//           </div>
//           {getTags(item.tagIcon)}
//         </div>
//       </figure>
//     );
//   }
