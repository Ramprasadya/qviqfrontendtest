import React, { useEffect, useState } from "react";
import { HiChevronRight, HiOutlineStar, HiOutlineTrash } from "react-icons/hi";
import { HiOutlineArrowDownTray, HiStar, HiXMark } from "react-icons/hi2";
import NewModal from "../UiComponents/NewModal/NewModal";
import TertiaryButton from "../UiComponents/TertiaryButton";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import NewToast from "../UiComponents/NewToast";
import { serverUrl } from "../../config";
import PrimaryButton from "../UiComponents/PrimaryButton";
import SecondaryButtonLogo from "../UiComponents/SecondaryButtonLogo";

const ConnectionsCard = ({
  handleSelect,
  selectedd,
  connection,
  profile,
  setDummyState,
  dummyState,
}) => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [showMessage, setShowtMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = React.useState("");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(selectedd);
  }, [selectedd]);

  function promptMeDelete(id) {
    setOpenDelete(true);
    setId(id);
  }

  const handleDownload = (row) => {
    const vCard = `BEGIN:VCARD\nVERSION:3.0\nN:${row.name}\nTEL:${row.phone}\nEMAIL:${row.email}\nEND:VCARD`;
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/vcard;charset=utf-8," + encodeURIComponent(vCard)
    );
    element.setAttribute("download", `${row.name}.vcf`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setMessage("One profile downloaded!");
    setShowtMessage(true);
    setTimeout(() => {
      setShowtMessage(false);
    }, 3000);
  };

  const isSelected = (id) => {
    if (selected) {
      return selected.indexOf(id) !== -1;
    }
    return false;
  };

  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${serverUrl}/connect/favorites/${profile}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        const favoriteIds = data.map((favorite) => favorite._id);
        setFavorites(favoriteIds);
      } else {
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectF = (id) => {
    const selectedIndex = favorites.indexOf(id);
    
    let newFavorites = [];

    if (selectedIndex === -1) {
      // Add the contact to favorites
      newFavorites = newFavorites.concat(favorites, id);
      fetch(`${serverUrl}/connect/favorites/${id}`, {
        method: "PUT",
        body: JSON.stringify({ favorites: true, name: profile }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage("Connection added as favourite!");
      setShowtMessage(true);
      setTimeout(() => {
        setShowtMessage(false);
      }, 3000);
    } else if (selectedIndex === 0) {
      // Remove the contact from favorites
      newFavorites = newFavorites.concat(favorites.slice(1));
      fetch(`${serverUrl}/connect/favorites/${id}`, {
        method: "PUT",
        body: JSON.stringify({ favorites: false, name: profile }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (selectedIndex === favorites.length - 1) {
      fetch(`${serverUrl}/connect/favorites/${id}`, {
        method: "PUT",
        body: JSON.stringify({ favorites: false, name: profile }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      newFavorites = newFavorites.concat(favorites.slice(0, -1));
    } else if (selectedIndex > 0) {
      fetch(`${serverUrl}/connect/favorites/${id}`, {
        method: "PUT",
        body: JSON.stringify({ favorites: false, name: profile }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      newFavorites = newFavorites.concat(
        favorites.slice(0, selectedIndex),
        favorites.slice(selectedIndex + 1)
      );
    }
    setFavorites(newFavorites);
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
          Are you sure that you want to delete {connection.name}'s connection
          request? This will permanently remove the connection from your
          profile.
        </div>
        <div className="reply_comp_btn_container gap-2">
          <TertiaryButton text="Cancel" onClick={() => setOpenDelete(false)} />
          <PrimaryButton2
            text="Delete Connection"
            onClick={() => {
              handleDelete(id);
            }}
          />
        </div>
      </div>
    );
  };

  const convertDate = (date) => {
    const inputDate = new Date(date);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = inputDate.getDate();
    const monthIndex = inputDate.getMonth();
    const year = inputDate.getFullYear();

    const outputDate = `${day} ${months[monthIndex]} ${year}`;
    return outputDate;
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

  return (
    <div className="conn_card_container">
      <div className="flex justify-between xl:justify-start w-full xl:w-fit">
        <div className="hidden w-[3rem] h-[3rem] xl:flex items-center justify-center">
          <input
            onChange={() => handleSelect(connection._id)}
            type="checkbox"
            className="hover:cursor-pointer"
            checked={isSelected(connection._id)}
          />
        </div>
        <div className="flex flex-col xsm:flex-row gap-2 xl:w-[21.25rem] pl-[0.5rem]">
          <div className="conn_card_char">
            {connection.name.substring(0, 1)}
            {connection.name.substr(connection.name.indexOf(" ") + 1, 1)}
          </div>
          <div className="pl-1 xl:pr-[3.75rem]">
            <div
              className="text-[#1A1A1A] font-[600] text-[0.875rem] leading-[1.375rem] break-all"
              title={connection.name}
            >
              {limitString(connection.name, 25)}
            </div>
            <div
              className="text-[#1A1A1A] xl:text-[#817C7C] font-[400] text-[0.875rem] leading-[1.375rem] break-all"
              title={connection.email}
            >
              {limitString(connection.email, 25)}
            </div>
            <div className="card_label xl:hidden">{connection.phone}</div>
            <div className="card_label xl:hidden !text-[#817C7C] xl:!text-[#1A1A1A]">
              {new Intl.DateTimeFormat("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(
                new Date(connection.date.split("/").reverse().join("-"))
              )}
            </div>
          </div>
        </div>
        <div className="xl:hidden w-[3rem] h-[3rem] flex items-center justify-center">
          <input
            onChange={() => handleSelect(connection._id)}
            type="checkbox"
          />
        </div>
      </div>
      <div className="card_label hidden xl:block">{connection.phone}</div>
      <div className="card_label hidden xl:block">
        {new Intl.DateTimeFormat("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date(connection.date.split("/").reverse().join("-")))}
      </div>
      <div
        className={`card_label hidden xl:flex gap-1.5 font-medium ${
          connection.message !== ""
            ? "view-message-color hover:cursor-pointer  active:scale-95 duration-100"
            : "text-[rgba(167,167,167,0.60)]"
        }`}
        onClick={() => {
          connection.message !== "" && setShowMessageModal(true);
        }}
      >
        <span>View Message </span>
        <span className="mt-[3px]">
          {connection.message !== "" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8.78181 8.00048L5.48181 4.70048L6.42448 3.75781L10.6671 8.00048L6.42448 12.2431L5.48181 11.3005L8.78181 8.00048Z"
                fill="url(#paint0_linear_2252_17188)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2252_17188"
                  x1="10.6671"
                  y1="3.75781"
                  x2="4.80614"
                  y2="4.25347"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FB6609" />
                  <stop offset="1" stopColor="#E40849" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <HiChevronRight />
          )}
        </span>
      </div>
      <div className="flex xsm2:flex-row justify-between items-center w-full xl:w-auto border-t border-t-[#f3f3f3] xl:border-none mt-3 xl:mt-0">
        <div className="xl:hidden mt-[0.75rem] xl:mt-0">
          {connection.message !== "" ? (
            <div
              className="flex items-center view-message-color hover:cursor-pointer"
              onClick={() => {
                setShowMessageModal(true);
              }}
            >
              View Message{" "}
              <span className="text-base text-[#FB6609]">
                <HiChevronRight />
              </span>
            </div>
          ) : (
            <div className="flex items-center text-[rgba(167,167,167,0.60)]">
              View Message{" "}
              <span className="text-base">
                <HiChevronRight />
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-[0.5px] sm:gap-[1.25rem] mt-[0.75rem] xl:mt-0">
          <div
            onClick={() => {
              handleSelectF(connection._id);
            }}
            className="card_icon"
          >
            {favorites.indexOf(connection._id) !== -1 ? (
              <div className="w-4 h-5">
                {" "}
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  ></path>
                </svg>
              </div>
            ) : (
              <>
                <HiOutlineStar />
              </>
            )}
          </div>

          <div
            onClick={() => {
              handleDownload(connection);
            }}
            className="card_icon"
          >
            <HiOutlineArrowDownTray />
          </div>
          <div
            onClick={() => promptMeDelete(connection._id)}
            className="card_icon"
          >
            <HiOutlineTrash />
          </div>
        </div>
      </div>
      <NewModal
        height="fit-content"
        onModal={openDelete}
        onClick={() => {
          setOpenDelete(false);
        }}
        text="Delete Connection"
        children={<DeleteComp />}
      />

      <NewToast open={showMessage} message={message} />

      {
        // showMessageModal && Object.keys(connection).length !== 0 &&
        showMessageModal && (
          <div style={{ zIndex: "998" }}>
            <div className="modal-wrapper" style={{ zIndex: "998" }}></div>
            <div
              className="fixed left-0 bottom-0 md:-translate-x-1/2 md:left-1/2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 bg-white text-[#1A1A1A] rounded-t-2xl md:rounded-2xl w-full md:max-w-[640px] !h-fit !max-h-fit px-5 py-6 md:p-6"
              style={{ zIndex: "998" }}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="conn_card_char">
                    {connection.name.substring(0, 1)}
                    {connection.name.substr(
                      connection.name.indexOf(" ") + 1,
                      1
                    )}
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold break-all">
                    {connection.name}
                  </h3>
                </div>
                <div
                  className="text-2xl hover:cursor-pointer"
                  onClick={() => {
                    setShowMessageModal(false);
                  }}
                >
                  <HiXMark />
                </div>
              </div>
              <div className="my-6 w-full h-[1px] bg-[#F3F3F3]" />
              <div className="flex flex-col-reverse gap-5 sm:flex-row sm:justify-between text-sm mb-5">
                <p className="font-semibold break-all">
                  <span className="font-medium text-[#817C7C]">Email: </span>
                  {connection.email}
                </p>
                <p className="text-[#817C7C]">
                  <span className="font-medium text-[#817C7C] sm:hidden">
                    Date:{" "}
                  </span>
                  {new Intl.DateTimeFormat("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(
                    new Date(connection.date.split("/").reverse().join("-"))
                  )}
                </p>
              </div>
              <p className="mb-5 text-sm font-semibold">
                <span className="font-medium text-[#817C7C]">Mobile: </span>
                {connection.phone}
              </p>
              {connection.message !== "" && (
                <div>
                  <p className="mb-3 text-sm font-medium text-[#817C7C]">
                    Message
                  </p>
                  <p className="mb-8 text-sm border border-[#DFDBD8] rounded-lg p-4 break-all">
                    {connection.message}
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-end">
                <SecondaryButtonLogo
                  text={
                    favorites.indexOf(connection._id) === -1
                      ? "Mark as Favourite"
                      : "Unmark as Favourite"
                  }
                  onClick={() => {
                    handleSelectF(connection._id);
                    setShowMessageModal(false);
                  }}
                  icon={
                    favorites.indexOf(connection._id) === -1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path d="M0.5 0.5H19.5V19.5H0.5V0.5Z" stroke="white" />
                        <path
                          d="M10 14.1654L5.10168 17.157L6.43334 11.5737L2.07501 7.84036L7.79585 7.38203L10 2.08203L12.2042 7.38203L17.9258 7.84036L13.5667 11.5737L14.8983 17.157L10 14.1654ZM10 12.212L12.3475 13.6454L11.7092 10.9704L13.7983 9.1812L11.0567 8.9612L10 6.42203L8.94335 8.9612L6.20168 9.1812L8.29085 10.9704L7.65251 13.6454L10 12.2129V12.212Z"
                          fill="url(#paint0_linear_2274_6556)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2274_6556"
                            x1="17.9258"
                            y1="2.08203"
                            x2="0.255578"
                            y2="4.65324"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FB6609" />
                            <stop offset="1" stopColor="#E40849" />
                          </linearGradient>
                        </defs>
                      </svg>
                    ) : (
                      <span className="text-base">
                        <HiStar />
                      </span>
                    )
                  }
                />
                <PrimaryButton
                  text={"Download Contact"}
                  icon={<HiOutlineArrowDownTray />}
                  onClick={() => {
                    handleDownload(connection);
                    setShowMessageModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ConnectionsCard;
