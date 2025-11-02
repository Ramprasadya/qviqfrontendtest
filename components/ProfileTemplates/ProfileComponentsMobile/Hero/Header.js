import React, { useRef, useState } from "react";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";

const Header = (props) => {
  const data = props.data;
  const [activeHeading, setActiveHeading] = useState("");

  const goTo = (ref) => () => {
    setActiveHeading(ref.current.id);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const refrences = props.refrences;
  const activeHeadingStyle = props.activeHeadingStyle;
  const headerStyle = props.headerStyle;
  const heading = props.heading;
  const headerRef = useRef(null);
  const leftPosition = {
    left: "-12px",
    top: "50%",
    transform: "translateY(-50%)",
  };
  const rightPosition = {
    right: "-12px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  return (
    <div
      className={`relative w-full h-16 flex justify-center items-center ${headerStyle}`}
    >
      <div
        className="flex items-center gap-6 max-w-fit overflow-x-scroll"
        ref={headerRef}
      >
        <LeftRightScrollBtn
          refrence={headerRef}
          style={{ border: `1px solid ${props.borderColor}`, color: "black" }}
          leftPosition={leftPosition}
          rightPosition={rightPosition}
        />
        {data.products && (
          <div
            className={`${heading} !min-w-fit`}
            onClick={goTo(refrences.productsRef)}
            id="Products"
          >
            <span
              className={`${activeHeading === "Products" && "font-semibold"}`}
            >
              {data.productLabel}
            </span>
            {activeHeading === "Products" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
        )}

        {data.services && (
          <div
            className={`${heading} !min-w-fit`}
            onClick={goTo(refrences.servicesRef)}
            id="Services"
          >
            <span
              className={`${activeHeading === "Services" && "font-semibold"}`}
            >
              {data.serviceLabel}
            </span>
            {activeHeading === "Services" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
        )}

        {data.appointments && (
          <div
            className={`${heading} !min-w-fit`}
            onClick={goTo(refrences.appointmentsRef)}
            id="Appointments"
          >
            <span
              className={`${
                activeHeading === "Appointments" && "font-semibold"
              }`}
            >
              {data.availabilityLabel}
            </span>
            {activeHeading === "Appointments" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
        )}

        {data.gallery && (
          <div
            className={`${heading} !min-w-fit`}
            onClick={goTo(refrences.galleryRef)}
            id="Gallery"
          >
            <span
              className={`${activeHeading === "Gallery" && "font-semibold"}`}
            >
              Gallery
            </span>
            {activeHeading === "Gallery" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
        )}

        {data.videos && (
          <div
            className={`${heading} !min-w-fit`}
            onClick={goTo(refrences.videosRef)}
            id="Videos"
          >
            <span
              className={`${activeHeading === "Videos" && "font-semibold"}`}
            >
              Videos
            </span>
            {activeHeading === "Videos" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
        )}

        {data.resources && (
          <div
            className={`${heading} !min-w-fit`}
            onClick={goTo(refrences.resourcesRef)}
            id="Resources"
          >
            <span
              className={`${activeHeading === "Resources" && "font-semibold"}`}
            >
              Resources
            </span>
            {activeHeading === "Resources" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
        )}

        {data.businessHours && (
          <div
            className={`${heading} !min-w-fit`}
            onClick={goTo(refrences.businessHoursRef)}
            id="Business Hours"
          >
            <span
              className={`${
                activeHeading === "Business Hours" && "font-semibold"
              }`}
            >
              {data.businessHoursLabel}
            </span>
            {activeHeading === "Business Hours" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
        )}

        {data.reviews && (
          <div
            className={`${heading} !min-w-fit`}
            onClick={goTo(refrences.reviewsRef)}
            id="Reviews"
          >
            <span
              className={`${activeHeading === "Reviews" && "font-semibold"}`}
            >
              {data.reviewLabel}
            </span>
            {activeHeading === "Reviews" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
