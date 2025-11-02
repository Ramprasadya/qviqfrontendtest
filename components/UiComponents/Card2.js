import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
function Card2(props) {
  return (
    <div className="card2">
      <div className="card2-image-container">
        <img src={props.img} className="card-img" alt={props.title} />

        <div onClick={props.cardClick}>
          <HiOutlineDotsVertical />
        </div>
      </div>

      <div className="this-card2-body">
        <h2 className="card2-title">{props.title}</h2>
        <p className="card2-description">{props.description}</p>
      </div>
    </div>
  );
}

export default Card2;