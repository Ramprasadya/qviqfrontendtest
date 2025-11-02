"use client";
import Image from "next/image";
import React from "react";
import tapopLogo from "../Image/Tapop logo black.png";
import DynamicInvoiceTotals from "./DynamicInvoiceTotals";

const InvoiceLayout = (props) => {
  console.log(props.cart);
const date = new Date(props.date);
const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, ' ');

  return (
    <div className="min-w-[250px] w-full min-h-fit mx-auto p-[5px] sm:p-8 bg-white">
      <div className="flex justify-between mb-6">
        <div className="">
          <h2 className="text-[8px] sm:text-lg sm: font-[700] mb-2 text-[#1d83ff]">
            TAX INVOICE
          </h2>
          <h2 className="text-[9px] sm:text-xl font-[800] mb-2">
            TAPOP SMART TECH PRIVATE LIMITED
          </h2>
          <p className="text-[6px] sm:text-sm font-semibold">
            GSTIN 07AAJCT4201E1ZP
          </p>
          <p className="text-[6px] sm:text-sm">2- A/3 S/F FRONT SIDE</p>
          <p className="text-[6px] sm:text-sm">ASAF ALI ROAD, New Delhi</p>
          <p className="text-[6px] sm:text-sm">Central Delhi, DELHI, 110002</p>
          <p className="text-[6px] sm:text-sm">
            <span className="font-semibold">Mobile</span> +91 9717023623
            &nbsp;&nbsp;&nbsp;
            <span className="font-semibold">Email</span> support@qviq.io
          </p>
        </div>

        <div className="">
          <p className="text-[6px] sm:text-sm font-[500] text-right mb-4">
            ORIGINAL FOR RECIPIENT
          </p>
          <Image
            src={tapopLogo}
            alt="logo"
            width={720}
            height={720}
            className="w-[90px] sm:w-[230px] h-auto object-contain"
          />
        </div>
      </div>

      <div className="flex justify-between mb-6 text-[6px] sm:text-sm">
        <div>
          <p className="font-semibold mb-4">Invoice #: INV-1</p>
          <h3 className="font-semibold mb-1">Customer Details:</h3>
          {props.username && <p className="font-semibold">{props.username}</p>}
          {props.company && <p className="font-semibold">{props.company}</p>}
          {props.gstin && <p className="font-semibold">{props.gstin}</p>}
          {props.phone && <p>Ph: {props.phone}</p>}
          {props.email && <p>{props.email}</p>}
        </div>

        <div>
          <p className="font-semibold mb-4">Invoice Date: {formattedDate}</p>
          <h3 className="font-semibold mb-1">Billing Address:</h3>
          {props.billaddressLine1 && <p>{props.billaddressLine1}</p>}
          {props.billaddressLine2 && <p>{props.billaddressLine2}</p>}
          {props.billcity && <p>{props.billcity}</p>}
          {props.billstate && <p>{props.billstate}</p>}
          {props.billcountry && <p>{props.billcountry}</p>}
          {props.billpincode && <p>{props.billpincode}</p>}
        </div>

        <div>
          {/* <p className="font-semibold mb-4">Due Date: 06 Aug 2024</p> */}
          <h3 className="font-semibold mb-1">Shipping Address:</h3>
          {props.addressLine1 && <p>{props.addressLine1}</p>}
          {props.addressLine2 && <p>{props.addressLine2}</p>}
          {props.city && <p>{props.city}</p>}
          {props.state && <p>{props.state}</p>}
          {props.country && <p>{props.country}</p>}
          {props.pincode && <p>{props.pincode}</p>}
        </div>
      </div>

      <div className="mb-6 text-[6px] sm:text-sm font-semibold">
        <p>Place of Supply:</p>
        <p>07-DELHI</p>
      </div>

      <table className="w-full mb-2">
        <tbody>
          <tr className="bg-[#f4f7f9] border-t-[1px] border-t-[#1c6bff]">
            <th className="p-1 text-[4px] sm:text-xs font-[600] text-left">
              #
            </th>
            <th className="p-1 text-[4px] sm:text-xs font-[600] text-left">
              Item
            </th>
            <th className="p-1 text-[4px] sm:text-xs font-[600] text-right">
              Rate / Item
            </th>
            <th className="p-1 text-[4px] sm:text-xs font-[600] text-right">
              Qty
            </th>
            <th className="p-1 text-[4px] sm:text-xs font-[600] text-right">
              Taxable Value
            </th>
            <th className="p-1 text-[4px] sm:text-xs font-[600] text-right">
              Tax Amount
            </th>
            <th className="p-1 text-[4px] sm:text-xs font-[600] text-right">
              Amount
            </th>
          </tr>
          <tr className="border-b-[1px] border-b-[#1c6bff]">
            <td className="p-[4px]"></td>
          </tr>
        </tbody>
        {/* Item list, we can map this tbody */}
        {/* GST Amount = (Selling Price x GST Rate) / 100 */}
        {props.cart?.map((item, index) => (
          <tbody key={index}>
            <tr className="text-[6px] sm:text-sm">
              <td className="p-2">1</td>
              <td className="p-2 font-[600]">
                {item.title}
                <br />
                <span className="font-normal">Id: {item.productId}</span>
              </td>
              <td className="p-2 text-right font-[600]">{item.price}</td>
              <td className="p-2 text-right">{item.quantity} PCS</td>
              <td className="p-2 text-right">{item.price - (item.price * 18) / 100}</td>
              <td className="p-2 text-right">
                {(item.price * 18) / 100} (18%)
              </td>
              <td className="p-2 text-right">
                {item.price}
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      <div className="border-b-[1px] border-b-[#bac3d3]"></div>

      <DynamicInvoiceTotals cart={props.cart} />
    </div>
  );
};

export default InvoiceLayout;
