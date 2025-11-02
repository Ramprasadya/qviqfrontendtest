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
import FilePreview from "../ProfileComponents/FilePreview/FilePreview";
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
      className={`flex flex-col sm:grid sm:grid-rows-2 sm:grid-flow-col sm:gap-x-4 sm:gap-y-2 xl:gap-y-5 mt-[24px] mb-[-16px] xl:mt-12 justify-center items-center ${props.fontFamily}`}
      style={style}
    >
      {pdfs === undefined || (pdfs != undefined ? pdfs.length == 0 : false) ? (
        <>
          <div className="flex xsm:xsm:w-80 w-[260px] h-12w-[260px] h-12 sm:w-[262px] xsm2:w-[380px] md:w-[357px] xsm:xsm:h-14 xl:w-[581px] xl:h-[72px] bg-[#FFFFFF] border-[#121212] border-r-[4px] border-b-[4px] rounded-[16px] justify-between items-center p-[18px] mb-4">
            <div className="flex">
              <div className="mt-[2px] xl:w-5 xl:h-5">
                <RiFileLine />
              </div>
              <h1 className="text-[14px] xl:text-[16px] ml-2 font-medium text-[#121212]">
                Song writing 101.pdf
              </h1>
            </div>
            <HiArrowRight />
          </div>
          <div className="flex xsm:w-80 w-[260px] h-12 xsm2:w-[380px] sm:w-[262px] md:w-[357px] xsm:h-14 xl:w-[581px] xl:h-[72px] bg-[#FFFFFF] border-[#121212] border-r-[4px] border-b-[4px] rounded-[16px] justify-between items-center p-[18px] mb-4">
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
          <div className="flex xsm:w-80 w-[260px] h-12 xsm2:w-[380px] sm:w-[262px] md:w-[357px] xsm:h-14 xl:w-[581px] xl:h-[72px] bg-[#FFFFFF] border-[#121212] border-r-[4px] border-b-[4px] rounded-[16px] justify-between items-center p-[18px] mb-4">
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
          <div className=" hidden sm:flex xsm:w-80 w-[260px] h-12 sm:w-[262px] md:w-[357px] xsm:h-14 xl:w-[581px] xl:h-[72px] bg-[#FFFFFF] border-[#121212] border-r-[4px] border-b-[4px] rounded-[16px] justify-between items-center p-[18px] mb-4">
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
                className="flex xsm:w-80 w-[260px] h-12w-[260px] h-12 sm:w-[262px] xsm2:w-[380px] md:w-[357px] xsm:xsm:h-14 xl:w-[581px] xl:h-[72px] bg-[#FFFFFF] border-[#121212] border-r-[4px] border-b-[4px] rounded-[16px] justify-between items-center p-[18px] mb-4"
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
                  <FilePreview pdf={pdf.docs} onClick={() => { setFileUrl(false) }} />
                )}
              </div>
            );
          })}
        </>
      )
      }
    </div>
  );
}
