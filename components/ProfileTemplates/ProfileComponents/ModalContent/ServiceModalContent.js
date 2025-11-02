import React, { useEffect, useState } from "react";
import CustomButton from "../Button/CustomButton";
import Button from "../Button/Button";
import NewCarousel from "./NewCarousel";
import PrimaryButton2 from "@/components/UiComponents/PrimaryButton2";
import PrimaryButton from "@/components/UiComponents/PrimaryButton";
import PrimaryButton3 from "@/components/UiComponents/PrimaryButton3";
import PrimaryButton4 from "@/components/UiComponents/PrimaryButton4";
import SecondaryButtonLogoCustom from "@/components/UiComponents/SecondaryButtonLogoCustom";
import deleteIcon from "./delete-bin-2-line.svg";
import editIcon from "./edit-2-line.svg";

export default function ServiceModalContent(props) {
  // console.log("opened value",props.openedService)
  const handleOnClick = (link, name, customLink) => {
    if (customLink) {
      // console.log(customLink);
      window.open(customLink, "_blank");
    } else if (link) {
      const message = `Hello! I'm intrested in your ${name} service displayed on qviq`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://api.whatsapp.com/send?phone=${link}&text=${encodedMessage}`;
      window.open(whatsappLink, "_blank");
    }
  };

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleDelete = (id) => {
    props.setShowDeleteModal((prev) => ({
      show: !prev.show,
      id: id,
    }));
  };

  const handleEdit = (id) => {
    props.setShowEditModalService(false);
    props.setShowEditModalService((prev) => ({
      show: !prev.show,
      id: id,
    }));
  };

  return (
    <div className="z-[1] w-full max-h-[80vh] overflow-y-scroll overflow-x-hidden pt-[40px] pb-[60px] sm:pb-[40px] px-[10px]  flex flex-col items-start gap-[32px] bg-white">
      {props.isDashboard === true ? (
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-col gap-[24px]">
            {/* image */}
            <div className="w-full h-fit flex flex-col justify-start items-center">
              {windowWidth > 768 ? (
                <NewCarousel
                  slides={props.serviceImgArr}
                  speed={3000}
                  slideWidth={600}
                  slideHeight={272}
                  manualMode
                />
              ) : (
                <NewCarousel
                  slides={props.serviceImgArr}
                  speed={3000}
                  slideWidth={windowWidth - 50}
                  slideHeight={272}
                  manualMode
                />
              )}
            </div>

            <div
              className="w-full"
              // onClick={() =>
              //   window.open(props.openedService.customLink, "_blank")
              // }
            >
              <p className="text-[#121212] text-[20px] mb-[12px] font-[600]">
                {props.openedService.name}
              </p>

              <p className="text-[#817c7c] text-[16px] leading-[26px]">
                {props.openedService.description}
              </p>
            </div>

            <div
              className={`${
                props.openedService.btn ? "visible" : "hidden"
              } h-[60px] w-full flex flex-row justify-end items-end`}
            >
              {/* <p className="font-[700] text-[22px] mb-[16px]">
                ₹ {props.openedService.price}
              </p> */}

              <button
                onClick={() =>
                  handleOnClick(
                    props.openedService.link,
                    props.openedService.name,
                    props.openedService.customLink
                  )
                }
                className="card-btn rounded-full"
              >
                {props.openedService.btnLabel}
              </button>
            </div>
          </div>

          <div
            className="flex flex-row justify-end items-center gap-[10px] mt-[20px] pt-[30px]"
            style={{ borderTop: "2px dashed #e5e7eb" }}
          >
            <SecondaryButtonLogoCustom
              classStyle="hover:shadow-lg"
              border={"1px solid #000"}
              text="Edit"
              img={editIcon}
              icon=""
              onClick={() => handleEdit(props.openedService.id)}
              height="50px"
              width="100px"
            />
            <SecondaryButtonLogoCustom
              classStyle="hover:shadow-lg"
              border={"1px solid #000"}
              text="Delete"
              img={deleteIcon}
              icon=""
              onClick={() => handleDelete(props.openedService.id)}
              height="50px"
              width="120px"
            />

            {/* <PrimaryButton4
              onClick={() => {
                handleEdit(props.openedService.id);
              }}
              text="Edit"
            />

            <PrimaryButton2
              onClick={() => {
                handleDelete(props.openedService.id);
              }}
              text="Delete"
            /> */}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-[24px]">
          {/* image */}
          <div className="w-full h-fit flex flex-col justify-start items-center">
            {windowWidth > 768 ? (
              <NewCarousel
                slides={props.serviceImgArr}
                speed={3000}
                slideWidth={600}
                slideHeight={272}
                manualMode
              />
            ) : (
              <NewCarousel
                slides={props.serviceImgArr}
                speed={3000}
                slideWidth={windowWidth - 50}
                slideHeight={272}
                manualMode
              />
            )}
          </div>

          <div
            className="w-full"
            onClick={() =>
              window.open(props.openedService.customLink, "_blank")
            }
          >
            <p className="text-[#121212] text-[20px] mb-[12px]">
              {props.openedService.name}
            </p>
            {/* <p className="font-[700] text-[22px] mb-[16px]">
              ₹ {props.openedService.price}
            </p> */}
            <p className="text-[16px] leading-[26px]">
              {props.openedService.description}
            </p>
          </div>

          <div
            className={`${
              props.openedService.btn ? "visible" : "hidden"
            } h-[60px] w-full flex flex-col justify-end`}
          >
            {props.openedService.btnType == "custom" ? (
              <CustomButton
                text={props.openedService.btnLabel}
                style={`${props.openedService.btnStyle} w-full`}
                customBtn={props.openedService.customBtn}
                onClick={() =>
                  handleOnClick(
                    props.openedService.link,
                    props.openedService.name,
                    props.openedService.customLink
                  )
                }
              />
            ) : (
              <Button
                text={props.openedService.btnLabel}
                style={`${props.openedService.btnStyle} w-full`}
                onClick={() =>
                  handleOnClick(
                    props.openedService.link,
                    props.openedService.name,
                    props.openedService.customLink
                  )
                }
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
