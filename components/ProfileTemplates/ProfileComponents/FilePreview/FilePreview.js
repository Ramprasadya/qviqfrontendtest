import React from "react";
import { RiCloseFill } from "react-icons/ri";

const FilePreview = (props) => {
  return (
    <div style={{ zIndex: "998" }}>
      <div
        className="modal-wrapper bg-[#00000054] backdrop-blur-md"
        style={{ zIndex: "998" }}
      ></div>
      <div
        className="bg-transparent fixed bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full"
        style={{ zIndex: "998" }}
      >
        <div className="w-[95%] lg:w-4/5 2xl:w-2/3 h-[85%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        {/* bg-[#9c9c9ce5] */}
          {props.pdf && (
            <div className="w-full h-full">
              <iframe
                src={props.pdf}
                width="100%"
                height="100%"
                title="PDF Viewer"
              />
              <p>
                It appears your web browser doesn't support embedding PDFs. You
                can download the file{" "}
                <a href={props.pdf} target="_blank" rel="noopener noreferrer">
                  here
                </a>
                .
              </p>
            </div>
          )}

          {props.image && <img src={props.image} className="w-full h-full" style={{objectFit: 'contain'}} />}
        </div>
        <button
          className="absolute top-5 right-5 rounded-full p-3 bg-[#cbc7c7] text-black text-xl active:scale-95 duration-150"
          style={{ zIndex: "998" }}
          onClick={props.onClick}
        >
          <RiCloseFill />
        </button>
      </div>
    </div>
  );
};

export default FilePreview;
