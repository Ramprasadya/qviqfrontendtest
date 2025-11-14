"use client";
import React, { useState, useEffect, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { clientUrl, serverUrl } from "../../config";
import { QrCode } from "react-qrcode-pretty";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";
import { getCookie } from "../utils";

const AddAffiliateLink = () => {
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [mobileNumber,setMobileNumber] = useState("");
    const [link,setLink] = useState("");
    const [status,setStatus] = useState("");
    const [displayLink,setDisplayLink] = useState("");
    const [redirectPage,setRedirectPage] = useState("pricing");
    const handleSubmit = async()=>{
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token_admin"),
        },
      };
      try{
        const response = await axios.post(`${serverUrl}/admin/affiliateLink/add`,{
            link,
            email,
            name,
            mobileNumber,
            redirectPage,
            trackingStatus:true,
        },config);
        setDisplayLink(`https://qviqfrontendtest.vercel.app/${link}`);
        setStatus(response.data.message);
        setTimeout(()=>setStatus(""),5000);
      }catch(e){
        //console.log(e);
        setStatus("Error Occured While Adding Linking!");
        setTimeout(()=>setStatus(""),5000);
      }
    } 
  return (
    <div className="w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-2 bg-gray-100 p-4 rounded-xl">
            <input className="text-base p-2 rounded-lg" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
            <input className="text-base p-2 rounded-lg" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
            <input className="text-base p-2 rounded-lg" type="tel" value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)} placeholder="Enter Phone Number"/>
            <input className="text-base p-2 rounded-lg" type="text" value={link} onChange={(e)=>setLink(e.target.value)} placeholder="Enter Link"/>
            <select className="text-base p-2 rounded-lg" value={redirectPage} onChange={(e)=> setRedirectPage(e.target.value)}>
                <option value={"pricing"}>Pricing</option>
                <option value={"products"}>Products</option>
            </select>
            <button type="submit" className="p-2 rounded-lg bg-black text-white" onClick={handleSubmit}>Add Affiliate Link</button>
            <div className="mt-2 text-center text-base">{status}</div>
            <a href={displayLink} className="mt-2 text-blue-600 text-center text-base font-bold" target="_blank">{displayLink}</a>
        </div>
    </div>
  );
};
export default AddAffiliateLink;
