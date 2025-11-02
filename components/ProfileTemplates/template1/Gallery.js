import React, { useState } from "react";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import { RiCloseFill, RiCoreosFill, RiDownloadLine } from "react-icons/ri";
import FilePreview from "../ProfileComponents/FilePreview/FilePreview";
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
        className={`mt-[48px] xl:mt-[72px] w-full justify-center items-center ${props.fontFamily}`}
        style={style}
      >
        <h1 className="text-[18px] xl:w-[1182px] xsm2:text-[22px] lg:text-[32px] font-bold  xl:mb-[45px] xsm:mb-[24px] mb-4">
          Gallery
        </h1>
        {/* <Test/> */}
        <div className="flex  w-full justify-center items-center ">
          {images === undefined ||
            (images != undefined ? images.length == 0 : false) ? (
            <>
              <div className="grid grid-cols-2 xsm:gap-[16px] gap-3 xl:gap-5 xsm2:mr-5">
                <img
                  alt="img1"
                  className="rounded-[20px] w-[122px] h-[134px] xsm:w-[152px] xsm:h-[164px] sm:w-[162px] sm:h-[170px] xsm2:w-[190px] xsm2:h-[202px] md:w-[182px] md:h-[190px]  lg:w-[262px] lg:h-[270px] xl:w-[380px] xl:h-[420px] "
                  src={image1}
                />
                <img
                  alt="img2"
                  className="rounded-[20px] w-[122px] h-[98px]  xsm:w-[152px] xsm:h-[128px] sm:w-[162px] sm:h-[138px] xsm2:w-[190px] xsm2:h-[166px] lg:w-[262px] lg:h-[238px] md:w-[182px] md:h-[158px]  xl:w-[380px] xl:h-[280px] "
                  src={image3}
                />
                <img
                  alt="img3"
                  className="rounded-[20px] w-[122px] h-[98px]  xsm:w-[152px] xsm:h-[128px]  xsm2:w-[190px] xsm2:h-[166px] sm:w-[162px] sm:h-[138px] lg:w-[262px] lg:h-[238px] md:w-[182px] md:h-[158px] xl:w-[380px] xl:h-[280px]"
                  src={image3}
                />
                <img
                  alt="img4"
                  className="rounded-[20px]  mt-[-35px] sm:mt-[-30px] xl:mt-[-140px] w-[122px] h-[134px] xsm:w-[152px] xsm:h-[164px]   xsm2:w-[190px] xsm2:h-[202px] sm:w-[162px] sm:h-[170px] md:w-[182px] md:h-[190px] lg:w-[262px] lg:h-[270px]  xl:w-[380px] xl:h-[420px]"
                  src={image1}
                />
              </div>

              <div className="sm:flex flex-col hidden ">
                <img
                  alt="img1"
                  className="rounded-[20px]   hidden xsm2:block w-[122px] h-[134px] xsm:w-[152px] xsm:h-[164px]   sm:w-[162px] sm:h-[170px] md:w-[182px] md:h-[190px]  lg:w-[262px] lg:h-[270px] xl:w-[380px]  xl:h-[420px] sm:mb-5 xsm2:mb-4"
                  src={image1}
                />
                <img
                  alt="img2"
                  className="rounded-[20px]   hidden xsm2:block w-[122px] h-[98px]  xsm:w-[152px] xsm:h-[128px] sm:w-[162px] sm:h-[138px] lg:w-[262px] lg:h-[238px] md:w-[182px] md:h-[158px] xl:w-[380px] xl:h-[280px]"
                  src={image3}
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 xsm:gap-[16px] gap-3 xl:gap-5 xsm2:mr-5">
                {images[0] != undefined && (
                  <img
                    src={images[0].image}
                    alt="img1"
                    className="rounded-[20px] w-[122px] h-[134px] xsm:w-[152px] xsm:h-[164px] sm:w-[162px] sm:h-[170px] xsm2:w-[190px] xsm2:h-[202px] md:w-[182px] md:h-[190px]  lg:w-[262px] lg:h-[270px] xl:w-[380px] xl:h-[420px] "
                    onClick={() => setPreviewImage(images[0].image)}
                  />
                )}
                {images[1] != undefined && (
                  <img
                    src={images[1].image}
                    alt="img2"
                    className="rounded-[20px] w-[122px] h-[98px]  xsm:w-[152px] xsm:h-[128px] sm:w-[162px] sm:h-[138px] xsm2:w-[190px] xsm2:h-[166px] lg:w-[262px] lg:h-[238px] md:w-[182px] md:h-[158px]  xl:w-[380px] xl:h-[280px] "
                    onClick={() => setPreviewImage(images[1].image)}
                  />
                )}
                {images[2] != undefined && (
                  <img
                    src={images[2].image}
                    alt="img3"
                    className="rounded-[20px] w-[122px] h-[98px]  xsm:w-[152px] xsm:h-[128px]  xsm2:w-[190px] xsm2:h-[166px] sm:w-[162px] sm:h-[138px] lg:w-[262px] lg:h-[238px] md:w-[182px] md:h-[158px] xl:w-[380px] xl:h-[280px]"
                    onClick={() => setPreviewImage(images[2].image)}
                  />
                )}
                {images[3] != undefined && (
                  <img
                    src={images[3].image}
                    alt="img4"
                    className="rounded-[20px]  mt-[-35px] sm:mt-[-30px] xl:mt-[-140px] w-[122px] h-[134px] xsm:w-[152px] xsm:h-[164px]   xsm2:w-[190px] xsm2:h-[202px] sm:w-[162px] sm:h-[170px] md:w-[182px] md:h-[190px] lg:w-[262px] lg:h-[270px]  xl:w-[380px] xl:h-[420px]
                    "
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
                    className="rounded-[20px]   hidden xsm2:block w-[122px] h-[98px]  xsm:w-[152px] xsm:h-[128px] sm:w-[162px] sm:h-[138px] lg:w-[262px] lg:h-[238px] md:w-[182px] md:h-[158px] xl:w-[380px] xl:h-[280px]"
                    onClick={() => setPreviewImage(images[5].image)}
                  />
                )}
              </div>
              {previewImage && (
                <FilePreview image={previewImage} onClick={() => { setPreviewImage(null) }} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
