import React, { useEffect } from "react";
import { useRef } from "react";
import Iphone from "../Iphone";
import "./tapopQr.css";
import { useState } from "react";

// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { BsFillShareFill } from "react-icons/bs";
import { HiOutlineDownload, HiOutlineUpload } from "react-icons/hi";
// import {  HiXCircle } from "react-icons/hi";
import IconButton from "../IconButton";
import banner from "./images/banner.png";

import axios from "axios";
import { QRCode } from "react-qrcode-logo";
import Tapop from "../../Image/tapop.png";

import QrCodeStylingComponent from "./Styling/QrCodeStylingComponent";
import { useNavigate } from "react-router-dom";
import SecondaryButtonLogo from "../SecondaryButtonLogo";
import { serverUrl } from "../../../config";

// import { useTimeout } from "react-use";
// import QRCodeStyling from "qr-code-styling";
function TapopQr(props) {
  // const [toggleStates, setToggleStates] = useState([]);
  const [pcolour, setpcolour] = useState([
    "#000000",
    "#883B95",
    "#31228D",
    "#4B870F",
    "#0B8567",
    "#007AA0",
    "#C56722",
    "#EE8F00",
    "#891212",
    "#031D61",
    "#430361",
    "#610346",
  ]);
  // Seeting the value from the backend  to the value use state
  const [value, setvalues] = useState(null);
  // Seeting the image value to the value use state
  const [img, setImage] = useState(Tapop?.src);
  // state  the Qr value to state
  const [Qrvalue, setQrvalue] = useState("www.qviq.io");
  const [checked, setIsChecked] = useState(false);
  const [file, setFile] = useState("");
  // const [fileName, setFileName] = useState([]);
  // Setting the colour of Qr  to the State
  const [color, setColor] = useState("black");
  const [bakendColour, setBackcolor] = useState("black");
  const inputRef = useRef(null);

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    
    setImages(imageList);
  };
  

  // const {Code} = useParams();
  const Code = "640049833ae4899c7e204814";
  // console.log(value);

  // removing files from image fileArray

  // setId
  // const location =useLocation();
  // const navigate = useNavigate();

  // To get the person data from backend
  const getQRcode = async () => {
    try {
      // const a ='640049833ae4899c7e204814'
      const res = await axios.get(`${serverUrl}/person/getid/${Code}`);
      
      if (res.data == null) {
        
        // navigate('/nodata')
      } else if (res.data === "error") {
      } else {
        
        setBackcolor(res.data.colour);
        setImage(require(`../../Qrimage/${res.data.image}`));
        setQrvalue(res.data.Qr);
        // console.log(img);
        setvalues(res.data);

        // if (value != "null") {
        //   // console.log("csdwd",value);
        // } else {
        //   console.log("Data is empty");
        // }
      }
    } catch (error) {
      // console.log(error);
    }
  };
  //  Redendering the component at once
  useEffect(() => {
    getQRcode();
  }, []);
  useEffect(() => {
    // setIsChecked(false)
  });
  // const removeFile = () => {
  //   setFileName([]);
  //   setFile([]);
  // };
  // // mapping array for files
  // const mArray = fileName.map((item) => (
  //   <div className="upload-content rounded-full">
  //     <p>{item.name}</p>
  //     <span onClick={removeFile}>{item.icon}</span>
  //   </div>
  // ));

  // const setimgfile = (e) => {
  //   setFile(e.target.files[0]);
  // };
  // console.log(file);
  // console.log(""+value);

  //   to submit the form of update and color
  const onSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("photo", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.put(
      `${serverUrl}/person/updatedimage/${Code}`,
      formData
    );
    
  };
  // To download the qr code
  const downloadQR = () => {
    setIsChecked(true);
  };

  // To change the qr image in value
  const changeColour = async () => {
    await axios.put(`${serverUrl}/person/updatedColour/${Code}`, {
      colour: color,
    });
  };
  const setimgfile = (e) => {
    setFile(e.target.files[0]);
    
  };

  return (
    <div
      className={
        props.current === "Qviq QR" ? " mt-6 mx-6 bottom-container " : "hidden"
      }
    >
      <div className="left">
        <div className="flex items-center justify-between">
          <p className="qr-heading">QviqQr</p>
          <SecondaryButtonLogo
            text="Download QR"
            icon={<HiOutlineDownload />}
            onClick={() => downloadQR()}
          />
        </div>
        <p className="pt-8 font-semibold">Select a Color</p>

        <div className="flex items-center">
          <div className="color-pack ">
            {pcolour.map((item,index) => {
              return (
                <div
                  key={index}
                  className="w-10 h-10 rounded-lg cursor-pointer"
                  style={{ backgroundColor: item }}
                  onClick={() => setColor(item)}
                ></div>
              );
            })}
          </div>
          <div className="qr-code">
            <QRCode
              id="123456"
              value={"ayush"}
              logoImage={Tapop}
              fgColor={color}
              ecLevel="L"
              removeQrCodeBehindLogo="true"
              size="252"
              logoHeight="50"
            />
          </div>
        </div>

        <h1 className="font-semibold">Custom QR with Logo/image</h1>
        <div className="pt-4">
          <img src={banner} alt="banner" />
        </div>
        {/* fddjfd */}
        {/* image input-1 starts here  */}
        {/* <form className="card-body" onSubmit={onSubmit} encType="multipart/form-data"> */}
        <form className="card-body" onSubmit={onSubmit}>
          <div
            className="add-image px-5"
            onClick={() => inputRef.current.click()}
          >
            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
                e.target.value = "";
              }}
              type="file"
              accept="*"
              className="file-input"
              ref={inputRef}
              hidden
              onFocus={(e) => (e.target.value = null)}
            />

            {/* <IconButton icon={<HiOutlineUpload />}  /> */}
            <div className="pt-3">
              <p className="image-text">
                Upload or drag and drop document files
              </p>
              <p className="image-text">
                (pdf, doc, docx, ppt, xls, etc.) to showcase your profile
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onSubmit();
              changeColour();
            }}
          >
            Save button
          </button>
        </form>
      </div>
      {/* <IconButton icon={<HiOutlineUpload />}  onChangeImage={onChangeImage}onChange={setimgfile}  image={images}/> */}

      <div
        className="align-center flex-col overflow-hidden hidden xl:block"
        style={{ padding: "0 42px" }}
      >

        <Iphone
          toggleStates={props.toggleStates}
          profile={props.profile}
          template={props.type}
        />

        {/* {console.log(img)} */}
        {/* {(value) } */}

        <QrCodeStylingComponent
          id={1234567}
          checked={checked}
          setChecked={setIsChecked}
          data={Qrvalue}
          fgColor={bakendColour}
          centerImageSrc={img}
        ></QrCodeStylingComponent>
      </div>
      {/* <div id="canvas"/> */}
    </div>
  );
}

export default TapopQr;
