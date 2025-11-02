import { useState, useEffect, useRef } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

function DropdownTimeBussinessH(props) {
  const options = [
    // { name: "Select", value: "Select" },
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

  let menuRef = useRef();
  let menuRef2 = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsDropDownVisible(false);
      }
      if (!menuRef2.current.contains(e.target)) {
        setIsDropDownVisible2(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const [itemlist, setItemlist] = useState(options);

  const handleDelete = () => {
    props.onDelete(props.selectedDay);
  };

  return (
    <div className="flex items-center gap-x-[8px] sm:gap-x-6" >
      {/* 1st dropdown  */}
      <div className="custom-dropdown w-[109px] sm:w-[240px]" ref={menuRef}>
        <div
          className="custom-dropdown-selection"
          onClick={() => setIsDropDownVisible((prev) => !prev)}
        >
          {/* {console.log("Bc", props.userSelected1)} */}
          {props.userSelected1 || "Select"}
          {/* {props.userSelected1} */}
          <span>
            <HiOutlineChevronDown />
          </span>
        </div>
        {/* options  */}
        {isDropDownVisible ? (
          <div className="items-holder">
            {itemlist.map((item, index) => (
              <div
                key={item.value}
                className="dropdown-item"
                onClick={(e) => {
                  props.setUserSelected1(item.value);
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

      <p>To</p>

      {/* 2nd dropdown  */}
      <div className="custom-dropdown w-[109px] sm:w-[240px]" ref={menuRef2}>
        <div
          className="custom-dropdown-selection"
          onClick={() => setIsDropDownVisible2((prev) => !prev)}
        >
          {props.userSelected2 || "Select"}
          {/* {props.userSelected2} */}
          <span>
            <HiOutlineChevronDown />
          </span>
        </div>
        {/* options  */}
        {isDropDownVisible2 ? (
          <div className="items-holder">
            {itemlist.map((item, index) => (
              <div
                key={item.value}
                className="dropdown-item"
                onClick={(e) => {
                  props.setUserSelected2(item.value);
                  setIsDropDownVisible2((prev) => !prev);
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

      <span className="m-[14px]" onClick={handleDelete}>
        <HiOutlineTrash />
      </span>
    </div>
  );
}

export default DropdownTimeBussinessH;
