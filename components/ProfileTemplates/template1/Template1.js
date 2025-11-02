import React, { useRef, useState } from "react";

import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
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
import ReviewModal from "./modals/ReviewModal";
import ContactDetails from "./modals/ContactDetails";
import Toast from "../../UiComponents/Toast";

export default function Template1({
  username,
  name,
  email,
  mobileNumber,
  newMobileNumber,
  description,
  companyName,
  jobTitle,
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
  const [moreSocialLinks, setMoreSocialLinks] = useState(false);
  const [moreApps, setMoreApps] = useState(false);
  const fileInputRef = useRef(null);
  const fileInputRefCover = useRef(null);
  const handleButtonClickCover = () => {
    fileInputRefCover.current.click();
  };
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const buttonStyle =
    "rounded-[8px] border-[1px] border-[#121212] border-r-[4px] border-b-[4px] bg-[#FFFFFF] text-[#121212] px-[16px] py-[8px] min-w-fit";
  const modalButtonStyle =
    "rounded-[8px] border-r-[8px] border-b-[8px] border-[#121212] bg-[#FFFFFF] text-[#121212] w-full hover:cursor-pointer";
  const contactBtnStyle =
    "flex justify-center items-center gap-2 w-fit bg-white px-[32px] h-[72px] border border-[#121212] rounded-[20px] shadow-[0px_8px_20px_0px_rgba(18,18,18,0.32)] hover:cursor-pointer active:scale-95 duration-150";
  const closeIconStyle = "bg-opacity-50 border-[1px] border-[#FFFFFF]";
  const reviewStarDivbg = "#ff7f63";
  return (
    <div className="bg-cyan-400 flex justify-center w-full   items-center  ">
      <div className=" min-h-screen  min-w-full  bg-[#F5775B] flex flex-col pb-10  py-[20px] sm:px-10 lg:px-20 lg:pt-20 px-4  xl:px-40 xl:pt-20 lg:pb-[100px]   xl:pb-[130px] justify-center items-center relative">
        <div
          className={`border-t-[2px] border-l-[2px] border-r-[2px] xl:border-t-[1px] xl:border-l-0 xl:border-r-0  border-[#ffffff] w-full xl:w-[1182px] xl:h-[402px] lg:h-[285px] xl:rounded-[40px] rounded-[12px] bg-[#FFFFFF4D]   h-[240px]   xsm:h-[275px] relative max-w-[1182px] xsm:mb-[168px] mb-[120px] xl:mb-0 `}
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
            className={`absolute xl:top-[360px] xsm:top-[246px] top-[212px] flex flex-col justify-center items-center w-full `}
          >
            <SocialLinks
              apps={apps}
              fill="#ffffff"
              size={"xl:text-[44px] xsm:text-[32px] text-[22px]"}
              iconType={"WhiteIcons"}
            />
            {moreSocialLinks && (
              <SocialLinks
                apps={apps}
                fill="#ffffff"
                size={"xl:text-[44px] xsm:text-[32px] text-[22px]"}
                iconType={"WhiteIcons"}
              />
            )}
            <div className=" w-[32px] h-[32px] bg-opacity-30 rounded-[40px] bg-[#FFFFFF4D] flex justify-center items-center xl:hidden">
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
            <div
              className="z-10 fixed  border-[1px] lg:bottom-[65px] lg:right-20  sm:right-10 right-5 bottom-[10px] xl:bottom-1/8 xl:left-[calc(50%+440px)] template1-fontfamily-sans  h-16 rounded-[20px] backdrop-blur-[14px] py-2 px-6 bg-[#FFFFFF80] w-[104px] xl:w-[144px] xl:h-20 shadow  shadow-[#FFFFFF, #FFFFFF] active:scale-95 duration-150 hover:cursor-pointer"
              onClick={() => setShowModal4(true)}
            >
              <h1 className="w-full h-full flex justify-center items-center text-[#121212] font-bold text-[14px]">
                Contact
              </h1>
            </div>
          }
        </div>
        {moreSocialLinks && <div className="xsm:mt-[90px] mt-[60px] h-6"></div>}
        <div
          className={` flex flex-col xl:mt-[344px] w-full justify-center items-center xl:w-[1182px]`}
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

        {showModal1 && (
          <ShareModal
          usedIn="profile"
            setShowModal1={setShowModal1}
            profileImage={pimage}
            // fullName={name}
            type={type}
            buttonStyle={modalButtonStyle}
          />
        )}
        {showModal2 && (
          <ContactModal
            setShowModal2={setShowModal2}
            buttonStyle={modalButtonStyle}
            profile={username}
            type={type}
            />
            )}
        {showModal3 && (
          <ReviewModal
          setShowModal3={setShowModal3}
            username={username}
            buttonStyle={modalButtonStyle}
            reviewStarDivbg={reviewStarDivbg}
            setToastMessage={setToastMessage}
            setShowToast={setShowToast}
            />
            )}
        {showModal4 && (
          <ButtonFunction
            setShowModal1={setShowModal1}
            showModal1={showModal1}
            profile={username}
            setShowModal4={setShowModal4}
            showModal2={showModal2}
            setShowModal2={setShowModal2}
            setShowModal5={setShowModal5}
            showModal5={showModal5}
            name={name}
            mobileNumber={mobileNumber}
            email={email}
            buttonStyle={contactBtnStyle}
            closeIcon={closeIconStyle}
            setToastMessage={setToastMessage}
            setShowToast={setShowToast}
            jobTitle={jobTitle}
            companyName={companyName}
            mobileVisibility={mobileVisibility}
          />
        )}
        {showModal5 && (
          <ContactDetails
            mobileNumber={mobileNumber}
            email={email}
            setShowModal5={setShowModal5}
          />
        )}

        <div className="w-full justify-center items-center flex">
          <Gallery
            images={images}
            textcolor={"#121212"}
            fontFamily={"template1-fontfamily-sans"}
          />
        </div>
        <div className="w-full justify-center items-center flex xl:w-[1182px] mt-[48px] xl:mt-[72px] mb-[60px]">
          <Bottom buttonStyle={buttonStyle} logoSwitch={props.data.logoSwitch} />
        </div>
      </div>
      {
        showToast && <div className="w-full flex justify-center items-center fixed bottom-10 left-0" style={{ zIndex: '999' }}>
          <Toast text={toastMessage} backgroundColor={'#121212'} color={'white'} />
        </div>
      }
    </div>
  );
}
