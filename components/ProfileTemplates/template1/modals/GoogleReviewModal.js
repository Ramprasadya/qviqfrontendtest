import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import InputField from "../../../UiComponents/InputField";
import TextFieldArea from "../../../UiComponents/InputFIeldTextArea";
import { HiOutlineX } from "react-icons/hi";
import { UserContext } from "../../../Contexts/context";
import { RiStackLine, RiStarFill, RiStarLine } from "react-icons/ri";
import Button from "../../ProfileComponents/Button/Button";
import validator from "validator";
import { serverUrl } from "../../../../config";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
const GoogleReviewModal = ({value, setOpenGoogleFeedback, setValue, setShowModal3, ...props}) => {
  props = useDefaultProps(props);

  // const [review, setReview] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [showError, setShowError] = useState(false);
  // const [reviewFormat, setReviewFormat] = useState([]);
  // const [showFeedback, setShowFeedback] = useState(false);
  const [googleReviewValue, setGoogleReviewValue] = useState("");

  const profile = props.username;
  //   const profile = "ram";
  const [hover, setHover] = useState(-1);
  const [type, setType] = useState("");
  const [star, setStar] = useState(0)
  const [reviewUrl, setReviewUrl] = useState("")

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
        // console.log(res);
        setStar(res.data?.starValue)
        setReviewUrl(res.data?.reviewUrl)
        setGoogleReviewValue(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGoogleReview();
  }, []);

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
          <p className="w-full flex justify-end" >

          <span
            className="text-2xl logo-fill"
            style={{ cursor: "pointer", padding: "0" }}
            onClick={() => setShowModal3(false)}
          >
            <HiOutlineX />
          </span>
          </p>
          <p className="text-lg md:text-xl tracking-normal font-semibold text-center">
            Write a google Review
          </p>
        </div>
        <div className="mx-3 xsm:mx-5 md:mx-6 mb-4 sm:mb-8  ">
          <div
            className={`text-white ${
              props.square ? "rounded-[0px]" : "rounded-[12px]"
            } flex flex-col items-center gap-1 py-6 xl:py-9`}
            style={{ background: props.reviewStarDivbg || "#ff7f63" }}
          >
            {hover === -1 ? (
              <div className="text-[24px] font-bold">
                {value == 0 && "Select a Star"}
                {value > 0 && value < 1.5 && "Bad ☹️"}
                {value >= 1.5 && value < 2.5 && "Okay 🙂"}
                {value >= 2.5 && value < 3.5 && "Average 😄"}
                {value >= 3.5 && value < 4.5 && "Good 😇"}
                {value >= 4.5 && "Awesome 🤩"}
              </div>
            ) : (
              <div className="text-[24px] font-bold">
                {hover >= 0 && hover < 1.5 && "Bad ☹️"}
                {hover >= 1.5 && hover < 2.5 && "Okay 🙂"}
                {hover >= 2.5 && hover < 3.5 && "Average 😄"}
                {hover >= 3.5 && hover < 4.5 && "Good 😇"}
                {hover >= 4.5 && "Awesome 🤩"}
              </div>
            )}
            <Rating
              name="half-rating"
              value={value}
              size="large"
              precision={0.5}
              style={{ color: "#fff" }}
              emptyIcon={
                <StarBorderIcon style={{ color: "#fff", fontSize: "30px" }} />
              }
              onChange={(event, newValue) => {
                if(newValue > star){
                  window.open(reviewUrl,"_blank")
                }else{
                  setValue(newValue);
                  setShowModal3(false)
                  setOpenGoogleFeedback(true)
                }
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const defaultProps = {
  modalStyle: "DM-Sans-font-div",
};

export default GoogleReviewModal;
