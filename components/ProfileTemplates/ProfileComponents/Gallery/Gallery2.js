import React, { useRef, useState } from "react";
import FilePreview from "../FilePreview/FilePreview";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import Lightbox from "react-18-image-lightbox";
import 'react-18-image-lightbox/style.css'

const Gallery2 = (props) => {
  const data = props.data;
  const style = props.style;
  const [preview, setPreview] = useState(false);
  const [image, setImage] = useState("");
  const scrollBtn = props.scrollBtn;
  const galleryRef = useRef(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const updateAnalytics = async (img) => {
    if (props.templateId !== undefined && props.username !== undefined) {
      if (props.templateId !== "" && props.username !== "") {
        const ipResponse = await axios.get("https://ipapi.co/json/");
        const ipData = ipResponse.data;
        await axios.post(
          `${serverUrl}/analytics/${props.templateId}/${props.username}/${img}`,
          {
            profile: props.username,
            country: ipData.country_name,
            countryCode: ipData.country_code,
            analyticsType: "img",
          }
        );
      }
    }
  };

  return (
    <div className="w-full">
       {data.length <= 4 ? (
        <div className="flex flex-wrap max-w-[1182px] gap-5 justify-center">
          {data.map((item, index) => {
            return (
              <img
                src={item.image}
                loading="lazy"
                className={`hover:cursor-pointer ${style.image}`}
                style={{objectFit: 'cover'}}
                alt="gallery"
                title={((!props.dummy && item.image)||"")}
                key={index}
                onClick={() => {
                  !props.dummy && setImage(item.image);
                  !props.dummy && setPhotoIndex(index);
                  !props.dummy && setPreview(true);
                  !props.dummy && updateAnalytics(item._id);
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className="relative">
          <div className="overflow-scroll" ref={galleryRef}>
            <div
              style={{
                display: "grid",
                gridTemplateRows: "auto auto",
                gridAutoFlow: "column",
                gap: "1rem",
                maxWidth: "1182px",
              }}
            >
              {data.map((item, index) => {
                return (
                  <img
                    src={item.image}
                    loading="lazy"
                    className={`hover:cursor-pointer ${style.image} !min-w-[380px] !min-h-[380px] !max-w-[380px] !max-h-[380px]`}
                    style={{objectFit: 'cover'}}
                    alt="gallery"
                    title={((!props.dummy && item.image)||"")}
                    key={index}
                    onClick={() => {
                      !props.dummy && setImage(item.image);
                      !props.dummy && setPhotoIndex(index);
                      !props.dummy && setPreview(true);
                      !props.dummy && updateAnalytics(item._id);

                    }}
                  />
                );
              })}
            </div>
          </div>
          <LeftRightScrollBtn
            refrence={galleryRef}
            scrollLength={600}
            style={scrollBtn.style}
            leftPosition={scrollBtn.leftPosition}
            rightPosition={scrollBtn.rightPosition}
          />
        </div>
      )}
      {preview && (
        <Lightbox
          mainSrc={data[photoIndex].image}
          nextSrc={data[(photoIndex + 1) % data.length].image}
          prevSrc={data[(photoIndex + data.length - 1) % data.length].image}
          onCloseRequest={() => setPreview(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + data.length - 1) % data.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % data.length)
          }
        />
      )}
    </div>
  );
};

export default Gallery2;
