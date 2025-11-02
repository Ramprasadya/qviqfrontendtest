import { useState, useEffect, useRef } from "react";
import Switch from "react-switch";
import { HiOutlinePlus, HiOutlineDocumentDuplicate } from "react-icons/hi";
function SwitchAndPlus(props) {
  // const [checked, setChecked] = useState(false);

  // state for toggling label
  // const handleChange = () => {
  //   setChecked((prev) => !prev);
  // };
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const dayArr = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  
  let copyRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!copyRef.current.contains(e.target)){
        setModal(false);
      }      
    };
    document.addEventListener("mousedown", handler);
    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });


  return (
    <div className="flex items-center  justify-between">
      <div className="flex items-center gap-x-5">
        <Switch
          onChange={props.dayChange}
          checked={!props.checked}
          onColor="#12A26E"
          offColor="#A7A7A7"
          checkedIcon={false}
          uncheckedIcon={false}
          height={24}
          width={44}
        />
        <p className=" font-medium text-sm">{props.text}</p>
      </div>
      <div className="flex relative items-center gap-3" ref={copyRef}>
        <button
          type="button"
          className="font-sm outline-btn  rounded-full font-semibold"
          disabled={props.checked}
          onClick={props.AddDay}
        >
          <HiOutlinePlus />
        </button>
        <HiOutlineDocumentDuplicate
          className="cursor-pointer"
          onClick={() => setModal((prev) => !prev)}
        />
        {modal && (
          <div
            className="flex flex-col absolute top-full right-[-20px] z-[9999] shadow-lg rounded-[12px] bg-white w-fit p-[8px] mt-[8px]"
            style={{
              border: "1px solid  #F3F3F3",
              background: "#FFF",
              boxShadow: "5px 5px 20px rgba(171, 181, 217, 0.176)",
            }}
          >
            {dayArr.map((day, index) => {
              return (
                <label
                  className="p-2 text-black font-normal  w-[100px] flex flex-row justify-start items-center hover:font-bold hover:bg-[#F3F3F3] rounded-[8px]"
                  onClick={() => {
                    props.handleDuplicateBtn(props.text, day);
                    // setModal(false);
                  }}
                >
                  <input
                    // defaultChecked={f}
                    type="checkbox"
                    className="ml-[5px] mr-[15px]"
                    onChange={() => setChecked(!checked)}
                    onClick={() => {
                      props.handleDuplicateBtn(props.text, day);
                    }}
                  />
                  {day}
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SwitchAndPlus;
