// import { useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import axios from "axios";

// const ScanQR = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   console.log(id);

//   useEffect(() => {
//     const handleQRScan = async () => {
//       try {
//         const res = await axios.get(`${serverUrl}/deviceQR/find/${id}`);
//         console.log(res.data);
//         if (res.data.length === 0) {
//             //when id is not present
//           navigate("/", { state: { id: id } });
//         } else {
//           // Handle the case when the ID is present in the collection
//           console.log(res.data[0].userName)
//           const newUrl = `http://${res.data[0].userName}.${hostname}`;
//           window.location.replace(newUrl);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     handleQRScan();
//   }, []);

//   return null;
// };

// export default ScanQR;
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl, hostname } from "../../config";
import { useRouter } from "next/navigation";
import { createQueryString } from "@/components/utils";

const ScanQR = ({ id }) => {
  const navigate = useRouter();

  useEffect(() => {
    const handleQRScan = async () => {
      try {
        const res = await axios.get(`${serverUrl}/deviceQR/find/${id}`);

        if (res.data.length === 0) {
          // When id is not present
          navigate.push("/signup?" + createQueryString(["id"], [id]));
        } else {
          // Handle the case when the ID is present in the collection

          const { data } = await axios.get(
            `${serverUrl}/device/infoall/${res.data[0].userName}`
          );
          // if (data.profileShared.length !== 0){
          //   await axios.post(
          //     `${serverUrl}/analytics/device/${data.profileShared[0]._id}/${res.data[0].userName}`,
          //     {}
          //   );
          // }
          const response = await axios.post(
            `${serverUrl}/person/incrementCounter/${res.data[0].userName}`,
            {}
          );

          const newUrl = `http://${res.data[0].userName}.${hostname}`;
          window.location.replace(newUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleQRScan();
  }, [id]);

  return null;
};

export default ScanQR;
