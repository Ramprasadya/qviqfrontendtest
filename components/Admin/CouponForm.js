"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { Card } from "reactstrap";
import {
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { getCookie } from "../utils";
import { UserContext } from "../Contexts/context";

const CouponForm = () => {
  const { adminSignOut } = useContext(UserContext);
  const [formData, setFormData] = useState({
    code: "",
    couponType: "normal",
    autoApply: false,
    specialOffer: "",
    discount: "",
    discountType: "INR",
    productIds: [],
    plans: [],
    validFrom: "",
    validUntil: "",
  });
  const [status, setStatus] = useState("");

  const plans = [
    { title: "Starter - Monthly", id: "starter_monthly" },
    { title: "Starter - Quarterly", id: "starter_quarterly" },
    { title: "Starter - Yearly", id: "starter_yearly" },
    { title: "Pro - Monthly", id: "pro_monthly" },
    { title: "Pro - Quarterly", id: "pro_quarterly" },
    { title: "Pro - Yearly", id: "pro_yearly" },
  ];

  const specialOfferList = [
    "BUY1GET1FREE",
    "LIMITED-EDITION",
    "EARLY-ACCESS",
    "BLACK-FRIDAY",
  ];

  const [products, setProducts] = useState([]);
  const navigate = useRouter();

  useEffect(() => {
    const isAdmin = getCookie("jwt_token_admin") ? true : false;
    if (!isAdmin) {
      navigate.push("/");
    }
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token_admin"),
      },
    };
    axios
      .get(`${serverUrl}/product/getProducts/all`, config)
      .then((response) => setProducts(response.data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        if (error?.response?.data?.error == "INVALID_ADMIN_TOKEN") {
          adminSignOut();
          navigate.push("/admin");
        }
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (value.includes("Total")) {
      if (name == "plans") {
        setIsPlanTotalSelected(true);
      }
      if (name == "productIds") {
        setIsProductTotalSelected(true);
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: ["Total"],
      }));
    } else {
      if (name == "plans") {
        setIsPlanTotalSelected(false);
      }
      if (name == "productIds") {
        setIsProductTotalSelected(false);
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [isPlanTotalSelected, setIsPlanTotalSelected] = useState(false);
  const [isProductTotalSelected, setIsProductTotalSelected] = useState(false);
  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token_admin"),
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      code,
      couponType,
      autoApply,
      specialOffer,
      discount,
      productIds,
      plans,
      discountType,
      validFrom,
      validUntil,
    } = formData;

    axios
      .post(
        `${serverUrl}/coupon/addCoupon`,
        {
          code,
          couponType,
          autoApply,
          specialOffer,
          discount,
          discountType,
          productIds,
          plans,
          validFrom,
          validUntil,
        },
        config
      )
      .then((response) => {
        setStatus("Coupon Added Successfully!");
        setTimeout(() => {
          setStatus("");
        }, 4000);
        setIsPlanTotalSelected(false);
        setIsProductTotalSelected(false);
        setFormData({
          code: "",
          couponType: "normal",
          autoApply: false,
          specialOffer: "",
          discount: "",
          discountType: "Percent",
          productIds: [],
          plans: [],
          validFrom: "",
          validUntil: "",
        });
      })
      .catch((error) => {
        setStatus(error?.response?.data?.error);
        setTimeout(() => {
          setStatus("");
        }, 4000);
        console.error("Error adding coupon:", error);
      });
  };

  return (
    <div>
      <Card sx={{ padding: "16px", maxWidth: "800px", margin: "0 auto" }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Add Coupon
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Coupon Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />

            <RadioGroup
              name="couponType"
              value={formData.couponType}
              onChange={handleChange}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="normal"
                control={<Radio />}
                label="normal"
                style={{ marginRight: "20px" }}
              />
              <FormControlLabel
                value="special"
                control={<Radio />}
                label="special"
                style={{ marginRight: "20px" }}
              />
            </RadioGroup>

            {formData.couponType == "special" && (
              <TextField
                label="specialOffer"
                name="specialOffer"
                select
                SelectProps={{
                  multiple: false,
                  value: formData.specialOffer,
                  onChange: handleChange,
                }}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                {specialOfferList.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {formData.couponType == "special" && (
              <RadioGroup
                name="autoApply"
                value={formData.autoApply}
                onChange={handleChange}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Enable Auto Apply"
                  style={{ marginRight: "20px" }}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Disable Auto Apply"
                  style={{ marginRight: "20px" }}
                />
              </RadioGroup>
            )}

            <TextField
              label="Discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              type="number"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <RadioGroup
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="INR"
                control={<Radio />}
                label="INR"
                style={{ marginRight: "20px" }}
              />
              <FormControlLabel
                value="Percent"
                control={<Radio />}
                label="Percent"
                style={{ marginRight: "20px" }}
              />
            </RadioGroup>
            <TextField
              label="Products"
              name="productIds"
              select
              SelectProps={{
                multiple: true,
                value: formData.productIds,
                onChange: handleChange,
              }}
              fullWidth
              margin="normal"
              variant="outlined"
            >
              <MenuItem
                value="Total"
                onClick={() => setIsProductTotalSelected(true)}
              >
                Total
              </MenuItem>
              {products.map((product) => (
                <MenuItem
                  key={product._id}
                  value={product._id}
                  disabled={isProductTotalSelected}
                  onClick={() => setIsProductTotalSelected(false)}
                >
                  {product.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Plans"
              name="plans"
              select
              SelectProps={{
                multiple: true,
                value: formData.plans,
                onChange: handleChange,
              }}
              fullWidth
              margin="normal"
              variant="outlined"
            >
              <MenuItem
                value="Total"
                onClick={() => setIsPlanTotalSelected(true)}
              >
                Total
              </MenuItem>
              {plans.map((plan) => (
                <MenuItem
                  key={plan.id}
                  value={plan.id}
                  disabled={isPlanTotalSelected}
                  onClick={() => setIsPlanTotalSelected(false)}
                >
                  {plan.title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Valid From"
              name="validFrom"
              type="datetime-local"
              value={formData.validFrom}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Valid Until"
              name="validUntil"
              type="datetime-local"
              value={formData.validUntil}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                (formData.productIds.length == 0 &&
                  formData.plans.length == 0) ||
                formData.code == "" ||
                formData.discount == ""
              }
            >
              Add Coupon
            </Button>
            <div className="mt-2 text-base font-medium text-black">
              {status}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CouponForm;
