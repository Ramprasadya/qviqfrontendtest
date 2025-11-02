"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { serverUrl } from "../../config";
import { HiFilter } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils";
import { UserContext } from "../Contexts/context";
function BasicUserDetails() {
  const {adminSignOut} = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useRouter();

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
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      if(err.response?.data?.error == "INVALID_ADMIN_TOKEN"){
        adminSignOut();
        navigate.push("/admin");
      }
    }
  };

  useEffect(() => {
    const isAdmin = getCookie("jwt_token_admin")?true:false;
    if (!isAdmin) {
      navigate.push("/");
    }
    fetchTapopUsers();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedUsers = [...users];
  if (sortColumn) {
    sortedUsers.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });
  }


  const convertToCSV = (data) => {
    const headers = [
      "S No.",
      "Name",
      "Email",
      "Account Type",
      "Plan Start Date",
      "Plan End Date",
    ];

    const csvData = [headers];

    for (let i = 0; i < data.length; i++) {
      const user = data[i];
      const rowData = [
        i + 1,
        user.name,
        user.email,
        user.pro ? "Pro" : user.starter ? "Starter" : "Basic",
        new Date(user.planDate).toLocaleDateString("en-GB"),
        new Date(user.proExpDate).toLocaleDateString("en-GB"),
      ];

      csvData.push(rowData);
    }

    return csvData.map((row) => row.join(",")).join("\n");
  };

  const downloadCSV = (data, filename) => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportAllUsersCSV = () => {
    const allUsers = sortedUsers;
    downloadCSV(allUsers, "all_users.csv");
  };
  const exportStarterUsersCSV = () => {
    const starterUsers = sortedUsers.filter((user) => user.starter);
    downloadCSV(starterUsers, "starter_users.csv");
  };

  const exportBasicUsersCSV = () => {
    const basicUsers = sortedUsers.filter((user) => !user.pro && !user.starter);
    downloadCSV(basicUsers, "basic_users.csv");
  };
  const exportProUsersCSV = () => {
    const proUsers = sortedUsers.filter((user) => user.pro);
    downloadCSV(proUsers, "pro_users.csv");
  };

  return (
    <div>
      <div className="flex p-2 gap-4 flex-col md:flex-row max-w-200px">
        <div
          className="border-2 rounded-md p-2 bg-cyan-500 text-white cursor-pointer hover:bg-cyan-700"
          onClick={() => {
            exportAllUsersCSV();
          }}
        >
          Export All
        </div>
        <div
          className="border-2 rounded-md p-2 bg-orange-500 text-white cursor-pointer hover:bg-orange-700"
          onClick={() => {
            exportProUsersCSV();
          }}
        >
          Export Only Pro
        </div>
        <div
          className="border-2 rounded-md p-2 bg-green-500 text-white cursor-pointer hover:bg-green-700"
          onClick={() => {
            exportBasicUsersCSV();
          }}
        >
          Export Only Basic
        </div>
        <div
          className="border-2 rounded-md p-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
          onClick={() => {
            exportStarterUsersCSV();
          }}
        >
          Export Only Starter
        </div>
      </div>

      <>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  backgroundColor: "#f2f2f2",
                  cursor: "pointer",
                }}
              >
                <div className="flex gap-4 items-center">
                  <div>S No.</div>
                </div>
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  backgroundColor: "#f2f2f2",
                  cursor: "pointer",
                }}
              >
                <div className="flex gap-4 items-center">
                  <div>Name</div>
                  <HiFilter onClick={() => handleSort("name")} />
                </div>
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                  cursor: "pointer",
                }}
              >
                <div className="flex gap-4 items-center">
                  <div>Email</div>
                  <HiFilter onClick={() => handleSort("email")} />
                </div>
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                  cursor: "pointer",
                }}
              >
                <div className="flex gap-4 items-center">
                  <div>Phone No.</div>
                </div>
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                  cursor: "pointer",
                }}
              >
                <div className="flex gap-4 items-center">
                  <div>Account Type</div>
                  <HiFilter onClick={() => handleSort("pro")} />
                </div>
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                  cursor: "pointer",
                }}
              >
                <div className="flex gap-4 items-center">
                  <div>Plan Start Date</div>
                  <HiFilter onClick={() => handleSort("planDate")} />
                </div>
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                  cursor: "pointer",
                }}
              >
                <div className="flex gap-4 items-center">
                  <div>Plan End Date</div>
                  <HiFilter onClick={() => handleSort("proExpDate")} />
                </div>
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                  cursor: "pointer",
                }}
              >
                <div className="flex gap-4 items-center">
                  <div>Progress</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={user._id}>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {user.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {user.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {user.mobileNumber ? user.mobileNumber : " Not Available"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {user.pro ? "Pro" : user.starter ? "Starter" : "Basic"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {new Date(user.planDate).toLocaleDateString("en-GB")}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {new Date(user.proExpDate).toLocaleDateString("en-GB")}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {/* {user.progress} */}
                  {/* <CircularProgressBar progress={user.progress} /> */}
                  <div className="basis-full h-2px">
                    <div className="lower rounded-full bg-gray-200 h-full">
                      <span
                        className="px-2 block rounded-full  bg-gray-400  h-full"
                        style={{
                          width: `${user.progress ? user.progress : 0}%`,
                        }}
                      >
                        {user.progress ? user.progress : 0}%
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
}

export default BasicUserDetails;
