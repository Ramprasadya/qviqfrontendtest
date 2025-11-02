import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import InputField from "../../../UiComponents/InputField";
import TextFieldArea from "../../../UiComponents/InputFIeldTextArea";
import { HiOutlineX } from "react-icons/hi";
import Button from "../../ProfileComponents/Button/Button";
import { serverUrl } from "../../../../config";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
export default function IphoneExchangeContact({ setShowModal2, ...props } ) {props = useDefaultProps(props);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [services, setServices] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState([]);
  const profile = props.username;

  const fetchContact = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/connect/getContact/${profile}`
      );
      setContact(data);
    }
    catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    if (profile !== undefined && profile !== '') {
      fetchContact();
    }
  }, []);

  return (
    <div className="container" style={{ zIndex: "998" }}>
      <div className="modal-wrapper backdrop-blur-[20px]" style={{ zIndex: "997", background: props.background }} />
      <div className="modal-wrapper backdrop-blur-md" style={{ zIndex: "998", background: '#00000054' }} />

      <div
        className={`flex flex-col bg-white fixed bottom-0 left-0 rounded-2xl w-full max-h-[80%] overflow-scroll p-0 ${props.modalStyle}`}
        style={{ zIndex: "998" }}
      >
        <div className="flex justify-between items-center p-4">
          <p className="text-base tracking-normal font-semibold">Exchange Contact</p>
          <span
            className="text-xl hover:cursor-pointer"
            onClick={props.onClick}
          >
            <HiOutlineX />
          </span>
        </div>

        <div className="mx-4 border-t h-full overflow-auto">
          <div className="mt-4">
            <label className="text-sm font-medium">
              {contact.length > 0 && contact[0].fullName ? contact[0].fullName : "Full Name"}
            </label>
            <InputField
              text="Enter Current Password"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              width="100%"
              height="40px"
              fontSize="14px"
              borderRadius={props.square ? "0px" : "8px"}
            />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium">
              {contact.length > 0 && contact[0].email ? contact[0].email : "Email"}
            </label>
            <InputField
              text="Enter New Password"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              width="100%"
              height="40px"
              fontSize="14px"
              borderRadius={props.square ? "0px" : "8px"}
            />
          </div>
          <div className="mt-4">
            <label className=" text-sm font-medium">
              {contact.length > 0 && contact[0].mobileNumber ? contact[0].mobileNumber : "Phone Number"}
            </label>
            <InputField
              text="Confirm New Password"
              type="number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              width="100%"
              height="40px"
              fontSize="14px"
              borderRadius={props.square ? "0px" : "8px"}
              marginBottom="32px"
            />
          </div>
          <div className="mt-[-12px] flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              {contact.length > 0 && contact[0].message ? contact[0].message : "Message"} (optional)
            </label>
            <TextFieldArea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              width="100%"
              height="40px"
              fontSize="14px"
              borderRadius={props.square ? "0px" : "8px"}
              marginBottom="32px"
              labelStyle='hidden'
            />
          </div>
          <div className="mt-6 pb-4 flex w-full justify-center items-center ">
            <Button
              style={props.buttonStyle}
              onClick={props.onClick}
              text={"Submit"}
              disabled={name === "" || email === "" || phone === ""}
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
