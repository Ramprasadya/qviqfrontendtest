import React, { useEffect, useState } from "react";
import ContactBox from "./ContactBox";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../config";
import { getCookie } from "../utils";

export default function Profile() {
  const [toggleStates, setToggleStates] = useState([]);
  const { profile } = useParams();
  const [openContact, setOpenContact] = useState(false);
  const navigate = useNavigate();
  const fetchreview = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await Axios.get(
        `${serverUrl}/getUser/getUser/${profile}`,
        config
      );
      setToggleStates(data);
      
      setOpenContact(data[0].contactForm);
    } catch (error) {
      //console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchreview();
  }, []);

  return (
    <div className="card">
      <ContactBox open={openContact} setOpenContact={setOpenContact} />

      <div className="card-header">
        <h1 className="name">Your Name</h1>
      </div>
      <hr />
      <div className="card-body">
        <p className="info">
          <span className="info-title">Email:</span>
          <span className="info-content">Your Email</span>
        </p>
        <p className="info">
          <span className="info-title">Phone:</span>
          <span className="info-content">Your Phone Number</span>
        </p>
        <p className="info">
          <span className="info-title">Website:</span>
          <span className="info-content">
            <a href="https://www.example.com">Your Website</a>
          </span>
        </p>
        <p className="info">
          <span className="info-title">Address:</span>
          <span className="info-content">Your Address</span>
        </p>
      </div>
    </div>
  );
}
