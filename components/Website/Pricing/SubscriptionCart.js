import InputField from "@/components/UiComponents/InputField";
import PrimaryButton2 from "@/components/UiComponents/PrimaryButton2";
import PrimaryButton3 from "@/components/UiComponents/PrimaryButton3";
import SecondaryButton from "@/components/UiComponents/SecondaryButton";
import React from "react";

export default function SubscriptionCart(props) {
  return (
    <div className="absolute top-0 left-0 bg-white w-full z-[998] h-full">
      <div>
        <p>Nav</p>
      </div>

      <div className="md:p-[32px] flex flex-col gap-[28px]">
        <div className="font-[700] text-[24px] sm:text-[40px] w-full md:pl-0 pl-[24px]">
          Your subscription plan
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between md4:gap-[40px] md:gap-[24px]">
          <div className="w-full flex flex-col md4:gap-[32px] gap-[24px] md4:p-[32px] p-[24px] rounded-[12px] bg-white shadow-md shadow-gray-200">
            <div className="h-[1px] w-full bg-[#F3F3F3]"></div>
          </div>

          <div className="md:hidden block w-full h-[1px] bg-[#F3F3F3]"></div>

          <div className="bg-white flex flex-col gap-[32px] md4:p-[32px] p-[24px] rounded-[12px] md:max-w-[420px] w-full h-fit shadow-md shadow-gray-200">
            <div className="text-[24px] font-[700]">Plan summary</div>

            <div className="w-full flex flex-col gap-[24px]">
              <div className="w-full flex flex-col gap-[16px]">
                
                <div className="w-full flex flex-col gap-[10px]">
                  <div className="w-full flex flex-row justify-between">
                    <p className="text-[16px] font-[600]">xyz x 3</p>
                    <p className="text-[16px] font-[700]">₹555</p>
                  </div>
                </div>

                <div className="w-full flex flex-row justify-between items-end gap-[12px]">
                  <InputField
                    width="100%"
                    height="45px"
                    label="Have a coupon?"
                    name="Coupon code"
                    type="text"
                    // value={}
                    // onChange={handleInputChange}
                  />
                  <SecondaryButton height="45px" text = "Apply" />
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#DFDBD8]"></div>

              <div className="w-full flex flex-row justify-between">
                <p className="text-[16px] font-[600]">Subtotal</p>
                <p className="text-[16px] font-[700]">₹555</p>
              </div>

              <div className="w-full flex flex-col gap-[16px]">
                <div className="w-full flex flex-row justify-between">
                  <p className="text-[16px] font-[400]">Tax & other charges</p>
                  <p className="text-[16px] font-[700]">₹666</p>
                </div>
                <div className="w-full flex flex-row justify-between">
                  <p className="text-[16px] font-[400]">Delivery charges</p>
                  <p className="text-[16px] font-[700]">₹666</p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#DFDBD8]"></div>

              <div className="w-full flex flex-row justify-between">
                <p className="font-[700] text-[20px]">Total</p>
                <p className="font-[700] text-[20px]">₹666</p>
              </div>
            </div>

            <PrimaryButton2
              text={
                props.isRecurringPayment
                  ? "Proceed with auto renewal"
                  : "Proceed with one time payment"
              }
              onClick={() => {
                //   props.setPaymentModal(false);
                props.handlePlanSelect(
                  props.isRecurringPayment ? "recurring" : "one-time"
                );
              }}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
