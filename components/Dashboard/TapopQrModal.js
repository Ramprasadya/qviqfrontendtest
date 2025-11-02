import React, { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import TapopQr from "../UiComponents/BottomComponents/TapopQr";
import TapopGoogleQr from "../UiComponents/BottomComponents/TapopGoogleQr";

const TapopQrModal = (props) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container" style={{ zIndex: "998" }}>
      <div className="modal-wrapper" style={{ zIndex: "998" }}></div>

      <div
        className="modal-container flex flex-col !h-[80vh] sm:!h-fit min-w-full md:min-w-fit md:max-w-[656px] !bottom-0"
        style={{ zIndex: "998", top: `${windowWidth > 768 ? "50%" : "unset !important"}` }}
      >
        <div className="flex justify-between items-center px-3 xsm:px-5 py-4 xsm:py-6 md:px-6">
          <p className="text-lg md:text-xl text-black tracking-normal font-semibold">
            Qviq Qr
          </p>
          <span
            onClick={props.onClick}
            className="text-2xl text-black logo-fill"
            style={{ cursor: "pointer", padding: "0" }}
          >
            <HiOutlineX />
          </span>
        </div>
        
        <div className="mx-3 xsm:mx-5 md:mx-6 pt-5 md:pt-6 border-t h-fit overflow-auto ">
          {
            !props.googleQr ? (

              <TapopQr
                handleClose={props.onClick}
                dummyState1={props.dummyState1}
                setDummyState1={props.setDummyState1}
                templateId={props.templateId}
                showQrCodeFunction={props.showQrCodeFunction}
              />
            ) :(

              <TapopGoogleQr
                handleClose={props.onClick}
                dummyState1={props.dummyState1}
                setDummyState1={props.setDummyState1}
                templateId={props.templateId}
                showQrCodeFunction={props.showQrCodeFunction}
                setisLoading={props.setisLoading}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default TapopQrModal;
