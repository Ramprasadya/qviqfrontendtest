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

const OfferList = () => {
  const {adminSignOut} = useContext(UserContext);
  const [offers, setOffers] = useState([]);
  const navigate = useRouter();
  useEffect(() => {
    const isAdmin = getCookie("jwt_token_admin")?true:false;
    if (!isAdmin) {
      navigate.push("/");
    }
    axios
      .get(`${serverUrl}/admin/offer/getOffers`)
      .then((response) => setOffers(response.data))
      .catch((error) => console.error("Error fetching offers:", error));
  }, []);
  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token_admin"),
    },
  };
  const handleDelete = (offerId) => {
    axios
      .delete(`${serverUrl}/admin/offer/deleteOffer/${offerId}`, config)
      .then(() => {
        setOffers((prevOffers) =>
          prevOffers.filter((offer) => offer._id !== offerId)
        );
      })
      .catch((error) => {
        console.error("Error deleting offer:", error);
        if(error?.response?.data?.error == "INVALID_ADMIN_TOKEN"){
          adminSignOut();
          navigate.push("/admin");
        }
      });
  };

  return (
    <div>
      <h2>Offer List</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Plans</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Selection Count</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer._id}>
                <TableCell>{offer.code}</TableCell>
                <TableCell>{offer.plans?.join(", ")}</TableCell>
                <TableCell>{offer.productIds.join(", ")}</TableCell>
                <TableCell>{offer.selectionCount}</TableCell>
                <TableCell>{offer.price}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(offer._id)}
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

export default OfferList;
