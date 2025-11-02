"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { serverUrl } from "../../config";
import { getCookie } from "../utils";

const PricingPage = () => {
  const [pricingData, setPricingData] = useState({});
  const [formValues, setFormValues] = useState({
    pro: {
      monthly: "",
      quarterly: "",
      annual: "",
      offer: "",
      includeOffer: false,
    },
    starter: {
      monthly: "",
      quarterly: "",
      annual: "",
      offer: "",
      includeOffer: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/admin/pricing`);
        setPricingData(response.data);
        setFormValues(response.data);
      } catch (error) {
        console.error("Error fetching pricing data", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (plan, field, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [plan]: {
        ...prevFormValues[plan],
        [field]: value,
      },
    }));
  };

  const handleCheckboxChange = (plan, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [plan]: {
        ...prevFormValues[plan],
        includeOffer: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token_admin"),
      },
    };
    try {
      await axios.put(`${serverUrl}/admin/updatePricing`, formValues, config);
      alert("Pricing data updated successfully!");
    } catch (error) {
      console.error("Error updating pricing data", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Update Pricing
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Pro Plan:</Typography>
            <TextField
              fullWidth
              label="Monthly"
              variant="outlined"
              value={formValues.pro?.monthly || ""}
              onChange={(e) =>
                handleChange(
                  "pro",
                  "monthly",
                  parseInt(e.target.value, 10) || ""
                )
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Quarterly"
              variant="outlined"
              value={formValues.pro?.quarterly || ""}
              onChange={(e) =>
                handleChange(
                  "pro",
                  "quarterly",
                  parseInt(e.target.value, 10) || ""
                )
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Annual"
              variant="outlined"
              value={formValues.pro?.annual || ""}
              onChange={(e) =>
                handleChange(
                  "pro",
                  "annual",
                  parseInt(e.target.value, 10) || ""
                )
              }
              sx={{ marginBottom: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.pro?.includeOffer || false}
                  onChange={(e) =>
                    handleCheckboxChange("pro", e.target.checked)
                  }
                />
              }
              label="Include 11+1 Offer on Annual"
              sx={{ marginBottom: 2 }}
            />
            {formValues.pro?.includeOffer && (
              <TextField
                fullWidth
                label="Offer Amount"
                variant="outlined"
                value={formValues.pro?.offer || ""}
                onChange={(e) =>
                  handleChange(
                    "pro",
                    "offer",
                    parseInt(e.target.value, 10) || ""
                  )
                }
                sx={{ marginBottom: 2 }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Starter Plan:</Typography>
            <TextField
              fullWidth
              label="Monthly"
              variant="outlined"
              value={formValues.starter?.monthly || ""}
              onChange={(e) =>
                handleChange(
                  "starter",
                  "monthly",
                  parseInt(e.target.value, 10) || ""
                )
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Quarterly"
              variant="outlined"
              value={formValues.starter?.quarterly || ""}
              onChange={(e) =>
                handleChange(
                  "starter",
                  "quarterly",
                  parseInt(e.target.value, 10) || ""
                )
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Annual"
              variant="outlined"
              value={formValues.starter?.annual || ""}
              onChange={(e) =>
                handleChange(
                  "starter",
                  "annual",
                  parseInt(e.target.value, 10) || ""
                )
              }
              sx={{ marginBottom: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.starter?.includeOffer || false}
                  onChange={(e) =>
                    handleCheckboxChange("starter", e.target.checked)
                  }
                />
              }
              label="Include 11+1 Offer on Annual"
              sx={{ marginBottom: 2 }}
            />
            {formValues.starter?.includeOffer && (
              <TextField
                fullWidth
                label="Offer Amount"
                variant="outlined"
                value={formValues.starter?.offer || ""}
                onChange={(e) =>
                  handleChange(
                    "starter",
                    "offer",
                    parseInt(e.target.value, 10) || ""
                  )
                }
                sx={{ marginBottom: 2 }}
              />
            )}
          </Grid>
        </Grid>
        <Button
          className="bg-[#1976d2]"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: 2 }}
        >
          Update Pricing
        </Button>
      </form>
    </Container>
  );
};

export default PricingPage;
