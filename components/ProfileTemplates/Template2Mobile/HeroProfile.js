import React from "react";

const HeroProfile = (props) => {
  return (
    <div className="flex flex-col items-center gap-[60px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        className="mb-10"
      >
        <path
          d="M14 0L16.0464 9.05953L23.8995 4.1005L18.9405 11.9536L28 14L18.9405 16.0464L23.8995 23.8995L16.0464 18.9405L14 28L11.9536 18.9405L4.1005 23.8995L9.05953 16.0464L0 14L9.05953 11.9536L4.1005 4.1005L11.9536 9.05953L14 0Z"
          fill="#121212"
        />
      </svg>
      <div className="relative w-[220px] xsm:w-[240px] h-[300px] flex items-center justify-center">
        <img
          src={props.profilePic}
          alt=""
          className="w-[228px] h-[291px] max-w-full max-h-full rounded-t-full"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute top-[-97px] text-[40px] xsm:text-[44px] text-center w-full font-bold break-all flex flex-col">
          <p
            className="leading-[45px]"
            style={{ fontFamily: "Cormorant Garamond, sans-serif" }}
          >
            {props.firstName}
          </p>
          <p
            className="leading-[45px]"
            style={{ fontFamily: "Cormorant Garamond, sans-serif" }}
          >
            {props.lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroProfile;
