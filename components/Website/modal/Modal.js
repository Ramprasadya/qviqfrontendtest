import React from "react";
import { HiOutlineX } from "react-icons/hi";
import { RiVipCrownFill } from "react-icons/ri";
import "./modal.css";

function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function Modal(props) {props = useDefaultProps(props);
  return (
    <div className="container relative "  style={{ zIndex: '998' }}>
      {/* <div className="modal-wrapper" style={{ zIndex: '998' }}></div> */}

      <div className="flex flex-col modal-container min-w-full md:min-w-fit md:w-[90vw] xl:w-[70vw] !h-[calc(100vh-6rem)] !top-auto !bottom-0 md:!bottom-auto md:!top-1/2" style={{ zIndex: '998'}}>
        <div className="flex justify-between items-center px-5 py-4 xsm:py-6 md:px-6">
          <div className="www flex items-center  gap-x-3.5">
            <p className="text-lg md:text-xl text-black tracking-normal font-medium">
              {props.label}
            </p>
            {props.showSpan && (
              <span className=" text-yellow-400 text-xl md:text-2xl" style={{ padding: '0' }}>
                <RiVipCrownFill />
              </span>
            )}
          </div>
          <span
            onClick={props.onClick}
            className="text-2xl text-black hover:scale-110 logo-fill"
            style={{ cursor: 'pointer', padding: "0" }}
          >
            <HiOutlineX />
          </span>
        </div>
        <div className="mx-5 md:mx-6 border-t h-full overflow-auto ">{props.children}</div>
      </div>
    </div>
  );
}

const defaultProps = {
  label: "hello world",
  color: "red",
  showSpan: false,
};

export default Modal;
