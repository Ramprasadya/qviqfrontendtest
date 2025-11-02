import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Feature = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const handleBeforeChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
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
    autoplay: false,
    autoplaySpeed: 3000,
    infinite: false,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
    swipeToSlide: true,
    touchMove: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [slidetoshow, setslidetoshow] = useState(3);
  useEffect(() => {
    if (window.innerWidth < 900) {
      setslidetoshow(1);
    } else if (window.innerWidth < 1400) {
      setslidetoshow(2);
    } else {
      setslidetoshow(3);
    }
  }, []);

  const featureData = [
    <div className="flex justify-center">
      <div className="relative w-[320px] sm:w-[413px] sm:h-[370px] h-[340px] lg:h-[388px] bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[24px] sm:px-[40px] pt-[95px] sm:pt-[122px] lg:pt-[142px] rounded-[20px] mt-[96px] sm:mt-[95px] mb-[24px] sm:mb-[48px] flex flex-col items-center justify-start">
        <div className="w-[167px] h-[1px] bg-[#A19D9F]"></div>
        <div className="absolute flex justify-center w-full left-[-10px] top-[-60px] sm:top-[-100px] z-5">
          <img
            className="h-[150px] sm:h-[215px] lg:h-[240px] md:h-[255px]"
            src={require("../assets/cube.png")}
            alt="cube"
          />
        </div>
        <p className="text-left text-[18px] sm:text-[24px] font-[700] leading-[22px] sm:leading-[38px] text-[#0A0003] w-[100%] mt-[32px] sm:mt-[36px]">
          Fully customizable
        </p>
        <p className="text-[14px] sm:text-[16px] font-[400] leading-[22px] sm:leading-[28px] text-[#0A0003] mt-[20px]">
          Customize your quicksite to match your brand's colors & style. Add
          your logo, images, and other custom elements to make your quicksite
          stand out.
        </p>
      </div>
    </div>,
    <div className="flex justify-center">
      <div className="relative  w-[320px] sm:w-[413px] sm:h-[370px] h-[340px] lg:h-[388px] bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[24px] pt-[95px] sm:pt-[122px] lg:pt-[142px] sm:px-[40px] rounded-[20px] mt-[95px] mx-[12px] flex flex-col items-center justify-start">
        <div className="w-[167px] h-[1px] bg-[#A19D9F]"></div>
        <div className="absolute flex justify-center w-full left-0 top-[-60px] sm:top-[-95px]">
          <img
            className="h-[150px] sm:h-[200px] lg:h-[220px] md:h-[250px]"
            src={require("../assets/homechain2.png")}
            alt="cube"
          />
        </div>
        <p className="text-left w-[100%] text-[18px] sm:text-[24px] font-[700] leading-[22px] sm:leading-[38px] text-[#0A0003] mt-[36px]">
          Qviq link store
        </p>
        <p className="text-[14px] sm:text-[16px] font-[400] leading-[22px] sm:leading-[28px] text-[#0A0003] mt-[20px]">
          With QVIQ link store, users can quickly add multiple links to their
          quicksites without the need to individually search and add each link
          themselves.
        </p>
      </div>
    </div>,
    <div className="flex justify-center">
      <div className="relative  w-[320px] sm:w-[413px] sm:h-[370px] h-[340px] lg:h-[388px] bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[40px] pt-[95px] sm:pt-[122px] lg:pt-[142px] rounded-[20px] mt-[95px] mx-[12px] flex flex-col items-center justify-start">
        <div className="w-[167px] h-[1px] bg-[#A19D9F]"></div>
        <div className="absolute flex justify-center w-full left-0 top-[-60px] sm:top-[-80px]">
          <img
            className="h-[160px] sm:h-[200px] lg:h-[220px] md:h-[230px]"
            src={require("../assets/homerocket2.png")}
            alt="cube"
          />
        </div>
        <p className="text-left w-[100%] text-[18px] sm:text-[24px] font-[700] leading-[22px] sm:leading-[38px] text-[#0A0003] mt-[36px]">
          360° Instant sharing
        </p>
        <p className="text-[14px] sm:text-[16px] font-[400] leading-[22px] sm:leading-[28px] text-[#0A0003] mt-[20px]">
          Share your quicksite instantly with anyone, anywhere using QVIQ's NFC
          devices, QR codes, or profile links.
        </p>
      </div>
    </div>,
    <div className="flex justify-center">
      <div className="relative  w-[320px] sm:w-[413px] sm:h-[370px] h-[340px] lg:h-[388px] bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[40px] pt-[95px] sm:pt-[122px] lg:pt-[142px] rounded-[20px] mt-[95px] mx-[12px] flex flex-col items-center justify-start">
        <div className="w-[167px] h-[1px] bg-[#A19D9F]"></div>
        <div className="absolute flex justify-center w-full left-0 top-[-60px] sm:top-[-110px]">
          <img
            className="h-[160px] sm:h-[220px] lg:h-[250px]"
            src={require("../assets/homeshowcase.png")}
            alt="cube"
          />
        </div>
        <p className="text-left w-[100%] text-[18px] sm:text-[24px] font-[700] leading-[22px] sm:leading-[38px] text-[#0A0003] mt-[36px]">
          Showcase your products and services
        </p>
        <p className="text-[14px] sm:text-[16px] font-[400] leading-[22px] sm:leading-[28px] text-[#0A0003] mt-[20px]">
          Use your quicksite to showcase your products and services and promote
          them to your audience.
        </p>
      </div>
    </div>,
    <div className="flex justify-center">
      <div className="relative  w-[320px] sm:w-[413px] sm:h-[370px] h-[340px] lg:h-[388px] bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[40px] pt-[95px] sm:pt-[122px] lg:pt-[142px] rounded-[20px] mt-[95px] mx-[12px] flex flex-col items-center justify-start">
        <div className="w-[167px] h-[1px] bg-[#A19D9F]"></div>
        <div className="absolute flex justify-center w-full left-0 top-[-60px] sm:top-[-120px]">
          <img
            className="h-[160px] sm:h-[220px] lg:h-[262px]"
            src={require("../assets/homepay.png")}
            alt="cube"
          />
        </div>
        <p className="text-left w-[100%] text-[18px] sm:text-[24px] font-[700] leading-[22px] sm:leading-[38px] text-[#0A0003] mt-[36px]">
          Accept payments and donations
        </p>
        <p className="text-[14px] sm:text-[16px] font-[400] leading-[22px] sm:leading-[28px] text-[#0A0003] mt-[20px]">
          Easily add payment & crypto links to your quicksite to accept payments
          & donations from your customers & followers.
        </p>
      </div>
    </div>,
    <div className="flex justify-center">
      <div className="relative  w-[320px] sm:w-[413px] sm:h-[370px] h-[340px] lg:h-[388px] bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[40px] pt-[95px] sm:pt-[122px] lg:pt-[142px] rounded-[20px] mt-[95px] mx-[12px] flex flex-col items-center justify-start">
        <div className="w-[167px] h-[1px] bg-[#A19D9F]"></div>
        <div className="absolute flex justify-center w-full left-0 top-[-60px] sm:top-[-125px]">
          <img
            className="h-[160px] sm:h-[265px]"
            src={require("../assets/homecalender.png")}
            alt="cube"
          />
        </div>
        <p className="text-left w-[100%] text-[18px] sm:text-[24px] font-[700] leading-[22px] sm:leading-[38px] text-[#0A0003] mt-[36px]">
          Schedule appointments
        </p>
        <p className="text-[14px] sm:text-[16px] font-[400] leading-[22px] sm:leading-[28px] text-[#0A0003] mt-[20px]">
          Use your quicksite to schedule appointments with your clients and
          followers.
        </p>
      </div>
    </div>,
  ];
  return (
    <div className="w-full relative">
      <Slider {...settings} ref={sliderRef}>
        {featureData.map((item, index) => (
          <div key={index} className="w-full h-full">
            {item}
          </div>
        ))}
      </Slider>

      {currentSlide !== 0 && (
        <div
          className="absolute mt-10 w-[48px] sm:w-[64px] h-[48px] sm:h-[64px] rounded-full -left-3 xsm:left-0 lg:left-8 top-1/2 -translate-y-1/2 z-30 bg-white flex justify-center items-center hover:cursor-pointer active:scale-95 duration-150"
          style={{ boxShadow: "0px 10px 20px 0px rgba(0, 0, 0, 0.12)" }}
          onClick={previousSlide}
        >
          <HiChevronLeft />
        </div>
      )}

      {currentSlide !== totalSlides - slidetoshow && (
        <div
          className="absolute mt-10 w-[48px] sm:w-[64px] h-[48px] sm:h-[64px] rounded-full -right-3 xsm:right-0 lg:right-8 top-1/2 -translate-y-1/2 z-30 bg-white flex justify-center items-center hover:cursor-pointer active:scale-95 duration-150"
          style={{ boxShadow: "0px 10px 20px 0px rgba(0, 0, 0, 0.12)" }}
          onClick={nextSlide}
        >
          <HiChevronRight />
        </div>
      )}
    </div>
  );
};

export default Feature;
