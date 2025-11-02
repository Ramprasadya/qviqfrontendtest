import InputField from "../../../UiComponents/InputField";
import TextFieldArea from "../../../UiComponents/InputFIeldTextArea";
import { serverUrl } from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../ProfileComponents/Button/Button";
import { HiOutlineX } from "react-icons/hi";
import validator from "validator";

const GoogleReviewFeedbackModal = ({ value, setShowModal3, ...props }) => {
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showError, setShowError] = useState(false);
  const [reviewFormat, setReviewFormat] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [googleReviewValue, setGoogleReviewValue] = useState("");
  const [type, setType] = useState("");
  const profile = props.username;
  const [reviewMessage, setReviewMessage] = useState("");

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

  const fetchGoogleReview = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/review/getGoogleReviewData/${profile}`
      );
      if (res) {
        console.log(res);
        setReviewMessage(res.data?.reviewMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGoogleReview();
  }, []);

  const reviewForm = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/review/reviewForm/${type}/${profile}`
      );

      setReviewFormat(data);
    } catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    if (type != "") reviewForm();
  }, [type]);

  const putFeedback = async () => {
    if (name === "" || review === "") {
      setShowError(true);
      console.log("error");
      return;
    }
    try {
      const { data } = axios.post(
        `${serverUrl}/review/review/${type}/${profile}`,
        {
          name: name,
          stars: value,
          review: review,
          profile: profile,
          nagativeReview: true,
          isOn: false,
        }
      );
      setName(" ");
      setReview(" ");
      setShowModal3(false);
      props.setToastMessage("Review Submitted Successfully");
      props.setShowToast(true);
      setTimeout(() => {
        props.setShowToast(false);
        props.setToastMessage("");
      }, 3000);
    } catch (err) {
      console.log(err);
      props.setToastMessage("Something went wrong!");
      props.setShowToast(true);
      setTimeout(() => {
        props.setShowToast(false);
        props.setToastMessage("");
      }, 3000);
    }
  };
  return (
    <div className="container" style={{ zIndex: "998" }}>
      <div
        className="modal-wrapper bg-[#00000054] backdrop-blur-[20px]"
        style={{ zIndex: "998" }}
      ></div>

      <div
        className={`flex flex-col  bg-white fixed bottom-0 md:bottom-1/2 md:translate-y-1/2 left-1/2 -translate-x-1/2 h-fit rounded-t-2xl md:rounded-2xl md:w-[600px] w-full p-2 ${props.modalStyle}`}
        style={{ zIndex: "998", height: "fit-content" }}
      >
        <div className="flex flex-col items-center px-3 py-4 xsm:px-5 md:p-4">
          <p className="flex w-full justify-end mb-1">
            <span
              className="text-2xl logo-fill"
              style={{ cursor: "pointer", padding: "0" }}
              onClick={() => setShowModal3(false)}
            >
              <HiOutlineX />
            </span>
          </p>
          <p className="text-lg md:text-xl tracking-normal text-center  font-semibold">
            {reviewMessage || "Sorry for the inconvenience"}
          </p>
        </div>
        <div className="mx-3 xsm:mx-5 md:mx-6 mb-4 sm:mb-8 ">
          <div className="xl:mt-6 mt-[15px]">
            <label className="text-[14px] font-medium">Full name</label>
            <InputField
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              width="100%"
              height="40px"
              fontSize="14px"
              borderRadius={props.square ? "0px" : "8px"}
            />
            {showError && name.length <= 0 && (
              <label className="text-[#FE7171] text-[14px]">
                Please, Enter your name
              </label>
            )}
          </div>

          {/* <div className="xl:mt-[24px] mt-[15px]">
            <label className="text-[14px] font-medium">Email</label>
            <InputField
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                let new_Email = e.target.value;
                if (!validator.isEmail(new_Email)) {
                  setEmailError("Please, enter a valid email!");
                } else {
                  setEmailError("");
                }
                setEmail(new_Email);
              }}
              width="100%"
              height="40px"
              fontSize="14px"
              borderRadius={props.square ? "0px" : "8px"}
            />
            {(showError && email.length <= 0) || emailError ? (
              <label className="text-[#FE7171] text-[14px]">
                {emailError || "Please, enter a valid email!"}
              </label>
            ) : null}
          </div> */}

          <div className="mt-[24px]">
            <TextFieldArea
              placeholder="Enter Message"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              label="How can we improve"
              width="100%"
              height="40px"
              fontSize="14px"
              borderRadius={props.square ? "0px" : "8px"}
              color="black"
            />
            {showError && review.length <= 10 && (
              <label className="text-[#FE7171] text-[14px]">
                Please, Enter at least 10 character
              </label>
            )}
          </div>
          <div className="mt-6 mb-4 xl:w-[520px] xl:h-[72px] flex flex-col gap-2 w-full justify-center items-center ">
            <Button
              style={props.buttonStyle}
              onClick={() => {
                putFeedback();
              }}
              text={"Submit"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleReviewFeedbackModal;
