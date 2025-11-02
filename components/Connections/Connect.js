import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { padding } from "@mui/system";
import { useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { serverUrl } from "../../config";

const styles = {
  containerBox: {
    maxWidth: 400,
    margin: "auto",
    padding: 20,
    boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2)",
    border: "0.0625rem solid #e0e0e0",
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formGroup: {
    margin: "1.25rem 0",
  },
  input: {
    width: "20.4375rem",
  },
};


export default function Connect() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [services, setServices] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState([]);

  const { profile } = useParams();
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`${serverUrl}/connect/connect/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile,
        name,
        email,
        services,
        message,
        phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          //console.log(data.error);
        } else {
          toast.success("Connect added successfully");
          setName("");
          setEmail("");
          setServices("");
          setMessage("");
          setPhone("");
        }
      });
  }
  const fetchContact = async () => {
    const { data } = await axios.get(
      `${serverUrl}/connect/getContact/${profile}`
    );
    setContact(data);
    
  };
  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div style={styles.containerBox}>
       {/* <ToastContainer /> */}
      <h2>Let's Connect</h2>
      {contact.length == 0 ? (
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <TextField
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <TextField
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#546804",
                width: "20.4375rem",
                borderRadius: "0.75rem",
                padding: "0.75rem, 1.5rem, 0.75rem, 1.5rem",
              }}
              type="submit"
            >
              SEND INQUIRY
            </Button>
          </div>
        </form>
      ) : (
        <>
          {contact.map((obj, index) => (
            <form onSubmit={handleSubmit} key={index}>
              <div style={styles.formGroup}>
                <TextField
                  label={obj.fullName == null ? "Full Name" : obj.fullName}
                  variant="outlined"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <TextField
                  label={obj.email == null ? "Email" : obj.email}
                  variant="outlined"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <TextField
                  label={
                    obj.mobileNumber == null
                      ? "Mobile Number"
                      : obj.mobileNumber
                  }
                  variant="outlined"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <TextField
                  label={obj.message == null ? "Message" : obj.message}
                  variant="outlined"
                  multiline
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#546804",
                    width: "20.4375rem",
                    borderRadius: "0.75rem",
                    padding: "0.75rem, 1.5rem, 0.75rem, 1.5rem",
                  }}
                  type="submit"
                >
                  SEND INQUIRY
                </Button>
              </div>
            </form>
          ))}
        </>
      )}
    </div>
  );
}
