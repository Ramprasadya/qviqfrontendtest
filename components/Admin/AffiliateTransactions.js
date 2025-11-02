"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { serverUrl } from "../../config";
import { useRouter } from "next/navigation";
import { SafeLocalStorage, getCookie } from "../utils";
import { UserContext } from "../Contexts/context";

export default function AffiliateTransactions({params}) {
  const {adminSignOut} = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [displayTransactions, setDisplayTransactions] = useState([]);
  const [search,setSearch] = useState("");
  const [sortOrder,setSortOrder] = useState("asc");
  const [sortField,setSortField] = useState("name");
  const navigate = useRouter();

  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token_admin"),
    },
  };
  const fetchAffiliates = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/admin/getAffiliateLink/${params.affiliateLink}`,
        config
      );
      setTransactions(response.data?.at(0)?.transactions);
      setDisplayTransactions(response.data?.at(0)?.transactions.filter((transaction,idx)=>{
        if(transaction.email.includes(search)) return true;
        if(transaction.name.includes(search)) return true;
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
    fetchAffiliates();
  }, []);

  const handleSearch = (e)=>{
    const text = e.target.value;
    setSearch(text);
    setDisplayTransactions(transactions.filter((transaction,idx)=>{
      if(transaction.email.includes(text)) return true;
      if(transaction.name.includes(text)) return true;
      return false;
    })
    .sort((el1,el2)=> compare(el1,el2,sortField,sortOrder)));
  }
  const handleSortField = (e)=>{
    const field = e.target.value;
    setSortField(field);
    setDisplayTransactions(transactions
    .sort((el1,el2)=> compare(el1,el2,field,sortOrder)));
    
  }
  const handleSortOrder = (e)=>{
    const order = e.target.value;
    setSortOrder(order);
    setDisplayTransactions(transactions
      .sort((el1,el2)=> compare(el1,el2,sortField,order)));
  }

  const compare = (el1,el2,field,order) => {
    if(field == "transaction"){
      if(order == "asc") return (el1.amount - el2.amount);
      else return (el2.amount - el1.amount);
    }
    if(order == "asc") return (el1[field]+"").localeCompare((el2[field]+""));
    else return (el2[field]+"").localeCompare((el1[field]+""));
  }

  return (
    <>
    <div className="overflow-y-scroll h-screen w-full relative" style={{scrollbarWidth:"auto"}}>
      <div className="w-full flex sticky top-0 left-0 z-50 bg-gray-200">
        <input className="px-2 py-1 font-semibold text-black text-base w-full border border-[#ddd]" placeholder="Search User" type="text" value={search} onChange={handleSearch}/>
        <h2 className="px-2 py-1 font-semibold text-black text-base w-fit text-nowrap">Sort Option:</h2>
        <select className="px-2 py-1 font-semibold text-black text-base" value={sortField} onChange={handleSortField}>
          <option value={"name"}>Name</option>
          <option value={"email"}>Email</option>
          <option value={"transaction"}>Transaction</option>
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
              Transaction
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
              Transaction ID
            </th>
          </tr>
        </thead>
        <tbody>
          {displayTransactions.map((transaction,idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {idx+1}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {transaction.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {transaction.email}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign:"center" }}>
                {transaction.amount}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign:"center" }}>
                {new Date(transaction.date).toLocaleDateString('en-GB')}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign:"center" }}>
                {transaction.transactionId}
              </td>
            </tr>
          ))}
        </tbody>
         {/* <ToastContainer /> */}
      </table>
      <div className="w-full flex absolute bottom-0 left-0 z-50">
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize:"20px", fontWeight:"bold" }}>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px"}}>
              Total Transaction Amount
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign:"center" }}>
              {transactions.reduce((prev,cur)=>prev+parseFloat(cur.amount),0)}
            </td>
          </tr>
        </table>
      </div>
    </div>
    </>
  );
}
