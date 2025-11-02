import React from "react";

const HeroProfile = (props) => {
  return (
    <div className="relative w-[316px] h-[430px] flex flex-col gap-2">
      <div
        className="text-[56px] text-center w-[360px] ml-[-15px] md3:ml-[-30px] text-[#393E46] font-[900] flex flex-col break-all Nunito-Sans-font-div"
        style={{ zIndex: "30" }}
      >
        <p className="leading-[52px]">{props.firstName}</p>
        <p className="leading-[52px]">{props.lastName}</p>
      </div>
      <div className={` w-[300px] h-[300px]  relative my-[15px]`}>
        <img
          src={props.profilePic}
          alt=""
          className={` !w-[300px] !h-[300px] absolute top-0 left-0  rounded-full mt-2`}
          style={{ zIndex: "20", objectFit: "cover" }}
        />
        <div
          className={` absolute !w-[300px] !h-[300px] rounded-full bottom-[-30px] right-[-8px] bg-[#C4FB6D]`}
        ></div>
      </div>
    </div>
  );
};

export default HeroProfile;
