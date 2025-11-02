"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { serverUrl } from "../../config";
import { useRouter } from "next/navigation";
import Preview from "../UiComponents/Preview";
import { SafeLocalStorage, getCookie } from "../utils";
import { UserContext } from "../Contexts/context";
import warning from "./assets/warning.png";
import Image from "next/image";

const getData = async (userName) => {
  try {
    let obj = { username: userName };
    const { data } = await axios.get(`${serverUrl}/device/infoall/${userName}`);
    if (data.user.length !== 0 && !data.user[0].blocked) {
      const { analyticsToggle } = axios.post(
        `${serverUrl}/tapopuser/toggle/analytics/${userName}`
      );
      let activeId = "";
      if (data.profileShared.length !== 0) {
        obj.leadCapture = data.profileShared[0].contactForm;
        obj.productSwitch = data.profileShared[0].productSwitch;
        obj.serviceSwitch = data.profileShared[0].serviceSwitch;
        obj.reviewSwitch = data.profileShared[0].reviewSwitch;
        obj.reviewButtonSwitch = data.profileShared[0].reviewButtonSwitch;
        obj.businessHoursSwitch = data.profileShared[0].businessHoursSwitch;
        obj.logoSwitch = data.profileShared[0].logoSwitch;
        obj.productLabel = data.profileShared[0].productLabel;
        obj.serviceLabel = data.profileShared[0].serviceLabel;
        obj.reviewLabel = data.profileShared[0].reviewLabel;
        obj.businessHoursLabel = data.profileShared[0].businessHoursLabel;
        obj.availabilitySwitch = data.profileShared[0].availabilitySwitch;
        obj.availabilityLabel = data.profileShared[0].availabilityLabel;
        obj.activeTemplate = data.profileShared[0].type;
        obj.templateId = data.profileShared[0]._id;

        activeId = data.profileShared[0]._id;

        const result = await axios.get(
          `${serverUrl}/getData/data/${activeId}/${userName}`
        );

        if (
          result.data.customTemplates[0] &&
          Object.keys(result.data.customTemplates[0]).length !== 0
        ) {
          obj.backgroundColor =
            result.data.customTemplates[0].customizedTemplate.backgroundColor;
          obj.buttonStyle =
            result.data.customTemplates[0].customizedTemplate.buttonStyle;
          obj.buttonColor =
            result.data.customTemplates[0].customizedTemplate.buttonColor;
          obj.color1 = result.data.customTemplates[0].customizedTemplate.color1;
          obj.color2 = result.data.customTemplates[0].customizedTemplate.color2;
          obj.bgImage =
            result.data.customTemplates[0].customizedTemplate.bgImage;
        }

        const appsObj = result.data.apps;
        const appsArr =
          appsObj !== undefined ? Object.values(appsObj).flat() : [];

        if (
          result.data.user.length === 0 &&
          result.data.img.length === 0 &&
          result.data.videos.length === 0 &&
          result.data.products.length === 0 &&
          result.data.services.length === 0 &&
          result.data.reviews.length === 0 &&
          result.data.businessHours.length === 0 &&
          result.data.pfds.length === 0 &&
          result.data.customLinks.length === 0 &&
          appsArr.length === 0
        ) {
          obj.dummyData = true;
        } else {
          obj.dummyData = false;
        }

        if (result.data.user.length !== 0) {
          obj.firstName = result.data.user[0].firstName;
          obj.lastName = result.data.user[0].lastName;
          obj.name =
            result.data.user[0].firstName + " " + result.data.user[0].lastName;
          obj.email = result.data.user[0].email;
          if (result.data.user[0].mobileNumber) {
            obj.mobileNumber =
              "+" +
              result.data.user[0].selectedCode +
              result.data.user[0].mobileNumber;
          }
          if (result.data.user[0].newmobileNumber) {
            obj.newMobileNumber =
              "+" +
              result.data.user[0].selectedCode2 +
              result.data.user[0].newmobileNumber;
          }
          obj.companyName = result.data.user[0].companyName;
          obj.description = result.data.user[0].description;
          obj.jobTitle = result.data.user[0].jobTitle;
          obj.pimage = result.data.user[0].profileimage;
        } else {
          obj.name = data.user[0].name;
          obj.firstName = data.user[0].firstName;
          obj.lastName = data.user[0].lastName;
        }
        if (result.data.img.length !== 0) {
          obj.images = result.data.img;
        }
        if (result.data.videos.length !== 0) {
          obj.videos = result.data.videos;
        }
        if (result.data.apps.length !== 0) {
          obj.apps = result.data.apps;
        }
        if (result.data.products.length !== 0) {
          obj.products = result.data.products;
        }
        if (result.data.services.length !== 0) {
          obj.services = result.data.services;
        }
        if (result.data.reviews.length !== 0) {
          obj.reviews = result.data.reviews;
        }
        if (result.data.businessHours.length !== 0) {
          obj.businessHours = result.data.businessHours;
        }
        if (result.data.availability.length !== 0) {
          obj.availability = result.data.availability;
        }
        if (result.data.pfds.length !== 0) {
          obj.pdfs = result.data.pfds;
        }
        if (result.data.customLinks.length !== 0) {
          obj.customLinks = result.data.customLinks;
        }

        if (data.profileShared[0].quickSelect === true) {
          obj.quickSelect = true;
          obj.redirectUrl = "";
          if (result.data.apps.social.length > 0) {
            obj.appLabel = result.data.apps.social[0].label;
            obj.redirectUrl =
              result.data.apps.social[0].link +
              result.data.apps.social[0].userName;
          }
          if (result.data.apps.music.length > 0) {
            obj.appLabel = result.data.apps.music[0].label;
            obj.redirectUrl =
              result.data.apps.music[0].link +
              result.data.apps.music[0].userName;
          }
          if (result.data.apps.blog.length > 0) {
            obj.appLabel = result.data.apps.blog[0].label;
            obj.redirectUrl =
              result.data.apps.blog[0].lin + result.data.apps.blog[0].userName;
          }
          if (result.data.apps.payment.length > 0) {
            obj.appLabel = result.data.apps.payment[0].label;
            obj.redirectUrl =
              result.data.apps.payment[0].link +
              result.data.apps.payment[0].userName;
          }
          if (result.data.apps.ecommerce.length > 0) {
            obj.appLabel = result.data.apps.ecommerce[0].label;
            obj.redirectUrl =
              result.data.apps.ecommerce[0].link +
              result.data.apps.ecommerce[0].userName;
          }
          if (result.data.apps.other.length > 0) {
            obj.appLabel = result.data.apps.other[0].label;
            obj.redirectUrl =
              result.data.apps.other[0].link +
              result.data.apps.other[0].userName;
          }
          if (result.data.apps.crypto.length > 0) {
            obj.appLabel = result.data.apps.crypto[0].label;
            obj.redirectUrl =
              result.data.apps.crypto[0].link +
              result.data.apps.crypto[0].userName;
          }
          if (result.data.customLinks.length > 0) {
            obj.customLabel = result.data.customLinks[0].label;
            obj.redirectUrl = result.data.customLinks[0].websiteUrl;
          }
        } else {
          obj.redirectUrl = "";
        }
        return obj;
      } else {
        return { error: "Locked Profile" };
      }
    } else {
      return { error: "User Not Found" };
    }
  } catch (err) {
    return { error: err };
  }
};

