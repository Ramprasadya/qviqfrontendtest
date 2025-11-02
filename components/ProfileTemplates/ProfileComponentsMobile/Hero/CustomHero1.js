import React from "react";

const CustomHero1 = (props) => {
  const data = props.heroData;
  const style = props.heroStyle;

  return (
    <div
      className='max-w-[1182px] py-[20px] px-5 flex flex-col justify-center items-center relative rounded-[30px] backdrop-blur-[5px] DM-Sans-font-div' style={{background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.64), transparent)' }}>

      <div className="z-[5] w-[88px] h-[88px] mb-[20px]">
        <img
          src={data.profilePic}
          alt="logo"
          className={`w-full h-full ${style.profilePic}`}
        />
      </div>
      <div className="z-[5] flex flex-col gap-1 text-center w-full max-w-[760px]" >
        <h1 className={`${style.fullName}`}>{data.firstName +" " + (data.lastName || '')}</h1>
        <h4 className={`${style.jobTitle}`}>{data.jobTitle}</h4>
        <h4 className={`${style.jobTitle}`}>{data.companyName}</h4>
        <p className={`${style.jobDescription}`}>{data.jobDescription}</p>
      </div>

      <div className='z-[0] absolute h-[97.5%] w-[97.8%] rounded-[28px] backdrop-blur-[5px]' style={{background: `${style.div}`}}></div>
    </div>
  );
};

export default CustomHero1;
