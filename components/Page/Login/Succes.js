import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFillShareFill } from "react-icons/bs";
// import QRCode from 'react-qr-code';
// import QRCode2 from 'qrcode.react';
import axios from "axios";
import { QRCode } from "react-qrcode-logo";
import Tapop from "../../Image/tapop.png";
import red from "../../Image/red1.png";
// // import red from '../../Image/red1.png'
import blue from "../../Image/blue1.png";
import green from "../../Image/green1.png";
import pink from "../../Image/pink1.png";
import violet from "../../Image/violet1.png";
// import y from '../uploads/'
import yellow from "../../Image/yellow1.png";
import "./App2.css";
// import QrCodeStylingComponent from "../../QrCodeStylingComponent";
import QrCodeStylingComponent from "../../Styling/QrCodeStylingComponent";
// import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../../config";

// var value= {};
// const b= '';
const Succes = () => {
  const [value, setvalues] = useState([]);
  const [img, setImage] = useState(false);
  const [checked, setIsChecked] = useState(false);
  const [file, setFile] = useState("");
  const [color, setColor] = useState("black");
  // const {Code} = useParams();
  const { Code } = "640049833ae4899c7e204814";
  // setId

  // const location =useLocation();
  const navigate = useNavigate();

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
    
  };
  async function onSubmit(e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("photo", file);

    
    //   const config = {
    //    headers: {
    //      "Content-Type": "multipart/form-data"
    //    }
    //  }
    await axios.put(
      `${serverUrl}/person/updatedimage/640049833ae4899c7e204814`,
      formData
    );
  }

  const changeColour = async () => {
    await axios.put(
      `${serverUrl}/person/updatedColour/640049833ae4899c7e204814`,
      { colour: color }
    );
  };
  const getQRcode = async () => {
    

    try {
      const res = await axios.get(
        `${serverUrl}/person/getid/640049833ae4899c7e204814`
      );
      
      if (res.data == null) {
        
        // navigate('/nodata')
      } else if (res.data === "error") {
        // navigate('/nodata')s
        
      } else {
        

        setvalues(res.data);
        if (value.image === "null") {
          setImage(true);
        } else {
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getQRcode();
  }, []);

  const changeColor = () => {
    if (checked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  // const image = `../uploads/${value.image}`;
  // const image = require(`../uploads/${value.image}`)
  return (
    <>
      {/* {ci}
{} */}
      <br />
      <br />
      {/* {b} */}
      <h1> Select you ColorQr</h1>
      <div className="image-div">
        <img
          className="qr-img"
          onClick={(e) => setColor(e.target.alt)}
          src={red}
          alt="red"
        />
        <img
          className="qr-img"
          onClick={(e) => setColor(e.target.alt)}
          src={blue}
          alt="blue "
        />
        <img
          className="qr-img"
          onClick={(e) => setColor(e.target.alt)}
          src={green}
          alt="green"
        />
        <img
          className="qr-img"
          onClick={(e) => setColor(e.target.alt)}
          src={pink}
          alt="pink"
        />
        <img
          className="qr-img"
          onClick={(e) => setColor(e.target.alt)}
          src={violet}
          alt="violet"
        />
        <img
          className="qr-img"
          onClick={(e) => setColor(e.target.alt)}
          src={yellow}
          alt="yellow"
        />
      </div>
      {color}
      <br />
      <br />
      <div className="preview">
        {/* <QRCode value="as;dfj;adsf" fgColor={color} Color='red'size="250" logoImage={require(`../uploads/${value.image}`)} /> */}
        <QRCode
          value={value.Qr}
          logoImage={Tapop}
          fgColor={color}
          ecLevel="L"
          removeQrCodeBehindLogo="true"
          size="252"
          logoHeight="50"
        />
      </div>
      <div>
        <button onClick={changeColour}>Change ColorQr </button>
        <br />
        <br />
        <br />
      </div>
      Name:-{value.personName}
      <br />
      Email:-{value.email}
      <br />
      Phone:-{value.phone}
      <br />
      <br />
      {/* {console.log(value.image)} */}
      <button onClick={changeColor}>
        <BsFillShareFill />
      </button>
      <br />
      <br />
      <br />
      {/* logoImage={require(`../uploads/${value.image}`)} */}
      {/* {    console.log(img)} */}
      {/* centerImageSrc={require(`../uploads/${value.image}`)} */}
      <>
        {checked ? (
          <QRCode
            value={value.Qr}
            fgColor={value.colour}
            ecLevel="L"
            removeQrCodeBehindLogo="true"
            size="252"
            logoHeight="50"
          />
        ) : null}{" "}
      </>
      <br />
      <br />
      <br />
      <br />
      <br />
      {img === true ? (
        <>
          {checked ? (
            <QrCodeStylingComponent
              data={value.Qr}
              fgColor={value.colour}
            ></QrCodeStylingComponent>
          ) : null}{" "}
        </>
      ) : (
        <>
          {checked ? (
            <QrCodeStylingComponent
              data={value.Qr}
              fgColor={value.colour}
            ></QrCodeStylingComponent>
          ) : null}{" "}
        </>
      )}
      <br />
      <br />
      <br />
      <div className="container ">
        <form className="card-body" onSubmit={onSubmit}>
          <div className="card-header">
            <h5>Add Custom logo</h5>
          </div>
          <div className="mb-3 form-group">
            <input
              type="file"
              className="form-control"
              id="src"
              placeholder="Enter Image SRC"
              name="photo"
              onChange={setimgfile}
            />
          </div>
          <div className="mb-3 form-group">
            <input
              type="submit"
              value="Add custom logo"
              className="submit-btn btn-primary"
            />
          </div>
        </form>
      </div>
      <Link to="/">Back</Link>
    </>
  );
};

export default Succes;
