import { RefObject, useEffect, useState } from "react";

export function useOnScreen(
  ref: RefObject<HTMLDivElement>,
  rootMargin = "0px"
) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    const refCurrent = ref.current;
    if (refCurrent) {
      observer.observe(refCurrent);
    }
    return () => {
      if (refCurrent) {
        observer.unobserve(refCurrent);
      }
    };
  }, [setIntersecting, ref, rootMargin]);
  return isIntersecting;
}
