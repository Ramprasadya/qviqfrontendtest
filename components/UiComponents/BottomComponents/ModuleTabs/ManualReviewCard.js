import React, { useEffect, useState } from "react";
import TertiaryButton from "../../TertiaryButton";
import PrimaryButton2 from "../../PrimaryButton2";
import { serverUrl } from "../../../../config";

import NewModal from "../../NewModal/NewModal";
import "../../../review/review.css";
import { HiOutlineArrowUpLeft, HiOutlineArrowUturnLeft } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi";
import NewToast from "../../NewToast";

const ManualReviewCard = ({
  off,
  profile,
  onEdit,
  setRefetchOnDelete,
  refetchOnDelete,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [rev, setRev] = React.useState("");
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  function promptMeDelete(id) {
    setOpenDelete(true);
    setId(id);
  }
  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
  };
  function deletef(id) {
    console.log(`${serverUrl}/review/delete/${id}/${profile}`);
    try {
      const res = fetch(`${serverUrl}/review/delete/${id}/${profile}`, {
        method: "DELETE",
        body: id,
      });
      //  Toast.error("Review Deleted");
      if (res) {
        handleClose();
        setMessage("Review deleted!");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
        setRefetchOnDelete((prev) => !prev)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const DeleteComp = () => {
    return (
      <div className="mt-[1.5rem]">
        <div className="mb-[1.5rem]">
          Are you sure that you want to delete John Doe's review from your
          profile? This will permanently delete the review from your profile.
        </div>
        <div className="reply_comp_btn_container gap-2">
          <TertiaryButton text="Cancel" onClick={handleClose} />
          <PrimaryButton2
            text="Delete Review"
            onClick={() => {
              deletef(id);
            }}
          />
        </div>
      </div>
    );
  };

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
    <div className=" w-full mt-[10px] rounded-[10px] border-solid border-[1px] border-[#DFDBD8] p-[20px]">
      <div>
        <div className="flex  items-center justify-between">
          <div className="flex ">
            <img
              className="w-12 h-12 rounded-full"
              src={
                off.image
                  ? off.image
                  : "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=594&q=80"
              }
            />
            <div className="ml-4">
              <div className="font-[600] text-[14px] ">{off.name}</div>
            </div>
          </div>
          <div className="flex  items-center justify-center">
            <div className="text-yellow-500 w-5 h-5">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                ></path>
              </svg>
            </div>
            <div className="ml-1">{off.stars}</div>
          </div>
        </div>

        <div className="my-[1rem] text-[14px] font-normal leading-[22px] ">
          {off.review}
        </div>

        {/* {off.review.length > 100 ?
               <div className='my-[1rem]'>
                  {`${off.review.substring(0, 100)} . . . `}<span className="hover:cursor-pointer text-blue-600" onClick={() => setReadMore(true)}>Read More</span>
               </div>
               :
               <div className='my-[1rem]'>
                  {off.review}
               </div>
            }
            {readMore && <ReviewPopupChild off={off} profile={profile} close={() => setReadMore(false)} />} */}
      </div>
      <div className="review_card_btn_container border-t-[0.0625rem]">
        <button onClick={() => onEdit(off)}>
          <div className="flex flex-row items-center justify-center">
            <div className="w-4 h-4 mr-1">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  className="w-4 h-4 "
                >
                  <path
                    d="M10.9853 6.45739L10.0427 5.51472L3.83333 11.7241L3.83333 12.6667H4.776L10.9853 6.45739ZM11.928 5.51472L12.8707 4.57206L11.928 3.62939L10.9853 4.57206L11.928 5.51472ZM5.328 14.0001H2.5V11.1714L11.4567 2.21472C11.5817 2.08974 11.7512 2.01953 11.928 2.01953C12.1048 2.01953 12.2743 2.08974 12.3993 2.21472L14.2853 4.10072C14.4103 4.22574 14.4805 4.39528 14.4805 4.57206C14.4805 4.74883 14.4103 4.91837 14.2853 5.04339L5.32867 14.0001H5.328Z"
                    fill="#1A1A1A"
                  />
                </svg>
              </span>
            </div>
            <div className="font-medium">Edit</div>
          </div>
        </button>

        <button
          onClick={() => {
            promptMeDelete(off._id, off.name, off.email, off.review);
          }}
        >
          <div className="flex flex-row items-center justify-center">
            <div className="w-4 h-4 mr-1">
              <HiOutlineTrash />
            </div>
            <div className="font-medium">Delete</div>
          </div>
        </button>
      </div>

      <NewModal
        width={`${windowWidth > 768 ? "500px" : ""}`}
        height="270px"
        onModal={openDelete}
        onClick={handleClose}
        text="Delete Review"
        children={<DeleteComp />}
      />

      <NewToast open={showMessage} message={message} />
    </div>
  );
};

export default ManualReviewCard;
