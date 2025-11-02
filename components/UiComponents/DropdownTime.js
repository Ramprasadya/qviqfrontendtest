import { useState, useEffect, useRef } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

function DropdownTime(props) {
  const options = [
    // { name: "Select", value: "Select" },
    { name: "12:00 AM", value: "12:00 AM" },
    { name: "12:15 AM", value: "12:15 AM" },
    { name: "12:30 AM", value: "12:30 AM" },
    { name: "12:45 AM", value: "12:45 AM" },
    { name: "1:00 AM", value: "1:00 AM" },
    { name: "1:15 AM", value: "1:15 AM" },
    { name: "1:30 AM", value: "1:30 AM" },
    { name: "1:45 AM", value: "1:45 AM" },
    { name: "2:00 AM", value: "2:00 AM" },
    { name: "2:15 AM", value: "2:15 AM" },
    { name: "2:30 AM", value: "2:30 AM" },
    { name: "2:45 AM", value: "2:45 AM" },
    { name: "3:00 AM", value: "3:00 AM" },
    { name: "3:15 AM", value: "3:15 AM" },
    { name: "3:30 AM", value: "3:30 AM" },
    { name: "3:45 AM", value: "3:45 AM" },
    { name: "4:00 AM", value: "4:00 AM" },
    { name: "4:15 AM", value: "4:15 AM" },
    { name: "4:30 AM", value: "4:30 AM" },
    { name: "4:45 AM", value: "4:45 AM" },
    { name: "5:00 AM", value: "5:00 AM" },
    { name: "5:15 AM", value: "5:15 AM" },
    { name: "5:30 AM", value: "5:30 AM" },
    { name: "5:45 AM", value: "5:45 AM" },
    { name: "6:00 AM", value: "6:00 AM" },
    { name: "6:15 AM", value: "6:15 AM" },
    { name: "6:30 AM", value: "6:30 AM" },
    { name: "6:45 AM", value: "6:45 AM" },
    { name: "7:00 AM", value: "7:00 AM" },
    { name: "7:15 AM", value: "7:15 AM" },
    { name: "7:30 AM", value: "7:30 AM" },
    { name: "7:45 AM", value: "7:45 AM" },
    { name: "8:00 AM", value: "8:00 AM" },
    { name: "8:15 AM", value: "8:15 AM" },
    { name: "8:30 AM", value: "8:30 AM" },
    { name: "8:45 AM", value: "8:45 AM" },
    { name: "9:00 AM", value: "9:00 AM" },
    { name: "9:15 AM", value: "9:15 AM" },
    { name: "9:30 AM", value: "9:30 AM" },
    { name: "9:45 AM", value: "9:45 AM" },
    { name: "10:00 AM", value: "10:00 AM" },
    { name: "10:15 AM", value: "10:15 AM" },
    { name: "10:30 AM", value: "10:30 AM" },
    { name: "10:45 AM", value: "10:45 AM" },
    { name: "11:00 AM", value: "11:00 AM" },
    { name: "11:15 AM", value: "11:15 AM" },
    { name: "11:30 AM", value: "11:30 AM" },
    { name: "11:45 AM", value: "11:45 AM" },
    { name: "12:00 PM", value: "12:00 PM" },
    { name: "12:15 PM", value: "12:15 PM" },
    { name: "12:30 PM", value: "12:30 PM" },
    { name: "12:45 PM", value: "12:45 PM" },
    { name: "1:00 PM", value: "1:00 PM" },
    { name: "1:15 PM", value: "1:15 PM" },
    { name: "1:30 PM", value: "1:30 PM" },
    { name: "1:45 PM", value: "1:45 PM" },
    { name: "2:00 PM", value: "2:00 PM" },
    { name: "2:15 PM", value: "2:15 PM" },
    { name: "2:30 PM", value: "2:30 PM" },
    { name: "2:45 PM", value: "2:45 PM" },
    { name: "3:00 PM", value: "3:00 PM" },
    { name: "3:15 PM", value: "3:15 PM" },
    { name: "3:30 PM", value: "3:30 PM" },
    { name: "3:45 PM", value: "3:45 PM" },
    { name: "4:00 PM", value: "4:00 PM" },
    { name: "4:15 PM", value: "4:15 PM" },
    { name: "4:30 PM", value: "4:30 PM" },
    { name: "4:45 PM", value: "4:45 PM" },
    { name: "5:00 PM", value: "5:00 PM" },
    { name: "5:15 PM", value: "5:15 PM" },
    { name: "5:30 PM", value: "5:30 PM" },
    { name: "5:45 PM", value: "5:45 PM" },
    { name: "6:00 PM", value: "6:00 PM" },
    { name: "6:15 PM", value: "6:15 PM" },
    { name: "6:30 PM", value: "6:30 PM" },
    { name: "6:45 PM", value: "6:45 PM" },
    { name: "7:00 PM", value: "7:00 PM" },
    { name: "7:15 PM", value: "7:15 PM" },
    { name: "7:30 PM", value: "7:30 PM" },
    { name: "7:45 PM", value: "7:45 PM" },
    { name: "8:00 PM", value: "8:00 PM" },
    { name: "8:15 PM", value: "8:15 PM" },
    { name: "8:30 PM", value: "8:30 PM" },
    { name: "8:45 PM", value: "8:45 PM" },
    { name: "9:00 PM", value: "9:00 PM" },
    { name: "9:15 PM", value: "9:15 PM" },
    { name: "9:30 PM", value: "9:30 PM" },
    { name: "9:45 PM", value: "9:45 PM" },
    { name: "10:00 PM", value: "10:00 PM" },
    { name: "10:15 PM", value: "10:15 PM" },
    { name: "10:30 PM", value: "10:30 PM" },
    { name: "10:45 PM", value: "10:45 PM" },
    { name: "11:00 PM", value: "11:00 PM" },
    { name: "11:15 PM", value: "11:15 PM" },
    { name: "11:30 PM", value: "11:30 PM" },
    { name: "11:45 PM", value: "11:45 PM" },
    { name: "11:59 PM", value: "11:59 PM" },
  ];
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [isDropDownVisible2, setIsDropDownVisible2] = useState(false);

  let menuRef = useRef();
  let menuRef2 = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setIsDropDownVisible(false);
      }
      if (!menuRef2.current?.contains(e.target)) {
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
    props.onDelete(props.id);
  };

  return (
    <div className="flex items-center gap-x-[8px] sm:gap-x-6 ">
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
            {itemlist
              .filter((item, idx) => {
                if (
                  !props.userSelected2 ||
                  new Date("1/1/2000 " + props.userSelected2).getTime() >
                    new Date("1/1/2000 " + item.value).getTime()
                )
                  return true;
                return false;
              })
              .map((item, index) => (
                <div
                  key={item.value}
                  className="dropdown-item"
                  onClick={(e) => {
                    let newComponents = JSON.parse(
                      JSON.stringify(props.components)
                    );
                    newComponents = newComponents.map((element) => {
                      if (element.id == props.id) {
                        element.userSelected1 = item.value;
                      }
                      return element;
                    });
                    // console.log(props.components);
                    // console.log(newComponents[props.idx]);
                    props.setComponents(newComponents);
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
            {itemlist
              .filter((item, idx) => {
                if (
                  !props.userSelected1 ||
                  new Date("1/1/2000 " + props.userSelected1).getTime() <
                    new Date("1/1/2000 " + item.value).getTime()
                )
                  return true;
                return false;
              })
              .map((item, index) => (
                <div
                  key={item.value}
                  className="dropdown-item"
                  onClick={(e) => {
                    let newComponents = JSON.parse(
                      JSON.stringify(props.components)
                    );
                    newComponents = newComponents.map((element) => {
                      if (element.id == props.id) {
                        element.userSelected2 = item.value;
                      }
                      return element;
                    });
                    // console.log(props.components);
                    // console.log(newComponents[props.idx]);
                    props.setComponents(newComponents);
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
      <span className="m-[14px] cursor-pointer " onClick={handleDelete}>
        <HiOutlineTrash />
      </span>
    </div>
  );
}

export default DropdownTime;
