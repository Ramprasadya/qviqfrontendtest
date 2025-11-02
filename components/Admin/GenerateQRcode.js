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

const GenerateQRcode = () => {
  const [qrValue, setQRValue] = useState("");
  const qrCodeRef = useRef(null);
  const [qrcolor, setqrcolor] = useState("black");

  const generateQRCode = () => {
    const uniqueId = Math.floor(Math.random() * 1000000);
    const qrValue1 = `${clientUrl}/qrscan/${uniqueId}`;
    setQRValue(qrValue1);
  };

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    const qrCodeUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qrCode.png";
    link.click();
  };
  return (
    <div>
      <div className="fixed text-center inset-0 flex flex-col items-center justify-center space-y-12 justify-items-auto ">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={generateQRCode}
        >
          Generate new QR
        </button>

        {qrValue && (
          <div ref={qrCodeRef} className="items-center">
            {/*                 
              <QRCode
              bgColor="transparent"
                value={qrValue}
                size={200} // Set the desired size of the QR code
                logoWidth={50} // Set the desired width of the logo (optional)
                // logoImage={logoImage} // Provide your logo image (optional)
              /> */}

            <QrCode
              color={{
                eyes: qrcolor,
                body: qrcolor,
              }}
              value={qrValue}
              bgColor="transparent"
            />
            <div className="space-y-8 mb-8 ">
              {" "}
              <label className="pr-8">Tap to change colour</label>
              <input
                type="color"
                onChange={(e) => setqrcolor(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2 ">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={downloadQRCode}
              >
                Download QR code
              </button>
              <h1>{qrValue}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default GenerateQRcode;
