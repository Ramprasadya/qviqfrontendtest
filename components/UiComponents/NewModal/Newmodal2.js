import React, { useState, useCallback, useEffect, useContext } from "react";
import { HiOutlineX } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import PrimaryButton2 from "../PrimaryButton2";
import axios from "axios";
import { serverUrl } from "../../../config";
import "./newmodal2.css";
import { UserContext } from "../../Contexts/context";
import { useRouter } from "next/navigation";

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
function NewModal(props) {
  props = useDefaultProps(props);

  const navigate = useRouter();
  const { username } = useContext(UserContext);

  const handleEscape = useCallback((event) => {
    if (event.key === "Escape") {
      props.onClick();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape]);

  const style = {
    maxWidth: props.width,
    height: props.height,
  };

  const [pricingData, setPricingData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/admin/pricing`);
        setPricingData(response.data.pro.monthly);
      } catch (error) {
        console.error("Error fetching pricing data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      id="myModal"
      className="modal !h-[80vh]"
      style={{ display: `${props.onModal ? "flex" : "none"}`, zIndex: "1000" }}
    >
      <div
        className="modal-content !mt-0 !h-[70vh]"
        // style={style}
      >
        {/* to close modal  */}

        <div className="flex items-center justify-between px-5 md:px-6 py-6">
          <p className="text-lg md:text-xl text-[#1A1A1A] tracking-normal font-semibold">
            {props.text}
          </p>
          <span
            onClick={() => props.onClick((prev) => !prev)}
            className="text-2xl text-black hover:scale-110 logo-fill"
            style={{ cursor: "pointer" }}
          >
            <HiOutlineX />
          </span>
        </div>

        <div className="mx-6 !mb-[30px] border-t-2 modal-child-div !h-[60vh]  overflow-y-scroll pb-[20px] sm:pb-[10px]">
          {props.children}
          <div className="flex justify-center items-center py-6">
            <PrimaryButton2
              text={`Get PRO Plan at ₹${pricingData}`}
              onClick={() => {
                navigate.push(`/plan/${username}`);
              }}
              icon={<HiArrowSmRight />}
              color="linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
            />
          </div>
        </div>
      </div>

      <div className="h-[200px]"></div>
    </div>
  );
}
const defaultProps = {
  maxWidth: "640px",
  height: "fit-content",
};
export default NewModal;
