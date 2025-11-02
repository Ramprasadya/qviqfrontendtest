import React, { useContext, useEffect, useState } from "react";

import StarPicker from "react-star-ratings";
import Rating from "@mui/material/Rating";

// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import InputField from "../../../UiComponents/InputField";
import TextFieldArea from "../../../UiComponents/InputFIeldTextArea";
import { HiOutlineX } from "react-icons/hi";
import { UserContext } from "../../../Contexts/context";
import { serverUrl } from "../../../../config";

import { RiStackLine, RiStarFill, RiStarLine } from "react-icons/ri";
export default function ReviewModal2({ setShowModal3 }) {
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reviewFormat, setReviewFormat] = useState([]);

  const username = useContext(UserContext);
  const profile = username.username;

  const [type,setType] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/profile/profiletype/${profile}`
      );
      if (res.data.length > 0) {
        setType(res.data[0]._id);
      }
    } catch (error) {
      //console.log(error?.response?.data?.error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const [value, setValue] = React.useState(0);
  const putFeedback = async () => {
    try {
      const { data } = axios.post(`${serverUrl}/review/review/${type}/${profile}`, {
        name: name,
        email: email,
        stars: value,

        review: review,
        profile: profile.profile,
      });

      setEmail(" ");
      setName(" ");
      setReview(" ");
      setValue(" ");
      if (data) {
        
      }
    } catch (err) {
      //console.log(err);
    }
  };

  const reviewForm = async () => {
    const { data } = await axios.get(
      `${serverUrl}/review/reviewForm/${type}/${profile}`
    );
    
    setReviewFormat(data);
  };
  useEffect(() => {
    if(type!="")reviewForm();
  }, [type]);

  return (
    <div className="container sans " style={{ zIndex: "998" }}>
      <div
        className="modal-wrapper bg-[#00000054] backdrop-blur-[20px]"
        style={{ zIndex: "998" }}
      ></div>

      <div
        className="flex flex-col  bg-white fixed bottom-0 md:bottom-1/2 md:translate-y-1/2 left-1/2 -translate-x-1/2 h-fit rounded-t-2xl md:rounded-2xl md:w-[600px] w-full p-2"
        style={{ zIndex: "998", height: "fit-content" }}
      >
        <div className="flex justify-between items-center px-3 py-3 xsm:px-5 xsm:py-2 md:p-4">
          <p className="text-lg md:text-xl text-black tracking-normal font-semibold">
            Write a Review
          </p>
          <span
            className="text-2xl text-black logo-fill"
            style={{ cursor: "pointer", padding: "0" }}
            onClick={() => setShowModal3(false)}
          >
            <HiOutlineX />
          </span>
        </div>

        <div className="mx-3 xsm:mx-5 md:mx-6   ">
          <div className=" bg-[#FF7F63] text-white rounded-[12px] flex flex-col items-center py-6 xl:py-9">
            <div className="text-[24px] font-bold">Good 😇</div>
            <Rating
              name="half-rating"
              value={value}
              size="large"
              fill="white"
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            {/* <div className="flex xl:gap-x-10 gap-2 mt-3 ">
              <RiStarFill fill="white" size={"32px"} />
              <RiStarFill fill="white" size={"32px"} />
              <RiStarFill fill="white" size={"32px"} />
              <RiStarFill fill="white" size={"32px"} />
              <RiStarLine fill="white" size={"32px"} />
            </div> */}
          </div>
          <div className="xl:mt-6 mt-[15px]">
            <label className=" text-[14px] font-medium text-[#1A1A1A]">
              Full name
            </label>

            <InputField
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              width="100%"
              height="40px"
              fontSize="14px"
            />
          </div>
          <div className="xl:mt-[24px] mt-[15px]">
            <label className=" text-[14px] font-medium text-[#1A1A1A]">
              Email
            </label>
            <InputField
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              width="100%"
              height="40px"
              fontSize="14px"
            />
          </div>

          <div className="mt-[24px]">
            <TextFieldArea
              type="number"
              placeholder="Enter Message"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              label="Message (optional)"
              width="100%"
              height="40px"
              fontSize="14px"
              color="black"
            />
          </div>
          <div className="mt-6 mb-[24px] xl:w-[520px] xl:h-[72px] flex w-full justify-center items-center ">
            <button
              className="rounded-[8px] border-r-[8px] text-[14px] font-bold text-[#121212] border-[#121212] bg-[#ffffff] border-b-[8px] h-[72px] text-center w-full  "
              onClick={putFeedback}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
