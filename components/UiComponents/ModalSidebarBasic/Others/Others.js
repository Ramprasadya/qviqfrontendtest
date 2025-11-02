import React from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
function Others(props) {
  //handleclick
  const handleButtonClick = (onClick) => {
    onClick();
  };
  const profile = props.profile;
  // state for other
  const [openMap, setOpenMap] = React.useState(false);
  const [map, setMap] = React.useState("");
  const [labelMap, setLabelMap] = React.useState("Google Map");
  const [openDrive, setOpenDrive] = React.useState(false);
  const [drive, setDrive] = React.useState("");
  const [labelDrive, setLabelDrive] = React.useState("Google Drive");
  const [openNotes, setOpenNotes] = React.useState(false);
  const [notes, setNotes] = React.useState("");
  const [labelNotes, setLabelNotes] = React.useState("Notes");
  //function for closing other
  function mapPromot() {
    setOpenMap(true);
  }
  function drivePromot() {
    setOpenDrive(true);
  }
  function notesPromot() {
    setOpenNotes(true);
  }
  //array for other
  const otherArray = [
    {
      text: "Google Map",
      logoSrc: "map",
      onClick: () => mapPromot(),
    },
    {
      text: "Google Drive",
      logoSrc: "drive",
      onClick: () => drivePromot(),
    },
    {
      text: "Google Notes",
      logoSrc: "notes",
      onClick: () => notesPromot(),
    },
  ];
  return (
    <div
      className={
        props.current === "other" ? "flex flex-col pl-9 w-full" : "hidden"
      }
    >
      <h1 className="font-semibold ecom-heading">OTHER APPS</h1>
      <p className="font-normal text-cGrey ecom-para">
        Enhance reach by adding additional information
      </p>
      <div className="social-media">
        {otherArray.map((app) => (
          <div
            className="rounded-xl flex items-center justify-between py-3 px-6 flex-1 so-m"
            key={app.id}
          >
            <div className="flex items-center gap-x-2">
              <img
                src={require(`../../../Logos/OtherLogos/${app.logoSrc}.png`)}
                alt="social-logo"
                className="w-10"
              />
              <p>{app.text}</p>
            </div>

            <div className="flex items-center gap-x-2 text-pink1 font-medium">
              <span
                onClick={() => handleButtonClick(app.onClick)}
                className=" cursor-pointer font-semibold"
              >
                <HiOutlinePlusCircle className=" cursor-pointer" />
              </span>
              <p className="text-sm">Add</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Others;
