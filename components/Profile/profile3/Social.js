import React from "react";

export default function Social(props) {
  const limitWord = (word, limit) => {
    if (word != null && word != undefined && word != "") {
      if (word.length > limit) {
        return word.slice(0, limit) + "...";
      } else {
        return word;
      }
    }
  };

  const { image, pdfs, apps } = props;

  return (
    <div className="flex flex-col justify-center items-center mx-[16px] my-2 ">
      <div className="grid grid-cols-2 gap-[8px] mt-11 justify-center  w-full ">
        <div className="  flex justify-center  items-center bg-purple-500 rounded-2xl h-[119px] xsm:h-[150px] w-full">
          {" "}
          <img
            alt="socialimages"
            className="w-[39px] h-[39px]"
            src={image.insta}
          />
        </div>
        <div className="  flex justify-center items-center bg-black rounded-2xl h-[119px] xsm:h-[150px] w-full   ">
          {" "}
          <img
            alt="socialimages"
            className="w-[39px] h-[39px]"
            src={image.tiktok}
          />
        </div>
        <div className="  flex justify-center items-center bg-red-700 rounded-2xl h-[119px] xsm:h-[150px] w-full ">
          {" "}
          <img
            alt="socialimages"
            className="w-[39px] h-[39px]"
            src={image.ytube2}
          />
        </div>
        <div className="  flex justify-center items-center bg-yellow-300 rounded-2xl h-[119px] xsm:h-[150px] w-full  ">
          {" "}
          <img
            alt="socialimages"
            className="w-[39px] h-[39px]"
            src={image.snap2}
          />
        </div>
      </div>

      {(
        apps != undefined
          ? apps.social != undefined
            ? apps.social.filter((app) => {
                return app.isOn;
              }).length != 0
              ? false
              : true
            : true
          : true
      ) ? (
        <>
          <h1 className="mt-12 xsm:mb-12 font-bold">Social Links</h1>
          <div className="grid grid-cols-2 gap-[8px]  justify-center  w-full ">
            <div className="  flex justify-center  items-center bg-white rounded-2xl h-[119px] xsm:h-[150px] w-full">
              {" "}
              <img
                alt="socialimages"
                className="xsm:w-[69px] xsm:h-[69px] h-[39px] w-[39px]"
                src={image.git}
              />
            </div>
            <div className="  flex justify-center items-center bg-white rounded-2xl h-[119px] xsm:h-[150px] w-full   ">
              {" "}
              <img
                alt="socialimages"
                className="xsm:w-[69px] xsm:h-[69px] h-[39px] w-[39px]"
                src={image.tiktok}
              />
            </div>
            <div className="  flex justify-center items-center bg-white rounded-2xl h-[119px] xsm:h-[150px] w-full ">
              {" "}
              <img
                alt="socialimages"
                className="xsm:w-[69px] xsm:h-[69px] h-[39px] w-[39px]"
                src={image.ytube}
              />
            </div>
            <div className="  flex justify-center items-center bg-white rounded-2xl h-[119px] xsm:h-[150px] w-full  ">
              {" "}
              <img
                alt="socialimages"
                className="xsm:w-[69px] xsm:h-[69px] h-[39px] w-[39px]"
                src={image.snap}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="mt-12 xsm:mb-12 font-bold">Social Links</h1>
          <div className="grid grid-cols-2 gap-[8px]  justify-center  w-full ">
            {apps.social.map((app,index) => (
              <div
                onClick={() => {
                  window.open(`${app.link}${app.userName}`, "_blank");
                }}
                key={index}
                className="  flex justify-center items-center bg-white rounded-2xl h-[119px] xsm:h-[150px] w-full "
              >
                {" "}
                <img
                  alt="socialimages"
                  className="xsm:w-[69px] xsm:h-[69px] h-[39px] w-[39px]"
                  src={require(`../../Logos/SocialMediaLogos/${app.platform
                    .toLowerCase()
                    .split(" ")
                    .join("")}.png`)}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {pdfs === undefined || (pdfs != undefined ? pdfs.length == 0 : false) ? (
        <>
          <h1 className="mt-12 font-bold">PDF'S</h1>
          <div className="grid grid-cols-2 gap-[8px] mt-11 justify-center  w-full ">
            <div className="  flex flex-col justify-center  items-center bg-white rounded-2xl  h-[119px] xsm:h-[150px] w-full">
              <img
                alt="socialimages"
                className="xsm:w-[66px] xsm:h-[84px] h-[43px] w-[33px]"
                src={image.pdf}
              />
              <h1 className="text-[12px] mt-3.5 font-medium ">My Catalogue</h1>
            </div>
            <div className="  flex flex-col justify-center items-center bg-white rounded-2xl  h-[119px] xsm:h-[150px] w-full   ">
              <img
                alt="socialimages"
                className="xsm:w-[66px] xsm:h-[84px] h-[43px] w-[33px]"
                src={image.pdf}
              />
              <h1 className="text-[12px] mt-3.5 font-medium ">Resume</h1>
            </div>
            <div className="  flex flex-col justify-center items-center bg-white rounded-2xl mb-2 h-[119px] xsm:h-[150px] w-full ">
              <img
                alt="socialimages"
                className="xsm:w-[66px] xsm:h-[84px] h-[43px] w-[33px]"
                src={image.pdf}
              />
              <h1 className="text-[12px] mt-3.5 font-medium ">My Portfolio</h1>
            </div>
            <div className="  flex flex-col justify-center items-center bg-white rounded-2xl mb-2 h-[119px] xsm:h-[150px] w-full  ">
              <img
                alt="socialimages"
                className="xsm:w-[66px] xsm:h-[84px] h-[43px] w-[33px]"
                src={image.pdf}
              />
              <h1 className="text-[12px] mt-3.5 font-medium ">
                Upcoming Projects
              </h1>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="mt-12  font-bold">PDF'S</h1>
          <div className="grid grid-cols-2 gap-[8px] mt-11 justify-center  w-full ">
            {pdfs.map((pdf, index) => {
              return (
                <div
                  className="  flex flex-col justify-center  items-center bg-white rounded-2xl mb-2 h-[119px] xsm:h-[150px] w-full"
                  key={index}
                >
                  <img
                    alt="socialimages"
                    className="xsm:w-[66px] xsm:h-[84px] h-[43px] w-[33px]"
                    src={image.pdf}
                  />
                  <h1 className="text-[12px] mt-3.5 font-medium ">
                    {limitWord(pdf.pdfname, 15)}
                  </h1>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
