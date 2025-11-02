import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

import React from "react";

function Dropdown(props) {
  const options = [
    { name: "12:00 AM", value: "12:00 AM" },
    { name: "1:00 AM", value: "1:00 AM" },
    { name: "2:00 AM", value: "2:00 AM" },
    { name: "3:00 AM", value: "3:00 AM" },
    { name: "4:00 AM", value: "4:00 AM" },
    { name: "5:00 AM", value: "5:00 AM" },
    { name: "6:00 AM", value: "6:00 AM" },
    { name: "7:00 AM", value: "7:00 AM" },
    { name: "8:00 AM", value: "8:00 AM" },
    { name: "9:00 AM", value: "9:00 AM" },
    { name: "10:00 AM", value: "10:00 AM" },
    { name: "11:00 AM", value: "11:00 AM" },
    { name: "12:00 PM", value: "12:00 PM" },
    { name: "1:00 PM", value: "1:00 PM" },
    { name: "2:00 PM", value: "2:00 PM" },
    { name: "3:00 PM", value: "3:00 PM" },
    { name: "4:00 PM", value: "4:00 PM" },
    { name: "5:00 PM", value: "5:00 PM" },
    { name: "6:00 PM", value: "6:00 PM" },
    { name: "7:00 PM", value: "7:00 PM" },
    { name: "8:00 PM", value: "8:00 PM" },
    { name: "9:00 PM", value: "9:00 PM" },
    { name: "10:00 PM", value: "10:00 PM" },
    { name: "11:00 PM", value: "11:00 PM" },
  ];

  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [isDropDownVisible2, setIsDropDownVisible2] = useState(false);

  const [itemlist, setItemlist] = useState(options);

  // const [userSelected, setUserSelected] = useState(null);
  // console.log(userSelected);
  return (
    <div className="custom-dropdown">
      <div
        className="custom-dropdown-selection"
        onClick={() => setIsDropDownVisible((prev) => !prev)}
      >
        {/* {userSelected ? itemlist[userSelected].name : "Select"} */}
        {props.userSelected}
        <span>
          <HiOutlineChevronDown />
        </span>
        {props.userSelected2}
      </div>
      {/* options  */}
      {isDropDownVisible ? (
        <div className="items-holder">
          {itemlist.map((item, index) => (
            <div
              key={item.value}
              className="dropdown-item"
              onClick={(e) => {
                props.setUserSelected(item.value);
                setIsDropDownVisible((prev) => !prev);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      
    </div>
  );
}

export default Dropdown;
