import React from "react";
export default function UserDetails(props) {
  const name=props.name;
  const jobTitle=props.jobTitle;
  const description=props.description;
  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    height: props.height,
    padding:props.padding,
    
  }
  const content=`Perform music for live audience and <br className="sm:hidden block" />
  recordings. Perform <br className="hidden sm:block" />
  music for live <br className="sm:hidden block" /> audience and
  recordings.`
  return (
    <>
      <div className={`xsm:mt-5 mt-2  flex w-full justify-center items-center flex-col ${props.fontFamily} `} style={style}>
        <h1 className=" text-[20px] xl:text-[28px] font-bold xl:mb-1">
          {name?name:"Jason Parker"}
        </h1>
        <h2 className="text-[14px] italic text-[#FFFFFFCC] text-opacity-80 xl:text-[20px] ">
          {jobTitle?jobTitle:'Singer, Guitarist'}
        </h2>
        <p className=" xsm:mt-[20px] mt-2 text-[14px] text-center xl:mt-4  xl:w-[578px] xl:text-[20px]">
          {description?description:["Perform music for live audience and", <br className="sm:hidden block" />,
          "recordings. Perform", <br className="hidden sm:block" />,
          "music for live", <br className="sm:hidden block" /> , "audience and   recordings."]}
          {/* Perform music for live audience and <br className="sm:hidden block" />
          recordings. Perform <br className="hidden sm:block" />
          music for live <br className="sm:hidden block" /> audience and
          recordings. */}
        </p>
      </div>
    </>
  );
}
