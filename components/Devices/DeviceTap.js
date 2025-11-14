import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import * as hi from "react-icons/hi";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DeviceTap = (props) => {
  const [output, setOutput] = useState("");
  const url = `https://${props.username}.qviqfrontendtest.vercel.app`;
  useEffect(() => {
    const writeURLToNFC = async () => {
      const ndef = new window.NDEFReader();
      const abortController = new AbortController();
      abortController.signal.onabort = (event)=>{
        //console.log("NFC Write Aborted Due To Timeout: ",event);
      };
      setTimeout(()=>{abortController.abort()},300000);
      ndef
        .write({
          records: [{ recordType: "url", data: url }],
        },{ signal: abortController.signal })
        .then(() => {
          setCardActivated(true);
        })
        .catch((error) => {
          //console.log(`Write failed :-( try again: ${error}.`);
        });
    };
    if(props.open){
      if ("NDEFReader" in window) {
        writeURLToNFC();
      } else {
        setOutput("NFC writing not supported in this browser.");
      }
    }
  });

  const handleClose = () => {
    props.setOpen(false);
  };

  const [cardActivated, setCardActivated] = React.useState(false);
  const isAndroid = props.isAndroid;

  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: 24 },
      }}
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {!cardActivated ? (
        <div className="w-screen fixed left-0 bottom-0 bg-white px-5 py-6 rounded-t-2xl">
          <div className="flex gap-2">
            <h1 className="text-base xsm:text-lg font-semibold">
              Scan Your Qviq Device
            </h1>
            <span
              className="ms-auto text-lg pt-1"
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            >
              <hi.HiOutlineX />
            </span>
          </div>
          <hr className="text-gray-400 mt-6" />
          <div
            className={`flex ${
              isAndroid ? "items-start top-10" : "items-center"
            } justify-center relative h-[300px]`}
          >
            <img
              src={require("./images/card.png").default.src}
              alt=""
              className="w-[161px] h-[92px]"
            />
            <img
              src={require(`./images/${isAndroid ? "android" : "iphone"}.png`).default.src}
              alt=""
              className={`w-[120px] h-[245px] absolute right-0 ${
                isAndroid ? "top-0" : "top-[12%]"
              } device-iphone`}
            />
          </div>
          <p className="font-medium text-center pt-2 text-sm xsm:text-base">
            To activate, place your Qviq device in the middle of the back of
            your phone, <br /> as shown in the image.
          </p>
          <p>{output}</p>
          <div className="flex justify-center mt-6" onClick={handleClose}>
            Cancel
          </div>
        </div>
      ) : (
        <div className="w-screen fixed left-0 bottom-0 bg-white px-5 py-6 rounded-t-2xl">
          <div className="flex gap-2">
            <h1 className="text-base xsm:text-lg font-semibold">
              Qviq Device Activated!
            </h1>
            <span
              className="ms-auto text-lg pt-1"
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            >
              <hi.HiOutlineX />
            </span>
          </div>
          <hr className="text-gray-400 my-6" />
          <div className="flex flex-col justify-center items-center relative">
            <img
              src={require("./images/tapopprofileactivated.png").default.src}
              alt=""
              className=""
            />
            <p className="font-medium text-center py-6">
              Hurray! <br /> Your Qviq device is activated successfully!
            </p>
            <div className="w-full">
              <PrimaryButton2
                text="Done"
                onClick={handleClose}
                width={"100%"}
              />
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default DeviceTap;
