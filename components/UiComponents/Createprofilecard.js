import { useEffect, useState } from "react";
import NewModal from "./NewModal/Newmodal3";
import modalBanner from "./modal.png";
import ProtagLarge from "./ProtagLarge";
import IconButton1 from "./IconButton1";
import "./UiStyles.css";
import Link from "next/link";
import Image from "next/image";

const Createprofilecard = (props) => {
  const [showModal, setShowModal] = useState(false);

  function handleModal() {
    setShowModal((prev) => !prev);
    setShowProModal(true);
  }

  const [showProModal, setShowProModal] = useState(false);

  const handleEscPress = (event) => {
    if (event.key === "Escape") {
      setShowProModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscPress);

    return () => {
      window.removeEventListener("keydown", handleEscPress);
    };
  }, []);

  return (
    <div className="create-card">
      {props.basic || props.starter ? (
        props.profileData.length === 0 ? (
          <>
            <Link
              href={`/createprofile/${props.profile}`}
              className="w-full h-full flex justify-center items-center"
            >
              <div className="create-main">
                <IconButton1 />
                <span  className="font-medium">
                  Create New Profile
                </span>
              </div>
            </Link>
          </>
        ) : (
          <>
            {showProModal && (
              <NewModal
                text="Upgrade to PRO"
                onModal={showModal}
                onClick={handleModal}
              >
                <Image
                  src={modalBanner}
                  alt="modal banner"
                  className="pt-[48px]"
                />
                <p className="mt-[24px] sm:mt[32px] text-[#817C7C] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                  By becoming a pro member, you can expand your network, unlock
                  and add more media links, and analyse your profile visits and
                  audience.
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
                      Unlock additional media links and add them to your
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
                      You can include multiple custom links, pdf files, and
                      additional images.
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
                      Add appointment slots and receive appointments through
                      your profile.
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
              </NewModal>
            )}

            <div className="absolute top-3 right-3">
              <button
                onClick={() => {
                  handleModal();
                  setShowProModal(true);
                }}
                type="button"
                className="pro-tag-large text-white font-medium rounded-full hover:cursor-pointer"
              >
                Pro
              </button>
            </div>

            <div className="create-main" onClick={handleModal}>
              <IconButton1 />
              <span  className="font-medium">
                Create New Profile
              </span>
            </div>
          </>
        )
      ) : props.profileData.length >= 3 ? (
        <div className="create-main">
          <IconButton1 />
          <span  className="font-medium">
            Create New Profile
          </span>
        </div>
      ) : (
        <>
          <Link
            href={`/createprofile/${props.profile}`}
            className="w-full h-full flex justify-center items-center"
          >
            <div className="create-main">
              <IconButton1 />
              <span  className="font-medium">
                Create New Profile
              </span>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default Createprofilecard;