export default function UserDetails() {
  const { adminSignOut } = useContext(UserContext);
  const [tapopUsers, setTapopUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [accountType, setAccountType] = useState("basic");
  const [expDate, setExpDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("userName");
  const [profileData, setProfileData] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useRouter();

  const handleViewDetails = async (user) => {
    setSelectedUser(user);
    const data = await getData(user.userName);
    if (!data.error) {
      setProfileData(data);
      setShowPreview(true);
    } else alert(data.error);
    // navigate.push(`/showprofile/${user.userName}`);
    // navigate.push(`/user/${user._id}?`+ createQueryString('profile', profile));
  };
  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token_admin"),
    },
  };
  const fetchTapopUsers = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/tapopuser/getusers`,
        config
      );
      setTapopUsers(response.data);
      setDisplayUsers(
        response.data
          .filter((user, idx) => {
            if (user.userName.includes(search)) return true;
            if (user.email.includes(search)) return true;
            if (user.name.includes(search)) return true;
            return false;
          })
          .sort((el1, el2) => compare(el1, el2, sortField, sortOrder))
      );
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error == "INVALID_ADMIN_TOKEN") {
        adminSignOut();
        navigate.push("/admin");
      }
    }
  };
  useEffect(() => {
    const isAdmin = getCookie("jwt_token_admin") ? true : false;
    if (!isAdmin) {
      navigate.push("/");
    }
    fetchTapopUsers();
  }, []);

  const handleToggleBlocked = async (id, blocked) => {
    try {
      const response = await axios.put(
        `${serverUrl}/tapopuser/blockUser/${id}`,

        {
          blocked: !blocked,
        },
        config
      );
      const updatedUser = response.data;

      fetchTapopUsers();
    } catch (err) {
      console.error(err);
    }
  };
  const handleEmailVerify = async (id, emailVerified) => {
    try {
      await axios.put(
        `${serverUrl}/tapopuser/verifyemail/${id}`,
        {
          emailVerified: !emailVerified,
        },
        config
      );
      // toast.error("Email Verified");
      fetchTapopUsers();
    } catch (err) {
      console.error(err);
    }
  };
  const handleAccountTypeChange = async () => {
    try {
      setShowModal(false);
      let updateData = {
        username: selectedUser.userName,
        pro: false,
        basic: true,
        starter: false,
        planDate: new Date().toISOString(),
        proExpDate: new Date(
          expDate.split("-")[0],
          expDate.split("-")[1] - 1,
          expDate.split("-")[2],
          "23",
          "59",
          "00"
        ),
      };
      if (accountType === "starter") {
        updateData.pro = false;
        updateData.starter = true;
        updateData.basic = false;
      } else if (accountType === "pro") {
        updateData.pro = true;
        updateData.starter = false;
        updateData.basic = false;
        updateData.hasGotPro = true;
      }
      const response = await axios.post(
        `${serverUrl}/tapopuser/updateUserData`,
        updateData,
        config
      );
      const updatedUser = response.data;

      fetchTapopUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${serverUrl}/tapopuser/delete/${id}`, config);
      // toast.error("User Deleted");
      fetchTapopUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text);
    setDisplayUsers(
      tapopUsers
        .filter((user, idx) => {
          if (user.userName.includes(text)) return true;
          if (user.email.includes(text)) return true;
          if (user.name.includes(text)) return true;
          return false;
        })
        .sort((el1, el2) => compare(el1, el2, sortField, sortOrder))
    );
  };
  const handleSortField = (e) => {
    const field = e.target.value;
    setSortField(field);
    setDisplayUsers(
      displayUsers.sort((el1, el2) => compare(el1, el2, field, sortOrder))
    );
  };
  const handleSortOrder = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    setDisplayUsers(
      displayUsers.sort((el1, el2) => compare(el1, el2, sortField, order))
    );
  };

  const compare = (el1, el2, field, order) => {
    if (field == "planDate" || field == "proExpDate") {
      if (isNaN(new Date(el1[field])) && isNaN(new Date(el2[field]))) return 0;
      if (isNaN(new Date(el1[field]))) return 1;
      if (isNaN(new Date(el2[field]))) return -1;
      if (order == "asc") return new Date(el1[field]) - new Date(el2[field]);
      else return new Date(el2[field]) - new Date(el1[field]);
    }
    if (field == "accountType") {
      const et1 = el1.basic ? "basic" : el1.starter ? "starter" : "pro";
      const et2 = el2.basic ? "basic" : el2.starter ? "starter" : "pro";
      if (order == "asc") return et1.localeCompare(et2);
      else return et2.localeCompare(et1);
    }
    if (order == "asc") return (el1[field] + "").localeCompare(el2[field] + "");
    else return (el2[field] + "").localeCompare(el1[field] + "");
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userFullName, setUserFullName] = useState("");

  return (
    <>
      <div
        className="overflow-y-scroll h-screen w-full relative"
        style={{ scrollbarWidth: "auto" }}
      >
        <div className="w-full flex sticky top-0 left-0 z-50 bg-gray-200">
          <input
            className="px-2 py-1 font-semibold text-black text-base w-full border border-[#ddd]"
            placeholder="Search User"
            type="text"
            value={search}
            onChange={handleSearch}
          />
          <h2 className="px-2 py-1 font-semibold text-black text-base w-fit text-nowrap">
            Sort Option:
          </h2>
          <select
            className="px-2 py-1 font-semibold text-black text-base"
            value={sortField}
            onChange={handleSortField}
          >
            <option value={"userName"}>Username</option>
            <option value={"name"}>Name</option>
            <option value={"email"}>Email</option>
            <option value={"emailVerified"}>Email Verified</option>
            <option value={"accountType"}>Account Type</option>
            <option value={"signUpMethod"}>Sign Up Method</option>
            <option value={"planDate"}>Plan Start Date</option>
            <option value={"proExpDate"}>Plan End Date</option>
          </select>
          <select
            className="px-2 py-1 font-semibold text-black text-base"
            value={sortOrder}
            onChange={handleSortOrder}
          >
            <option value={"asc"}>Ascending</option>
            <option value={"des"}>Descending</option>
          </select>
        </div>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                S.No.
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Username
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Name
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Email
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Email Verified
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Account Type
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Sign Up Method
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Plan Start Date
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Plan End Date
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Blocked
              </th>
              {/* <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Action
            </th> */}
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Delete
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                View Details
              </th>
            </tr>
          </thead>
          <tbody>
            {displayUsers.map((user, idx) => (
              <tr key={user._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {idx + 1}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.userName}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: user.emailVerified
                        ? "#4caf50"
                        : "#f44336",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleEmailVerify(user._id, user.emailVerified);
                    }}
                  >
                    {user.emailVerified ? "Yes" : "No"}
                  </button>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: user.pro
                        ? "#4caf50"
                        : user.starter
                        ? "#f0f005"
                        : "#f06f0c",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                  >
                    {user.pro ? "Pro" : user.starter ? "Starter" : "Basic"}
                  </button>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.signUpMethod}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {new Date(user.planDate).toLocaleDateString("en-GB")}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {new Date(user.proExpDate).toLocaleDateString("en-GB")}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: user.blocked ? "#f44336" : "#4caf50",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => handleToggleBlocked(user._id, user.blocked)}
                  >
                    {user.blocked ? "Yes" : "No"}
                  </button>
                </td>
                {/* <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  style={{
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: user.blocked ? "#f44336" : "#4caf50",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => handleToggleBlocked(user._id, user.blocked)}
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td> */}
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: "#f44336",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setUserId(user._id);
                      setUserName(user.userName);
                      setUserFullName(user.name);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: "#2196f3",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => handleViewDetails(user)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* <ToastContainer /> */}
        </table>
        {showModal && (
          <div className=" h-screen w-screen absolute top-0 left-0">
            <div className=" bg-gray-500 opacity-10 w-full h-full z-10 fixed"></div>
            <div className="my-5 mx-auto p-5 rounded-3xl bg-white  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-center z-20">
              <div className="w-full text-lg m-2">
                <h3>Modify Account Type</h3>
              </div>
              <div className="my-4">
                <h3>Select Account Type</h3>
                <select
                  className=" bg-gray-100 m-auto border border-gray-500 p-1 rounded-xl"
                  onChange={(e) => setAccountType(e.target.value)}
                  value={accountType}
                  defaultChecked={"basic"}
                >
                  <option value="basic">Basic</option>
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                </select>
              </div>
              <div className="my-4">
                <h3>Select Expiry Date</h3>
                <input
                  className="m-auto p-1"
                  placeholder="Pick a Date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  min={new Date().toISOString().split("T")[0]}
                  type="date"
                  onChange={(e) => setExpDate(e.target.value)}
                />
              </div>
              <div className="my-4">
                <button
                  className="btn-tertiary mx-4 rounded-full"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-secondary mx-4 rounded-full"
                  onClick={handleAccountTypeChange}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div
          id="deleteModal"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[500px] w-fit min-h-[220px] h-fit rounded-[20px] shadow-md border p-[20px] flex flex-col items-center justify-center bg-white"
        >
          <Image
            alt="warning"
            width={200}
            height={200}
            src={warning}
            className="w-[50px] h-[50px] object-contain"
          />
          <h1 className="text-center text-[red] font-[600]">
            Are you sure you want to delete this user?
          </h1>
          <h1 className="text-center text-[black] font-[600]">
            The account&nbsp;
            <span className="text-center text-[#20c020] font-[600]">
              {userName}
            </span>
            &nbsp;of&nbsp;
            <span className="text-center text-[#20c020] font-[600]">
              {userFullName}
            </span>
            &nbsp;will be deleted!
          </h1>

          <div className="flex items-center justify-center mt-4">
            <button
              className="bg-[#ff2d2d] text-white rounded-[8px] px-4 py-2"
              onClick={() => {
                handleDelete(userId);
                console.log(userName, userFullName, " deleted");
                setShowDeleteModal(false);
              }}
            >
              Delete
            </button>
            <button
              className="bg-[#33ae33] text-white rounded-[8px] px-4 py-2 ml-4"
              onClick={() => {
                setShowDeleteModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Preview
        templateType={profileData.activeTemplate}
        setShowPreview={setShowPreview}
        open={showPreview}
        backgroundColor={profileData.backgroundColor}
        buttonStyle={profileData.buttonStyle}
        buttonColor={profileData.buttonColor}
        color1={profileData.color1}
        color2={profileData.color2}
        bgImage={profileData.bgImage}
        data={profileData}
      />
    </>
  );
}
