import React from "react";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function InputFIeldTextArea(props) {props = useDefaultProps(props);
  const style = {
    width: props.width,
    borderRadius: props.borderRadius,
    fontSize: props.fontSize,
    color: props.color ? props.color : "#1A1A1A",
    border: props.border,
    padding: "0.563em 0.875em",
  };

  return (
    <div className="flex flex-col">
      {props.BnW ? (
        <>
          <label
            htmlFor="myInput"
            className={`label-field-4 ${props.labelStyle}`}
          >
            {props.label}
          </label>
          <textarea
            placeholder={props.placeholder}
            value={props.value}
            rows="5"
            cols=""
            onChange={props.onChange}
            name={props.name}
            className="ip-textarea-4"
            style={style}
          />
        </>
      ) : (
        <>
          <label
            htmlFor="myInput"
            className={`label-field ${props.labelStyle}`}
          >
            {props.label}
          </label>
          <textarea
            placeholder={props.placeholder}
            value={props.value}
            rows="5"
            cols=""
            onChange={props.onChange}
            name={props.name}
            className="ip-textarea"
            style={style}
          />
        </>
      )}
    </div>
  );
}

const defaultProps = {
  label: "Text",
  placeholder: "",
  borderRadius: "8px",
  border: '1px solid #DFDBD8',
  outline: 'none',
};

export default InputFIeldTextArea;
