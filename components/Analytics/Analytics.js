"use client";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import axios from "axios";
import SideBar from "../navbar/SideBar";
import NavBar from "../navbar/NavBar";
import React from "react";
import {
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Sector,
  PieChart,
  Pie,
  Cell,
  LineChart,
} from "recharts";
import ReactCountryFlag from "react-country-flag";
import PerformanceCards from "./PerformanceCards/PerformanceCards";
import { serverUrl } from "../../config";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineCalendar,
  HiOutlineTrendingDown,
} from "react-icons/hi";
import AnalyticArray from "./AnalyticArray";
import { UserContext } from "../Contexts/context";
import useOutsideClick from "../Utils/useOutsideClick";
import AnalyticEmpty from "./AnalyticEmpty";
import LeftRightScrollBtn from "../Utils/LeftRightScrollBtn";
import { getCookie, SafeLocalStorage } from "../utils";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const Analytics = (props) => {
  // analytics dropdown
  const {
    analyticsState,
    analyticsStateUpdate,
    analyticsDropdown,
    analyticsDropdownToggle,
    setAnalyticsDropdown,
  } = useContext(UserContext);
  const profile = props.userName;
  // //console.log("profile Data", profile )
  const [shared, setShared] = useState(props.shared);
  const [record, setRecord] = useState(props.data.record);
  const [pro, setPro] = useState(props.data.pro);
  const [starter, setStarter] = useState(props.data.starter);
  const [basic, setBasic] = useState(props.data.basic);
  const [hasAnalytics, setHasAnalytics] = useState(props.data.hasAnalytics);
  const [totalData, setTotalData] = useState(props.totalData);
  const [totalProfileViews, setTotalProfileViews] = useState(
    props.totalProfileViews
  );
  const [totalDownloads, setTotalDownloads] = useState(props.totalDownloads);
  // const [totalDeviceTaps, setTotalDeviceTaps] = useState(0);
  const [viewData, setViewData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [osData, setOSData] = useState([]);
  const [browserData, setBrowserData] = useState([]);
  const [firstHalfCountryData, setFirstHalfCountryData] = useState([]);
  const [secondHalfCountryData, setSecondHalfCountryData] = useState([]);
  const [firstHalfLinks, setFirstHalfLinks] = useState([]);
  const [secondHalfLinks, setSecondHalfLinks] = useState([]);
  const [firstHalfCustomLinks, setFirstHalfCustomLinks] = useState([]);
  const [secondHalfCustomLinks, setSecondHalfCustomLinks] = useState([]);
  const [firstHalfProductData, setFirstHalfProductData] = useState([]);
  const [secondHalfProductData, setSecondHalfProductData] = useState([]);
  const [firstHalfServiceData, setFirstHalfServiceData] = useState([]);
  const [secondHalfServiceData, setSecondHalfServiceData] = useState([]);
  const [firstHalfImageData, setFirstHalfImageData] = useState([]);
  const [secondHalfImageData, setSecondHalfImageData] = useState([]);
  const [firstHalfPdfData, setFirstHalfPdfData] = useState([]);
  const [secondHalfPdfData, setSecondHalfPdfData] = useState([]);
  const [firstHalfVideoData, setFirstHalfVideoData] = useState([]);
  const [secondHalfVideoData, setSecondHalfVideoData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const [Images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [currentLoaction, setCurrentLoaction] = useState(null);
  const [currentHalf, setCurrentHalf] = useState(null);
  // connection data for header
  const [connectionData, setConnectionData] = useState(props.connectionData);
  // get toggle states for dummy links data
  const [dummyLinksData, setDummyLinksData] = useState(props.dummyLinksData);
  const barGraphRef = useRef(null);

  const templateId = SafeLocalStorage.getItem("type")

  // accordian for profile
  const [expanded, setExpanded] = useState(false);
  const [accordingItems, setAccordingItems] = useState([]);
  const accordianRef = useRef(null);
  const handleAccordianChange = (e) => {
    const id = e.target.id;
    if (
      id !== "" &&
      id.split("-")[0] === "accordian" &&
      id !== "accordian-item-0"
    ) {
      const index = id.split("-")[2];
      setShared(accordingItems[index]._id);

      // swap the clicked item with the first item
      let tempArray = [...accordingItems];
      let temp = tempArray[0];
      tempArray[0] = tempArray[index];
      tempArray[index] = temp;
      setAccordingItems(tempArray);
    }
  };

  useOutsideClick(accordianRef, () => {
    setExpanded(false);
  });

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const onPieEnter2 = useCallback(
    (_, index) => {
      setActiveIndex2(index);
    },
    [setActiveIndex2]
  );

  const fetchConnectionData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const response = await fetch(
        `${serverUrl}/connect/connect/${profile}`,
        config
      );
      if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized");
      }
      const result = await response.json();
      setConnectionData(result);
    } catch (error) {
      //console.log(error);
    }
  };

  const fetchProfileData = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/device/infoall/${profile}`
      );
      let tempArray = [];
      data.profileShared.forEach((item) => {
        tempArray.push(item);
      });
      data.profileUnshared.forEach((item) => {
        tempArray.push(item);
      });
      if (tempArray.length !== 0) {
        setAccordingItems(tempArray);
        setShared(tempArray[0]._id);
      } else {
        setAccordingItems([]);
        setShared("");
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const res = await axios.get(
        `${serverUrl}/getUser/getUser/${profile}`,
        config
      );
      setRecord(res.data);
      setPro(res.data[0].pro);
      setStarter(res.data[0].starter);
      setBasic(res.data[0].basic);
      setHasAnalytics(res.data[0].hasAnalytics);
    } catch (error) {
      //console.log(error);
    }
  };

  const getTotalData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const { data } = await axios.get(
        `${serverUrl}/analytics/totalview/${profile}`,
        config
      );
      setTotalData(data);
    } catch (error) {
      //console.log(error);
    }
  };

  const locationData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const { data } = await axios.get(
        `${serverUrl}/analytics/${analyticsState}location/${shared}/${profile}`,
        config
      );
      if (data.length !== 0) {
        data.sort((a, b) => b.viewCount - a.viewCount);
        setFirstHalfCountryData(data.slice(0, (data.length + 1) / 2));
        setSecondHalfCountryData(data.slice((data.length + 1) / 2));
      } else {
        setFirstHalfCountryData(dummyCountryData);
        setSecondHalfCountryData([]);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const linksData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const { data } = await axios.get(
        `${serverUrl}/analytics/links/${analyticsState}/${shared}/${profile}?header=app`,
        config
      );
      if (data.length !== 0) {
        setFirstHalfLinks(data.slice(0, (data.length + 1) / 2));
        setSecondHalfLinks(data.slice((data.length + 1) / 2));
      } else {
        setFirstHalfLinks(
          dummyLinksData.slice(0, (dummyLinksData.length + 1) / 2)
        );
        setSecondHalfLinks(
          dummyLinksData.slice((dummyLinksData.length + 1) / 2)
        );
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const CustomlinksData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const { data } = await axios.get(
        `${serverUrl}/analytics/links/${analyticsState}/${shared}/${profile}?header=custom`,
        config
      );
      if (data.length !== 0) {
        setFirstHalfCustomLinks(data.slice(0, (data.length + 1) / 2));
        setSecondHalfCustomLinks(data.slice((data.length + 1) / 2));
      } 
    } catch (error) {
      //console.log(error);
    }
  };
  const ProductsData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const { data } = await axios.get(
        `${serverUrl}/analytics/links/${analyticsState}/${shared}/${profile}?header=product`,
        config
      );
      if (data.length !== 0) {
        setFirstHalfProductData(data.slice(0, (data.length + 1) / 2));
        setSecondHalfProductData(data.slice((data.length + 1) / 2));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ServicesData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const { data } = await axios.get(
        `${serverUrl}/analytics/links/${analyticsState}/${shared}/${profile}?header=service`,
        config
      );
      if (data.length !== 0) {
        setFirstHalfServiceData(data.slice(0, (data.length + 1) / 2));
        setSecondHalfServiceData(data.slice((data.length + 1) / 2));
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const ImagesData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const { data } = await axios.get(
        `${serverUrl}/analytics/links/${analyticsState}/${shared}/${profile}?header=img`,
        config
      );
      if (data.length !== 0) {
        setFirstHalfImageData(data.slice(0, (data.length + 1) / 2));
        setSecondHalfImageData(data.slice((data.length + 1) / 2));
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const PdfData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const { data } = await axios.get(
        `${serverUrl}/analytics/links/${analyticsState}/${shared}/${profile}?header=pdf`,
        config
      );
      if (data.length !== 0) {
        setFirstHalfPdfData(data.slice(0, (data.length + 1) / 2));
        setSecondHalfPdfData(data.slice((data.length + 1) / 2));
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const VideoData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const { data } = await axios.get(
        `${serverUrl}/analytics/links/${analyticsState}/${shared}/${profile}?header=video`,
        config
      );
      if (data.length !== 0) {
        setFirstHalfVideoData(data.slice(0, (data.length + 1) / 2));
        setSecondHalfVideoData(data.slice((data.length + 1) / 2));
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const getUserData = async () => {
    
    try {
      const result = await axios.get(
        `${serverUrl}/getData/data/${templateId}/${profile}`
      );
      console.log(result);
      // Uncomment and use these setters as needed
      setImages(result.data.img);
      // setVideos(result.data.videos);
      // setApps(result.data.apps);
      // setProducts(result.data.products);
      // setServices(result.data.services);
      // setReviews(result.data.reviews);
      // setBusinessHours(result.data.businessHours);
      setPdfs(result.data.pfds);
      // setCustomLinks(result.data.customLinks);
      // setAvailability(result.data.availability);
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    }
  };

  // console.log(Images)
  // console.log(pdfs)

  // useEffect(()=>{
  //   let type = SafeLocalStorage.getItem("type")
  //   const data =async()=>{

  //     const result = await axios.get(
  //       `${serverUrl}/getData/data/${type}/${profile}`,
  //     );
  //   console.log(result)
  //   }
  //   data()
  // },[])

  const fetchreview = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const { data } = await axios.get(
        `${serverUrl}/record/record/${profile}/${shared}`,
        config
      );
      const array = [];
      data.forEach((item) => {
        array.push({ label: item.label, value: 0 });
      });
      setDummyLinksData(array);
    } catch (error) {
      //console.log(error);
    }
  };

  // alter total data according to filter with zero values for missing dates and update state
  const alterDataOnDurationChange = async (viewData, connectionData) => {
    // necessary dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let fromDate;
    if (analyticsState === "daily") {
      fromDate = today;
    } else if (analyticsState === "week") {
      let newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      newDate.setDate(newDate.getDate() - 6);
      fromDate = newDate;
    } else if (analyticsState === "month") {
      let newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      newDate.setDate(newDate.getDate() - 29);
      fromDate = newDate;
    } else if (analyticsState === "year") {
      let newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      newDate.setDate(newDate.getDate() - 365);
      fromDate = newDate;
    }

    let tempViewData = [];
    let tempDeviceData = [];
    let tempOSData = [];
    let tempBrowserData = [];

    let mobile, desktop, tablet;
    mobile = desktop = tablet = 0;
    let macOS, windows, otherOS;
    macOS = windows = otherOS = 0;
    let chrome, safari, microsoftEdge, otherBrowser;
    chrome = safari = microsoftEdge = otherBrowser = 0;

    for (
      let date = new Date(fromDate);
      date <= new Date(today);
      date.setDate(date.getDate() + 1)
    ) {
      // convert date from new Date() format to 11-9-2023
      const formattedDate = `${
        (date.getDate() < 10 ? "0" : "") + date.getDate()
      }-${
        (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1)
      }-${date.getFullYear()}`;
      const matchingValue = viewData.find(
        (item) => item.date === formattedDate
      );
      const matchingValueTemplate = viewData.find(
        (item) => item.date === formattedDate && item.type == shared
      );
      const matchingValueConnection = connectionData.filter(
        (item) => item.date === new Date(date).toLocaleDateString("en-GB")
      );
      if (
        analyticsState === "year" &&
        date.getDate() != 1 &&
        tempViewData.length != 0
      ) {
        if (matchingValue || matchingValueConnection) {
          tempViewData[tempViewData.length - 1].viewCount += matchingValue
            ? matchingValue.viewCount
            : 0;
          tempViewData[tempViewData.length - 1].connections +=
            matchingValueConnection.length;
        }
      } else {
        if (matchingValue || matchingValueConnection) {
          tempViewData.push({
            date: formattedDate,
            viewCount: matchingValue ? matchingValue.viewCount : 0,
            connections: matchingValueConnection.length,
          });
        } else {
          tempViewData.push({
            date: formattedDate,
            viewCount: 0,
            connections: 0,
          });
        }
      }

      if (matchingValueTemplate) {
        if (matchingValueTemplate.mobile) {
          mobile += matchingValueTemplate.mobile;
        }
        if (matchingValueTemplate.desktop) {
          desktop += matchingValueTemplate.desktop;
        }
        if (matchingValueTemplate.tablet) {
          tablet += matchingValueTemplate.tablet;
        }
        if (matchingValueTemplate.macOS) {
          macOS += matchingValueTemplate.macOS;
        }
        if (matchingValueTemplate.windows) {
          windows += matchingValueTemplate.windows;
        }
        if (matchingValueTemplate.otherOS) {
          otherOS += matchingValueTemplate.otherOS;
        }
        if (matchingValueTemplate.chrome) {
          chrome += matchingValueTemplate.chrome;
        }
        if (matchingValueTemplate.safari) {
          safari += matchingValueTemplate.safari;
        }
        if (matchingValueTemplate.microsoftEdge) {
          microsoftEdge += matchingValueTemplate.microsoftEdge;
        }
        if (matchingValueTemplate.otherBrowser) {
          otherBrowser += matchingValueTemplate.otherBrowser;
        }
      }
    }
    tempDeviceData.push(
      { name: "Mobile", value: mobile },
      { name: "Desktop", value: desktop },
      { name: "Tablet", value: tablet }
    );
    tempOSData.push(
      { name: "MacOS", value: macOS },
      { name: "Windows", value: windows },
      { name: "Other", value: otherOS }
    );
    tempBrowserData.push(
      { name: "Chrome", value: chrome },
      { name: "Safari", value: safari },
      { name: "Microsoft Edge", value: microsoftEdge },
      { name: "Other", value: otherBrowser }
    );

    setViewData(tempViewData);
    setDeviceData(tempDeviceData);
    setOSData(tempOSData);
    setBrowserData(tempBrowserData);
  };

  // capitalize
  const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  // date formatter for graph '12 July'
  const dateformatter = (date) => {
    if (date === "Today") {
      return "Today";
    }
    const splitdate = date.split("-");
    const day = splitdate[1];
    const month = splitdate[0];
    const year = splitdate[2];
    const newDate = `${day}-${month}-${year}`;
    const reqDate = new Date(newDate);
    const monthName = reqDate.toLocaleString("default", { month: "short" });
    if (analyticsState === "year") return `${monthName} ${year}`;
    return `${reqDate.getDate()} ${monthName}`;
  };

  // custom tooltip for pie chart
  const PieChartTootip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="w-[144px] p-2 rounded bg-[#ffffffdf] backdrop-blur-sm flex flex-col gap-0.5 text-xs text-[#1A1A1A]"
          style={{ boxShadow: "0px 2px 8px rgba(171, 181, 217, 0.14)" }}
        >
          <div className="flex items-center gap-1">
            <span className="w-2 h-2">
              <svg width="8px" height="8px">
                <circle
                  cx={3.5}
                  cy={3.5}
                  r={2.5}
                  stroke={payload[0].payload.fill}
                  fill={payload[0].payload.fill}
                />
              </svg>
            </span>
            <span className="font-medium text-[#A7A7A7]">
              {payload[0].payload.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Profile Views</span>
            <span>{payload[0].payload.value}</span>
          </div>
          <div className="flex justify-between">
            <span>Clicks</span>
            <span>{payload[0].payload.payload.value}</span>
          </div>
        </div>
      );
    }
  };

  // customize tooltip for graph
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-2 rounded-lg bg-[#ffffff] w-[144px]"
          style={{ boxShadow: "0px 2px 8px rgba(171, 181, 217, 0.14)" }}
        >
          <p className="text-xs text-[#A7A7A7] font-medium mb-0.5">
            {dateformatter(label)}
          </p>
          <p className="flex justify-between mt-0.5 text-xs text-[#1A1A1A]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2">
                <svg width="8px" height="8px">
                  <circle
                    cx={3.5}
                    cy={3.5}
                    r={2.5}
                    stroke="#78D5F2"
                    fill="#78D5F2"
                  />
                </svg>
              </span>
              Profile views
            </span>
            <span>
              {payload[0] !== undefined
                ? payload[0].payload.viewCount !== undefined
                  ? payload[0].payload.viewCount
                  : "0"
                : "0"}
            </span>
          </p>
          <p className="flex justify-between mt-0.5 text-xs text-[#1A1A1A]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2">
                <svg width="8px" height="8px">
                  <circle
                    cx={3.5}
                    cy={3.5}
                    r={2.5}
                    stroke="#FEBEF0"
                    fill="#FEBEF0"
                  />
                </svg>
              </span>
              Connections
            </span>
            <span>
              {payload[0] !== undefined
                ? payload[0].payload.connections !== undefined
                  ? payload[0].payload.connections
                  : "0"
                : "0"}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // custom legend for graph
  const customLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex gap-8">
        {payload.map((entry, index) => (
          <div className="flex gap-2 items-center" key={index}>
            <span className="w-2 h-2 mt-[-1px]">
              <svg width="10px" height="10px" style={{}}>
                <circle
                  cx={4.5}
                  cy={4.5}
                  r={4}
                  stroke={entry.color}
                  fill={entry.color}
                />
              </svg>
            </span>
            <span className="text-xs text-[#1A1A1A]">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  //dummy data for top location
  const dummyCountryData = [
    { countryName: "India", countryCode: "IN", value: 2 },
  ];

  // dropdown close on outside click
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => {
    setAnalyticsDropdown(false);
  });

  //analytics dropdown
  const [cityDropdown, setCityDropdown] = useState(false);
  const CityDropdownToggle = () => {
    setCityDropdown((prev) => !prev);
  };

  const cityDropDownRef = useRef(null);
  useOutsideClick(cityDropDownRef, () => {
    setCityDropdown(false);
  });

  // get header data like total profile views, downloads, taps
  const getHeaderData = () => {
    let views = 0;
    let downloads = 0;
    // let taps = 0;
    totalData.forEach((data) => {
      if (data.viewCount) {
        views += data.viewCount;
      }
      if (data.profiledownloads) {
        downloads += data.profiledownloads;
      }
      // if (data.deviceTaps) {
      //   taps += data.deviceTaps;
      // }
    });
    setTotalProfileViews(views);
    setTotalDownloads(downloads);
    // setTotalDeviceTaps(taps);
  };

  useEffect(() => {
    if (shared !== "") {
      fetchreview();
      getTotalData();
    }
    getHeaderData();
    fetchConnectionData();
  }, [shared]);

  useEffect(() => {
    fetchProfileData();
    fetchData();
  }, []);

  // alter data on duration change
  useEffect(() => {
    getHeaderData();
    alterDataOnDurationChange(totalData, connectionData);
    if (shared !== "") {
      linksData();
      locationData();
      // CustomlinksData();
      // ProductsData();
      // ServicesData();
      // ImagesData();
      // PdfData();
      // VideoData()
    }
  }, [shared, totalData, analyticsState, connectionData]);
  
  useEffect(() => {
    if (profile) {
      getUserData();
    }
  }, [profile,analyticsState]);

  // graph width on screen size and number of bars
  const [graphWidth, setGraphWidth] = useState(1200);
  //colors for pie chart
  const deviceColors = ["#8978F2", "#78D5F2", "#FEBEF0"];
  const osColors = ["#78F2B8", "#F2D078", "#FFAEAE"];

  //width and center for pie chart on screen size
  const [chartWidth, setchartWidth] = useState(232);
  const [chartCenter, setchartCenter] = useState(110);
  const [chartInnerRadius, setchartInnerRadius] = useState(80);
  const [chartOuterRadius, setchartOuterRadius] = useState(110);

  useEffect(() => {
    if (window.innerWidth > 1200) {
      setGraphWidth(1200);
    } else {
      const numBars = viewData.length;
      const calculatedWidth = Math.max(400, numBars * 70);
      setGraphWidth(calculatedWidth);
    }
    setchartWidth(window.innerWidth > 340 ? 232 : 190);
    setchartCenter(window.innerWidth > 340 ? 110 : 90);
    setchartInnerRadius(window.innerWidth > 340 ? 80 : 55);
    setchartOuterRadius(window.innerWidth > 340 ? 110 : 80);
  }, [viewData]);

  // overflow scroll button style
  const scrollBtnStyle = {
    padding: "8px",
  };
  const leftScrollBtnPosition = {
    bottom: "40px",
    top: "auto",
    left: "8px",
  };
  const rightScrollBtnPosition = {
    bottom: "40px",
    top: "auto",
    right: "8px",
  };

  return (
    <div className="flex h-screen w-full first-container">
      <div className="h-full">
        <SideBar />
      </div>
      <div className="w-full overflow-auto">
        <NavBar text={"Analytics"} />

        <div className="m-5 md:m-6">
          <div>
            <div>
              <div className="analystics-grid gap-3 md:gap-4 mb-[52px] w-full">
                <AnalyticArray
                  basic={basic}
                  connection={connectionData.length}
                  profiledownloads={totalDownloads}
                  profileviews={totalProfileViews}
                  // devicetaps={totalDeviceTaps}
                />
              </div>
              <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between items-center mb-6">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold">
                    Profile Analytics
                  </h2>
                </div>
                <div className="dropdown-div relative">
                  <div
                    className="border-none outline-none text-sm font-medium appearance-none rounded-full w-[206px] hover:cursor-pointer"
                    onClick={analyticsDropdownToggle}
                    ref={dropdownRef}
                  >
                    <div className="flex justify-center items-center relative w-full h-12">
                      <div className="absolute left-[22px] top-[15.5px] bg-transparent">
                        <HiOutlineCalendar />
                      </div>
                      <div className="absolute bg-transparent top-[15.5px] right-[18px]">
                        {analyticsDropdown ? (
                          <HiChevronUp />
                        ) : (
                          <HiChevronDown />
                        )}
                      </div>
                      {analyticsState === "year"
                        ? "Last 12 Months"
                        : analyticsState === "month"
                        ? "Last 30 Days"
                        : analyticsState === "week"
                        ? "Last 7 Days"
                        : analyticsState === "daily"
                        ? "Today"
                        : null}
                    </div>
                    <div
                      className={`absolute dropdown-menu bg-white z-[2] !top-[55px] !right-[0px] w-full ${
                        analyticsDropdown ? "block" : "hidden"
                      }`}
                    >
                      <ul>
                        <li
                          onClick={() => {
                            analyticsStateUpdate("year");
                          }}
                        >
                          {" "}
                          Last 12 Months
                        </li>
                        <li
                          onClick={() => {
                            analyticsStateUpdate("month");
                          }}
                        >
                          {" "}
                          Last 30 Days
                        </li>
                        <li
                          onClick={() => {
                            analyticsStateUpdate("week");
                          }}
                        >
                          {" "}
                          Last 7 Days
                        </li>
                        <li
                          onClick={() => {
                            analyticsStateUpdate("daily");
                          }}
                        >
                          {" "}
                          Today
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Check for analystic data is empty or not  */}
              {hasAnalytics && shared !== "" ? (
                <>
                  {/* only visible to pro and starter user  */}
                  {basic === false && (
                    <>
                      {/* Bar Chart */}
                      <div
                        className="analytic-wrapper overflow-scroll max-w-full"
                        style={{ paddingInline: "0" }}
                        ref={barGraphRef}
                      >
                        <ResponsiveContainer height={300}>
                          <LineChart
                            width={graphWidth}
                            height={300}
                            data={viewData}
                          >
                            <CartesianGrid
                              strokeDasharray="3"
                              vertical={false}
                            />
                            <XAxis
                              dataKey="date"
                              stroke="0"
                              padding={{ left: 30, right: 30 }}
                              tickFormatter={dateformatter}
                              fontSize={12}
                            />
                            <YAxis stroke="0" fontSize={12} />
                            <Tooltip
                              content={CustomTooltip}
                              cursor={{ fill: "lightgrey" }}
                            />
                            <Legend
                              iconType="circle"
                              iconSize={10}
                              wrapperStyle={{
                                padding: "1rem 0 0 calc(2rem + 2vw)",
                                marginBottom: "0rem",
                              }}
                              align="left"
                              content={customLegend}
                            />
                            <Line
                              name="Profile views"
                              dataKey="viewCount"
                              stroke="#78D5F2"
                              type="monotone"
                              // maxBarSize={40}
                              activeDot={{ r: 8 }}
                              dot={0}
                              strokeWidth={2}
                            />
                            <Line
                              name="Connections"
                              dataKey="connections"
                              stroke="#FEBEF0"
                              type="monotone"
                              // maxBarSize={40}
                              activeDot={{ r: 8 }}
                              dot={0}
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      {/* Left Right Scroll Button */}
                      <div className="relative z-50">
                        <LeftRightScrollBtn
                          refrence={barGraphRef}
                          style={scrollBtnStyle}
                          leftPosition={leftScrollBtnPosition}
                          rightPosition={rightScrollBtnPosition}
                        />
                      </div>

                      {accordingItems.length > 1 && (
                        <div
                          className="w-full text-[#1A1A1A] text-center text-sm font-semibold shadow-[0px_4px_20px_1px_rgba(171,181,217,0.16)] bg-white border-t border-[#F3F3F3] hover:cursor-pointer"
                          onClick={(e) => {
                            setExpanded(!expanded);
                            handleAccordianChange(e);
                          }}
                          ref={accordianRef}
                        >
                          <div
                            className="flex justify-center py-2.5"
                            id="accordian-item-0"
                          >
                            <span className="text-[#817C7C]">
                              PROFILE: &nbsp;
                            </span>
                            <span>
                              {accordingItems.length !== 0 &&
                                accordingItems[0].type}
                            </span>
                            <span
                              className={`text-xl ms-2 ${
                                expanded ? "rotate-180" : "rotate-0"
                              } transition-all duration-300`}
                            >
                              <HiChevronDown />
                            </span>
                          </div>
                          <div
                            className={`overflow-hidden transition-all ease-in-out duration-300 ${
                              expanded ? "max-h-96" : "max-h-0"
                            } flex flex-col`}
                          >
                            {accordingItems.slice(1).map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="w-full py-2.5 hover:bg-[#e3e3e3]"
                                  id={`accordian-item-${index + 1}`}
                                >
                                  {item.type}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Performance Card  */}
                      <div className="flex flex-col min-[1200px]:flex-row justify-between gap-6 mb-6 mt-6">
                        {[firstHalfLinks, secondHalfLinks]
                          .flat()
                          .sort((a, b) => b.value - a.value)
                          .slice(0, 1)
                          .map((linkdata, index) => (
                            <PerformanceCards
                              key={index}
                              text={linkdata.label}
                              visits={linkdata.value}
                            />
                          ))}
                        {[firstHalfLinks, secondHalfLinks]
                          .flat()
                          .sort((a, b) => a.value - b.value)
                          .slice(0, 1)
                          .map((linkdata, index) => (
                            <PerformanceCards
                              key={index}
                              icon={<HiOutlineTrendingDown />}
                              iconColor="#CF2828"
                              color="#FFE2E2"
                              performance="Lowest"
                              percent={-1}
                              text={linkdata.label}
                              visits={linkdata.value}
                            />
                          ))}
                      </div>

                      {/* Profile Link Performances */}
                      {firstHalfLinks.length !== 0 && (
                        <div
                          className="analytic-wrapper"
                          style={{ paddingBottom: "32px" }}
                        >
                          <h2 className="analytic-heading">
                            Profile Link Performance
                          </h2>
                          <div className="flex flex-col min-[1050px]:flex-row min-[1050px]:gap-16">
                            {[firstHalfLinks, secondHalfLinks].map(
                              (links, index) => (
                                // <>
                                <div
                                  className="flex-1 flex flex-col"
                                  key={index}
                                >
                                  {(links.length !== 0 || index === 0) && (
                                    <div
                                      className={`${
                                        index === 1 ? "hidden" : "flex"
                                      }  md:flex justify-between text-[#817C7C] pb-2`}
                                    >
                                      <span>LINKS</span>
                                      <span>NO. OF CLICKS</span>
                                    </div>
                                  )}
                                  {(links.length !== 0 ? links : []).map(
                                    (linkdata, index) => (
                                      <div
                                        key={index}
                                        className={`flex justify-between py-4 ${
                                          index + 1 !== links.length
                                            ? "border-b"
                                            : ""
                                        } border-[#F3F3F3] gap-3`}
                                      >
                                        <span>
                                          {capitalize(linkdata.label)}
                                        </span>
                                        <span>{linkdata.value}</span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )
                            )}
                            {/* {secondHalfLinks !== 0 && index === 0 ? (
                                <div className="hidden min-[1050px]:block w-0 min-h-full border border-[#F3F3F3]" />
                              ) : (
                                ""
                              )}
                            </> */}
                          </div>
                        </div>
                      )}
                      {/* Profile Link Performances */}
                      {firstHalfCustomLinks.length !== 0 && (
                        
                        <div
                          className="analytic-wrapper"
                          style={{ paddingBottom: "32px" }}
                        >
                          {/* {console.log("cus",firstHalfCustomLinks)} */}
                          <h2 className="analytic-heading">
                            Profile Custom Link Performance
                          </h2>
                          <div className="flex flex-col min-[1050px]:flex-row min-[1050px]:gap-16">
                            {[firstHalfCustomLinks, secondHalfCustomLinks].map(
                              (links, index) => (
                                // <>
                                <div
                                  className="flex-1 flex flex-col"
                                  key={index}
                                >
                                  {(links.length !== 0 || index === 0) && (
                                    <div
                                      className={`${
                                        index === 1 ? "hidden" : "flex"
                                      }  md:flex justify-between text-[#817C7C] pb-2`}
                                    >
                                      <span>LINKS</span>
                                      <span>NO. OF CLICKS</span>
                                    </div>
                                  )}
                                  {(links.length !== 0 ? links : []).map(
                                    (linkdata, index) => (
                                      <div
                                        key={index}
                                        className={`flex justify-between py-4 ${
                                          index + 1 !== links.length
                                            ? "border-b"
                                            : ""
                                        } border-[#F3F3F3] gap-3`}
                                      >
                                        <span>
                                          {capitalize(linkdata.label)}
                                        </span>
                                        <span>{linkdata.value}</span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Products  Performances */}

                      {firstHalfProductData.length !== 0 && (
                        <div
                          className="analytic-wrapper"
                          style={{ paddingBottom: "32px" }}
                        >
                          <h2 className="analytic-heading">
                            Product Performance
                          </h2>
                          <div className="flex flex-col min-[1050px]:flex-row min-[1050px]:gap-16">
                            {[firstHalfProductData, secondHalfProductData].map(
                              (links, index) => (
                                // <>
                                <div
                                  className="flex-1 flex flex-col"
                                  key={index}
                                >
                                  {(links.length !== 0 || index === 0) && (
                                    <div
                                      className={`${
                                        index === 1 ? "hidden" : "flex"
                                      }  md:flex justify-between text-[#817C7C] pb-2`}
                                    >
                                      <span>PRODUCTS</span>
                                      <span>NO. OF CLICKS</span>
                                    </div>
                                  )}
                                  {(links.length !== 0 ? links : []).map(
                                    (linkdata, index) => (
                                      <div
                                        key={index}
                                        className={`flex justify-between py-4 ${
                                          index + 1 !== links.length
                                            ? "border-b"
                                            : ""
                                        } border-[#F3F3F3] gap-3`}
                                      >
                                        <span>
                                          {capitalize(linkdata.label)}
                                        </span>
                                        <span>{linkdata.value}</span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Service Performance */}

                      {firstHalfServiceData.length !== 0 && (
                        <div
                          className="analytic-wrapper"
                          style={{ paddingBottom: "32px" }}
                        >
                          <h2 className="analytic-heading">
                            Service Performance
                          </h2>
                          <div className="flex flex-col min-[1050px]:flex-row min-[1050px]:gap-16">
                            {[firstHalfServiceData, secondHalfServiceData].map(
                              (links, index) => (
                                // <>
                                <div
                                  className="flex-1 flex flex-col"
                                  key={index}
                                >
                                  {(links.length !== 0 || index === 0) && (
                                    <div
                                      className={`${
                                        index === 1 ? "hidden" : "flex"
                                      }  md:flex justify-between text-[#817C7C] pb-2`}
                                    >
                                      <span>SERVICES</span>
                                      <span>NO. OF CLICKS</span>
                                    </div>
                                  )}
                                  {(links.length !== 0 ? links : []).map(
                                    (linkdata, index) => (
                                      <div
                                        key={index}
                                        className={`flex justify-between py-4 ${
                                          index + 1 !== links.length
                                            ? "border-b"
                                            : ""
                                        } border-[#F3F3F3] gap-3`}
                                      >
                                        <span>
                                          {capitalize(linkdata.label)}
                                        </span>
                                        <span>{linkdata.value}</span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                      {/* image */}
                      {firstHalfImageData.length !== 0 && templateId&&(
                        <div
                          className="analytic-wrapper"
                          style={{ paddingBottom: "32px" }}
                        >
                          <h2 className="analytic-heading">
                            Images Performance
                          </h2>
                          <div className="flex flex-col min-[1050px]:flex-row min-[1050px]:gap-16">
                            {[firstHalfImageData, secondHalfImageData].map(
                              (links, index) => (
                                // <>
                                <div
                                  className="flex-1 flex flex-col"
                                  key={index}
                                >
                                  {(links.length !== 0 || index === 0) && (
                                    <div
                                      className={`${
                                        index === 1 ? "hidden" : "flex"
                                      }  md:flex justify-between text-[#817C7C] pb-2`}
                                    >
                                      <span>Image</span>
                                      <span>NO. OF CLICKS</span>
                                    </div>
                                  )}
                                  {(links.length !== 0 ? links : []).map(
                                    (linkdata, index) => (
                                      <div
                                        key={index}
                                        className={`flex justify-between py-4 ${
                                          index + 1 !== links.length
                                            ? "border-b"
                                            : ""
                                        } border-[#F3F3F3] gap-3`}
                                      >
                                        <span>
                                          {Images.map((item, index) => {
                                            return (
                                              <div key={item._id}>
                                                {item._id ===
                                                  linkdata.label && (
                                                  <img
                                                    className="w-10 h-10"
                                                    src={item.image}
                                                  />
                                                )}
                                              </div>
                                            );
                                          })}
                                          {/* {capitalize(linkdata.label)} */}
                                        </span>
                                        <span>{linkdata.value}</span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                      {/* PDF Data  */}
                      {firstHalfPdfData.length !== 0 && templateId &&  (
                        <div
                          className="analytic-wrapper"
                          style={{ paddingBottom: "32px" }}
                        >
                          <h2 className="analytic-heading">PDF Performance</h2>
                          <div className="flex flex-col min-[1050px]:flex-row min-[1050px]:gap-16">
                            {[firstHalfPdfData, secondHalfPdfData].map(
                              (links, index) => (
                                // <>
                                <div
                                  className="flex-1 flex flex-col"
                                  key={index}
                                >
                                  {(links.length !== 0 || index === 0) && (
                                    <div
                                      className={`${
                                        index === 1 ? "hidden" : "flex"
                                      }  md:flex justify-between text-[#817C7C] pb-2`}
                                    >
                                      <span>Pdf</span>
                                      <span>NO. OF CLICKS</span>
                                    </div>
                                  )}
                                  {(links.length !== 0 ? links : []).map(
                                    (linkdata, index) => (
                                      <div
                                        key={index}
                                        className={`flex justify-between py-4 ${
                                          index + 1 !== links.length
                                            ? "border-b"
                                            : ""
                                        } border-[#F3F3F3] gap-3`}
                                      >
                                        <span>
                                          {pdfs.map((item, index) => {
                                            return (
                                              <div key={item._id}>
                                                {item._id ===
                                                  linkdata.label && (
                                                  <span>
                                                    {item.pdfname &&
                                                    item.pdfname.length >= 14
                                                      ? item.pdfname.slice(
                                                          0,
                                                          14
                                                        ) + "..."
                                                      : item.pdfname}
                                                  </span>
                                                )}
                                              </div>
                                            );
                                          })}
                                          {/* {capitalize(linkdata.label)} */}
                                        </span>
                                        <span>{linkdata.value}</span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                      {/* Video Data  */}
                      {firstHalfVideoData.length !== 0 && (
                        <div
                          className="analytic-wrapper"
                          style={{ paddingBottom: "32px" }}
                        >
                          <h2 className="analytic-heading">Video Performance</h2>
                          <div className="flex flex-col min-[1050px]:flex-row min-[1050px]:gap-16">
                            {[firstHalfVideoData, secondHalfVideoData].map(
                              (links, index) => (
                                // <>
                                <div
                                  className={`flex-1 flex flex-col ${links.value ==0 && "hidden"} `}
                                  key={index}
                                >
                                  {(links.length !== 0 || index === 0) && (
                                    <div
                                      className={`${
                                        index === 1 ? "hidden" : "flex"
                                      }  md:flex justify-between text-[#817C7C] pb-2`}
                                    >
                                      <span>Video</span>
                                      <span>NO. OF CLICKS</span>
                                    </div>
                                  )}
                                  {(links.length !== 0 ? links : []).map(
                                    (linkdata, index) => (
                                      <div
                                        key={index}
                                        className={`flex justify-between py-4 ${
                                          index + 1 !== links.length
                                            ? "border-b"
                                            : ""
                                        } border-[#F3F3F3] gap-3`}
                                      >
                                        <span>
                                          {capitalize(linkdata.label)}
                                        </span>
                                        <span>{linkdata.value}</span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Top Locations */}
                  <div
                    className="analytic-wrapper"
                    style={{ paddingBottom: "28px" }}
                  >
                    <div>
                      <h2
                        className="analytic-heading"
                        style={{ marginBottom: "24px" }}
                      >
                        Top Location
                      </h2>
                      <div className="flex flex-col min-[1050px]:flex-row min-[1050px]:gap-16">
                        {[firstHalfCountryData, secondHalfCountryData].map(
                          (mapcountry, index0) => (
                            // <>

                            <div className="flex-1 flex flex-col" key={index0}>
                            
                              {(mapcountry.length !== 0 ? mapcountry : []).map(
                                (loc, index) => (
                                  <div
                                    key={index}
                                    className={`flex py-3 ${
                                      index + 1 !== mapcountry.length
                                        ? "border-b"
                                        : ""
                                    } border-[#F3F3F3] gap-3 ${
                                      index0 === 1 && index === 0
                                        ? "border-t md:border-none"
                                        : ""
                                    }`}
                                  >
                                    <div className="w-6 h-4 md:mt-1">
                                      <ReactCountryFlag
                                        countryCode={loc.countryCode}
                                        svg
                                        style={{
                                          width: "2em",
                                          height: "2em",
                                        }}
                                        title={loc.countryName}
                                      />
                                    </div>
                                    <div className="flex">
                                      <div className="flex flex-col text-sm sm:text-base">
                                        <span className="text-[#1A1A1A] font-medium">
                                          {loc.countryName}
                                        </span>
                                        <span className="text-[#817C7C] flex [@media(max-width:380px)]:flex-col [@media(min-width:381px)]:gap-3">
                                          <span>
                                            Profile views :{" "}
                                            {loc.viewCount ? loc.viewCount : 0}{" "}
                                          </span>
                                          <span className="[@media(max-width:380px)]:hidden">
                                            &#x2022;
                                          </span>
                                          <span>
                                            Clicks :{" "}
                                            {loc.clickCount
                                              ? loc.clickCount
                                              : 0}
                                          </span>
                                        </span>
                                      </div>
                                      {/* <div className="dropdown-div relative">
                                        <div className="border-none outline-none text-sm font-medium appearance-none rounded-full hover:cursor-pointer w-[50px] ">
                                          <div className="flex justify-center items-center relative w-full h-12">
                                            <div
                                              className="absolute bg-transparent top-[15.5px] right-[18px]"
                                              onClick={() => {
                                                CityDropdownToggle();
                                                setCurrentLoaction(index);
                                                setCurrentHalf(index0);
                                              }}
                                              // ref={cityDropDownRef}
                                            >
                                              {(cityDropdown && currentHalf == index0 && currentLoaction == index) ? (
                                                <HiChevronUp />
                                              ) : (
                                                <HiChevronDown />
                                              )}
                                            </div>
                                          </div>
                                          {cityDropdown && currentHalf == index0 && currentLoaction == index && (
                                            <div className="absolute dropdown-menu bg-white z-[2] !top-[55px] !right-[0px] w-full">
                                              <ul>
                                                {loc.cities &&
                                                  loc.cities.map(
                                                    (item, index) => {
                                                      return (
                                                        <li key={index} > {item.viewCount > 0 ? (item.city +" : "+ item.viewCount) : "No Cities have to display" } </li>
                                                      );
                                                    }
                                                  )}
                                              
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      </div> */}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )
                        )}
                        {/* {secondHalfCountryData !== 0 && index0 === 0 ? (
                            <div className="hidden min-[1050px]:block w-0 min-h-full border border-[#F3F3F3]" />
                          ) : (
                            ""
                            )}
                          </> */}
                      </div>
                    </div>
                  </div>

                  {/* Device Analytics & Operating Systems*/}
                  <div className="flex flex-col xl:flex-row md:gap-6">
                    {[deviceData, osData].map((obj, index) => (
                      <div className="analytic-wrapper flex-1" key={index}>
                        <h1
                          className="analytic-heading"
                          style={{ marginBottom: "30px" }}
                        >
                          {index === 0
                            ? "Device Analytics"
                            : "Operating Systems"}
                        </h1>
                        <div className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-10">
                          <div className="flex-1">
                            <div className="flex flex-col">
                              {obj.map((deviceOs, index1) => (
                                <div
                                  className="flex justify-between items-center py-4 border-b border-[#F3F3F3] text-sm sm:text-base"
                                  key={index1}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5">
                                      <svg width="10px" height="10px">
                                        <circle
                                          cx={4}
                                          cy={5}
                                          r={3.5}
                                          stroke={
                                            index === 0
                                              ? deviceColors[index1]
                                              : osColors[index1]
                                          }
                                          fill={
                                            index === 0
                                              ? deviceColors[index1]
                                              : osColors[index1]
                                          }
                                        />
                                      </svg>
                                    </span>
                                    {deviceOs.name}
                                  </div>
                                  <span className="font-semibold">
                                    {deviceOs.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="xl:flex-1.5 2xl:flex-1 flex justify-center overflow-hidden">
                            <div className="w-fit overflow-hidden">
                              <PieChart width={chartWidth} height={chartWidth}>
                                <Pie
                                  activeIndex={
                                    index === 0 ? activeIndex : activeIndex2
                                  }
                                  activeShape={
                                    index === 0
                                      ? renderActiveShape
                                      : renderActiveShape
                                  }
                                  data={index === 0 ? deviceData : osData}
                                  cy={chartCenter}
                                  cx={chartCenter}
                                  innerRadius={chartInnerRadius}
                                  outerRadius={chartOuterRadius}
                                  dataKey="value"
                                  onMouseEnter={
                                    index === 0 ? onPieEnter : onPieEnter2
                                  }
                                >
                                  {deviceData.map((entry, index2) => (
                                    <Cell
                                      key={index2}
                                      fill={
                                        index === 0
                                          ? deviceColors[index2]
                                          : osColors[index2]
                                      }
                                    />
                                  ))}
                                </Pie>
                                <Tooltip content={<PieChartTootip />} />
                              </PieChart>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Browser Analytics & Language Analytics*/}
                  <div className="flex md:gap-6 flex-col min-[992px]:flex-row">
                    <div className="analytic-wrapper flex-1">
                      <h1 className="analytic-heading">Browser Analytics</h1>
                      <div className="flex gap-10 items-center">
                        <div className="flex-1">
                          {browserData.length > 0 && (
                            <div className="flex flex-col text-sm sm:text-base">
                              <div className="flex justify-between text-[#817C7C] pb-2">
                                <span>BROWSER</span>
                                <span>NO. OF VISITS</span>
                              </div>
                              <div className="flex justify-between py-4 border-b border-[#F3F3F3]">
                                <span>Google Chrome</span>
                                <span className="font-semibold">
                                  {browserData[0].value}
                                </span>
                              </div>
                              <div className="flex justify-between py-4 border-b border-[#F3F3F3]">
                                <span>Safari</span>
                                <span className="font-semibold">
                                  {browserData[1].value}
                                </span>
                              </div>
                              <div className="flex justify-between py-4 border-b border-[#F3F3F3]">
                                <span>Microsoft Edge</span>
                                <span className="font-semibold">
                                  {browserData[2].value}
                                </span>
                              </div>
                              <div className="flex justify-between py-4">
                                <span>Other Browsers</span>
                                <span className="font-semibold">
                                  {browserData[3].value}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div className="analytic-wrapper flex-1">
                      <h1 className="analytic-heading">Language Analytics</h1>
                      <div className="flex gap-10 items-center">
                        <div className="flex-1">
                          <div className="flex flex-col text-sm sm:text-base">
                            <div className="flex justify-between text-[#817C7C] pb-2">
                              <span>LANGUAGE</span>
                              <span>NO. OF VISITS</span>
                            </div>
                            <div className="flex justify-between py-4 border-b border-[#F3F3F3]">
                              <span>English</span>
                              <span className="font-semibold">
                                200 (89%);
                              </span>
                            </div>
                            <div className="flex justify-between py-4">
                              <span>Hindi</span>
                              <span className="font-semibold">
                                77 (11%);
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </>
              ) : (
                <AnalyticEmpty />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
