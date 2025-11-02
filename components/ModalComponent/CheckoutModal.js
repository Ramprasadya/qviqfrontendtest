import React from 'react'
import { HiOutlineX } from "react-icons/hi";
import google from '../Login/assets/Google.svg'
import SecondaryButtonLogoCustom from "../UiComponents/SecondaryButtonLogoCustom";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import line from '../Images/Line.png'

export default function CheckoutModal(){

    return(
        <div className='flex justify-center items-center min-h-screen'>
        <div className='bg-white flex flex-col justify-center items-center w-[260px] md:w-[600px] lg:w-[640px] xsm:w-[330px] sm:w-[500px]  lg:h-[431px] p-[32px] rounded-[20px]'>
           <div className='flex justify-between w-full'>
           <p className=" text-[13px] xsm:text-[16px]  lg:text-[18px] md:ml-[160px] sm:ml-[120px] xsm:ml-[20px] lg:ml-[199.5px] text-black tracking-normal font-semibold">
              Already a registered user?
            </p>
          
          <span
            className="lg:text-2xl md:mr-[50px] lg:mr-[0px] text-black hover:scale-110 logo-fill"
            style={{ cursor: "pointer", padding: "0" }}
          >
            <HiOutlineX />
          </span>
          </div>
        
          <div className=" w-[240px] lg:w-[576px] md:w-[450px] sm:w-[390px] xsm:w-[290px]  lg:h-[56px] mb-[16px] mt-[16px]">
            <PrimaryButton2
              type="submit"
              text="Login"
              width="100%"
            />
          </div>
          <div className=" mb-[20px] xsm:mb-[0px] text-[13px] w-[240px] lg:w-[576px] sm:text-[16px] lg:text-[18px] md:w-[450px] lg:h-[56px] sm:w-[390px]  xsm:w-[290px]">
            <SecondaryButtonLogoCustom
              text="Continue with Google"
              img={google}
              icon=""
              // onClick={signInWithGoogle}
              height="48px"
              width="100%"
            />
          </div>

          <div className=" mb-[5px] lg:mt-[40px] xsm:mt-[40px] lg:mb-[40px] xsm:mb-[20px] xsm:text-[18px] text-[16px] flex font-semibold text-[#817C7C]">
          
           <span><img alt='line' src={line}/></span><h1 className='mt-[-13px] mx-[10px] '> OR </h1><span ><img alt='line' src={line}/></span> 
          </div>
          
          <h1 className="mb-[16px] text-[15px] xsm:text-[18px] text-[#1A1A1A] font-semibold">
            New user?
          </h1>
          <div className="lg:w-[576px] lg:h-[56px]">
            <button className=" rounded-[100px] text-[#1A1A1A] font-semibold text-[15px] xsm:text-[16px] lg:text-[18px] w-[240px] lg:w-[576px] md:w-[450px] sm:w-[390px] lg:h-[56px] xsm:w-[290px] h-[40px] border border-solid border-[#1A1A1A]">
              Register
            </button>
          </div>
        </div>
        </div>
    )
}