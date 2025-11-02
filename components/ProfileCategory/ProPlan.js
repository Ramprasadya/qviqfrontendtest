import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { serverUrl } from "../../config";

export default function ProPlan() {
  const navigate = useNavigate();
  const { profile } = useParams();
  const handlePlanSelect = (plan) => {
    fetch(`${serverUrl}/tapopuser/proplan/${profile}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    })
      .then((res) => {
        if (res.ok) {
          
          navigate(`/chooseprofile/${profile}`);
        } else {
          console.error(`Error selecting plan: ${res.statusText}`);
        }
      })
      .catch((err) => {
        console.error(`Error selecting plan: ${err}`);
      });
  };

  return (
    <>
      <Button onClick={() => handlePlanSelect(1)}>1 month</Button>
      <Button onClick={() => handlePlanSelect(3)}>3 months</Button>
      <Button onClick={() => handlePlanSelect(6)}>6 month</Button>
      <Button onClick={() => handlePlanSelect(12)}>1 year</Button>
    </>
  );
}
