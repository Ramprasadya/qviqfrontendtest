import React, { useContext } from "react";
import { HiOutlineCube, HiOutlineShieldCheck } from "react-icons/hi";
import "./UiStyles.css";
import "./iconTextStyle.css"
import { UserContext } from "../Contexts/context";


const StarterButton = () => {
  const { userType, userIcon } = useContext(UserContext);

  return (
    <button type="button" className=" starter-btn flex items-center rounded-full font-medium text-lg ">
      <span className="starter-btn-logo text-[#fb3909] "> {userIcon}</span>
     <span className="add-icon" > {userType==='Basic'?'Free':userType}</span>
    </button>
  );
};

export default StarterButton;