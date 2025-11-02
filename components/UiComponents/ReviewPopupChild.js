import React, { useState } from "react";
import NewModal from "./NewModal/NewModal";
import { HiOutlineX } from "react-icons/hi";
import TertiaryButton from "./TertiaryButton";
import PrimaryButton2 from "./PrimaryButton2";
import { serverUrl } from "../../config";
import axios from "axios";
import { getCookie } from "../utils";

const ReviewPopupChild = ({ off, profile, close }) => {
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
      const res = fetch(`${serverUrl}/review/delete/${id}/${profile.profile}`, {
        method: "DELETE",
        body: id,
      });
      //  Toast.error("Review Deleted");
      if (res) {
        handleClose();
        close();
        setMessage("Review deleted!");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      }
    } catch (err) {
      // console.log(err);
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

    const handleReply = () => {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      axios.post(`${serverUrl}/review/reviewReply/${profile}`,obj,config)
      .then((result) => {
        handleClose();
        setMessage("Response sent successfully!");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      })
      .catch(err=>console.log(err));
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
            className="min-h-[6.625rem] my-[0.5rem] border-[0.0625rem] border-[#DFDBD8] rounded-[0.5rem] pl-[0.75rem] py-[0.5625rem] pr-[0.5rem] text-start focus:outline-none"
            placeholder="Type your response here..."
            type="text"
          />
        </div>
        <div className="text-[#817C7C]">Character limit : 500 characters</div>
        <div className="flex flex-row items-center justify-end my-[2rem] mr-[1rem]">
          <TertiaryButton text="Cancel" onClick={handleClose} />
          <PrimaryButton2 text="Send Response" onClick={handleReply} />
        </div>
      </div>
    );
  };

  const DeleteComp = () => {
    return (
      <div className="my-[1.5rem]">
        <div className="my-[1.5rem]">
          Are you sure that you want to delete John Doe's review from your
          profile? This will permanently delete the review from your profile.
        </div>
        <div className="flex flex-row items-center justify-end my-[1.5rem] mr-[1rem]">
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
    <div className="absolute bottom-0 left-0 flex flex-col h-screen w-full justify-center items-center bg-black bg-opacity-10">
      <div className="flex flex-col w-[640px] rounded-[0.5rem] border-[0.0625rem] border-[#f3f3f3] shadow-[0.375rem_0.375rem_1.5rem_0.0625rem_rgba(171,_181,_217,_0.18)] p-[1rem] item-center justify-between bg-white">
        <div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row">
              <img
                className="w-12 h-12 rounded-full"
                src="https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=594&q=80"
              />
              <div className="ml-4">
                <div className="font-bold">{off.name}</div>
                <div className="text-gray-500">{off.email}</div>
              </div>
            </div>
            <div className="ml-20 flex flex-row items-center justify-center">
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
                </svg>{" "}
              </div>
              <div className="ml-1">{off.stars}</div>
              <div onClick={close} className="hover:cursor-pointer ml-8">
                <HiOutlineX className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="my-[1rem]">{off.review}</div>
        </div>
        <div className="flex flex-row items-center justify-around pt-[1rem] py-[0.125rem] border-t-[0.0625rem] ">
          <button
            onClick={() =>
              promptMeReply(off._id, off.name, off.email, off.review)
            }
          >
            <div className="flex flex-row items-center justify-center">
              <div className="w-4 h-4 mr-1">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  ></path>
                </svg>
              </div>
              <div className="font-medium">Reply</div>
            </div>
          </button>

          <button
            onClick={() => {
              promptMeDelete(off._id, off.name, off.email, off.review);
            }}
          >
            <div className="flex flex-row items-center justify-center">
              <div className="w-4 h-4 mr-1">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  ></path>
                </svg>
              </div>
              <div className="font-medium">Delete</div>
            </div>
          </button>
        </div>
      </div>
      <NewModal
        height="30.625rem"
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

      {showMessage && (
        <div className="flex items-center absolute bottom-10 left-[37.0625rem] w-[32.375rem] h-[3.5rem] bg-[#1A1A1A] text-white py-[1rem] px-[1.5rem] rounded-[0.5rem]">
          {message}
        </div>
      )}
    </div>
  );
};

export default ReviewPopupChild;
