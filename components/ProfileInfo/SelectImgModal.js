import React from "react";
import { MdGif } from "react-icons/md";
import { BsImageAlt } from "react-icons/bs";
import NewModal from "../UiComponents/NewModal/NewModal";

export default function SelectImgModal({
  showTypeModal,
  setShowTypeModal,
  onImageSelect,
}) {
  return (
    <NewModal
      text="Choose An Image File Type"
      onModal={showTypeModal}
      onClick={setShowTypeModal}
    >
      <div className="w-full sm:h-[260px] h-fit flex flex-col sm:flex-row justify-center items-center gap-[40px] sm:gap-[100px] mt-[20px]">
        <div className="flex flex-col gap-[20px]">
          <div className="bg-slate-300 w-[140px] h-[170px] flex flex-col justify-center items-center rounded-[5px] relative shadow-md hover:bg-slate-400 transition-[300ms] active:scale-[90%] hover:shadow-lg">
            <div className="bg-white w-[80px] h-[40px] absolute top-[0%] right-[0%] rotate-[45deg] translate-x-[30px] translate-y-[-10px]"></div>
            <BsImageAlt
              className="text-[100px]"
              onClick={() => {
                document.getElementById("ProfileInput1").click();
              }}
            />
          </div>
          <p className="text-center text-[14px] leading-[18px] font-normal text-gray-800">
            Select a .jpg or .png
          </p>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="bg-slate-300 w-[140px] h-[170px] flex flex-col justify-center items-center rounded-[5px] relative shadow-md hover:bg-slate-400 transition-[300ms] active:scale-[90%] hover:shadow-lg">
            <div className="bg-white w-[80px] h-[40px] absolute top-[0%] right-[0%] rotate-[45deg] translate-x-[30px] translate-y-[-10px]"></div>
            <MdGif
              className="text-[100px]"
              onClick={() => {
                document.getElementById("ProfileInput2").click();
              }}
            />
          </div>
          <p className="text-center text-[14px] leading-[18px] font-normal text-gray-800">
            Select a .gif
          </p>
        </div>
      </div>
    </NewModal>
  );
}