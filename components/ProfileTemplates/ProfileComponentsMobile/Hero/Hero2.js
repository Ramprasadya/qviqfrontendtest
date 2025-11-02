import React from "react";
import { HiMail, HiPhone } from "react-icons/hi";

const Hero2 = (props) => {
  const data = props.data;
  const style = props.style;
  const dummy = props.dummy;

  const handleShowEmail = () => {
    
    props.setShowEmail(true);
    props.setShowMobile(false);
    props.setShowContact(true);
  };

  const handleShowMobile = () => {
    
    props.setShowEmail(false);
    props.setShowMobile(true);
    props.setShowContact(true);
  };

  return (
    <div
      className={`max-w-[720px] min-w-[250px]  w-full min-h-[242px] xsm2:min-h-[270px] flex flex-col items-center relative ${style.div}`}
    >
      <div className="absolute left-1/2 -translate-x-1/2 top-[-55px]">
        <img
          src={`${data.profilePic}`}
          className={`min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] ${style.profilePic}`}
          alt="profilepic"
        />
      </div>
      <div className="w-full pt-20 px-4 xsm2:px-8 text-center">
        <p className={`mb-1 ${style.fullName}`}>{data.fullName}</p>
        <p className={`mb-1 ${style.jobTitle}`}>{data.jobTitle}</p>
        <p className={`mb-1 ${style.jobTitle}`}>{data.companyName}</p>
        <p className={`mb-5 ${style.jobDescription}`}>{data.jobDescription}</p>
        
        {/* <div className="flex justify-center gap-4 mb-[15px]">
          {!dummy
            ? data.mobileNumber !== "" && (
                <p
                  className={`inline-flex justify-center ${style.border}   gap-[8px] hover:cursor-pointer w-[87px]   h-[47px] rounded-[8px] bg-[rgba(255,255,255,0.16)]  break-all  ${style.jobTitle}`}
                  onClick={handleShowMobile}
                >
                  <span className="flex items-center  font-[600] w-[73px] h-5 mt-[14px] mb-[13px] ml-[39px] mr-[40px] leading-normal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="mt-[3px] h-5 w-5 "
                    >
                      <path
                        d="M7.805 8.90167C8.58695 10.2754 9.7246 11.4131 11.0983 12.195L11.835 11.1633C11.9535 10.9974 12.1286 10.8807 12.3273 10.8353C12.526 10.7898 12.7345 10.8188 12.9133 10.9167C14.0919 11.5608 15.3935 11.9481 16.7325 12.0533C16.9415 12.0699 17.1365 12.1646 17.2788 12.3186C17.421 12.4726 17.5 12.6745 17.5 12.8842V16.6025C17.5 16.8088 17.4235 17.0078 17.2853 17.161C17.1471 17.3142 16.9569 17.4106 16.7517 17.4317C16.31 17.4775 15.865 17.5 15.4167 17.5C8.28333 17.5 2.5 11.7167 2.5 4.58333C2.5 4.135 2.5225 3.69 2.56833 3.24833C2.58938 3.04308 2.68582 2.85293 2.83899 2.71469C2.99216 2.57646 3.19117 2.49996 3.3975 2.5H7.11583C7.32547 2.49997 7.52741 2.57896 7.6814 2.72121C7.83539 2.86346 7.93011 3.05852 7.94667 3.2675C8.05185 4.60649 8.43923 5.90807 9.08333 7.08667C9.18122 7.26547 9.21018 7.47395 9.16472 7.67266C9.11927 7.87137 9.00255 8.04654 8.83667 8.165L7.805 8.90167ZM5.70333 8.35417L7.28667 7.22333C6.83732 6.25341 6.52946 5.22403 6.3725 4.16667H4.175C4.17 4.305 4.1675 4.44417 4.1675 4.58333C4.16667 10.7967 9.20333 15.8333 15.4167 15.8333C15.5558 15.8333 15.695 15.8308 15.8333 15.825V13.6275C14.776 13.4705 13.7466 13.1627 12.7767 12.7133L11.6458 14.2967C11.1906 14.1198 10.7483 13.9109 10.3225 13.6717L10.2742 13.6442C8.63965 12.7139 7.28607 11.3604 6.35583 9.72583L6.32833 9.6775C6.08909 9.25166 5.88024 8.80945 5.70333 8.35417Z"
                        fill={style.color ? style.color : "white"}
                      />
                    </svg>
                    <p className={`ml-2 w-[45px] h-[19px]  text-[14px] font-[600] ${style.textColor} `}>
                      Phone
                    </p>
                  </span>
                </p>
              )
            : ""}
          {!dummy
            ? data.email !== "" && (
                <p
                  className={`inline-flex justify-center ${style.border}  gap-1 hover:cursor-pointer w-[87px] h-[47px] rounded-[8px] bg-[rgba(255,255,255,0.16)]  break-all  ${style.jobTitle}`}
                >
                  <span
                    className=" flex items-center w-[67px] h-5 mt-[14px] font-[600] leading-normal"
                    onClick={handleShowEmail}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="mt-[3px] h-5 w-5 "
                    >
                      <path
                        d="M2.49996 2.5H17.5C17.721 2.5 17.9329 2.5878 18.0892 2.74408C18.2455 2.90036 18.3333 3.11232 18.3333 3.33333V16.6667C18.3333 16.8877 18.2455 17.0996 18.0892 17.2559C17.9329 17.4122 17.721 17.5 17.5 17.5H2.49996C2.27895 17.5 2.06698 17.4122 1.9107 17.2559C1.75442 17.0996 1.66663 16.8877 1.66663 16.6667V3.33333C1.66663 3.11232 1.75442 2.90036 1.9107 2.74408C2.06698 2.5878 2.27895 2.5 2.49996 2.5ZM16.6666 6.03167L10.06 11.9483L3.33329 6.01333V15.8333H16.6666V6.03167ZM3.75913 4.16667L10.0508 9.71833L16.2516 4.16667H3.75913Z"
                        fill={style.color ? style.color : "white"}
                      />
                    </svg>
                    <p className={`ml-2 w-[39px] h-[19px] text-[14px] font-[600] ${style.textColor} `}>
                      Email
                    </p>
                  </span>
                </p>
              )
            : ""}
        </div>
         {
                    !dummy ?
                        data.newMobileNumber !== '' && <a href={`tel:${data.newMobileNumber}`} className={`flex justify-center items-center gap-1 hover:underline hover:cursor-pointer mb-4 ${style.jobTitle}`}><HiPhone />{data.newMobileNumber}</a> :
                        <p className={`flex justify-center items-center gap-1 mb-1 ${style.jobTitle}`}><HiPhone />+987654321000</p>
                } */}
      </div>
    </div>
  );
};

export default Hero2;
