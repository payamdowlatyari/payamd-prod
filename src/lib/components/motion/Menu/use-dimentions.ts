import { useEffect, useRef } from "react";

/**
 * Hook to get the dimensions of an element
 * @param {any} ref - The ref of the element
 * @returns {object} - The dimensions of the element
 */
export const useDimensions = (ref: any): object => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, [ref]);

  return dimensions.current;
};
