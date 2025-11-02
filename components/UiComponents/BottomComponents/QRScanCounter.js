"use client";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl, hostname } from "../../../config";

const QRScanCounter = ({id,userName}) => {

  useEffect(() => {
    const qrValue = `${id}/${userName}`;

    const incrementCounter = async () => {
      try {
        const response = await axios.post(
          `${serverUrl}/person/incrementCounter/${userName}`,
          {
            qrValue,
          }
        );

        window.location.replace(`http://${userName}.${hostname}`);
      } catch (error) {
        console.error(error);
      }
    };

    incrementCounter();
  }, [id, userName]);

  return null;
};

export default QRScanCounter;
