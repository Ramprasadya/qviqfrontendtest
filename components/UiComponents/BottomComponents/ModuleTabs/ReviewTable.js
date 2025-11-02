import React, { useState, useEffect, useRef, useContext } from "react";
// import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../../navbar/SideBar";
import NavBar from "../../../navbar/NavBar";
import "../../../review/review.css";
import "../../../Connections/connection.css";
import {
  HiOutlineChevronDown,
  HiOutlineDownload,
  HiOutlineTrash,
  HiStar,
} from "react-icons/hi";
import NoConnnectionsSvg from "../../NoConnnectionsSvg";
import PrimaryButton from "../../PrimaryButton";
import SecondaryButtonLogo from "../../SecondaryButtonLogo";
import { HiOutlineArrowDownTray, HiXMark } from "react-icons/hi2";
import useOutsideClick from "../../../Utils/useOutsideClick";
import { serverUrl } from "../../../../config";
import ReviewCard from "./ReviewCard";
import { UserContext } from "../../../Contexts/context";
import { useRouter, useParams } from "next/navigation";
import PrimaryButton2 from "../../PrimaryButton2";
import SecondaryButton from "../../SecondaryButton";
import NewToast from "../../NewToast";
import { getCookie } from "@/components/utils";

export default function ReviewTable(props) {
  const [data, setData] = useState([]);
  const { userType } = useContext(UserContext);

  const [selected, setSelected] = useState([]);
  const profile = useParams().userName;
  const type = useParams().templateId;

  const navigate = useRouter();

  const [showMessage, setShowtMessage] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [dummyState, setDummyState] = useState(0);

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const response = await fetch(
        `${serverUrl}/review/getReview/${type}/${profile}`,
        config
      );
      if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      //console.log(error);
      navigate.push("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, [dummyState, props.ptab]);

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const handleAddReview = async () => {
    let selectedData = [];
    if (selected.length === data.length) {
      selectedData = data;
    } else {
      selectedData = data.filter((d) => isSelected(d._id));
    }

    const addReviewPromises = selectedData.map(async (d) => {
      const response = await fetch(
        `${serverUrl}/review/addReview/${profile}/${d._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isOn: true,
          }),
        }
      );
      const result = await response.json();
      return result;
    });
    setToastMessage("Review Added To Your Profile!");
    setShowtMessage(true);
    await Promise.all(addReviewPromises);
    setDummyState((prevState) => prevState + 1);
  };
  const handleDelete = async () => {
    let selectedData = [];
    if (selected.length === data.length) {
      selectedData = data;
    } else {
      selectedData = data.filter((d) => isSelected(d._id));
    }

    const deletePromises = selectedData.map(async (d) => {
      const response = await fetch(
        `${serverUrl}/connect/delete/${profile}/${d._id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      return result;
    });
    setToastMessage("Review Deleted!");
    setShowtMessage(true);
    setSelected([]);
    await Promise.all(deletePromises);
    setDummyState((prevState) => prevState + 1);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n._id);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleSelect = async (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);

    const response = await fetch(
      `${serverUrl}/review/addReview/${profile}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isOn: false,
        }),
      }
    );
    const result = await response.json();
    setDummyState((prevState) => prevState + 1);

    return result;
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
    <>
      <div className="flex flex-col h-screen w-full first-container bg-white md:bg-[#FAFAFA]">
        <div className="w-full overflow-auto">
          {data.length === 0 ? (
            <div className="flex flex-col justify-center items-center mt-[7.25rem]">
              <div>
                <NoConnnectionsSvg />
                <div className="zeroConn_text">
                  You don't have any reviews yet! .
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex flex-row items-start justify-start py-[0.75rem]">
                <div className="h-[45px] flex items-center justify-center">
                  <input
                    onChange={handleSelectAll}
                    checked={selected.length === data.length}
                    type="checkbox"
                    className="hover:cursor-pointer"
                  />
                </div>

                {windowWidth < 500 ? (
                  <div className="w-full flex flex-row justify-between gap-2  py-[12px] px-[8px] pl-[1rem]">
                    <div className="conn_table_heading max-w-[170px] w-full">
                      Select all
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex flex-row justify-between gap-2  py-[12px] px-[8px] pl-[0.5rem]">
                    <div className="conn_table_heading max-w-[170px] w-full">
                      Profile Name
                    </div>

                    <div className="flex justify-center gap-2 w-full max-w-[350px]">
                      <div className="conn_table_heading w-full max-w-[320px]">
                        Messages
                      </div>
                      <div className="conn_table_heading w-[66px]  text-left">
                        Rating
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full flex flex-col">
                <>
                  {data.map((review, index) => {
                    return (
                      <ReviewCard
                        key={index}
                        handleSelect={handleSelect}
                        selected={selected}
                        review={review}
                        profile={profile}
                        setDummyState={setDummyState}
                        dummyState={dummyState}
                      />
                    );
                  })}
                </>
              </div>
            </div>
          )}

          <hr />
          {selected.length > 0 && (
            <div className="flex flex-row justify-end items-center gap-[10px] h-[96px] relative p-6  w-full">
              <SecondaryButton
                isDisabled={userType != "Pro" ? true : false}
                onClick={handleDelete}
                icon={<HiOutlineTrash />}
                text="Delete"
              />
              <PrimaryButton
                isDisabled={userType != "Pro" ? true : false}
                onClick={handleAddReview}
                text="Add Review"
              />{" "}
            </div>
          )}
        </div>

        <NewToast open={showMessage} message={toastMessage} />
      </div>
    </>
  );
}
