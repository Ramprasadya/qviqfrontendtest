import React, { useEffect, useState } from "react";
import {
  HiOutlineTrash,
  HiOutlinePencil,
  HiArrowSmRight,
} from "react-icons/hi";
import Axios from "axios";
import Delete from "../SocialLinks/DeleteBox";
import LinkButtons from "./LinkButtons";
import Edit from "../SocialLinks/EditBox";
import "./iconTextStyle.css";
import { HiLockClosed, HiOutlineLockClosed } from "react-icons/hi2";
import { RiLock2Line } from "react-icons/ri";
import NewModal from "./NewModal/NewModal";
import PrimaryButton2 from "./PrimaryButton2";
import modalBanner from "./modal.png";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Video(props) {
  const profile = props.profile;
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idx, setIdx] = useState("");
  const [label, setLabel] = useState("");
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");
  const handleDelete = (index) => {
    setOpen(true);
    setId(props.record[index]._id);
  };
  const handleEdit = (index) => {
    setOpenEdit(true);
    setId(props.record[index]._id);
    setLabel(props.record[index].channel);
    setUserName(props.record[index].videolink);
    setIdx(index);
  };

  const navigate = useRouter();
  // show the modal
  const [showModal, setShowModal] = useState(false);
  const ProModal = () => {
    return (
      <>
        <NewModal
          text="Upgrade to PRO"
          onModal={showModal}
          onClick={setShowModal}
        >
          <Image src={modalBanner} alt="modal banner" className="pt-[48px]" />
          <p className="mt-[24px] sm:mt[32px] text-[#817C7C] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
            By becoming a pro member, you can expand your network, unlock and
            add more media links, and analyse your profile visits and audience.
          </p>

          <div className="py-[32px]">
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                Unlock additional media links and add them to your profile.
              </div>
            </div>
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                You can include multiple custom links, pdf files, and additional
                images.
              </div>
            </div>
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                Add appointment slots and receive appointments through your
                profile.
              </div>
            </div>
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                Domain customization
              </div>
            </div>
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                Get more Templates & Themes for your profiles
              </div>
            </div>
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                Multiple Tapop profiles can be created and managed.
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center py-6">
            <PrimaryButton2
              text={`Get PRO Plan at ₹${399}`}
              onClick={() => {
                navigate.push(`/plan/${profile}`);
              }}
              icon={<HiArrowSmRight />}
              color="linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
            />
          </div>
        </NewModal>
      </>
    );
  };

  let count = 0;
  if (props.pro) {
    count = props.record.length;
  } else if (props.basic) {
    count = 1;
  } else {
    count = 4;
  }

  return (
    <>
      <Delete
        open={open}
        profile={props.profile}
        type={props.type}
        id={id}
        platform={"video"}
        setOpen={setOpen}
        toggleStates={props.record}
        setToggleStates={props.setRecord}
      />
      <Edit
        open={openEdit}
        setDummyState={props.setDummyState}
        idx={idx}
        label={label}
        platform={"video"}
        userName={userName}
        profile={props.profile}
        type={props.type}
        id={id}
        setOpen={setOpenEdit}
        toggleStates={props.record}
        setToggleStates={props.setRecord}
        videoBox={true}
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,350px))] gap-6 mt-8">
        {/* {console.log(props.record)} */}
        {showModal && <ProModal />}
        {props.record.map((item, index) => (
          <div key={item._id} className="relative">
            <div className="relative w-[90vw] max-w-[350px] h-[170px] xsm:h-[190px] bg-cGrey rounded-xl">
              {/* {console.log(props)} */}
              {index >= count && (
                <div
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer z-[1] absolute top-0 rounded-lg w-full h-full flex justify-center items-center  bg-[#aba5a554]  backdrop-blur-[2px]"
                >
                  <RiLock2Line style={{ width: 50, height: 50 }} />
                </div>
              )}
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${item.userName}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                className="rounded-xl"
              />
            </div>
            <span
              style={{ cursor: "pointer" }}
              className="z-10 absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex justify-center items-center hover:bg-gray-300"
              onClick={() => handleDelete(index)}
            >
              <HiOutlineTrash />
            </span>
            <span className="mt-2 flex justify-between">
              <p className="text-sm font-semibold">{item.label}</p>
              <LinkButtons
                className="add-icon"
                text="Edit"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_2218_2255)">
                      <path
                        d="M11.2411 2.99111L12.3661 1.86612C12.8543 1.37796 13.6457 1.37796 14.1339 1.86612C14.622 2.35427 14.622 3.14573 14.1339 3.63388L4.55479 13.213C4.20234 13.5654 3.76762 13.8245 3.28993 13.9668L1.5 14.5L2.03319 12.7101C2.17548 12.2324 2.43456 11.7977 2.78701 11.4452L11.2411 2.99111ZM11.2411 2.99111L13 4.74999"
                        stroke="url(#paint0_linear_2218_2255)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_2218_2255"
                        x1="14.5"
                        y1="1.5"
                        x2="-0.0209542"
                        y2="3.50954"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FB6609" />
                        <stop offset="1" stopColor="#E40849" />
                      </linearGradient>
                      <clipPath id="clip0_2218_2255">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                }
                onClick={() => handleEdit(index)}
              />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Video;
