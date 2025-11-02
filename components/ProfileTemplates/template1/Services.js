import React, { useState, useRef, useEffect } from "react";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import LeftRightScrollBtn from "../../Utils/LeftRightScrollBtn";
import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePencilAlt,
} from "react-icons/hi";
export default function Services(props) {
  const services=props.services
  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    height: props.height,
    padding:props.padding,
    
  }
  // const reviewContainer = useRef(null);
  // const [hasHiddenItem, setHasHiddenItem] = useState(false);
  // useEffect(() => {
  //   if (reviewContainer && reviewContainer.current) {
  //     setHasHiddenItem(
  //       reviewContainer.current.scrollWidth >
  //         reviewContainer.current.clientWidth
  //     );
  //   }
  // });
  // console.log(services);
  const VideoContainerRef = useRef(null);

  return (
    <div className={`w-full ${props.fontFamily}`} style={style}>
      <div
        className={`grid grid-rows-2  xl:flex grid-flow-col mt-6 gap-3 overflow-scroll xl:mt-12 w-full xl:w-[1182px]  `}
        ref={VideoContainerRef}
      >
        {services === undefined ||
        (services != undefined ? services.length == 0 : false) ? (
          <>
            <div className="flex flex-col bg-[#ffffff] border-b-[4px] border-r-[4px] xl:p-6 p-4  xl:w-[280px]   rounded-[16px]  border-black">
              <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 xl:mb-4">
                <img className="w-full h-full rounded-[12px]" src={image1} />
              </div>
              <h1 className="text-[14px] xl:text-4 font-bold  w-[180px] mb-3 xl:mb-4">
                Music classes
              </h1>
              <p className=" text-[14px] xl:text-4  ">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
            <div className="flex flex-col bg-[#ffffff] xl:p-6 p-4 border-[#121212] border-r-[4px] xl:w-[280px] border-b-[4px] rounded-[16px] ">
              <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 xl:mb-4">
                <img className="w-full h-full rounded-[12px]" src={image1} />
              </div>
              <h1 className="text-[14px] xl:text-4 font-bold  w-[180px] mb-3 xl:mb-4">
                Music classes
              </h1>
              <p className="text-[14px] xl:text-4  ">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
            <div className="flex flex-col bg-[#ffffff] xl:p-6 p-4 border-[#121212] border-r-[4px] xl:w-[280px] border-b-[4px] rounded-[16px] ">
              <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 xl:mb-4">
                <img className="w-full h-full rounded-[12px]" src={image1} />
              </div>
              <h1 className="text-[14px] xl:text-4 font-bold  w-[180px] mb-3 xl:mb-4">
                Music classes
              </h1>
              <p className="text-[14px] xl:text-4  ">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
            <div className="flex flex-col bg-[#ffffff] xl:p-6 p-4 border-[#121212] border-r-[4px] xl:w-[280px] border-b-[4px] rounded-[16px] ">
              <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 xl:mb-4">
                <img className="w-full h-full rounded-[12px]" src={image1} />
              </div>
              <h1 className="text-[14px] xl:text-4 font-bold  w-[180px] mb-3 xl:mb-4">
                Music classes
              </h1>
              <p className="text-[14px] xl:text-4  ">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
            <div className="flex flex-col bg-[#ffffff] xl:p-6 p-4 border-[#121212] border-r-[4px] xl:w-[280px] border-b-[4px] rounded-[16px] ">
              <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 xl:mb-4">
                <img className="w-full h-full rounded-[12px]" src={image1} />
              </div>
              <h1 className="text-[14px] xl:text-4 font-bold  w-[180px] mb-3 xl:mb-4">
                Music classes
              </h1>
              <p className="text-[14px] xl:text-4  ">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
            <div className="flex flex-col bg-[#ffffff] xl:p-6 p-4 border-[#121212] border-r-[4px] xl:w-[280px] border-b-[4px] rounded-[16px] ">
              <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 xl:mb-4">
                <img className="w-full h-full rounded-[12px]" src={image1} />
              </div>
              <h1 className="text-[14px] xl:text-4 font-bold  w-[180px] mb-3 xl:mb-4">
                Music classes
              </h1>
              <p className="text-[14px] xl:text-4  ">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
          </>
        ) : (
          <>
            {services.map((item,index) => {return(
              <div key={index} className="flex flex-col bg-[#ffffff] xl:p-6 p-4  xl:w-[280px] box2  rounded-[16px]  border-black">
                <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 xl:mb-4">
                  <img className="w-full h-full rounded-[12px]" src={image1} />
                </div>
                <h1 className="text-[14px] xl:text-4 font-bold  w-[180px] mb-3 xl:mb-4">
                  Music classes
                </h1>
                <p className=" text-[14px] xl:text-4  ">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, to
                </p>
              </div>)
            })}
          </>
        )}
      </div>
      <div className="absolute w-full xl:bottom-[176px] bottom-[150px]">
        <div className="relative z-50  w-full">
          <LeftRightScrollBtn
            refrence={VideoContainerRef}
            left={"left-[-16px] xl:left-[-30px] sm:left-[-20px]"}
            right={"right-[-16px] sm:right-[-17px] xl:right-[-30px]"}
            padding={"xl:p-5 sm:p-3 p-2"}
            border={"border-[2px] border-[#121212]"}
            scrollLength={600}
          />
        </div>
      </div>
    </div>
  );
}
