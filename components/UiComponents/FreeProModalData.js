import React, { useRef, useState, useEffect } from "react";
import PrimaryButton2 from "./PrimaryButton2";
import Carousel from "./Carousel";
import Image from "next/image";
import Image1 from "./modalImages/image1.png";
import Image2 from "./modalImages/image2.png";
import Image3 from "./modalImages/image3.png";
import Image4 from "./modalImages/image4.png";
import Image5 from "./modalImages/image5.png";
import Emoji from "./modalImages/Emoji.jpg";
import Slider from "react-slick";
import "./modalImages/modal.css";
import {
  isIOS,
  isAndroid,
  isDesktop,
  isChrome,
  isFirefox,
  isSafari,
} from "react-device-detect";

const FreeProModalData = ({ handleFreePro, firstName }) => {
  const sliderRef = useRef(null);

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  const [shadowStyle, setShadowStyle] = useState({
    filter: "drop-shadow(5px 5px 25px rgba(0, 0, 0, 0.20))",
    boxShadow: "0 0 10px #000000",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        // Screen width is 640px or less (small devices)
        setShadowStyle({
          filter: "drop-shadow(3px 3px 11px rgba(0, 0, 0, 0.10))",
        });
      } else {
        // Screen width is greater than 640px (large devices)
        setShadowStyle({
          filter: "drop-shadow(4px 4px 15px rgba(0, 0, 0, 0.15))",
        });
      }
    };

    window.addEventListener("resize", handleResize);

    // Run once on mount
    handleResize();

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul>
          <li class="one" onClick={previousSlide}>
            <button>1</button>
          </li>
          <li class="slick-active">
            <button>2</button>
          </li>
          <li class="two" onClick={nextSlide}>
            <button>3</button>
          </li>
        </ul>
      </div>
    ),
    dotsClass: "slick-dots",
  };

  const innerContent = [
    {
      header: "Create Up To 3 Qviqsites",
      content:
        "Showcase your brand, portfolio, or services with multiple customizable sites.",
      image: Image1,
    },
    {
      header: "Advanced Customization & Templates",
      content:
        "Access All Design Templates And Personalize Your Qviqsite To Stand Out.",
      image: Image2,
    },
    {
      header: "Complete Qviq Link store Access",
      content:
        "Unlock 80+Links, From Business, Payments, To Even Crypto Links. Add Whatever You Like.",
      image: Image3,
    },
    {
      header: "Track performance with detailed analytics",
      content: "See Who's Engaging With Your Content And Track Your Growth.",
      image: Image4,
    },
    {
      header: "Unlimited Products/Services",
      content:
        "List As Many Offerings As You Want With Clear, Actionable CTA Buttons.",
      image: Image5,
    },
  ];

  const [modalElement, setModalElement] = useState([]);

  useEffect(() => {
    setModalElement(
      innerContent.map(({ header, content, image }, index) => (
        <div key={index} className="!flex !justify-center min-w-full sm:px-[0px] p-[10px] ">
          <div
          className="max-w-[418px] min-h-[302px] w-full flex flex-col items-center gap-[5px] mt-[10px] mb-[15px] bg-[#FFF] rounded-[20px] p-[28px]"
          style={{ boxShadow: "1px 3px 10px #0000001F" }}
          >
            <h1 className="w-full sm:text-[16px] text-[14px] font-[600] text-[#0A0003]">
              {header}
            </h1>
            <p className="w-full sm:text-[13px] text-[11px] font-[400] mb-[14px]">
              {content}
            </p>
            <Image
              height={300}
              width={400}
              src={image}
              className="w-auto h-full max-h-[170px] object-contain"
              alt="image"
            />
          </div>
        </div>
      ))
    );
  }, []);

  return (
    <div
      // className={`max-h-[80vh] h-fit overflow-y-scroll sm:px-[40px] px-[10px] ${
      //   isIOS ? "pb-[100px]" : "pb-[70px]"
      // }`}
      className={`sm:px-[40px] px-[10px] sm:pb-[40px] pb-[10px] md:!max-h-[90vh] `}
    >
      <div className=" text-center  sm:w-auto">
        <h2 className="font-semibold text-[20px] flex flex-col  xsm2:flex-row justify-center xsm:text-[25px] sm:text-[30px]   xsm2:leading-10 sm:leading-[52px]  md:text-[35px]">
          <div className="flex justify-center mr-[25px] xsm2:mr-0 ">
            <Image
              src={Emoji}
              alt="Emoji"
              className="object-contain h-[30px] w-[30px] xsm3:h-[40px] xsm3:w-[40px] sm:w-[50px] sm:h-[50px]"
            />
            <span className=" xsm4:mr-0 flex  "> Congrats,</span>
          </div>
          <div className="flex justify-center ml-[1px] xsm2:ml-0">
            <span className="flex">&nbsp;{firstName}!</span>
            <Image
              src={Emoji}
              alt="Emoji"
              className="object-contain h-[30px] w-[30px] xsm3:h-[40px] xsm3:w-[40px] sm:w-[50px] sm:h-[50px]"
            />
          </div>{" "}
        </h2>
        <p className=" flex flex-col justify-center xsm4:flex-row  text-[18px] xsm:text-[18px] sm:text-[23px] md:text-[28px] font-[500] leading-[30px] sm:leading-[45px] ">
          <span>You’ve Unlocked</span>
          <span className="text-[#FD4D26]">&nbsp;1 month FREE Pro!</span>
        </p>
      </div>
      <div className="text-center">
        <p className=" text-[14px] xsm:text-[14px] font-[500] leading-[24px] text-center  ">
          For the next 30 days, you have full access to everything Qviq Pro
          offers. Here’s what you can explore:
        </p>
      </div>
      <div className="sm:mt-[35px] mt-[25px] sm:mb-[22px] mb-[8px]">
        <p className="font-[400] text-[12px]">Top Features To Get Started:</p>
      </div>
      {/* carousel Data  */}

      {/* check */}

      <Slider ref={sliderRef} {...settings}>
        {modalElement}
      </Slider>

      <div>
        <div className=" mt-10  mb-0 md:pb-8 justify-center flex ">
          <PrimaryButton2
            text="Let's go"
            width="417px"
            onClick={handleFreePro}
          />
        </div>
      </div>
    </div>
  );
};

export default FreeProModalData;
