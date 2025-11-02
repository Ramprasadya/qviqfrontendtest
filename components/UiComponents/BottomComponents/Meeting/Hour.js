import * as React from 'react';
import {useState} from "react";
// import axios from "axios";
// import Tapop  from '../../Image/tapop.png'
// import { QRCode } from 'react-qrcode-logo';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
import {
 
  FacebookIcon,
  FacebookShareButton,

} from "react-share";
function Hour(){

  const sharelink ="www.devbuilder.in"

  return (
    <>
    <FacebookShareButton url={sharelink} quote={"ayush"} hashtag={"#rightforu"}>
      <FacebookIcon size={40} round={true}/>
    </FacebookShareButton>
      fg
  
    </>
  )
}

export default Hour
