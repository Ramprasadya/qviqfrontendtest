import React, { useContext } from "react";
import {UserContext} from '../../Contexts/context';
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar(props) {
  const navigate = useRouter();
  const handleClose = () => {
    props.setSideToggle(false);
  };
  const { username } = useContext(UserContext);

  return (
    <div>
      <div
        className="flex flex-col justify-between items-center text-[#1A1A1A] bg-white w-screen fixed"
        style={{ height: "calc(100vh - 80px)", zIndex: '997' }}
      >
        <div className=" w-[100vw] text-[16px] ">
          <Link
            href={"/about"}
            className="inline-block py-[22px] pl-[20px] w-full text-left font-medium"
          >
            About us
          </Link>
          <hr className="ml-[20px]" />
          
          <Link
            href={"/templates"}
            className="inline-block py-[22px] pl-[20px] w-full text-left font-medium"
          >
            Templates
          </Link>
          <hr className="ml-[20px]" />
          
          <Link
            href={"/qviqtap"}
            className="inline-block py-[22px] pl-[20px] w-full text-left font-medium"
          >
            Qviq Tap
          </Link>
          <hr className="ml-[20px]" />

          <Link
            href={"/pricing"}
            className="inline-block py-[22px] pl-[20px] w-full text-left font-medium "
          >
            Pricing
          </Link>
          <hr className="ml-[20px]" />

          <Link
            href={"/contact"}
            className="inline-block py-[22px] pl-[20px] w-full text-left font-medium "
          >
            Contact
          </Link>
          <hr className="ml-[20px]" />
          <Link
            href={"/learn"}
            className="inline-block py-[22px] pl-[20px] w-full text-left font-medium "
          >
           Learn
          </Link>
          <hr className="ml-[20px]" />
        </div>
        {username==='' && <div className="mb-[80px]">
          <Link
            href={"/login"}
            className="flex items-center justify-center bg-white w-[90vw] h-[48px] border border-[#1A1A1A] text-[16px] font-medium  rounded-[100px]"
            style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)' }}
          >
            Login
          </Link>
        </div>}
      </div>
    </div>
  );
}
