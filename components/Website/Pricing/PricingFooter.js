import PrimaryButton from "@/components/UiComponents/PrimaryButton";
import Image from "next/image";
import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import setUp from "../assets/setup.svg";

export default function PricingFooter() {
  const [faq1, setfaq1] = useState(false);
  const [faq2, setfaq2] = useState(false);
  const [faq3, setfaq3] = useState(false);
  const [faq4, setfaq4] = useState(false);
  const [faq5, setfaq5] = useState(false);
  const [faq6, setfaq6] = useState(false);

  return (
    <>
      <div className="w-full px-2 xsm:px-[20px]">
        <div className="relative overflow-hidden bg-[#0A0003] w-full h-fit mt-[104px] xl:px-[64px] sm:px-[40px] px-[20px] xl:py-[56px] lg:py-[30px] sm:py-[25px] py-[20px] rounded-[32px] flex flex-col gap-[20px]">
          <p className="max-w-[668px] sm:pr-[40px] pr-0 md:text-[40px] sm:text-[30px] text-[22px] font-[700] text-white z-[2]">
            Seamless Solutions for Enterprises
          </p>

          <p className="max-w-[798px] md:w-full w-[70%] lg:pr-[40px] md:pr-[230px] test-[20px] font-[400] text-white z-[2]">
            Elevate your business with our enterprise pricing plan, tailored to
            meet the demands of large-scale operations.{" "}
            <b>Contact our sales team </b> to explore solutions for your
            enterprise needs.
          </p>

          <PrimaryButton
            side="right"
            text="Contact Sales"
            // width="122px"
            className="w-fit text-[18px] font-[600] z-[2]"
            icon={<GoArrowRight className="text-[20px]" />}
            onClick={() => navigate.push("/contact")}
          />

          <Image
            src={setUp}
            alt="image"
            className="absolute z-[1] bottom-0 right-0 w-auto md:h-full sm:h-[70%] h-[50%]"
          />

          <div
            className="absolute z-0 w-[320px] h-[320px] rounded-full bottom-0 right-0"
            style={{
              filter: "blur(100px)",
              transform: "translate(10%, 38%)",
              background: "#736CED",
            }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full px-3 pt-16  sm:pt-24 xsm:px-[20px]">
        <p className="font-[800] text-[24px] leading-[32px] sm:text-[48px] sm:leading-[64px] text-center text-[#0A0003]">
          Got questions? We're here to help
        </p>
        <div className="w-full sm:max-w-[750px] mt-6 xsm:mt-[52px] sm:mt-[60px] font-[700] text-[16px] leading-[24px] sm:text-[24px] sm:leading-[32px]">
          <div className="px-3 py-5 xsm:p-[20px] sm:pb-[36px] border-b-[1px] border-[#0A0003] sm:mt-[42px]">
            <div
              onClick={() => setfaq1(!faq1)}
              className="flex cursor-pointer items-center leading-[32px] justify-between sm:px-[36px]"
            >
              <p className="w-[629px]">How do I create a Qviqsite for free?</p>
              {faq1 ? <HiChevronUp /> : <HiChevronDown />}
            </div>
            {faq1 && (
              <div className="mt-[42px] font-[400] px-[20px] sm:px-[36px] text-[16px] ">
                <p>
                  Sign up for a free Qviq account. Choose a template and start
                  customizing your Qviqsite with your information and content.
                  It's a hassle-free process.
                </p>
              </div>
            )}
          </div>

          <div className="px-3 py-5 xsm:p-[20px] sm:pb-[36px] border-b-[1px] border-[#0A0003] sm:mt-[42px]">
            <div
              onClick={() => setfaq3(!faq3)}
              className="flex cursor-pointer items-center justify-between sm:px-[36px] "
            >
              <p className="w-[629px]"> Can I edit my Qviqsite later?</p>
              {faq3 ? <HiChevronUp /> : <HiChevronDown />}
            </div>
            {faq3 && (
              <div className="mt-[42px] font-[400] px-[20px] sm:px-[36px] text-[16px] leading-[24px]">
                <p>
                  Absolutely! Qviq offers an intuitive editor that lets you make
                  changes to your Qviqsite anytime. Keep it up to date with your
                  latest accomplishments and information.
                </p>
              </div>
            )}
          </div>

          <div className="px-3 py-5 xsm:p-[20px] sm:pb-[36px] border-b-[1px] border-[#0A0003] sm:mt-[42px]">
            <div
              onClick={() => setfaq4(!faq4)}
              className="flex cursor-pointer items-center justify-between sm:px-[36px] "
            >
              <p className="w-[629px]">Is my data safe with Qviq?</p>
              {faq4 ? <HiChevronUp /> : <HiChevronDown />}
            </div>
            {faq4 && (
              <div className="mt-[42px] font-[400] px-[20px] sm:px-[36px] text-[16px] leading-[24px]">
                <p>
                  Your data security is our top priority. Qviq uses
                  industry-standard security measures to protect your
                  information. You can network with confidence.
                </p>
              </div>
            )}
          </div>

          <div className="px-3 py-5 xsm:p-[20px] sm:pb-[36px] border-b-[1px] border-[#0A0003] sm:mt-[42px]">
            <div
              onClick={() => setfaq5(!faq5)}
              className="flex cursor-pointer items-center justify-between sm:px-[36px] "
            >
              <p className="w-[629px]">
                {" "}
                How can I track my Qviqsite's performance?
              </p>
              {faq5 ? <HiChevronUp /> : <HiChevronDown />}
            </div>
            {faq5 && (
              <div className="mt-[42px] font-[400] px-[20px] sm:px-[36px] text-[16px] leading-[24px]">
                <p>
                  Qviq provides detailed analytics to help you understand how
                  your Qviqsite is performing. You can see how many people have
                  visited, what content they interact with, and more.
                </p>
              </div>
            )}
          </div>

          <div className="px-3 py-5 xsm:p-[20px] sm:pb-[36px] border-b-[1px] border-[#0A0003] sm:mt-[42px]">
            <div
              onClick={() => setfaq6(!faq6)}
              className="flex cursor-pointer items-center justify-between sm:px-[36px] "
            >
              <p className="w-[629px]"> Can I use Qviq on mobile devices?</p>
              {faq6 ? <HiChevronUp /> : <HiChevronDown />}
            </div>
            {faq6 && (
              <div className="mt-[42px] font-[400] px-[20px] sm:px-[36px] text-[16px] leading-[24px]">
                <p>
                  Yes, Qviq is designed to be a mobile-first platform. You can
                  access and manage your Qviqsite from your smartphone, tablet,
                  or computer, making it easy to stay connected on the go.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
