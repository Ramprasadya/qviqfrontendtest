import { width } from "@mui/system";
import React, { useState } from "react";
import { HiOutlinePencil, HiCheck } from "react-icons/hi";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function EditText(props) {props = useDefaultProps(props);
  // state for text field
  const [changeText, setChangeText] = useState("");

  // onchange function
  const handleChange = (event) => {
    setChangeText((prev) => {
      return event.target.value;
    });
  };

  // onclick state for pencil icon
  const [edit, setEdit] = useState(false);

  const style = {
    color: props.color,
    cursor: "pointer",
  };
  return (
    <div className="ed-bg ">
      <div className="flex items-center gap-3.5 dd">
        <input
          onChange={edit ? handleChange : () => { }}
          type="text"
          className="type-ip"
          placeholder={!edit ? "Type here" : ""}
          value={changeText}
        />
      </div>
      <span style={style} onClick={() => setEdit((prev) => !prev)}>
        {!edit ? <HiOutlinePencil /> : <HiCheck />}
      </span>
    </div>
  );
}

const defaultProps = {
  // text: {changeText},
  color: "red",
};

export default EditText;
