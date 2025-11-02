import SwitchText from "./SwitchText";
import React, { useState, useEffect, useContext } from "react";
import * as hi from "react-icons/hi";
import Switch from "react-switch";
import Axios from "axios";
import HoverComponent from "./HoverComponent/HoverComponent";
import { serverUrl } from "../../config";
import { UserContext } from "../Contexts/context";
import { getCookie } from "../utils";

function SwitchContainer({
  profile,
  switchStates,
  setSwitchStates,
  toggleStates,
}) {
  const [checked, setChecked] = useState(false);
  // const profile=useParams();
  // const [switchStates, setSwitchStates] = useState([]);
  // const fetchreview = async () => {
  //   const { data } = await Axios.get(
  //     `${serverUrl}/getUser/getUser/${profile}`
  //   );
  //   setSwitchStates(data);
  //   console.log(data);
  // };

  // useEffect(() => {
  //   fetchreview();
  // }, []);

  const { setQuickSelectContext, setLeadCaptureContext } =
    useContext(UserContext);

  const handleToggle = (index, value) => {
    const newswitchStates = [...switchStates];
    newswitchStates[index].contactForm = value;
    setSwitchStates(newswitchStates);
    saveToggleState(index, value); // Save the toggle state to MongoDB
    // setLeadCaptureContext(value);
  };

  const saveToggleState = (index, value) => {
    fetch(`${serverUrl}/getUser/toggle/${switchStates[index]._id}/${profile}`, {
      method: "PUT",
      body: JSON.stringify({ contactForm: value }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    });
  };

  const handleQuickToggle = (index, value) => {
    const newswitchStates = [...switchStates];
    newswitchStates[index].quickSelect = value;
    setSwitchStates(newswitchStates);
    saveQuickToggleState(index, value); // Save the toggle state to MongoDB
    // setQuickSelectContext(value);

    // if (value) {
    //   Axios.put(`${serverUrl}/getUser/quickselect`, {
    //     profile: profile,
    //   })
    //     .then((response) => {})
    //     .catch((error) => console.log(error));
    // }
  };

  const saveQuickToggleState = (index, value) => {
    fetch(
      `${serverUrl}/getUser/quicktoggle/${switchStates[index]._id}/${profile}`,
      {
        method: "PUT",
        body: JSON.stringify({ quickSelect: value }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      }
    );
  };

  // hover state 1
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  // hover state 2
  const [isHovering2, setIsHovering2] = useState(false);
  const handleMouseOver2 = () => {
    setIsHovering2(true);
  };

  const handleMouseOut2 = () => {
    setIsHovering2(false);
  };

  return (
    <div className="flex md:flex-row bg-[#F3F3F3] rounded-[8px] flex-col mt-[8px] xsm:mb-[28px] mb-[22px] md:mb-10 z-0 relative">
      <div
        className="w-full justify-between flex items-center gap-7 px-3 md:px-4 py-3 rounded-l-[8px]"
        style={{ background: "#FAFAFA", }}
      >
        <div className="flex items-center gap-2">
          <p className=" font-light s-color text-sm md:text-base">
            Allow Lead Capture
          </p>
          <div
            className="s-color "
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseOut}
            style={{ cursor: "pointer" }}
          >
            <hi.HiOutlineInformationCircle />
            {isHovering && (
              <div className="absolute left-0 top-0">
                <HoverComponent />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {switchStates.map((off, index) => (
            <Switch
              key={index}
              checked={off.contactForm}
              onChange={(value) => handleToggle(index, value)}
              onColor="#12A26E"
              offColor="#A7A7A7"
              checkedIcon={false}
              uncheckedIcon={false}
              height={24}
              width={44}
            />
          ))}
        </div>
      </div>

      <div className="relative bg-slate-300 my-[10px] w-[2px] hidden md:block" />

      <div
        className="w-full justify-between flex items-center gap-7 px-3 md:px-4 py-3 rounded-r-[8px]"
        style={{ background: "#FAFAFA", }}
      >
        <div className="flex items-center gap-2">
          <p className="font-light s-color text-sm md:text-base">Qviq Select</p>
          <div
            onMouseOver={handleMouseOver2}
            onMouseLeave={handleMouseOut2}
            className="s-color"
            style={{ cursor: "pointer" }}
          >
            <hi.HiOutlineInformationCircle />
            {isHovering2 && (
              <div className="absolute left-0 top-6 xl:left-auto xl:right-[370px] xl:top-0">
                <HoverComponent
                  label="Quick Select"
                  text="You can display all of the links below on your Qviq profile by enabling 'Quick select'."
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {switchStates.map((off, index) => (
            <>
              {toggleStates.length > 0 && (
                <Switch
                  checked={off.quickSelect}
                  onChange={(value) => handleQuickToggle(index, value)}
                  onColor="#12A26E"
                  offColor="#A7A7A7"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={24}
                  width={44}
                />
              )}
              {toggleStates.length === 0 && (
                <Switch
                  checked={false}
                  onChange={() => {}}
                  onColor="#12A26E"
                  offColor="#A7A7A7"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={24}
                  width={44}
                  disabled
                />
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SwitchContainer;
