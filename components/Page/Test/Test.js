import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast/toast";
import ToastContainer from "../Toast/toastContai";
// import "react-toastify/dist/ReactToastify.css";
import ReactWhatsapp from "react-whatsapp";
import { serverUrl } from "../../../config";

// import Meeting from '../Meeting/Busisseshour'
// import axios from "axios";
// import Tapop  from '../../Image/tapop.png'
// import { QRCode } from 'react-qrcode-logo';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
function Test() {
  const navigate = useNavigate();
  // const [counter, setCounter] = useState(5);
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const addItem = () => {
    if (!message || !number) {
      // Toast.error("Enter all the details");
      return;
    } else {
      
    }
  };
  const sentMessage = async () => {
    try {
      await axios.post(`${serverUrl}/sms/post`, {
        number: number,
        message: message,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="App">
        <ToastContainer position="bottom-center" limit={1} />
        <form>
          <label for="psw">
            <b>Phone no</b>
          </label>
          <input
            id="number"
            placeholder="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <br />
          <br />
          <br />
          <input
            id="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <br />
          <br />
          <br />
          <hr />

          <button
            type="submit"
            onClick={() => sentMessage()}
            className="registerbtn"
          >
            sent{" "}
          </button>

          <ReactWhatsapp number={number} message={message}>
            Open Whatsapp
          </ReactWhatsapp>

          <div className="signin"></div>
        </form>

        {/* <Meeting/> */}
      </div>
    </>
  );
}

export default Test;
