import React from "react";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}

function InputField(props) {
  props = useDefaultProps(props);
  const style = {
    border: props.border,
    padding: "0.563em 0.875em",
    outline: "none",
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius,
    fontSize: props.fontSize,
    marginBottom: props.marginBottom,
    backgroundColor: props.isReadOnly ? "#F3F3F3" : props.backgroundColor,
    color: props.color ? props.color : "#1A1A1A",
    textAlign: props.align ? props.align : "left",
  };

  return (
    <div className="flex flex-col w-full">
      {props.label && (
        <label htmlFor="myInput" className="label-field">
          {props.label}
        </label>
      )}
      <input
        placeholder={props.placeholder}
        id="myInput"
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        style={style}
        defaultValue={props.defaultValue}
        disabled={props.isDisabled}
        readOnly={props.isReadOnly}
        className={props.className}
      />
    </div>
  );
}

const defaultProps = {
  placeholder: "",
  width: "17.875rem",
  type: "text",
  borderRadius: "8px",
  isDisabled: false,
  border: "1px solid #DFDBD8",
};
export default InputField;
