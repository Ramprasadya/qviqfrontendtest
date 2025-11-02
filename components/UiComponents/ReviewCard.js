import React, { useState } from "react";
import NewModal from "./NewModal/NewModal";
import ReviewPopupChild from "./ReviewPopupChild";
import TertiaryButton from "../UiComponents/TertiaryButton";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import { serverUrl } from "../../config";

import "../review/review.css";
import { HiOutlineArrowUpLeft, HiOutlineArrowUturnLeft } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi";
import NewToast from "./NewToast";
import { RiShareBoxFill } from "react-icons/ri";
import axios from "axios";
import { getCookie } from "../utils";

const ReviewCard = ({ off, profile, setDummyState, dummyState }) => {
  const [readMore, setReadMore] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [rev, setRev] = React.useState("");
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [showMessage, setShowtMessage] = useState(false);
  const [message, setMessage] = useState("");

  function promptMeReply(id, name, email, review) {
    setOpen(true);
    setRev(review);
    setId(id);
    setName(name);
    setEmail(email);
  }

  const handleAddReview = async (id) => {
    try {
      const response = await fetch(
        `${serverUrl}/review/addReview/${profile}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isOn: true,
          }),
        }
      );
      if (response.ok) {
        setMessage("Review Shared on Profile");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      }
      const result = await response.json();
      return result;
    } catch (err) {
      setMessage("Something went wrong !");
      setShowtMessage(true);
      setTimeout(() => {
        setShowtMessage(false);
      }, 3000);
      //console.log(err);
    }
  };

  function promptMeDelete(id) {
    setOpenDelete(true);
    setId(id);
  }
  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
  };
  function deletef(id) {
    try {
      //console.log(`${serverUrl}/review/delete/${id}/${profile}`);
      const res = fetch(`${serverUrl}/review/delete/${id}/${profile}`, {
        method: "DELETE",
        body: id,
      });
      //  Toast.error("Review Deleted");
      if (res) {
        setDummyState((prevState) => prevState + 1);
        handleClose();
        setMessage("Review deleted!");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      }
    } catch (err) {
      //console.log(err);
    }
  }

  const ReplyComp = () => {
    const [reply, setReply] = React.useState("");
    const obj = {
      from_name: "Qviq",
      to_name: name,
      reply: reply,
      to_email: email,
      profile: profile,
    };

    const handleReply = async () => {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      axios
        .post(`${serverUrl}/review/reviewReply/${profile}`, obj, config)
        .then((result) => {
          handleClose();
          setMessage("Response sent successfully!");
          setShowtMessage(true);
          setTimeout(() => {
            setShowtMessage(false);
          }, 3000);
        })
        .catch((err) => console.log(err));
    };

    const handleChangeReply = (e) => {
      setReply(e.target.value);
    };

    return (
      <div className="my-[1.5rem]">
        <div className="my-[1.5rem] text-[#817C7C]">
          Please note that, your response will be shared as an email.
        </div>
        <div>
          <span className="text-[#817C7C]">To : </span>
          <span className="text-[#1A1A1A]">{name}</span>
        </div>
        <div className="my-[1rem]">
          <span className="text-[#817C7C]">Email : </span>
          <span className="text-[#1A1A1A]">{email}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#1A1A1A]">Add Reply</span>
          <textarea
            onChange={handleChangeReply}
            value={reply}
            className="reply_input"
            placeholder="Type your response here..."
            type="text"
          />
        </div>
        <div className="text-[#817C7C]">Character limit : 500 characters</div>
        <div className="reply_comp_btn_container">
          <TertiaryButton text="Cancel" onClick={handleClose} />
          <PrimaryButton2 text="Send Response" onClick={handleReply} />
        </div>
      </div>
    );
  };

  const DeleteComp = () => {
    return (
      <div className="mt-[1.5rem]">
        <div className="mb-[1.5rem]">
          Are you sure that you want to delete John Doe's review from your
          profile? This will permanently delete the review from your profile.
        </div>
        <div className="reply_comp_btn_container">
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

  return (
    <div className="review_card">
      <div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row">
            <div className="conn_card_char">
              {off.name.substring(0, 1)}
              {off.name.substr(off.name.indexOf(" ") + 1, 1)}
            </div>
            <div className="ml-4">
              {off.name && (
                <div className="font-bold text-[14px]">{off.name}</div>
              )}
              {off.email && (
                <div className="text-gray-500 text-[14px] break-all">
                  {off.email}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center justify-center relative">
            {off.nagativeReview && (
              <div className="absolute  right-[-10px] top-[-31px]">
                <span className="inline-block w-[112px] text-[12px] py-[2px] px-[5px] bg-red-100 text-red-600 font-medium rounded-full ">
                  Negative Review
                </span>
              </div>
            )}
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

        <div className="my-[1rem] text-[14px]">{off.review}</div>

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
      {!off.nagativeReview && <button
          onClick={() =>
            promptMeReply(off._id, off.name, off.email, off.review)
          }
        >
          <div className="flex flex-row items-center justify-center">
            <div className="w-4 h-4 mr-1">
              <HiOutlineArrowUturnLeft />
            </div>
            <div className="font-medium">Reply</div>
          </div>
        </button> }

        {!off.nagativeReview && (
          <button onClick={() => handleAddReview(off._id)}>
            <div className="flex flex-row items-center justify-center">
              <div className="w-4 h-4 mr-1">
                <RiShareBoxFill />
              </div>
              <div className="font-medium">Share</div>
            </div>
          </button>
        )}

        <button
          onClick={() => {
            promptMeDelete(off._id, off.name, off.email, off.review);
          }}
        >
          <div className="flex flex-row items-center justify-center text-red-500 ">
            <div className="w-4 h-4 mr-1">
              <HiOutlineTrash />
            </div>
            <div className="font-medium">Delete</div>
          </div>
        </button>
      </div>

      <NewModal
        height="31.25rem"
        onModal={open}
        onClick={handleClose}
        text={`Send an email response to  - ${name}`}
        children={<ReplyComp />}
      />
      <NewModal
        height="15.75rem"
        onModal={openDelete}
        onClick={handleClose}
        text="Delete Review"
        children={<DeleteComp />}
      />

      <NewToast open={showMessage} message={message} />
    </div>
  );
};

export default ReviewCard;
