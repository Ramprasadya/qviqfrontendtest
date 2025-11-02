import React from "react";

const HeroProfile = (props) => {
  return (
    <div className="max-w-[280px] h-fit flex flex-col gap-[12px] mb-[10px]">
      <div
        className="text-[44px] text-center w-full text-[#393E46] font-[900] flex flex-col break-all Nunito-Sans-font-div"
      >
        <p className="leading-[43px]">{props.firstName}</p>
        <p className="leading-[43px]">{props.lastName}</p>
      </div>
      <div className={` w-[276px] h-[276px] relative`}>
        <img
          src={props.profilePic}
          alt=""
          className={`${props.profileStyle} absolute top-[0px] left-[0px] w-full h-full  rounded-full`}
          style={{ zIndex: "20", objectFit: "cover" }}
        />
        <div className={`${props.profileStyle} absolute w-full h-full rounded-full bottom-[-9px] right-[-7px] bg-[#C4FB6D]`}></div>
      </div>
    </div>
  );
};

export default HeroProfile;
