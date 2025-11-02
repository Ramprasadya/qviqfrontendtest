import React, { useState } from "react";
import Switch from "react-switch";
import { HiOutlinePlus, HiOutlineDocumentDuplicate } from "react-icons/hi";
function SwitchAndPlus2(props) {
  // const [checked, setChecked] = useState(false);

  // state for toggling label
  // const handleChange = () => {
  //   setChecked((prev) => !prev);
  // };
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
      
    </div>
  );
}

export default SwitchAndPlus2;
