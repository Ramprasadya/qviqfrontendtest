import React, { useEffect, useState } from "react";
import axios from "axios";
import * as hi from "react-icons/hi";
import { serverUrl } from "../../../../config";
import HoverComponent from "../../HoverComponent/HoverComponent";
import InputFieldContactForm from "../../InputFieldContactForm";
import Switch from "react-switch";
import { getCookie } from "@/components/utils";
export default function ReviewFromUser(props) {
  const profile = props.profile;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState(false);

  useEffect(() => {
    axios
      .get(`${serverUrl}/review/reviewForm/${props.type}/${profile}`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          if (data[0].name) {
            setFullName(data[0].name);
          }
          if (data[0].email) {
            setEmail(data[0].email);
          }
          if (data[0].message) {
            setMessage(data[0].message);
          }
        }
      });
  }, []);

  const handleFullNameSubmit = (event) => {
    event.preventDefault();

    const data = {
      profile,
      fullName,
    };

    axios
      .post(
        `${serverUrl}/review/review/fullName/${props.type}/${profile}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
        }
      )
      .then((response) => {
        
        setIsEditingFullName(false);
      });
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();

    const data = {
      profile,
      email,
    };

    axios
      .post(`${serverUrl}/review/review/email/${props.type}/${profile}`, data, {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      })
      .then((response) => {
        
        setIsEditingEmail(false);
      });
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();

    const data = {
      profile,
      message,
    };

    axios
      .post(
        `${serverUrl}/review/review/message/${props.type}/${profile}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
        }
      )
      .then((response) => {
        
        setIsEditingMessage(false);
      });
  };

  const [isHover, setIsHover] = useState(false);

  const handleMouseOver = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div className="py-[1.5rem]">
      {/* <div className="flex items-center py-7 gap-4">
        <p className="text-lg font-semibold">
          Add a review form to your profile
        </p>
        {props.switchStates.map((off, index) => (
          <>
            <Switch
              checked={off.reviewSwitch}
              onChange={(value) => props.handleToggle(index, value)}
              onColor="#12A26E"
              offColor="#A7A7A7"
              checkedIcon={false}
              uncheckedIcon={false}
              height={24}
              width={44}
            />
          </>
        ))}
      </div> */}
      <p className="text-sm text-cGrey font-medium">
        Your review form contains the following text fields:
      </p>

      <div className="flex flex-col items-center justify-center sm:grid sm:grid-cols-2 gap-[1rem] sm:gap-[1.25rem] mt-[1.5rem]">
        <InputFieldContactForm
          onClick={handleFullNameSubmit}
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          field="Full Name"
          isEditing={isEditingFullName}
          setIsEditing={setIsEditingFullName}
        />
        <InputFieldContactForm
          onClick={handleEmailSubmit}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          field="Email"
          isEditing={isEditingEmail}
          setIsEditing={setIsEditingEmail}
        />
        <InputFieldContactForm
          onClick={handleMessageSubmit}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          field="Review"
          isEditing={isEditingMessage}
          setIsEditing={setIsEditingMessage}
        />
      </div>
      <div className="flex items-center py-7 gap-4">
        <p className="text-base text-cGrey">Add star ratings</p>
        {props.switchStates.map((off, index) => (
            <Switch
              key={index}
              checked={off.starSwitch}
              onChange={(value) => props.handleStarToggle(index, value)}
              onColor="#12A26E"
              offColor="#A7A7A7"
              checkedIcon={false}
              uncheckedIcon={false}
              height={24}
              width={44}
            />
        ))}
      </div>
    </div>
  );
}
