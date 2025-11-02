import React, { useState } from "react";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import { RiCloseFill, RiCoreosFill, RiDownloadLine } from "react-icons/ri";
// import { ReactElement as Test } from "../images/test.svg";
export default function Gallery(props) {
  const [previewImage, setPreviewImage] = useState(null);
  const images = props.images;
  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    height: props.height,
    padding: props.padding,
  };
  return (
    <div>
      <div
        className={`mt-[48px] w-full justify-center items-center ${props.fontFamily}`}
        style={style}
      >
        <h1 className="text-[18px]  font-bold text-left   xsm:mb-[24px] mb-4">
          Gallery
        </h1>
        <div className="flex  w-full justify-center items-center ">
          {images === undefined ||
          (images != undefined ? images.length == 0 : false) ? (
            <>
              <div className="grid grid-cols-2 xsm:gap-[16px] gap-3 ">
                <img
                  alt="img1"
                  className="rounded-[20px] w-[122px] h-[134px] xsm:w-[152px] xsm:h-[164px]  "
                  src={image1}
                />
                <img
                  alt="img2"
                  className="rounded-[20px] w-[122px] h-[98px]  xsm:w-[152px] xsm:h-[128px]  "
                  src={image3}
                />
                <img
                  alt="img3"
                  className="rounded-[20px] w-[122px] h-[98px]  xsm:w-[152px] xsm:h-[128px]  "
                  src={image3}
                />
                <img
                  alt="img4"
                  className="rounded-[20px]  mt-[-35px]  w-[122px] h-[134px] xsm:w-[152px] xsm:h-[164px]"
                  src={image1}
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 xsm:gap-[16px] gap-3 ">
                {images[0] != undefined && (
                  <img
                    src={images[0].image}
                    alt="img1"
                    className="rounded-[20px] w-[122px] h-[134px] xsm:w-[152px] xsm:h-[164px]  "
                    onClick={() => setPreviewImage(images[0].image)}
                  />
                )}
                {images[1] != undefined && (
                  <img
                    src={images[1].image}
                    alt="img2"
                    className="rounded-[20px] w-[122px] h-[98px]  xsm:w-[152px] xsm:h-[128px]  "
                    onClick={() => setPreviewImage(images[1].image)}
                  />
                )}
                {images[2] != undefined && (
                  <img
                    src={images[2].image}
                    alt="img3"
                    className="rounded-[20px] w-[122px] h-[98px]  xsm:w-[152px] xsm:h-[128px]  "
                    onClick={() => setPreviewImage(images[2].image)}

                  />
                )}
                {images[3] != undefined && (
                  <img
                    src={images[3].image}
                    alt="img4"
                    className="rounded-[20px]  mt-[-35px]  w-[122px] h-[134px] xsm:w-[152px] xsm:h-[164px]"
                    onClick={() => setPreviewImage(images[3].image)}

                  />
                )}
              </div>

              <div className="sm:flex flex-col hidden ">
                {images[4] != undefined && (
                  <img
                    src={images[4].image}
                    alt="img1"
                    className="rounded-[20px]   hidden xsm2:block w-[122px] h-[134px] xsm:w-[152px] xsm:h-[164px]   sm:w-[162px] sm:h-[170px] md:w-[182px] md:h-[190px]  lg:w-[262px] lg:h-[270px] xl:w-[380px]  xl:h-[420px] sm:mb-5 xsm2:mb-4"
                    onClick={() => setPreviewImage(images[4].image)}

                  />
                )}
                {images[5] != undefined && (
                  <img
                    src={images[5].image}
                    alt="img2"
                    className="rounded-[20px]   hidden xsm2:block w-[122px] h-[98px]  xsm:w-[152px] xsm:h-[128px] "
                    onClick={() => setPreviewImage(images[5].image)}

                  />
                )}
              </div>
              {previewImage && (
                <div className="container sans p-3  " style={{ zIndex: "998" }}>
                  <div
                    className="modal-wrapper bg-[#00000054] backdrop-blur-[20px] "
                    style={{ zIndex: "998" }}
                  ></div>

                  <div
                    className="flex flex-col  bg-transparent fixed  bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 h-fit rounded-t-2xl md:rounded-2xl md:w-[600px] w-full justify-center items-center p-5 md:p-2 "
                    style={{ zIndex: "998", height: "fit-content" }}
                  >
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="relative xl:h-[650px] xl:w-[500px] w-full  h-[500px] sm:h-[550px] object-contain  rounded"
                    />
                    <button
                      className="absolute top-[-15px] md:top-[-25px] md:right-0  right-3"
                      onClick={() => setPreviewImage(false)}
                    >
                      <RiCloseFill size={"35"}  fill="white"/>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
