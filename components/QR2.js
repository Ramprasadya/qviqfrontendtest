import React, { useState } from "react";
// import {useRef} from 'react'
import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import QRCode from "qrcode";
import axios from "axios";
// import tapop from '../components/Image/tapop.png'
// import tapop from '../Image/tapop.png'
// import QrReader from 'react-qr-scanner'
// import {  useNavigate } from "react-router-dom";
import { serverUrl } from "../config";
import { getCookie } from "./utils";

function QR2() {
  // const navigate = useNavigate();
  const [textFlied, setextFlid] = useState("");
  const [imageUrl, setImgeUrl] = useState("");
  const [color] = useState("#2DCDDF");
  // const [result1,setResult] = useState('');
  // const [foundEntry2 ,setfoundEntry] =useState([]);
  // const  inputRef = useRef(null);
  const generatedQrcode = async () => {
    try {
      const res = await QRCode.toDataURL(textFlied, {
        color: {
          dark: color, // black dots
          // light: '#ffffff' // white background
        },
      });
      setImgeUrl(res);
      // let url = await QRCode.toDataURL(new_card.data)
    } catch (error) {
      console.log(error);
    }
  };
  //  const getQRcode =async() =>{
  // try {

  // const res = await axios.get(`${serverUrl}/QR/getQR/${Code}`)
  // console.log(res.data.length);
  // if (res.data.length===0) {
  //   navigate('/no')

  // }else{
  //   setfoundEntry(res.data)
  // }
  // }
  //           catch (error) {console.log(error);}
  // }
  // useEffect(()=>{
  //   getQRcode();
  // //  console.log(menus);
  // },[])
  // const handleError =(error)=>{
  //   alert(error);
  // }
  // const handleScanFile =(result)=>{
  //   if (result ===null) {
  //   } else {
  //     if (result) {
  //       console.log(result);
  //       var len =(result.text.length)
  //         setResult(result.text)
  //         console.log(len);

  //     }
  //   }
  // }
  const onScanFile = async () => {
    await axios.post(`
      `);
  };
  return (
    <>
      <Container>
        <Card>
          <h2>Please Scan Your Qr Code </h2>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xl={4} md={6} sm={12} xm={12}>
                <TextField
                  lable="Enter the code here"
                  onChange={(e) => setextFlid(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => generatedQrcode()}
                >
                  Genterate
                </Button>
                {imageUrl ? (
                  <a href={imageUrl} download>
                    <img src={imageUrl} alt="img" />
                  </a>
                ) : null}
              </Grid>
              <Grid item xl={4} md={6} sm={12} xm={12}>
                {/* <QrReader ref={inputRef} delay={5} style={{width: '50%'}} onError={handleError} onScan={handleScanFile}/> */}
              </Grid>
            </Grid>
            <Button variant="contained" color="secondary" onClick={onScanFile}>
              Genterate the demo Data
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default QR2;
