import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import PrimaryButton from "./PrimaryButton";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
function Accordian(props) {
  props = useDefaultProps(props);
  const [show, setShow] = useState(props.show);

  function toggleAccordShow() {
    setShow((prev) => !prev);
  }

  return (
    <>
      <div
        onClick={toggleAccordShow}
        className={`flex items-center justify-between pb-8`}
        style={{ paddingTop: props.pTop, cursor: "pointer" }}
      >
        <p className="text-base md:text-lg font-semibold">{props.text}</p>
        <div className="flex items-center gap-4">
          {props.buttonTitle && (
            <div className="">
              <PrimaryButton
                text={props.buttonTitle}
                onClick={props.linkFunction}
              />
            </div>
          )}

          <span className="text-2xl" style={{ padding: "0 8px 0 0" }}>
            {show ? <HiChevronUp /> : <HiChevronDown />}
          </span>
        </div>
      </div>
      <div className=" border-b-2 overflow-visible">
        {show && props.children}
      </div>
    </>
  );
}

const defaultProps = {
  pTop: "2.25em",
  show: false,
};

export default Accordian;
