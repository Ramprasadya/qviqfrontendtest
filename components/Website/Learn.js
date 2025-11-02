'use client'
import React, { useContext } from "react";
import Navbar from "./header/Navbar";
// import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Carousel from "../UiComponents/Carousel";
import { useEffect } from "react";
import { HiCheck } from "react-icons/hi";
import Footer from "./Footer";
import PrimaryButton3 from "../UiComponents/PrimaryButton3";
import Modal from "../ModalComponent/Modal";
import video1 from "./assets/Video thumbnail1.png";
import video2 from "./assets/Video thumbnail2.png";
import video3 from "./assets/Video thumbnail3.png";
import LeftRightScrollBtn from "../Utils/LeftRightScrollBtn";
import { useRef } from "react";
import { UserContext } from "../Contexts/context";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Learn = () => {

  const router =  useRouter();
  const navigate =(pathname)=>{
    router.push(pathname);
  }


  const list = ["All", "Profile creation", "Custom Domain", "Qviq smart card"];
  const [learn, setLearn] = useState("All");
  const list2 = ["Android mobile", "ios-iphone", "Using QR code"];
  const [cardActive, setCardActive] = useState("Android mobile");
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhone, setSelectedPhone] = useState(null);
  const learnRef = useRef(null);
  const { username } = useContext(UserContext);
  // const navigate = useNavigate();
  const items = [
    // Apple(iPhone)

    {
      title: "Apple(iPhone)",
      phone: [
        "iPhone 12 mini",
        "iPhone 12",
        "iPhone 12 Pro",
        "iPhone 12 Pro Max",
        " iPhone 11 Pro Max",
        " iPhone 11 Pro",
        "  iPhone 11",
        "iPhone XS Max",
        "iPhone XS",
        "iPhone XR",
        " iPhone 6",
        "iPhone 6 Plus",
      ],
    },

    // ASUS

    {
      title: "ASUS",
      phone: [
        " Asus ROG Phone",
        "Asus 6Z.",
        "Asus ROG Phone",
        " Asus ZenFone Max M2.",
        "Asus ZenFone Max Pro M2.",
        "Asus ZenFone Lite L1",
        "Asus ZenFone Max M1",
        "Asus ZenFone Max Pro M1",
        "Asus MeMO Pad 8",
        "Asus ZenFone 2",
      ],
    },

    // Google

    {
      title: "Google",
      phone: [
        "Pixel 4",
        "    Pixel 4 XL",
        "Pixel 3",
        " Pixel 3 XL",
        " Pixel 3a",
        " Pixel 3a XL",
        "Pixel 2",
        "Pixel 2XL",
        "Pixel",
        "Pixel XL",
        "Nexus 5X",
        " Nexus 6P",
        "Nexus 6",
        " Nexus 10",
        "Nexus 5",
        "Nexus 7",
        "Nexus 9",
      ],
    },

    // Huawei

    {
      title: "Huawei",
      phone: [
        "P30, P30 Pro, P30 Lite",
        "P20, P20 Pro, P20 Lite",
        " P10, P10 Plus, P10 Lite",
        "Ascend G300, Ascend G510",
        "Ascend G6, Ascend G6 4G",
        " Ascend G600, Ascend G620s, Ascend G620S-L02, Ascend G630",
        "Ascend G7, Ascend G740, Ascend GX1",
        "Ascend Mate, Ascend Mate 7",
        "Ascend P2, Ascend P7, Ascend P7 mini",
        "Ascend P7 Sapphire Edition",
        " Ascend P8 lite",
        "Ascend W1",
        "Ascend Y 200",
        "Ascend Y201",
        "Ascend Y635",
        " C199S, G520, G620S",
        "Honor 4 Play, Honor 6",
        "Mulan",
        "P8, P8 Lite, P8 Maxe",
        "Sonic, Sonic/Turkcell T20",
        "TalkBand B1",
        " U8651T",
      ],
    },
    // HTC

    {
      title: "HTC",
      phone: [
        "19e, U12+, U12 Life",
        "Desire 12, Desire 12s (2017 model not compatible)",
        "U11, Life, +",
        " Exodus 1",
        "8XT",
        "Amaze 4G",
        " Butterfly",
        "Butterfly 2",
        " Butterfly S",
        "Desire 501",
        "Desire 600",
        "Desire 608t",
        " Desire 6101",
        "Desire 816",
        " Desire C",
        "Desire Eye",
        " E1",
        " Evo 4G LTE",
        "First",
        "J Butterfly",
        "One E8",
        "One E9+",
        "One M7",
        "One M8",
        "One M8 for Windows, One M8s, One M8si",
        "One M9, One M9+",
        " One Max",
        "One ME",
        "One Mini 2",
        "One remix",
        "One SV",
        "One VX, One X, One X+, One XL",
        " Windows Phone 8X+",
      ],
    },

    // LG
    {
      title: "LG",
      phone: [
        "Q9",
        "One",
        " G8, G8s ThinQ",
        "G7, G7 ThinQ",
        " V50, V40",
        "AKA",
        "Escape 2",
        " F60",
        "F70",
        "G Flex",
        "G Flex 2",
        "G Pro 2",
        "G Pro Lite",
        "G Stylo",
        "G Vista",
        "G2, G3, G3 DUAL LTE, G3 Beat",
        "G3 S",
        "G4, G4 Dual LTE, G4 Beat, G4 Stylus, G4 C",
        "Intuition",
        "Leon 4G LTE",
        "L Fino",
        "L65",
        "L70",
        "L90",
        "Lucid 3",
        " Nexus 4",
        "Nexus 5",
        "  Optimus F3",
        "  Optimus G",
        "Optimus G Pro",
        "Optimus L9 II",
        "Optimus LTE Tag",
        "Prada 3.0",
        "Spectrum 2",
        "Spirit 4G LTE",
        "T530 Ego",
        "Viper 4G LTE",
        "Volt",
      ],
    },

    // OnePlus
    {
      title: "OnePlus",
      phone: [
        "NORD",
        "8, 8-PRO",
        "7, 7 Pro, 7 Pro 5G",
        " 6, 6T",
        " 5, 5T",
        "3, 3T",
        "One",
      ],
    },

    // OPPO

    {
      title: "OPPO",
      phone: [
        "Reno3 Pro",
        "F17 Pro",
        "A53 2020",
        " A15",
        " A52",
        "F17",
        "A15s",
        " F15",
        " Reno 4 Pro",
        " A5 2020",
        "3000",
        " Find 5",
        "Find 7",
        "Find 7a",
        "N1",
        "  N3",
        "R1C",
        " R1L",
        "R1S",
        "U3",
      ],
    },

    // Samsung Galaxy S

    {
      title: "Samsung Galaxy S",
      phone: [
        "Galaxy S20, S20+, S20 Ultra",
        "Galaxy S10, S10+, S10e",
        " Galaxy S9, S9+",
        " Galaxy S8, S8+",
        "Galaxy S7, S7 Edge",
        " Galaxy S6, S6 Edge",
        "Galaxy S5, S5 Mini, S5 Neo",
        " Galaxy S4 zoom",
        "Galaxy S4, Galaxy S4 Active, Galaxy S4 Mini, Galaxy S4 zoom",
        "Galaxy S3, Galaxy S3 Mini, Galaxy S3 Prepaid",
      ],
    },

    // Samsung Galaxy Note

    {
      title: " Samsung Galaxy Note",
      phone: [
        "Note 10, Note 10+, Note 10+ 5G",
        "Note 9",
        " Note 8",
        "Galaxy Note 3",
        " Galaxy Note 4",
        " Galaxy Note Edge",
        " Galaxy Note 2",
      ],
    },

    //  Samsung Galaxy A

    {
      title: "Samsung Galaxy A",
      phone: [
        "2019 models: A20e, A40, A50, A70",
        "2018 models: A6, A7, A8, A9",
        "2017 models: A3, A5",
        "Galaxy Ace 3",
        "Galaxy Ace 4",
        "Galaxy Alpha",
        "Galaxy Avant",
      ],
    },

    // Samsung Galaxy J
    { title: "Samsung Galaxy J", phone: ["2018 models: J4+, J6, J5, J3"] },

    // VIVO

    {
      title: "VIVO",
      phone: [
        "Y 51 2020",
        "V 20",
        "V 20 PRO",
        "Y 20",
        "V 20 SE",
        "Y 50",
        "U 20",
        "V 17",
        "S 1 PRO",
        "Z1X",
      ],
    },

    // Xiaomi Redmi

    {
      title: "Xiaomi Redmi",
      phone: [
        "9 Power",
        "9 Prime",
        "Note 9 Pro",
        "Note 9",
        "Note 9 Pro Max",
        "Redmi 9",
        "8A Dual",
        "Mi 10T Pro",
        "Mi 10",
        "Redmi 9A",
        "Mi 2A",
        "Mi 3, Mi 3S",
        "Mi 4",
        "Mi 5, Mi 5 Plus",
        "Mi Note",
        "Mi Note Pro",
        "Mi3",
        "Xiaomi 2A",
        "Xiaomi 3 TD-SDCMA",
        "Xiaomi 3 WCDMA/CDMA2000",
      ],
    },
  ];

  const leftPosition = {
    left: "-12px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const rightPosition = {
    right: "-3px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  // const filteredResults = items.filter((item) =>
  //   item.includes(searchQuery.toLowerCase())
  // );

  const filteredItems = items.filter((result) => {
    return (
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.phone.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  const handleSearch = () => {
    const phoneFound = items.find((result) =>
      result.phone.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setSelectedPhone(phoneFound);
  };

  function toggleModal() {
    setModal((prev) => !prev);
  }

  //   Manage the slides
  const [slidesToShow, setSlidesToShow] = useState(3); // Default number of slides

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1200) {
        setSlidesToShow(3);
      } else if (screenWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    // Remove the listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const data = [
    {
      type: "Profile creation",
      value: "https://www.youtube.com/embed/V_aByK3p9QE?si=rw2qU9qwl9Y8Aaqp",
      text: " How to create a quick site in 5 simple steps?",
    },
    {
      type: "Custom Domain",
      value: "https://youtu.be/TuUVVKVdZm4?si=xHOfzrcG8HTbYy_6",
      text: " How to create",
    },
    {
      type: "Qviq smart card",
      value: "https://youtu.be/ImnYPjOd1Tw?si=o5fL5gMKGgPNeHw8",
      text: "Qviq smart card ",
    },
    {
      type: "Qviq smart card",
      value: "https://youtu.be/eMA6GHTQ4WA?si=e9dRaCpL1oiGNEGN",
      text: "Qviq smart card ",
    },
    {
      type: "Qviq smart card",
      value: "https://youtu.be/zXLgYBSdv74?si=yOv9QnlYFlHOM9m_",
      text: "Qviq smart card ",
    },
  ];

  // Filtering the data according to selected list

  const filteredData =
    learn === "All" ? data : data.filter((item) => item.type === learn);

  return (
    <div className="Plus-Jakarta-Sans-font-div">
      <Navbar background="#FFFF" thisPage="learn" />
      <div className=" mt-0 md:mt-[100px]">
        <div className=" mx-[20px] sm:mx-[40px] md::mx-[80px] mt-[20px]">
          {/* Hero section */}
          <div className="bg-[#736CED] rounded-[32px] w-full flex flex-col justify-center ">
            <div className="flex  flex-col sm:flex-row justify-between relative ">
              <div className="flex flex-col md:gap-[52px] m-[20px] sm:gap-[24px] sm:w-[350px] md:w-[340px] md2:w-[440px] lg:w-[740px] xl:ml-[92px] xl:my-[80px] md:my-[30px] md:ml-[52px] sm:ml-[50px] sm:my-[15px] ">
                <div>
                  <h1 className="text-[#FFF] 2xl:text-[52px] lg:text-[40px] md:text-[27px] sm:text-[24px] font-[800] md:leading-[52px] lg:leading-[72.8px] text-[24px] leading-[31px] ">
                    Create your Qviq-site
                  </h1>
                  <p className="text-[#FFF] 2xl:text-[22px] lg:text-[16px] mt-4 sm:mt-0 md:text-[14px] sm:text-[12px] leading-[36px] font-[500] ">
                    Explore comprehensive video tutorials to master the process
                    of quick-site creation and launching, and discover how to
                    seamlessly integrate your site with Qviq smart card
                  </p>
                </div>
                {username == "" && 
                <button
                  className="font-[700] top-[23rem] xsm:top-[19rem] xsm2:top-[16rem] sm:top-0  absolute sm:relative rounded-[100px] py-[10] bg-[#FFF] px-[24px] md:w-[233px] md:h-[56px] h-[48px] w-[200px] sm:w-[150px] sm:h-[36px]    "
                  onClick={() => navigate("/signup")}
                >
                  <span className="text-black sm:text-[10px] md:text-[16px]">
                    Start Your Free Trial
                  </span>
                </button>
                 }
                
              </div>
              <div>
                <Image
                  className="2xl:w-[499px] float-right sm:mt-[14rem] md:mt-[8.5rem] 2xl:h-[477px] xl:w-[399px] xl:h-[377px] lg:w-[340px] lg:h-[320px] md:w-[300px] md:h-[250px] w-[250px] h-[200px]  lg:mt-[56px] "
                  src={require("./assets/Design elements.png")}
                  alt="design"
                />
              </div>
            </div>
          </div>
          {/* Learn qviq way */}
         {/* <div className="mt-20 flex flex-col ">
            <h1 className="text-[#0A0003] text-[48px] font-[800] leading-[64.3px] ">
              Learn the Qviq way
            </h1>
            <div className=" mt-[56px] ">
              <div className="overflow-scroll">
                <div className="gap-5 flex w-[700px]">
                  {list.map((item, index) => {
                    const isActive = learn.includes(item); 
                    return (
                      <button
                        key={index}
                        onClick={() => setLearn(item)}
                        className={` ${
                          isActive
                            ? "text-[#FFF] bg-[#0A0003] "
                            : "text-black bg-[#FFF] border-[1px] border-black "
                        } py-[13px] px-[24px] rounded-[100px] text-[#0A0003] text-[16px] font-[600] `}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="relative">
                <div className=" w-full overflow-scroll " ref={learnRef}>
                  <div className=" w-fit flex gap-6 ">
                    {filteredData.map((item, index) => {
                      return (
                        <div className="flex justify-center pt-[16px] ">
                          <div className="relative w-[290px] md:w-[410px] sm:w-[413px] h-auto  bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[40px] pt-[95px] sm:pt-[122px] lg:pt-[142px] rounded-[20px] mt-[95px] mx-[12px] flex flex-col items-center justify-start">
                            <div className="absolute flex justify-center h-[172px] w-[256px] sm:w-[378px] sm:h-[215px] lg:h-[252px] left-0 top-[-60px] sm:top-[-80px] mx-[20px] ">
                             
                              <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${
                                  item.value.split("/")[
                                    item.value.split("/").length - 1
                                  ]
                                }`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                                className="rounded-xl"
                              />
                            
                            </div>
                            <p className="text-left w-[100%] text-[20px] sm:text-[24px] font-[600] leading-[32px] sm:leading-[38px] text-[#0A0003] my-[34px]  ">
                              {item.text}
                            </p>
                          </div>
                          <LeftRightScrollBtn
                            refrence={learnRef}
                            style={{
                              border: "1px solid black",
                              fontSize: "26px",
                              color: "black",
                            }}
                            leftPosition={leftPosition}
                            rightPosition={rightPosition}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>  */}

          {/* Active Smart Card  */}

          <div className="flex flex-col gap-14 mt-20 ">
            <div className="text-[#0A0003]xl:text-[48px] sm:text-[32px] font-[800]">
              How to activate Qviq smart card?
            </div>
            <div className="overflow-scroll">
              <div className="flex flex-row gap-5 w-[600px] ">
                {list2.map((item, index) => {
                  const isActive = cardActive.includes(item);
                  return (
                    <button
                      key={index}
                      onClick={() => setCardActive(item)}
                      className={` ${
                        isActive
                          ? "text-[#FFF] bg-[#0A0003] "
                          : " bg-[#FFF] text-[#0A0003] border-[1px] border-black  "
                      }  text-[16px] font-[600] text-center flex-wrap flex flex-row justify-center content-center  rounded-[100px] h-12 px-[24px] py-[15px]`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {cardActive === "Android mobile" && (
              <div className="flex flex-col md:flex-row gap-[10px] justify-between relative rounded-[32px] border border-solid  ">
                <div className="flex flex-col gap-[40px] w-[235px] xsm:w-[290px] xsm2:w-[390px] sm:w-auto mb-4  ">
                  <div className="lg:text-[24px] sm:text-[18px] font-[700] mt-[50px] ml-[20px] sm:ml-[50px]  ">
                    Steps to activate Qviq smart card on Android device:
                  </div>
                  <div className="relative">
                    <div className=" w-[1px] h-[360px] left-[3.8rem] top-12 xsm:h-[268px] xsm2:h-[200px] sm:h-[225px] md:h-[200px] lg:h-[260px] border border-dashed border-[#E40849] absolute xsm:top-[2rem] sm:top-[2rem] md:top-[3rem] xl:top-[2rem] sm:left-16 xsm:left-[3.8rem] " />
                  </div>
                  <div className="flex flex-col lg:text-[16px] sm:text-[12px] lg:gap-[48px] sm:gap-[28px] -mt-[20px]  ml-[50px]">
                    <div className="flex flex-row gap-[20px] items-center">
                      <div className=" w-[32px] z-10 ">
                        <div className="bg-[#E40849] text-[#FFFFFF] rounded-[24px] h-[24px] sm:h-[32px] w-[24px] sm:w-[32px] flex justify-center items-center ">
                          1
                        </div>
                      </div>
                      <div className="text-[16px] font-[600]">
                        Enable NFC from the notification bar/settings
                      </div>
                    </div>
                    <div className="flex flex-row gap-[20px] items-center">
                      <div className=" w-[32px] z-10 ">
                        <div className="bg-[#E40849] text-[#FFFFFF] rounded-[24px] h-[24px] sm:h-[32px] w-[24px] sm:w-[32px] flex justify-center items-center">
                          2
                        </div>
                      </div>
                      <div className="text-[16px] font-[600]">
                        Tap your Qviq card on the back middle or upper back side
                        of your smartphone
                      </div>
                    </div>
                    <div className="flex flex-row gap-[20px] items-center">
                      <div className=" w-[32px] z-10 ">
                        <div className="bg-[#E40849] text-[#FFFFFF] rounded-[24px] h-[24px] sm:h-[32px] w-[24px] sm:w-[32px] flex justify-center items-center">
                          3
                        </div>
                      </div>
                      <div className="text-[16px] font-[600]">
                        Follow the link & Sign up if you are a new user or login
                        if you already have a Qviq account
                      </div>
                    </div>
                    <div className="flex flex-row gap-[20px] items-center">
                      <div className=" w-[32px] z-10 ">
                        <div className="bg-[#E40849] text-[#FFFFFF] rounded-[24px] h-[24px] sm:h-[32px] w-[24px] sm:w-[32px] flex justify-center items-center">
                          4
                        </div>
                      </div>
                      <div className="text-[16px] font-[600]">
                        Create a Qviqsite, Boom! Your Qviq card is ready to
                        share
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Image
                    className="lg:w-[632px] lg:h-[399px] float-right sm:w-[399px] md:mt-[11rem] lg:mt-[5.3rem] h-[200px] xsm:h-[250px] "
                    src={require("./assets/Android mockup.png")}
                    alt="design"
                  />
                </div>
              </div>
            )}
            {cardActive === "ios-iphone" && (
              <div className="flex flex-col md:flex-row gap-[10px] justify-between relative  rounded-[32px] border border-solid  ">
                <div className="flex flex-col gap-[40px] w-[235px] xsm:w-[290px] xsm2:w-[390px] sm:w-auto mb-4">
                  <div className="lg:text-[24px] sm:text-[18px] font-[700] mt-[50px] ml-[20px] sm:ml-[50px]">
                    Steps to activate Qviq smart card on{" "}
                    <span className="text-[#FB6609]">iphone(iOS)</span> device:
                  </div>
                  <div className="relative">
                    <div className=" w-[1px] h-[360px] left-[3.8rem] top-[7rem] xsm:h-[268px] xsm2:h-[200px] sm:h-[250px] sm2:h-[200px] md3:h-[200px] md:h-[260px] lg:h-[260px] border border-dashed border-[#FB6609] absolute xsm:top-[5rem] xsm2:top-[4rem] sm:top-[3rem] md:top-[3rem] xl:top-[2rem] sm:left-16 xsm:left-[3.8rem] " />
                  </div>
                  <div className="flex flex-col lg:text-[16px] sm:text-[12px] lg:gap-[48px] sm:gap-[28px] -mt-[20px]  ml-[50px]">
                    <div className="flex flex-row gap-[20px] items-center">
                      <div className=" w-[32px] z-10 ">
                        <div className="bg-[#FB6609] text-[#FFFFFF] rounded-[24px] h-[24px] sm:h-[32px] w-[24px] sm:w-[32px] flex justify-center items-center ">
                          1
                        </div>
                      </div>
                      <div className="text-[16px] font-[600]">
                        iPhone models XR & later have NFC enabled by default,
                        while for iPhone 8 and X, you must enable NFC in
                        settings.
                      </div>
                    </div>
                    <div className="flex flex-row gap-[20px] items-center">
                      <div className=" w-[32px] z-10 ">
                        <div className="bg-[#FB6609] text-[#FFFFFF] rounded-[24px] h-[24px] sm:h-[32px] w-[24px] sm:w-[32px] flex justify-center items-center">
                          2
                        </div>
                      </div>
                      <div className="text-[16px] font-[600]">
                        Tap your Qviq card on the Upper front or back side of
                        your iPhone
                      </div>
                    </div>
                    <div className="flex flex-row gap-[20px] items-center">
                      <div className=" w-[32px] z-10 ">
                        <div className="bg-[#FB6609] text-[#FFFFFF] rounded-[24px] h-[24px] sm:h-[32px] w-[24px] sm:w-[32px] flex justify-center items-center">
                          3
                        </div>
                      </div>
                      <div className="text-[16px] font-[600]">
                        Follow the link & Sign up if you are a new user or login
                        if you already have a Qviq account
                      </div>
                    </div>
                    <div className="flex flex-row gap-[20px] items-center">
                      <div className=" w-[32px] z-10 ">
                        <div className="bg-[#FB6609] text-[#FFFFFF] rounded-[24px] h-[24px] sm:h-[32px] w-[24px] sm:w-[32px] flex justify-center items-center">
                          4
                        </div>
                      </div>
                      <div className="text-[16px] font-[600]">
                        Create a Qviqsite, Boom! Your Qviq card is ready to
                        share
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    className="lg:w-[632px] lg:h-[399px] float-right sm:w-[399px] md:mt-[11rem] lg:mt-[5.3rem] h-[200px] xsm:h-[250px] "
                    src={require("./assets/Iphone mockup.png")}
                    alt="design"
                  />
                </div>
              </div>
            )}
            {cardActive === "Using QR code" && (
              <div className="flex flex-col md:flex-row gap-[10px] justify-between relative  rounded-[32px] border border-solid  ">
                <div className="flex flex-col gap-[40px] w-[235px] xsm:w-[290px] xsm2:w-[390px] sm:w-auto mb-4">
                  <div className="lg:text-[24px] sm:text-[18px] font-[700] mt-[50px] ml-[20px] sm:ml-[50px]">
                    Steps to activate Qviq smart card by scanning{" "}
                    <span className="text-[#E40849]">QR code</span>:
                  </div>
                  <div className="relative">
                    <div className=" w-[1px] h-[260px] left-[3.8rem] top-20 xsm:h-[195px] xsm2:h-[150px] sm:h-[170px] md:h-[150px] lg:h-[180px] border border-dashed border-[#E40849] absolute xsm:top-[4rem] xsm2:top-[3rem] sm:top-[2rem] md:top-[3rem] xl:top-[2rem] sm:left-16 xsm:left-[3.8rem] " />
                  </div>
                  <div className="flex flex-col lg:text-[16px] sm:text-[12px] lg:gap-[48px] sm:gap-[28px] -mt-[20px]  ml-[50px]">
                    <div className="flex flex-row gap-[20px] items-center">
                      <div className=" w-[32px] z-10 ">
                        <div className="bg-[#E40849] text-[#FFFFFF] rounded-[24px] h-[24px] sm:h-[32px] w-[24px] sm:w-[32px] flex justify-center items-center ">
                          1
                        </div>
                      </div>
                      <div className="text-[16px] font-[600]">
                        Scan the QR Code on your Qviq card with Google lens or
                        Camera app in case of iPhone
                      </div>
                    </div>
                    <div className="flex flex-row gap-[20px] items-center">
                      <div className=" w-[32px] z-10  ">
                        <div className="bg-[#E40849] text-[#FFFFFF] rounded-[24px] h-[24px] sm:h-[32px] w-[24px] sm:w-[32px] flex justify-center items-center">
                          2
                        </div>
                      </div>
                      <div className="text-[16px] font-[600]">
                        Follow the link & Sign up if you are a new user or login
                        if you already have a Qviq account
                      </div>
                    </div>
                    <div className="flex flex-row gap-[20px] items-center">
                      <div className=" w-[32px] z-10  ">
                        <div className="bg-[#E40849] text-[#FFFFFF] rounded-[24px] h-[24px] sm:h-[32px] w-[24px] sm:w-[32px] flex justify-center items-center">
                          3
                        </div>
                      </div>
                      <div className="text-[16px] font-[600]">
                        Create a Qviqsite, Boom! Your Qviq card is ready to
                        share
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    className="lg:w-[632px] lg:h-[399px] float-right sm:w-[399px] md:mt-[11rem] lg:mt-[5.3rem] h-[200px] xsm:h-[250px] "
                    src={require("./assets/Card mockup.png")}
                    alt="design"
                  />
                </div>
              </div>
            )}
          </div>
          {/* Share Qviq smart card  */}
          <div className="mt-20">
            <div className="xl:text-[48px] sm:text-[32px] font-[800] text-[#0A0003] mb-[56px]">
              How to Share with your Qviq smart card?
            </div>
            <div className="flex flex-col md:flex-row gap-[48px] justify-around w-auto md:w-[688px] md2:[739px] md3:w-[785px] lg:w-auto  ">
              {/* for android & iphone */}
              <div className="flex flex-col gap-[48px] rounded-[32px] xl:w-[628px] lg:w-[550px] md3:w-[450px] border border-solid border-{#E40849} shadow-[8px_8px_0px_0px_#E40849] p-[48px] w-[243px] xsm:w-[310px] xsm2:w-[383px] sm:w-[492px] sm2:w-auto ">
                <div className="text-[24px] font-[700] text-[#0A0003]">
                  On Android & Iphone
                </div>
                <div>
                  <div className="relative">
                    <div className=" w-[1px] h-[77rem] left-[0.7rem] top-16 xsm:h-[49rem] xsm2:h-[38rem] sm:h-[31rem] sm2:h-[27rem] md:h-[46rem] md2:h-[39rem]  lg:h-[29.5rem] border border-dashed border-[#E40849] absolute xsm:top-[2rem] xsm2:top-[2rem] sm:top-[2rem] md:top-[2rem] xl:top-[0.8rem] sm:left-[0.9rem] xsm:left-[0.7rem] " />
                  </div>
                  <div className="flex flex-row gap-[20px] items-center">
                    <div className="z-10">
                      <span className="bg-[#E40849] text-[#FFFFFF] rounded-[24px] w-[24px] h-[24px] sm:h-[32px] sm:w-[32px] flex flex-row justify-center content-center flex-wrap">
                        <HiCheck />
                      </span>
                    </div>
                    <div className="text-[16px] font-[600]">
                      The other person needs to have NFC enabled from the
                    </div>
                  </div>
                  <div className="text-[16px] font-[600] pl-[50px]">
                    notification bar/settings
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-[20px] items-center">
                    <div className="w-[32px] z-10">
                      <span className="bg-[#E40849] text-[#FFFFFF] rounded-[24px]  w-[24px] h-[24px] sm:h-[32px] sm:w-[32px] flex flex-row justify-center content-center flex-wrap">
                        <HiCheck />
                      </span>
                    </div>
                    <div className="text-[#E40849] text-[16px] font-[700] leading-6">
                      For Android
                    </div>
                  </div>
                  <div className="flex flex-col gap-[32px] pl-[50px]">
                    <div className="text-[16px] font-[600]">
                      Tap your Qviq card on the middle back or upper back side
                      of any Android smartphone
                    </div>
                    <div>
                      <div className="text-[#FB6609] text-[16px] font-[700] leading-6">
                        For iphone
                      </div>
                      <div className="text-[16px] font-[600]">
                        Tap your Qviq card on the upper front or back side of an
                        iPhone. (iPhone models XR & later have NFC enabled by
                        default, while for iPhone 8 and X, you must enable NFC
                        in settings.)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-[20px] items-center">
                  <div className="w-[32px]  z-10">
                    <span className="bg-[#E40849] text-[#FFFFFF] rounded-[24px]  w-[24px] h-[24px] sm:h-[32px] sm:w-[32px] flex flex-row justify-center content-center flex-wrap">
                      <HiCheck />
                    </span>
                  </div>
                  <div className="text-[16px] font-[600]">
                    Your Qviqsite will appear in another user's browser
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-[20px] items-center">
                    <div className="w-[32px] z-10">
                      <span className="bg-[#E40849] text-[#FFFFFF] rounded-[24px]  w-[24px] h-[24px] sm:h-[32px] sm:w-[32px] flex flex-row justify-center content-center flex-wrap">
                        <HiCheck />
                      </span>
                    </div>
                    <div className="text-[16px] font-[600]">
                      Prompt them to tap the 'Contact' button to save and share
                    </div>
                  </div>
                  <div className="text-[16px] font-[600] pl-[50px]">
                    contact information
                  </div>
                </div>
              </div>
              {/* using Qr code */}
              <div className="flex flex-col gap-[48px] rounded-[32px] xl:w-[628px]  lg:w-[550px]  md3:w-[450px] border border-solid border-{#FB6609} shadow-[8px_8px_0px_0px_#FB6609] p-[48px] w-[243px] xsm:w-[310px] xsm2:w-[383px] sm:w-[492px] sm2:w-auto ">
                <div className="text-[24px] font-[700] text-[#0A0003]">
                  Using QR Code
                </div>
                <div>
                  <div className="relative">
                    <div className=" w-[1px] h-[40rem] left-[0.7rem] top-16 xsm:h-[24rem] xsm2:h-[22rem] sm:h-[18rem] sm2:h-[16rem] md:h-[25rem] md2:h-[22rem] lg:h-[17.5rem] border border-dashed border-[#FB6609] absolute xsm:top-[2rem] xsm2:top-[1rem] sm:top-[2rem] md:top-[3rem] xl:top-[1rem] sm:left-[0.9rem] xsm:left-[0.7rem] " />
                  </div>
                  <div className="flex flex-row gap-[20px] items-center">
                    <div className="w-[32px] z-10 ">
                      <span className="bg-[#FB6609] text-[#FFFFFF] rounded-[24px] w-[24px] h-[24px] sm:h-[32px] sm:w-[32px] flex flex-row justify-center content-center flex-wrap">
                        <HiCheck />
                      </span>
                    </div>
                    <div className="text-[16px] font-[600]">
                      Just show your QR Code mentioned on your Qviq card
                    </div>
                  </div>
                  {/* <div className="text-[16px] font-[600] pl-[50px]">
                    notification bar/settings
                  </div> */}
                </div>
                <div>
                  <div className="flex flex-row gap-[20px] items-center">
                    <div className="w-[32px] z-10">
                      <span className="bg-[#FB6609]  text-[#FFFFFF] rounded-[24px]  w-[24px] h-[24px] sm:h-[32px] sm:w-[32px] flex flex-row justify-center content-center flex-wrap">
                        <HiCheck />
                      </span>
                    </div>
                    <div className="text-[16px] font-[600]">
                      The other person can scan it with google lens or Camera
                      app
                    </div>
                  </div>
                  <div className="text-[16px] font-[600] pl-[50px]">
                    in case of iPhone
                  </div>
                </div>
                <div className="flex flex-row gap-[20px] items-center">
                  <div className="w-[32px] z-10">
                    <span className="bg-[#FB6609]  text-[#FFFFFF] rounded-[24px]  w-[24px] h-[24px] sm:h-[32px] sm:w-[32px] flex flex-row justify-center content-center flex-wrap">
                      <HiCheck />
                    </span>
                  </div>
                  <div className="text-[16px] font-[600]">
                    Your Qviqsite will appear in another user's browser
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-[20px] items-center">
                    <div className="w-[32px] z-10">
                      <span className="bg-[#FB6609]  text-[#FFFFFF] rounded-[24px]  w-[24px] h-[24px] sm:h-[32px] sm:w-[32px] flex flex-row justify-center content-center flex-wrap">
                        <HiCheck />
                      </span>
                    </div>
                    <div className="text-[16px] font-[600]">
                      Prompt them to tap the 'Contact' button to save and share
                    </div>
                  </div>
                  <div className="text-[16px] font-[600] pl-[50px]">
                    contact information
                  </div>
                </div>
                {/*  */}
                <div className="flex sm:flex-row  flex-col justify-between items-center border bg-[#FB6609] p-[16px] rounded-[8px] border-solid border-[#FB6609] shadow-[4px_4px_0px_0px_#B53B02]">
                  <div className="flex flex-col gap-[20px] ">
                    <div className="text-[16px] font-[700] text-[#FFF]">
                      Compatibility
                    </div>
                    <div className="font-[400] text-[14px] text-[#FFF]">
                      Check if your device is compatible with NFC here:
                      <button
                        className=" cursor-pointer "
                        onClick={() => toggleModal()}
                      >
                        Click here
                      </button>
                    </div>
                  </div>
                  {modal && (
                    <Modal
                      label="Compatibility"
                      showSpan={false}
                      onClick={toggleModal}
                    >
                      <div className="p-16">
                        <input
                          className="mb-4 flex-1 modal1-ip-field w-full text-[12px] md:text-[16px]"
                          type="text"
                          placeholder="🔍 Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div>
                        { filteredItems.length > 0 ? (
                          filteredItems.map((result, index) => {
                            return (
                              <div key={index}>
                                {" "}
                                <p className="text-[32px] font-[700] leading-[50px] my-6 ">
                                  {result.title}
                                </p>
                                {result.phone
                                  .filter((item) =>
                                    item
                                      .toLowerCase()
                                      .includes(searchQuery.toLowerCase())
                                  )
                                  .map((filteredItem, subIndex) => {
                                    return (
                                      <li className="text-[16px] font-[600] leading-[24px] " key={subIndex}>{filteredItem}</li>
                                    );
                                  })}
                              </div>
                            )
                          })
                          ):(
                            <p className=" text-gray-400  " > Your Device is not Compatible...  </p>
                          )}
                        </div>
                      </div>
                    </Modal>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="my-20 bg-[#0A0003] rounded-[32px] p-[48px] relative overflow-hidden flex flex-col md:flex-row justify-around items-center">
            <div className="flex flex-col gap-[48px]">
              <div className="text-[24px] text-[#FFF] font-[700]">
                How to create a Qviq-site?
              </div>
              <div>
                <Image
                  className="lg:w-[559px] lg:h-[384px] md3:w-[400px] md3:h-[250px] md:h-[235px] md:w-[270px] "
                  src={require("./assets/Group.png")}
                  alt="design"
                />
              </div>
              {
                username == "" &&
              <PrimaryButton3
                onClick={() => navigate("/signup")}
                text="Start Your Free Trial"
                width="224px"
                // height="56px"
                padding="13px 23px 15px 24px"
                className="Plus-Jakarta-Sans-font-div  h-[48px] sm:h-[56px] text-center  text-[16px] font-[900] leading-[20px] sm:text-[18px] sm:font-[700] sm:leading-[20px] text-[#ffffff]"
              />
              }
            </div>
            <div className="absolute z-0 md:right-[5rem] lg:right-[4rem] xl:right-[10rem] rounded-[483px] bg-[rgba(178,132,238,0.49)] xl:w-[335px] xl:h-[483px] lg:w-[335px] lg:h-[429px] md:w-[270px] md:h-[329px] w-[173px] h-[271px] top-[62%] md:top-[5rem] lg:top-[5rem] sm:blur-[100px] sm:h-[371px] sm:w-[373px] sm:top-[35rem] blur-[51.8px]" />
            <div className="z-10">
              <Image
                className="lg:w-[374px] lg:h-[423px] mt-5 md:mt-0 md3:w-[280px] md3:h-[323px] md:h-[280px] md:w-[230px] w-auto h-[245px]"
                src={require("./assets/Frame.png")}
                alt="design"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Learn;
