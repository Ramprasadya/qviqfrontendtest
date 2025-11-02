import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../../config";

import { Button } from "@mui/material";

export default function Table() {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [input, setinput] = useState("");

  const getPerson = async () => {
    try {
      const res = await axios.get(`${serverUrl}/person/geting`);
      setUser(res.data);
    } catch (error) {
      //console.log("error");
    }
  };
  const handleChange = (e) => {
    try {
      
      navigate(`/login/${e}`, { replace: true });
    } catch (error) {
      //console.log("error");
    }
  };

  useEffect(() => {
    getPerson();
  }, []);
  const columns2 = [
    { field: "_id", headerName: "Phone no", width: 251 },
    { field: "personName", headerName: "Person Name", width: 100 },
    { field: "email", headerName: "Email id", width: 200 },
    {
      field: "Button",
      headerName: "Login page",
      width: 200,
      renderCell: (params) => {
        return (
          <Button onClick={(e) => handleChange(params.id)}>LoginPage</Button>
        );
      },
    },
  ];

  return (
    <>
      <h1>List of all person data</h1>
      <div
        style={{
          height: 400,
          marginLeft: 20,
          marginRight: 50,
          marginTop: 20,
          width: "50%",
        }}
      >
        <DataGrid
          rows={user}
          disableSelectionOnClick
          columns={columns2}
          getRowId={(row) => row._id}
          pageSize={12}
        />
        <h1>Enter the Id</h1>
        <div className="user">
          <input
            type="text"
            value={input}
            placeholder="Enter the code"
            onInput={(e) => setinput(e.target.value)}
          />
          <Link to={`/login/${input}`}>
            <button className="home-btn">Click me</button>
          </Link>
        </div>
      </div>
    </>
  );
}
