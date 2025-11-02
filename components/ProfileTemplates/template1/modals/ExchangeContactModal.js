import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import InputField from "../../../UiComponents/InputField";
import TextFieldArea from "../../../UiComponents/InputFIeldTextArea";
import { HiOutlineX } from "react-icons/hi";
import { UserContext } from "../../../Contexts/context";
import Button from "../../ProfileComponents/Button/Button";
import { serverUrl } from "../../../../config";
import ExchangeModalbg from "./ExchangeModalbgDesktop.svg";
import Image from "next/image";
import validator from "validator";
import { getCookie, SafeLocalStorage } from "@/components/utils";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
export default function ExchangeContactModal({ setShowModal2, ...props }) {
  props = useDefaultProps(props);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [services, setServices] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState([]);
  // const username = useContext(UserContext);

  const profile = props.username;
  const firstName = props.firstName;
  const profileImage = props.profileImage;
  const mobileNumber = props.mobileNumber;
  // console.log(mobileNumber);

  const [whatsappStatus, setwhatsappStatus] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${serverUrl}/whatsapp/getstatus/${profile}`
      );
      if (response?.data[0]?.sendMessage === undefined) {
        const token = getCookie("jwt_token");
        if (!token) {
          console.warn("JWT token missing. Skipping POST request.");
          return;
        }
        setwhatsappStatus(true);
        await axios.post(
          `${serverUrl}/whatsapp/status/${profile}`,
          {
            sendMessage: true,
            profile: profile,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
      } else {
        setwhatsappStatus(response?.data[0]?.sendMessage);
      }
      console.log(whatsappStatus);
    };
    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (name === "" || email === "" || phone === "") {
      setShowError(true);
      //console.log("error");
      return;
    }
    if (profile !== undefined && profile !== "") {
      const response = await fetch(`${serverUrl}/connect/connect/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile,
          name,
          email,
          services,
          message,
          phone,
          type: props.type,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.error) {
            //console.log(data.error);
          } else {
            console.log("whatsapp Status", whatsappStatus);
            if (whatsappStatus) {
              await sendMessageToSender();
              await sendTemplateMessageToReceiver();
            }
            await fetch(
              `${serverUrl}/analytics/connects/${props.type}/${props.profile}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.error) {
                  //console.log(data.error);
                } else {
                  props.setToastMessage("Exchange contact successfully");
                  props.setShowToast(true);
                  setName("");
                  setEmail("");
                  setServices("");
                  setMessage("");
                  setPhone("");
                  props.setLeadCapture(false);
                  setShowModal2(false);
                  setTimeout(() => {
                    props.setShowToast(false);
                    props.setToastMessage("");
                  }, 3000);
                }
              });
          }
        });
    }
  }

  const sendMessageToSender = async () => {
    const payload = {
      phone: phone,
      templateName: "connection_request",
      newuser: name,
      full: firstName,
    };

    try {
      const response = await fetch(`${serverUrl}/whatsapp/connectionRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      // console.log("Message sent successfully:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const sendTemplateMessageToReceiver = async () => {
    const payload = {
      phone: mobileNumber,
      templateName: "new_connection",
      name: name,
      userName: profile,
    };

    try {
      const response = await fetch(`${serverUrl}/whatsapp/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      // console.log("Message sent successfully:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchContact = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/connect/getContact/${profile}`
      );

      setContact(data);
      //console.log("dfafadfad", data);
    } catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    if (profile !== undefined && profile !== "") {
      fetchContact();
    }
  }, []);

  return (
    <div className="container" style={{ zIndex: "998" }}>
      <div
        className="modal-wrapper bg-[#00000054] backdrop-blur-[20px]"
        style={{ zIndex: "998" }}
      ></div>

      <div
        className={`flex flex-col h-fit overflow-hidden bg-white fixed bottom-0 md:bottom-1/2 md:translate-y-1/2 left-1/2 -translate-x-1/2  md:!rounded-[30px] !rounded-[14px] !rounded-b-none md:w-[600px] w-full p-5 md:p-8`}
        style={{ zIndex: "998" }}
      >
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center py-3 md:p-0  mb-[5px] sm:mb-[20px]">
            <p className="text-[20px] md:text-[28px] md:font-semibold md:Inter-font-div font-medium Archivo-Black-font-div">
              Let’s Connect
            </p>
            <span
              className="text-2xl logo-fill"
              style={{ cursor: "pointer", padding: "0" }}
              onClick={() => setShowModal2(false)}
            >
              <HiOutlineX />
            </span>
          </div>

          <div className="h-fit max-h-[66vh] transition-[300ms] overflow-y-scroll  ">
            <div className=" w-full h-fit">
              <div className="w-full md:h-fit h-[100px] bg-black relative rounded-[12px] flex items-center overflow-hidden">
                <div className="w-1/2 h-[156px] flex flex-col justify-center items-center relative">
                  <Image
                    className="absolute h-full w-auto z-0 left-[2%] scale-[200%] xsm1:left-[2%] xsm1:scale-[160%] md:left-[-2%] md:top-[-15%] md:scale-[190%]"
                    src={ExchangeModalbg}
                    alt="ExchangeModalbg"
                  />
                  <img
                    // onClick={() => setOpenQR(true)}
                    className="object-cover absolute z-[1] left-[20%] md:left-[15%]  border-[1px] md:border-[2.4px] border-white rounded-full md:w-[104px] md:h-[104px] xsm:w-[70px] xsm:h-[70px] w-[60px] h-[60px]"
                    src={profileImage}
                    alt=""
                  />
                </div>

                <div className="w-[70%] md:ml-[-90px] md:pr-[10px] pr-[5px] break-all ml-[-20px] h-full flex flex-col justify-center items-start">
                  <h1
                    className="text-white flex flex-wrap gap-x-1 gap-y-0  md:text-[26px] 
                    xsm:text-[14px] text-[10px] font-normal Plus-Jakarta-Sans-font-div"
                  >
                    Connect with
                    <span className="font-semibold">{firstName}</span>
                  </h1>{" "}
                  <p className="text-white md:text-[20px] pr-[5px] xsm:text-[14px] text-[10px] break-normal font-normal Plus-Jakarta-Sans-font-div">
                    Let's Talk: Big ideas start with small conversations.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:mb-[32px] mt-[24px]">
              <label className=" md:text-[20px] text-[14px] Plus-Jakarta-Sans-font-div font-medium">
                {" "}
                {contact.length > 0 && contact[0].fullName
                  ? contact[0].fullName
                  : "Full Name *"}
              </label>
              <InputField
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                width="100%"
                height="40px"
                fontSize="14px"
                borderRadius={"8px"}
              />
              {showError && name.length <= 0 ? (
                <label className="text-[#FE7171] text-[14px]">
                  Please, Enter your name
                </label>
              ) : (
                ""
              )}
            </div>

            <div className=" mt-[11px] md:mt-[25px]">
              <label className=" md:text-[20px] text-[14px] Plus-Jakarta-Sans-font-div font-medium">
                {contact.length > 0 && contact[0].mobileNumber
                  ? contact[0].mobileNumber
                  : "Whatsapp Number *"}
              </label>
              <InputField
                type="number"
                placeholder="Enter Whatsapp no."
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                width="100%"
                height="40px"
                fontSize="14px"
                borderRadius={"8px"}
                // marginBottom="32px"
              />
              {showError && phone.length <= 0 ? (
                <label className="text-[#FE7171] text-[14px]">
                  Please Enter your Phone Number
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="md:mt-[25px] mt-[11px]">
              <label className="md:text-[20px] text-[14px] Plus-Jakarta-Sans-font-div font-medium">
                {" "}
                {contact.length > 0 && contact[0].email
                  ? contact[0].email
                  : "Email *"}
              </label>
              <InputField
                type="email"
                value={email}
                placeholder="Enter Email"
                onChange={(event) => {
                  let new_Email = event.target.value;

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
                borderRadius={"8px"}
              />
              {(showError && email.length <= 0) || emailError ? (
                <label className="text-[#FE7171] text-[14px]">
                  {emailError || "Please, enter a valid email!"}
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="md:mt-[25px] mt-[11px] flex flex-col gap-1.5">
              <label className="md:text-[20px] text-[14px] Plus-Jakarta-Sans-font-div font-medium flex">
                {contact.length > 0 && contact[0].message
                  ? contact[0].message
                  : "Message"}
              </label>
              <TextFieldArea
                value={message}
                placeholder="Write a message"
                onChange={(event) => setMessage(event.target.value)}
                width="100%"
                height="40px"
                fontSize="14px"
                borderRadius={"8px"}
                marginBottom="32px"
                labelStyle="hidden"
                color="black"
              />
              <p className="md:text-[14px] text-[12px] font-normal Plus-Jakarta-Sans-font-div">
                We do not share your personal information with anyone
              </p>
            </div>
            <div className="mt-6 pb-4 xl:h-[72px] flex w-full justify-center items-center ">
              <Button
                style={
                  "bg-black md:!text-[20px] Plus-Jakarta-Sans-font-div md:!py-[17px] !py-[10px] !text-[13px] font-semibold text-white w-full rounded-[12px] mx-[23px]"
                }
                onClick={async (e) => {
                  handleSubmit(e);
                }}
                text={"Let’s Connect"}
                // disabled={name === "" || email === "" || phone === ""}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultProps = {
  modalStyle: "DM-Sans-font-div",
};
