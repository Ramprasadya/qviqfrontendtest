import React, { useRef, useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePencilAlt,
} from "react-icons/hi";
export default function ProfilePic({pimage}) {
  const [profileimage, setProfileImage] = useState("");

  const [imageUrl2, setImageUrl2] = useState("");

  const fileInputRef = useRef(null);
  const fileInputRefCover = useRef(null);
  // const handleButtonClickCover = () => {
  //   fileInputRefCover.current.click();
  // };
  return (
    <>
      <div className="  w-full xsm:mt-[24px] mt-4 xl:mt-10 ">
        <div className=" add-profile-image-icon flex justify-center ">
          {/* <button
            className="absolute top-[2.2rem]  "
            type="button"
            onClick={() => document.getElementById("ProfileInput").click()}
          >
            <input
              id="ProfileInput"
              type="file"
              accept=".jpeg, .jpg, .png"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                setProfileImage(e.target.files[0]);
                setImageUrl2(URL.createObjectURL(e.target.files[0]));
                e.target.value = "";
              }}
            ></input>
            <HiOutlinePencilAlt />
          </button> */}
          <div
            className=" xsm:w-[64px] xsm:h-[64px] w-[54px] h-[54px] xl:w-[120px] xl:h-[120px] rounded-[4rem] xl:rounded-[120px] border-[1px] border-[#ffffff]"
            style={{
              backgroundImage: `url(${
                pimage ? pimage : "https://picsum.photos/120/120"
              })`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              justifyContent: "center",
            }}
          >
            {/* {imageUrl2 == "" && (
                  <img
                    className="w-full h-full"
                    src={
                      profileimage
                        ? profileimage
                        : "https://picsum.photos/120/120"
                    }
                    alt="profileimage"
                    style={{ borderRadius: "4rem" }}
                  ></img>
                )}
                {imageUrl2 !== "" && (
                  <div className=" w-full h-full  flex justify-center items-center">
                    <img
                      src={imageUrl2}
                      alt={"image"}
                      className="w-full h-full rounded-[4rem] object-contain bg-white"
                      style={{ backgroundSize: "contain" }}
                    />
                  </div>
                )} */}
          </div>
        </div>
      </div>
    </>
  );
}
