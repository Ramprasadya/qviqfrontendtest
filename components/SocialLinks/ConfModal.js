import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { HiCheck, HiOutlineX } from "react-icons/hi";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import { serverUrl } from "../../config";
import { Diversity1TwoTone } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props,ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfModal({ open, setOpen, platform, onClick }) {
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            borderRadius: "24px",
          },
        }}
        maxWidth="100%"
      >
        <div className="w-screen md:w-[640px] h-fit px-5 md:px-6 py-6 fixed left-0 bottom-0 md:relative bg-[#FFFFFF] rounded-2xl font-poppons">
          <div className="w-full normal text-[20px] leading-[28px] text-[#1A1A1A] font-semibold flex justify-between items-center">
            <p className="text-lg md:text-xl font-semibold">Confirmation!</p>
            <HiOutlineX
              className="hover:cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div className="w-full h-[1px] mt-3 md:mt-[24px] bg-[#F3F3F3] "></div>

          <div className="w-full h-fit mt-[24px] flex-col justify-center items-center">
            {platform !== "" ? (
              <div className="flex flex-col gap-4 items-center">
                <div className="border-[1px] rounded-full">
                  <HiCheck
                    style={{
                      display: "block",
                      margin: "0 auto",
                      width: "80px",
                      height: "80px",
                      borderRadius: "100%",
                    }}
                  />
                </div>
                <p className="w-4/5 text-center text-sm md:text-base">
                  Are you sure you want to remove the changes?
                </p>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <div className="w-full md:w-fit">
              <PrimaryButton2
                width={"100%"}
                onClick={onClick}
                text={"Confirm"}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
