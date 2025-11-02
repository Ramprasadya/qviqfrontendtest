"use client";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Contexts/context";
import Header from "../header/Navbar";
import { HiCheck } from "react-icons/hi";
import PrimaryButton2 from "../../UiComponents/PrimaryButton2";
import Navbar from "../header/Navbar";
import { useRouter } from "next/navigation";

const Success = ({ searchParams }) => {
  const { formData, handleEmptyCart } = useContext(UserContext);
  useEffect(() => {
    handleEmptyCart();
  }, []);
  const passedData = searchParams.passedData;
  const parsedPassedData = JSON.parse(decodeURIComponent(passedData));
  //console.log(parsedPassedData);
  const navigate = useRouter();
  // const { orderId } = location.state;
  const {
    fullName,
    email,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    country,
  } = formData;
  const orderDate = new Date(parsedPassedData.order_date);
  const estimatedDeliveryDate = new Date(orderDate);
  estimatedDeliveryDate.setDate(orderDate.getDate() + 10);

  const formattedEstimatedDeliveryDate =
    estimatedDeliveryDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  return (
    // <Box
    //   display="flex"
    //   flexDirection="column"
    //   justifyContent="center"
    //   alignItems="center"
    //   height="100vh"
    //   textAlign="center"
    //   bgcolor="#f5f5f5"
    // >
    //   <Box mt={10} mb={6}>
    //     <Typography variant="h4" color="#4caf50">
    //       Your Payment was Successful
    //     </Typography>
    //   </Box>
    //   <Box>
    //     <Typography variant="subtitle1" mb={4}>
    //       We will send your invoice and order confirmation details to your email
    //       address:
    //     </Typography>
    //     <Typography variant="h6" color="#4caf50" mb={4}>
    //       {email}
    //     </Typography>
    //   </Box>
    //   <Box mb={6}>
    //     <Typography variant="subtitle1">Delivery Address:</Typography>
    //     <Typography variant="h6" color="#4caf50">
    //       {fullName}
    //     </Typography>
    //     <Typography variant="body1" color="#4caf50">
    //       {addressLine1}
    //     </Typography>
    //     {addressLine2 && (
    //       <Typography variant="body1" color="#4caf50">
    //         {addressLine2}
    //       </Typography>
    //     )}
    //     <Typography variant="body1" color="#4caf50">
    //       {city}, {state}, {pincode}
    //     </Typography>
    //     <Typography variant="body1" color="#4caf50">
    //       {country}
    //     </Typography>
    //   </Box>
    //   <Box>
    //     <Typography variant="subtitle1">Estimated Delivery:</Typography>
    //     {/* Add your estimated delivery details here */}
    //   </Box>
    //   <Box mt={6}>
    //     <Button component={Link} to="/" variant="contained" color="primary">
    //       Back to Home
    //     </Button>
    //   </Box>
    // </Box>
    <div>
      <Navbar showCart />
      <div className="flex flex-col items-center justify-center px-[20px] md:pt-[96px]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-[20px] mt-[48px] mb-[33px]">
          <div className="flex flex-col items-center justify-center w-[56px] h-[56px] text-white bg-[#12A26E] rounded-full">
            <HiCheck />
          </div>
          <p className="font-[900] text-[24px] leading-[32px] sm:text-[40px] sm:leading-[56px] text-center">
            Your payment was successful! 🎉
          </p>
        </div>
        <p className=" max-w-[628px] font-[400] text-[14px] leading-[20px] sm:text-[20px] sm:leading-[32px] text-center">
          We will send your invoice and order confirmation details to your email
          address {parsedPassedData.address.email.toString()}
        </p>
        <p className="text-[14px] leading-[20px] sm:text-[20px] sm:leading-[32px] mt-[32px] mb-[40px]">
          <span className="font-[500] text-[#817C7C]">Transaction number:</span>
          <span className="font-[700]">
            {" "}
            {parsedPassedData.razorpay_order_id.toString()}
          </span>
        </p>
        <div className="max-w-[600px] bg-white rounded-[12px] p-[32px]">
          <div className="border-b-[1px] border-[#DFDBD8] pb-[20px]">
            <p className="text-[#817C7C]">Delivery to:</p>
            <p className="">
              {parsedPassedData.address.fullName.toString()} <br />
              {parsedPassedData.address.addressLine1.toString()},{" "}
              {parsedPassedData.address.addressLine2.toString()},<br />{" "}
              {parsedPassedData.address.city.name},{" "}
              {parsedPassedData.address.pincode.toString()}
            </p>
          </div>
          <p className="text-[#817C7C] mt-[20px]">Estimated delivery</p>
          <p className="">{formattedEstimatedDeliveryDate}</p>
        </div>
        <div className="flex flex-col items-center justify-center mt-[32px] mb-[80px] w-full sm:w-fit ">
          <PrimaryButton2
            width={"100%"}
            text="Back to Home"
            onClick={() => {
              navigate.push("/");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Success;
