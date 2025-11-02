"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils";
import { UserContext } from "../Contexts/context";

const CouponList = () => {
  const {adminSignOut} = useContext(UserContext);
  const [coupons, setCoupons] = useState([]);
  const navigate = useRouter();
  useEffect(() => {
    const isAdmin = getCookie("jwt_token_admin")?true:false;
    if (!isAdmin) {
      navigate.push("/");
    }
    axios
      .get(`${serverUrl}/coupon/getCoupons`)
      .then((response) => setCoupons(response.data))
      .catch((error) => {
        console.error("Error fetching coupons:", error);
        if(error?.response?.data?.error == "INVALID_ADMIN_TOKEN"){
          adminSignOut();
          navigate.push("/admin");
        }
      });
  }, []);
  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token_admin"),
    },
  };
  const handleDelete = (couponId) => {
    axios
      .delete(`${serverUrl}/coupon/deleteCoupon/${couponId}`, config)
      .then(() => {
        setCoupons((prevCoupons) =>
          prevCoupons.filter((coupon) => coupon._id !== couponId)
        );
      })
      .catch((error) => console.error("Error deleting coupon:", error));
  };

  return (
    <div>
      <h2>Coupon List</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Discount Type</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Plans</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon._id}>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.discount}</TableCell>
                <TableCell>{coupon.discountType}</TableCell>
                <TableCell>{coupon.productIds.join(", ")}</TableCell>
                <TableCell>{coupon.plans?.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(coupon._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CouponList;
