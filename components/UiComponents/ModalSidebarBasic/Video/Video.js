import React, { useState } from "react";
import InputField from "../../InputField";
import PrimaryButton2 from "../../PrimaryButton2";
import TertiaryButton from "../../TertiaryButton";
import axios from "axios";
import { serverUrl } from "../../../../config";

import "./video.css";
import { HiOutlineBolt } from "react-icons/hi2";
import { useContext } from "react";
import { UserContext } from "../../../Contexts/context";
import PrimaryButton from "../../PrimaryButton";
import { useRouter } from "next/navigation";
function Video(props) {
  const [videoLink, setVideoLink] = useState("");
  const [channel, setChannel] = useState("");
const youtubeRegex =
  /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([^&?/]+)/;
  const match = videoLink.match(youtubeRegex);

  // Extract the video ID from the URL
  const cleanedLink = match ? match[1] : videoLink;
  console.log(cleanedLink);
  

  const handleVideo = () => {
    props.setLoading(true);
    var formData = new FormData();
    formData.append("header", "video");
    formData.append("name", props.profile);
    formData.append("userName", cleanedLink);
    formData.append("label", channel);
    formData.append("type", props.type);

    const res = axios.put(`${serverUrl}/record/record/addvideo`, formData)
    .then(()=>{
      props.setMessage("Video added successfully");
      props.setShowtMessage(true);
      setTimeout(() => {
        props.setShowtMessage(false);
      }, 3000);
      props.setLoading(false);
    }).catch((err)=>{
      //console.log(err)
      props.setLoading(false);
    });
    props.setDummyState((prevState) => prevState + 1);
    props.toggleModal();
  };

  // variable to check if upgrade button should be shown
  // const showUpgrade = props.videoData.length > 0 && props.basic;
  const showUpgrade =
    (props.basic && props.videoData.length >= 1) ||
    (props.starter && props.videoData.length >= 4) ||
    (props.pro && props.videoData.length >= 10);

  const { username } = useContext(UserContext);
  const navigate = useRouter();

  return (
    <div
      className={
        props.current === "video" ? "md:pl-3 lg:pl-7 w-full h-full" : "hidden"
      }
    >
      <div className="flex flex-col w-full h-full relative md:pr-4">
        {showUpgrade && (
          <div className="w-full h-full absolute flex flex-col gap-4 justify-center items-center text-center bg-[#ffffffcc] backdrop-blur-sm">
            {!props.pro ? (
              <>
                <p className="font-semibold text-base xsm:text-lg">
                  To add more videos upgrade to pro
                </p>
                <PrimaryButton
                  icon={<HiOutlineBolt />}
                  text="Upgrade"
                  onClick={() => {
                    navigate.push(`/plan/${username}`);
                  }}
                />
              </>
            ) : (
              <p className="font-semibold text-base xsm:text-lg">
                You have reached the limit to add videos
              </p>
            )}
          </div>
        )}
        <h1 className="font-semibold ecom-heading">VIDEOS</h1>
        <div className="pt-5 flex video-container flex-col-reverse items-center w-full lg:items-start lg:flex-row gap-6">
          <div className="lg:flex-1 w-full sm:w-4/5">
            <InputField
              label="Youtube Channel Name"
              placeholder="Name here"
              width="100%"
              value={channel}
              onChange={(event) => setChannel(event.target.value)}
            />
            <div className="pt-6 lg:pt-8">
              <InputField
                label="Video Link"
                placeholder="url"
                width="100%"
                value={videoLink}
                onChange={(event) => setVideoLink(event.target.value)}
              />
            </div>
          </div>
          <div className="video-frame rounded-full flex flex-col items-center justify-center gap-2 w-fit">
            <iframe
              height="167px"
              width="100%"
              src={`https://www.youtube.com/embed/${cleanedLink}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
              className="rounded-lg"
            />
            <p className="text-[#817C7C] text-xs font-medium">Video Preview</p>
          </div>
        </div>
        <div className="pt-5 pb-3 gap-3 flex  sm:justify-center md:justify-end mt-4">
          <div className="flex w-full sm:w-4/5 md:w-[219px] md:gap-4">
            <TertiaryButton
              text="Cancel"
              width={"100%"}
              onClick={props.toggleModal}
            />
            <PrimaryButton2
              onClick={!showUpgrade ? handleVideo : null}
              text="Save"
              width={"100%"}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[50px] flex sm:hidden"></div>
    </div>
  );
}

export default Video;
