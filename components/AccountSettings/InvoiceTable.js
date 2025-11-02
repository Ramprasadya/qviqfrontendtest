import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import calender from "../Images/calender.png";
import { HiChevronDown } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";
import { serverUrl } from "../../config";
import Image from "next/image";
import { getCookie } from "../utils";

const InvoiceTable = ({ profile, setNewBill, setNewPlan }) => {
  const serialCount = 1;
  const [invoice, setInvoice] = useState([]);
  const [user, setUser] = useState([]);
  const more = [
    "View more",
    "View2",
    "View3",
    // Add more city names here...
  ];
  const fetchInvoice = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/profile/invoice/${profile}`
      );
      setInvoice(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const [bill, setBill] = useState("");
  const fetchUser = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const response = await axios.get(
        `${serverUrl}/getUser/getuser/${profile}`,
        config
      );
      setUser(response.data);
      setBill(
        new Date(response.data[0].proExpDate).toLocaleDateString("en-GB")
      );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchInvoice();
    fetchUser();
  }, []);

  // const[duration,setDuration]=useState('')
  // function durationn(duration) {

  //   if(duration<3){
  //     setDuration='Monthly';
  //   }
  //   else if(duration %3==0 && duration<12){
  //     setDuration='Quaterly';
  //   }
  //   else{
  //     setDuration='Yearly';
  //   }
  // }
  const [expanded, setExpanded] = useState(false);

  const handleViewMore = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="overflow-scroll">
      <div className=" mb-[24px] xsm:w-[280px] sm:w-[460px] flex py-[10px] xsm:py-[16px] pl-[16px] bg-[#FAFAFA] lg:w-[724px] h-[60px] xsm:h-[80px]">
        <Image alt="calender" 
          className="mr-[16px] xsm:w-[48px] xsm:h-[48px] w-[40px] h-[40px]"
          src={calender}
        />
        <h1 className=" text-[13px] xsm:text-[14px] text-[#817C7C] font-medium block">
          UPCOMING BILL{" "}
          <h1 className="text-[#1A1A1A] xsm:text-[16px] text-[14px] font-semibold">
            {bill}
          </h1>
        </h1>
      </div>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th className="border-none bg-[FFFFFF] md:w-[200px] md:h-[48px] xsm:h-[70px] text-[13px] xsm:text-[14px] p-[8px] ">
              Invoice Number
            </th>
            <th className="border-none bg-[FFFFFF] md:w-[140px] md:h-[48px] xsm:w-[120px] xsm:h-[70px] text-[13px] xsm:text-[14px] p-[8px] ">
              Date
            </th>
            <th className="border-none bg-[FFFFFF] md:w-[80px] md:h-[48px] xsm:w-[140px] xsm:h-[70px] text-[13px] xsm:text-[14px] ">
              Plan
            </th>
            <th className="border-none bg-[FFFFFF] md:w-[140px] md:h-[48px] xsm:w-[120px] xsm:h-[70px] text-[13px] xsm:text-[14px] p-[8px] ">
              Billed
            </th>
            <th className="border-none bg-[FFFFFF] md:w-[108px] md:h-[48px] xsm:w-[140px] xsm:h-[70px] text-[13px] xsm:text-[14px] p-[4px] ">
              Status
            </th>
            <th className="border-none bg-[FFFFFF] md:w-[108px] md:h-[48px] xsm:w-[140px] xsm:h-[70px] text-[13px] xsm:text-[14px] p-[4px] ">
              Payment Method
            </th>
            <th className="border-none bg-[FFFFFF] md:w-[108px] md:h-[48px] xsm:w-[140px] xsm:h-[70px] text-[13px] xsm:text-[14px] p-[4px] ">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {invoice
            .map((user, index) => {
              let amount = 0;
              let plan = "";

              if (user.plantype === "starter" && user.duration === 1) {
                amount = 199;
              } else if (user.plantype === "starter" && user.duration === 3) {
                amount = 699;
              } else if (user.plantype === "starter" && user.duration === 12) {
                amount = 1299;
              } else if (user.plantype === "pro" && user.duration === 1) {
                amount = 399;
              } else if (user.plantype === "pro" && user.duration === 3) {
                amount = 999;
              } else if (user.plantype === "pro" && user.duration === 12) {
                amount = 1599;
              }
              if (user.duration === 1) {
                plan = "Monthly";
              } else if (user.duration === 3) {
                plan = "Quaterly";
              } else if (user.duration === 12) {
                plan = "Yearly";
              }
              setNewPlan(plan);
              setNewBill(amount);
              return (
                <tr key={user._id}>
                  <td className=" text-center rounded-bl-[12px] text-[13px]  xsm:text-[14px] border-b-[1px] border-[#F3F3F3] w-[200px] h-[48px] p-[8px]  ">
                    {`#${serialCount + index} `}
                  </td>
                  <td className="text-[13px]  xsm:text-[14px] text-center border-b-[1px] border-[#F3F3F3] w-[200px] h-[48px] p-[8px] ">
                    {new Date(user.startDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="text-[13px]  xsm:text-[14px] text-center border-b-[1px] border-[#F3F3F3] w-[100px] h-[48px] p-[8px] ">
                    {user.plantype}
                  </td>
                  <td className="text-[13px]  xsm:text-[14px] text-center border-b-[1px] border-[#F3F3F3] w-[200px] h-[48px] p-[8px] ">
                    {new Date(user.endDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="text-[13px]  xsm:text-[14px] text-center border-b-[1px] border-[#F3F3F3] w-[170px] h-[48px] p-[4px] ">
                    Paid
                  </td>
                  <td className="text-[13px]  xsm:text-[14px] text-center border-b-[1px] border-[#F3F3F3] w-[170px] h-[48px] p-[4px] ">
                    {user.paymentMethod}
                  </td>
                  <td className="text-[13px]  xsm:text-[14px] text-center border-b-[1px] border-[#F3F3F3] w-[170px] h-[48px] p-[4px] rounded-br-[12px] ">
                    {amount}
                  </td>
                </tr>
              );
            })
            .reverse()
            .slice(0, expanded ? 6 : 3)}
        </tbody>
      </table>
      <button
        className="text-[14px] xsm:text-[16px] p-[10px] font-semibold outline-none mb-[32px]  h-[48px] xl:w-[140px] xl:h-[48px]  sm:w-[130px]   md:w-[130px]  rounded-[8px]  lg:w-[140px] text-[#817C7C]  mt-[24px] "
        onClick={handleViewMore}
      >
        <div className="flex">
          {expanded ? "View Less" : "View More"}{" "}
          <span className="ml-[11px] mt-[5px]">
            {" "}
            {expanded ? <HiChevronUp /> : <HiChevronDown />}
          </span>
        </div>
      </button>
    </div>
  );
};

export default InvoiceTable;
