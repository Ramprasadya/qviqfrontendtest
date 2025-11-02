import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import {
  RiCloseFill,
  RiDownload2Fill,
  RiEye2Fill,
  RiFileLine,
  RiSearchEyeLine,
} from "react-icons/ri";

import { HiArrowLongRight } from "react-icons/hi2";
export default function Documents(props) {
  const [fileUrl, setFileUrl] = useState(null);
  const pdfs = props.pdfs;
  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    height: props.height,
    padding: props.padding,
  };
  const limitWord = (word, limit) => {
    if (word != null && word != undefined && word != "") {
      if (word.length > limit) {
        return word.slice(0, limit) + "...";
      } else {
        return word;
      }
    }
  };

  return (
    <div
      className={`flex flex-col  mt-[24px] mb-[-16px]  justify-center items-center ${props.fontFamily}`}
      style={style}
    >
      {pdfs === undefined || (pdfs != undefined ? pdfs.length == 0 : false) ? (
        <>
          <div className="flex xsm:w-80 w-[260px] h-12 xsm2:w-[380px] sm:w-[262px] xsm:h-14  bg-[#FFFFFF] border-[#121212] border-r-[4px] border-b-[4px] rounded-[16px] justify-between items-center p-[18px] mb-4">
            <div className="flex">
              <div className="mt-[2px]">
                <RiFileLine />
              </div>
              <h1 className="text-[14px] xl:text-[16px] ml-2 font-medium text-[#121212]">
                Song writing 101.pdf
              </h1>
            </div>
            <HiArrowRight />
          </div>
          <div className="flex xsm:w-80 w-[260px] h-12 xsm2:w-[380px] sm:w-[262px] xsm:h-14  bg-[#FFFFFF] border-[#121212] border-r-[4px] border-b-[4px] rounded-[16px] justify-between items-center p-[18px] mb-4">
            <div className="flex">
              <div className="mt-[2px]">
                <RiFileLine />
              </div>
              <h1 className="text-[14px] xl:text-[16px] ml-2 font-medium text-[#121212]">
                Song writing 101.pdf
              </h1>
            </div>
            <HiArrowRight />
          </div>
          <div className="flex xsm:w-80 w-[260px] h-12 xsm2:w-[380px] sm:w-[262px]  xsm:h-14  bg-[#FFFFFF] border-[#121212] border-r-[4px] border-b-[4px] rounded-[16px] justify-between items-center p-[18px] mb-4">
            <div className="flex">
              <div className="mt-[2px]">
                <RiFileLine />
              </div>
              <h1 className="text-[14px] xl:text-[16px] ml-2 font-medium text-[#121212]">
                Song writing 101.pdf
              </h1>
            </div>
            <HiArrowRight />
          </div>
          <div className=" hidden sm:flex xsm:w-80 w-[260px] h-12 sm:w-[262px]  xsm:h-14  bg-[#FFFFFF] border-[#121212] border-r-[4px] border-b-[4px] rounded-[16px] justify-between items-center p-[18px] mb-4">
            <div className="flex">
              <div className="mt-[2px]">
                <RiFileLine />
              </div>
              <h1 className="text-[14px] xl:text-[16px] ml-2 font-medium text-[#121212]">
                Song writing 101.pdf
              </h1>
            </div>
            <HiArrowRight />
          </div>
        </>
      ) : (
        <>
          {/* {console.log(pdfs)} */}
          {pdfs.map((pdf, index) => {
            return (
              <div
                className="flex xsm:w-80 w-[260px] h-12w-[260px] h-12 bg-[#FFFFFF] border-[#121212] border-r-[4px] border-b-[4px] rounded-[16px] justify-between items-center p-[18px] mb-4"
                key={index}
              >
                <div className="flex">
                  <div className="mt-[2px] xl:w-5 xl:h-5">
                    <RiFileLine />
                  </div>

                  <h1 className="text-[14px] xl:text-[16px] ml-2 font-medium text-[#121212]">
                    {/* {limitWord(pdf.pdfname, 15)} */}
                    {pdf.pdfname}
                  </h1>
                </div>
                <div className="flex">
                  <button
                    onClick={() => setFileUrl(pdf)}
                    className="mr-2 text-[14px] font-bold text-[#121212] mt-[-2px]"
                  >
                    Preview
                  </button>
                  <HiArrowRight />
                </div>
                {fileUrl && (
                  <div className="container sans p-3  " style={{ zIndex: "998" }}>
                    <div
                      className="modal-wrapper bg-[#00000054] backdrop-blur-[20px]"
                      style={{ zIndex: "998" }}
                    ></div>

                    <div
                      className="flex flex-col  bg-transparent fixed  bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 h-fit rounded-t-2xl md:rounded-2xl md:w-[600px] w-full  justify-center items-center p-5 md:p-2"
                      style={{ zIndex: "998", height: "fit-content" }}
                    >
                      <embed
                        src={pdf.docs}
                        type="application/pdf"
                        className="xl:h-[650px] xl:w-[600px] w-full  h-[500px] sm:h-[550px] "
                        // width="600"
                        // height="650"
                      />

                      <button
                        className="absolute top-[-15px] md:top-[-25px] md:right-0  right-3"
                        onClick={() => setFileUrl(false)}
                      >
                        <RiCloseFill size={"35"} fill="white" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
