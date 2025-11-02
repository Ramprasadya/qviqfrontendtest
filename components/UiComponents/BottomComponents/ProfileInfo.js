import React from "react";
import BasicDetails from "../../ProfileInfo/BasicDetails";

function ProfileInfo(props) {

  return (
    <div
      className={
        props.current === "Profile Information" || props.current === "Basic Details"
          ? "bottom-container "
          : "hidden"
      }
    >
      <div className="left w-full">

        <>
          <div
            className={"text-yellow"}
          >
            <BasicDetails
              profile={props.profile}
              type={props.type}
              switchStates={props.switchStates}
              homePageRef={props.homePageRef}
            />
          </div>
        </>
      </div>
    </div>
  );
}

export default ProfileInfo;
