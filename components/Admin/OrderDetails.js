"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { serverUrl } from "../../config";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils";
import { UserContext } from "../Contexts/context";
export default function OrderDetails() {
  const {adminSignOut} = useContext(UserContext);
  const [order, setOrder] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useRouter();

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
      setOrder(response.data);
    } catch (err) {
      console.error(err);
      if(err.response?.data?.error == "INVALID_ADMIN_TOKEN"){
        adminSignOut();
        navigate.push("/admin");
      }
    }
  };

  useEffect(() => {
    const isAdmin = getCookie("jwt_token_admin")?true:false;
    if (!isAdmin) {
      navigate.push("/");
    }
    fetchOrders();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredOrders = order.filter(
    (item) => new Date(item.now).toISOString().slice(0, 10) === selectedDate
  );

  const getColorValue = (colorCode) => {
    const colorNames = {
      "#FFFFFF": "White",
      "#000000": "Black",
      "#5B3FE9": "Blue Magenta",
      "#3F3F3F": "Dark Gray",
      "#7A7A7A": "Gray",
      "#AEAEAE": "Dark Gray",
      "#DDDDDD": "light gray",
      "#F54040": "Red",
      "#FE7171": "Salmon",
      "#FF4789": "Coral Red",
      //   "#3D58DB",
      //   "#FB6535",
      //   "#FF8A00",
      //   "#FFC700",
      //   "#9CDD32",
    };

    if (colorCode in colorNames) {
      return colorNames[colorCode];
    }

    return colorCode;
  };
  const exportOrdersToCSV = () => {
    const data = [
      ["Order ID", "Order Date", "Total Items", "Product Details"],
      ...filteredOrders.map((item) => {
        const productDetails = item.cart.map((product) => {
          let details = `${product.title} - Quantity: ${product.quantity}`;
          if (product.customization) {
            details += `\r\nName: ${product.customization.name}`;
            details += `\r\nFont Style: ${product.customization.fontStyle}`;
            details += `\r\nFont Color: ${
              product.customization.fontColor
            } (${getColorValue(product.customization.fontColor)})`;
            details += `\r\nDesignation: ${product.customization.designation}`;
            details += `\r\nDesignation Style: ${product.customization.designationStyle}`;
            details += `\r\nDesignation Color: ${
              product.customization.designationColor
            } (${getColorValue(product.customization.designationColor)})`;
            details += `\r\nLogo: ${product.customization.logo}`;
            details += `\r\nCard Color: ${
              product.customization.cardColor
            } (${getColorValue(product.customization.cardColor)})`;
          }
          return details;
        });
        return [
          item.orderID,
          new Date(item.now).toLocaleDateString("en-GB"),
          item.cart.length,
          `"${productDetails.join("\r\n")}"`,
        ];
      }),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => row.join(",")).join("\n");

    const currentDate = new Date().toISOString().split("T")[0];
    const fileName = `orders_${currentDate}.csv`;

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);

    link.click();
  };

  return (
    <>
      <h1>Order Details</h1>
      <label>Date: </label>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      <Button className="bg-[#1976d2]" variant="contained" color="primary" onClick={exportOrdersToCSV}>
        Export to CSV
      </Button>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              OrderID
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Order Date
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Total Items
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Product Details
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((item) => (
            <tr key={item._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.orderID}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {new Date(item.now).toLocaleDateString("en-GB")}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.cart.length}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.cart.map((product, index) => (
                  <div key={product._id}>
                    <p>
                      {product.title} - Quantity: {product.quantity}
                    </p>
                    {product.customization && (
                      <div>
                        <p>Name: {product.customization.name}</p>
                        <p>Font Style: {product.customization.fontStyle}</p>
                        <p>
                          Font Color: {product.customization.fontColor}
                          <span
                            style={{
                              backgroundColor: product.customization.fontColor,
                              padding: "2px 5px",
                              color: "#fff",
                            }}
                          >
                            {getColorValue(product.customization.fontColor)}
                          </span>
                        </p>
                        <p>Designation: {product.customization.designation}</p>
                        <p>
                          Designation Style:{" "}
                          {product.customization.designationStyle}
                        </p>
                        <p>
                          Designation Color:{" "}
                          {product.customization.designationColor}
                          <span
                            style={{
                              backgroundColor:
                                product.customization.designationColor,
                              padding: "2px 5px",
                              color: "#fff",
                            }}
                          >
                            {getColorValue(
                              product.customization.designationColor
                            )}
                          </span>
                        </p>
                        <p>Logo: {product.customization.logo}</p>
                        <p>
                          Card Color: {product.customization.cardColor}{" "}
                          <span
                            style={{
                              backgroundColor: product.customization.cardColor,
                              padding: "2px 5px",
                              color: "#fff",
                            }}
                          >
                            {getColorValue(product.customization.cardColor)}
                          </span>
                        </p>
                      </div>
                    )}
                    {index !== item.cart.length - 1 && <hr />}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
