import { useState } from "react";
import NewModal from "./NewModal/Newmodal2";
import modalBanner from "./modal.png";
import Image from "next/image";

function ProtagLarge() {
  const [showModal, setShowModal] = useState(false);

  function handleModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <>
      <NewModal
        text="Upgrade to PRO"
        onModal={showModal}
        onClick={setShowModal}
      >
        <Image src={modalBanner} alt="modal banner" className="pt-[48px]" />
        <p className="mt-[24px] sm:mt[32px] text-[#817C7C] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
          By becoming a pro member, you can expand your network, unlock and add
          more media links, and analyse your profile visits and audience.
        </p>

        <div className="py-[32px]">
          <div className="flex flex-row justify-start items-center py-[5px]">
            <div
              className="w-[8px] h-[8px] rounded-full"
              style={{
                background: "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
              }}
            ></div>
            <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
              Unlock additional media links and add them to your profile.
            </div>
          </div>
          <div className="flex flex-row justify-start items-center py-[5px]">
            <div
              className="w-[8px] h-[8px] rounded-full"
              style={{
                background: "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
              }}
            ></div>
            <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
              Include multiple custom links, pdf files, and images.
            </div>
          </div>
          <div className="flex flex-row justify-start items-center py-[5px]">
            <div
              className="w-[8px] h-[8px] rounded-full"
              style={{
                background: "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
              }}
            ></div>
            <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
              Add appointment slots and receive appointments through your
              profile.
            </div>
          </div>
          <div className="flex flex-row justify-start items-center py-[5px]">
            <div
              className="w-[8px] h-[8px] rounded-full"
              style={{
                background: "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
              }}
            ></div>
            <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
              Get more Templates & Themes for your profiles
            </div>
          </div>
          <div className="flex flex-row justify-start items-center py-[5px]">
            <div
              className="w-[8px] h-[8px] rounded-full"
              style={{
                background: "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
              }}
            ></div>
            <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
              Multiple Tapop profiles can be created and managed.
            </div>
          </div>
        </div>
      </NewModal>

      <button
        onClick={setShowModal}
        type="button"
        className="pro-tag-large text-white font-medium rounded-full hover:cursor-default"
      >
        Pro
      </button>
    </>
  );
}

export default ProtagLarge;
