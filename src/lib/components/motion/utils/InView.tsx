// import { useEffect, useRef, useState } from "react";

// export default function InView() {
//   const elementRef: any = useRef();
//   const [isVisible, setIsVisible] = useState(false);

//   const isElementPartiallyVisibleInContainer = (
//     ele: { offsetTop: number; offsetHeight: any },
//     container: any
//   ) => {
//     const scrollTop = container.scrollTop;
//     const containerHeight = container.offsetHeight;
//     const eleTop = ele.offsetTop - container.offsetTop;
//     const eleHeight = ele.offsetHeight;

//     return (
//       eleTop + eleHeight > scrollTop && eleTop < scrollTop + containerHeight
//     );
//   };

//   const handleScroll = () => {
//     const rootEle = document.querySelector(".playground__root");
//     const ele = elementRef.current;
//     if (!rootEle || !ele) {
//       return;
//     }
//     setIsVisible(isElementPartiallyVisibleInContainer(ele, rootEle));
//   };

//   useEffect(() => {
//     const rootEle = document.querySelector(".playground__root");
//     if (!rootEle) {
//       return;
//     }
//     rootEle.addEventListener("scroll", handleScroll);
//     return () => {
//       rootEle.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div className="element" ref={elementRef}>
//       Element
//     </div>
//   );
// }
