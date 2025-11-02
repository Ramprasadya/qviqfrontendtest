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
        className={`grid grid-rows-2 grid-flow-col  mt-6 gap-3 overflow-scroll   `}
        ref={VideoContainerRef}
      >
        {services === undefined ||
        (services != undefined ? services.length == 0 : false) ? (
          <>
            
            <div className="flex flex-col bg-[#ffffff] text-left  p-4 border-[#121212] border-r-[4px]  border-b-[4px] rounded-[16px] ">
              <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 ">
                <img className="w-full h-full rounded-[12px]" src={image1} />
              </div>
              <h1 className="text-[14px]  font-bold  w-[180px] mb-3 ">
                Music classes
              </h1>
              <p className="text-[14px]   ">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
            <div className="flex flex-col bg-[#ffffff] text-left  p-4 border-[#121212] border-r-[4px]  border-b-[4px] rounded-[16px] ">
              <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 ">
                <img className="w-full h-full rounded-[12px]" src={image1} />
              </div>
              <h1 className="text-[14px]  font-bold  w-[180px] mb-3 ">
                Music classes
              </h1>
              <p className="text-[14px]   ">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
            <div className="flex flex-col bg-[#ffffff] text-left  p-4 border-[#121212] border-r-[4px]  border-b-[4px] rounded-[16px] ">
              <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 ">
                <img className="w-full h-full rounded-[12px]" src={image1} />
              </div>
              <h1 className="text-[14px]  font-bold  w-[180px] mb-3 ">
                Music classes
              </h1>
              <p className="text-[14px]   ">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
            <div className="flex flex-col bg-[#ffffff] text-left  p-4 border-[#121212] border-r-[4px]  border-b-[4px] rounded-[16px] ">
              <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 ">
                <img className="w-full h-full rounded-[12px]" src={image1} />
              </div>
              <h1 className="text-[14px]  font-bold  w-[180px] mb-3 ">
                Music classes
              </h1>
              <p className="text-[14px]   ">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
            <div className="flex flex-col bg-[#ffffff] text-left  p-4 border-[#121212] border-r-[4px]  border-b-[4px] rounded-[16px] ">
              <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 ">
                <img className="w-full h-full rounded-[12px]" src={image1} />
              </div>
              <h1 className="text-[14px]  font-bold  w-[180px] mb-3 ">
                Music classes
              </h1>
              <p className="text-[14px]   ">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
          </>
        ) : (
          <>
            {services.map((item,index) => {return(
              <div className="flex flex-col text-left bg-[#ffffff]  box2  rounded-[16px]  border-black" key={index}>
                <div className="w-[64px] h-[64px]  rounded-[12px] mb-3 ">
                  <img className="w-full h-full rounded-[12px]" src={image1} />
                </div>
                <h1 className="text-[14px]  font-bold  w-[180px] mb-3 ">
                  Music classes
                </h1>
                <p className=" text-[14px]   ">
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
            classStyle='absolute p-1 rounded-full bg-white text-xl shadow-[0_2px_8px_0_rgba(171,181,217,0.14)]  p-2 border-[2px] border-[#121212] '

            left={"left-[-16px] "}
            right={"right-[-16px] "}

            scrollLength={300}
          />
        </div>
      </div>
    </div>
  );
}
