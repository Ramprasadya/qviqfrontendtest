import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import BasicUser from "./basicUser";
import ProUser from "./proUser";
import StarterUser from "./starterUser";
import { UserContext } from "../Contexts/context";

const ProductsandServices = () => {
  const [record, setRecord] = useState([]);
  const { profile } = useParams();

  const { userType } = useContext(UserContext);

  return (
    <>
      {userType === "Pro" && <ProUser />}
      {userType === "Free" && <BasicUser />}
      {userType === "Starter" && <StarterUser />}
    </>
  );
};

export default ProductsandServices;
