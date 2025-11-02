import React, { useState, useRef, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useOutsideClick from "../Utils/useOutsideClick";
import Carousel from "./Carousel";
import SimpleCarousel from "./Carousel";
import Slider from "react-slick";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Image from "next/image";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="none z-10 absolute w-[30px] h-[30px] p-1 rounded-full bg-white text-xl shadow-[0_2px_8px_0_rgba(171,181,217,0.14)]"
      style={{
        ...style,
        border: "1px solid black",
        transform: "translateX(125px)",
      }}
      onClick={onClick}
    >
      <HiChevronRight />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="none z-10 absolute w-[30px] h-[30px] p-1 rounded-full bg-white text-xl shadow-[0_2px_8px_0_rgba(171,181,217,0.14)]"
      style={{
        ...style,
        border: "1px solid black",
        transform: "translateX(-125px)",
      }}
      onClick={onClick}
    >
      <HiChevronLeft />
    </div>
  );
}

function CardPS(props) {
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

  // -------------------------------------------

  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    if (typeof props.data.image === "string") {
      setImageArray([props.data.image]);
    }

    if (typeof props.data.image === "object") {
      setImageArray([...props.data.image]);
    }
  }, [props.dummyState]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    className: "w-[260px] h-[260px] object-contain rounded-[12px]",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div
      className={`card !max-w-[271px] ${
        props.usedIn === "product" && "cursor-pointer"
      }`}
    >
      {props.usedIn === "product" ? (
        <div
          className="card-image-container w-[260px] h-[260px]"
          onClick={() => props.setOpenProductModal(true)}
        >
          {imageArray[0] && (
            <Image
              alt="product image"
              property
              src={imageArray[0]}
              width={260}
              height={260}
              className="w-[260px] h-[260px] object-contain rounded-[12px]"
              quality={25}
              loading="eager"
            />
          )}

          {/* <Slider
          {...settings}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {imageArray.map((item, index) => {
            return (
              <Image
                alt="product image"
                property
                key={index}
                src={imageArray[0]}
                width={260}
                height={260}
                className="w-auto h-auto object-contain rounded-[12px]"
                quality={25}
                loading="eager"
              />
            );
          })}
        </Slider> */}
        </div>
      ) : (
        <div
          className="flex flex-row w-full h-[64px] cursor-pointer "
          onClick={() => props.setOpenServiceModal(true)}
        >
          {imageArray[0] && (
            <Image
              alt="product image"
              property
              src={imageArray[0]}
              width={260}
              height={260}
              className="w-[64px] h-[64px] object-cover rounded-full"
              quality={25}
              loading="eager"
            />
          )}
        </div>
      )}

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

      <div className="this-card-body">
        <h2 className="card-title cursor-default ">{props.title}</h2>

        <div
          className={`${
            props.usedIn === "product"
              ? "proDescriptionBox"
              : "servDescriptionBox"
          }`}
        >
          <p
            className={`${
              props.usedIn === "product"
                ? "productCard-description"
                : "serviceCard-description"
            }`}
          >
            <span className="cursor-default">
              {props.description.substring(0, 65)}
            </span>{" "}
            <a
              onClick={() => {
                (props.setOpenProductModal &&
                  props.setOpenProductModal(true)) ||
                  (props.setOpenServiceModal &&
                    props.setOpenServiceModal(true));
              }}
              className={`underline font-bold cursor-pointer ${
                props.description.length > 65 ? "" : "hidden"
              } `}
            >
              Read More..
            </a>
          </p>
        </div>

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
        {props.serviceButton && (
          <div className="flex items-center justify-end -mt-[30px]">
            <button onClick={props.link} className="card-btn rounded-full">
              {props.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardPS;
