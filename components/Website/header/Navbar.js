import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Contexts/context";
import PrimaryButton2 from "../../UiComponents/PrimaryButton2";
import NavbarMobile from "./NavBarMobile";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import "../../UiComponents/iconTextStyle.css";
import "../../UiComponents/UiStyles.css";
import logo1 from "../../Images/TapopLogoBlack.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "./Navbar.css";

const Navbar = (props) => {
  const { cart, username } = useContext(UserContext);
  const navigate = useRouter();

  let background = props.background;

  let color = props.color;
  let logo = props.logo;

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <NavbarMobile
        background={background}
        color={color}
        logo={logo}
        showCart={props.showCart ? true : false}
      />

      <div
        className={`hidden md:flex fixed top-0 left-0 w-full items-center justify-between px-3 lg:px-10 xl:px-20 h-[96px]  text-[${color}] `}
        style={{
          background: background,
          backdropFilter: "blur(20px)",
          zIndex: "997",
        }}
      >
        <button
          onClick={() => {
            navigate.push("/");
          }}
        >
          <Image
            className="h-[50px] w-auto hover:cursor-pointer"
            src={logo ? logo : logo1}
            alt="logo"
          />
        </button>
        <div className="flex items-center h-[100%]">
          <button
            onClick={() => {
              navigate.push("/templates");
            }}
            href={"/templates"}
            id="templates"
            className={`flex flex-col items-center justify-end gap-[30px] w-[100px] lg:w-[115px] h-[100%] text-center hover:font-bold ${
              props.thisPage === "templates" &&
              "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E40849] to-[#FB6609]"
            }`}
          >
            <div className="flex flex-row items-center justify-center gap-[8px]">
              {/* {props.thisPage === "templates" && (
                <div className="blinkBg">
                  <div className="blink"></div>
                </div>
              )} */}

              <p>Templates</p>
            </div>

            {props.thisPage === "templates" ? (
              <div className="w-full h-[3px] bg-gradient-to-r from-[#E40849] to-[#FB6609]"></div>
            ) : (
              <div className="w-full h-[3px]"></div>
            )}
          </button>

          <button
            className={`flex flex-col items-center justify-end gap-[30px] w-[100px] lg:w-[115px] h-[100%] text-center hover:font-bold ${
              props.thisPage === "qviqtap" &&
              "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E40849] to-[#FB6609]"
            }`}
            id="qviqtap"
            href={"/qviqtap"}
            onClick={() => {
              navigate.push("/qviqtap");
            }}
          >
            <div className="flex flex-row items-center justify-center gap-[8px]">
              <div className="blinkBg">
                <div className="blink"></div>
              </div>

              <p>Qviq Tap</p>
            </div>

            {props.thisPage === "qviqtap" ? (
              <div className="w-full h-[3px] bg-gradient-to-r from-[#E40849] to-[#FB6609]"></div>
            ) : (
              <div className="w-full h-[3px]"></div>
            )}
          </button>

          <button
            className={`flex flex-col items-center justify-end gap-[30px] w-[100px] lg:w-[115px] h-[100%] text-center hover:font-bold ${
              props.thisPage === "pricing" &&
              "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E40849] to-[#FB6609]"
            }`}
            href={"/pricing"}
            onClick={() => {
              navigate.push("/pricing");
            }}
            id="pricing"
          >
            <div className="flex flex-row items-center justify-center gap-[8px]">
              {/* {props.thisPage === "pricing" && (
                <div className="blinkBg">
                  <div className="blink"></div>
                </div>
              )} */}

              <p>Pricing</p>
            </div>

            {props.thisPage === "pricing" ? (
              <div className="w-full h-[3px] bg-gradient-to-r from-[#E40849] to-[#FB6609]"></div>
            ) : (
              <div className="w-full h-[3px]"></div>
            )}
          </button>

          <button
            href={"/about"}
            onClick={() => {
              navigate.push("/about");
            }}
            id="about"
            className={`flex flex-col items-center justify-end gap-[30px] w-[100px] lg:w-[115px] h-[100%] text-center hover:font-bold ${
              props.thisPage === "about" &&
              "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E40849] to-[#FB6609]"
            }`}
          >
            <div className="flex flex-row items-center justify-center gap-[8px]">
              {/* {props.thisPage === "about" && (
                <div className="blinkBg">
                  <div className="blink"></div>
                </div>
              )} */}

              <p>About Us</p>
            </div>

            {props.thisPage === "about" ? (
              <div className="w-full h-[3px] bg-gradient-to-r from-[#E40849] to-[#FB6609]"></div>
            ) : (
              <div className="w-full h-[3px]"></div>
            )}
          </button>

          <button
            className={`flex flex-col items-center justify-end gap-[30px] w-[100px] lg:w-[115px] h-[100%] text-center hover:font-bold ${
              props.thisPage === "contact" &&
              "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E40849] to-[#FB6609]"
            }`}
            href={"/contact"}
            onClick={() => {
              navigate.push("/contact");
            }}
            id="contact"
          >
            <div className="flex flex-row items-center justify-center gap-[8px]">
              {/* {props.thisPage === "contact" && (
                <div className="blinkBg">
                  <div className="blink"></div>
                </div>
              )} */}

              <p>Contact</p>
            </div>

            {props.thisPage === "contact" ? (
              <div className="w-full h-[3px] bg-gradient-to-r from-[#E40849] to-[#FB6609]"></div>
            ) : (
              <div className="w-full h-[3px]"></div>
            )}
          </button>

          {/* <button
            className={`flex flex-col items-center justify-end gap-[30px] w-[100px] lg:w-[115px] h-[100%] text-center hover:font-bold ${
              props.thisPage === "learn" &&
              "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E40849] to-[#FB6609]"
            }`}
            on
            href={"/learn"}
            id="learn"
          >
            <div className="flex flex-row items-center justify-center gap-[8px]">
              <p>Learn</p>
            </div>

            {props.thisPage === "learn" ? (
              <div className="w-full h-[3px] bg-gradient-to-r from-[#E40849] to-[#FB6609]"></div>
            ) : (
              <div className="w-full h-[3px]"></div>
            )}
          </button> */}
          {/* <button
            className="flex flex-col items-center justify-end gap-[30px] w-[100px] lg:w-[115px] h-[100%] text-center hover:font-bold"
            href={"/learn"}
          >
            Learn
          </button> */}
        </div>
        <div className="flex flex-row items-center gap-2 lg:gap-5 relative">
          {props.showCart && (
            <button
              onClick={() => navigate.push("/cart")}
              className="absolute left-[-60px] w-[56px] h-[56px] md4:flex hidden justify-center items-center rounded-[64px] bg-[var(--shades-white,#FFF)] hover:cursor-pointer"
            >
              <div className="text-2xl relative text-[#1A1A1A]">
                <HiOutlineShoppingCart />
                {cart.length > 0 && (
                  <div className=" flex flex-col justify-center items-center absolute top-[-6px] right-[-6px] border border-white bg-[#F54040] text-white w-4 h-4 rounded-full font-[600] text-[8px] ">
                    {cart.length}
                  </div>
                )}
              </div>
            </button>
          )}
          {username === "" ? (
            <PrimaryButton2
              href={`/login`}
              text="Login"
              textColor={props.usedIn === "homepage" ? "white" : "#FB6609"}
              // className="add-icon"
              color="none"
              border="2px solid #FB6609"
              onClick={() => {
                navigate.push("/login");
              }}
            />
          ) : (
            <PrimaryButton2
              onClick={() => {
                navigate.push(`/selectprofile/${username}`);
              }}
              text="Admin"
              textColor={props.usedIn === "homepage" ? "white" : "#FB6609"}
              // className="add-icon"
              color="none"
              border="2px solid #FB6609"
            />
          )}
          {!props.showCart && (
            <>
              {username === "" && (
                <PrimaryButton2
                  text={windowWidth > 1121 ? "Start Your Free Trial" : "Signup"}
                  onClick={() => navigate.push("/signup")}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
