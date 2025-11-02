import React, { useContext, useState } from "react";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import { UserContext } from "../Contexts/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Footer = () => {
  const navigate = useRouter();
  const { username } = useContext(UserContext);
  const [modalTC, setModalTC] = useState(false);
  const [modalPP, setModalPP] = useState(false);

  function toggleModalTC() {
    setModalTC((prev) => !prev);
  }
  function toggleModalPP() {
    setModalPP((prev) => !prev);
  }
  return (
    <div
      className="bg-[#0A0003] Plus-Jakarta-Sans-font-div"
      style={{ outline: "solid 2px #0A0003" }}
    >
      <div className="w-full h-full relative overflow-hidden px-[10px] xsm:px-[20px] py-[28px] md:px-[30px] lg:px-[80px] md:pt-[40px] md:pb-[60px]">
        <div
          className="w-[120px] h-[257px] top-[34rem] blur-[40px] left-[5rem] xsm:top-[32rem] absolute sm2:left-[17rem] sm:left-[15rem] xsm:left-[8rem] xsm2:left-[12rem] rounded-[257px] md:w-[386px] md:left-[38vw] md:top-[7rem] md:h-[951px] md:rounded-[951px] opacity-[0.8] md:blur-[100px]"
          style={{
            transform: "rotate(-90deg)",
            background:
              "linear-gradient(267deg,rgba(228,8,73,0.50)19.78%,rgba(251,102,9,0.50)98.35%)",
            zIndex: "50",
          }}
        ></div>
        <Image
          className="h-[36px] w-auto"
          src={require("../Images/tapopLogo.png")}
          alt="logo"
        />
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b-[1px] border-b-[#1a1a1a] py-[40px]">

          <div className="flex md:hidden flex-row w-full pb-[10px] font-[400] text-[16px] text-[#FFFF]">
            <div className="w-full flex flex-col ml-[20px] gap-[32px]">
              <Link
                className="text-start"
                href={"/templates"}
                onClick={() => {
                  navigate.push("/templates");
                }}
              >
                Templates
              </Link>
              <Link
                className="text-start"
                href={"/qviqtap"}
                onClick={() => {
                  navigate.push("/qviqtap");
                }}
              >
                QviqTap
              </Link>
              <Link
                className="text-start "
                href={"/about"}
                onClick={() => {
                  navigate.push("/about");
                }}
              >
                About Us
              </Link>
            </div>
            <div className="w-full flex flex-col gap-[32px]">
              <Link
                className="text-start"
                href={"/pricing"}
                onClick={() => {
                  navigate.push("/pricing");
                }}
              >
                Pricing
              </Link>
              <Link
                className="text-start"
                href={"/contact"}
                onClick={() => {
                  navigate.push("/contact");
                }}
              >
                Contact
              </Link>
              <Link
                className="text-start"
                href={"/learn"}
                onClick={() => {
                  navigate.push("/learn");
                }}
              >
                Learn
              </Link>
            </div>
          </div>

          <div className="md:flex hidden flex-col md:flex-row w-fit md:items-center gap-[32px] font-[400] text-[16px] text-[#FFFF] leading-[16px]">
            <Link
              className="text-start"
              href={"/templates"}
              onClick={() => {
                navigate.push("/templates");
              }}
            >
              Templates
            </Link>
            <Link
              className="text-start"
              href={"/qviqtap"}
              onClick={() => {
                navigate.push("/qviqtap");
              }}
            >
              QviqTap
            </Link>
            <Link
              className="text-start "
              href={"/about"}
              onClick={() => {
                navigate.push("/about");
              }}
            >
              About Us
            </Link>
            <Link
              className="text-start"
              href={"/pricing"}
              onClick={() => {
                navigate.push("/pricing");
              }}
            >
              Pricing
            </Link>
            <Link
              className="text-start"
              href={"/contact"}
              onClick={() => {
                navigate.push("/contact");
              }}
            >
              Contact
            </Link>
            <Link
              className="text-start"
              href={"/learn"}
              onClick={() => {
                navigate.push("/learn");
              }}
            >
              Learn
            </Link>
          </div>

          <div className="flex gap-2 xsm:gap-[16px] md:gap-[20px] mt-[24px] md:mt-[0]">
            {username === "" ? (
              <Link
                className="flex flex-col justify-center items-center font-[600] text-[18px]  rounded-[100px] py-[7px] px-[32px] xsm:px-[24px] text-white w-full md:w-[113px] h-[56px]"
                style={{
                  border: "2px solid var(--primary-primary-gradient, #FB6609)",
                }}
                href={"/login"}
              >
                Login
              </Link>
            ) : (
              <button
                className="font-[600] bg-[#f3f3f3] rounded-[100px] py-[10] px-[24px] w-full md:w-fit h-[56px] border border-black"
                onClick={() => {
                  navigate.push(`/selectprofile/${username}`);
                }}
              >
                My Accounts
              </button>
            )}
            {username === "" && (
              <div className="w-full h-[56px]">
                <PrimaryButton2
                  width={"100%"}
                  height={"56px"}
                  onClick={() => navigate.push("/signup")}
                  text="Try for Free"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-[40px]">
          <div className="flex gap-[12px] md:gap-5 lg:gap-[40px] w-full overflow-hidden">
            <Link href="https://www.linkedin.com/company/tapop/">
              <div className="rounded-full bg-[#313030] p-[16px]">
                {/* //facebook */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 9H17.5L17 11H13V20H11V11H7V9H11V7.128C11 5.345 11.186 4.698 11.534 4.046C11.875 3.40181 12.4018 2.87501 13.046 2.534C13.698 2.186 14.345 2 16.128 2C16.65 2 17.108 2.05 17.5 2.15V4H16.128C14.804 4 14.401 4.078 13.99 4.298C13.686 4.46 13.46 4.686 13.298 4.99C13.078 5.401 13 5.804 13 7.128V9Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Link>
            <Link href="https://www.instagram.com/qviq.io/">
              <div className="rounded-full bg-[#313030] p-[16px]">
                {/* //instagram */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75ZM12 4C9.526 4 9.122 4.007 7.971 4.058C7.187 4.095 6.661 4.2 6.173 4.39C5.739 4.558 5.426 4.759 5.093 5.093C4.78001 5.3954 4.53935 5.76458 4.389 6.173C4.199 6.663 4.094 7.188 4.058 7.971C4.006 9.075 4 9.461 4 12C4 14.474 4.007 14.878 4.058 16.029C4.095 16.812 4.2 17.339 4.389 17.826C4.559 18.261 4.759 18.574 5.091 18.906C5.428 19.242 5.741 19.443 6.171 19.609C6.665 19.8 7.191 19.906 7.971 19.942C9.075 19.994 9.461 20 12 20C14.474 20 14.878 19.993 16.029 19.942C16.811 19.905 17.338 19.8 17.826 19.611C18.259 19.442 18.574 19.241 18.906 18.909C19.243 18.572 19.444 18.259 19.61 17.829C19.8 17.336 19.906 16.809 19.942 16.029C19.994 14.925 20 14.539 20 12C20 9.526 19.993 9.122 19.942 7.971C19.905 7.189 19.8 6.661 19.61 6.173C19.4593 5.765 19.2191 5.39596 18.907 5.093C18.6047 4.77985 18.2355 4.53917 17.827 4.389C17.337 4.199 16.811 4.094 16.029 4.058C14.925 4.006 14.539 4 12 4ZM12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Link>
            <Link href="https://www.linkedin.com/company/tapop/">
              <div className="rounded-full bg-[#313030] p-[16px]">
                {/* //linkedin */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.94 5.00002C6.93974 5.53046 6.72877 6.03906 6.35351 6.41394C5.97825 6.78883 5.46944 6.99929 4.939 6.99902C4.40857 6.99876 3.89997 6.78779 3.52508 6.41253C3.1502 6.03727 2.93974 5.52846 2.94 4.99802C2.94027 4.46759 3.15124 3.95899 3.5265 3.5841C3.90176 3.20922 4.41057 2.99876 4.941 2.99902C5.47144 2.99929 5.98004 3.21026 6.35492 3.58552C6.72981 3.96078 6.94027 4.46959 6.94 5.00002ZM7 8.48002H3V21H7V8.48002ZM13.32 8.48002H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.90002 14.94 7.13002 13.28 10.16L13.32 8.48002Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Link>
            <Link href="https://wa.me/+919999396619">
              <div className="rounded-full bg-[#313030] p-[16px]">
                {/* //whatsapp */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.25301 18.494L7.97701 18.917C9.19795 19.6291 10.5866 20.0029 12 20C13.5823 20 15.129 19.5308 16.4446 18.6518C17.7602 17.7727 18.7855 16.5233 19.3911 15.0615C19.9966 13.5997 20.155 11.9911 19.8463 10.4393C19.5376 8.88743 18.7757 7.46197 17.6569 6.34315C16.538 5.22433 15.1126 4.4624 13.5607 4.15372C12.0089 3.84504 10.4004 4.00346 8.93855 4.60896C7.47674 5.21447 6.22731 6.23984 5.34826 7.55544C4.46921 8.87103 4.00001 10.4177 4.00001 12C4.00001 13.436 4.37701 14.813 5.08401 16.024L5.50601 16.748L4.85301 19.149L7.25301 18.494ZM2.00401 22L3.35601 17.032C2.46515 15.5049 1.99711 13.768 2.00001 12C2.00001 6.477 6.47701 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C10.2328 22.0029 8.49667 21.5352 6.97001 20.645L2.00401 22ZM8.39101 7.308C8.52501 7.298 8.66001 7.298 8.79401 7.304C8.84801 7.308 8.90201 7.314 8.95601 7.32C9.11501 7.338 9.29001 7.435 9.34901 7.569C9.64701 8.245 9.93701 8.926 10.217 9.609C10.279 9.761 10.242 9.956 10.124 10.146C10.0429 10.2745 9.95507 10.3986 9.86101 10.518C9.74801 10.663 9.50501 10.929 9.50501 10.929C9.50501 10.929 9.40601 11.047 9.44401 11.194C9.45801 11.25 9.50401 11.331 9.54601 11.399L9.60501 11.494C9.86101 11.921 10.205 12.354 10.625 12.762C10.745 12.878 10.862 12.997 10.988 13.108C11.456 13.521 11.986 13.858 12.558 14.108L12.563 14.11C12.648 14.147 12.691 14.167 12.815 14.22C12.877 14.246 12.941 14.269 13.006 14.286C13.0732 14.3031 13.1439 14.2999 13.2093 14.2767C13.2746 14.2536 13.3316 14.2116 13.373 14.156C14.097 13.279 14.163 13.222 14.169 13.222V13.224C14.2193 13.1771 14.2791 13.1415 14.3443 13.1196C14.4095 13.0977 14.4786 13.09 14.547 13.097C14.607 13.101 14.668 13.112 14.724 13.137C15.255 13.38 16.124 13.759 16.124 13.759L16.706 14.02C16.804 14.067 16.893 14.178 16.896 14.285C16.9 14.352 16.906 14.46 16.883 14.658C16.851 14.917 16.773 15.228 16.695 15.391C16.6416 15.5022 16.5707 15.6042 16.485 15.693C16.3841 15.7989 16.2736 15.8954 16.155 15.981C16.114 16.0119 16.0723 16.0419 16.03 16.071C15.9056 16.1499 15.7778 16.2233 15.647 16.291C15.3895 16.4278 15.1052 16.5063 14.814 16.521C14.629 16.531 14.444 16.545 14.258 16.535C14.25 16.535 13.69 16.448 13.69 16.448C12.2683 16.074 10.9534 15.3735 9.85001 14.402C9.62401 14.203 9.41501 13.989 9.20101 13.776C8.31101 12.891 7.63901 11.936 7.23101 11.034C7.02218 10.5913 6.90938 10.1094 6.90001 9.62C6.89589 9.01285 7.09436 8.42167 7.46401 7.94C7.53701 7.846 7.60601 7.748 7.72501 7.635C7.85201 7.515 7.93201 7.451 8.01901 7.407C8.13469 7.34903 8.26088 7.31502 8.39001 7.307L8.39101 7.308Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Link>
            <Link href="mailto:support@qviq.io">
              <div className="rounded-full bg-[#313030] p-[16px]">
                {/* //mail */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM20 7.238L12.072 14.338L4 7.216V19H20V7.238ZM4.511 5L12.061 11.662L19.502 5H4.511Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Link>
          </div>
          <div className="flex flex-col text-white min-w-fit md:flex-row md:items-center mt-[28px] md:mt-0 gap-[24px]  md:gap-[32px] font-[400] text-[16px] leading-[16px]">
            <Link href={"/term-and-conditions"}>Terms & conditions</Link>
            <Link href={"/privacy-policy"}>Privacy policy</Link>
          </div>
        </div>
        <div className="flex justify-between gap-[20px] mt-[36px] md:mt-[58px]">
          <div className="font-[500] text-[#A7A7A7] text-[12px] sm:text-[18px] leading-[20px]">
            Owned by Tapop Smart Tech Private Limited
          </div>
          <div className="font-[500] text-[#A7A7A7] text-[12px] sm:text-[18px] leading-[20px]">
            © Copyright 2025 All rights reserved
          </div>
        </div>
      </div>
      {/* {modalTC && (
        <Modal
          label="Terms & conditions"
          showSpan={false}
          onClick={toggleModalTC}
        >
          <TermAndConditions />
        </Modal>
      )}
      {modalPP && (
        <Modal label="Privacy policy" showSpan={false} onClick={toggleModalPP}>
          <PrivacyPolicy />
        </Modal>
      )} */}
    </div>
  );
};

export default Footer;
