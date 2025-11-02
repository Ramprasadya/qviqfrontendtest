import SwitchText from "./SwitchText";
import React, { useState, useEffect } from "react";
import * as hi from "react-icons/hi";
import Switch from "react-switch";
import Axios from "axios";
import { serverUrl } from "../../config";
import HoverComponent from "./HoverComponent/HoverComponent";
import { getCookie } from "../utils";

function SwitchForContact({ profile, switchStates, setSwitchStates }) {
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
  const handleToggle = (index, value) => {
    const newswitchStates = [...switchStates];
    newswitchStates[index].contactForm = value;
    setSwitchStates(newswitchStates);
    saveToggleState(index, value); // Save the toggle state to MongoDB
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
    <div className="flex justify-between py-3 px-6">
      <div className="flex items-center gap-3">
        <p className=" font-light s-color ">Allow Lead Capture</p>
        <div
          className="s-color "
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseOut}
          style={{ cursor: "pointer" }}
        >
          <hi.HiOutlineInformationCircle />
          {isHovering && (
            <div className="absolute ml-[17.5rem] top-[22.5rem] md:left-[1.5rem] ">
              <HoverComponent />
            </div>
          )}
        </div>
        {/* <span className="s-color cursor-pointer">
          <hi.HiOutlineInformationCircle />
        </span> */}
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
  );
}

export default SwitchForContact;
