import React from "react";
import GiftImg from "./gift.svg";
import Image from "next/image";
import { GoCheckCircleFill } from "react-icons/go";

export default function OfferCard(props) {
  return (
    <div className="flex flex-row sm:gap-[20px] gap-[15px]">
      <div className="sm:w-[120px] w-[80px] sm:h-[102px] h-[80px] flex flex-col justify-center items-center">
        <div className="bg-[#F3F3F3] sm:w-[102px] w-[80px] sm:h-[102px] h-[80px] rounded-full  flex flex-col justify-center items-center">
          <Image
          alt="image"
            src={GiftImg}
            className="sm:w-[70px] w-[50px] sm:h-[70px] h-[50px]"
          />
        </div>
      </div>

      <div className="flex flex-col w-fit gap-[16px]">
        <div>
          {props.usedIn !== "cart" && (
            <p className="sm:text-[20px] text-[16px] font-[700]">
              Get our {props.plan} to avail this card for free.
            </p>
          )}
          <p className="text-[#12A26E] sm:text-[20px] text-[16px] font-[700]">
            One time offer on our {props.plan} 🎉
          </p>
        </div>

        <div className="flex flex-col gap-[12px]">
          <p className="sm:text-[16px] text-[14px] font-[700]">
            You get:
          </p>

          <div className="flex flex-row items-center gap-[12px]">
            <GoCheckCircleFill className="text-[#12A26E]" />
            <p className="sm:text-[16px] text-[14px] font-[500]">
              A free Qviq-smart NFC customised card
            </p>
          </div>

          <div className="flex flex-row items-center gap-[12px]">
            <GoCheckCircleFill className="text-[#12A26E]" />
            <p className="sm:text-[16px] text-[14px] font-[500]">
              {props.plan}
            </p>
          </div>

          <div className="flex flex-row items-center gap-[12px]">
            <GoCheckCircleFill className="text-[#12A26E]" />
            <p className="sm:text-[16px] text-[14px] font-[500]">
              You save ₹ 299
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
