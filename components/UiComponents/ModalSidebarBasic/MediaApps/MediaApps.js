import React from "react";
import Accordian from "../../Accordian";
import "./mediaapps.css";
import ProtagLarge from "../../ProtagLarge";
import DialogInBuilt from "../../../SocialLinks/DialogInBuilt";
import { UserContext } from "../../../Contexts/context";

// function starts here
const MediaApps = (props) => {
  // data for social media  button
  const social = [
    {
      text: "Whatsapp",
      type: "basic",
    },
    {
      text: "Facebook",
      type: "basic",
    },
    {
      text: "Instagram",
      type: "basic",
    },
    {
      text: "Thread",
      type: "basic",
    },
    {
      text: "Snapchat",
      type: "basic",
    },

    {
      text: "Telegram",
      type: "basic",
    },
    {
      text: "Linkedin",
      type: "basic",
    },
    {
      text: "Twitter",
      type: "basic",
    },
    {
      text: "Youtube",
      type: "basic",
    },
    {
      text: "Linktree",
      type: "pro",
    },
    {
      text: "Signal",
      type: "pro",
    },

    {
      text: "Pinterest",
      type: "pro",
    },
    {
      text: "Reddit",
      type: "pro",
    },

    {
      text: "Roposo",
      type: "pro",
    },
    {
      text: "Meetup",
      type: "pro",
    },
    {
      text: "Behance",
      type: "pro",
    },
    {
      text: "Chingari",
      type: "pro",
    },
    {
      text: "Josh",
      type: "pro",
    },
    {
      text: "Clubhouse",
      type: "pro",
    },
    {
      text: "Onlyfans",
      type: "pro",
    },
    {
      text: "Patreon",
      type: "pro",
    },
    {
      text: "Quora",
      type: "pro",
    },
    {
      text: "Join my app",
      type: "pro",
    },
    {
      text: "Moj",
      type: "pro",
    },
    {
      text: "Google Map",
      type: "basic",
    },
    {
      text: "Google Drive",
      type: "basic",
    },
    {
      text: "Google Notes",
      type: "pro",
    },
  ];

  //array items for buisness
  const buisnessArray = [
    {
      text: "Website",
      type: "basic",
    },
    {
      text: "Swiggy",
      type: "basic",
    },
    {
      text: "Zomato",
      type: "basic",
    },
    {
      text: "Google Reviews",
      type: "basic",
    },
    {
      text: "Whatsapp Business",
      type: "basic",
    },
    {
      text: "GSTIN",
      type: "basic",
    },
    {
      text: "Calendely",
      type: "pro",
    },
    {
      text: "Google Play",
      type: "pro",
    },
    {
      text: "Apple Store",
      type: "pro",
    },
    {
      text: "Email",
      type: "pro",
    },
    {
      text: "Facetime",
      type: "pro",
    },
    {
      text: "Gmail",
      type: "pro",
    },
    {
      text: "Yahoo Mail",
      type: "pro",
    },
    {
      text: "Outlook",
      type: "pro",
    },
  ];

  //array items for music
  const musicArray = [
    {
      text: "Spotify",
      type: "basic",
    },
    {
      text: "Gaana",
      type: "basic",
    },
    {
      text: "Apple Music",
      type: "basic",
    },
    {
      text: "Amazon Music",
      type: "basic",
    },
    {
      text: "Audio",
      type: "pro",
    },
    {
      text: "SoundCloud",
      type: "pro",
    },
    {
      text: "Apple Podcasts",
      type: "pro",
    },
    {
      text: "Saavan",
      type: "pro",
    },
    {
      text: "Wynk",
      type: "pro",
    },
    {
      text: "Tidal",
      type: "pro",
    },
  ];

  //props data
  const profile = props.profile;
  const type = props.type;

  //Inbuilt Dialog
  const { inBuiltDialog, inBuiltDialogToggle, setInBuiltDialogPlatform } =
    React.useContext(UserContext);

  //togglestates
  const toggleStates = props.toggleStates;

  return (
    <div
      className={
        props.current === "social" ? "md:pl-3 lg:pl-7 w-full h-full" : "hidden"
      }
    >
      {/* InBuilt Dialog Toggle */}
      {!inBuiltDialog ? (
        <div>
          <Accordian text="SOCIAL MEDIA" pTop="0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pb-3">
              {social.map((app) => (
                <div
                  className={`rounded-xl flex items-center justify-between px-3 xsm:px-4 py-3 xsm:py-4 flex-1 so-m
                    ${
                      !props.pro &&
                      ((props.basic && app.type === "pro") ||
                        toggleStates.some((item) => item.platform === app.text))
                        ? "hover:cursor-default"
                        : "hover:cursor-pointer"
                    }`}
                  key={app.id}
                  onClick={
                    !props.pro &&
                    ((props.basic && app.type === "pro") ||
                      (!props.pro &&
                        toggleStates.some(
                          (item) => item.platform === app.text
                        )))
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
                        require(`../../../Logos/SocialMediaLogos/${app.text
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
                  ((props.basic && app.type === "pro") ||
                    (!props.pro &&
                      toggleStates.some(
                        (item) => item.platform === app.text
                      ))) ? (
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
                            stroke="url(#paint0_linear_6717_555)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_6717_555"
                              x1="14"
                              y1="14"
                              x2="-0.217422"
                              y2="10.1152"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#E40849" />
                              <stop offset="1" stopColor="#FB6609" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p className="text-sm add-icon ">Add</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Accordian>

          <Accordian text="BUSINESSES">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pb-3">
              {buisnessArray.map((app) => (
                <div
                  className={`rounded-xl flex items-center justify-between px-3 xsm:px-4 py-3 xsm:py-4 flex-1 so-m
                  ${
                    !props.pro &&
                    ((props.basic && app.type === "pro") ||
                      (!props.pro &&
                        toggleStates.some(
                          (item) => item.platform === app.text
                        )))
                      ? "hover:cursor-default"
                      : "hover:cursor-pointer"
                  }`}
                  key={app.id}
                  onClick={
                    !props.pro &&
                    ((props.basic && app.type === "pro") ||
                      (!props.pro &&
                        toggleStates.some(
                          (item) => item.platform === app.text
                        )))
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
                        require(`../../../Logos/BuisnessLogos/${app.text
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
                  ((props.basic && app.type === "pro") ||
                    (!props.pro &&
                      toggleStates.some(
                        (item) => item.platform === app.text
                      ))) ? (
                    <ProtagLarge />
                  ) : (
                    <div className="flex items-center gap-x-2 font-medium">
                      <span className="font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M8 6V10M10 8H6M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                            stroke="url(#paint0_linear_6717_555)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_6717_555"
                              x1="14"
                              y1="14"
                              x2="-0.217422"
                              y2="10.1152"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#E40849" />
                              <stop offset="1" stopColor="#FB6609" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p className="text-sm add-icon ">Add</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Accordian>
          
          <Accordian text="MUSIC & PODCASTS">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pb-3">
              {musicArray.map((app) => (
                <div
                  className={`rounded-xl flex items-center justify-between px-3 xsm:px-4 py-3 xsm:py-4 flex-1 so-m
                    ${
                      !props.pro &&
                      ((props.basic && app.type === "pro") ||
                        (!props.pro &&
                          toggleStates.some(
                            (item) => item.platform === app.text
                          )))
                        ? "hover:cursor-default"
                        : "hover:cursor-pointer"
                    }`}
                  key={app.id}
                  onClick={
                    !props.pro &&
                    ((props.basic && app.type === "pro") ||
                      (!props.pro &&
                        toggleStates.some(
                          (item) => item.platform === app.text
                        )))
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
                        require(`../../../Logos/MusicLogos/${app.text
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
                  ((props.basic && app.type === "pro") ||
                    (!props.pro &&
                      toggleStates.some(
                        (item) => item.platform === app.text
                      ))) ? (
                    <ProtagLarge />
                  ) : (
                    <div className="flex items-center gap-x-2 font-medium">
                      <span className="font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M8 6V10M10 8H6M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                            stroke="url(#paint0_linear_6717_555)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_6717_555"
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
                      <p className="text-sm add-icon">Add</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Accordian>
        </div>
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
      <div className="w-full h-[50px] flex sm:hidden"></div>
    </div>
  );
};

export default MediaApps;
