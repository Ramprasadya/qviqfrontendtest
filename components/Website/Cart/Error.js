import React, { useContext } from "react";
import Navbar from "../header/Navbar";
import { HiXMark } from "react-icons/hi2";
import PrimaryButton2 from "../../UiComponents/PrimaryButton2";
import { useRouter } from "next/navigation";
import { UserContext } from "../../Contexts/context";

const Error = () => {
  const navigate = useRouter();
  const { username } = useContext(UserContext);

  return (
    <div>
      <Navbar showCart />
      <div className="flex flex-col items-center justify-between sm:justify-center p-[20px] h-[700px]">
        <div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-[20px] mt-[48px] mb-[33px] ">
            <div className="flex flex-col items-center justify-center w-[56px] h-[56px] text-white bg-[#CF2828] rounded-full">
              <HiXMark />
            </div>
            <p className="font-[900] text-[24px] leading-[32px] sm:text-[40px] sm:leading-[56px] text-center">
              Opps! Payment failed!
            </p>
          </div>
          <p className=" max-w-[628px] font-[400] text-[14px] leading-[20px] sm:text-[20px] sm:leading-[32px] text-center mb-[62px] ">
            We are sorry, {username}! We couldn’t process your payment. Please
            try again.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full sm:w-fit ">
          <PrimaryButton2
            width={"100%"}
            onClick={() => {
              navigate.push("/cart");
            }}
            text="Try again"
          />
          <button
            className="text-[#FE7171] mt-[35px] font-[500]"
            onClick={() => {
              navigate.push("/");
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
