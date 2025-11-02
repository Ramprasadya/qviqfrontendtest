"use client";
import React from "react";
import { useEffect } from "react";
import Navbar from "./header/Navbar";
import Footer from "./Footer";
import PrimaryButton3 from "../UiComponents/PrimaryButton3";
import { HiChevronRight } from "react-icons/hi2";
import Carousel from "../UiComponents/Carousel";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const About = () => {
  let navigate = useRouter();

  const myRef = useRef(null);
  const scrollToRef = () => {
    const element = myRef.current;

    if (element) {
      element.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    scrollToRef();
  }, []);

  const demoComment = [
    <div className="flex flex-col mt-4 md:flex-row justify-start items-start px-5 md:px-10 xl:px-20 w-full gap-5">
      <div className="xl:flex-1 flex items-center gap-3 min-w-fit  h-full xl:pl-52">
        <Image
          className="h-[80px] lg:h-[165px] w-[80px] lg:w-[165px] rounded-full  border-black border-8"
          src={require("./assets/founder.jpeg")}
          alt="founder"
        />
        <div className="flex flex-col justify-center items-start h-[80px] lg:h-[105px] ml-[0px] lg:ml-[10px]">
          <p className="font-[700] text-[24px] lg:text-[30px] leading-[28px] md:text-xl text-[#0A0003] mb-1">
            Dhruv Gupta
          </p>
          <p className="font-[500] text-[16px] lg:text-[20px] leading-[20px] text-[#0A0003] text-start">
            Founder, Qviq
          </p>
          <p className="font-[400] text-[14px] lg:text-[16px] mt-1 leading-[20px] text-[#0A0003] text-start">
            Check my profile
          </p>
          <a target="blank" href="https://iamdhruv.qviq.io/">
            iamdhruv.qviq.io
          </a>
          {/* https://iamdhruv.qviq.io/ */}
        </div>
      </div>

      <div className="xl:flex-1 lg:mt-12 xl:mt-0 font-[500] text-[20px] leading-[56px] md:text-[25px] md:leading-[28px] xl:text-[40px] xl:leading-[56px]">
        "Qviq is our way of making digital interactions more personal and
        effortless. I believe every product is an experience for a user and
        every user deserves to have great experiences."
      </div>
    </div>,

    <div className="flex flex-col mt-4 md:flex-row justify-start items-start px-5 md:px-10 xl:px-20 w-full gap-5">
      <div className="xl:flex-1 flex items-center gap-3 min-w-fit  h-full xl:pl-52">
        <Image
          className="h-[80px] lg:h-[165px] w-[80px] lg:w-[165px] rounded-full  border-black border-8"
          src={require("./assets/sayaji.jpg")}
          alt="founder"
        />
        <div className="flex flex-col justify-center items-start h-[80px] lg:h-[105px] ml-[0px] lg:ml-[10px]">
          <p className="font-[700] text-[24px] lg:text-[30px] leading-[28px] md:text-xl text-[#0A0003] mb-1">
            Sayaji Shirke
          </p>
          <p className="font-[500] text-[16px] lg:text-[20px] leading-[20px] text-[#0A0003] text-start">
            Co-Founder & CTO, Qviq
          </p>
          <p className="font-[400] text-[14px] lg:text-[16px] mt-1 leading-[20px] text-[#0A0003] text-start">
            Check my profile
          </p>
          <a target="blank" href="https://sayaji.qviq.io/">
            sayaji.qviq.io
          </a>
        </div>
      </div>

      <div className="xl:flex-1 lg:mt-12 xl:mt-0 font-[500] text-[20px] leading-[56px] md:text-[25px] md:leading-[28px] xl:text-[40px] xl:leading-[56px]">
        "Welcome to our platform! We're here to make optimising your internet
        presence simple—no coding necessary. Let's connect and make your
        internet adventure easier together"
      </div>
    </div>,
  ];

  return (
    <div className="Plus-Jakarta-Sans-font-div">
      <Navbar background="#FFFF" thisPage="about" />

      <div
        className=" custom-scrollbar md:pt-[68px]"
        ref={myRef}
        style={{ height: "100vh", overflowY: "scroll", overflowX: "hidden" }}
      >
        <div className="flex flex-col lg:flex-row px-2 xsm2:px-5 md:px-10 xl:px-20 gap-5 xl:gap-10 w-full pt-5 md:pt-16 pb-6 lg:py-[64px]">
          <div className="flex-[1.2] font-[800] text-[40px] leading-[56px] md:text-[32px] md:leading-[40px] xl:text-[40px] xl:leading-[56px] text-[#0A0003]">
            We help you{" "}
            <span className="text-[#817C7C]">
              unleash your creativity & elevate your brand
            </span>{" "}
            with our easy to use quick sites.
          </div>
          <div className="flex-[1] mt-auto font-[500] text-[18px] leading-[32px] md:text-[16px] md:leading-[26px] lg:text-[18px] lg:leading-[32px]">
            With our user-friendly platform, you can build a professional
            website that reflects your personality & showcases your work in no
            time.
          </div>
        </div>

        <Image
          className=" w-full h-auto"
          src={require("./assets/Image.png")}
          alt="banner"
        />

        <div className="flex flex-col lg:flex-row px-2 xsm2:px-5 md:px-10 xl:px-20 lg:gap-5 xl:gap-10 w-full my-6 xsm:my-[40px] md:my-16">
          <div className="flex-1 mt-[24px] sm:mt-0">
            <div className="flex-1 font-[800] text-[40px] leading-[56px] text-[#0A0003] md:text-3xl md:leading-[48px] xl:text-[40px] xl:leading-[56px]">
              At Qviq, our journey began with a simple idea
            </div>
          </div>
          <div className="flex-1 mt-[24px] sm:mt-0">
            <div className="font-[500] text-[18px] leading-[32px] md:text-[16px] md:leading-[26px] xl:text-[18px] xl:leading-[32px] mt-[24px]">
              To transform the way individuals and businesses connect in the
              digital world. We believed in the power of a strong online
              presence that’s easy for everyone to create and manage,
              irrespective of their skills. Making meaningful connections, the
              kind that go beyond a mere exchange of information. We envisioned
              a world where networking wasn't just about sharing contact details
              but creating lasting impressions.
            </div>
            <div className="  mt-12 ">
              <span className=" font-[800] text-[28px] leading-[44px] md:text-[24px] md:leading-[36px] xl:text-[28px] xl:leading-[45px] mb-[3rem]">
                Who We Are
              </span>
              <div className="    font-[500] text-[18px] leading-[32px] md:text-[16px] md:leading-[26px] xl:text-[18px] xl:leading-[32px] mt-[24px]">
                We are a passionate team of innovators, dreamers, and creators,
                united by a common goal – to make networking personal,
                effortless, and effective. Our team brings together a diverse
                range of skills and experiences, from tech enthusiasts to design
                experts, all working harmoniously to bring your digital presence
                to life
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col justify-center items-center mx-1 xsm:mx-5 md:mx-10 xl:mx-20 rounded-[160px] sm:rounded-[400px] px-[20px] sm:px-[130px] py-[80px] sm:py-[62px] text-white bg-gradient-to-r from-[#9747FF] via-[#F61202] to-[#FFD018]"
          style={{
            background: "linear-gradient(262deg, #FB6609 0%, #E40849 100%)",
          }}
        >
          <div className="flex items-center font-[800] text-[40px] leading-[56px] md:text-3xl md:leading-[48px] xl:text-[40px] xl:leading-[56px] gap-5">
            <svg
              className="w-5 h-5 md:w-7 md:h-7"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 0L16.9031 9.50998L25.8366 5.4594L19.8996 13.2676L28.6365 17.7266L18.8302 17.9532L20.7913 27.564L14.5 20.0385L8.20869 27.564L10.1698 17.9532L0.363545 17.7266L9.10036 13.2676L3.16344 5.4594L12.0969 9.50998L14.5 0Z"
                fill="white"
              />
            </svg>

            <p className="pt-2.5 text-center">OUR MISSION</p>

            <svg
              className="w-5 h-5 md:w-7 md:h-7"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 0L16.9031 9.50998L25.8366 5.4594L19.8996 13.2676L28.6365 17.7266L18.8302 17.9532L20.7913 27.564L14.5 20.0385L8.20869 27.564L10.1698 17.9532L0.363545 17.7266L9.10036 13.2676L3.16344 5.4594L12.0969 9.50998L14.5 0Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="font-[500] text-[24px] xsm:text-[18px] leading-[32px] md:text-[20px] lg:text-[24px] text-center md:leading-[30px] lg:leading-[32px] mt-4 md:mt-[32px] lg:mt-[56px]">
            Our mission is to empower individuals and businesses to unlock the
            full potential of their online presence. We're committed to
            simplifying the process of building and sharing digital identities.
            We believe that everyone should have access to a seamless and
            powerful online presence, regardless of their technical skills or
            resources.
          </div>
        </div>

        <div className="flex flex-col py-16 relative overflow-hidden justify-center  mb-[32px]   mt-[64px] sm:mt-24 lg:mt-[80px] w-full bg-[#0A0003]">
          <div
            className="h-[157px] blur-[38px] w-[189px] left-[2rem] xsm:left-[5rem] xsm2:left-[9rem] sm:left-[12rem] top-[-80px] md:w-[489px] sm2:blur-[120px] md:h-[489px] absolute xl:left-[530px] lg:left-[19rem] sm2:h-[289px] sm2:w-[300px] sm2:top-[-200px] sm2:left-[10rem] md:left-[10rem] md:top-[-322px] rounded-[600px] "
            style={{
              transform: "rotate(-90deg)",
              background:
                "linear-gradient(210deg, rgba(228, 8, 73, 0.80) 39.19%, rgba(251, 102, 9, 0.80) 78.88%)",
            }}
          ></div>
          <p className="font-[800] text-[20px] md:text-[25px] z-30 text-[#fff] leading-[32px] sm:text-4xl lg:text-[40px] lg:leading-[56px] self-center text-center">
            Our Core Values
          </p>
          <div className="flex lg:flex-row ml-0 xsm:ml-8 xsm2:ml-[5rem] sm:ml-[1rem] sm2:ml-[4rem] md:ml-[8rem] lg:ml-0 relative flex-col justify-center mt-[24px] xsm:px-[20px] px-[10px] sm:px-[80px] font-[400] text-[18px] leading-[27px] md:text-[16px] md:leading-[21px] xl:text-[18px] xl:leading-[27px]">
            <div className="flex flex-col gap-4">
              <div
                className="px-[40px] py-[40px] xsm:w-[280px] sm:w-[428px] xl:w-[628px] h-auto  md:h-[268px] bg-[rgba(17,17,17,0.60)] rounded-[20px]  "
                style={{ border: "1px solid rgba(32, 32, 32, 0.80) " }}
              >
                <div className="mb-4">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                      className="h-[56px] w-[56px] "
                    >
                      <path
                        d="M35 44.631C36.9435 45.1967 38.9988 45.5 41.1249 45.5C44.5753 45.5 47.8392 44.7011 50.7416 43.2783C50.7471 43.1445 50.7499 43.0101 50.7499 42.875C50.7499 37.5593 46.4406 33.25 41.1249 33.25C37.8162 33.25 34.8974 34.9195 33.165 37.4622M35 44.631V44.625C35 42.0282 34.3346 39.5869 33.165 37.4622M35 44.631C35 44.7142 34.9992 44.7972 34.9979 44.8801C30.6538 47.4956 25.5651 49 20.125 49C14.6849 49 9.59616 47.4956 5.25215 44.8801C5.25072 44.7952 5.25 44.7102 5.25 44.625C5.25 36.4098 11.9098 29.75 20.125 29.75C25.7435 29.75 30.6344 32.865 33.165 37.4622M28 14.875C28 19.2242 24.4742 22.75 20.125 22.75C15.7758 22.75 12.25 19.2242 12.25 14.875C12.25 10.5258 15.7758 7 20.125 7C24.4742 7 28 10.5258 28 14.875ZM47.25 20.125C47.25 23.5077 44.5077 26.25 41.125 26.25C37.7423 26.25 35 23.5077 35 20.125C35 16.7423 37.7423 14 41.125 14C44.5077 14 47.25 16.7423 47.25 20.125Z"
                        stroke="url(#paint0_linear_4078_6590)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4078_6590"
                          x1="50.7499"
                          y1="7"
                          x2="0.0919347"
                          y2="14.5947"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FB6609" />
                          <stop offset="1" stopColor="#E40849" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className="mt-[-4rem] absolute ml-[1.2rem]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                    >
                      <circle
                        opacity="0.2"
                        cx="21"
                        cy="21"
                        r="21"
                        fill="url(#paint0_linear_4023_68798)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4023_68798"
                          x1="42"
                          y1="2.56177e-06"
                          x2="-4.91385"
                          y2="6.49234"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FB6609" />
                          <stop offset="1" stopColor="#E40849" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </div>
                <div className=" ">
                  <span className="font-[700] text-[24px] leading-[38px]  text-[#F3F3F3]">
                    User-Centric
                  </span>
                  <p className="text-[#A7A7A7] mt-2">
                    Everything we do starts with you, our users. Your needs,
                    aspirations, and challenges guide our decisions and inspire
                    our solutions.
                  </p>
                </div>
              </div>
              <div
                className="px-[40px] py-[40px] xsm:w-[280px] sm:w-[428px] xl:w-[628px] h-auto  md:h-[268px] bg-[rgba(17,17,17,0.60)] rounded-[20px]  "
                style={{ border: "1px solid rgba(32, 32, 32, 0.80) " }}
              >
                <div className="mb-4">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                    >
                      <path
                        d="M28 2.33301L47.173 6.59367C48.2393 6.83167 49 7.77667 49 8.87101V32.174C49 36.8547 46.6597 41.2273 42.7653 43.822L28 53.6663L13.2347 43.822C9.338 41.225 7 36.8547 7 32.1763V8.87101C7 7.77667 7.76067 6.83167 8.827 6.59367L28 2.33301ZM28 7.11401L11.6667 10.7423V32.174C11.6667 35.2937 13.2253 38.208 15.8223 39.9393L28 48.0593L40.1777 39.9393C42.7747 38.208 44.3333 35.296 44.3333 32.1763V10.7423L28 7.11634V7.11401ZM38.388 19.1843L41.6897 22.4837L26.8403 37.333L16.94 27.4327L20.2393 24.1333L26.838 30.732L38.388 19.182V19.1843Z"
                        fill="url(#paint0_linear_4078_178)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4078_178"
                          x1="49"
                          y1="2.33301"
                          x2="1.79289"
                          y2="7.67813"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FB6609" />
                          <stop offset="1" stopColor="#E40849" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className="mt-[-4rem] absolute ml-[1.2rem]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                    >
                      <circle
                        opacity="0.2"
                        cx="21"
                        cy="21"
                        r="21"
                        fill="url(#paint0_linear_4023_68798)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4023_68798"
                          x1="42"
                          y1="2.56177e-06"
                          x2="-4.91385"
                          y2="6.49234"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FB6609" />
                          <stop offset="1" stopColor="#E40849" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </div>
                <div className=" ">
                  <span className="font-[700] text-[24px] leading-[38px]  text-[#F3F3F3]">
                    Quality
                  </span>
                  <p className="text-[#A7A7A7] mt-2">
                    We take pride in delivering top-quality products and
                    experiences. From our templates to our Smart Cards, we
                    ensure excellence in every detail.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 ml-0 mt-4 lg:mt-0 lg:ml-4">
              <div
                className="px-[40px] py-[40px] xsm:w-[280px] sm:w-[428px] xl:w-[628px] h-auto  md:h-[268px] bg-[rgba(17,17,17,0.60)] rounded-[20px]  "
                style={{ border: "1px solid rgba(32, 32, 32, 0.80) " }}
              >
                <div className="mb-4">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                    >
                      <path
                        d="M21 29.75L26.25 35L35 22.75M49 28C49 39.598 39.598 49 28 49C16.402 49 7 39.598 7 28C7 16.402 16.402 7 28 7C39.598 7 49 16.402 49 28Z"
                        stroke="url(#paint0_linear_4078_8297)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4078_8297"
                          x1="49"
                          y1="7"
                          x2="2.08615"
                          y2="13.4923"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FB6609" />
                          <stop offset="1" stopColor="#E40849" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className="mt-[-4rem] absolute ml-[1.2rem]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                    >
                      <circle
                        opacity="0.2"
                        cx="21"
                        cy="21"
                        r="21"
                        fill="url(#paint0_linear_4023_68798)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4023_68798"
                          x1="42"
                          y1="2.56177e-06"
                          x2="-4.91385"
                          y2="6.49234"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FB6609" />
                          <stop offset="1" stopColor="#E40849" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </div>
                <div className=" ">
                  <span className="font-[700] text-[24px] leading-[38px]  text-[#F3F3F3]">
                    Simplicity
                  </span>
                  <p className="text-[#A7A7A7] mt-2">
                    We believe in making the complex simple. Our tools are
                    intuitive, our designs are clean, and our processes are
                    hassle-free.
                  </p>
                </div>
              </div>
              <div
                className="px-[40px] py-[40px] xsm:w-[280px] sm:w-[428px] xl:w-[628px] h-auto  md:h-[268px] bg-[rgba(17,17,17,0.60)] rounded-[20px]  "
                style={{ border: "1px solid rgba(32, 32, 32, 0.80) " }}
              >
                <div className="mb-4">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                    >
                      <path
                        d="M36.3777 33.5291C36.6212 34.5632 36.75 35.6416 36.75 36.75C36.75 44.482 30.482 50.75 22.75 50.75V39.5508M36.3777 33.5291C45.0903 27.1626 50.75 16.8671 50.75 5.25C39.1334 5.25049 28.8388 10.9103 22.4728 19.6228M36.3777 33.5291C32.3911 36.4422 27.7652 38.5327 22.75 39.5508M22.4728 19.6228C21.4381 19.379 20.3591 19.25 19.25 19.25C11.518 19.25 5.25 25.518 5.25 33.25H16.4517M22.4728 19.6228C19.56 23.6093 17.4697 28.235 16.4517 33.25M22.75 39.5508C22.5087 39.5997 22.2665 39.6462 22.0235 39.6902C19.9073 38.0123 17.9898 36.0948 16.3119 33.9786C16.3559 33.7349 16.4026 33.492 16.4517 33.25M11.2278 38.8284C8.66165 40.7427 7 43.8023 7 47.25C7 47.8027 7.0427 48.3454 7.12498 48.875C7.6546 48.9573 8.19732 49 8.75 49C12.1977 49 15.2573 47.3383 17.1716 44.7722M38.5 21C38.5 22.933 36.933 24.5 35 24.5C33.067 24.5 31.5 22.933 31.5 21C31.5 19.067 33.067 17.5 35 17.5C36.933 17.5 38.5 19.067 38.5 21Z"
                        stroke="url(#paint0_linear_4078_254)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4078_254"
                          x1="50.75"
                          y1="5.25"
                          x2="-0.0733434"
                          y2="12.2834"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FB6609" />
                          <stop offset="1" stopColor="#E40849" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className="mt-[-4rem] absolute ml-[1.2rem]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                    >
                      <circle
                        opacity="0.2"
                        cx="21"
                        cy="21"
                        r="21"
                        fill="url(#paint0_linear_4023_68798)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4023_68798"
                          x1="42"
                          y1="2.56177e-06"
                          x2="-4.91385"
                          y2="6.49234"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FB6609" />
                          <stop offset="1" stopColor="#E40849" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </div>
                <div className=" ">
                  <span className="font-[700] text-[24px] leading-[38px]  text-[#F3F3F3]">
                    Innovation
                  </span>
                  <p className="text-[#A7A7A7] mt-2">
                    We're committed to pushing boundaries, exploring new
                    horizons, and staying at the forefront of technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row px-2 xsm2:px-5 md:px-10 xl:px-20 gap-5 xl:gap-10 w-full pt-5 md:pt-8  ">
          <div className="flex-[1.2] font-[800] text-[40px] leading-[56px] md:text-[32px] md:leading-[40px] xl:text-[40px] xl:leading-[56px] text-[#0A0003]">
            Join Us on Our Journey
          </div>
          <div className="flex-[1] mt-auto font-[500] text-[18px] leading-[32px] md:text-[16px] md:leading-[26px] lg:text-[18px] lg:leading-[32px]">
            We invite you to be a part of our story, to experience the Qviq
            difference, and to explore the boundless possibilities of digital
            connection. Together, we'll shape a future where every connection
            counts, and networking becomes an art form.
          </div>
        </div>

        <div className="pb-16 my-10 xsm2:mt-[11rem] md:mt-[14rem] lg:mt-[11rem] xl:mt-24 2xl:mt-[8rem]">
          <Carousel
            data={demoComment}
            leftPosition={"left-2 md:left-[25%] lg:left-10"}
            rightPosition={"right-2 md:right-[25%] lg:right-10"}
            infinite={true}
            autoplay={true}
            dots={false}
          />
        </div> 

        <div className="flex py-[28px] px-[20px] md:py-[50px] md:px-[50px] lg:py-[80px] lg:px-[80px] bg-[#0A0003] relative overflow-hidden">
          <div className="z-[2]">
            <div className="font-[900] w-[16rem] flex flex-col text-base sm:w-full xsm2:text-[20px] leading-[28px] md:text-[30px] md:leading-[36px]  lg:text-[40px] lg:leading-[64px] text-white  pb-8">
              <p>Have a question?</p>{" "}
              <p className="sm:w-full w-[200px]">
                Our team is happy to assist you
              </p>
            </div>
            <PrimaryButton3
              onClick={() => {
                navigate.push("/contact");
              }}
              text="Contact Us"
              icon={<HiChevronRight />}
            />
          </div>

          <div className="absolute bottom-[-5%] right-[10%] h-[140px] w-[143px] blur-[50px] md:w-[283px] sm:h-[276px] rounded-[283px] bg-[linear-gradient(210deg,rgba(228,8,73,0.80)39.19%,rgba(251,102,9,0.80)78.88%)] md:blur-[120px] z-[0]"></div>
          <Image
            className="z-[1] w-[266px] h-[266px] lg:w-[787px] lg:h-[787px] md:w-[34rem] md:h-[34rem] sm:w-[30rem] sm:h-[30rem] xsm2:w-[26rem] xsm2:h-[26rem] xsm:w-[20rem] xsm:h-[20rem] absolute bottom-[-66%] xsm2:bottom-[-100%] sm:bottom-[-142%] md:bottom-[-110%] right-[-12%] xsm2:right-[-15%] sm:right-[-10%] md:right-[-8%] lg:right-[-5%]"
            src={require("./assets/Saly-7.png")}
            alt="phone"
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
