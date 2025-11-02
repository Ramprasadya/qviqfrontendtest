import React from "react";

const HeroProfile = (props) => {
  return (
    <div className="flex flex-col items-center gap-[73px]">
      <div className="relative w-[316px] h-[392px] mt-32">
        <div
          className="absolute w-full h-full bg-white"
          style={{ zIndex: "10", transform: "rotate(3.995deg)" }}
        />
        <img
          src={props.profilePic}
          alt=""
          className="absolute w-full h-full max-w-full max-h-full"
          style={{ zIndex: "20", transform: "rotate(-4deg)", objectFit: 'cover' }}
        />

        <div
          className="absolute top-[-122px] text-[56px] text-center w-full text-[#736CED] font-extrabold"
          style={{ zIndex: "30" }}
        >
          <p
            className="leading-[52px]"
            style={{ fontFamily: "Playfair Display, sans-serif" }}
          >
            {props.firstName}
          </p>
          <p
            className="leading-[52px]"
            style={{ fontFamily: "Playfair Display, sans-serif" }}
          >
            {props.lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroProfile;
