"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import { Button } from "@mui/material";
import { getCookie } from "../utils";

export default function ProductAnalytics() {
  const [orders, setOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [productAnalytics, setProductAnalytics] = useState({});

  const fetchOrders = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token_admin"),
      },
    };
    try {
      const response = await axios.get(
        `${serverUrl}/product/getOrders`,
        config
      );
      setOrders(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const analytics = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.now);
      const orderMonth = orderDate.getMonth() + 1;

      if (selectedMonth === "" || orderMonth.toString() === selectedMonth) {
        order.cart.forEach((product) => {
          const productId = product._id;

          if (!analytics[productId]) {
            analytics[productId] = {
              productInfo: product,
              count: 0,
              customCount: 0,
            };
          }

          analytics[productId].count += product.quantity;

          if (product.customization) {
            analytics[productId].customCount += product.quantity;
          }
        });
      }
    });

    setProductAnalytics(analytics);
  }, [orders, selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[parseInt(monthNumber, 10) - 1];
  };

  const exportToCSV = () => {
    const monthName =
      selectedMonth === "" ? "AllMonths" : getMonthName(selectedMonth);
    const data = [
      ["Product Name", "Total Quantity Bought", "Quantity with Customization"],
    ];

    Object.keys(productAnalytics).forEach((productId) => {
      const product = productAnalytics[productId].productInfo;
      const totalCount = productAnalytics[productId].count;
      const customCount = productAnalytics[productId].customCount;

      data.push([product.title, totalCount, customCount]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `product_analytics_${monthName}.csv`);

    link.click();
  };
  return (
    <div>
      <h1>Product Analytics</h1>
      <label>Select Month: </label>
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="">All Months</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <Button variant="contained" color="primary" onClick={exportToCSV}>
        Export to CSV
      </Button>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Quantity Bought</th>
            <th>Quantity with Customization</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(productAnalytics).map((productId) => (
            <tr key={productId}>
              <td>{productAnalytics[productId].productInfo.title}</td>
              <td>{productAnalytics[productId].count}</td>
              <td>{productAnalytics[productId].customCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
