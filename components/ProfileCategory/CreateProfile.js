"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import TapopLogo from "../Login/assets/Tapop Final Logo Concept 1 2.svg";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { UserContext } from "../Contexts/context";
import { serverUrl } from "../../config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Carousel3 from "../UiComponents/Carousel3";
import Carousel from "react-simply-carousel";

import Template2Mobile from "../ProfileTemplates/Template2Mobile/Template2Mobile";
import Template3Mobile from "../ProfileTemplates/Template3Mobile/Template3Mobile";
import Template4Mobile from "../ProfileTemplates/Template4Mobile/Template4Mobile";
import Template5Mobile from "../ProfileTemplates/Template5Mobile/Template5Mobile";
import Template6Mobile from "../ProfileTemplates/Template6Mobile/Template6Mobile";
import Template7Mobile from "../ProfileTemplates/Template7Mobile/Template7Mobile";
import {
  Template10Bg,
  Template11Bg,
  Template12Bg,
  Template13Bg,
  Template8Bg,
  Template9Bg,
  Template14Bg,
  Template15Bg,
  Template16Bg,
  Template17Bg,
  Template18Bg,
  Template19Bg,
  Template20Bg,
  Template21Bg,
  Template22Bg,
  Template23Bg,
  Template24Bg,
  Template25Bg,
  Template26Bg,
  Template27Bg,
  Template28Bg,
  Template29Bg,
  Template30Bg,
} from "../ProfileTemplates/TempateBg/MobileTemplateBg";
import Template11Mobile from "../ProfileTemplates/Template11Mobile/Template11Mobile";
import Template29Mobile from "../ProfileTemplates/Template29Mobile/Template29Mobile";
import Template30Mobile from "../ProfileTemplates/Template30Mobile/Template30Mobile";
import Template8Mobile from "../ProfileTemplates/Template8Mobile/Template8Mobile";
import TemplatePreview from "../UiComponents/TemplatePreview";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import "../UiComponents/UiStyles.css";
import { createQueryString, getCookie } from "@/components/utils";
import Navbar from "../Login/Navbar";
import { IoIosArrowBack } from "react-icons/io";
import NewToast from "../UiComponents/NewToast";
import LoadingAnimation from "../UiComponents/Loading/LoadingAnimation";

