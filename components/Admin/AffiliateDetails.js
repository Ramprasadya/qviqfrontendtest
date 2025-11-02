"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { serverUrl } from "../../config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCookie } from "../utils";
import { UserContext } from "../Contexts/context";

export default function AffiliateDetails() {
  const {adminSignOut} = useContext(UserContext);
  const [affiliates, setAffiliates] = useState([]);
  // const [displayAffiliates, setDisplayAffiliates] = useState([]);
  // const [search,setSearch] = useState("");
  // const [sortOrder,setSortOrder] = useState("asc");
  // const [sortField,setSortField] = useState("name");
  const navigate = useRouter();

  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token_admin"),
    },
  };
  const fetchAffiliates = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/admin/getAffiliateLinks`,
        config
      );
      setAffiliates(response.data);
      // setDisplayAffiliates(response.data.filter((affiliate,idx)=>{
      //   if(affiliate.email.includes(search)) return true;
      //   if(affiliate.name.includes(search)) return true;
      //   if(affiliate.link.includes(search)) return true;
      //   return false;
      // })
      // .sort((el1,el2)=> compare(el1,el2,sortField,sortOrder)));
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
    fetchAffiliates();
  }, []);

  const handleTrackingToggle = async (id, status) => {
    try {
      const response = await axios.put(
        `${serverUrl}/admin/affiliates/UpdateTracking/${id}`,
        {
          trackingStatus: !status,
        },
        config
      );
      fetchAffiliates();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${serverUrl}/admin/affiliate/delete/${id}`, config);
      fetchAffiliates();
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSearch = (e)=>{
  //   const text = e.target.value;
  //   setSearch(text);
  //   setDisplayAffiliates(affiliates.filter((affiliate,idx)=>{
  //     if(affiliate.email.includes(text)) return true;
  //     if(affiliate.name.includes(text)) return true;
  //     if(affiliate.link.includes(text)) return true;
  //     return false;
  //   })
  //   .sort((el1,el2)=> compare(el1,el2,sortField,sortOrder)));
  // }
  // const handleSortField = (e)=>{
  //   const field = e.target.value;
  //   setSortField(field);
  //   setDisplayAffiliates(affiliates
  //   .sort((el1,el2)=> compare(el1,el2,field,sortOrder)));
    
  // }
  // const handleSortOrder = (e)=>{
  //   const order = e.target.value;
  //   setSortOrder(order);
  //   setDisplayAffiliates(affiliates
  //     .sort((el1,el2)=> compare(el1,el2,sortField,order)));
  // }

  // const compare = (el1,el2,field,order) => {
  //   if(field == "transactions"){
  //     if(order == "asc") return (el1.transactions?.length - el2.transactions?.length);
  //     else return (el2.transactions?.length - el1.transactions?.length);
  //   }
  //   if(field == "transactionsAmount"){
  //     if(order == "asc") return (el1.transactions?.reduce((prev,cur)=>prev+parseFloat(cur.amount),0) - el2.transactions?.reduce((prev,cur)=>prev+parseFloat(cur.amount),0));
  //     else return (el2.transactions?.reduce((prev,cur)=>prev+parseFloat(cur.amount),0) - el1.transactions?.reduce((prev,cur)=>prev+parseFloat(cur.amount),0));
  //   }
  //   if(order == "asc") return (el1[field]+"").localeCompare((el2[field]+""));
  //   else return (el2[field]+"").localeCompare((el1[field]+""));
  // }

  return (
    <>
    <div className="overflow-y-scroll h-screen w-full relative" style={{scrollbarWidth:"auto"}}>
      {/* <div className="w-full flex sticky top-0 left-0 z-50 bg-gray-200">
        <input className="px-2 py-1 font-semibold text-black text-base w-full border border-[#ddd]" placeholder="Search User" type="text" value={search} onChange={handleSearch}/>
        <h2 className="px-2 py-1 font-semibold text-black text-base w-fit text-nowrap">Sort Option:</h2>
        <select className="px-2 py-1 font-semibold text-black text-base" value={sortField} onChange={handleSortField}>
          <option value={"name"}>Name</option>
          <option value={"email"}>Email</option>
          <option value={"link"}>Link</option>
          <option value={"transactions"}>Transactions</option>
          <option value={"transactionsAmount"}>Transactions Amount</option>
        </select>
        <select className="px-2 py-1 font-semibold text-black text-base" value={sortOrder} onChange={handleSortOrder}>
          <option value={"asc"}>Ascending</option>
          <option value={"des"}>Descending</option>
        </select>
      </div> */}
      <h1 className="text-center w-full text-2xl font-medium my-3">Affiliates</h1>
      <div className="flex flex-row justify-start items-center w-full flex-wrap p-3">
        {affiliates.map((affiliate,idx)=>{
          return (
            <div className="flex flex-col basis-1/5 rounded-lg m-2 p-2 gap-1 items-start justify-evenly bg-gray-100 shadow-md border border-black">
              <p>{affiliate.name}</p>
              <p>{affiliate.email}</p>
              <p>{affiliate.link}</p>
              <div className="flex flex-row justify-between w-full">
                <Link href={`/affiliateTransactions/${affiliate.link}`} className=" bg-blue-600 px-2 py-1 rounded-md shadow-sm hover:bg-blue-700 text-white font-normal text-base">View Transactions</Link>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" checked={affiliate.trackingStatus} onChange={()=>handleTrackingToggle(affiliate._id,affiliate.trackingStatus)}/>
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )
        })

        }
      </div>
    </div>
    </>
  );
}
