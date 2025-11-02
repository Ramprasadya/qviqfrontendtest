import React, { useState, useRef } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useOutsideClick from "../Utils/useOutsideClick";
import Carousel from "./Carousel";
import SimpleCarousel from "./Carousel";

function Card(props) {
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleSvgClick() {
    setIsDropdownOpen((prev) => !prev);
  }

  const handleDelete = (id) => {
    props.setShowDeleteModal((prev) => ({
      show: !prev.show,
      id: id,
    }));
  };

  const handleEdit = (id) => {
    props.setShowEditModal((prev) => ({
      show: !prev.show,
      id: id,
    }));
  };

  useOutsideClick(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const imageArray = [];

  for (let i = 0; i < 4; i++) {
    if (props.img && props.img[i]) {
      imageArray.push(<img key={i} className="card-img" src={props.img[i]} />);
    }
  }

  return (
    <div className="card !max-w-[271px]">
      <div className="card-image-container">
        <SimpleCarousel
          dots={false}
          infinite={true}
          leftPosition="left-1 lg:left-2"
          rightPosition="right-1 lg:right-2"
          data={imageArray && imageArray}
        />
        {/* <img src={props.img} className="card-img" alt={props.title} /> */}

        <div
          className="card-icon z-[1]"
          onClick={handleSvgClick}
          ref={dropdownRef}
        >
          <span>
            <HiOutlineDotsVertical />
          </span>
          <div
            className={`dropdown-menu mt-1.5 ${isDropdownOpen ? "" : "hidden"}`}
          >
            <ul>
              <li
                onClick={() => {
                  handleEdit(props.id);
                }}
              >
                Edit
              </li>
              <li
                onClick={() => {
                  handleDelete(props.id);
                }}
              >
                Delete
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="this-card-body">
        <h2 className="card-title">{props.title}</h2>
        <p className="card-description">{props.description}</p>
        {props.price && (
          <div className="flex items-center justify-between pt-4">
            <h3 className="card-price">₹{props.price}</h3>
            {props.productButton && (
              <button onClick={props.link} className="card-btn rounded-full">
                {props.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
