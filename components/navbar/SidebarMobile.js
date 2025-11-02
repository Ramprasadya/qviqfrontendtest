import React, { useContext, useEffect, useState, useRef } from "react";
import * as hi from "react-icons/hi";
import * as hi2 from "react-icons/hi2";
import "./SideBar.css";
import { UserContext } from "../Contexts/context";
import axios from "axios";
import { serverUrl } from "../../config";
import { useRouter, useParams, usePathname } from "next/navigation";
import Link from "next/link";
import "./SideBar.css";
import { getCookie } from "../utils";
import { HiOutlineMail } from "react-icons/hi";

const SidebarMobile = (props) => {
  
  const router = useRouter();
  const navigate = (page) => {
    router.push(page);
  };

  const profile = {profile:useParams().userName};
  const sidebarRef = useRef(null);
  const sideBarToggleButtonRef = props.sideBarToggleButtonRef;
  const isSideBarOpen = props.isSideBarOpen;
  const sideBarToggle = props.sideBarToggle;
  const { userFirstName, checkVariable, userSignOut } = useContext(UserContext);

  const LinkArr = [
    {
      link: `/selectprofile/${profile.profile}`,
      // link:props.location,
      icon: <hi2.HiOutlineSquares2X2 />,
      text: "My Accounts",
      location: profile.type,
    },
    {
      link: `/dashboard/${profile.profile}`,
      icon: <hi.HiOutlineChartBar />,
      text: "Dashboard",
    },

    // {
    //   link: `/appointement/${profile.profile}`,
    //   icon: <hi.HiOutlineCalendar />,
    //   text: "Appointements",
    // },
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

  const handleLogout = () => {
    userSignOut();
    navigate("/login");
  };

  // profile image
  const [type, setType] = useState("");
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/profile/profiletype/${profile.profile}`
      );
      if (res.data.length !== 0) {
        setType(res.data[0]._id);
      } else {
        setType("");
      }
    } catch (error) {
      //console.log(error?.response);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [checkVariable]);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const getData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await axios.get(
        `${serverUrl}/connect/getDetail/${profile.profile}/${type}`,
        config
      );
      if (data.length !== 0) {
        setImage(data[0].profileimage);
        setName(data[0].firstName);
      } else {
        setImage("");
        setName("");
      }
    } catch (error) {
      //console.log(error?.response?.data?.error);
      navigate("/login");
    }
  };
  useEffect(() => {
    if (type) {
      getData();
    } else {
      setImage("");
      setName("");
    }
  }, [type, checkVariable]);

  // close dropdown when clicked outside
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        sidebarRef.current !== null &&
        !sidebarRef.current.contains(e.target) &&
        sideBarToggleButtonRef.current !== null &&
        !sideBarToggleButtonRef.current.contains(e.target)
      ) {
        sideBarToggle();
      }
    };
    if (isSideBarOpen) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isSideBarOpen]);

  return (
    <div>
      {isSideBarOpen && (
        <div
          className="fixed w-screen h-screen top-0 left-0 bg-transparent"
          style={{ zIndex: "998" }}
        ></div>
      )}
      <div
        className="flex flex-col rounded-s-2xl fixed overflow-y-auto h-screen xsm:w-[17.5rem] sm:w-1/2 top-0 right-0 text-white backdrop-blur-md transition-all duration-300 md:hidden"
        style={{
          background: "rgba(26, 26, 26, 0.8)",
          transform: `translate(${isSideBarOpen ? "0" : "100%"})`,
          zIndex: "999",
          paddingBottom: "150px",
        }}
        ref={sidebarRef}
      >
        <div className="flex items-center gap-3 p-5 border-b">
          <img
            src={image ? image : require("../ProfileTemplates/images/image1.jpg").default.src}
            alt=""
            className="rounded-full w-12 h-12"
          />
          <p className="font-semibold text-sm">
            {name !== "" ? name : userFirstName}
          </p>
          <span className="ms-auto" onClick={sideBarToggle}>
            <hi2.HiOutlineXMark />
          </span>
        </div>
        <div className="flex flex-col p-5 border-b">
          {LinkArr.map((item, index) => (
            <div key={index}>
              <Link
                href={item.link}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-white hover:bg-navBack active:bg-navBack" ${usePathname() === item.link? "active":""}`}
                onClick={sideBarToggle}
              >
                <span>{item.icon}</span>
                <p>{item.text}</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col p-5 border-b">
          <Link
            href={`/myaccount/${profile.profile}`}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-navBack active:bg-navBack`}
            onClick={sideBarToggle}
          >
            <span>
              <hi.HiOutlineUserCircle />
            </span>
            <p>Account Settings</p>
          </Link>
          <Link
            href={`/managesubscription/${profile.profile}`}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-navBack active:bg-navBack`}
            onClick={sideBarToggle}
          >
            <span>
              <hi.HiOutlineCurrencyDollar />
            </span>
            <p>Manage Subscription</p>
          </Link>
        </div>

        <hr />
        <div className="flex flex-col p-5 border-b">
          <Link
            href="/contact"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-navBack active:bg-navBack`}
            onClick={sideBarToggle}
          >
            <span>
              <hi.HiPhone />
            </span>
            <p>Help Center</p>
          </Link>
          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-navBack`}
            onClick={() => {
              sideBarToggle();
              handleLogout();
            }}
          >
            <span>
              <hi2.HiArrowLeftOnRectangle />
            </span>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
