import React, {useState,useRef,useEffect} from "react";
import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePencilAlt,
} from "react-icons/hi";
export default function Contents(props){
  const product=props.product;
  const services=props.services;
  const appointments=props.appointments;
  const videos=props.videos;
  const bussinessHours=props.bussinessHours;
  const reviews=props.reviews;
  const documents=props.documents
  const setProduct=props.setProduct
  const setServices=props.setServices
  const setVideos=props.setVideos;
  const setAppointments=props.setAppointments;
  const setDocuments=props.setDocuments;
  const setReviews=props.setReviews;
  const setBussinessHours=props.setBussinessHours
  
  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    height: props.height,
    padding:props.padding,
    
  }
  const containerRef = useRef(null);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 270;
  };

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 270;
  };
  const [hasHiddenItem, setHasHiddenItem]=useState(false);
  useEffect(()=>{
     if(containerRef && containerRef.current){
       setHasHiddenItem(containerRef.current.scrollWidth  > containerRef.current.clientWidth)
     }
  })

  return (
    <>
      <div className={`relative flex justify-center w-full items-center ${props.fontFamily} `} style={style}>
        <button
          className="absolute  left-[-0.7rem] xsm:left-[-1.1rem]  bg-white w-7 h-7 xsm:w-8 xsm:h-8 p-[6px] flex justify-center items-center border-[2px] border-[#121212] rounded-[40px] "
          onClick={handleScrollLeft}
        >
          <HiOutlineChevronLeft />
        </button>
        <div
          className={`bg-white flex w-full   rounded-[12px] border-[2px] border-[#121212] space-x-5  pl-5  pr-4   xsm:py-4 py-3 overflow-x-scroll ${!hasHiddenItem && "justify-center items-center"} `}
          style={{ scrollBehavior: "smooth" }}
          ref={containerRef}
        >
          <button
            className={`text-[${product ? '#121212' : '#121212B2'}]  text-[14px] font-${ product ? 'bold' : 'medium'} h-full flex items-center justify-center`}
            onClick={() => {
              setProduct(true);
              setAppointments(false);
              setServices(false);
              setVideos(false);
              setDocuments(false);
              setReviews(false);
              setBussinessHours(false);
            }}
          >
            Products
          </button>
          <button
            className={`text-[${services ? '#121212' : '#121212B2'}]  text-[14px] font-${ services ? 'bold' : 'medium'}  h-full flex items-center justify-center`}
            onClick={() => {
              setProduct(false);
              setServices(true);
              setAppointments(false);
              setVideos(false);
              setDocuments(false);
              setReviews(false);
              setBussinessHours(false);
            }}
          >
            Services
          </button>
          <button
            className={`text-[${appointments ? '#121212' : '#121212B2'}]  text-[14px] font-${ appointments ? 'bold' : 'medium'}  h-full flex items-center justify-center`}
            onClick={() => {
              setProduct(false);
              setAppointments(true);
              setServices(false);
              setVideos(false);
              setDocuments(false);
              setReviews(false);
              setBussinessHours(false);
            }}
          >
            Appointments
          </button>
          <button
            className={`text-[${videos ? '#121212' : '#121212B2'}]  text-[14px] font-${ videos ? 'bold' : 'medium'}  h-full flex items-center justify-center`}
            onClick={() => {
              setProduct(false);
              setVideos(true);
              setAppointments(false);
              setServices(false);
              setDocuments(false);
              setReviews(false);
              setBussinessHours(false);
            }}
          >
            Videos
          </button>
          <button
            className={`text-[${documents ? '#121212' : '#121212B2'}]  text-[14px] font-${documents ? 'bold' : 'medium'}  h-full flex items-center justify-center`}
            onClick={() => {
              setProduct(false);
              setDocuments(true);
              setAppointments(false);
              setServices(false);
              setVideos(false);
              setReviews(false);
              setBussinessHours(false);
            }}
          >
            Documents
          </button>
          <button
            className={`text-[${bussinessHours ? '#121212' : '#121212B2'}]  text-[14px] font-${ bussinessHours ? 'bold' : 'medium'}  h-full flex items-center justify-center`}
            onClick={() => {
              setProduct(false);
              setBussinessHours(true);
              setAppointments(false);
              setServices(false);
              setVideos(false);
              setDocuments(false);
              setReviews(false);

            }}
          >
            Bussinesshours
          </button>
          <button
            className={`text-[${ reviews ? '#121212' : '#121212B2'}]  text-[14px] font-${ reviews ? 'bold' : 'medium'}  h-full flex items-center justify-center`}
            onClick={() => {
              setProduct(false);
              setReviews(true);
              setAppointments(false);
              setServices(false);
              setVideos(false);
              setDocuments(false);
              setBussinessHours(false);
            }}
          >
            Reviews
          </button>
        </div>

        <button
          className="absolute right-[-0.7rem] xsm:right-[-1.1rem]  bg-white w-7 h-7 xsm:w-8 xsm:h-8  p-[6px] flex justify-center items-center border-[2px] border-[#121212] rounded-[40px]"
          onClick={handleScrollRight}
        >
          <HiOutlineChevronRight />
        </button>
      </div>
    </>
  );
}
