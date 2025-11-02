import React from "react";

const HeroProfile = (props) => {
  return (
    <div className="flex flex-col items-center gap-[73px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        className="mb-10"
      >
        <path
          d="M22 0L25.2158 14.2364L37.5564 6.44365L29.7636 18.7842L44 22L29.7636 25.2158L37.5564 37.5564L25.2158 29.7636L22 44L18.7842 29.7636L6.44365 37.5564L14.2364 25.2158L0 22L14.2364 18.7842L6.44365 6.44365L18.7842 14.2364L22 0Z"
          fill="#121212"
        />
      </svg>
      <div className="relative w-[316px] h-[392px]">
        <img
          src={props.profilePic}
          alt=""
          className="w-full h-full max-w-full max-h-full rounded-t-full"
          style={{objectFit: 'cover'}}
        />

        <div className="absolute top-[-116px] text-[56px] text-center w-full break-all flex flex-col font-bold">
          <p
            className="leading-[52px]"
            style={{ fontFamily: "Cormorant Garamond, sans-serif" }}
          >
            {props.firstName}
          </p>
          <p
            className="leading-[52px]"
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
