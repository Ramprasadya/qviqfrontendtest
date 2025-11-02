import React, { useState, useEffect, useContext } from "react";
import logo from "../Images/tapopLogo.png";
import * as hi from "react-icons/hi";
import * as hi2 from "react-icons/hi2";
import "./SideBar.css";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { UserContext } from "../Contexts/context";
import { FaArrowRight } from "react-icons/fa";
import cardImg from "./Mockup.svg";
import { HiOutlineMail } from "react-icons/hi";

// navbar function starts from here
function SideBar(props) {
  const navigate = useRouter();

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

  const profile = { profile: useParams().userName };
  const { userSignOut } = useContext(UserContext);
  // console.log(profile)
  const arr = [
    {
      link: `/selectprofile/${profile.profile}`,
      // link:props.location,
      icon: <hi2.HiOutlineSquares2X2 />,
      text: "My Accounts",
      location: profile.type,
      editProfilePath: props.userId,
    },
    {
      link: `/dashboard/${profile.profile}`,
      icon: <hi.HiOutlineChartBar />,
      text: "Dashboard",
    },

    {
      link: `/appointement/${profile.profile}`,
      icon: <hi.HiOutlineCalendar />,
      text: "Appointements",
    },
    {
      link: `/analytics/${profile.profile}`,
      icon: <hi2.HiOutlineChartBarSquare />,
      text: "Analytics",
    },
    {
      link: `/connectTable/${profile.profile}`,
      icon: <hi2.HiOutlineUsers />,
      text: "Connections",
    },
    {
      link: `/showreview/${profile.profile}`,
      icon: <hi.HiOutlineStar />,
      text: "Reviews",
    },
    // {
    //   link: `/emailsignature/${profile.profile}`,
    //   icon: <HiOutlineMail />,
    //   text: "Email Signature",
    // },
    {
      link: `/devices/${profile.profile}`,
      icon: <hi2.HiOutlineCreditCard />,
      text: "Devices",
    },
    {
      link: `/customdomain/${profile.profile}`,
      icon: <hi2.HiOutlineGlobeAlt />,
      text: "Custom Domain",
    },
  ];

  // mapping upper list array
  // const finalArr = arr.map((item, index) => (
  //   <div className="navlink-div" key={index}>
  //     <Link
  //       href={item.link}
  //       // className="link-item flex items-center rounded-xl hover:bg-navBack hover:text-white"

  //       className={
  //         item.location
  //           ? "active rounded-xl hover:bg-navBack hover:text-white"
  //           : usePathname() === item.link
  //                 ? "active rounded-xl hover:bg-navBack hover:text-white"
  //                 : "notActive rounded-xl hover:bg-navBack hover:text-white"
  //       }
  //     >
  //       <span className="list-icon">{item.icon}</span>
  //       <div className="flex items">
  //         <p className="list-text">{item.text}</p>
  //       </div>
  //     </Link>
  //   </div>
  // ));

  const finalArr = (
    <>
      <div className="navlink-div">
        <Link
          href={arr[0].link}
          // className="link-item flex items-center rounded-xl hover:bg-navBack hover:text-white"

          className={
            usePathname() === arr[0].link
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : usePathname().length > 30
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : "notActive rounded-xl hover:bg-navBack hover:text-white"
          }
        >
          <span className="list-icon">{arr[0].icon}</span>
          <div className="flex items">
            <p className="list-text">{arr[0].text}</p>
          </div>
        </Link>
      </div>
      <div className="navlink-div">
        <Link
          href={arr[1].link}
          // className="link-item flex items-center rounded-xl hover:bg-navBack hover:text-white"

          className={
            arr[1].location
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : usePathname() === arr[1].link
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : "notActive rounded-xl hover:bg-navBack hover:text-white"
          }
        >
          <span className="list-icon">{arr[1].icon}</span>
          <div className="flex items">
            <p className="list-text">{arr[1].text}</p>
          </div>
        </Link>
      </div>
      <div className="navlink-div">
        <Link
          href={arr[2].link}
          // className="link-item flex items-center rounded-xl hover:bg-navBack hover:text-white"

          className={
            arr[2].location
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : usePathname() === arr[2].link
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : "notActive rounded-xl hover:bg-navBack hover:text-white"
          }
        >
          <span className="list-icon">{arr[2].icon}</span>
          <div className="flex items">
            <p className="list-text">{arr[2].text}</p>
          </div>
        </Link>
      </div>
      <div className="navlink-div">
        <Link
          href={arr[3].link}
          // className="link-item flex items-center rounded-xl hover:bg-navBack hover:text-white"

          className={
            arr[3].location
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : usePathname() === arr[3].link
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : "notActive rounded-xl hover:bg-navBack hover:text-white"
          }
        >
          <span className="list-icon">{arr[3].icon}</span>
          <div className="flex items">
            <p className="list-text">{arr[3].text}</p>
          </div>
        </Link>
      </div>
      <div className="navlink-div">
        <Link
          href={arr[4].link}
          // className="link-item flex items-center rounded-xl hover:bg-navBack hover:text-white"

          className={
            arr[4].location
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : usePathname() === arr[4].link
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : "notActive rounded-xl hover:bg-navBack hover:text-white"
          }
        >
          <span className="list-icon">{arr[4].icon}</span>
          <div className="flex items">
            <p className="list-text">{arr[4].text}</p>
          </div>
        </Link>
      </div>
      <div className="navlink-div">
        <Link
          href={arr[5].link}
          // className="link-item flex items-center rounded-xl hover:bg-navBack hover:text-white"

          className={
            arr[5].location
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : usePathname() === arr[5].link
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : "notActive rounded-xl hover:bg-navBack hover:text-white"
          }
        >
          <span className="list-icon">{arr[5].icon}</span>
          <div className="flex items">
            <p className="list-text">{arr[5].text}</p>
          </div>
        </Link>
      </div>
      <div className="navlink-div">
        <Link
          href={arr[6].link}
          // className="link-item flex items-center rounded-xl hover:bg-navBack hover:text-white"

          className={
            arr[6].location
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : usePathname() === arr[6].link
              ? "active rounded-xl hover:bg-navBack hover:text-white"
              : "notActive rounded-xl hover:bg-navBack hover:text-white"
          }
        >
          <span className="list-icon">{arr[6].icon}</span>
          <div className="flex items">
            <p className="list-text">{arr[6].text}</p>
          </div>
        </Link>
      </div>
    </>
  );

  function handleLogout() {
    userSignOut();
  }

  return (
    <>
      {/* Sidebar for mobile view */}
      {/* <SidebarMobile profile={profile} linkArr={arr} /> */}

      {/* Sidebar for desktop view */}
      <div className="hidden h-screen md:flex">
        <div className="sb flex flex-col overflow-y-scroll">
          <Link
            href={`/selectprofile/${profile.profile}`}
            className="tapop-logo"
          >
            <Image className="h-[4.5rem]" src={logo} alt="Qviq-logo" />
          </Link>

          {/* upper list */}
          <div>{finalArr}</div>

          {/* bottom list  */}
          <div className="mt-auto mb-2">
            {/* {windowHeight > 870 && ( */}
            <div className="w-full h-[40px]"></div>
            <div className="relative w-full h-[240px] p-[18px] mb-[14px] rounded-[20px] border-[#ffffff15] border-[1px] bg-[#272727] flex flex-col justify-end gap-[15px] ">
              <div
                className="absolute overflow-hidden top-[50%] left-[50%]  w-full h-[240px]"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <div
                  className="absolute z-0 w-[110px] h-[110px] rounded-full top-0 left-0"
                  style={{
                    filter: "blur(50px)",
                    transform: "translate(50%, -20%)",
                    background:
                      "linear-gradient(217deg, #5C53F9 0%, #E40849 100%)",
                  }}
                ></div>
              </div>

              <Image
                alt="qviq logo"
                quality={50}
                src={cardImg}
                className="z-[1] absolute top-0 left-0 h-[160px] w-auto"
                style={{ transform: "translate(10%, -20%)" }}
              />

              <p className="z-[2] text-[#FAFAFA] text-[12px] font-[400]">
                Enhance Your Networking <br />
                Reach with Smart NFC <br />
                Business Cards
              </p>

              <div
                onClick={() => navigate.push("/qviqtap")}
                className="z-[2] bg-white w-[132px] h-[28px] pr-[12px] pl-[14px] py-[100px] sm:py-[12px] flex flex-row items-center gap-[8px] rounded-full hover:pr-[10px] hover:sm:pr-[14px] hover:gap-[16px] transition-[400ms] cursor-pointer active:scale-[95%]"
              >
                <p className="text-[12px] pt-[1px] font-[600]">Explore now</p>
                <FaArrowRight className="text-[12px] font-[600]" />
              </div>
            </div>
            {/* )} */}

            <div className="navlink-div">
              <Link
                href={`/contact`}
                className={
                  usePathname() === "/contact"
                    ? "active rounded-xl hover:bg-navBack hover:text-white"
                    : "notActive rounded-xl hover:bg-navBack hover:text-white"
                }
              >
                <span className="list-icon">
                  <hi.HiPhone />
                </span>
                <div className="flex items">
                  <p className="list-text">Help center</p>
                </div>
              </Link>
            </div>

            <div className="navlink-div" onClick={handleLogout}>
              <Link
                href="/login"
                className={
                  usePathname() === "/login"
                    ? "active rounded-xl hover:bg-navBack hover:text-white"
                    : "notActive rounded-xl hover:bg-navBack hover:text-white"
                }
              >
                <span className="list-icon">
                  <hi2.HiArrowLeftOnRectangle />
                </span>
                <div className="flex items">
                  <p className="list-text">Logout</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* <main>{props.children}</main> */}
      </div>
    </>
  );
}

export default SideBar;
