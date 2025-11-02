"use client";
import React, { useEffect } from "react";
import { clientUrl } from "@/config";

const page = (props) => {
    useEffect(()=>{
        if(props.data.trackingStatus == true){
          window.sessionStorage.setItem("affiliateLink",props.data.link);
        }
        else{
          window.sessionStorage.removeItem("affiliateLink");
        }
        window.location.href = `${clientUrl}/${props.data.redirectPage}`;
    },[]);
  return (<>
  </>
  );
};

export default page;
