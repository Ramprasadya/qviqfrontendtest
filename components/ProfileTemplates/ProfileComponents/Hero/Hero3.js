import React from "react";

const Hero3 = (props) => {
  const data = props.heroData;
  const style = props.heroStyle;

  return (
    <div
      className='max-w-[1182px] py-[50px] px-5 flex flex-col justify-center items-center relative rounded-[40px] backdrop-blur-[5px] DM-Sans-font-div' style={{background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.64), transparent)'}}>

      <div className="z-[5] w-[140px] h-[140px] mb-[30px]">
        <img
          src={data.profilePic}
          alt="logo"
          className={`w-full h-full ${style.profilePic}`}
        />
      </div>

      <div className="z-[5] flex flex-col gap-1 text-center w-full max-w-[760px]">
        <h1 className={`${style.fullName}`}>{data.firstName +" " + (data.lastName || '')}</h1>
        <h4 className={`${style.jobTitle}`}>{data.jobTitle}</h4>
        <h4 className={`${style.jobTitle}`}>{data.companyName}</h4>
        <p className={`${style.jobDescription}`}>{data.jobDescription}</p>
      </div>

      <div className={`${style.div} z-[0] absolute h-[97.5%] w-[98.8%] rounded-[37px] backdrop-blur-[5px]`}></div>
    </div>
  );
};

export default Hero3;
