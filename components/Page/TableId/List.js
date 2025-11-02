import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../../config";

function List() {
  const [id, setId] = useState([]);
  const navigate = useNavigate();
  const getCode = async () => {
    try {
      const res = await axios.get(`${serverUrl}/person/get/`);
      setId(res.data);
      

      if (res.data.length === 0) {
        navigate("/no");
      } else {
        
      }
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    getCode();
  });
  
  return (
    <div>
      <h1>The List of all id</h1>
      {id.map((id) => (
        <>
          <p>
            {id._id}-{id.personName}
          </p>
          <p></p>
        </>
      ))}
    </div>
  );
}

export default List;