export default function CreateProfile({ searchParams }) {
  //console.log(searchParams);

  const { updateCheckVariable } = useContext(UserContext);
  const profile = useParams().username;
  const type = useParams().templateId;
  const [dummyData, setDummyData] = useState(true);
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useRouter();
  const [profileData, setProfileData] = useState([]);
  const [template, setTemplate] = useState("template1");
  const [templateIndex, setTemplateIndex] = useState();
  const [templatePreview, setTemplatePreview] = useState(false);
  const [record, setRecord] = useState([]);
  const [pro, setPro] = useState("");
  const [starter, setStarter] = useState("");
  const [basic, setBasic] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showMessage, setShowtMessage] = useState(false);

  const fromPage =
    searchParams.fromPage !== undefined ? searchParams.fromPage : "admin";
  const fromsignup =
    searchParams.fromsignup !== undefined ? searchParams.fromsignup : false;

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const response = await axios.get(
        `${serverUrl}/profile/getUser/${profile}`,
        config
      );
      const { specificUser, profileData, redirect } = response.data;

      setRecord(specificUser);
      setPro(specificUser[0].pro);
      setStarter(specificUser[0].starter);
      setBasic(specificUser[0].basic);
      setProfileData(profileData);
      if (redirect) {
        navigate.push(`/selectprofile/${profile}`);
      }
    } catch (error) {
      //console.log("afldkjkfajlfd", error);
      // navigate.push("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if ((basic || starter) && profileData.length > 0) {
      navigate.push(`/selectprofile/${profile}`);
    } else if (pro && profileData.length >= 3) {
      navigate.push(`/selectprofile/${profile}`);
    }
  }, [record, profileData]);

  const [templateId, setTemplateId] = useState("");
  async function addProfile() {
    try {
      const response = await fetch(
        `${serverUrl}/profile/profile/add/${profile}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify({
            profile,
            type: template,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        //console.log(data.error);
      } else {
        const tempId = data.templateId;
        setTemplateId(tempId);

        // toast.success("Profile added");
        setShowtMessage(true);
        setMessage("Profile added");
        if (fromsignup) {
          setLoading(false);
          navigate.push(
            "/signup_success?" + createQueryString(["fromPage"], [fromPage])
          );
        } else {
          navigate.push(`/selectprofile/${profile}`);
        }
        return tempId;
      }
    } catch (error) {
      //console.log(error);
    }
  }

  async function handleOnClick() {
    setLoading(true);
    const templateId = await addProfile();

    try {
      const res = await axios.post(
        `${serverUrl}/default/review/${templateId}/${profile}`
      );
    } catch (error) {
      //console.log(error);
    }
    updateCheckVariable();
  }

  const templatesArray = [
    {
      type: "template1",
      template: <Template2Mobile disable={true} />,
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (1).png")
        .default.src,
    },
    {
      type: "template2",
      template: <Template7Mobile disable={true} blur={true} />,
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (17).png")
        .default.src,
    },
    {
      type: "template3",
      template: (
        <Template8Mobile disable={true} mainbg={Template27Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (15).png")
        .default.src,
    },
    {
      type: "template4",
      template: (
        <Template11Mobile
          disable={true}
          mainbg={Template11Bg}
          mainfg={`bg-[#F5775BBc]`}
        />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (6).png")
        .default.src,
    },
    {
      type: "template5",
      template: (
        <Template7Mobile disable={true} mainbg={Template10Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (16).png")
        .default.src,
    },
    {
      type: "template6",
      template: <Template4Mobile disable={true} />,
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (3).png")
        .default.src,
    },
    {
      type: "template7",
      template: (
        <Template11Mobile
          disable={true}
          mainbg={Template13Bg}
          mainfg={`bg-[#B284EEBc]`}
        />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (8).png")
        .default.src,
    },
    {
      type: "template8",
      template: (
        <Template7Mobile disable={true} mainbg={Template20Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (19).png")
        .default.src,
    },
    {
      type: "template9",
      template: <Template5Mobile disable={true} />,
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (4).png")
        .default.src,
    },

    {
      type: "template10",
      template: (
        <Template8Mobile disable={true} mainbg={Template24Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (11).png")
        .default.src,
    },
    {
      type: "template11",
      template: (
        <Template7Mobile disable={true} mainbg={Template8Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (18).png")
        .default.src,
    },
    {
      type: "template12",
      template: (
        <Template11Mobile
          disable={true}
          mainbg={Template12Bg}
          mainfg={"bg-[#C7E356Bc]"}
        />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (7).png")
        .default.src,
    },
    {
      type: "template13",
      template: <Template3Mobile disable={true} />,
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (2).png")
        .default.src,
    },
    {
      type: "template14",
      template: (
        <Template7Mobile disable={true} mainbg={Template9Bg} blur={true} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (29).png")
        .default.src,
    },
    {
      type: "template15",
      template: (
        <Template29Mobile
          disable={true}
          mainbg={Template29Bg}
          mainfg={"bg-[#141414E5]"}
        />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (9).png")
        .default.src,
    },
    {
      type: "template16",
      template: (
        <Template7Mobile disable={true} mainbg={Template14Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (20).png")
        .default.src,
    },
    {
      type: "template17",
      template: (
        <Template7Mobile disable={true} mainbg={Template15Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (22).png")
        .default.src,
    },
    {
      type: "template18",
      template: (
        <Template8Mobile disable={true} mainbg={Template26Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (12).png")
        .default.src,
    },
    {
      type: "template19",
      template: <Template6Mobile disable={true} />,
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (5).png")
        .default.src,
    },
    {
      type: "template20",
      template: (
        <Template7Mobile disable={true} mainbg={Template16Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (24).png")
        .default.src,
    },
    {
      type: "template21",
      template: (
        <Template8Mobile disable={true} mainbg={Template28Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (13).png")
        .default.src,
    },
    {
      type: "template22",
      template: (
        <Template30Mobile
          disable={true}
          mainbg={Template30Bg}
          mainfg={"bg-[#ffffff]"}
        />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (10).png")
        .default.src,
    },
    {
      type: "template23",
      template: (
        <Template7Mobile disable={true} mainbg={Template17Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (26).png")
        .default.src,
    },
    {
      type: "template24",
      template: (
        <Template8Mobile disable={true} mainbg={Template25Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (14).png")
        .default.src,
    },

    {
      type: "template25",
      template: (
        <Template7Mobile disable={true} mainbg={Template18Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (21).png")
        .default.src,
    },
    {
      type: "template26",
      template: (
        <Template7Mobile disable={true} mainbg={Template19Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (23).png")
        .default.src,
    },

    {
      type: "template27",
      template: (
        <Template7Mobile disable={true} mainbg={Template21Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (25).png")
        .default.src,
    },
    {
      type: "template28",
      template: (
        <Template7Mobile disable={true} mainbg={Template22Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (27).png")
        .default.src,
    },
    {
      type: "template29",
      template: (
        <Template7Mobile disable={true} mainbg={Template23Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (28).png")
        .default.src,
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setTemplate(templatesArray[activeSlide].type);
  }, [activeSlide]);

  return (
    <div className="w-full p-0 bg-white">
      {/* <ToastContainer /> */}

      {fromsignup ? (
        <div
          className={`relative w-full h-screen flex flex-col justify-start items-center bg-white font-poppins overflow-y-scroll pb-[50px] ${
            windowHeight > 700 ? "smd:pt-[136px] pt-[96px]" : "pt-[96px]"
          }`}
        >
          <Navbar usedIn="hideLogin" background="white" />

          <div className="hidden md:flex flex-row items-center gap-[8px] cursor-pointer active:scale-[90%] absolute top-0 left-0 pl-[50px] lg:pl-[80px] transition-[300ms]">
            <IoIosArrowBack
              onClick={navigate.back}
              className="text-[#E40849]"
            />
            <button
              className="add-icon font-[500] text-[16px]"
              onClick={navigate.back}
            >
              Back
            </button>
          </div>

          <div className="smd:text-[20px] text-[18px] font-[600] text-[#0A0003] text-center max-w-[437px] w-full xsm:px-[20px] px-[10px]">
            👋 Hey {profile}, pick a template to get started. You can change it
            later
          </div>

          <div className="max-w-full relative bg-[#ffffff]">
            <Carousel
              containerProps={{
                style: {
                  width: "100%",
                  justifyContent: "space-between",
                  userSelect: "none",
                },
              }}
              // preventScrollOnSwipe
              swipeTreshold={60}
              activeSlideIndex={activeSlide}
              activeSlideProps={{
                style: {
                  // background: "blue",
                  transform: "scale(88%)",
                  outline: "3px solid rgba(26,26,26,0.6)",
                  opacity: "1",
                  borderRadius: "24px",
                },
              }}
              onRequestChange={setActiveSlide}
              // forwardBtnProps={{
              //   children: ">",
              //   style: {
              //     width: 60,
              //     height: 60,
              //     minWidth: 60,
              //     alignSelf: "center",
              //   },
              // }}
              // backwardBtnProps={{
              //   children: "<",
              //   style: {
              //     width: 60,
              //     height: 60,
              //     minWidth: 60,
              //     alignSelf: "center",
              //   },
              // }}
              // dotsNav={{
              //   show: true,
              //   itemBtnProps: {
              //     style: {
              //       height: 16,
              //       width: 16,
              //       borderRadius: "50%",
              //       border: 0,
              //     },
              //   },
              //   activeItemBtnProps: {
              //     style: {
              //       height: 16,
              //       width: 16,
              //       borderRadius: "50%",
              //       border: 0,
              //       background: "black",
              //     },
              //   },
              // }}
              itemsToShow={5}
              easing="ease"
              speed={400}
              centerMode
            >
              {templatesArray.map((item, index) => {
                return (
                  <div
                    className="flex flex-col justify-center items-center w-full scale-[80%] opacity-[0.6] overflow-hidden rounded-[24px]"
                    onClick={() => {
                      setActiveSlide(index);
                      setTemplate(item.type);
                    }}
                    key={index}
                    style={{
                      transition: "300ms",
                      outline: "1px solid #E8E8E8",
                      background:
                        template === item.type
                          ? "rgba(26,26,26,0.6)"
                          : "#E8E8E8",
                    }}
                  >
                    <button
                      onClick={() => setTemplate(item.type)}
                      className={`
                      ${
                        windowHeight > 912
                          ? "w-[270px] h-[664px]"
                          : "w-[240px] h-[590px]"
                      }
                      overflow-hidden rounded-[24px] flex flex-col justify-center items-center
                      hover:scale-[101%] hover:shadow-lg`}
                      style={{
                        transition: "300ms",
                        // outline:
                        //   template === item.type
                        //     ? "3px solid rgba(26,26,26,0.6)"
                        //     : "1px solid #E8E8E8",
                      }}
                    >
                      <Image
                        priority={true}
                        className="w-full m-0"
                        src={item.thumbnail}
                        // loading="lazy"
                        width={270}
                        height={664}
                        quality={50}
                        alt="template image"
                      />
                      {/* <img src={item.thumbnail} loading="lazy" /> */}
                    </button>
                  </div>
                );
              })}
            </Carousel>
          </div>

          <div
            className="flex justify-center w-full h-[48px] px-5"
            style={{ zIndex: "50" }}
          >
            <button
              type="button"
              className="btn-primary text-white font-medium rounded-full flex w-full max-w-[248px] "
              onClick={handleOnClick}
              style={{
                height: "56px",
                display: "flex",
                justifyContent: "center",
                gap: "1px",
                alignItems: "center",
                cursor: "pointer",
              }}
              text="Get Starter Plan"
            >
              <p className="">Try this template</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col relative md:items-center justify-center px-[5px] xsm:px-[20px]">
          <div className="w-full flex flex-col items-start">
            <Image
              className="mt-[20px] mb-[18px] sm:mb-[25px] w-auto h-[32px] sm:h-[50px]"
              src={TapopLogo}
              alt="logo"
            />
          </div>

        <div
          className=" top-2 sm:top-2 smd:-top-5 md3:mt-6 flex flex-row items-center gap-[8px] cursor-pointer active:scale-[90%] absolute md3:top-0 left-0 pl-[20px] md:pl-[50px] lg:pl-[80px] pt-[62px] smd:pt-[96px] transition-[300ms]"
          onClick={navigate.back }
        >
          <IoIosArrowBack className="text-[#E40849]" />
          <button className="add-icon font-[500] text-[16px]">Back</button>
        </div>

          <div className="font-[700] mt-[30px] xsm2:mt-2 text-[24px] xsm:text-[28px] sm:text-[36px] lg:text-[48px] leading-[35px] sm:leading-[56px] md:text-center my-2 sm:my-0">
            Choose a template for your site
          </div>
          <div className="text-[#817C7C] font-[600] text-[14px] leading-[22px] sm:text-[16px] md:text-[20px] sm:leading-[28px] md:text-center mt- md:mt-[20px]">
            To get started, choose a template. You can change the template
            later.
          </div>

          <div className="h-fit w-[100%] max-w-[1440px] mt-[36px] md:mt-[40px] mb-32 z-0 flex flex-wrap justify-center items-center gap-x-[16px] gap-y-[40px] sm:gap-x-[40px] sm:gap-y-[50px]">
            {templatesArray.map((item, index) => {
              return (
                <div
                  className="flex flex-col justify-center items-center"
                  key={index}
                >
                  <button
                    onClick={() => setTemplate(item.type)}
                    className="
                    w-[132px] custom2:w-[152px] sm:w-[240px] custom:w-[270px] 
                    h-[320px] custom2:h-[370px] sm:h-[590px] custom:h-[664px]
                    overflow-hidden rounded-[16px] sm:rounded-[34px] flex flex-col justify-center items-center
                    hover:scale-[101%] hover:shadow-lg"
                    style={{
                      transition: "300ms",
                      outline:
                        template === item.type
                          ? "3px solid rgba(26,26,26,0.6)"
                          : "1px solid #E8E8E8",
                      background:
                        template === item.type
                          ? "rgba(26,26,26,0.6)"
                          : "#E8E8E8",
                    }}
                  >
                    <Image
                      priority={true}
                      className="w-full m-0"
                      src={item.thumbnail}
                      // loading="lazy"
                      width={270}
                      height={664}
                      quality={50}
                      alt="template image"
                    />
                    {/* <img src={item.thumbnail} loading="lazy" /> */}
                  </button>

                  {/* <p className="mt-[12px] sm:mt-[16px] custom:mt-[20px] text-[14px] sm:text-[20px]">
                  Template {index + 1}
                </p> */}

                  <div
                    className="relative z-[1] h-[0px] w-[100%]
                    mt-[10px] sm:mt-[14px] custom:mt-[18px] 
                    mb-[20px] sm:mb-[36px] custom:mb-[40px]
                      flex flex-col justify-start items-center"
                  >
                    <button
                      className=" 
                          px-[18px] sm:px-[20px] custom2:px-[18px] custom:px-[24px] 
                          py-[6px] sm:py-[8px] custom2:py-[6px] custom:py-[10px] 
                          border-[2px] border-black rounded-[64px] bg-white 
                          font-semibold text-[10px] sm:text-[12px] custom2:text-[12px] custom:text-[14px] 
                          hover:shadow-lg
                          active:scale-90"
                      onClick={() => {
                        setTemplatePreview(true);
                        setTemplateIndex(index);
                      }}
                      style={{
                        transition: "200ms",
                        border: "2px solid #817C7C",
                      }}
                    >
                      View Template {index + 1}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {templatePreview && (
            <TemplatePreview
              setTemplatePreview={setTemplatePreview}
              templateIndex={templateIndex}
              data={{
                username: profile,
                templateId: type,
                dummyData: dummyData,
                name: name,
                firstName: firstName,
                lastName: lastName,
              }}
            />
          )}

          <div
            className="flex justify-center w-full h-[48px] fixed bottom-8 left-0 px-5"
            style={{ zIndex: "50" }}
          >
            <button
              type="button"
              className="btn-primary text-white font-medium rounded-full flex w-full sm:w-[592px] "
              onClick={handleOnClick}
              style={{
                height: "48px",
                display: "flex",
                justifyContent: "center",
                gap: "1px",
                alignItems: "center",
                cursor: "pointer",
              }}
              text="Get Starter Plan"
            >
              <NewToast open={showMessage} message={message} />
              <p className="">Continue</p>

              <span className="btn-logo">
                <HiOutlineArrowSmRight />
              </span>
            </button>
          </div>
        </div>
      )}
      {isLoading && (
        <>
          <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-black/30 z-[9999]">
            <div className="flex flex-col justify-center relative items-center w-[3rem] h-[3rem]">
              <img
                src={require("../Image/Tapop logo black.png").default.src}
                alt=""
                className="object-contain"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center">
              <LoadingAnimation />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
