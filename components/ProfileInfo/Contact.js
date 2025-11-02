import React, { useEffect, useState } from "react";
import SwitchForContact from "../UiComponents/SwitchForContact";
import axios from "axios";
import * as hi from "react-icons/hi";
import InputFieldContactForm from "../UiComponents/InputFieldContactForm";
import { serverUrl } from "../../config";
import HoverComponent from "../UiComponents/HoverComponent/HoverComponent";
import { useContext } from "react";
import { UserContext } from "../Contexts/context";
import { getCookie } from "../utils";

export default function Contact({ profile, switchStates, setSwitchStates }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [isEditingMobile, setIsEditingMobile] = useState(false);

  const { username } = useContext(UserContext);
  useEffect(() => {
    axios.get(`${serverUrl}/connect/getContact/${profile}`).then((response) => {
      const data = response.data;
      if (data.length > 0) {
        if (data[0].fullName) {
          setFullName(data[0].fullName);
        }
        if (data[0].email) {
          setEmail(data[0].email);
        }
        if (data[0].message) {
          setMessage(data[0].message);
        }
        if (data[0].mobileNumber) {
          setMobileNumber(data[0].mobileNumber);
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
      .post(`${serverUrl}/connect/contact/fullName/${profile}`, data, {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      })
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
      .post(`${serverUrl}/connect/contact/email/${profile}`, data, {
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
      .post(`${serverUrl}/connect/contact/message/${profile}`, data, {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      })
      .then((response) => {
        
        setIsEditingMessage(false);
      });
  };

  const handleMobileNumberSubmit = (event) => {
    event.preventDefault();
    const subData = {
      mobileNumber,
    };

    const data = {
      profile,
      mobileNumber,
    };

    axios
      .post(`${serverUrl}/connect/contact/mobileNumber/${profile}`, data, {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      })
      .then((response) => {
        
        setIsEditingMobile(false);
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
      <div className="flex content-between ">
        <label className="text-[1rem] sm:text-[1.125rem] px-[1.25rem] sm:px-[1.5rem] sm:mt-[-0.5rem] font-[600]">
          Contact Form
        </label>
        <div
          className="s-color cursor-pointer "
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <hi.HiOutlineInformationCircle />
          {isHover && (
            <div className="absolute ml-[17.5rem] top-[20.4rem] md:left-[1.5rem] ">
              <HoverComponent
                label="Contact Form"
                text="Contact form when someone tries to get in touch through exchange contact."
              />
            </div>
          )}
        </div>
      </div>
      <SwitchForContact
        profile={profile}
        switchStates={switchStates}
        setSwitchStates={setSwitchStates}
      />
      <form>
        <div className="flex flex-col items-center justify-center sm:grid sm:grid-cols-2 gap-[1rem] sm:gap-[1.25rem] px-[1.25rem] sm:px-[1.5rem] ">
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
            onClick={handleMobileNumberSubmit}
            value={mobileNumber}
            onChange={(event) => setMobileNumber(event.target.value)}
            field="Mobile Number"
            isEditing={isEditingMobile}
            setIsEditing={setIsEditingMobile}
          />
          <InputFieldContactForm
            onClick={handleMessageSubmit}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            field="Message"
            isEditing={isEditingMessage}
            setIsEditing={setIsEditingMessage}
          />
        </div>
      </form>
    </div>
  );
}
