import React, { useState, useEffect, useParams, useContext } from "react";
import MediaApps from "./MediaApps/MediaApps";
import Content from "./Content/Content";
import Ecommerce from "./Ecommerce/Ecommerce";
import Video from "./Video/Video";
import Blog from "./Blog/Blog";
import Payment from "./Payment/Payment";
import CryptoCurrency from "./CryptoCurrency/CryptoCurrency";
import "./modal1.css";
import Search from "./Search/Search";
import { UserContext } from "../../Contexts/context";
// import Switch from "react-switch";
import AddCustomModal from "./AddCustomModal";
import { IoIosArrowForward } from "react-icons/io";
import ProtagLarge from "../ProtagLarge";

function ModalBasic({
  profile,
  type,
  pro,
  starter,
  basic,
  toggleModal,
  propsActiveCategory,
  setPropsActiveCategory,
  toggleStates,
  setToggleStates,
  videoData,
  setDummyState,
  customData,
  setcustomData,
  setPTab,
  ptab,
  setShowtMessage,
  setMessage,
  setLoading,
}) {
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
      text: "Snapchat",
      type: "basic",
    },
  ];

  // state of inbuilt dialog
  const { inBuiltDialog, inBuiltDialogToggle, setInBuiltDialogPlatform } =
    useContext(UserContext);

  // modal sidebar state
  const [activeCategory, setActiveCategory] = useState(
    propsActiveCategory ? propsActiveCategory : "social"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchInputChange = (event) => {
    // if inbuilt dialog is open then close it
    if (inBuiltDialog) {
      inBuiltDialogToggle();
    }

    // if search input is empty then set active category to social
    if (event.target.value.length === 0) {
      setSearchTerm("");
      setActiveCategory("social");
      return;
    }

    // set search term and active category
    setSearchTerm(event.target.value);
    setActiveCategory("search");
  };

  // now ptab state coming from its parent ManageMedia
  // const [ptab, setPTab] = useState(
  //   propsActiveCategory === "video" || propsActiveCategory === "content"
  //     ? "Qviq Link Store"
  //     : "Add Custom Link"
  // );

  // return statement here
  return (
    <>
      {/* upper component of modal1 */}
      <div className="flex flex-col overflow-scroll h-full">
        {/* tabs bar of modal */}
        <div
          className={`${
            !inBuiltDialog ? "flex" : "hidden"
          } md:flex flex-col gap-3 md:flex-row md:items-center justify-between modal1-sub py-6`}
        >
          <div className="flex items-center p-1 rounded-full productBackground text-center">
            <p
              onClick={() => setPTab("Add Custom Link")}
              className={
                ptab === "Add Custom Link"
                  ? "productTabActive rounded-full"
                  : "productTabNotActive rounded-full"
              }
            >
              Add Custom Link
            </p>
            <p
              onClick={() => setPTab("Qviq Link Store")}
              className={
                ptab === "Qviq Link Store"
                  ? "productTabActive rounded-full"
                  : "productTabNotActive rounded-full"
              }
            >
              Qviq Link Store
            </p>
          </div>
        </div>

        {/* add custom link tab */}
        {ptab === "Add Custom Link" && (
          <AddCustomModal
            profile={profile}
            type={type}
            pro={pro}
            starter={starter}
            basic={basic}
            toggleModal={toggleModal}
            toggleStates={toggleStates}
            setDummyState={setDummyState}
            customData={customData}
          />
        )}

        {/* tabs bar of modal */}
        {ptab === "Qviq Link Store" && (
          <div>
            <div
              className={`${
                !inBuiltDialog ? "flex" : "hidden"
              } md:flex flex-col gap-3 md:flex-row md:items-center justify-between modal1-sub border-b py-6`}
            >
              <p className="flex-[1.5] modal1-para break-after-auto text-[12px] md:text-[16px]">
                Choose from variety of categories and add links to your site
              </p>
              <input
                placeholder="&#128269; search for an app to add link"
                type="search"
                className="flex-1 modal1-ip-field w-full text-[12px] md:text-[16px]"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </div>

            {/* bottom component of modal 1 */}
            <div className="flex flex-col md:flex-row pt-6 overflow-scroll md:gap-4 h-fit">
              {/* left part  */}
              <div
                className={`${
                  !inBuiltDialog ? "flex" : "hidden"
                } md:flex md:flex-col gap-2 p-0 pb-8 md:pb-0 min-w-full w-full md:min-w-fit md:w-fit overflow-scroll mb-[20px]`}
              >
                <button
                  className={`f-button ${
                    activeCategory === "social" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory("social");
                    setSearchTerm("");
                    if (inBuiltDialog) {
                      inBuiltDialogToggle();
                    }
                  }}
                >
                  Media Apps
                </button>
                {/* <button
                  className={`f-button ${
                    activeCategory === "content" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory("content");
                    setSearchTerm("");
                    if (inBuiltDialog) {
                      inBuiltDialogToggle();
                    }
                  }}
                >
                  Content
                </button> */}
                <button
                  className={`f-button ${
                    activeCategory === "blog" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory("blog");
                    setSearchTerm("");
                    if (inBuiltDialog) {
                      inBuiltDialogToggle();
                    }
                  }}
                >
                  Blogs
                </button>
                <button
                  className={`f-button ${
                    activeCategory === "ecommerce" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory("ecommerce");
                    setSearchTerm("");
                    if (inBuiltDialog) {
                      inBuiltDialogToggle();
                    }
                  }}
                >
                  E-Commerce
                </button>

                <button
                  className={`f-button ${
                    activeCategory === "payment" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory("payment");
                    setSearchTerm("");
                    if (inBuiltDialog) {
                      inBuiltDialogToggle();
                    }
                  }}
                >
                  Payment
                </button>
                <button
                  className={`f-button ${
                    activeCategory === "video" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory("video");
                    setSearchTerm("");
                    if (inBuiltDialog) {
                      inBuiltDialogToggle();
                    }
                  }}
                >
                  Video
                </button>
                <button
                  className={`f-button ${
                    activeCategory === "crypto" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory("crypto");
                    setSearchTerm("");
                    if (inBuiltDialog) {
                      inBuiltDialogToggle();
                    }
                  }}
                >
                  Crypto
                </button>
              </div>

              {/* right part  */}
              <div className="flex w-full overflow-scroll h-[520px]">
                <MediaApps
                  current={activeCategory}
                  profile={profile}
                  type={type}
                  pro={pro}
                  starter={starter}
                  basic={basic}
                  toggleModal={toggleModal}
                  toggleStates={toggleStates}
                  setToggleStates={setToggleStates}
                  setDummyState={setDummyState}
                  setShowtMessage={setShowtMessage}
                  setMessage={setMessage}
                  setLoading={setLoading}
                />
                {/* <Content
                  current={activeCategory}
                  profile={profile}
                  type={type}
                  pro={pro}
                  starter={starter}
                  basic={basic}
                  toggleModal={toggleModal}
                  toggleStates={toggleStates}
                  setDummyState={setDummyState}
                  customData={customData}
                /> */}
                <Blog
                  current={activeCategory}
                  profile={profile}
                  type={type}
                  pro={pro}
                  starter={starter}
                  basic={basic}
                  toggleModal={toggleModal}
                  toggleStates={toggleStates}
                  setToggleStates={setToggleStates}
                  setDummyState={setDummyState}
                  setShowtMessage={setShowtMessage}
                  setMessage={setMessage}
                  setLoading={setLoading}
                />
                <Ecommerce
                  current={activeCategory}
                  profile={profile}
                  type={type}
                  pro={pro}
                  starter={starter}
                  basic={basic}
                  toggleModal={toggleModal}
                  toggleStates={toggleStates}
                  setToggleStates={setToggleStates}
                  setDummyState={setDummyState}
                  setShowtMessage={setShowtMessage}
                  setMessage={setMessage}
                  setLoading={setLoading}
                />
                <Payment
                  current={activeCategory}
                  profile={profile}
                  type={type}
                  pro={pro}
                  starter={starter}
                  basic={basic}
                  toggleModal={toggleModal}
                  toggleStates={toggleStates}
                  setToggleStates={setToggleStates}
                  setDummyState={setDummyState}
                  setShowtMessage={setShowtMessage}
                  setMessage={setMessage}
                  setLoading={setLoading}
                />
                <Video
                  current={activeCategory}
                  profile={profile}
                  type={type}
                  pro={pro}
                  starter={starter}
                  basic={basic}
                  toggleModal={toggleModal}
                  toggleStates={toggleStates}
                  videoData={videoData}
                  setDummyState={setDummyState}
                  setShowtMessage={setShowtMessage}
                  setMessage={setMessage}
                  setLoading={setLoading}
                />
                <CryptoCurrency
                  current={activeCategory}
                  profile={profile}
                  type={type}
                  pro={pro}
                  starter={starter}
                  basic={basic}
                  toggleModal={toggleModal}
                  toggleStates={toggleStates}
                  setToggleStates={setToggleStates}
                  setDummyState={setDummyState}
                  setShowtMessage={setShowtMessage}
                  setMessage={setMessage}
                  setLoading={setLoading}
                />
                <Search
                  current={activeCategory}
                  profile={profile}
                  type={type}
                  pro={pro}
                  starter={starter}
                  basic={basic}
                  toggleModal={toggleModal}
                  toggleStates={toggleStates}
                  setToggleStates={setToggleStates}
                  searchTerm={searchTerm}
                  setDummyState={setDummyState}
                  setShowtMessage={setShowtMessage}
                  setMessage={setMessage}
                  setLoading={setLoading}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ModalBasic;
