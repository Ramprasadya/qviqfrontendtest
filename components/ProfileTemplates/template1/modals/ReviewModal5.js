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
import { serverUrl } from "../../../../config";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
export default function ReviewModal4({ setShowModal3, ...props } ) {props = useDefaultProps(props);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        className={`flex flex-col fixed bottom-0 md:bottom-1/2 md:translate-y-1/2 left-1/2 -translate-x-1/2 h-fit rounded-t-2xl md:rounded-2xl md:w-[600px] w-full p-2 ${props.modalStyle}`}
        style={{ zIndex: "998", height: "fit-content", background: "#fff" }}
      >
        <div className="flex justify-between items-center px-3 py-4 xsm:px-5 md:p-4">
          <p className="text-lg text-black md:text-xl tracking-normal font-semibold">
            Write a Review
          </p>
          <span
            className="text-2xl logo-fill"
            style={{ cursor: "pointer", padding: "0" }}
            onClick={() => setShowModal3(false)}
          >
            <HiOutlineX className="text-[#000]" />
          </span>
        </div>
        <div className="mx-3 xsm:mx-5 md:mx-6   ">
          <div
            className={`rounded-[28px] flex flex-col items-center gap-1 py-6 xl:py-9`}
            style={{
              background: "rgba(0, 65, 234, 0.21)",
            }}
          >
            {hover === -1 ? (
              <div className="text-[24px] font-bold text-[#033CCE]">
                {value >= 0 && value < 1.5 && "Bad ☹️"}
                {value >= 1.5 && value < 2.5 && "Okay 🙂"}
                {value >= 2.5 && value < 3.5 && "Average 😄"}
                {value >= 3.5 && value < 4.5 && "Good 😇"}
                {value >= 4.5 && "Awesome 🤩"}
              </div>
            ) : (
              <div className="text-[24px] font-bold text-[#033CCE]">
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
            <label className="text-black text-[14px] font-medium">
              {reviewFormat.length > 0 && reviewFormat[0].name
                ? reviewFormat[0].name
                : "Full Name"}
            </label>

            <InputField
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              width="100%"
              height="40px"
              fontSize="14px"
              borderRadius={props.square ? "0px" : "8px"}
              backgroundColor="rgba(255, 255, 255, 0.10)"
              color="black"
            />
          </div>
          <div className="xl:mt-[24px] mt-[15px]">
            <label className="text-black text-[14px] font-medium">
              {reviewFormat.length > 0 && reviewFormat[0].email
                ? reviewFormat[0].email
                : "Email"}
            </label>
            <InputField
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              width="100%"
              height="40px"
              fontSize="14px"
              borderRadius={props.square ? "0px" : "8px"}
              backgroundColor="rgba(255, 255, 255, 0.10)"
              color="black"
            />
          </div>

          <div className="mt-[24px]">
            <TextFieldArea
              BnW="true"
              type="number"
              black="true"
              placeholder="Enter Message"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              label={
                reviewFormat.length > 0 && reviewFormat[0].message
                  ? reviewFormat[0].message
                  : "Message (optional)"
              }
              width="100%"
              height="40px"
              fontSize="14px"
              borderRadius={props.square ? "0px" : "8px"}
              color="black"
              labelStyle="text-black"
            />
          </div>
          <div className="mt-6 mb-4 xl:w-[520px] xl:h-[72px] flex flex-col gap-2 w-full justify-center items-center ">
            <Button
              style={props.buttonStyle}
              onClick={putFeedback}
              text={"Submit"}
              disabled={value === 0 || name === "" || email === ""}
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
