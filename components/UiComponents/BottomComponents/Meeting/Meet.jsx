import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { Snackbar } from "@mui/base";

function Meet(props) {
  // console.log(props.confirmation );
  // const styles = {
  //     backgroundColor: props.confirmation  ? "red" : "blue",
  // };
  // const btnCan ={paddingLeft:"20%",paddingRight:"20%" ,textAlign:"center", backgroundColor:"white", border:"1px black solid"};
  // const btnConA ={paddingLeft:"15%",paddingRight:"15%" ,textAlign:"center", backgroundColor:"black", color:"white"};
  // const btnCanA ={paddingLeft:"42%",paddingRight:"42%",textAlign: "center", border:"1px black solid",};
  // const btnCon ={paddingLeft:"42%",paddingRight:"42%",textAlign:"center", backgroundColor:"black", color:"white"};
  // const style =props._id?{backgroundColor:"red"}:{backgroundColor:" lightblue"};

  // const confirmStyle = props.confirmation?btnCon:btnConA;
  // const cancelStyle = props.cancel?btnCanA:btnCan;

  // console.log(props.confirmation);
  // console.log(props.confirmation);
  // console.log("dfer"+props.cancel);

  // width: Fixed (528px)
  // height: Fixed (302px)
  // top: 24px
  // left: 24px
  // padding: 20px
  // border-radius: 12px
  // border: 1px
  // gap: 8px

  return (
    <div id={`ID${props.Meet._id}`} className="meeting-card break-all p-[1rem] sm:p-5 rounded-xl border flex flex-col justify-between gap-[8px] drop-shadow-[6px_6px_24px_1px_rgba(171, 181, 217, 0.18)]">
      <div className="meeting-top flex flex-row justify-between">
        <div
          className="status rounded-3xl w-fit h-fit py-2 px-4 text-xs"
          style={{
            backgroundColor: props.cancel
              ? "rgba(255, 226, 226, 1)"
              : props.confirmation
              ? "rgba(224, 251, 241, 1)"
              : "rgba(255, 234, 192, 1)",
            color: props.cancel
              ? "rgba(207, 40, 40, 1)"
              : props.confirmation
              ? "rgba(18, 162, 110, 1)"
              : "rgba(194, 128, 28, 1)",
          }}
        >
          {props.cancel
            ? "Cancelled"
            : props.confirmation
            ? "Confirmed"
            : "Pending"}
        </div>
        <span onClick={props.delMetting}>
          <RiDeleteBin6Line />
        </span>
      </div>

      <div className="meeting-top flex flex-row items-center">
        <div className="p-4 bg-[rgba(240,240,240,0.3)] rounded-full mr-2 w-[48px] sm:w-[52px] h-[48px] sm:h-[52px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7501 6C15.7501 8.07107 14.0712 9.75 12.0001 9.75C9.92902 9.75 8.25009 8.07107 8.25009 6C8.25009 3.92893 9.92902 2.25 12.0001 2.25C14.0712 2.25 15.7501 3.92893 15.7501 6Z"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.50122 20.1182C4.57153 16.0369 7.90196 12.75 12.0001 12.75C16.0983 12.75 19.4288 16.0371 19.499 20.1185C17.2162 21.166 14.6765 21.75 12.0004 21.75C9.32408 21.75 6.78418 21.1659 4.50122 20.1182Z"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <div className="title text-base text-black mb-1">
            {/* {props.Meet.mettingHeadline}  */}
            <p className="text-[14px] sm:text-[16px] font-[500]">
              {props.Meet.name}
            </p>
          </div>
          <div className="details text-sm text-gray-500 ">
            <p>{props.Meet.email}</p>
            <p>{props.Meet.phone}</p>
          </div>
        </div>
      </div>

      <div className="meeting-date text-sm flex flex-row items-center">
        <div className="p-4 bg-[rgba(240,240,240,0.3)] rounded-full mr-2 w-[48px] sm:w-[52px] h-[48px] sm:h-[52px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.25736 4.00736 5.25 5.25 5.25H18.75C19.9926 5.25 21 6.25736 21 7.5V18.75M3 18.75C3 19.9926 4.00736 21 5.25 21H18.75C19.9926 21 21 19.9926 21 18.75M3 18.75V11.25C3 10.0074 4.00736 9 5.25 9H18.75C19.9926 9 21 10.0074 21 11.25V18.75"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="date font-medium">
            {props.Meet.day} {props.Meet.date}{" "}
          </p>
          <p className="time font-light">
            {props.Meet.timeFrom} - {props.Meet.timeTo}
          </p>
        </div>
      </div>

      <div className="meeting-msg font-light text-sm flex flex-row">
        <div className="p-4 bg-[rgba(240,240,240,0.3)] rounded-full mr-2 w-[48px] sm:w-[52px] h-[48px] sm:h-[52px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.625 12C8.625 12.2071 8.45711 12.375 8.25 12.375C8.04289 12.375 7.875 12.2071 7.875 12C7.875 11.7929 8.04289 11.625 8.25 11.625C8.45711 11.625 8.625 11.7929 8.625 12ZM8.625 12H8.25M12.375 12C12.375 12.2071 12.2071 12.375 12 12.375C11.7929 12.375 11.625 12.2071 11.625 12C11.625 11.7929 11.7929 11.625 12 11.625C12.2071 11.625 12.375 11.7929 12.375 12ZM12.375 12H12M16.125 12C16.125 12.2071 15.9571 12.375 15.75 12.375C15.5429 12.375 15.375 12.2071 15.375 12C15.375 11.7929 15.5429 11.625 15.75 11.625C15.9571 11.625 16.125 11.7929 16.125 12ZM16.125 12H15.75M21 12C21 16.5563 16.9706 20.25 12 20.25C11.1125 20.25 10.2551 20.1323 9.44517 19.9129C8.47016 20.5979 7.28201 21 6 21C5.80078 21 5.60376 20.9903 5.40967 20.9713C5.25 20.9558 5.0918 20.9339 4.93579 20.906C5.41932 20.3353 5.76277 19.6427 5.91389 18.8808C6.00454 18.4238 5.7807 17.9799 5.44684 17.6549C3.9297 16.1782 3 14.1886 3 12C3 7.44365 7.02944 3.75 12 3.75C16.9706 3.75 21 7.44365 21 12Z"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="overflow-hidden">{props.Meet.message}</div>
      </div>

      {props.cancel ? (
        <button
          className="text-[14px] sm:text-[16px] rounded-3xl py-1 px-2 sm:py-2 sm:px-6 border-black border-2 w-full flex flex-row justify-center items-center disabled:opacity-60 active:scale-95 active:opacity-85 duration-100"
          onClick={() => {
            props.delMetting();
          }}
        >
          <RiDeleteBin6Line className="mr-1" />
          Delete
        </button>
      ) : (
        <div className="card-button flex flex-row justify-around">
          <button
            className="text-[14px] sm:text-[16px] rounded-3xl py-1 px-2 sm:py-2 sm:px-6 bg-slate-950 text-white mr-1 w-full flex flex-row justify-center items-center disabled:opacity-60"
            disabled={props.cancel || props.confirmation}
            onClick={props.confirmBtn}
          >
            <span className="invert mr-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#1A1A1A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Confirm
          </button>
          <button
            className="text-[14px] sm:text-[16px] rounded-3xl py-1 px-2 sm:py-2 sm:px-6 border-black border-2 w-full flex flex-row justify-center items-center disabled:opacity-60"
            disabled={props.cancel}
            onClick={props.cancelBtn}
          >
            <span className="mr-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.28033 5.21967C5.98744 4.92678 5.51256 4.92678 5.21967 5.21967C4.92678 5.51256 4.92678 5.98744 5.21967 6.28033L8.93934 10L5.21967 13.7197C4.92678 14.0126 4.92678 14.4874 5.21967 14.7803C5.51256 15.0732 5.98744 15.0732 6.28033 14.7803L10 11.0607L13.7197 14.7803C14.0126 15.0732 14.4874 15.0732 14.7803 14.7803C15.0732 14.4874 15.0732 14.0126 14.7803 13.7197L11.0607 10L14.7803 6.28033C15.0732 5.98744 15.0732 5.51256 14.7803 5.21967C14.4874 4.92678 14.0126 4.92678 13.7197 5.21967L10 8.93934L6.28033 5.21967Z"
                  fill="#1A1A1A"
                />
              </svg>
            </span>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Meet;
