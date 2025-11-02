import React, { useEffect, useRef, useState } from "react";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";

const Header = (props) => {
  const data = props.data;
  const [activeHeading, setActiveHeading] = useState("");

  const outerDivRefs = useRef([]);
  const innerSpanRefs = useRef([]);

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

  useEffect(() => {
    outerDivRefs.current.forEach((outerDivRef, index) => {
      if (outerDivRef && innerSpanRefs.current[index]) {
        const innerWidth = innerSpanRefs.current[index].offsetWidth;
        const innerHeight = innerSpanRefs.current[index].offsetHeight;
        outerDivRef.style.width = `${innerWidth + 20}px`;
        outerDivRef.style.height = `${innerHeight}px`;
      }
    });
  }, [data]);

  return (
    <div
      className={`relative h-[72px] flex items-center ${headerStyle} !w-fit !max-w-full`}
    >
      <div
        className="flex items-center gap-[8px] w-full max-w-full overflow-x-scroll"
        ref={headerRef}
      >
        <LeftRightScrollBtn
          refrence={headerRef}
          style={{ border: `1px solid ${props.borderColor}` }}
          leftPosition={leftPosition}
          rightPosition={rightPosition}
        />
        {data.products && (
          <div
            ref={(el) => (outerDivRefs.current[0] = el)}
            className="relative flex items-center justify-center"
          >
          <div
            className={`${heading} !min-w-fit flex items-center justify-center`}
            onClick={goTo(refrences.productsRef)}
            id="Products"
          >
            <span
              ref={(el) => (innerSpanRefs.current[0] = el)}
              className={`${activeHeading === "Products" && "font-semibold"}`}
            >
              {data.productLabel}
            </span>
            {activeHeading === "Products" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
          </div>
        )}

        {data.services && (
          <div
          ref={(el) => (outerDivRefs.current[1] = el)}
          className="relative flex items-center justify-center"
        >
          <div
            className={`${heading} !min-w-fit flex items-center justify-center`}
            onClick={goTo(refrences.servicesRef)}
            id="Services"
          >
            <span
              ref={(el) => (innerSpanRefs.current[1] = el)}
              className={`${activeHeading === "Services" && "font-semibold"}`}
            >
              {data.serviceLabel}
            </span>
            {activeHeading === "Services" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
          </div>
        )}

        {data.appointments && (
          <div
          ref={(el) => (outerDivRefs.current[2] = el)}
          className="relative flex items-center justify-center"
        >
          <div
            className={`${heading} !min-w-fit flex items-center justify-center`}
            onClick={goTo(refrences.appointmentsRef)}
            id="Appointments"
          >
            <span
              ref={(el) => (innerSpanRefs.current[2] = el)}
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
          </div>
        )}

        {data.gallery && (
          <div
          ref={(el) => (outerDivRefs.current[3] = el)}
          className="relative flex items-center justify-center"
        >
          <div
            className={`${heading} !min-w-fit flex items-center justify-center`}
            onClick={goTo(refrences.galleryRef)}
            id="Gallery"
          >
            <span
              ref={(el) => (innerSpanRefs.current[3] = el)}
              className={`${activeHeading === "Gallery" && "font-semibold"}`}
            >
              Gallery
            </span>
            {activeHeading === "Gallery" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
          </div>
        )}

        {data.videos && (
          <div
          ref={(el) => (outerDivRefs.current[4] = el)}
          className="relative flex items-center justify-center"
        >
          <div
            className={`${heading} !min-w-fit flex items-center justify-center`}
            onClick={goTo(refrences.videosRef)}
            id="Videos"
          >
            <span
              ref={(el) => (innerSpanRefs.current[4] = el)}
              className={`${activeHeading === "Videos" && "font-semibold"}`}
            >
              Videos
            </span>
            {activeHeading === "Videos" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
          </div>
        )}

        {data.resources && (
          <div
          ref={(el) => (outerDivRefs.current[5] = el)}
          className="relative flex items-center justify-center"
        >
          <div
            className={`${heading} !min-w-fit flex items-center justify-center`}
            onClick={goTo(refrences.resourcesRef)}
            id="Resources"
          >
            <span
               ref={(el) => (innerSpanRefs.current[5] = el)}
              className={`${activeHeading === "Resources" && "font-semibold"}`}
            >
              Resources
            </span>
            {activeHeading === "Resources" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
          </div>
        )}

        {data.businessHours && (
          <div
          ref={(el) => (outerDivRefs.current[6] = el)}
          className="relative flex items-center justify-center"
        >
          <div
            className={`${heading} !min-w-fit flex items-center justify-center`}
            onClick={goTo(refrences.businessHoursRef)}
            id="Business Hours"
          >
            <span
              ref={(el) => (innerSpanRefs.current[6] = el)}
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
          </div>
        )}

        {data.reviews && (
          <div
          ref={(el) => (outerDivRefs.current[7] = el)}
          className="relative flex items-center justify-center"
        >
          <div
            className={`${heading} !min-w-fit flex items-center justify-center`}
            onClick={goTo(refrences.reviewsRef)}
            id="Reviews"
          >
            <span
              ref={(el) => (innerSpanRefs.current[7] = el)}
              className={`${activeHeading === "Reviews" && "font-semibold"}`}
            >
              {data.reviewLabel}
            </span>
            {activeHeading === "Reviews" && (
              <span className={`${activeHeadingStyle}`} />
            )}
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
