"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { SafeLocalStorage, getCookie } from "../utils";
import { UserContext } from "../Contexts/context";
import CenterModal from "../UiComponents/NewModal/CenterModal";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import InvoiceLayout from "../Invoice/InvoiceLayout";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function AllOrders() {
  const { adminSignOut } = useContext(UserContext);
  const [order, setOrder] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility
  const [statusModal, setStatusModal] = useState(false); // State to manage dialog visibility
  const [orderStatus, setOrderStatus] = useState("Queued"); // State to manage dialog visibility
  const [search, setSearch] = useState("");
  const navigate = useRouter();
  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token_admin"),
    },
  };
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/product/getOrders`,
        config
      );
      setOrder(response.data);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error == "INVALID_ADMIN_TOKEN") {
        adminSignOut();
        navigate.push("/admin");
      }
    }
  };

  useEffect(() => {
    const isAdmin = getCookie("jwt_token_admin") ? true : false;
    if (!isAdmin) {
      navigate.push("/");
    }
    fetchOrders();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredOrders = order
    .filter(
      (item) =>
        (selectedDate == ""
          ? true
          : new Date(item.now).toISOString().slice(0, 10) === selectedDate) &&
        (item.address
          ? item.address.email
            ? item.address.email.includes(search)
            : true
          : true)
    )
    .sort((a, b) => new Date(b.now) - new Date(a.now));
  // sorting according to date  .

  const handleViewDetails = (selectedOrder) => {
    setSelectedOrder(selectedOrder);
    setOpenDialog(true);
  };
  const handleStatusChange = (selectedOrder) => {
    setSelectedOrder(selectedOrder);
    setStatusModal(true);
    setOrderStatus(
      selectedOrder.order_status ? selectedOrder.order_status : "Queued"
    );
  };
  const handleOrderStatusChange = async (e) => {
    setStatusModal(false);
    const response = await axios.post(
      `${serverUrl}/product/setOrderStatus/${selectedOrder._id}`,
      {
        order_status: orderStatus,
      },
      config
    );
    fetchOrders();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const exportOrdersToCSV = () => {
    const data = [
      ["Order ID", "Order Date", "Email", "Customer Name", "Delivery Address"],
      ...filteredOrders.map((item) => [
        item.orderID,
        new Date(item.now).toLocaleDateString("en-GB"),
        item.address.email,
        item.address.fullName,
        `${item.address.addressLine1}, ${item.address.addressLine2}, ${item.address.city.name}, ${item.address.state.name}, ${item.address.country.name}, ${item.address.pincode}`,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => row.join(",")).join("\n");

    const currentDate = new Date().toISOString().split("T")[0];
    const fileName = `orders_${selectedDate}.csv`;

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);

    link.click();
  };

  // ----- Invoice ------
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const contentRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
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
        pdf.save("invoice.pdf");
      });
    }
  };

  return (
    <div
      className="w-full h-full"
      style={{ scrollbarWidth: "auto", overflowY: "scroll" }}
    >
      <div className="w-full flex sticky top-0 left-0 z-50 bg-gray-200">
        <input
          className="px-2 py-1 font-semibold text-black text-base w-full border border-[#ddd]"
          placeholder="Search User"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <h1>Order Details</h1>
      <label>Date: </label>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      <Button
        className="bg-[#1976d2] ml-1 md:ml-8 "
        variant="contained"
        color="primary"
        onClick={exportOrdersToCSV}
      >
        Export to CSV
      </Button>
      <TableContainer component={Paper}>
        <Table style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>SNo.</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>OrderID</TableCell>
              <TableCell>Order Details</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Customer Details</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Invoice</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((item, idx) => (
              <TableRow key={item._id}>
                {/* {console.log("filterd Data return ", item.now )} */}
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.address?.email}</TableCell>
                <TableCell>{item.shipRocket?.order_id}</TableCell>
                <TableCell>
                  {item.cart.map((product, index) => (
                    <div key={index} className=" text-nowrap">
                      {/* <img
                    className="w-24"
                    src={product.coverimages?.at(0)?.replace(
                      /images\//g,
                      "images%2F"
                    )}
                  /> */}
                      <p className="font-semibold text-base">
                        Product {index + 1}:
                      </p>
                      {product.username != undefined &&
                      product.planType != undefined ? (
                        <>
                          <p>Plan Type: {product.planType}</p>
                          <p>
                            Expiry Date:{" "}
                            {new Date(
                              new Date().getTime() +
                                product.duration * 30 * 24 * 60 * 60 * 1000
                            )?.toLocaleDateString("en-GB")}
                          </p>
                          <p>Username: {product.username}</p>
                        </>
                      ) : (
                        <>
                          <p>Title: {product.title}</p>
                          <p>Price: {product.price}</p>
                          <p>Quantity: {product.quantity}</p>
                        </>
                      )}
                      {product.customization && (
                        <div className="w-full">
                          <p>Customization:</p>
                          <ul className="list-disc list-inside">
                            <li>Name: {product.customization.name}</li>
                            <li>
                              Font Style: {product.customization.fontStyle}
                            </li>
                            <li>
                              Font Color: {product.customization.fontColor}
                              <span
                                style={{
                                  backgroundColor:
                                    product.customization.fontColor,
                                  padding: "2px 5px",
                                  color: "#fff",
                                }}
                              >
                                *
                              </span>
                            </li>
                            <li>
                              Designation: {product.customization.designation}
                            </li>
                            <li>
                              Designation Style:{" "}
                              {product.customization.designationStyle}
                            </li>
                            <li>
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
                                *
                              </span>
                            </li>
                            <li>
                              Logo:{" "}
                              {product.customization.logo ? (
                                <a
                                  className="text-blue-500"
                                  href={product.customization.logo
                                    .replace(
                                      /customised-qviq-cards\/logo\//g,
                                      "customised-qviq-cards%2Flogo%2F"
                                    )
                                    .replace(/images\//g, "images%2F")}
                                  target="_blank"
                                >
                                  View
                                </a>
                              ) : (
                                "N.A."
                              )}
                            </li>
                            <li>
                              Custom Card:{" "}
                              {product.customization.customCard ? (
                                <a
                                  className="text-blue-500"
                                  href={product.customization.customCard
                                    .replace(
                                      /customised-qviq-cards\/cards\//g,
                                      "customised-qviq-cards%2Fcards%2F"
                                    )
                                    .replace(/images\//g, "images%2F")}
                                  target="_blank"
                                >
                                  View
                                </a>
                              ) : (
                                "N.A."
                              )}
                            </li>

                            <li>
                              Card Color: {product.customization.cardColor}{" "}
                              <span
                                style={{
                                  backgroundColor:
                                    product.customization.cardColor,
                                  padding: "2px 5px",
                                  color: "#fff",
                                }}
                              >
                                *
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                      {/* Add more product details here */}
                    </div>
                  ))}
                </TableCell>
                <TableCell>Success ({item.paymentMethod})</TableCell>
                <TableCell>
                  <p>Customer Name: {item.address.fullName}</p>
                  <p>Contact: {item.address.phoneNumber}</p>
                  <div>
                    <span className="text-base">Address:</span>
                    <ul className="list-disc list-inside">
                      <li>Address Line 1: {item.address.addressLine1}</li>
                      <li>Address Line 2: {item.address.addressLine2}</li>
                      <li>City: {item.address.city?.name}</li>
                      <li>State: {item.address.state?.name}</li>
                      <li>Country: {item.address.country?.name}</li>
                      <li>Pincode: {item.address.pincode}</li>
                    </ul>
                  </div>
                  <p className="text-base">Billing Address:</p>
                  <ul className="list-disc list-inside">
                    {!item.sameBillingAddress && item.billingAddress ? (
                      <>
                        <li>Full Name: {item.billingAddress.fullName}</li>
                        <li>
                          Address Line 1: {item.billingAddress.addressLine1}
                        </li>
                        <li>
                          Address Line 2: {item.billingAddress.addressLine2}
                        </li>
                        <li>City: {item.billingAddress.city?.label}</li>
                        <li>State: {item.billingAddress.state?.label}</li>
                        <li>Pincode: {item.billingAddress.pincode}</li>
                        <li>Country: {item.billingAddress.country?.label}</li>
                      </>
                    ) : (
                      <li>Billing address Same as Shipping Address.</li>
                    )}
                  </ul>
                </TableCell>

                <TableCell>
                  <button
                    style={{
                      textWrap: "nowrap",
                      padding: "6px 12px",
                      textAlign: "center",
                      color: "white",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor:
                        !item.order_status || item.order_status == "Queued"
                          ? "#5a71d8"
                          : item.order_status == "In-Progress"
                          ? "#c9cd55"
                          : "#4caf50",
                    }}
                    onClick={(e) => handleStatusChange(item, e.target.value)}
                  >
                    {item.order_status ? item.order_status : "Queued"}
                  </button>
                </TableCell>
                <TableCell>
                  <Button
                    className="bg-[#1976d2]"
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(item)}
                  >
                    View Details
                  </Button>
                </TableCell>

                <TableCell>
                  <Button
                    className="bg-[#676767]"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedInvoice(item);
                    }}
                  >
                    View Invoice
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CenterModal
        onClick={setShowModal}
        onModal={showModal}
        borderTopWidth="0px"
        marginTop="15px"
        marginBottom="15px"
        width="80vw !important"
        maxWidth="850px !important"
        className="!w-[80vw] !max-w-[850px]"
        bottomChild={
          <div className="w-full h-full flex items-center justify-center gap-2">
            <PrimaryButton2
              onClick={downloadAsSinglePDF}
              text="Download PDF"
              width="190px"
            />
          </div>
        }
      >
        <div className="w-full" ref={contentRef}>
          <InvoiceLayout
            username={selectedInvoice?.address?.fullName}
            // company={selectedInvoice?.address?.companyName}
            // gstin={selectedInvoice?.address?.gstin}
            date={selectedInvoice?.now}
            phone={selectedInvoice?.address?.phoneNumber}
            email={selectedInvoice?.address?.email}
            addressLine1={selectedInvoice?.address?.addressLine1}
            addressLine2={selectedInvoice?.address?.addressLine2}
            city={selectedInvoice?.address?.city?.name}
            state={selectedInvoice?.address?.state?.name}
            country={selectedInvoice?.address?.country?.name}
            pincode={selectedInvoice?.address?.pincode}
            billaddressLine1={selectedInvoice?.billingAddress?.addressLine1}
            billaddressLine2={selectedInvoice?.billingAddress?.addressLine2}
            billcity={selectedInvoice?.billingAddress?.city?.name}
            billstate={selectedInvoice?.billingAddress?.state?.name}
            billcountry={selectedInvoice?.billingAddress?.country?.name}
            billpincode={selectedInvoice?.billingAddress?.pincode}
            cart={selectedInvoice?.cart}
          />
        </div>
      </CenterModal>

      {/* Material-UI Dialog for order details */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div>
              <Typography variant="h6">Delivery Details:</Typography>
              <p>Order ID: {selectedOrder.shipRocket?.order_id}</p>
              <p>
                Order Date:{" "}
                {new Date(selectedOrder.now).toLocaleDateString("en-GB")}
              </p>
              <p>Email: {selectedOrder.address.email}</p>
              <p>Customer Name: {selectedOrder.address.fullName}</p>
              <p>Contact: {selectedOrder.address.phoneNumber}</p>
              <p>
                Address: {selectedOrder.address.addressLine1}
                <br />
                {selectedOrder.address.addressLine2},<br />
                {selectedOrder.address.city?.name},
                {selectedOrder.address.state?.name}
                <br />
                {selectedOrder.address.country?.name},
                {selectedOrder.address.pincode}
              </p>
              <Typography variant="h6">Billing Address:</Typography>
              {selectedOrder.billingAddress ? (
                <div>
                  <p>Full Name: {selectedOrder.billingAddress.fullName}</p>
                  <p>
                    Address Line 1: {selectedOrder.billingAddress.addressLine1}
                  </p>
                  <p>
                    Address Line 2: {selectedOrder.billingAddress.addressLine2}
                  </p>
                  <p>City: {selectedOrder.billingAddress.city?.label}</p>
                  <p>State: {selectedOrder.billingAddress.state?.label}</p>
                  <p>Pincode: {selectedOrder.billingAddress.pincode}</p>
                  <p>Country: {selectedOrder.billingAddress.country?.label}</p>
                </div>
              ) : (
                <p>Billing address Same as Shipping Address.</p>
              )}

              <Typography variant="h6">Product Details:</Typography>
              {selectedOrder.cart.map((product, index) => (
                <div key={index}>
                  {product.username != undefined &&
                  product.planType != undefined ? (
                    <>
                      <p>Product: {index + 1}</p>
                      <p>Plan Type: {product.planType}</p>
                      <p>
                        Expiry Date:{" "}
                        {new Date(
                          new Date().getTime() +
                            product.duration * 30 * 24 * 60 * 60 * 1000
                        )?.toLocaleDateString("en-GB")}
                      </p>
                      <p>Username: {product.username}</p>
                    </>
                  ) : (
                    <>
                      <img
                        className="w-24"
                        src={product.coverimages
                          ?.at(0)
                          ?.replace(/images\//g, "images%2F")}
                      />
                      <p>Product: {index + 1}</p>
                      <p>Title: {product.title}</p>
                      <p>Price: {product.price}</p>
                      <p>Quantity: {product.quantity}</p>
                    </>
                  )}
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
                          *
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
                          *
                        </span>
                      </p>
                      <p>
                        Logo:{" "}
                        {product.customization.logo.replace(
                          /images\//g,
                          "images%2F"
                        )}
                      </p>

                      <p>
                        Card Color: {product.customization.cardColor}{" "}
                        <span
                          style={{
                            backgroundColor: product.customization.cardColor,
                            padding: "2px 5px",
                            color: "#fff",
                          }}
                        >
                          *
                        </span>
                      </p>
                    </div>
                  )}
                  {/* Add more product details here */}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            className="bg-[#1976d2] text-white hover:bg-none hover:text-blue-700  "
            onClick={handleCloseDialog}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {statusModal && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-50"></div>
          <div className="absolute rounded-lg flex flex-col justify-around items-center gap-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-gray-100 z-[60]">
            <h2 className="text-lg text-bold">Select Order Status:-</h2>
            <select
              className=" text-base border border-gray-300 px-2 py-1"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value={"Queued"}>Queued</option>
              <option value={"In-Progress"}>In-Progress</option>
              <option value={"Completed"}>Completed</option>
            </select>
            <div className="flex w-full gap-1 justify-around items-center">
              <button
                className=" px-3 py-1 rounded-xl hover:bg-gray-300 text-black w-full"
                onClick={() => setStatusModal(false)}
              >
                Cancel
              </button>
              <button
                className=" px-3 py-1 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-white w-full"
                onClick={handleOrderStatusChange}
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
