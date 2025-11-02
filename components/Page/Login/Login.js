import React, { useState, useEffect } from "react";
import "./App2.css";
import { useNavigate, useParams } from "react-router-dom";

// import { Link } from 'react-router-dom'
// import  Toast  from "../../Toast/toast";
import ToastContainer from "../../Toast/toastContai";
// import "react-toastify/dist/ReactToastify.css";
import { serverUrl } from "../../../config";
import { clientUrl } from "../../../config";

import axios from "axios";
// this on web page
function Login() {
  const { Code } = useParams();
  // console.log(Code);
  // console.log(Code);
  // const location =useLocation();
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });
  const getCode = async () => {
    try {
      const res = await axios.get(`${serverUrl}/person/getid/${Code}`);

      if (res.data.length === 0) {
        
      } else {
        
        const email = res.data.email;
        // console.log(email);
        if (email === "abc.com") {
          
        } else {
          // console.log("no");
          navigate(`/Succes/${Code}`);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getCode();
  });

  const addItem = async () => {
    // this adding admin  on web page
    try {
      const Qr = `${clientUrl}/login/${Code}`;

      await axios.put(`${serverUrl}/person/updated/${Code}`, {
        personName: values.name,
        email: values.email,
        phone: values.phoneNo,
        Qr: Qr,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />

      <form>
        <label for="email">
          <b>Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          onChange={(e) =>
            setvalues((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
        <label for="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          onChange={(e) =>
            setvalues((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
        <label for="psw">
          <b>Phone no</b>
        </label>
        <input
          type="number"
          placeholder="Enter phoneNo"
          name="phone"
          onChange={(e) =>
            setvalues((prev) => ({ ...prev, phoneNo: e.target.value }))
          }
          required
        />

        <hr />

        <p>By creating an account you agree to our .</p>
        <button
          type="submit"
          className="registerbtn"
          onClick={(e) => {
            addItem(e.preventDefault());
          }}
        >
          Register
        </button>

        <div className="signin">
          <p>Already have an account?.</p>
        </div>
      </form>
    </>
  );
}
export default Login;
