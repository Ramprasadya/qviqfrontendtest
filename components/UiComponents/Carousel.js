import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
const Carousel = (props) => {
  props = useDefaultProps(props);
  const data = props.data;
  const sliderRef = useRef(null);

  useEffect(() => {
    sliderRef.current.slickGoTo(props.slideToIndex);
  }, [props.slideToIndex]);

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };
  

  var settings = {
    dots: false,
    infinite: props.infinite,
    speed: 800,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    autoplay: props.autoplay,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: "linear",
  };

  return (
    <>
      <div className={`${props.width} ${props.height} relative`}>
        <Slider {...settings} ref={sliderRef}>
          {data.map((item, index) => (
            <div key={index} className="w-full h-full">
              {item}
              {/* {console.log(item)} */}
            </div>
          ))}
        </Slider>

        <div
          className={`absolute w-8 sm:w-12 h-8 sm:h-12 rounded-full ${props.leftPosition}  -translate-y-1/2 z-30 bg-white flex justify-center items-center hover:cursor-pointer active:scale-95 duration-75`}
          style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",top:props.top }}
          onClick={previousSlide}
        >
          <HiChevronLeft />
        </div>

        <div
          className={`absolute w-8 sm:w-12 h-8 sm:h-12 rounded-full ${props.rightPosition}  -translate-y-1/2 z-30 bg-white flex justify-center items-center hover:cursor-pointer active:scale-95 duration-75`}
          style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",top:props.top }}
          onClick={nextSlide}
        >
          <HiChevronRight />
        </div>
      </div>
    </>
  );
};

const defaultProps = {
  autoplay: false,
  width: "w-full",
  height: "h-full",
  infinite: false,
  leftPosition: "left-2 lg:left-8",
  rightPosition: "right-2 lg:right-8",
  dots: true,
  top: "50%"
};

export default Carousel;
