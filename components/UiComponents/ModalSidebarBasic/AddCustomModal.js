import React, { useState, useRef, useEffect, useContext } from "react";
import InputField from "../InputField";
import { HiOutlineBolt } from "react-icons/hi2";
import { HiOutlineX, HiPlus } from "react-icons/hi";
import "./Content/content.css";
import PrimaryButton from "../PrimaryButton";
import { serverUrl } from "../../../config";
import LoadingAnimation from "../Loading/LoadingAnimation";
import Switch from "react-switch";

import axios from "axios";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../Login/firebaseconfig";
import { UserContext } from "../../Contexts/context";
import Toast from "../Toast";
import NewToast from "../NewToast";
import { useRouter } from "next/navigation";
import { getCookie } from "@/components/utils";
import CenterModal from "../NewModal/CenterModal";

// function starts here
function AddCustomModal(props) {
  const [customData, setCustomData] = useState(props.customData);
  const linkInputRef = useRef(null);

  //field for image
  const [selectedFileName, setSelectedFileName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [photo, setPhoto] = useState("");

  const [highlightModal, setHighlightModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [animation, setAnimation] = useState("");

  const [addForm, setAddForm] = useState(false);
  const [dummyState, setDummyState] = useState(0);
  const [readOnly, setReadOnly] = useState([]);
  const [editLable, setEditLable] = useState([]);
  const [editUrl, setEditUrl] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const fetchcustom = async (data) => {
    if (data.length > 0) {
      setReadOnly([]);
      setEditLable([]);
      setEditUrl([]);
      for (let i = 0; i < data.length; i++) {
        setReadOnly((prev) => [...prev, true]);
        setEditLable((prev) => [...prev, data[i].label]);
        setEditUrl((prev) => [...prev, data[i].websiteUrl]);
      }
    }
  };

  const animations = [
    // "none",
    "bounce",
    "jello1",
    "wobble1",
    "pulse1",
    "shake",
    "tada1",
  ];


    const handleToggleCustomLink = (value) => {
    setIsChecked(value); // Just update the toggle state
    if(value){
      setHighlightModal(true)
    }
  };

  useEffect(() => {
    fetchcustom(customData);
  }, [, addForm]);

  const [pdfData, setpdfData] = useState([]);
  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token"),
    },
  };
  const fetchpdf = async () => {
    const { data } = await axios.get(
      `${serverUrl}/record/pdf/${props.profile}/${props.type}`,
      config
    );
    setpdfData(data);
  };
  const [imgData, setimgData] = useState([]);
  const fetchimg = async () => {
    const { data } = await axios.get(
      `${serverUrl}/record/img/${props.profile}/${props.type}`,
      config
    );
    setimgData(data);
  };
  useEffect(() => {
    fetchpdf();
    fetchimg();
  }, [dummyState]);

  // gives favicon url
  const getImgUrl = (item) => {
    if (item !== undefined) {
      if (!item.startsWith("http://") && !item.startsWith("https://")) {
        item = "https://" + item;
      }
      let url = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item}&size=256`;
      return url;
    }
  };

  const handleEdit = async (content) => {
    await fetch(`${serverUrl}/record/record/editcustomlink`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: props.profile,
        websiteUrl: content.websiteUrl,
        label: content.label,
        id: content.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          //console.log(data.error);
        } else {
          props.setDummyState((prev) => prev + 1);
        }
      });
  };

  const [loading, setLoading] = useState(false);
  const [sectionData, setSectionData] = useState([]);

  const [showPro, setShowPro] = useState(true);
  const setShowProFunc = () => {
    if (sectionData.length + customData.length === 0) {
      setShowPro(false);
    } else {
      if (props.basic && sectionData.length + customData.length >= 1) {
        setShowPro(true);
      } else if (props.starter && sectionData.length + customData.length >= 2) {
        setShowPro(true);
      } else {
        setShowPro(false);
      }
    }
  };

  useEffect(() => {
    setShowProFunc();
  }, [sectionData, customData]);

  const { username } = useContext(UserContext);
  const navigate = useRouter();

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  const handleSaveNewSectionWithoutIndex = async () => {
    let urlLink;
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      urlLink = "https://" + link;
    } else {
      urlLink = link;
    }
    setLoading(true);
    if (photo) {
      const imageRef = ref(storage, `/images/${photo.name}`);
      await uploadBytes(imageRef, photo)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              const config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + getCookie("jwt_token"),
                },
              };

              const formData1 = new FormData();
              formData1.append("header", "custom");
              formData1.append("websiteUrl", urlLink);
              formData1.append("name", props.profile);
              formData1.append("label", title);
              formData1.append("type", props.type);
              formData1.append("customLinkImage", downloadURL);
              formData1.append("isChecked", isChecked)
              formData1.append("animation", animation)

              const res1 = axios
                .put(`${serverUrl}/record/record/addcustomlink`, formData1)
                .then(() => {})
                .catch((err) => console.log(err));

              setAddForm(false);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.error("Error getting download URL from Firebase", err);
            });
        })
        .catch((err) => {
          setLoading(false);
          console.error("Error uploading image to Firebase Storage", err);
        });
    } else {
      const formData1 = new FormData();
      formData1.append("header", "custom");
      formData1.append("websiteUrl", urlLink);
      formData1.append("name", props.profile);
      formData1.append("label", title);
      formData1.append("type", props.type);
      formData1.append("customLinkImage", null);

      const res1 = axios
        .put(`${serverUrl}/record/record/addcustomlink`, formData1)
        .then(() => {})
        .catch((err) => console.log(err));

      setAddForm(false);
      setLoading(false);
    }
    setPreviewImage("");
    props.setDummyState((prev) => prev + 1);
    setLink("");
    setTitle("");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="h-[70vh] md:h-fit overflow-scroll ">
      <div className="mb-[50px]">
        {showPro && (
          <div className="w-full flex justify-center">
            <div className="w-full md:w-4/5 flex flex-col gap-4">
              <div className="flex xsm:mt-[30px] md:mt-[20px] mt-[30px] gap-[10px] flex-row justify-between items-center">
                <h1 className="font-[400] Plus-Jakarta-Sans-font-div">
                  To Add More Custom Link{" "}
                </h1>
                <div className="flex gap-2">
                  <PrimaryButton
                    text={"Upgrade"}
                    height="41px"
                    icon={<HiOutlineBolt />}
                    onClick={() => {
                      navigate.push(`/plan/${username}`);
                    }}
                  />

                  {/* <PrimaryButton
                    text={"Add"}
                    icon={<HiPlus />}
                    onClick={() => {
                      setAddForm(!addForm);
                    }}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        )}
        {loading && (
          <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm flex justify-center items-center">
            <LoadingAnimation />
          </div>
        )}

        <NewToast
          open={showToast}
          color="#FAFAFA"
          message="Your custom link added successfully!"
        />
      </div>

      {!showPro && (
        <div>
          <div className="flex flex-col items-center">
            <div className="w-full md:w-4/5 flex flex-col gap-5 mt-1 md:mt:4 mb-4">
              <InputField
                value={link}
                label="Link/URL"
                onChange={(e) => setLink(e.target.value)}
                placeholder="Link/URL enter here"
                width="100%"
              />
              <InputField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Title"
                placeholder="Title here"
                width="100%"
              />
              <div>
                <div className="flex justify-between pt-2 pb-4  xsm:pb-5">
                  <h1 className="font-semibold ecom-heading">
                    <div className="text-[14px]">
                      Upload Thumbnail(Optional){" "}
                    </div>
                    <span className="text-sm text-[#817c7c]">
                      {" "}
                      {/* {!props.pro && `(upto ${allowedFiles} files)`}{" "} */}
                    </span>
                  </h1>
                </div>
                {/* file input-1 starts here  */}
                <label
                  className="add-image min-h-fit cursor-pointer"
                  htmlFor="file"
                >
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    onChange={handleChange}
                  />

                  <img
                    className="mb-4 w-[48px] h-[48px]"
                    src={
                      require("../BottomComponents/ModuleTabs/ProductsAndServices/Button-Icon.png")
                        .default.src
                    }
                    alt=" "
                  />
                  <p className="image-text">
                    Upload or Drag & drop Icon/Image{" "}
                  </p>
                </label>
              </div>
              <div className="">
                {previewImage ? (
                  <div className="w-fit p-1 rounded-md relative">
                    <div
                      className="absolute right-0 top-0 bg-slate-200 rounded-full w-4 h-4 cursor-pointer"
                      onClick={() => setPreviewImage("")}
                    >
                      <HiOutlineX />
                    </div>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-20 h-20"
                    />
                  </div>
                ) : (
                  <div className="w-fit p-1 rounded-md relative">
                    <img
                      src={getImgUrl(link)}
                      alt="social-logo"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                )}
              </div>
              <div className="md:mb-[20px] mb-[60px] flex flex-col gap-y-4 ">
                <div className="flex items-center justify-end gap-x-4 ">
                  <p>Highlight Your Link</p>

                  <Switch
                    checked={isChecked}
                    onChange={handleToggleCustomLink}
                    onColor="#12A26E"
                    offColor="#A7A7A7"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    width={44}
                    height={24}
                  />
              
                </div>
                <PrimaryButton
                  onClick={() => {
                    handleSaveNewSectionWithoutIndex();
                  }}
                  text="Add Link"
                  width={"100%"}
                  isDisabled={link.length < 2 || title.length < 2}
                />
              </div>
              <CenterModal
                onModal={highlightModal}
                onClick={() => {setHighlightModal(false); if(animation ==""){
                  setIsChecked(false)
                }} }
                borderTopWidth="0px"
                marginTop="0.8rem"
                marginBottom="-0.3rem"
                text="Animate this link"
              >
                <div className="grid grid-cols-3 sm2:ml-12 gap-4 p-4 bg-white shadow-lg rounded-xl w-full max-w-md">
                  {animations.map((anim) => (
                    <button
                      key={anim}
                      onClick={() => {
                        setAnimation(anim);
                        setHighlightModal(false);
                      }}
                      className={`h-12 rounded-md border font-semibold text-sm transition-all flex items-center justify-center
                                      ${anim !== "none" ? anim : ""}
                                      bg-gray-200 hover:bg-black hover:text-white
                                    `}
                    >
                     {anim.replace(/1$/, "").toUpperCase()}
                    </button>
                  ))}
                </div>
              </CenterModal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCustomModal;
