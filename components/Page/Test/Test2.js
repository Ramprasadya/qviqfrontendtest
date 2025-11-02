import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../../../config";

// import { Link } from "react-router-dom";
// import {  BsFillShareFill } from 'react-icons/bs';
// import QRCode from 'react-qr-code';
// import QRCode2 from 'qrcode.react';
// import axios from "axios";
// import Tapop  from '../../Image/tapop.png'
// import red from '../../Image/red1.png';
// // // import red from '../../Image/red1.png'
// import blue from '../../Image/blue1.png'
// import green from '../../Image/green1.png'
// import pink from '../../Image/pink1.png'
// import violet from '../../Image/violet1.png'
// // import y from '../uploads/'
// import yellow from '../../Image/yellow1.png'
// import './App2.css'
// // import QrCodeStylingComponent from "../../QrCodeStylingComponent";
// import QrCodeStylingComponent from '../../Styling/QrCodeStylingComponent';
// // import { Link } from 'react-router-dom'
// import {useNavigate} from 'react-router-dom'
var value = {};
const Succes = () => {
  const [value, setvalues] = useState([]);
  const [checkValue, setcheckValue] = useState("");

  const [freeisChecked, setFreeIsChecked] = useState(false);
  const [starterIsChecked, setstarterIsChecked] = useState(false);
  const [proIsChecked, setproIsChecked] = useState(false);

  //  colour

  const { Code } = useParams();

  const getQRcode = async () => {
    

    try {
      const res = await axios.get(`${serverUrl}/person/getid/${Code}`);
      if (res.data == null) {
        
        navigate("/nodata");
      } else if (res.data === "error") {
        navigate("/nodata");
      } else {
        //  value=res.data
        setvalues(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getQRcode();
  }, []);
  const ci = (
    <img
      className="previe-img"
      src={require(`../uploads/imgae-1676879177550. d-removebg.png`)}
      alt={value.image}
    />
  );
  // const qr_image  = <img className="qr-image" src={require(`../uploads/${value.image}`)} alt={value.image} />
  const b = value.image;

  const handleChange = (e) => {
    // const a =freeisChecked || starterIsChecked || proIsChecked
    // console.log(a);

    switch (checkValue) {
      case "free":
        
        axios.post(`${serverUrl}/plan/post`, {
          personName: value.personName,
          email: value.email,
          starter: false,
          pro: false,
        });
        break;
      case "Starter":
        
        axios.post(`${serverUrl}/plan/post`, {
          personName: value.personName,
          email: value.email,
          starter: true,
          pro: false,
        });
        break;
      case "Pro":
        
        axios.post(`${serverUrl}/plan/post`, {
          personName: value.personName,
          email: value.email,
          starter: false,
          pro: true,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="pre">
        <h1>Select your Plan</h1>
        <div className="checkbox-container">
          <label for="pro">free</label>
          <input
            type="checkbox"
            value="free"
            checked={freeisChecked}
            onChange={(e) => {
              setcheckValue(e.target.value);
              setFreeIsChecked(!freeisChecked);
            }}
          />
        </div>
        <div className="checkbox-container">
          <label for="pro">Starter</label>
          <input
            type="checkbox"
            value="Starter"
            checked={starterIsChecked}
            onChange={(e) => {
              setcheckValue(e.target.value);
              setstarterIsChecked(!starterIsChecked);
            }}
          />
        </div>
        <div className="checkbox-container">
          <label for="pro">Pro</label>
          <input
            type="checkbox"
            value="Pro"
            checked={proIsChecked}
            onChange={(e) => {
              setcheckValue(e.target.value);
              setproIsChecked(!proIsChecked);
            }}
          />
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleChange();
        }}
      >
        subit
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Test2;
