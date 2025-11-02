import React from "react";
import ProtagLarge from "../../ProtagLarge";
import DialogInBuilt from "../../../SocialLinks/DialogInBuilt";
import { UserContext } from "../../../Contexts/context";
import "../MediaApps/mediaapps.css";

const Blog = (props) => {
  // props data
  const profile = props.profile;
  const type = props.type;

  //array for blog
  const blogArray = [
    {
      text: "Bloggers Spot",
      type: "basic",
    },
    {
      text: "Weebly",
      type: "basic",
    },
    {
      text: "Wordpress",
      type: "basic",
    },
    {
      text: "Medium",
      type: "pro",
    },
    {
      text: "Ghost",
      type: "pro",
    },
    {
      text: "Tumblr",
      type: "pro",
    },
    {
      text: "Joomla",
      type: "pro",
    },
    {
      text: "Jimdo",
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
        props.current === "blog"
          ? "flex flex-col md:pl-3 lg:pl-7 w-full h-full"
          : "hidden"
      }
    >
      {/* InBuilt Dialog Toggle */}
      {!inBuiltDialog ? (
        <>
          <h1 className="font-semibold ecom-heading">BLOGS</h1>
          <p className="font-normal text-cGrey ecom-para">
            Add a blog engine to your profile to show blogs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pb-3">
            {blogArray.map((app) => (
              <div
                className={`rounded-xl flex items-center justify-between px-3 xsm:px-4 py-3 xsm:py-4 flex-1 so-m
              ${
                !props.pro &&
                ((props.starter &&
                  toggleStates.some((item) => item.platform == app.text)) ||
                  (props.basic &&
                    (app.type == "pro" ||
                      toggleStates.some((item) => item.apptype == "blogapp"))))
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
                          (item) => item.apptype == "blogapp"
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
                      require(`../../../Logos/BlogLogos/${app.text
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
                        (item) => item.apptype == "blogapp"
                      )))) ? (
                  <ProtagLarge />
                ) : (
                  <div className="flex items-center gap-x-2 font-medium">
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
                          stroke="url(#paint0_linear_2136_428)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2136_428"
                            x1="14"
                            y1="2"
                            x2="0.596042"
                            y2="3.85495"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FB6609" />
                            <stop offset="1" stopColor="#E40849" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                    <p className="text-sm add-icon">Add</p>
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

export default Blog;
