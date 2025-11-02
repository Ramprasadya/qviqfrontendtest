import React, { useEffect, useRef, useState } from "react";
import { RiFacebookFill, RiShareBoxFill } from "react-icons/ri";

import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronUp,
  HiOutlinePencilAlt,
} from "react-icons/hi";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import logo from "../images/logo.png";
import Product from "./Product";
import SocialLinks from "./SocialLinks";
import Gallery from "./Gallery";
import Bottom from "./Bottom";
import Contents from "./Contents";
import UserDetails from "./UserDetails";
import ProfilePic from "./ProfilePic";
import Services from "./Services";
import Appointents from "./Appointments";
import Videos from "./Videos";
import Documents from "./Documents";
import BussinesHours from "./BussinessHours";
import Reviews from "./Reviews";
import ContactModal from "./modals/ExchangeContactModal";
import ShareModal from "./modals/ShareModal";
import ButtonFunction from "./modals/ButtonFunction";
import Toast from "../../UiComponents/Toast";
import ReviewModal from "./modals/ReviewModal";
import ContactDetails from "./modals/ContactDetails";

export default function Template1({
  name,
  email,
  mobileNumber,
  newMobileNumber,
  description,
  jobTitle,
  companyName,
  pimage,
  images,
  videoos,
  apps,
  products,
  servicees,
  pdfs,
  type,
  ...props
}) {
  const [product, setproduct] = useState(true);
  const [services, setServices] = useState(false);
  const [videos, setVideos] = useState(false);
  const [appointments, setAppointments] = useState(false);
  const [documents, setDocuments] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [bussinessHours, setBussinessHours] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);

  const [toast, setToast] = useState(false);

  // console.log(name)

  const [moreSocialLinks, setMoreSocialLinks] = useState(false);
  const [moreApps, setMoreApps] = useState(false);



  setTimeout(() => {
    setToast(false);
  }, 5000);
  const fileInputRef = useRef(null);
  const fileInputRefCover = useRef(null);
  const handleButtonClickCover = () => {
    fileInputRefCover.current.click();
  };

  const buttonStyle = 'rounded-[8px] border-[1px] border-[#121212] border-r-[4px] border-b-[4px] bg-[#FFFFFF] text-[#121212] px-[16px] py-[8px] min-w-fit'
  const templateRef = useRef(null);
  const [templatePosition, setTemplatePosition] = useState(0);
  useEffect(() => {
    if (templateRef.current) {
      setTemplatePosition(templateRef.current.getBoundingClientRect());
    }
  }, [])

  return (
    <div className="bg-cyan-400 flex justify-center w-full   items-center  " ref={templateRef}>
      <div
        className=" w-full xsm:w-[360px] bg-[#F5775B] flex flex-col xsm:px-5 px-3 xsm:pt-5 pt-3 pb-[40px]  justify-center items-center relative"

      >
        <div
          className={`border-t-[2px] border-l-[2px] border-r-[2px]    border-[#ffffff] w-full  rounded-[12px] bg-[#FFFFFF4D]   h-[240px]   xsm:h-[275px] relative  xsm:mb-[168px] mb-[120px] `}
        >


          <ProfilePic pimage={pimage} />

          <UserDetails
            name={name}
            description={description}
            jobTitle={jobTitle}
            textcolor={"#ffffff"}
            fontFamily={"template1-fontfamily-sans"}
          />
          <div
            className={`absolute  xsm:top-[250px] top-[212px] flex flex-col justify-center items-center w-full  `}
          >
            <SocialLinks apps={apps} fill="#ffffff" size={" xsm:text-[32px] text-[22px]"} iconType={'WhiteIcons'} />
            {moreSocialLinks && <SocialLinks apps={apps} fill="#ffffff" size={" xsm:text-[32px] text-[22px]"} iconType={'WhiteIcons'} />}
            <div className=" w-[32px] h-[32px] bg-opacity-30 rounded-[40px] bg-[#FFFFFF4D] flex justify-center items-center ">
              <button onClick={() => setMoreSocialLinks(!moreSocialLinks)}>
                {moreSocialLinks ? (
                  <HiOutlineChevronUp />
                ) : (
                  <HiOutlineChevronDown />
                )}
              </button>
            </div>
          </div>


          {!props.disable &&
            <div className="z-10 fixed  border-[1px] bottom-[75px]    xsm:left-[calc(50%+55px)] left-[calc(50%+25px)]  template1-fontfamily-sans  h-16 rounded-[20px] backdrop-blur-[14px] py-2 px-6 bg-[#FFFFFF80] w-[104px]  shadow  shadow-[#FFFFFF, #FFFFFF]  ">
              <h1
                className="w-full h-full flex justify-center items-center text-[#121212] font-bold text-[14px]"
                onClick={() => setShowModal4(true)}
                style={{ cursor: "pointer" }}
              >
                Contact
              </h1>
            </div>
          }
        </div>
        {moreSocialLinks && <div className="xsm:mt-[90px] mt-[60px] h-6"></div>}
        <div
          className={` flex flex-col    w-full justify-center items-center   `}
        >
          <Contents
            product={product}
            services={services}
            appointments={appointments}
            videos={videos}
            bussinessHours={bussinessHours}
            reviews={reviews}
            documents={documents}
            setProduct={setproduct}
            setServices={setServices}
            setAppointments={setAppointments}
            setVideos={setVideos}
            setDocuments={setDocuments}
            setBussinessHours={setBussinessHours}
            setReviews={setReviews}
            textcolor={"#121212"}
            fontFamily={"template1-fontfamily-sans"}
          />
          <div className="w-full justify-center items-center flex">
            {reviews && (
              <Reviews
                textcolor={"#121212"}
                fontFamily={"template1-fontfamily-sans"}
                setShowModal3={setShowModal3}
              />
            )}
          </div>
          <div className="w-full justify-center items-center flex">
            {bussinessHours && (
              <BussinesHours
                textcolor={"#121212"}
                fontFamily={"template1-fontfamily-sans"}
              />
            )}
          </div>
          <div className="w-full justify-center items-center flex">
            {documents && (
              <Documents
                pdfs={pdfs}
                textcolor={"#121212"}
                fontFamily={"template1-fontfamily-sans"}
              />
            )}
          </div>
          <div className="w-full justify-center items-center flex">
            {videos && (
              <Videos
                videos={videoos}
                textcolor={"#121212"}
                fontFamily={"template1-fontfamily-sans"}
                type={type}
              />
            )}
          </div>
          <div className="w-full justify-center items-center flex">
            {appointments && (
              <Appointents
                textcolor={"#121212"}
                fontFamily={"template1-fontfamily-sans"}
              />
            )}
          </div>
          <div className="w-full justify-center items-center flex">
            {services && (
              <Services
                services={servicees}
                textcolor={"#121212"}
                fontFamily={"template1-fontfamily-sans"}
              />
            )}
          </div>
          <div className="w-full justify-center items-center flex">
            {product && (
              <Product
                products={products}
                textcolor={"#121212"}
                fontFamily={"template1-fontfamily-sans"}
              />
            )}
          </div>
        </div>

        {showModal1 && <ShareModal setShowModal1={setShowModal1} profileImage={pimage} type={type} usedIn="profile" />}
        {showModal2 && <ContactModal setShowModal2={setShowModal2} profile={props.data.username} type={type}/>}
        {showModal3 && <ReviewModal setShowModal3={setShowModal3} />}
        {showModal4 && (
          <ButtonFunction
            setShowModal1={setShowModal1}
            showModal1={showModal1}
            setShowModal4={setShowModal4}
            showModal2={showModal2}
            setToast={setToast}
            setShowModal2={setShowModal2}
            setShowModal5={setShowModal5}
            showModal5={showModal5}
            name={name}
            mobileNumber={mobileNumber}
            email={email}
            profile={props.data.username}
            jobTitle={jobTitle}
            companyName={companyName}
            mobileVisibility={mobileVisibility}
          />
        )}
        {showModal5 && <ContactDetails mobileNumber={mobileNumber} email={email} setShowModal5={setShowModal5} />}

        {toast && (
          <div className="w-full flex justify-center items-center fixed bottom-10">
            {" "}
            <Toast
              backgroundColor={"#121212"}
              text={"Contact downloaded!"}
              border={"1px"}
              borderColor={"white"}
            />
          </div>
        )}

        <div className="w-full justify-center items-center flex">
          <Gallery
            images={images}
            textcolor={"#121212"}
            fontFamily={"template1-fontfamily-sans"}
          />
        </div>
        <div className="w-full justify-center items-center flex xl:w-[1182px] mt-[48px] xl:mt-[72px] mb-[60px]">
          <Bottom buttonStyle={buttonStyle} position={templatePosition} logoSwitch={props.data.logoSwitch} />
        </div>
      </div>
    </div>
  );
}
