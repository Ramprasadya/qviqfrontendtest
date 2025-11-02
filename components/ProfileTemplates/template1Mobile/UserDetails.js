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
 
  return (
    <>
      <div className={`xsm:mt-5 mt-2  flex w-full justify-center items-center flex-col ${props.fontFamily} `} style={style}>
        <h1 className=" text-[20px]  font-bold ">
          {name?name:"Jason Parker"}
        </h1>
        <h2 className="text-[14px] italic text-[#FFFFFFCC] text-opacity-80  ">
          {jobTitle?jobTitle:'Singer, Guitarist'}
        </h2>
        <p className=" xsm:mt-[20px] mt-2 text-[14px] text-center  ">
          {description?description:["Perform music for live audience and", <br className=" block" />,
          "recordings. Perform", ,
          "music for live", <br className=" block" /> , "audience and   recordings."]}
          
        </p>
      </div>
    </>
  );
}
