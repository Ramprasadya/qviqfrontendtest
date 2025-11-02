import React from "react";
import "./ecommerce.css";
import ProtagLarge from "../../ProtagLarge";
import DialogInBuilt from "../../../SocialLinks/DialogInBuilt";
import { UserContext } from "../../../Contexts/context";

const Ecommerce = (props) => {
  // props data
  const profile = props.profile;
  const type = props.type;

  // array for ecommerce
  const ecomArray = [
    {
      text: "Flipkart",
      type: "pro",
    },
    {
      text: "Amazon",
      type: "pro",
    },

    {
      text: "Shopify",
      type: "pro",
    },
    {
      text: "Meesho",
      type: "pro",
    },

    {
      text: "Indiamart",
      type: "pro",
    },
    {
      text: "Coutloot",
      type: "pro",
    },
  ];

  //Inbuilt Dialog
  const { inBuiltDialog, inBuiltDialogToggle, setInBuiltDialogPlatform } =
    React.useContext(UserContext);

  // toggle states
  const toggleStates = props.toggleStates;

  return (
    <div
      className={
        props.current === "ecommerce"
          ? "flex flex-col md:pl-3 lg:pl-7 w-full h-full"
          : "hidden"
      }
    >
      {/* InBuilt Dialog Toggle */}
      {!inBuiltDialog ? (
        <>
          <h1 className="font-semibold ecom-heading">E-COMMERCE STORE</h1>
          <p className="font-normal text-cGrey ecom-para">
            Connect your profile to an e-commerce platform to display products
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pb-3">
            {ecomArray.map((app) => (
              <div
                className={`rounded-xl flex items-center justify-between px-3 xsm:px-4 py-3 xsm:py-4 flex-1 so-m
                ${
                  !props.pro &&
                  ((props.starter &&
                    toggleStates.some((item) => item.platform == app.text)) ||
                    (props.basic &&
                      (app.type == "pro" ||
                        toggleStates.some(
                          (item) => item.apptype == "ecommerceapp"
                        ))))
                    ? "hover:cursor-default"
                    : "hover:cursor-pointer"
                }`}
                key={app.id}
                onClick={
                  !props.pro &&
                  ((props.starter &&
                    toggleStates.some((item) => item.platform == app.text)) ||
                    (props.basic &&
                      (app.type == "pro" ||
                        toggleStates.some(
                          (item) => item.apptype == "ecommerceapp"
                        ))))
                    ? null
                    : () => {
                        setInBuiltDialogPlatform(app.text);
                        inBuiltDialogToggle();
                      }
                }
              >
                <div className="flex items-center gap-x-2">
                  <img
                    src={
                      require(`../../../Logos/ECommerceLogos/${app.text
                        .toLowerCase()
                        .split(" ")
                        .join("")}.png`).default.src
                    }
                    alt="social-logo"
                    className="w-8 h-8"
                  />
                  <p className="text-sm font-medium">{app.text}</p>
                </div>

                {!props.pro &&
                ((props.starter &&
                  toggleStates.some((item) => item.platform == app.text)) ||
                  (props.basic &&
                    (app.type == "pro" ||
                      toggleStates.some(
                        (item) => item.apptype == "ecommerceapp"
                      )))) ? (
                  <ProtagLarge />
                ) : (
                  <div className="flex items-center gap-x-2  font-medium">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 6V10M10 8H6M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                          stroke="url(#paint0_linear_6727_893)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_6727_893"
                            x1="14"
                            y1="14"
                            x2="-0.217422"
                            y2="10.1152"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FB6609" />
                            <stop offset="1" stopColor="#E40849" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                    <p className="text-sm add-icon ">Add</p>
                  </div>
                )}
              </div>
            ))}
            <div className="w-full h-[50px] flex sm:hidden"></div>
          </div>
        </>
      ) : (
        <DialogInBuilt
          open={inBuiltDialog}
          handleClose={inBuiltDialogToggle}
          profile={profile}
          type={type}
          pro={props.pro}
          setDummyState={props.setDummyState}
          toggleStates={toggleStates}
          setToggleStates={props.setToggleStates}
          setShowtMessage={props.setShowtMessage}
          setMessage={props.setMessage}
          setLoading={props.setLoading}
        />
      )}
    </div>
  );
};

export default Ecommerce;
