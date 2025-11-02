import React, { useEffect, useState } from "react";
import * as hi from "react-icons/hi";

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
const LeftRightScrollBtn = (props) => {
  props = useDefaultProps(props);
  const refrence = props.refrence;
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (refrence && refrence.current) {
      const newScrollLeft = Math.ceil(refrence.current.scrollLeft);
      setScrollLeft(newScrollLeft);
      const hasHiddenItems =
        refrence.current.scrollWidth > refrence.current.clientWidth;
      const atScrollEnd =
        Math.ceil(refrence.current.scrollLeft) >=
        refrence.current.scrollWidth - refrence.current.clientWidth;
      setShowRight(hasHiddenItems && !atScrollEnd);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (refrence && refrence.current) {
        refrence.current.addEventListener("scroll", handleScroll);
        const hasHiddenItems =
          refrence.current.scrollWidth > refrence.current.clientWidth;
        const atScrollEnd =
          Math.ceil(refrence.current.scrollLeft) >=
          refrence.current.scrollWidth - refrence.current.clientWidth;
        setShowRight(hasHiddenItems && !atScrollEnd);
      }
    }, 100);
  }, []);

  const handleScrollLeft = () => {
    if (scrollLeft >= 0) {
      setScrollLeft(scrollLeft - props.scrollLength);
      refrence.current.scrollTo({
        left: scrollLeft - props.scrollLength,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (
      scrollLeft <=
      refrence.current.scrollWidth - refrence.current.clientWidth
    ) {
      setScrollLeft(scrollLeft + props.scrollLength);
      refrence.current.scrollTo({
        left: scrollLeft + props.scrollLength,
        behavior: "smooth",
      });
      const hasHiddenItems =
        refrence.current.scrollWidth > refrence.current.clientWidth;
      const atScrollEnd =
        Math.ceil(refrence.current.scrollLeft) >=
        refrence.current.scrollWidth - refrence.current.clientWidth;
      setShowRight(hasHiddenItems && !atScrollEnd);
    }
  };
  return (
    <>
      {scrollLeft > 0 && (
        <button
          className={`${props.classStyle}`}
          style={{ ...props.style, ...props.leftPosition }}
          onClick={handleScrollLeft}
        >
          <hi.HiChevronLeft />
        </button>
      )}
      {showRight && (
        <button
          className={`${props.classStyle}`}
          style={{ ...props.style, ...props.rightPosition }}
          onClick={handleScrollRight}
        >
          <hi.HiChevronRight />
        </button>
      )}
    </>
  );
};

const defaultProps = {
  scrollLength: 200,
  classStyle:
    "absolute flex justify-center items-center p-1 rounded-full bg-white text-xl shadow-[0_2px_8px_0_rgba(171,181,217,0.14)]",
  style: {},
  leftPosition: {
    left: "4px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  rightPosition: {
    right: "4px",
    top: "50%",
    transform: "translateY(-50%)",
  },
};

export default LeftRightScrollBtn;
