import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import calender from "../Images/calender.png";
import { HiChevronDown } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";
import { serverUrl } from "../../config";

const ProductInvoiceTable = ({ profile, setNewBill, setNewPlan }) => {
  const serialCount = 1;
  const [invoice, setInvoice] = useState([]);
  const more = [
    "View more",
    "View2",
    "View3",
    // Add more city names here...
  ];
  const fetchInvoice = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/product/getOrders/${profile}`
      );
      setInvoice(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleViewMore = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="overflow-scroll">
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th className="border-none bg-[FFFFFF] md:w-[200px] md:h-[48px] xsm:h-[70px] text-[13px] xsm:text-[14px] p-[8px] ">
              Invoice Number
            </th>
            <th className="border-none bg-[FFFFFF] md:w-[200px] md:h-[48px] xsm:h-[70px] text-[13px] xsm:text-[14px] p-[8px] ">
              Order ID
            </th>
            <th className="border-none bg-[FFFFFF] md:w-[140px] md:h-[48px] xsm:w-[120px] xsm:h-[70px] text-[13px] xsm:text-[14px] p-[8px] ">
              Date
            </th>
            <th className="border-none bg-[FFFFFF] md:w-[80px] md:h-[48px] xsm:w-[140px] xsm:h-[70px] text-[13px] xsm:text-[14px] ">
              Product
            </th>
            <th className="border-none bg-[FFFFFF] md:w-[108px] md:h-[48px] xsm:w-[140px] xsm:h-[70px] text-[13px] xsm:text-[14px] p-[4px] ">
              Status
            </th>
            <th className="border-none bg-[FFFFFF] md:w-[108px] md:h-[48px] xsm:w-[140px] xsm:h-[70px] text-[13px] xsm:text-[14px] p-[4px] ">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {invoice
            .map((user, index) => {
              return (
                <tr key={user._id}>
                  <td className=" text-center rounded-bl-[12px] text-[13px]  xsm:text-[14px] border-b-[1px] border-[#F3F3F3] w-[200px] h-[48px] p-[8px]  ">
                    {`#${serialCount + index} `}
                  </td>
                  <td className="text-[13px]  xsm:text-[14px] text-center border-b-[1px] border-[#F3F3F3] w-[100px] h-[48px] p-[8px] ">
                    {user.orderID}
                  </td>
                  <td className="text-[13px]  xsm:text-[14px] text-center border-b-[1px] border-[#F3F3F3] w-[200px] h-[48px] p-[8px] ">
                    {new Date(user.now).toLocaleDateString("en-GB")}
                  </td>
                  <td className="text-[13px]  xsm:text-[14px] text-center border-b-[1px] border-[#F3F3F3] w-[200px] h-[48px] p-[8px] ">
                    {user.cart.map((product, index) => (
                      <div key={index}>
                        <p> {product.title}</p>
                      </div>
                    ))}
                  </td>
                  <td className="text-[13px]  xsm:text-[14px] text-center border-b-[1px] border-[#F3F3F3] w-[170px] h-[48px] p-[4px] ">
                    Paid
                  </td>
                  <td className="text-[13px]  xsm:text-[14px] text-center border-b-[1px] border-[#F3F3F3] w-[170px] h-[48px] p-[4px] rounded-br-[12px] ">
                    {user.totalAmount}
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

export default ProductInvoiceTable;
