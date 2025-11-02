"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { serverUrl } from "../../config";
import { useRouter } from "next/navigation";
import { SafeLocalStorage, getCookie } from "../utils";
import { UserContext } from "../Contexts/context";

export default function ErrorReporting() {
  const {adminSignOut} = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState([]);
  const [search,setSearch] = useState("");
  const [sortOrder,setSortOrder] = useState("asc");
  const [sortField,setSortField] = useState("userName");
  const navigate = useRouter();

  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token_admin"),
    },
  };
  const fetchErrorsReported = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/errorReporting/getErrors`,
        config
      );
      //console.log(response.data.errorsReported);
      setErrors(response.data.errorsReported);
      setDisplayErrors(response.data.errorsReported.filter((error,idx)=>{
        if(error.path.includes(search)) return true;
        if(error.message.includes(search)) return true;
        return false;
      })
      .sort((el1,el2)=> compare(el1,el2,sortField,sortOrder)));
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
    fetchErrorsReported();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${serverUrl}/errorReporting/deleteError/${id}`, config);
      fetchErrorsReported();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e)=>{
    const text = e.target.value;
    setSearch(text);
    setDisplayErrors(errors.filter((error,idx)=>{
        if(error.path.includes(search)) return true;
        if(error.message.includes(search)) return true;
        return false;
    })
    .sort((el1,el2)=> compare(el1,el2,sortField,sortOrder)));
  }
  const handleSortField = (e)=>{
    const field = e.target.value;
    setSortField(field);
    setDisplayErrors(displayErrors
    .sort((el1,el2)=> compare(el1,el2,field,sortOrder)));
    
  }
  const handleSortOrder = (e)=>{
    const order = e.target.value;
    setSortOrder(order);
    setDisplayErrors(displayErrors
      .sort((el1,el2)=> compare(el1,el2,sortField,order)));
  }

  const compare = (el1,el2,field,order) => {
    if(field == "date"){
      if(isNaN(new Date(el1[field])) && isNaN(new Date(el2[field]))) return 0;
      if(isNaN(new Date(el1[field]))) return 1;
      if(isNaN(new Date(el2[field]))) return -1;
      if(order == "asc") return (new Date(el1[field]) - new Date(el2[field]));
      else return (new Date(el2[field]) - new Date(el1[field]));
    }
    if(order == "asc") return (el1[field]+"").localeCompare((el2[field]+""));
    else return (el2[field]+"").localeCompare((el1[field]+""));
  }

  return (
    <>
    <div className="overflow-y-scroll h-screen w-full relative" style={{scrollbarWidth:"auto"}}>
      <div className="w-full flex sticky top-0 left-0 z-50 bg-gray-200">
        <input className="px-2 py-1 font-semibold text-black text-base w-full border border-[#ddd]" placeholder="Search Error" type="text" value={search} onChange={handleSearch}/>
        <h2 className="px-2 py-1 font-semibold text-black text-base w-fit text-nowrap">Sort Option:</h2>
        <select className="px-2 py-1 font-semibold text-black text-base" value={sortField} onChange={handleSortField}>
          <option value={"path"}>Pathname</option>
          <option value={"message"}>Error Message</option>
          <option value={"date"}>Date</option>
        </select>
        <select className="px-2 py-1 font-semibold text-black text-base" value={sortOrder} onChange={handleSortOrder}>
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
              Pathname
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Error Message
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Browser
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Platform
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Device
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Date
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {displayErrors.map((error,idx) => (
            <tr key={error._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {idx+1}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {error.path}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {error.message}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {error.browser}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {error.platform}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {error.device}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {new Date(error.date).toLocaleDateString("en-GB")}
              </td>
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
                  onClick={() => handleDelete(error._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
         {/* <ToastContainer /> */}
      </table>
    </div>
    </>
  );
}
