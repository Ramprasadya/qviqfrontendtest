import React, { useContext, useEffect, useState } from "react";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import InputField from "../../../UiComponents/InputField";
import TextFieldArea from "../../../UiComponents/InputFIeldTextArea";
import { HiOutlineX } from "react-icons/hi";
import { UserContext } from "../../../Contexts/context";
import { serverUrl } from "../../../../config";

export default function ExchangeContactModal({ setShowModal2, ...props }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [services, setServices] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState([]);

  const username = useContext(UserContext);
  const profile = username.username;
  async function handleSubmit(event) {
    event.preventDefault();
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
      }),
    })
      .then((res) => res.json())
      .then(async(data) => {
        if (data.error) {
          //console.log(data.error);
        } else {
          await fetch(`${serverUrl}/analytics/connects/${props.type}/${props.profile}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({})
            })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                //console.log(data.error);
              } else {
                toast.success("Connect added successfully");
                setName("");
                setEmail("");
                setServices("");
                setMessage("");
                setPhone("");
              }
          });
        }
      });
  }
  const fetchContact = async () => {
    const { data } = await axios.get(
      `${serverUrl}/connect/getContact/${profile}`
    );
    setContact(data);
    
  };
  useEffect(() => {
    fetchContact();
  }, []);
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
        <div className="flex justify-between items-center px-3 py-3 xsm:px-5 xsm:py-2 md:p-4 ">
          <p className="text-lg md:text-xl text-black tracking-normal font-semibold">
            Exchange Contact
          </p>
          <span
            className="text-2xl text-black logo-fill"
            style={{ cursor: "pointer", padding: "0" }}
            onClick={() => setShowModal2(false)}
          >
            <HiOutlineX />
          </span>
        </div>

        <div className="mx-3 xsm:mx-5 md:mx-6 border-t h-full overflow-auto ">
          <div className="xl:mt-8 mt-[15px]">
            <label className=" text-[14px] font-medium text-[#1A1A1A]">
              Full name
            </label>

            <InputField
              text="Enter Current Password"
              type="text"
              placeholder="Enter Current Password"
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              text="Enter New Password"
              type="email"
              placeholder="Enter New Password"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              width="100%"
              height="40px"
              fontSize="14px"
            />
          </div>
          <div className=" mt-[15px] xl:mt-6">
            <label className=" text-[14px] font-medium text-[#1A1A1A]">
              Phone Number
            </label>
            <InputField
              text="Confirm New Password"
              type="number"
              placeholder="Confirm New Password"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              width="100%"
              height="40px"
              fontSize="14px"
              marginBottom="32px"
            />
          </div>
          <div className="mt-[-12px]">
            <TextFieldArea
              text="Confirm New Password"
              type="number"
              placeholder="Confirm New Password"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              label="Message (optional)"
              width="100%"
              height="40px"
              fontSize="14px"
              marginBottom="32px"
            />
          </div>
          <div className="mt-6 mb-[24px] xl:w-[520px] xl:h-[72px] flex w-full justify-center items-center ">
            <button
              className="rounded-[8px] border-r-[8px] text-[14px] font-bold text-[#121212] border-[#121212] bg-[#ffffff] border-b-[8px] h-[72px] text-center w-full  "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
