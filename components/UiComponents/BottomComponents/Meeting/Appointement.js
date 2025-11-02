"use client";
import React, { useState, useEffect, useRef } from "react";
import "./meeting.css";
import SideBar from "../../../navbar/SideBar";
import NavBar from "../../../navbar/NavBar";
import axios from "axios";
import { serverUrl } from "../../../../config";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import Toast from "../../Toast";
import Meet from "./Meet";
import { useRouter } from "next/navigation";
import PrimaryButton from "../../PrimaryButton";
import SecondaryButton from "../../SecondaryButton";
import { getCookie } from "@/components/utils";

function Appointement(props) {
  const dropdownRef = useRef(null);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [allMeeting, setAllMeeting] = useState(props.allMeeting);
  const [meeting, setmeeting] = useState(props.allMeeting);
  const [type, setType] = useState(""); 
  const [activeMonth, setActiveMonth] = useState(()=>{
    if(months.includes(props.searchParams.month)){
      return (months.indexOf(props.searchParams.month));
    }
    return new Date().getMonth();
  });
  const [activeYear, setActiveYear] = useState(()=>{
    if(props.searchParams.year){
      return (props.searchParams.year);
    }
    return new Date().getFullYear();
  });
  const profile = props.userName;
  const [monthToggle, setMonthToggle] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifyMeet, setModifyMeet] = useState({});

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastStyle = {
    bg: "black",
    color: "white",
    border: "1px solid white",
    fontFamily: "",
  };

  const activeFilterStyle = {
    padding: "4px 16px",
    borderBottom: "4px solid black",
    fontWeight: "bold",
  };
  const filterStyle = { padding: "8px 16px", border: "0", fontWeight: "normal" };
  const [appointmentFilter, setFilterArr] = useState([
    {
      text: "All",
      style: {
        padding: "4px 16px",
        borderBottom: "4px solid black",
        fontWeight: "bold",
      },
    },
    {
      text: "Pending",
      style: { padding: "8px 16px", border: "0", fontWeight: "normal" },
    },
    {
      text: "Confirmed",
      style: { padding: "8px 16px", border: "0", fontWeight: "normal" },
    },
    {
      text: "Cancelled",
      style: { padding: "8px 16px", border: "0", fontWeight: "normal" },
    },
  ]);
  const [activeFilter, setFilter] = useState(()=>{
    if(props.searchParams.filter && !isNaN(parseInt(props.searchParams.filter)) && parseInt(props.searchParams.filter) < 4){
      return (parseInt(props.searchParams.filter));
    }
    return 0;
  });

  const navigate = useRouter();
  const fetchProfile = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      let { data } = await axios.get(
        `${serverUrl}/profile/profile/${profile}`,
        config
      );
      data = data.filter((item) => item.shared === true);
      if (data.length > 0) setType(data[0]._id);
    } catch (error) {
      // console.log(error);
      navigate.push("/login");
    }
  };
  const updateMeeting = ()=>{
    switch (activeFilter) {
      case 0:
        setmeeting(allMeeting);
        break;
      case 1:
        setmeeting(allMeeting.filter((meet)=>(meet.pending == true)));
        break;
      case 2:
        setmeeting(allMeeting.filter((meet)=>(meet.confirmation == true)));
        break;
      case 3:
        setmeeting(allMeeting.filter((meet)=>(meet.cancel == true)));
        break;
      default:
        break;
    }
    let newfilter = [...appointmentFilter];
    
    newfilter[0].style = filterStyle;
    newfilter[1].style = filterStyle;
    newfilter[2].style = filterStyle;
    newfilter[3].style = filterStyle;
    newfilter[activeFilter].style = activeFilterStyle;
    setFilterArr(newfilter);
  }

  useEffect(() => {
    updateMeeting();
  }, [allMeeting,activeFilter]);

  useEffect(() => {
    fetchProfile();
    if (type !== "") getMonth();
  }, [type]);
  
  const getMonth = async (e) => {
    try {
      const res = await axios.get(
        `${serverUrl}/meeting/getmonth/${profile}/${activeMonth}/${activeYear}`
        );
        setAllMeeting(res.data);
      } catch (error) {
        //console.log(error);
      }
    };
    
    useEffect(() => {
      getMonth();
    }, [activeMonth]);

  const modifyBtn = async (id) => {
    const day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const newMeet = {
        mettingHeadline: modifyMeet.mettingHeadline,
        title: modifyMeet.title,
        message: modifyMeet.message,
        day: day[modifyMeet.start.getDay()],
        date: modifyMeet.start.toDateString().split(" ").slice(1).join(" "),
        timeFrom: modifyMeet.start.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        timeTo: modifyMeet.end.toLocaleString(
          "en-US",
          { hour: "numeric", minute: "numeric", hour12: true }
        ),
        time: modifyMeet.start.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        name: modifyMeet.name,
        email: modifyMeet.email,
        phone: modifyMeet.phone,
        pending: modifyMeet.pending,
        confirmation: modifyMeet.confirmation,
        cancel: modifyMeet.cancel,
        userEmail: modifyMeet.userEmail,
        start:modifyMeet.start,
        end:modifyMeet.end,
      };
    axios
      .post(`${serverUrl}/meeting/modify/${profile}/${id}`,{
        newMeet
    })
      .then((res) => {
        const newAllMeeting = allMeeting.map((item) => {
          if (item._id == id) {
            item = newMeet;
          }
          return item;
        });

        setAllMeeting(newAllMeeting);

        setToastMessage("Appointment Rescheduled");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setToastMessage("");
        }, 3000);
      })
      .catch((err) => {
        setToastMessage("Appointment Already Exists For Given Time Slot");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setToastMessage("");
        }, 3000);
      });
      setShowModifyModal(false);
  };

  const cancelBtn = async (id) => {
    axios.post(`${serverUrl}/meeting/cancel/${profile}/${id}`)
    .then((res)=>{
      const newAllMeeting = allMeeting.map((item) => {
        if (item._id == id) {
          item.cancel = true;
          item.pending = false;
          item.confirmation = false;
        }
        return item;
      });
      setAllMeeting(newAllMeeting);
    }).catch(err => console.log(err));
  };
  const confirmBtn = async (id) => {
    axios
      .post(`${serverUrl}/meeting/confirmation/${profile}/${id}`)
      .then((res) => {
        const newAllMeeting = allMeeting.map((item) => {
          if (item._id == id) {
            item.cancel = false;
            item.pending = false;
            item.confirmation = true;
          }
          return item;
        });
        setAllMeeting(newAllMeeting);

        setToastMessage("Appointment Confirmed");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setToastMessage("");
        }, 3000);
      })
      .catch((err) => {
        setToastMessage("Appointment Already Exists For Given Time Slot");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setToastMessage("");
        }, 3000);
      });
  };
  const delMetting = async (id) => {
    try {
      const res = await axios.delete(
        `${serverUrl}/meeting/delete/${profile}/${id}`
        );
      const newAllMeeting = allMeeting.filter((item) => (item._id != id));
      setAllMeeting(newAllMeeting);
    } catch (error) {
      //console.log(error);
    }
  };

  function toISOLocal(adate) {
    var localdt = new Date(adate - adate.getTimezoneOffset()*60000);
    return localdt.toISOString().slice(0, -1); 
}

  useEffect(() => {
    setTimeout(()=>{
      const meetElement = document.querySelector(`#ID${props.searchParams.meetId}`); 
      if(meetElement){
        meetElement.scrollIntoView({behavior:'smooth'});
      }
    },2000);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMonthToggle(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex h-screen w-full first-container">
        <div className="h-full">
          <SideBar />
        </div>
        <div className="w-full overflow-auto">
          <NavBar text={"Appointments"} />
          <div>
            <div className="font-normal text-gray-500 m-5">
              Check and filter all your appointments here.
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="meeting-class flex flex-row px-2 mx-3 my-2 text-lg font-normal ">
                {appointmentFilter.map((item, idx) => {
                  return (
                    <button
                      key={idx}
                      style={item.style}
                      onClick={() => setFilter(idx)}
                    >
                      {item.text}
                    </button>
                  );
                })}
              </div>
              <div
                ref={dropdownRef}
                className="flex flex-col relative px-6 py-1 mr-10 h-fit text-lg font-medium bg-white shadow-md shadow-gray justify-center items-center rounded-3xl cursor-pointer"
                onClick={() => {
                  setMonthToggle((prev) => !prev);
                }}
              >
                <div className="flex flex-row">
                  {months[activeMonth]}
                  <div className="bg-transparent flex items-center ml-3">
                    {monthToggle ? <HiChevronUp /> : <HiChevronDown />}
                  </div>
                </div>
                {monthToggle && (
                  <div className="absolute top-full right-0 w-full shadow-md shadow-gray font-medium flex flex-col p-2 mt-3 text-lg bg-white rounded-3xl">
                    {months.map((item, idx) => {
                      return (
                        <button
                          key={idx}
                          className="p-1 hover:font-bold hover:bg-gray-200 rounded-2xl"
                          onClick={(e) => {
                            setActiveMonth(idx);
                          }}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {meeting.length !== 0 ? (
              <div className="flex flex-row flex-wrap gap-[20px] md:gap-[40px] m-[1rem] sm:m-6 w-full pr-[2rem] sm:pr-[3rem] justify-start">
                {meeting.map((meet, i) => (
                  <Meet
                    key={meet._id}
                    Meet={meet}
                    confirmation={meet.confirmation}
                    cancel={meet.cancel}
                    delMetting={() => {
                      delMetting(meet._id);
                    }}
                    modifyBtn={() => {
                      setModifyMeet(JSON.parse(JSON.stringify(meet)));
                      setShowModifyModal(true);
                    }}
                    confirmBtn={() => {
                      confirmBtn(meet._id);
                    }}
                    cancelBtn={() => {
                      cancelBtn(meet._id);
                      setToastMessage("Appointment Cancelled!");
                      setShowToast(true);
                      setTimeout(() => {
                        setShowToast(false);
                        setToastMessage("");
                      }, 3000);
                    }}
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="flex flex-row flex-wrap w-fit m-auto justify-start">
                  <div className="flex flex-col justify-center items-center w-full mt-5">
                    <div>
                      <svg
                        width="307"
                        height="300"
                        viewBox="0 0 307 300"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_363_42563)">
                          <path
                            d="M194.781 67.4693H112.107C110.223 67.4716 108.416 68.2223 107.084 69.5567C105.752 70.8911 105.003 72.7004 105 74.5876V258.643L104.053 258.932L83.7715 265.154C82.8103 265.447 81.7721 265.347 80.8848 264.875C79.9975 264.402 79.3336 263.596 79.0389 262.634L18.7113 65.2436C18.4177 64.2808 18.5178 63.2406 18.9895 62.3516C19.4612 61.4627 20.266 60.7977 21.2269 60.5028L52.4804 50.9169L143.085 23.1365L174.338 13.5505C174.814 13.4039 175.314 13.3527 175.809 13.3998C176.305 13.4468 176.786 13.5913 177.226 13.8249C177.665 14.0586 178.054 14.3767 178.371 14.7612C178.688 15.1457 178.926 15.589 179.071 16.0657L194.492 66.5202L194.781 67.4693Z"
                            fill="#F3F3F3"
                          />
                          <path
                            d="M212.821 66.52L194.236 5.71073C193.927 4.69754 193.421 3.7553 192.749 2.93788C192.076 2.12045 191.249 1.44385 190.315 0.946731C189.381 0.449617 188.358 0.141729 187.305 0.0406737C186.252 -0.0603818 185.19 0.0473753 184.178 0.357776L140.238 13.8303L49.6381 41.6154L5.69771 55.0927C3.65648 55.7206 1.94732 57.1341 0.945402 59.0229C-0.0565149 60.9118 -0.269336 63.1216 0.353662 65.1675L63.8742 272.988C64.3803 274.64 65.4015 276.085 66.7879 277.113C68.1743 278.14 69.8529 278.696 71.5775 278.697C72.3757 278.698 73.1694 278.578 73.9319 278.341L104.053 269.107L105.001 268.812V267.821L104.053 268.11L73.6525 277.435C71.8507 277.985 69.9047 277.797 68.2412 276.912C66.5777 276.027 65.3327 274.517 64.7791 272.713L1.26346 64.8875C0.989198 63.9939 0.893612 63.0548 0.982168 62.1242C1.07072 61.1935 1.34168 60.2894 1.77953 59.4638C2.21738 58.6382 2.81352 57.9072 3.53381 57.3126C4.2541 56.7181 5.08439 56.2718 5.97714 55.9991L49.9175 42.5218L140.518 14.7415L184.458 1.26418C185.135 1.05718 185.839 0.951636 186.547 0.950975C188.067 0.954392 189.545 1.44506 190.766 2.35111C191.987 3.25716 192.886 4.53097 193.331 5.98598L211.831 66.52L212.125 67.4691H213.111L212.821 66.52Z"
                            fill="#817C7C"
                          />
                          <path
                            d="M58.1202 60.6579C57.2071 60.6573 56.3182 60.3635 55.584 59.8198C54.8498 59.276 54.3089 58.5109 54.0406 57.6366L47.9385 37.6713C47.7745 37.135 47.7176 36.5716 47.771 36.0133C47.8245 35.4549 47.9872 34.9126 48.2499 34.4173C48.5126 33.9219 48.8701 33.4833 49.3021 33.1264C49.734 32.7695 50.2319 32.5013 50.7673 32.3372L134.119 6.77599C135.2 6.44548 136.368 6.5582 137.366 7.08941C138.365 7.62063 139.112 8.52693 139.444 9.6094L145.546 29.5749C145.876 30.658 145.763 31.8279 145.233 32.828C144.703 33.828 143.798 34.5765 142.717 34.9092L59.3659 60.4705C58.9622 60.5945 58.5424 60.6577 58.1202 60.6579Z"
                            fill="#1A1A1A"
                          />
                          <path
                            d="M90.0854 21.3337C95.3183 21.3337 99.5604 17.0844 99.5604 11.8426C99.5604 6.60085 95.3183 2.35156 90.0854 2.35156C84.8525 2.35156 80.6104 6.60085 80.6104 11.8426C80.6104 17.0844 84.8525 21.3337 90.0854 21.3337Z"
                            fill="#1A1A1A"
                          />
                          <path
                            d="M90.0853 17.8521C93.399 17.8521 96.0852 15.1613 96.0852 11.8421C96.0852 8.52282 93.399 5.83203 90.0853 5.83203C86.7717 5.83203 84.0854 8.52282 84.0854 11.8421C84.0854 15.1613 86.7717 17.8521 90.0853 17.8521Z"
                            fill="white"
                          />
                          <path
                            d="M285.499 276.273H125.372C124.304 276.272 123.281 275.846 122.526 275.09C121.771 274.334 121.346 273.309 121.345 272.239V80.0454C121.346 78.976 121.771 77.9507 122.526 77.1945C123.281 76.4383 124.304 76.0129 125.372 76.0117H285.499C286.567 76.013 287.591 76.4383 288.346 77.1945C289.1 77.9507 289.525 78.976 289.526 80.0454V272.239C289.525 273.309 289.1 274.334 288.346 275.09C287.591 275.846 286.567 276.272 285.499 276.273Z"
                            fill="#F3F3F3"
                          />
                          <path
                            d="M211.831 66.5195H112.107C109.972 66.5226 107.925 67.3735 106.415 68.8858C104.905 70.398 104.056 72.4483 104.053 74.5869V268.11L105 267.82V74.5869C105.003 72.6997 105.752 70.8905 107.084 69.5561C108.416 68.2216 110.223 67.4709 112.107 67.4686H212.125L211.831 66.5195ZM298.764 66.5195H112.107C109.972 66.5226 107.925 67.3735 106.415 68.8858C104.905 70.398 104.056 72.4483 104.053 74.5869V291.932C104.056 294.071 104.905 296.121 106.415 297.633C107.925 299.146 109.972 299.997 112.107 300H298.764C300.899 299.997 302.946 299.146 304.456 297.633C305.966 296.121 306.815 294.071 306.818 291.932V74.5869C306.815 72.4483 305.966 70.398 304.456 68.8858C302.946 67.3735 300.899 66.5226 298.764 66.5195ZM305.871 291.932C305.868 293.819 305.119 295.629 303.787 296.963C302.455 298.298 300.648 299.048 298.764 299.051H112.107C110.223 299.048 108.416 298.298 107.084 296.963C105.752 295.629 105.003 293.819 105 291.932V74.5869C105.003 72.6997 105.752 70.8905 107.084 69.5561C108.416 68.2216 110.223 67.4709 112.107 67.4686H298.764C300.648 67.4709 302.455 68.2216 303.787 69.5561C305.119 70.8905 305.868 72.6997 305.871 74.5869V291.932Z"
                            fill="#817C7C"
                          />
                          <path
                            d="M249.021 87.4008H161.851C160.72 87.3995 159.636 86.9491 158.837 86.1485C158.038 85.3478 157.588 84.2622 157.587 83.1298V62.2495C157.588 61.1172 158.038 60.0316 158.837 59.2309C159.636 58.4302 160.72 57.9798 161.851 57.9785H249.021C250.151 57.9798 251.235 58.4302 252.034 59.2309C252.834 60.0316 253.283 61.1172 253.284 62.2495V83.1298C253.283 84.2622 252.834 85.3478 252.034 86.1485C251.235 86.9491 250.151 87.3995 249.021 87.4008Z"
                            fill="#1A1A1A"
                          />
                          <path
                            d="M205.435 59.402C210.668 59.402 214.91 55.1528 214.91 49.911C214.91 44.6692 210.668 40.4199 205.435 40.4199C200.203 40.4199 195.96 44.6692 195.96 49.911C195.96 55.1528 200.203 59.402 205.435 59.402Z"
                            fill="#1A1A1A"
                          />
                          <path
                            d="M205.435 55.6908C208.623 55.6908 211.207 53.1026 211.207 49.9098C211.207 46.7171 208.623 44.1289 205.435 44.1289C202.248 44.1289 199.664 46.7171 199.664 49.9098C199.664 53.1026 202.248 55.6908 205.435 55.6908Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_363_42563">
                            <rect width="306.818" height="300" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="font-bold mt-4 text-center">
                      <p className="font-bold mt-4">
                        Your appointment schedule is currently empty.
                      </p>
                      <p className="font-light mt-4">
                        If you haven't added any appointment slots to your Tapop
                        profile
                      </p>
                      <p className="font-light">
                        {" "}
                        yet. Get started by adding appointment slots now.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      {showModifyModal && (<>
        <div className="w-full h-full opacity-50 bg-black absolute z-30"></div>
        <div className="flex flex-col justify-center items-center absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-3 rounded-xl border border-black bg-gray-100 text-black z-50">
          <p className="text-lg font-bold">Modify Meeting</p>
          <div className="flex flex-col gap-2 p-2">
            <p>Enter Start Time: </p>
            <input type="datetime-local" value={toISOLocal(new Date(modifyMeet.start))} onChange={(e)=> setModifyMeet({...modifyMeet, start:new Date(e.target.value)})}/>
            <p>Enter End Time: </p>
            <input type="datetime-local" value={toISOLocal(new Date(modifyMeet.end))} onChange={(e)=> setModifyMeet({...modifyMeet, end:new Date(e.target.value)})}/>
          </div>
          <div className="flex items-center justify-around w-full">
            <PrimaryButton
              text="Save"
              onClick={(e)=>modifyBtn(modifyMeet._id)}
            />
            <SecondaryButton
              onClick={()=>setShowModifyModal(false)}
              text={"Cancel"}
            />
          </div>
        </div>
      </>
      )}
      </div>
      {showToast && (
        <div
          className="w-full flex justify-center items-center fixed bottom-10 left-0"
          style={{ zIndex: "999" }}
        >
          <Toast
            text={toastMessage}
            backgroundColor={toastStyle.bg}
            border={toastStyle.border}
            color={toastStyle.color}
            fontFamily={toastStyle.fontFamily}
          />
        </div>
      )}
    </>
  );
}

export default Appointement;
