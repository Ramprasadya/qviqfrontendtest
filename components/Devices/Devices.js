"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../navbar/SideBar";
import NavBar from "../navbar/NavBar";
import {
  HiOutlineDocumentDuplicate,
} from "react-icons/hi";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import "./devices.css";
import DeviceTap from "./DeviceTap";
import { useContext } from "react";
import { UserContext } from "../Contexts/context";
import Pimage from "../ProfileTemplates/images/image1.jpg";
import { serverUrl } from "../../config";
import { usePathname, useRouter } from "next/navigation";
import { createQueryString, getCookie } from "@/components/utils";

const Devices = (props) => {
  const [dataUnshared, setDataUnshared] = useState([]);
  const [dataShared, setDataShared] = useState([]);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const profile = {profile:props.userName};
  const navigate = useRouter();
  const fetchProfileData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const { data } = await axios.get(
        `${serverUrl}/profile/profile/${profile.profile}`,
        config
      );
    } catch (error) {
      //console.log(error?.response?.data?.error);
      navigate.push("/login?"+createQueryString(['fromPage'],[usePathname()]));
    }
  };
  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.get(
          `${serverUrl}/device/infoall/${profile.profile}`
        );
        setName(result.data.user[0].name);
        setUserName(result.data.user[0].userName);
        setDataUnshared(result.data.profileUnshared);
        setDataShared(result.data.profileShared);
      } catch (error) {
        //console.log(error?.response?.data?.error);
      }
    }
    fetchProfileData();
    getData();
  }, []);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.screen.width);
  },[]);

  // profile image
  const { checkVariable, userFullName, username } = useContext(UserContext);
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
      //console.log(error?.response?.data?.error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [checkVariable]);

  useEffect(()=>{
    const QRCodeStyling = require("qr-code-styling");
    const qrCode = new QRCodeStyling({
      data: `https://qviqfrontendtest.vercel.app/devices/${userName}`,
      width: 200,
      height: 200,
      dotsOptions: {
        color: "#FFFFFF",
        type: "rounded"
      },
      backgroundOptions: {
        color: "#00000000",
    },
    });
    qrCode.append(document.getElementById("qrimage"));
  });

  const [activeUserName, setActiveUserName] = useState("");
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
        setActiveUserName(data[0].firstName);
      } else {
        setImage("");
        setActiveUserName("");
      }
    } catch (error) {
      //console.log(error?.response?.data?.error);
    }
  };
  useEffect(() => {
    if (type) {
      getData();
    } else {
      setImage("");
      setActiveUserName("");
    }
    
  }, [type, checkVariable]);

  // check device is whether android or iphone
  const [isAndroid, setIsAndroid] = useState(false);
  const [deviceTapOpen, setDeviceTapOpen] = useState(false);

  return (
    <div className="flex h-screen w-full first-container bg-white sm:bg-[#FAFAFA] relative">
      <div className="h-full">
        <SideBar />
      </div>
      <div className="w-full overflow-auto">
        <NavBar text={"Devices"} />
        <div className="m-5 sm:m-6 bg-white sm:bg-[#FAFAFA]">
          <div className="sm:hidden">
            <div className="mb-[1.5rem] text-lg md:text-xl font-[500] hidden md:block">
              Devices
            </div>
            <div className="font-semibold text-[#1A1A1A]">
              Choose a profile to activate
            </div>
          </div>
          <div className="hidden sm:block text-xl font-semibold">
            Your Profile
          </div>
          <div className="flex gap-10 [@media(max-width:1440px)]:flex-col [@media(max-width:1440px)]:gap-0">
            <div className="bg-white md:px-5 pt-6 sm:p-[2.5rem] rounded-[0.5rem] w-full flex flex-col justify-between left-device-container">
              <div>
                {true ? (
                  <div>
                    {dataShared.map((obj, index) => (
                      <div className="active_user_card p-4 sm:p-5" key={index}>
                        <div className="flex justify-center absolute top-[-1rem] w-full text-sm xsm:text-base">
                          <div className="active_tag text-xs">
                            Currently Active
                          </div>
                        </div>
                        <img
                          className="w-[3rem] h-[3rem] xsm:w-[4rem] xsm:h-[4rem] rounded-full"
                          src={image ? image : Pimage}
                        />
                        <div className="ml-4">
                          <div className="text-base font-[600]">
                            {activeUserName ? activeUserName : userFullName}
                          </div>
                          <div className="card_tag bg-[#E5E2FC] text-[#5440D0] text-xs">
                            {obj.type}
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* <div className="info_card">
                      <div className="w-[1.25rem] h-[1.25rem] flex items-center">
                        <HiInformationCircle />
                      </div>
                      <div className="ml-[1.125rem] text-xs xsm:text-[0.875rem] leading-[1.375rem] font-[500]">
                        To change or deactivate this profile from your Qviq
                        card, scan the following QR code or copy and paste the
                        link into your phone.
                      </div>
                    </div> */}
                  </div>
                ) : (
                  <div className="buy_card">
                    <div className="text-base font-[400] mb-[1.25rem]">
                      Don’t have a Qviq device? Explore and buy Qviq devices,
                      and many other products.
                    </div>
                    <PrimaryButton2 text={`Buy Qviq Device`} />
                  </div>
                )}
                {dataUnshared.map((obj, index) => (
                  <div className="user_card p-4 sm:p-5" key={index}>
                    <img
                      className="w-[3rem] h-[3rem] xsm:w-[4rem] xsm:h-[4rem] rounded-full"
                      src={image ? image : Pimage}
                    />
                    <div className="ml-4">
                      <div className="text-base font-[600]">{name}</div>
                      <div className="card_tag bg-[#FDE4FF] text-[#AC3FB6] text-xs">
                        {obj.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="block sm:hidden w-full mt-4">
                <PrimaryButton2
                  text={`Activate Profile`}
                  width={"100%"}
                  onClick={() => {
                    setDeviceTapOpen(true);
                  }}
                />
              </div>
            </div>
            {/* <div className="block sm:hidden absolute left-0 bottom-0 mx-5 my-8" style={{width:'calc(100% - 40px)'}}><PrimaryButton2 text={`Activate Profile`} width={'100%'}/></div> */}
            {/* <div className="user_card">
                                <img className='w-[4rem] h-[4rem] rounded-full' src='https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=594&q=80' />
                                <div className='ml-4'>
                                    <div className='text-base font-[600]'>{name}</div>
                                    <div className='card_tagbg-[#D8F6FF] text-[#2298BD]'>Portfolio</div>
                                </div>
                            </div> */}
            <div className="bg-white px-[2.5rem] py-[2rem] rounded-[0.5rem] h-fit w-full hidden sm:block">
              <div className="text-xl font-[600]">
                Connect your profile to Qviq device
              </div>
              <div className="[@media(max-width:825px)]:w-full w-[29rem] p-[1rem] bg-[#FAFAFA] rounded-[0.75rem]">
                <div className="text-base font-[400]">
                  To activate and connect your Qviq device with your profile.{" "}
                </div>
                <li className="text-base font-[500] ml-[0.5rem]">
                  Open this page on your NFC-enabled phone,
                </li>
                <div className="text-base font-[500] ml-[2rem]">
                  or copy and paste this URL into it.
                </div>
                <div className="copy_button">
                  <div className="text-[0.875rem] leading-[1.375rem] font-[400]">
                    https://qviqfrontendtest.vercel.app/devices/{userName}
                  </div>
                  <HiOutlineDocumentDuplicate
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://qviqfrontendtest.vercel.app/devices/${userName}`
                      )
                    }
                    className="w-[1.25rem] h-[1.25rem] hover:cursor-pointer"
                  />
                </div>
                <div className="flex flex-col items-center w-full pt-0 p-[1rem] mt-[0.5rem] bg-[#FAFAFA] rounded-[0.75rem]">
                  <div className="text-lg font-[500] text-center">
                    Or<br/>Scan This QR From Your Phone.
                  </div>
                  <div className="text-center mt-4 h-[250px] rounded-2xl p-[25px]" style={{background:"var(--primary-primary-gradient, linear-gradient(262deg, #FB6609 0%, #E40849 100%))"}}>
                    <div id="qrimage" className="w-full"></div>
                  </div>
                </div>
              </div>
              {/* <div className="mt-3">
                <PrimaryButton2
                  text="Activate Profile"
                  color="linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                  onClick={write}
                />
              </div> */}
              {windowWidth < 768 && (
                <DeviceTap
                  isAndroid={isAndroid}
                  open={deviceTapOpen}
                  setOpen={setDeviceTapOpen}
                  username={username}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
