import React from "react";
import Header from "./Header";
import TextContent from "./TextContent";

const Hero = (props) => {
  const style = props.style;
  const headingData = props.headingData;

  return (
    <div className="w-full p-8 " style={{ background: style.background }}>
      <div className="mx-auto flex flex-col items-center text-center gap-5">
        {headingData.products ||
        headingData.services ||
        headingData.appointments ||
        headingData.gallery ||
        headingData.videos ||
        headingData.resources ||
        headingData.businessHours ||
        headingData.reviews ? (
          <Header
            data={headingData}
            headerStyle={style.header}
            borderColor={style.background}
            heading={style.heading}
            activeHeadingStyle={style.activeHeader}
            refrences={props.refrences}
          />
        ) : (
          <div className="h-2" />
        )}
        {props.heroProfile}
        <TextContent
          data={props.heroData}
          dummy={props.dummy}
          titleStyle={style.jobTitle}
          setShowEmail={props.setShowEmail}
          setShowMobile={props.setShowMobile}
          setShowContact={props.setShowContact}
          descriptionStyle={style.jobDescription}
        />
      </div>
    </div>
  );
};

export default Hero;
