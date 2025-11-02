"use client";
import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
import SideBar from "../navbar/SideBar";
import NavBar from "../navbar/NavBar";
import "../review/review.css";
import "./connection.css";
import {
  HiOutlineChevronDown,
  HiOutlineDownload,
  HiOutlineTrash,
  HiStar,
  HiX,
} from "react-icons/hi";
import NoConnnectionsSvg from "../UiComponents/NoConnnectionsSvg";
import ConnectionsCard from "./ConnectionsCard";
import PrimaryButton from "../UiComponents/PrimaryButton";
import SecondaryButtonLogo from "../UiComponents/SecondaryButtonLogo";
import { HiOutlineArrowDownTray, HiXMark } from "react-icons/hi2";
import useOutsideClick from "../Utils/useOutsideClick";
import { serverUrl } from "../../config";
import TertiaryButton from "../UiComponents/TertiaryButton";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils";
import * as XLSX from "xlsx";

export default function DataTable(props) {
  const router = useRouter();
  const navigate = (page) => {
    router.push(page);
  };
  const [isOpen, setIsOpen] = useState(false);
  const dropdownExportRef = useRef(null);
  const [data, setData] = useState(props.data);
  const [favdata, setFavData] = useState(props.favorites);
  const [newsortdata, setNewSortData] = useState(props.newsort);
  const [oldsortdata, setOldSortData] = useState(props.oldsort);
  const [currentsortdata, setCurrentSortData] = useState(props.currentsort);
  const [threesortdata, setThreeSortData] = useState(props.threesort);
  const [selected, setSelected] = useState([]);
  const profile = props.userName;
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("namex");
  // const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdownDate, setOpenDropdownDate] = useState(false);
  const [sortStarReview, setSortFavourites] = useState(0);
  const [sortDateReview, setSortDateReview] = useState(0);
  const [FavouritesLabel, setFavouritesLabel] = useState("All");
  const [DateLabel, setDateLabel] = useState("All");
  const [dummyState, setDummyState] = useState(0);
  const [openMobileDropdownDate, setOpenMobileDropdownDate] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(false);

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const response = await fetch(
        `${serverUrl}/connect/connect/${profile}`,
        config
      );
      if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      //console.log(error);
      navigate("/login");
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${serverUrl}/connect/favorites/${profile}`);
      const result = await response.json();
      setFavData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchnewsort = async () => {
    try {
      const response = await fetch(`${serverUrl}/connect/sortdata/${profile}`);
      const result = await response.json();
      setNewSortData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchnoldsort = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/connect/oldsortdata/${profile}`
      );
      const result = await response.json();
      setOldSortData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchcurrentsort = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/connect/currentmonth/${profile}`
      );
      const result = await response.json();
      setCurrentSortData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchthreesort = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/connect/last-three-months-data/${profile}`
      );
      const result = await response.json();
      setThreeSortData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch data from backend API and set it to the state
    fetchData();
    fetchFavorites();
    fetchnewsort();
    fetchnoldsort();
    fetchcurrentsort();
    fetchthreesort();
  }, [dummyState]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setData(sortData(data, property, isAsc ? "desc" : "asc"));
  };

  const sortData = (data, property, order) => {
    return data.sort((a, b) => {
      if (a[property] < b[property]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleExport = () => {
    let selectedData = [];
    if (selected.length === data.length) {
      selectedData = data;
    } else {
      selectedData = data.filter((d) => isSelected(d._id));
    }

    const vCards = selectedData.map((d) => {
      return `BEGIN:VCARD\nVERSION:3.0\nN:${d.name}\nTEL:${d.phone}\nEMAIL:${d.email}\nEND:VCARD`;
    });

    const combinedVCards = vCards.join("\n") + "\n";
    const blob = new Blob([combinedVCards], {
      type: "text/vcard;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.style.display = "none";
    document.body.appendChild(element);

    element.setAttribute("href", url);
    element.setAttribute("download", "contacts.vcf");
    element.click();

    document.body.removeChild(element);
    setIsOpen(false)
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
    setSelected([]);
    await Promise.all(deletePromises);
    setDummyState((prevState) => prevState + 1);
  };

  const handleExportAsExcel = () => {
    // Get selected data
    let selectedData = [];
    if (selected.length === data.length) {
      selectedData = data;
    } else {
      selectedData = data.filter((d) => isSelected(d._id));
    }
    // Prepare data for Excel format
    const excelData = selectedData.map((d) => ({
      Name: d.name,
      Phone: d.phone,
      Email: d.email,
      Message: d.message,
      Date: d.date,
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    // Generate the Excel file
    const date = new Date().toISOString().split("T")[0];
    const fileName = `contacts_${date}.xlsx`;

    // Create and download the file
    XLSX.writeFile(workbook, fileName);
    setIsOpen(false)
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n._id);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleSelect = (id) => {
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
  };

  useEffect(() => {
    if (sortStarReview === 0) setFavouritesLabel("All");
    else if (sortStarReview === 5) setFavouritesLabel("Favourites");
    else if (sortStarReview === 4) setFavouritesLabel("New first");
    else if (sortStarReview === 3) setFavouritesLabel("Old first");

    if (sortDateReview === 0) setDateLabel("All");
    else if (sortDateReview === 1) setDateLabel("This month");
    else if (sortDateReview === 2) setDateLabel("Last month");
    else if (sortDateReview === 3) setDateLabel("Last 3 month");
    else if (sortDateReview === 4) setDateLabel("Last 6 month");
    else if (sortDateReview === 5) setDateLabel("Last year");

    setDummyState((prev) => prev + 1);
  }, [sortStarReview, sortDateReview]);

  // dropdown close on outside click
  const dropdownRef = useRef(null);
  const dropdowndateRef = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdowndateRef2 = useRef(null);
  useOutsideClick(dropdownRef, () => setOpenDropdown(false));
  useOutsideClick(dropdowndateRef, () => setOpenDropdownDate(false));
  useOutsideClick(dropdownRef2, () => setOpenMobileDropdown(false));
  useOutsideClick(dropdowndateRef2, () => setOpenMobileDropdownDate(false));

  return (
    <div className="flex h-screen w-full first-container bg-white md:bg-[#FAFAFA]">
      <div className="h-full">
        <SideBar />
      </div>
      <div className="w-full overflow-auto">
        <NavBar text={"Connections"} number={data.length} />

        <div className="conn_container relative">
          <div className="text-[#817C7C] text-base mb-4 font-semibold md:font-medium hidden sm:block">
            Check and filter all your connections here.
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center sm:justify-between">
            <div className="hidden md:flex flex-row items-center gap-2">
              <div className="text-[#1A1A1A] text-lg md:text-xl font-medium md:font-semibold">
                Connections
              </div>
              {data.length !== 0 && (
                <div className="review_number">{data.length}</div>
              )}
            </div>
            <div className="text-[#817C7C] text-sm xsm:text-base font-semibold md:font-medium sm:hidden">
              Check and filter all your connections here.
            </div>
            {/* mobile screen filters */}
            <div className="block md:hidden">
              <div className="flex gap-3 sm:gap-6 relative">
                <div
                  className="dropDown hover:cursor-pointer"
                  ref={dropdownRef2}
                  onClick={() => {
                    setOpenMobileDropdown(!openMobileDropdown);
                    setOpenMobileDropdownDate(false);
                  }}
                >
                  <div className="text-[#817C7C] text-base min-w-fit">
                    {" "}
                    Sort by :
                  </div>
                  <div className="review_label">{FavouritesLabel}</div>
                  <span>
                    <HiOutlineChevronDown />
                  </span>

                  {openMobileDropdown && (
                    <>
                      <div className="block md:hidden">
                        <div
                          style={{
                            position: "fixed",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            backgroundColor: "#ffffff",
                            padding: "1.5rem",
                            boxShadow: "0px -3px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 1000,
                          }}
                          className="h-[370px] overflow-scroll "
                        >
                          <div className="flex w-full justify-between pb-4 border-b-2">
                            <div className="text-[16px] font-semibold">
                              Sort By:
                            </div>
                            <HiX
                              onClick={() => setOpenMobileDropdown(false)}
                              style={{ width: "20px", height: "20px" }}
                            />
                          </div>
                          <label
                            className="dropDown_label cursor-pointer mt-4"
                            onClick={() => {
                              setSortFavourites(0);
                              setOpenMobileDropdown(false);
                            }}
                          >
                            All
                          </label>
                          <br />
                          <label
                            className="dropDown_label cursor-pointer"
                            onClick={() => {
                              setSortFavourites(5);
                              setOpenMobileDropdown(false);
                            }}
                          >
                            Favourites
                          </label>
                          <br />
                          <label
                            className="dropDown_label cursor-pointer"
                            onClick={() => {
                              setSortFavourites(4);
                              setOpenMobileDropdown(false);
                            }}
                          >
                            New first
                          </label>
                          <br />
                          <label
                            className="dropDown_label cursor-pointer"
                            onClick={() => {
                              setSortFavourites(3);
                              setOpenMobileDropdown(false);
                            }}
                          >
                            Old first
                          </label>
                          <div className="mt-8 mb-32">
                            <PrimaryButton
                              icon={null}
                              width={"100%"}
                              text={"Apply"}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div
                  className="dropDown hover:cursor-pointer"
                  ref={dropdowndateRef2}
                  onClick={() => {
                    setOpenMobileDropdownDate(!openMobileDropdownDate);
                    setOpenMobileDropdown(false);
                  }}
                >
                  <div className="text-[#817C7C] text-sm md:text-base min-w-fit">
                    {" "}
                    Date :
                  </div>
                  <div className="text-sm md:text-base font-semibold px-2">
                    {DateLabel}
                  </div>
                  <span>
                    <HiOutlineChevronDown />
                  </span>
                  {openMobileDropdownDate && (
                    // <div className="dropDown_popup">
                    //   <div
                    //     onClick={() => {
                    //       setSortDateReview(0);
                    //       setOpenDropdownDate(false);
                    //     }}
                    //     className="dropDown_popup_item"
                    //   >
                    //     All
                    //   </div>
                    //   <div
                    //     onClick={() => {
                    //       setSortDateReview(1);
                    //       setOpenDropdownDate(false);
                    //     }}
                    //     className="dropDown_popup_item"
                    //   >
                    //     This month
                    //   </div>
                    //   <div
                    //     onClick={() => {
                    //       setSortDateReview(2);
                    //       setOpenDropdownDate(false);
                    //     }}
                    //     className="dropDown_popup_item"
                    //   >
                    //     Last month
                    //   </div>
                    //   <div
                    //     onClick={() => {
                    //       setSortDateReview(3);
                    //       setOpenDropdownDate(false);
                    //     }}
                    //     className="dropDown_popup_item"
                    //   >
                    //     Last 3 month
                    //   </div>
                    //   <div
                    //     onClick={() => {
                    //       setSortDateReview(4);
                    //       setOpenDropdownDate(false);
                    //     }}
                    //     className="dropDown_popup_item"
                    //   >
                    //     Last 6 month
                    //   </div>
                    //   <div
                    //     onClick={() => {
                    //       setSortDateReview(5);
                    //       setOpenDropdownDate(false);
                    //     }}
                    //     className="dropDown_popup_item"
                    //   >
                    //     One year
                    //   </div>
                    // </div>
                    <>
                      <div className="block md:hidden">
                        <div
                          style={{
                            position: "fixed",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            backgroundColor: "#ffffff",
                            padding: "1.5rem",
                            boxShadow: "0px -3px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 1000,
                          }}
                          className="h-[440px] overflow-scroll "
                        >
                          <div className="flex w-full justify-between pb-4 border-b-2">
                            <div className="text-[16px] font-semibold">
                              Date:
                            </div>
                            <HiX
                              onClick={() => setOpenMobileDropdownDate(false)}
                              style={{ width: "20px", height: "20px" }}
                            />
                          </div>
                          <label
                            className="dropDown_label cursor-pointer mt-4"
                            onClick={() => {
                              setSortDateReview(0);
                              setOpenMobileDropdownDate(false);
                            }}
                          >
                            All
                          </label>
                          <br />
                          <label
                            className="dropDown_label cursor-pointer"
                            onClick={() => {
                              setSortDateReview(1);
                              setOpenMobileDropdownDate(false);
                            }}
                          >
                            This month
                          </label>
                          <br />
                          <label
                            className="dropDown_label cursor-pointer"
                            onClick={() => {
                              setSortDateReview(2);
                              setOpenMobileDropdownDate(false);
                            }}
                          >
                            Last month
                          </label>
                          <br />
                          <label
                            className="dropDown_label cursor-pointer"
                            onClick={() => {
                              setSortDateReview(3);
                              setOpenMobileDropdownDate(false);
                            }}
                          >
                            Last 3 month
                          </label>
                          <br />
                          <label
                            className="dropDown_label cursor-pointer"
                            onClick={() => {
                              setSortDateReview(4);
                              setOpenMobileDropdownDate(false);
                            }}
                          >
                            Last 6 month
                          </label>
                          <br />
                          <label
                            className="dropDown_label cursor-pointer"
                            onClick={() => {
                              setSortDateReview(5);
                              setOpenMobileDropdownDate(false);
                            }}
                          >
                            Last year
                          </label>
                          <div className="mt-8 mb-32">
                            <PrimaryButton
                              icon={null}
                              width={"100%"}
                              text={"Apply"}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* mobile screen filters */}
            <div className="hidden md:flex flex-col gap-4 sm:flex-row sm:items-center">
              {selected.length > 0 && (
                <div className="relative inline-block" ref={dropdownExportRef}>
                  <TertiaryButton
                    onClick={() => setIsOpen(!isOpen)}
                    icon={<HiOutlineArrowDownTray />}
                    text="Export profile data"
                  />

                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu">
                        <button
                          onClick={handleExportAsExcel}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Export as Excel (.xlsx)
                        </button>
                        <button
                          onClick={handleExport}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Export as VCF (.vcf)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {selected.length > 0 && (
                <div>
                  {" "}
                  <TertiaryButton
                    onClick={handleDelete}
                    icon={<HiOutlineTrash />}
                    text="Delete Connection"
                  />{" "}
                </div>
              )}
              <div
                className="dropDown hover:cursor-pointer"
                ref={dropdownRef}
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                <div className="text-[#817C7C] text-base hidden lg:block min-w-fit">
                  {" "}
                  Sort by :
                </div>
                <div className="review_label">{FavouritesLabel}</div>
                <span>
                  <HiOutlineChevronDown />
                </span>

                {openDropdown && (
                  <div className="dropDown_popup">
                    <div
                      onClick={() => {
                        setSortFavourites(0);
                        setOpenDropdown(false);
                      }}
                      className="dropDown_popup_item"
                    >
                      All
                    </div>
                    <div
                      onClick={() => {
                        setSortFavourites(5);
                        setOpenDropdown(false);
                      }}
                      className="dropDown_popup_item"
                    >
                      Favourites
                    </div>
                    <div
                      onClick={() => {
                        setSortFavourites(4);
                        setOpenDropdown(false);
                      }}
                      className="dropDown_popup_item"
                    >
                      New first
                    </div>
                    <div
                      onClick={() => {
                        setSortFavourites(3);
                        setOpenDropdown(false);
                      }}
                      className="dropDown_popup_item"
                    >
                      Old first
                    </div>
                  </div>
                )}
              </div>
              <div
                className="dropDown hover:cursor-pointer"
                ref={dropdowndateRef}
                onClick={() => setOpenDropdownDate(!openDropdownDate)}
              >
                <div className="text-[#817C7C] text-sm md:text-base hidden xl:block min-w-fit">
                  {" "}
                  Date :
                </div>
                <div className="text-sm md:text-base font-semibold px-2">
                  {DateLabel}
                </div>
                <span>
                  <HiOutlineChevronDown />
                </span>
                {openDropdownDate && (
                  <div className="dropDown_popup ">
                    <div
                      onClick={() => {
                        setSortDateReview(0);
                        setOpenDropdownDate(false);
                      }}
                      className="dropDown_popup_item"
                    >
                      All
                    </div>
                    <div
                      onClick={() => {
                        setSortDateReview(1);
                        setOpenDropdownDate(false);
                      }}
                      className="dropDown_popup_item"
                    >
                      This month
                    </div>
                    <div
                      onClick={() => {
                        setSortDateReview(2);
                        setOpenDropdownDate(false);
                      }}
                      className="dropDown_popup_item"
                    >
                      Last month
                    </div>
                    <div
                      onClick={() => {
                        setSortDateReview(3);
                        setOpenDropdownDate(false);
                      }}
                      className="dropDown_popup_item"
                    >
                      Last 3 month
                    </div>
                    <div
                      onClick={() => {
                        setSortDateReview(4);
                        setOpenDropdownDate(false);
                      }}
                      className="dropDown_popup_item"
                    >
                      Last 6 month
                    </div>
                    <div
                      onClick={() => {
                        setSortDateReview(5);
                        setOpenDropdownDate(false);
                      }}
                      className="dropDown_popup_item"
                    >
                      One year
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {selected.length > 0 && (
            <div
              className="fixed left-0 bottom-0 flex gap-3 justify-between md:hidden px-5 py-3 w-full bg-white shadow-[0px_-4px_20px_1px_rgba(171,181,217,0.16)]"
              style={{ zIndex: "100" }}
            >
              <div className="w-full relative" ref={dropdownExportRef}>
                <PrimaryButton
                  onClick={() => setIsOpen(!isOpen)}
                  icon={<HiOutlineArrowDownTray />}
                  text="Export profile data"
                  width="100%"
                />

                {isOpen && (
                  <div className="absolute bottom-full mb-2 left-0 right-0 md:bottom-auto md:top-full md:mt-2 md:left-auto md:right-0 w-full md:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu">
                      <button
                        onClick={handleExportAsExcel}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Export as Excel (.xlsx)
                      </button>
                      <button
                        onClick={handleExport}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Export as VCF (.vcf)
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div
                onClick={handleDelete}
                className="!w-10 !h-10 flex items-center justify-center text-xl rounded-full bg-[#FAFAFA]"
              >
                <HiOutlineTrash />
              </div>
            </div>
          )}
        </div>

        {data.length === 0 ? (
          <div className="flex flex-col justify-center items-center mt-[7.25rem]">
            <div>
              <NoConnnectionsSvg />
              <div className="zeroConn_text">No connections to show yet.</div>
            </div>
          </div>
        ) : (
          <div className="conn_table">
            <div className="xl:flex items-center py-[0.75rem] hidden ">
              <div className=" w-[3rem] h-[3rem] flex items-center justify-center">
                <input
                  onChange={handleSelectAll}
                  checked={selected.length === data.length}
                  type="checkbox"
                  className="hover:cursor-pointer"
                />
              </div>
              <div className="conn_table_heading w-[21.25rem]">
                Profile Name & Email
              </div>
              <div className="conn_table_heading w-[164px]">Mobile Number</div>
              <div className="conn_table_heading w-[164px]">Date</div>
              <div className="conn_table_heading w-[164px]">Messages</div>
              <div className="conn_table_heading w-[164px]">Actions</div>
            </div>
            <div className="conn_table_container">
              {FavouritesLabel === "Favourites" ? (
                <>
                  {favdata.map((connection, index) => {
                    return (
                      <ConnectionsCard
                        handleSelect={handleSelect}
                        selectedd={selected}
                        connection={connection}
                        profile={profile}
                        setDummyState={setDummyState}
                        dummyState={dummyState}
                        key={index}
                      />
                    );
                  })}
                </>
              ) : FavouritesLabel === "New first" ? (
                <>
                  {oldsortdata.map((connection, index) => {
                    return (
                      <ConnectionsCard
                        handleSelect={handleSelect}
                        selectedd={selected}
                        connection={connection}
                        profile={profile}
                        setDummyState={setDummyState}
                        dummyState={dummyState}
                        key={index}
                      />
                    );
                  })}
                </>
              ) : FavouritesLabel === "Old first" ? (
                <>
                  {newsortdata.map((connection, index) => {
                    return (
                      <ConnectionsCard
                        handleSelect={handleSelect}
                        selectedd={selected}
                        connection={connection}
                        profile={profile}
                        setDummyState={setDummyState}
                        dummyState={dummyState}
                        key={index}
                      />
                    );
                  })}
                </>
              ) : DateLabel === "This month" ? (
                <>
                  {currentsortdata.map((connection, index) => {
                    return (
                      <ConnectionsCard
                        handleSelect={handleSelect}
                        selectedd={selected}
                        connection={connection}
                        profile={profile}
                        setDummyState={setDummyState}
                        dummyState={dummyState}
                        key={index}
                      />
                    );
                  })}
                </>
              ) : DateLabel === "Last 3 month" ? (
                <>
                  {currentsortdata.map((connection, index) => {
                    return (
                      <ConnectionsCard
                        handleSelect={handleSelect}
                        selectedd={selected}
                        connection={connection}
                        profile={profile}
                        setDummyState={setDummyState}
                        dummyState={dummyState}
                        key={index}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  {data.map((connection, index) => {
                    return (
                      <ConnectionsCard
                        handleSelect={handleSelect}
                        selectedd={selected}
                        connection={connection}
                        profile={profile}
                        setDummyState={setDummyState}
                        dummyState={dummyState}
                        key={index}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
