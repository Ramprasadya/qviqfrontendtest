import React from "react";
import emptycart from "../Images/emptyCart.png";
import Navbar from "../Website/header/Navbar";
import PrimaryButton2 from "./PrimaryButton2";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EmptyCart() {
  const navigate = useRouter();

  return (
    <div>
      <div className="min-h-[110px]">
        <Navbar />
      </div>
      <div
        className=" flex flex-col justify-center items-center"
        style={{ height: "calc(100vh - 110px)" }}
      >
        <Image
          alt="emptycart"
          className="xsm:w-[144px] xsm:h-[138px] sm:w-[194px] sm:h-[188px] xl:w-[216px]  xl:h-[208px] mb-[36px] sm:mb-[48px]"
          src={emptycart}
        />
        <h1 className="xsm:text-[24px] sm:text-[30px]   xl:text-[32px] mb-[24px] font-black text-center text-[22px]">
          Your shopping cart <br className="block sm:hidden" /> is empty!
        </h1>
        <p className="xsm:text-[16px] sm:text-[20px] xl:text-[24px]  md:mb-[48px] color-[#817C7C] text-center text-[14px] p-[8px] xsm:p-[0px]">
          Looks like you haven't added anything{" "}
          <br className="hidden xsm:block md:hidden " /> to your cart yet
        </p>
        <div className="pb-[36px] mt-auto md:mt-0 sm:w-[360px] sm:h-[58px] w-[240px] h-[40px] xsm:w-[320px] xsm:h-[48px] xl:w-[476px] xl:h-[56px]">
          <PrimaryButton2
            width={"100%"}
            text={"Back to Products"}
            onClick={() => {
              navigate.push("/products");
            }}
          />
        </div>
      </div>
    </div>
  );
}
