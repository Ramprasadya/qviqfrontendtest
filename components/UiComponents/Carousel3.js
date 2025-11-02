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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  useEffect(() => {
    if (props.slideToIndex !== undefined) {
      goToSlide(props.slideToIndex);
    }
  }, [props.slideToIndex]);

  const handleBeforeChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
    if (props.sendDataToParent !== undefined) {
      props.sendDataToParent(newIndex);
    }
  };

  const handleAfterChange = (current) => {
    setCurrentSlide(current);
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };
  useEffect(() => {
    if (sliderRef.current) {
      setTotalSlides(sliderRef.current.props.children.length);
    }
  }, []);

  var settings = {
    speed: 1000,
    autoplay: props.autoplay,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    infinite: props.infinite,
    dots: props.dots,
    slidesToShow: 6,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
    swipeToSlide: true,
    touchMove: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2048,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderStyles = {
    transition: "transform 5s ease",
  };

  return (
    <div className={`${props.width} ${props.height} relative`}>
      <Slider {...settings} ref={sliderRef} style={sliderStyles}>
        {data.map((item, index) => (
          <div
            key={index}
            className="w-fit h-fit flex flex-col justify-center items-center"
          >
            {item}
          </div>
        ))}
      </Slider>
    </div>
  );
};

const defaultProps = {
  width: "w-full",
  height: "h-full",
  infinite: false,
  leftPosition: "left-2 lg:left-8",
  rightPosition: "right-2 lg:right-8",
  dots: true,
};

export default Carousel;
