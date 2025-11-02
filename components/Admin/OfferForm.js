"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { Card } from "reactstrap";
import { CardContent, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { getCookie } from "../utils";
import { UserContext } from "../Contexts/context";

const OfferForm = () => {
  const {adminSignOut} = useContext(UserContext);
  const [formData, setFormData] = useState({
    code: "",
    plans:[],
    productIds: [],
    selectionCount:1,
    price: "",
  });
  const [status,setStatus] = useState("");

  const plans = [
    {
      title:"Starter - Monthly",
      id:"starter_monthly",
    },
    {
      title:"Starter - Quarterly",
      id:"starter_quarterly",
    },
    {
      title:"Starter - Yearly",
      id:"starter_yearly",
    },
    {
      title:"Pro - Monthly",
      id:"pro_monthly",
    },
    {
      title:"Pro - Quarterly",
      id:"pro_quarterly",
    },
    {
      title:"Pro - Yearly",
      id:"pro_yearly",
    },
  ]

  const [products, setProducts] = useState([]);
  const navigate = useRouter();
  useEffect(() => {
    const isAdmin = getCookie("jwt_token_admin")?true:false;
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
        if(error?.response?.data?.error == "INVALID_ADMIN_TOKEN"){
          adminSignOut();
          navigate.push("/admin");
        }
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (value.includes("Total")) {
      if(name == "plans"){
        setIsPlanTotalSelected(true);
      }
      if(name == "productIds"){
        setIsProductTotalSelected(true);
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: ["Total"],
      }));
    } else {
      if(name == "plans"){
        setIsPlanTotalSelected(false);
      }
      if(name == "productIds"){
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
    let { code, price, productIds, plans, selectionCount } = formData;
    axios
      .post(
        `${serverUrl}/admin/offer/addOffer`,
        {
          code,
          price,
          selectionCount,
          productIds,
          plans,
        },
        config
      )
      .then((response) => {
        setStatus("Offer Added Successfully!");
        setTimeout(()=>{
          setStatus("");
        },4000);
        setIsPlanTotalSelected(false);
        setIsProductTotalSelected(false);
        setFormData({
          code: "",
          price: "",
          selectionCount: 1,
          productIds: [],
          plans: [],
        });
      })
      .catch((error) =>{
        setStatus(error?.response?.data?.error);
        setTimeout(()=>{
          setStatus("");
        },4000);
        console.error("Error adding Offer:", error)
      });
  };

  return (<div>
    <Card sx={{ padding: "16px", maxWidth: "800px", margin: "0 auto" }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Add Offer
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Offer Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          {/* <TextField
            label="Selection Count"
            name="selectionCount"
            value={formData.selectionCount}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
          /> */}
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
              <MenuItem value="Total" onClick={() => setIsProductTotalSelected(true)}>
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
              <MenuItem value="Total" onClick={() => setIsPlanTotalSelected(true)}>
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
            <Button type="submit" variant="contained" color="primary" disabled={
              formData.productIds.length == 0 ||
              formData.plans.length == 0 ||
              formData.code == "" ||
              formData.price == ""
            }>
              Add Offer
            </Button>
            <div className="mt-2 text-base font-medium text-black">{status}</div>
        </form>
      </CardContent>
    </Card>
  </div>);
};

export default OfferForm;
