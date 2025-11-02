"use client";
import React, { useState, useEffect, useRef } from "react";
import SideBar from "../navbar/SideBar";
import NavBar from "../navbar/NavBar";
import { HiOutlineChevronDown } from "react-icons/hi";
import NoReviewSvg from "../UiComponents/NoReviewSvg";
import ReviewCard from "../UiComponents/ReviewCard";
import { serverUrl } from "../../config";
import axios from "axios";

import "./review.css";
import { useRouter } from "next/navigation";
import { SafeLocalStorage, getCookie } from "../utils";
import { drop } from "lodash";

export default function ShowReview(props) {
  const [review, setReview] = useState(props.review);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdownDate, setOpenDropdownDate] = useState(false);

  const [sortStarReview, setSortStarReview] = useState(0);
  const [sortDateReview, setSortDateReview] = useState(0);
  const [reviewLabel, setReviewLabel] = useState("All review");
  const [DateLabel, setDateLabel] = useState("This month");
  const [type, setType] = useState(props.type);
  const [dummyState, setDummyState] = useState(0);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);

  const profile = props.userName;
  const navigate = useRouter();
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/profile/profiletype/${profile}`
      );
      if (res.data.length > 0) {
        setType(res.data[0]._id);
      }
    } catch (error) {
      //console.log(error?.response?.data?.error);
    }
  };
  const fetchreview = async () => {
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
      setReview(result);
    } catch (error) {
      //console.log(error);
      navigate.push("/login");
    }
  };

  useEffect(() => {
    if (type != "") fetchreview();
    fetchProfile();
  }, [type, dummyState]);

useEffect(() => {
  function handleClickOutside(event) {
    if (
      dropdownRef1.current &&
      !dropdownRef1.current.contains(event.target)
    ) {
      setOpenDropdown(false);
    }
    if (
      dropdownRef2.current &&
      !dropdownRef2.current.contains(event.target)
    ) {
      setOpenDropdownDate(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



  useEffect(() => {
    if (sortStarReview === 0) setReviewLabel("All review");
    else if (sortStarReview === 5) setReviewLabel("5-Star");
    else if (sortStarReview === 4) setReviewLabel("4-Star");
    else if (sortStarReview === 3) setReviewLabel("3-Star");
    else if (sortStarReview === 2) setReviewLabel("2-Star");
    else if (sortStarReview === 1) setReviewLabel("1-Star");

    if (sortDateReview === 0) setDateLabel("This month");
    else if (sortDateReview === 1) setDateLabel("Last month");
    else if (sortDateReview === 2) setDateLabel("Last 3 month");
    else if (sortDateReview === 3) setDateLabel("Last 6 month");
    else if (sortDateReview === 4) setDateLabel("Last year");
  }, [sortStarReview, sortDateReview]);

  return (
    <div className="flex h-screen w-full first-container bg-white md:bg-[#FAFAFA]">
      <div className="h-full">
        <SideBar />
      </div>
      <div className="w-full overflow-auto">
        <NavBar text={"Reviews"} number={review.length} />

        <div className="review_container w-full">
          <div className="text-[#817C7C] text-base mb-4 hidden sm:block">
            View all your profile reviews here
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <div className="hidden md:flex flex-row items-center w-full">
              <div className="text-[#1A1A1A] text-xl font-semibold ">
                Reviews
              </div>
              <div className="review_number">{review.length}</div>
            </div>
            <div className="text-[#817C7C] text-base sm:hidden w-full">
              View all your profile reviews here
            </div>

            <div className="flex flex-row justify-center sm:justify-end items-end mt-[1.5rem] sm:mt-0 w-full">
              {/* <div className="flex justify-end">
                <LinkButtons2
                  text="Manage Reviews"
                  // icon={<HiOutlinePencilSquare />}
                  onClick={() => {
                    SafeLocalStorage.setItem("currentComponent", "Modules");
                    SafeLocalStorage.setItem("currentTab", "Reviews");
                    navigate(`/${type}/dashboard/${profile.profile}`);
                  }}
                  width={"159px"}
                /> */}
              {/* </div> */}
              <div
                className="dropDown cursor-pointer relative"
                ref={dropdownRef1}
                onClick={() => {
                  setOpenDropdown(!openDropdown);
                  setOpenDropdownDate(false);
                }}
              >
                <div className="text-[#817C7C] text-base hidden sm:block min-w-fit">
                  {" "}
                  Sort by :
                </div>
                <div className="review_label">{reviewLabel}</div>
                <span className="hover:cursor-pointer ">
                  <HiOutlineChevronDown />
                </span>
               {openDropdown && (
                  <div className="dropDown_popup z-50">
                    <div
                      onClick={() => setSortStarReview(0)}
                      className="dropDown_popup_item"
                    >
                      All review
                    </div>
                    <div
                      onClick={() => setSortStarReview(5)}
                      className="dropDown_popup_item"
                    >
                      5-Star ratings
                    </div>
                    <div
                      onClick={() => setSortStarReview(4)}
                      className="dropDown_popup_item"
                    >
                      4-Star ratings
                    </div>
                    <div
                      onClick={() => setSortStarReview(3)}
                      className="dropDown_popup_item"
                    >
                      3-Star ratings
                    </div>
                    <div
                      onClick={() => setSortStarReview(2)}
                      className="dropDown_popup_item"
                    >
                      2-Star ratings
                    </div>
                    <div
                      onClick={() => setSortStarReview(1)}
                      className="dropDown_popup_item"
                    >
                      1-Star ratings
                    </div>
                    <div
                      onClick={() => setSortStarReview(-1)}
                      className="dropDown_popup_item"
                    >
                      Negative reviews
                    </div>
                  </div>
                )}
              </div>
              <div
                className="dropDown ml-[1rem] cursor-pointer relative"
                ref={dropdownRef2}
                onClick={() => {
                  setOpenDropdownDate(!openDropdownDate);
                  setOpenDropdown(false);
                }}
              >
                <div className="text-[#817C7C] text-base hidden sm:block min-w-fit">
                  {" "}
                  Date :
                </div>
                <div className="review_label">{DateLabel}</div>
                <span className="hover:cursor-pointer">
                  <HiOutlineChevronDown />
                </span>
                      {openDropdownDate && (
                  <div className="dropDown_popup z-50">
                    <div
                      onClick={() => setSortDateReview(0)}
                      className="dropDown_popup_item"
                    >
                      This month
                    </div>
                    <div
                      onClick={() => setSortDateReview(1)}
                      className="dropDown_popup_item"
                    >
                      Last month
                    </div>
                    <div
                      onClick={() => setSortDateReview(2)}
                      className="dropDown_popup_item"
                    >
                      Last 3 month
                    </div>
                    <div
                      onClick={() => setSortDateReview(3)}
                      className="dropDown_popup_item"
                    >
                      Last 6 month
                    </div>
                    <div
                      onClick={() => setSortDateReview(4)}
                      className="dropDown_popup_item"
                    >
                      One year
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {review.length === 0 ? (
            <div className="flex flex-col justify-center items-center mt-[7.25rem]">
              <div>
                <NoReviewSvg />
                <div className="zeroReview_text">No reviews to show yet.</div>
              </div>
            </div>
          ) : (
            <div className="review_grid">
              {review
                .filter((off) => {
                  if (sortStarReview === 0) return true; 
                  if (sortStarReview === -1) return off.nagativeReview === true; 
                  return Math.floor(off.stars) === sortStarReview;
                })
                .map((off, index) => (
                  <ReviewCard
                    key={index}
                    off={off}
                    profile={profile}
                    setDummyState={setDummyState}
                    dummyState={dummyState}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
