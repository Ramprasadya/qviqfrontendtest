import React, { useEffect, useState } from "react";
import { HiOutlineXCircle } from "react-icons/hi";
import Axios from "axios";
import { serverUrl } from "../../config";
import { getCookie } from "../utils";

function Image(props) {
  const profile = props.profile;
  function handleDelete(id) {
    const name = props.profile;
    const response = fetch(
      `${serverUrl}/record/record/deleteimg/${props.profile}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
        body: JSON.stringify({
          name,
          id,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          //console.log(data.error);
        } else {
          
          props.setDummyState((prevState) => prevState + 1);
        }
      });
  }
  return (
    <div className="relative">
      <img
        src={props.item.image}
        alt="indoor"
        className=" h-20 w-20 rounded-lg block"
      />
      <span
        style={{ cursor: "pointer", padding: "0" }}
        className="z-10 absolute right-1.5 top-1.5 rounded-full w-4 h-4 bg-white flex items-center justify-center"
        onClick={() => handleDelete(props.item._id)}
      >
        <HiOutlineXCircle color="#817C7C" />
      </span>
    </div>
  );
}

export default Image;
