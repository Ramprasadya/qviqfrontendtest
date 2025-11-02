import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { HiOutlineX } from "react-icons/hi";
import PrimaryButton2 from "../../../PrimaryButton2";
import { serverUrl } from "../../../../../config";
import { getCookie } from "@/components/utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteModalContent({
  open,
  setOpen,
  id,
  profile,
  setDummyState,
  dummyState,
  setProductsCards,
  productsCards,
  content,
  setProCount,
  setSerCount,
  type,
  ...props
}) {
  const handleClose = () => {
    setOpen((prev) => ({ ...prev, show: !prev.show }));
  };
  async function handleDeleteID() {
    if (content == "Product") {
      await fetch(
        `${serverUrl}/productsandservices/deleteproduct/${profile}/${id}/${type}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify({ name: profile }),
        }
      );
      setProCount((prev) => prev - 1);
    } else {
      await fetch(
        `${serverUrl}/productsandservices/deleteservice/${profile}/${id}/${type}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify({ name: profile }),
        }
      );
      setSerCount((prev) => prev - 1);
    }
    setDummyState(dummyState);
    props.setOpenProductModal && props.setOpenProductModal(false);
    props.setOpenServiceModal && props.setOpenServiceModal(false)
    const newRecords = productsCards.filter((el) => el._id !== id);
    setProductsCards(newRecords);
    handleClose();
    props.updateTemplateDataHandler();
  }

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
        <div className="w-screen md:w-[510px] h-fit px-5 md:px-6 pt-6 pb-[60px] md:pb-6 fixed left-0 bottom-0 md:relative bg-[#FFFFFF] rounded-t-2xl rounded-b-none md:rounded-b-2xl font-poppons">
          <div className="w-full normal text-[20px] leading-[28px] text-[#1A1A1A] font-semibold flex justify-between items-center">
            <p className="text-lg md:text-xl font-semibold">Delete {content}</p>
            <HiOutlineX
              className="hover:cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div className="w-full h-[1px] mt-3 md:mt-[24px] bg-[#F3F3F3] "></div>

          <div className="w-full h-fit mt-[24px] flex-col justify-center items-center">
            <div className="flex flex-col gap-4 items-center">
              <p className="w-4/5 text-center text-sm md:text-base">
                Are you sure you want to delete the {content} from your profile?{" "}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="w-full md:w-fit">
              <PrimaryButton2
                width={"100%"}
                onClick={handleDeleteID}
                text={"Delete"}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
