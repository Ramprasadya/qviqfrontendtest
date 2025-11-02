import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./table.css";
import { Button } from "@mui/material";
import { serverUrl } from "../../../config";

export default function DummyDataTable() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [input, setinput] = useState("");

  const handleChange = (e) => {
    try {
      
      navigate(`/login/${e}`);
    } catch (error) {
      //console.log("error");
    }
  };
  const getPerson = async () => {
    try {
      const res = await axios.get(`${serverUrl}/person/get/abc.com`);
      setUser(res.data);
    } catch (error) {
      //console.log("error");
    }
  };

  useEffect(() => {
    getPerson();
  }, []);
  const columns2 = [
    { field: "_id", headerName: "Id", width: 250 },
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
      <h1>List of all Dummy data Table</h1>
      <div
        style={{
          height: 400,
          marginLeft: 20,
          marginRight: 100,
          marginTop: 20,
          width: "20%",
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
