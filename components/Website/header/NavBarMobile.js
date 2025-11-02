import React, { useContext, useState, useEffect } from "react";
import * as fa from "react-icons/fa";
import * as hi from "react-icons/hi";
import * as hi2 from "react-icons/hi2";
import logo from "../../Image/tapopmobile.png";
import PrimaryButton2 from "../../UiComponents/PrimaryButton2";
import Sidebar from "./Sidebar";
import { UserContext } from "../../Contexts/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NavbarMobile = (props) => {
  const [sideBarToggle, setSideToggle] = useState(false);
  const navigate = useRouter();
  const { username, cart } = useContext(UserContext);
  const background = props.background;

  useEffect(() => {
    const yourElement = document.getElementById("hidescroll");
    const body = document.body

    if (yourElement) {
      if (sideBarToggle) {
        yourElement.style.overflow = "hidden";
        body.style.overflow = "hidden"
      } else {
        yourElement.style.overflow = "auto";
        body.style.overflow = "auto"
      }
    }
  }, [sideBarToggle]);

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

  return (
    <>
      <div
        className={`flex flex-col justify-center sticky top-0 h-[80px] text-[${
          props.color ? "text-white" : "text-black"
        }]   ${
          props.color ? "text-white" : "text-black"
        }  px-2 xsm:px-5 w-screen ${sideBarToggle && "bg-black"} md:hidden`}
        style={{
          background: background,
          zIndex: "997",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center h-[48px]">
          <Link href={`/`}>
            <Image
              alt="Image"
              src={props.logo ? props.logo : logo}
              className="w-20 h-auto"
            />
          </Link>
          <div className="ms-auto flex items-center gap-2 xsm:gap-2">
            {username === "" ? (
              <PrimaryButton2
                height={"48px"}
                text="Start your free Trial"
                onClick={() => navigate.push("/signup")}
              />
            ) : (
              <>
                {props.showCart && (
                  <div
                    onClick={() => navigate.push("/cart")}
                    className="w-[56px] h-[56px] flex justify-center items-center rounded-[64px] bg-[var(--shades-white,#FFF)] hover:cursor-pointer"
                  >
                    <div className="text-2xl relative text-[#1A1A1A]">
                      <hi2.HiOutlineShoppingCart />
                      {cart.length > 0 && (
                        <div className=" flex flex-col justify-center items-center absolute top-[-6px] right-[-6px] border border-white bg-[#F54040] text-white w-4 h-4 rounded-full font-[600] text-[8px] ">
                          {cart.length}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <button
                  className={`flex items-center justify-center font-[700] rounded-[100px] border-[#FB6609] px-[30px] ${
                    windowHeight > 700
                      ? "smd:text-[18px] text-[16px] smd:w-[120px] w-[90px] smd:h-[56px] h-[48px] smd:border-[3px] border-[2px]"
                      : "text-[16px] w-[90px] h-[48px] border-[2px]"
                  }`}
                  style={{
                    border:
                      "2px solid var(--primary-primary-gradient, #FB6609)",
                  }}
                  onClick={() => {
                    navigate.push(`/selectprofile/${username}`);
                  }}
                >
                  <span
                    className={`${props.color ? "text-white" : "add-icon"}`}
                  >
                    Admin
                  </span>
                </button>
              </>
            )}

            <div
              className={`w-[48px] h-[48px] flex justify-center items-center rounded-[64px] ${
                background ? "bg-[rgba(255,255,255,0.08)" : "bg-white"
              } `}
              style={{
                cursor: "pointer",
                boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.08)",
              }}
              onClick={() => setSideToggle(!sideBarToggle)}
            >
              <span className="text-xl">
                {sideBarToggle ? <hi2.HiXMark /> : <hi2.HiBars3 />}
              </span>
            </div>
          </div>
        </div>
      </div>
      {sideBarToggle && <Sidebar setSideToggle={setSideToggle} />}
    </>
  );
};

export default NavbarMobile;
