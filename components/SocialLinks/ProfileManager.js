import React from "react";
import NavBar from "../navbar/NavBar";
import SideBar from "../navbar/SideBar";
import ProfileCard from "../UiComponents/ProfileCard";
import Createprofilecard from "../UiComponents/Createprofilecard";

const ProfileManager = () => {
  return (
    <div className="flex h-screen w-full first-container">
      <div className="h-full">
        <SideBar />
      </div>

      <div className="w-full overflow-auto">
        <NavBar />
        <div
          className="main-profile-div"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="main-content flex flex-wrap"
            style={{ gap: "1rem", width: "70%" }}
          >
            {/* <Createprofilecard /> */}
            <ProfileCard
              image="https://picsum.photos/64/64"
              cardtype="Business Card"
              status="Currently Shared"
              name="John Doe"
              email="johndoe@gmail.com"
              mobilenumber="+1234567890"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
