import React from "react";
import NewModal from "../NewModal/NewModal";
import PrimaryButton2 from "../PrimaryButton2";
import { HiArrowSmRight } from "react-icons/hi";
import modalBanner from "../modal.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
const ProModal = ({ profile, showModal, setShowModal }) => {
  const navigate = useRouter();
  return (
    <>
      <NewModal
        text="Upgrade to PRO"
        onModal={showModal}
        onClick={setShowModal}
      >
        <div className="mx-[24px]">
          <Image src={modalBanner} alt="modal banner" className="pt-[48px]" />
          <p className="mt-[24px] sm:mt[32px] text-[#817C7C] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
            By becoming a pro member, you can expand your network, unlock and
            add more media links, and analyse your profile visits and audience.
          </p>

          <div className="py-[32px]">
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
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
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                You can include multiple custom links, pdf files, and additional
                images.
              </div>
            </div>
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
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
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                Domain customization
              </div>
            </div>
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
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
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                Multiple Tapop profiles can be created and managed.
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center py-6">
            <PrimaryButton2
              text={`Get PRO Plan at ₹${399}`}
              onClick={() => {
                navigate.push(`/plan/${profile}`);
              }}
              icon={<HiArrowSmRight />}
              color="linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
            />
          </div>
        </div>
      </NewModal>
    </>
  );
};

export default ProModal;
