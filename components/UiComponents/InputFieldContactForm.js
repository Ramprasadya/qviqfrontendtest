import React, { useState } from "react";
import "./UiStyles.css";
import "./iconTextStyle.css";
function InputFieldContactForm(props) {
  const [text, setText] = useState("");

  const handleIconClick = () => {
    props.setIsEditing(true);
  };

  const handleSaveClick = () => {
    props.setIsEditing(false);
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="contact-form-input-field">
      {props.isEditing ? (
        <div className="flex flex-row justify-between">
          <input type="text" value={props.value} onChange={props.onChange} />
          <button
            className="add-icon"
            style={{
              marginTop: "7px",
              marginLeft: "17px",
              fontSize: "14px",
              color: "red",
            }}
            onClick={props.onClick}
          >
            Save
          </button>
        </div>
      ) : (
        <div onClick={handleIconClick}>
          <span
            style={{
              width: "14.813rem",
              marginTop: ".5rem",
              marginLeft: "1.25rem",
              overflow: "hidden",
              fontWeight: "500",
              fontSize: "0.875rem",
            }}
          >
            {props.value || props.field}
          </span>

          <div>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              style={{
                width: "2.016rem",
                height: "1.3rem",
                marginTop: "1rem",
                marginLeft: "2.2rem",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg> */}

            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{
                  width: "2.016rem",
                  height: "1.3rem",
                  marginTop: "1rem",
                  marginLeft: "2.2rem",
                }}
              >
                <g clipPath="url(#clip0_2292_2451)">
                  <path
                    d="M11.2411 2.99111L12.3661 1.86612C12.8543 1.37796 13.6457 1.37796 14.1339 1.86612C14.622 2.35427 14.622 3.14573 14.1339 3.63388L4.55479 13.213C4.20234 13.5654 3.76762 13.8245 3.28993 13.9668L1.5 14.5L2.03319 12.7101C2.17548 12.2324 2.43456 11.7977 2.78701 11.4452L11.2411 2.99111ZM11.2411 2.99111L13 4.74999"
                    stroke="url(#paint0_linear_2292_2451)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_2292_2451"
                    x1="14.5"
                    y1="1.5"
                    x2="-0.0209542"
                    y2="3.50954"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FB6609" />
                    <stop offset="1" stopColor="#E40849" />
                  </linearGradient>
                  <clipPath id="clip0_2292_2451">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputFieldContactForm;
