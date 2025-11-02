// http://localhost:3000/invoice?id=crypto&order=652fd3263332370174fa0689

"use client";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceLayout from "./InvoiceLayout";
import CenterModal from "../UiComponents/NewModal/CenterModal";
import PrimaryButton from "../UiComponents/PrimaryButton";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";

const Invoice = ({ data }) => {
  const contentRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  //console.log(data);

  const downloadAsImage = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current, { scale: 4 }).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "invoice.png";
        link.click();
      });
    }
  };

  const downloadAsMultiplePDF = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current, { scale: 4 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        const pdf = new jsPDF("p", "mm");
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(
          `fullName_${data?.address?.fullName}_username_${data?.username}_orderID_${data?.orderID}.pdf`
        );
      });
    }
  };

  const downloadAsSinglePDF = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current, { scale: 4 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(
          imgData,
          "JPEG",
          0,
          0,
          canvas.width,
          canvas.height,
          "",
          "FAST"
        );
        pdf.save(`fullName_${data?.address?.fullName}_username_${data?.username}_orderID_${data?.orderID}.pdf`);
      });
    }
  };

  return (
    <div className="Plus-Jakarta-Sans-font-div bg-white w-full h-full flex flex-col items-center p-[10px] sm:p-[20px]">
      <h1 className="fixed top-0 w-full shadow-md filter backdrop-blur-lg font-[700] text-[20px] sm:text-[30px] py-[10px] sm:py-[20px] px-[15px] sm:px-[40px]">
        Invoice
      </h1>
      {/* <p className="mb-[10px]">Click to open the invoice</p> */}

      <div className="w-full h-full flex flex-col items-center pb-[150px]">
        <h1 className="font-[700] text-[20px] sm:text-[30px] py-[10px] sm:py-[20px] px-[20px] sm:px-[40px]">
          &nbsp;
        </h1>

        <div ref={contentRef} className="w-full">
          {data && (
            <InvoiceLayout
              username={data?.result?.address?.fullName}
              // company={data?.address?.companyName}
              // gstin={data?.address?.gstin}
              phone={data?.result?.address?.phoneNumber}
              email={data?.result?.address?.email}
              addressLine1={data?.result?.address?.addressLine1}
              addressLine2={data?.result?.address?.addressLine2}
              city={data?.result?.address?.city?.name}
              state={data?.result?.address?.state?.name}
              country={data?.result?.address?.country?.name}
              pincode={data?.result?.address?.pincode}
              billaddressLine1={data?.result?.billingAddress?.addressLine1}
              billaddressLine2={data?.result?.billingAddress?.addressLine2}
              billcity={data?.result?.billingAddress?.city?.name}
              billstate={data?.result?.billingAddress?.state?.name}
              billcountry={data?.result?.billingAddress?.country?.name}
              billpincode={data?.result?.billingAddress?.pincode}
              cart={data?.result?.cart}
            />
          )}
        </div>
      </div>

      <div className="fixed bottom-0 w-full h-fit flex items-center justify-center gap-2 pb-[40px]">
        <PrimaryButton2
          onClick={downloadAsSinglePDF}
          text="Download Invoice"
          width="190px"
        />
      </div>
    </div>
  );
};

export default Invoice;
