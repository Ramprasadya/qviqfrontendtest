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
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
export default function ReviewModal2({ setShowModal3, ...props } ) {props = useDefaultProps(props);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showError, setShowError] = useState(false);
  const [reviewFormat, setReviewFormat] = useState([]);
  const profile = props.username;
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [type, setType] = useState("");

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

  const putFeedback = async () => {
    if(name === "" || email === ""){
      setShowError(true)
      //console.log("error")
      return
    }
    try {
      const { data } = axios.post(
        `${serverUrl}/review/review/${type}/${profile}`,
        {
          name: name,
          email: email,
          stars: value,
          review: review,
          profile: profile,
          isOn: false,
        }
      );
      setEmail(" ");
      setName(" ");
      setReview(" ");
      setValue(" ");
      setShowModal3(false);
      props.setToastMessage("Review Submitted Successfully");
      props.setShowToast(true);
      setTimeout(() => {
        props.setShowToast(false);
        props.setToastMessage("");
      }, 3000);
    } catch (err) {
      //console.log(err);
      props.setToastMessage("Something went wrong!");
      props.setShowToast(true);
      setTimeout(() => {
        props.setShowToast(false);
        props.setToastMessage("");
      }, 3000);
    }
  };

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
        <div className="flex justify-between items-center px-3 py-4 xsm:px-5 md:p-4">
          <p className="text-lg md:text-xl tracking-normal font-semibold">
            Write a Review
          </p>
          <span
            className="text-2xl logo-fill"
            style={{ cursor: "pointer", padding: "0" }}
            onClick={() => setShowModal3(false)}
          >
            <HiOutlineX />
          </span>
        </div>
        <div className="mx-3 xsm:mx-5 md:mx-6   ">
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
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
          </div>
          <div className="xl:mt-6 mt-[15px]">
            <label className=" text-[14px] font-medium">Full name</label>

            <InputField
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              width="100%"
              height="40px"
              fontSize="14px"
              borderRadius={props.square ? "0px" : "8px"}
            />{showError && name.length<=0 ? <label className="text-[#FE7171] text-[14px]">Please, Enter your name</label>:""}
          </div>
          <div className="xl:mt-[24px] mt-[15px]">
            <label className=" text-[14px] font-medium">Email</label>
            <InputField
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>{
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
            /> {showError && email.length<=0 || emailError  ? <label className="text-[#FE7171] text-[14px]">{emailError || "Please, enter a valid email!"}</label>:""}
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
              borderRadius={props.square ? "0px" : "8px"}
              color="black"
            />
          </div>
          <div className="mt-6 mb-4 xl:w-[520px] xl:h-[72px] flex flex-col gap-2 w-full justify-center items-center ">
            <Button
              style={props.buttonStyle}
              onClick={putFeedback}
              text={"Submit"}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultProps = {
  modalStyle: "DM-Sans-font-div",
};
