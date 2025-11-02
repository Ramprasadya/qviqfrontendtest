import React, { useEffect, useState } from "react";
import "./Modules.css";
import Appointments from "./ModuleTabs/Appointments";
import BuisnessHours from "./ModuleTabs/BuisnessHours";
import Review from "./ModuleTabs/Review";
import Contact from "../../ProfileInfo/Contact";
import { SafeLocalStorage } from "@/components/utils";

function Modules(props) {
  const [showTab, setShowTab] = useState("Business Hours");

  useEffect(() => {
    const tab = SafeLocalStorage.getItem("currentTab");
    setShowTab(tab ? tab : "Business Hours");
  }, []);

  const handleTabClick = (tab) => {
    SafeLocalStorage.setItem("currentTab", tab);
  };

  return (
    <div
      className={props.current === "Modules" ? "bottom-container" : "hidden"}
    >
      <div className="left w-full">
        <div className="pt-6 px-[14px] md:px-6 flex overflow-x-auto cursor-pointer">
          <div
            className={`"flex flex-col items-center px-[10px] md:px-[16px] py-[8px] md:min-w-[147px] w-full cursor-pointer" ${
              showTab === "Appointments"
                ? "border-b-[0.1875rem] border-b-[#1A1A1A]"
                : "border-b-[0.0625rem]"
            }`}
            onClick={() => {
              setShowTab("Appointments");
              handleTabClick("Appointments");
            }}
          >
            <p
              className={`tab-para w-full text-center whitespace-nowrap ${
                showTab === "Appointments"
                  ? "text-[#1A1A1A] !font-[600]"
                  : "text-[#817C7C] !font-[400]"
              }`}
            >
              Appointments
            </p>
          </div>

          <div
            className={`"flex flex-col items-center px-[10px] md:px-[16px] py-[8px] md:min-w-[147px] w-full cursor-pointer" ${
              showTab === "Business Hours"
                ? "border-b-[0.1875rem] border-b-[#1A1A1A]"
                : "border-b-[0.0625rem]"
            }`}
            onClick={() => {
              setShowTab("Business Hours");
              handleTabClick("Business Hours");
            }}
          >
            <p
              className={`tab-para w-full text-center whitespace-nowrap ${
                showTab === "Business Hours"
                  ? "text-[#1A1A1A] !font-[600]"
                  : "text-[#817C7C] !font-[400]"
              }`}
            >
              Business Hours
            </p>
          </div>

          <div
            className={`"flex flex-col items-center px-[10px] md:px-[16px] py-[8px] md:min-w-[147px] w-full cursor-pointer" ${
              showTab === "Reviews"
                ? "border-b-[0.1875rem] border-b-[#1A1A1A]"
                : "border-b-[0.0625rem]"
            }`}
            onClick={() => {
              setShowTab("Reviews");
              handleTabClick("Reviews");
            }}
          >
            <p
              className={`tab-para w-full text-center whitespace-nowrap ${
                showTab === "Reviews"
                  ? "text-[#1A1A1A] !font-[600]"
                  : "text-[#817C7C] !font-[400]"
              }`}
            >
              Reviews
            </p>
          </div>

          {/* <div
            className={`"flex flex-col items-center px-[16px] py-[8px] min-w-[147px] w-full cursor-pointer" ${
              showTab === "Contact Form"
                ? "border-b-[0.1875rem] border-b-[#1A1A1A]"
                    : "border-b-[0.0625rem]"
            }`}
            onClick={() => {
              setShowTab("Contact Form");
              handleTabClick("Contact Form");
            }}
          >
            <p className="tab-para w-full text-center">Contact Form</p>
          </div> */}
        </div>

        <div className="pt-7 px-[1.25rem] mb-[4rem] sm:px-6">
          <Appointments
            showTab={showTab}
            switchStates={props.switchStates}
            setSwitchStates={props.setSwitchStates}
            updateTemplateDataHandler={props.updateTemplateDataHandler}
          />
          <BuisnessHours
            showTab={showTab}
            switchStates={props.switchStates}
            setSwitchStates={props.setSwitchStates}
            updateTemplateDataHandler={props.updateTemplateDataHandler}
          />
          <Review
            showTab={showTab}
            switchStates={props.switchStates}
            setSwitchStates={props.setSwitchStates}
            updateTemplateDataHandler={props.updateTemplateDataHandler}
          />
          <div
            className={showTab === "Contact Form" ? "text-yellow" : "hidden"}
          >
            <Contact
              profile={props.profile}
              switchStates={props.switchStates}
              setSwitchStates={props.setSwitchStates}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modules;
