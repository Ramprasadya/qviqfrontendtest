import React, { useEffect, useState } from "react";
import { HiChevronRight, HiOutlineStar, HiOutlineTrash } from "react-icons/hi";
import { HiOutlineArrowDownTray, HiStar, HiXMark } from "react-icons/hi2";
import NewModal from "../../NewModal/NewModal";
import TertiaryButton from "../../TertiaryButton";
import PrimaryButton2 from "../../PrimaryButton2";
import NewToast from "../../NewToast";
import { serverUrl } from "../../../../config";
import PrimaryButton from "../../PrimaryButton";
import SecondaryButtonLogo from "../../SecondaryButtonLogo";

const ReviewCard = ({
  handleSelect,
  selected,
  review,
  profile,
  setDummyState,
  dummyState,
}) => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [showMessage, setShowtMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = React.useState("");
  const [selectedArr, setSelectedArr] = useState([]);

  useEffect(() => {
    setSelectedArr(selected);
  }, [selected]);

  function promptMeDelete(id) {
    setOpenDelete(true);
    setId(id);
  }

  const isSelected = (id) => {
    if (selected) {
      return selected.indexOf(id) !== -1;
    }
    return false;
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `${serverUrl}/connect/delete/${profile}/${id}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    // const newRecords = data.filter((el) => el._id !== id);
    // setData(newRecords);
    // toast.success("Connect deleted successfully");
    if (result) {
      setOpenDelete(false);
      setMessage("One profile deleted!");
      setShowtMessage(true);
      setTimeout(() => {
        setShowtMessage(false);
      }, 3000);
    }
    setDummyState((prevState) => prevState + 1);
  };

  const DeleteComp = () => {
    return (
      <div className="my-[1.5rem]">
        <div className="my-[1.5rem]">
          Are you sure that you want to delete {review.name}'s review request?
          This will permanently remove the review from your profile.
        </div>
        <div className="reply_comp_btn_container gap-2">
          <TertiaryButton text="Cancel" onClick={() => setOpenDelete(false)} />
          <PrimaryButton2
            text="Delete review"
            onClick={() => {
              handleDelete(id);
            }}
          />
        </div>
      </div>
    );
  };

  //View Message Modal
  const [showMessageModal, setShowMessageModal] = useState(false);

  //limiting string length
  const limitString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
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

  return (
    <div className="flex flex-row items-start justify-start py-[0.75rem]">
      {windowWidth < 500 ? (
        <div
          className="flex flex-col rounded-[10px] shadow-sm pt-[10px] pb-[20px] px-[20px] w-full"
          style={{ boxShadow: "3px 3px 10px #abb5d94d" }}
        >
          <div className="flex flex-row items-center justify-between gap-2 h-[60px] w-full border-b-[1px] border-solid pb-[10px]">
            <div className="flex flex-row items-center justify-start gap-3">
              <div className="h-[55px] flex items-center justify-center">
                <input
                  onChange={() => handleSelect(review._id)}
                  type="checkbox"
                  className="hover:cursor-pointer"
                  checked={isSelected(review._id) || review.isOn}
                />
              </div>

              <div className="conn_card_char">
                {review.name.substring(0, 1)}
                {review.name.substr(review.name.indexOf(" ") + 1, 1)}
              </div>

              <p className="text-[12px] min-w-[110px] w-full font-[600] leading-[18px] text-[#1A1A1A] break-words">
                {review.name}
              </p>
            </div>

            <div className="flex flex-row items-center justify-start gap-3">
              <p className="w-[30px] text-right mt-[2px]">{review.stars}</p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="ml-[2px] mt-[3px]"
                >
                  <path
                    d="M7.65447 2.33255C7.78257 2.02457 8.21887 2.02457 8.34696 2.33255L9.76428 5.74019C9.81828 5.87003 9.94039 5.95874 10.0806 5.96998L13.7594 6.26491C14.0919 6.29156 14.2267 6.7065 13.9734 6.92351L11.1705 9.32447C11.0637 9.41595 11.0171 9.5595 11.0497 9.69628L11.906 13.2862C11.9834 13.6107 11.6304 13.8671 11.3458 13.6932L8.19619 11.7695C8.07618 11.6962 7.92525 11.6962 7.80525 11.7695L4.65566 13.6932C4.37099 13.8671 4.01802 13.6107 4.09542 13.2862L4.95175 9.69628C4.98437 9.5595 4.93773 9.41595 4.83094 9.32447L2.02806 6.92351C1.77473 6.7065 1.90955 6.29156 2.24205 6.26491L5.92088 5.96998C6.06105 5.95874 6.18315 5.87003 6.23716 5.74019L7.65447 2.33255Z"
                    stroke="#1A1A1A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          <p className="w-full h-fit text-[12px] font-normal leading-[18px] text-[#1A1A1A] text-left pt-[15px]">
            {review.review}
          </p>
        </div>
      ) : (
        <>
          <div className="h-[55px] flex items-center justify-center">
            <input
              onChange={() => handleSelect(review._id)}
              type="checkbox"
              className="hover:cursor-pointer"
              checked={isSelected(review._id) || review.isOn}
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between gap-2  py-[12px] px-[8px] pl-[0.5rem]">
              <div className="flex flex-row items-center gap-2 h-[32px] max-w-[170px] w-full">
                <div className="conn_card_char">
                  {review.name.substring(0, 1)}
                  {review.name.substr(review.name.indexOf(" ") + 1, 1)}
                </div>

                <p className="text-[12px] min-w-[110px] w-full font-[600] leading-[18px] text-[#1A1A1A] break-words">
                  {review.name}
                </p>
              </div>

              <div className="flex justify-center gap-2 w-full max-w-[350px]">
                <p className="w-full max-w-[320px] h-fit text-[12px] font-normal leading-[18px] text-[#1A1A1A] text-left">
                  {review.review}
                </p>

                <p className="w-[30px] text-right">{review.stars}</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="ml-[2px] mt-[3px]"
                  >
                    <path
                      d="M7.65447 2.33255C7.78257 2.02457 8.21887 2.02457 8.34696 2.33255L9.76428 5.74019C9.81828 5.87003 9.94039 5.95874 10.0806 5.96998L13.7594 6.26491C14.0919 6.29156 14.2267 6.7065 13.9734 6.92351L11.1705 9.32447C11.0637 9.41595 11.0171 9.5595 11.0497 9.69628L11.906 13.2862C11.9834 13.6107 11.6304 13.8671 11.3458 13.6932L8.19619 11.7695C8.07618 11.6962 7.92525 11.6962 7.80525 11.7695L4.65566 13.6932C4.37099 13.8671 4.01802 13.6107 4.09542 13.2862L4.95175 9.69628C4.98437 9.5595 4.93773 9.41595 4.83094 9.32447L2.02806 6.92351C1.77473 6.7065 1.90955 6.29156 2.24205 6.26491L5.92088 5.96998C6.06105 5.95874 6.18315 5.87003 6.23716 5.74019L7.65447 2.33255Z"
                      stroke="#1A1A1A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      <NewModal
        height="fit-content"
        onModal={openDelete}
        onClick={() => {
          setOpenDelete(false);
        }}
        text="Delete review"
        children={<DeleteComp />}
      />
    </div>
  );
};

export default ReviewCard;
