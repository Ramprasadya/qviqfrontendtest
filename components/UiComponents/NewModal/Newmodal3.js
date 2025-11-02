import React, { useState, useCallback, useEffect, useContext } from "react";
import { HiOutlineX } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import PrimaryButton2 from "../PrimaryButton2";
import "./newmodal2.css";
import { UserContext } from "../../Contexts/context";
import axios from "axios";
import { serverUrl } from "../../../config";
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

  const style = {
    maxWidth: props.width,
    height: props.height,
  };
  const navigate = useRouter();
  const { username } = useContext(UserContext);

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
      className="modal"
      style={{
        display: `${props.onModal ? "flex" : "none"}`,
        zIndex: "998",
        overflowY: "hidden",
        paddingBottom: "20px",
      }}
    >
      <div
        className="modal-content !h-[calc(100vh-10rem)] flex flex-col justify-between"
        style={style}
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
        <div className="mx-6 border-t-2 modal-child-div !h-[80vh]">
          <div className="h-[80vh] max-h-[80vh] overflow-y-scroll pb-[20px] sm:pb-[10px]">
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
      </div>
    </div>
  );
}
const defaultProps = {
  maxWidth: "640px",
  height: "fit-content",
};
export default NewModal;
