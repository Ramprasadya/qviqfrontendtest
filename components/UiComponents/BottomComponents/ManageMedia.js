import React, { useContext, useEffect, useState } from "react";
// import { HiOutlinePencil } from "react-icons/hi";
import PrimaryButton from "../PrimaryButton";
import Iphone from "../Iphone";
import SwitchContainer from "../SwitchContainer";
import Accordian from "../Accordian";
import SocialMedia from "../SocialMedia";
// import LinkButtons from "../LinkButtons";
import LinkButtons2 from "../LinkButtons2";
import Switch from "react-switch";
import Delete from "../../SocialLinks/DeleteBox";
import EditBox from "../../SocialLinks/EditBox";
import Axios from "axios";
import Modal from "../../ModalComponent/Modal";
import ModalBasic from "../ModalSidebarBasic/ModalBasic";
import Picture from "../Image";
import Video from "../Video";
// import HoverComponent from "../HoverComponent/HoverComponent";
import { useRef } from "react";
import { UserContext } from "../../Contexts/context";
import { serverUrl } from "../../../config";
import NewModal from "../NewModal/NewModal";
import InputField from "../InputField";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Login/firebaseconfig";
import ProtagLarge from "../ProtagLarge";
import { HiLockClosed, HiOutlineLockClosed } from "react-icons/hi2";
import { RiLock2Line } from "react-icons/ri";
import { HiArrowSmRight, HiOutlineUpload } from "react-icons/hi";
import PrimaryButton2 from "../PrimaryButton2";
import ProModal from "./ProModal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import ProductsAndServices from "./ModuleTabs/ProductsAndServices/ProductsAndServices";
import { IoIosArrowForward } from "react-icons/io";
import uploadMedia from "./images/uploadMedia.svg";
import UploadMediaModalContent from "@/components/ProfileTemplates/ProfileComponents/ModalContent/UploadMediaModalContent";
import { SafeLocalStorage, getCookie } from "@/components/utils";
import NewToast from "../NewToast";
import LoadingAnimation from "../Loading/LoadingAnimation";
import CenterModal from "../NewModal/CenterModal";
// import { drop } from "lodash";

// component starts here
const ManageMedia = ({
  profile,
  current,
  type,
  switchStates,
  setSwitchStates,
  onToggleChange,
  // toggleStates,
  // setToggleStates,
  templateName,
  backgroundColor,
  buttonStyle,
  buttonColor,
  fontColor,
  color1,
  color2,
  bgImage,
  updateTemplateDataHandler,
}) => {
  const { dummyState, setDummyState, checkVariable } = useContext(UserContext);

  //states for custom edit
  const [customModal, setCustomModal] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [customIndex, setCustomIndex] = useState();

  const [highlightModal, setHighlightModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [animation, setAnimation] = useState("");

  const [editUrl, setEditUrl] = useState();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [photo, setPhoto] = useState("");
  const [linkName, setLinkName] = useState("");
  const [toggleStates, setToggleStates] = useState([]);
  const [openUploadMediadModal, setOpenUploadMediadModal] = useState(false);
  const navigate = useRouter();

  const [record, setRecord] = useState([]);
  const [pro, setPro] = useState("");
  const [starter, setStarter] = useState("");
  const [basic, setBasic] = useState("");
  const [emailVerified, setemailVerified] = useState("");
  const [showMessage, setShowtMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [appIndex, setAppIndex] = useState(null);
  const fetchData = async () => {
    const dataFromLocalStorage = SafeLocalStorage.getItem(profile);
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    if (dataFromLocalStorage) {
      const data = JSON.parse(dataFromLocalStorage);
      // //console.log("lol");
      setRecord(data);
      setPro(data[0].pro);
      setStarter(data[0].starter);
      setBasic(data[0].basic);
      setemailVerified(data[0].emailVerified);
    } else {
      try {
        const res = await Axios.get(
          `${serverUrl}/getUser/getUser/${profile}`,
          config
        );
        setRecord(res.data);
        // SafeLocalStorage.setItem(profile, JSON.stringify(res.data));
        setPro(res.data[0].pro);
        setStarter(res.data[0].starter);
        setBasic(res.data[0].basic);
        setemailVerified(res.data[0].emailVerified);
      } catch (error) {
        navigate.push("/login");
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
    if (!animation || animation === "") {
      setHighlightModal(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dummyState, checkVariable]);
  useEffect(() => {
    if (emailVerified === false) {
      navigate.push(`/selectprofile/${profile}`);
    }
  }, [emailVerified]);

  useEffect(() => {
    const onCount =
      customData.filter((item) => item.isOn == true).length +
      toggleStates.filter((item) => item.isOn == true).length;
    if (switchStates?.at(0)?.quickSelect && onCount > 1) {
      let newToggleStates = [...toggleStates];
      for (let i = 0; i < newToggleStates.length; i++) {
        if (newToggleStates[i].isOn) {
          newToggleStates[i].isOn = false;
          saveToggleState(i, false);
        }
      }
      setToggleStates(newToggleStates);
      let newCustomData = [...customData];
      for (let i = 0; i < newCustomData.length; i++) {
        if (newCustomData[i].isOn) {
          newCustomData[i].isOn = false;
          saveToggleStateCustom(i, false);
        }
      }
      setcustomData(newCustomData);
    }
    setDummyState(!dummyState);
  }, [switchStates?.at(0)?.quickSelect]);

  const handleToggle = (index, value) => {
    const newToggleStates = [...toggleStates];
    if (switchStates?.at(0)?.quickSelect) {
      let newCustomData = [...customData];
      for (let i = 0; i < newCustomData.length; i++) {
        if (newCustomData[i].isOn) {
          newCustomData[i].isOn = false;
          saveToggleStateCustom(i, false);
        }
      }
      setcustomData(newCustomData);
      for (let i = 0; i < newToggleStates.length; i++) {
        if (index != i && newToggleStates[i].isOn) {
          newToggleStates[i].isOn = false;
          saveToggleState(i, false);
        }
      }
    }
    newToggleStates[index].isOn = value;
    setToggleStates(newToggleStates);
    saveToggleState(index, value); // Save the toggle state to MongoDB
    if (typeof onToggleChange === "function") {
      onToggleChange(newToggleStates); // Pass the updated toggle state back to the parent component
    }
    // setDummyState(!dummyState)
  };
  const saveToggleState = (index, value) => {
    fetch(`${serverUrl}/record/toggle/${toggleStates[index]._id}`, {
      method: "PUT",
      body: JSON.stringify({ isOn: value, name: profile }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setDummyState(!dummyState);
        } else {
        }
      })
      .catch((error) => {
        console.error("An error occurred while saving toggle state:", error);
      });
    //
  };
  const handleTogglePdf = (index, value) => {
    const newToggleStates = [...pdfData];
    newToggleStates[index].isOn = value;
    setpdfData(newToggleStates);
    saveToggleStatePdf(index, value); // Save the toggle state to MongoDB
    // if (typeof onToggleChange === "function") {
    //   onToggleChange(newToggleStates); // Pass the updated toggle state back to the parent component
    // }
    // setDummyState(!dummyState);
  };
  const saveToggleStatePdf = (index, value) => {
    fetch(`${serverUrl}/record/toggle/${pdfData[index]._id}`, {
      method: "PUT",
      body: JSON.stringify({ isOn: value, name: profile }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setDummyState(!dummyState);
        } else {
        }
      })
      .catch((error) => {
        console.error("An error occurred while saving toggle state:", error);
      });
    //
  };

  const handleToggleCustom = (index, value) => {
    const newCustomData = [...customData];
    if (switchStates?.at(0)?.quickSelect) {
      for (let i = 0; i < newCustomData.length; i++) {
        if (index != i && newCustomData[i].isOn) {
          newCustomData[i].isOn = false;
          saveToggleStateCustom(i, false);
        }
      }
      let newToggleStates = [...toggleStates];
      for (let i = 0; i < newToggleStates.length; i++) {
        if (newToggleStates[i].isOn) {
          newToggleStates[i].isOn = false;
          saveToggleState(i, false);
        }
      }
    }
    newCustomData[index].isOn = value;
    setcustomData(newCustomData);
    saveToggleStateCustom(index, value); // Save the toggle state to MongoDB
    // if (typeof onToggleChange === "function") {
    //   onToggleChange(newToggleStates); // Pass the updated toggle state back to the parent component
    // }
    // setDummyState(!dummyState);
  };
  const saveToggleStateCustom = (index, value) => {
    fetch(`${serverUrl}/record/toggle/${customData[index]._id}`, {
      method: "PUT",
      body: JSON.stringify({ isOn: value, name: profile }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setDummyState(!dummyState);
        } else {
        }
      })
      .catch((error) => {
        console.error("An error occurred while saving toggle state:", error);
      });
    //
  };

  const handleHighlightedApp = (index, value) => {
    const newToggleStates = [...toggleStates];

    if (!newToggleStates[index]) {
      console.error("Invalid index:", index);
      return;
    }

    newToggleStates[index].animation = value;
    setToggleStates(newToggleStates);
    saveToggleState2(index, value);
  };

  const saveToggleState2 = (index, value) => {
    fetch(`${serverUrl}/record/toggleHighlight/${toggleStates[index]._id}`, {
      method: "PUT",
      body: JSON.stringify({ animation: value, name: profile }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleHighlighted = (index, value) => {
    //console.log(index, value);
    const newToggleStates = [...toggleStates];
    newToggleStates[index].highlighted = value;
    setToggleStates(newToggleStates);
    saveToggleState1(index, value); // Save the toggle state to MongoDB
    // setDummyState(!dummyState);
  };
  const saveToggleState1 = (index, value) => {
    fetch(`${serverUrl}/record/toggleHighlight/${toggleStates[index]._id}`, {
      method: "PUT",
      body: JSON.stringify({ highlighted: value, name: profile }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // setDummyState(!dummyState)
  };
  const [open, setOpen] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);
  const [openPDF, setOpenPDF] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [id, setId] = useState("");
  const [highlighted, setHighlighted] = useState(false);
  const [label, setLabel] = useState("");
  const [userName, setUserName] = useState("");
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [idx, setIdx] = useState("");

  const handleDeletePdf = (index) => {
    setOpenPDF(true);
    // setPlatform(pdfData[index].pdfname);
    const plat = pdfData[index].pdfname.split(".");

    setPlatform(plat[plat.length - 1]);

    setId(pdfData[index]._id);
  };
  const handleDeleteCustom = (index) => {
    setOpenCustom(true);
    // setPlatform(customData[index].websiteUrl);
    setId(customData[index]._id);
  };
  const handleDelete = (index) => {
    setOpen(true);
    setPlatform(toggleStates[index].platform);
    setId(toggleStates[index]._id);
  };
  // console.log(toggleStates);

  const handleEdit = (index) => {
    setOpenEdit(true);
    setId(toggleStates[index]._id);
    setHighlighted(toggleStates[index].highlighted);
    setLabel(toggleStates[index].label);
    setUserName(toggleStates[index].userName);
    setPlatform(toggleStates[index].platform);
    setLink(toggleStates[index].link);
    setIdx(index);
  };
  // modal state
  const [modal, setModal] = useState(false);
  const [reload, setreload] = useState(0);
  const { inBuiltDialog, inBuiltDialogToggle, setInBuiltDialogPlatform } =
    useContext(UserContext);

  function toggleModal() {
    setModal((prev) => !prev);
    setreload((prevState) => prevState + 1);
    if (inBuiltDialog) {
      inBuiltDialogToggle();
    }
  }
  function toggleUploadMediadModal() {
    setOpenUploadMediadModal((prev) => !prev);
    setreload((prevState) => prevState + 1);
    if (inBuiltDialog) {
      inBuiltDialogToggle();
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setModal(false);
        setreload((prevState) => prevState + 1);
      }
    }

    if (modal) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modal]);
  // useEffect(() => {
  //   if (reload % 2 == 0) {
  //     // If quickSelect is true, update the dummyState to force a re-render of the component
  //     setDummyState(!dummyState);
  //   }
  // }, [reload]);

  // accordian 2 state
  const [show, setShow] = useState(true);

  // accordian 3 state
  const [showVideo, setShowVideo] = useState(false);

  // const [dropdownId, setDropdownId] = useState("")
  // const [displayActive , setDisplayActive] = useState(false)

  // const dropdownRef = useRef(null);

  // useEffect(() => {
  //   function handleClickOutside(event) {

  //     if(dropdownId){
  //       if(displayActive ){
  //         if (dropdownRef.current && !dropdownRef.current.contains(event.target) ){
  //           const dropdownMenu = document.getElementById(dropdownId);
  //           dropdownMenu.style.display = dropdownMenu.style.display === "block"?"none":"none";
  //          setDisplayActive(!displayActive)
  //           }
  //       }

  //   }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);

  // }, [dropdownId]);
  const [pdfData, setpdfData] = useState([]);
  const [customData, setcustomData] = useState([]);
  const [imgData, setimgData] = useState([]);
  const [videoData, setVideo] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token"),
    },
  };
  const fetchRecords = async () => {
    const { data } = await Axios.get(
      `${serverUrl}/record/contentData/${profile}/${type}`,
      config
    );
    // //console.log(data.img);
    setpdfData(data.pdf);
    setcustomData(data.custom);
    // console.log(data.custom);

    setimgData(data.img);
    setVideo(data.video);
  };

  const fetchToggleStates = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const { data } = await Axios.get(
        `${serverUrl}/record/record/${profile}/${type}`,
        config
      );
      setToggleStates(data);
    } catch (error) {
      //console.log(error?.response?.data?.error);
      navigate.push("/login");
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchToggleStates();
  }, [dummyState, customModal]);

  const [propsActiveCategory, setPropsActiveCategory] = useState("social");

  // limit the word size
  const limitWord = (word, limit) => {
    if (word !== null && word !== undefined && word !== "") {
      if (word.length > limit) {
        return word.slice(0, limit) + "...";
      } else {
        return word;
      }
    }
  };

  // refs
  const dropdownRefs = useRef([]);
  const doticonrefs = useRef([]);
  const dropdown2Refs = useRef([]);
  const doticon2refs = useRef([]);
  const dropdown3Refs = useRef([]);
  const doticon3refs = useRef([]);

  // detect click on window
  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropdownRefs.current !== undefined &&
        doticonrefs.current !== undefined
      ) {
        if (dropdownRefs.current.length > 0 && doticonrefs.current.length > 0) {
          doticonrefs.current.forEach((ref, index) => {
            if (ref !== null) {
              if (ref && !ref.contains(event.target)) {
                dropdownRefs.current[index].style.display = "none";
              }
            }
          });
        }
      }

      if (
        dropdown2Refs.current !== undefined &&
        doticon2refs.current !== undefined
      ) {
        if (
          dropdown2Refs.current.length > 0 &&
          doticon2refs.current.length > 0
        ) {
          doticon2refs.current.forEach((ref, index) => {
            if (ref !== null) {
              if (ref && !ref.contains(event.target)) {
                dropdown2Refs.current[index].style.display = "none";
              }
            }
          });
        }
      }

      if (
        dropdown3Refs.current !== undefined &&
        doticon3refs.current !== undefined
      ) {
        if (
          dropdown3Refs.current.length > 0 &&
          doticon3refs.current.length > 0
        ) {
          doticon3refs.current.forEach((ref, index) => {
            if (ref !== null) {
              if (ref && !ref.contains(event.target)) {
                dropdown3Refs.current[index].style.display = "none";
              }
            }
          });
        }
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

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

  const [editLable, setEditLable] = useState();

  //custom edit modal
  const handleEditCustom = (index) => {
    setCustomModal(true);
    setCustomIndex(index);
  };

  useEffect(() => {
    setPreviewImage("");
    setPhoto("");

    if (customData[customIndex]) {
      setEditUrl(customData[customIndex].websiteUrl);
      setEditLable(customData[customIndex].label);
    }
  }, [customModal]);

  // get the edit data or image if there
  const handleLinkSave = (id, index, animationValue) => {
    let newUrl;
    if (!editUrl.startsWith("http://") && !editUrl.startsWith("https://")) {
      newUrl = "https://" + editUrl;
    } else {
      newUrl = editUrl;
    }
    if (photo !== "") {
      const imageRef = ref(storage, `/images/${photo.name}`);
      uploadBytes(imageRef, photo)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              const content = {
                label: editLable !== "" ? editLable : customData[index].label,
                websiteUrl:
                  editUrl !== "" ? newUrl : customData[customIndex].websiteUrl,
                id: id,
                customLinkImage: downloadURL,
                animation: animationValue,
                isChecked: isChecked,
              };
              handleCustomEdit(content);
            })
            .catch((err) => {
              console.error("Error getting download URL from Firebase", err);
            });
        })
        .catch((err) => {
          console.error("Error uploading image to Firebase Storage", err);
        });
    } else {
      const content = {
        label: editLable !== "" ? editLable : customData[index].label,
        websiteUrl:
          editUrl !== "" ? newUrl : customData[customIndex].websiteUrl,
        id: id,
        customLinkImage: "null",
        animation: animationValue,
        isChecked: isChecked,
      };
      handleCustomEdit(content);
    }
  };

  // send the update data to the backend route
  const handleCustomEdit = async (content) => {
    await fetch(`${serverUrl}/record/record/editcustomlink`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: profile,
        websiteUrl: content.websiteUrl,
        label: content.label,
        id: content.id,
        customLinkImage: content.customLinkImage,
        animation: content.animation,
        isChecked: content.isChecked,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.error) {
          //console.log(data.error);
        } else {
          setCustomModal(false);
        }
      });
    setDummyState((prev) => prev + 1);
  };
  //function for handle the change in the file
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

  const restrictedPlatforms = [
    "Linktree",
    "Signal",
    "Pinterest",
    "Reddit",
    "Roposo",
    "Meetup",
    "Behance",
    "Chingari",
    "Josh",
    "Clubhouse",
    "Whatsappbusiness",
    "Tiktok",
    "Onlyfans",
    "Patreon",
    "Quora",
    "Moj",
    "Soundcloud",
    "Applepodcasts",
    "Savan",
    "Wynk",
    "Googleplaymusic",
    "Tidal",
    "Medium",
    "Ghost",
    "Tumblr",
    "Joomla",
    "Jimdo",
    "Flipkart",
    "Amazon",
    "Meesho",
    "Shopify",
    "Cloutloot",
    "Indiamart",
    "Bitcoin Wallet",
    "Ethereum",
    "Tether",
    "Solana",
    "Binance",
    "Trading View",
    "Opensea",
    "Notes",
    "Calendely",
    "Google Play",
    "Apple Store",
    "Phone",
    "Email",
    "Contact Card",
    "Facetime",
    "Gmail",
    "Yahoo Mail",
    "Outlook",
  ];

  // show the modal
  const [showModal, setShowModal] = useState(false);

  let count = 0;
  if (pro) {
    count = imgData.length;
  } else if (basic) {
    count = 4;
  } else {
    count = 15;
  }

  let customLinkCount = 0;
  if (pro) {
    customLinkCount = customData.length;
  } else if (basic) {
    customLinkCount = 1;
  } else {
    customLinkCount = 2;
  }

  let pdfCount = 0;
  if (pro) {
    pdfCount = imgData.length + 1;
  } else if (basic) {
    pdfCount = 1;
  } else {
    pdfCount = 2;
  }

  const [showTab, setShowTab] = useState("Media links");

  useEffect(() => {
    const tab = SafeLocalStorage.getItem("mediaTab");
    setShowTab(tab ? tab : "Media links");
  }, []);

  const handleTabClick = (tab) => {
    SafeLocalStorage.setItem("mediaTab", tab);
  };

  const social = [
    {
      text: "Linkedin",
      type: "basic",
    },
    {
      text: "Facebook",
      type: "basic",
    },
    {
      text: "Behance",
      type: "pro",
    },
    {
      text: "Instagram",
      type: "basic",
    },
  ];

  const [ptab, setPTab] = useState(
    propsActiveCategory === "video" || propsActiveCategory === "content"
      ? "Qviq Link Store"
      : "Add Custom Link"
  );

  function handleDeleteImage(id) {
    //console.log(id);
    const name = profile;
    const response = fetch(`${serverUrl}/record/record/deleteimg/${profile}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
      body: JSON.stringify({
        name,
        id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          //console.log(data.error);
        } else {
          setDummyState((prevState) => prevState + 1);
        }
      });
  }

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const handleHighlighteApp = async() => {
  //  setAnimation("bounce")
  //   try {
  //     const response = await fetch(
  //       `${serverUrl}/record/record/updateLink/${profile}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + getCookie("jwt_token"),
  //         },
  //         body: JSON.stringify({
  //           name: profile,
  //           id: id,
  //           label: label,
  //           userName: cleanedLink,
  //           platform: platform,
  //           animation:animation
  //         }),
  //       }
  //     );
  //     if (response.ok) {
  //       setDummyState((prevState) => prevState + 1);
  //       // setOpen(false);
  //     } else {
  //       console.error("Failed to update link");
  //     }
  //   } catch (error) {
  //     console.error("Failed to update link:", error);
  //   }
  // };

  useEffect(() => {
    if (
      Array.isArray(customData) &&
      customData.length > 0 &&
      customData[customIndex]
    ) {
      setAnimation(customData[customIndex].animation || "");
      setIsChecked(customData[customIndex].isChecked || false);
      // console.log("Animation:", customData[customIndex].animation);
    }
  }, [customData, customIndex]);

  return (
    <div
      className={
        current === "Add Links" || current === "Add Links"
          ? "bottom-container "
          : "hidden"
      }
    >
      {/* left-container  */}
      <div className="left w-full p-3 mb-[4rem] xsm:p-5 sm:p-6">
        <SwitchContainer
          profile={profile}
          switchStates={switchStates}
          setSwitchStates={setSwitchStates}
          toggleStates={toggleStates}
        />

        <div className="left-section">
          <div className="left w-full">
            <div className="pb-[30px] flex overflow-x-auto cursor-pointer">
              <div
                className={`"flex flex-col items-center px-[8px] md:px-[16px] py-[8px] md:min-w-[147px] w-full cursor-pointer" ${
                  showTab === "Media links"
                    ? "border-b-[0.1875rem] border-b-[#1A1A1A]"
                    : "border-b-[0.0625rem]"
                }`}
                onClick={() => {
                  setShowTab("Media links");
                  handleTabClick("Media links");
                }}
              >
                <p
                  className={`text-[13px] md:text-[16px] w-full text-center                  
                  ${
                    showTab === "Media links"
                      ? "text-[#1A1A1A] font-[600]"
                      : "text-[#817C7C] font-[400]"
                  }`}
                >
                  Media links
                </p>
              </div>

              <div
                className={`"flex flex-col items-center px-[8px] md:px-[16px] py-[8px] md:min-w-[147px] w-full cursor-pointer" ${
                  showTab === "Upload media"
                    ? "border-b-[0.1875rem] border-b-[#1A1A1A]"
                    : "border-b-[0.0625rem]"
                }`}
                onClick={() => {
                  setShowTab("Upload media");
                  handleTabClick("Upload media");
                }}
              >
                <p
                  className={`text-[13px] md:text-[16px] w-full text-center                  
                  ${
                    showTab === "Upload media"
                      ? "text-[#1A1A1A] font-[600]"
                      : "text-[#817C7C] font-[400]"
                  }`}
                >
                  Upload media
                </p>
              </div>

              <div
                className={`"flex flex-col items-center px-[8px] md:px-[16px] py-[8px] md:min-w-[147px] w-full cursor-pointer" ${
                  showTab === "Add products"
                    ? "border-b-[0.1875rem] border-b-[#1A1A1A]"
                    : "border-b-[0.0625rem]"
                }`}
                onClick={() => {
                  setShowTab("Add products");
                  handleTabClick("Add products");
                }}
              >
                <p
                  className={`text-[13px] md:text-[16px] w-full text-center                   
                  ${
                    showTab === "Add products"
                      ? "text-[#1A1A1A] font-[600]"
                      : "text-[#817C7C] font-[400]"
                  }`}
                >
                  Add products
                </p>
              </div>

              <div
                className={`"flex flex-col items-center px-[8px] md:px-[16px] py-[8px] md:min-w-[147px] w-full cursor-pointer" ${
                  showTab === "Add services"
                    ? "border-b-[0.1875rem] border-b-[#1A1A1A]"
                    : "border-b-[0.0625rem]"
                }`}
                onClick={() => {
                  setShowTab("Add services");
                  handleTabClick("Add services");
                }}
              >
                <p
                  className={`text-[13px] md:text-[16px] w-full text-center                   
                  ${
                    showTab === "Add services"
                      ? "text-[#1A1A1A] font-[600]"
                      : "text-[#817C7C] font-[400]"
                  }`}
                >
                  Add services
                </p>
              </div>
            </div>
          </div>

          <ProductsAndServices
            showTab={showTab}
            switchStates={switchStates}
            setSwitchStates={setSwitchStates}
            updateTemplateDataHandler={updateTemplateDataHandler}
          />

          {showTab === "Media links" && (
            <>
              <div className="manage-media-links flex justify-between items-center">
                <p className="text-[18px] font-[600]">
                  Add links to your qviq-site
                </p>
                <div className="add-link-button">
                  <PrimaryButton
                    onClick={() => {
                      setPropsActiveCategory("social");
                      toggleModal();
                    }}
                    width={"100%"}
                  />
                </div>
              </div>

              {/*1st accordian*/}
              <Accordian text="Apps, Payments & more" show={true}>
                <div className="mb-11">
                  {toggleStates?.length === 0 ? (
                    <div className="w-full flex flex-col items-center gap-[10px]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pb-3 w-full">
                        {social.map((app) => (
                          <div
                            className={`rounded-xl flex items-center justify-between px-3 xsm:px-4 py-3 xsm:py-4 flex-1 so-m
                          ${
                            !pro &&
                            ((basic && app.type === "pro") ||
                              toggleStates.some(
                                (item) => item.platform === app.text
                              ))
                              ? "hover:cursor-default"
                              : "hover:cursor-pointer"
                          }`}
                            key={app.id}
                            onClick={
                              !pro &&
                              ((basic && app.type === "pro") ||
                                (!pro &&
                                  toggleStates.some(
                                    (item) => item.platform === app.text
                                  )))
                                ? null
                                : () => {
                                    toggleModal();
                                    setPTab("Qviq Link Store");
                                    setPropsActiveCategory("social");
                                    setInBuiltDialogPlatform(app.text);
                                    inBuiltDialogToggle();
                                  }
                            }
                          >
                            <div className="flex items-center gap-x-2">
                              <img
                                src={
                                  require(`../../Logos/SocialMediaLogos/${app.text
                                    .toLowerCase()
                                    .split(" ")
                                    .join("")}.png`).default.src
                                }
                                alt="social-logo"
                                className="w-8 h-8"
                              />
                              <p className="text-sm font-medium">{app.text}</p>
                            </div>

                            {!pro &&
                            ((basic && app.type === "pro") ||
                              (!pro &&
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

                      <div
                        className="flex flex-row justify-center items-center gap-[6px] hover:gap-[10px] cursor-pointer transition-[400ms]"
                        onClick={() => {
                          toggleModal();
                          setPropsActiveCategory("social");
                          setPTab("Qviq Link Store");
                        }}
                      >
                        <p
                          className="text-[14px] font-[500]"
                          style={{
                            background:
                              "linear-gradient(225deg, #FB6609 0%, #E40849 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          View all apps
                        </p>
                        <IoIosArrowForward className="text-[#FB6609] text-[18px]" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Delete
                        open={open}
                        profile={profile}
                        type={type}
                        id={id}
                        platform={platform}
                        setOpen={setOpen}
                        toggleStates={toggleStates}
                        setToggleStates={setToggleStates}
                      />
                      <EditBox
                        open={openEdit}
                        setDummyState={setDummyState}
                        idx={idx}
                        handleHighlighted={handleHighlighted}
                        label={label}
                        highlight={highlighted}
                        userName={userName}
                        platform={platform}
                        link={link}
                        profile={profile}
                        type={type}
                        id={id}
                        setOpen={setOpenEdit}
                        toggleStates={toggleStates}
                        setToggleStates={setToggleStates}
                        animation={animation}
                        setAnimation={setAnimation}
                        handleHighlightedApp={handleHighlightedApp}
                        appIndex={appIndex}
                        message={message}
                        setMessage={setMessage}
                        showMessage={showMessage}
                        setShowMessage={setShowtMessage}
                      />

                      <div className="grid min-[640px]:grid-cols-2 md:grid-cols-1 min-[850px]:grid-cols-2 gap-4">
                        {toggleStates?.map((off, index) => {
                          return (
                            <div
                              key={off._id}
                              style={{
                                border: "1px solid #FAFAFA",
                              }}
                              className="relative w-full min-w-[250px] min-[640px]:max-w-[300px] lg:max-w-[350px] 2xl:max-w-full  h-[64px] rounded-[12px] mb-[8px] gap-[8px] px-1.5 py-[16px] xsm:p-[16px] bg-white shadow-md  "
                            >
                              <div className="w-[auto] h-[32px] p-0 flex justify-between items-center ">
                                <div className="flex">
                                  {off.platform === "Website" ? (
                                    <img
                                      className="w-8 h-8 rounded-full "
                                      src={getImgUrl(off.userName)}
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      className="w-[32px] h-[32px] rounded-sm "
                                      src={
                                        require(`../../SocialLinks/logos/${off.platform
                                          .toLowerCase()
                                          .split(" ")
                                          .join("")}.png`).default.src
                                      }
                                      alt=""
                                    />
                                  )}

                                  <div className="flex flex-col gap-1 h-[32px] ml-[8px] poppins leading-[14px] ">
                                    <div className=" font-normal text-[#A7A7A7] text-[12px]">
                                      {off.platform}
                                    </div>
                                    <div className="font-medium text-[#1A1A1A] text-[14px]">
                                      {limitWord(off.label, 15)}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex h-[24px] md2:gap-[10px] xsm:gap-[10px] ">
                                  {!pro &&
                                    restrictedPlatforms.includes(
                                      off.platform
                                    ) && (
                                      <div className="flex items-center">
                                        <ProtagLarge />
                                      </div>
                                    )}
                                  <Switch
                                    checked={
                                      !pro &&
                                      restrictedPlatforms.includes(off.platform)
                                        ? false
                                        : off.isOn
                                    }
                                    onChange={(value) => {
                                      (!restrictedPlatforms.includes(
                                        off.platform
                                      ) ||
                                        pro) &&
                                        handleToggle(index, value);
                                      restrictedPlatforms.includes(
                                        off.platform
                                      ) &&
                                        !pro &&
                                        setShowModal(true);
                                    }}
                                    onColor="#12A26E"
                                    offColor="#A7A7A7"
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    width={44}
                                    height={24}
                                  />

                                  <div
                                    className="dots-icon"
                                    ref={(ref) =>
                                      (doticonrefs.current[index] = ref)
                                    }
                                    onClick={() => {
                                      const dropDownOtherItems =
                                        document.querySelectorAll(
                                          ".dropdown-menu"
                                        );
                                      dropDownOtherItems.forEach((item) => {
                                        if (
                                          item.id !== `dropdown-menu-${index}`
                                        ) {
                                          item.style.display = "none";
                                        } else {
                                          if (item.style.display === "none") {
                                            item.style.display = "block";
                                          } else {
                                            item.style.display = "none";
                                          }
                                        }
                                      });
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-more-vertical"
                                    >
                                      <circle cx="12" cy="12" r="1"></circle>
                                      <circle cx="12" cy="5" r="1"></circle>
                                      <circle cx="12" cy="19" r="1"></circle>
                                    </svg>
                                    <div
                                      className="dropdown-menu"
                                      style={{
                                        display: "none",
                                        top: "55px",
                                        width: "236px",
                                        zIndex: 990,
                                      }}
                                      id={`dropdown-menu-${index}`}
                                      ref={(ref) =>
                                        (dropdownRefs.current[index] = ref)
                                      }
                                    >
                                      <ul>
                                        <li onClick={() => handleEdit(index)}>
                                          {" "}
                                          Edit
                                        </li>
                                        <li onClick={() => handleDelete(index)}>
                                          {" "}
                                          Delete
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </Accordian>

              {/* 2nd accordian  */}
              <Accordian text="Custom Links" show={true}>
                <div className="mb-11">
                  <>
                    {/* <div className="flex justify-between">
                    <p className=" font-medium ">Your Content</p>
                    <LinkButtons2
                      text="Edit Content"
                      onClick={() => {
                        setPropsActiveCategory("content");
                        toggleModal();
                      }}
                    />
                  </div> */}

                    <div className="pt-0">
                      <p className="text-sm text-cGrey">CUSTOM LINKS</p>
                      {/* {customData.length === 0 ? ( */}
                      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-7">
                        <p className="text-sm sm:text-base">
                          Add your Links to showcase on your QviqSite
                        </p>
                        <LinkButtons2
                          text="Add Links"
                          onClick={() => {
                            setPropsActiveCategory("links");
                            setPTab("Add Custom Link");
                            toggleModal();
                          }}
                        />
                      </div>
                      <>
                        <Delete
                          open={openCustom}
                          profile={profile}
                          type={type}
                          id={id}
                          platform={"website"}
                          setOpen={setOpenCustom}
                          toggleStates={customData}
                          setToggleStates={setcustomData}
                        />

                        {customModal && (
                          <NewModal
                            onModal="flex"
                            onClick={setCustomModal}
                            height="auto"
                            text={"Edit Your Custom Link"}
                          >
                            <div className=" w-full flex justify-center items-center my-4">
                              {previewImage || editUrl ? (
                                <img
                                  className={`w-20 h-20 rounded-full ${
                                    isChecked && animation
                                  }`}
                                  src={
                                    previewImage
                                      ? previewImage
                                      : `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${
                                          editUrl.startsWith("https://")
                                            ? editUrl
                                            : "https://" + editUrl
                                        }&size=256`
                                  }
                                  alt=""
                                />
                              ) : customData[customIndex].customLinkImage !==
                                "null" ? (
                                <img
                                  className={`w-20 h-20 rounded-full ${
                                    isChecked && animation
                                  }`}
                                  src={customData[customIndex].customLinkImage}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className={`w-20 h-20 rounded-full ${
                                    isChecked && animation
                                  }`}
                                  src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${
                                    customData[customIndex].websiteUrl
                                      .startsWith
                                      ? customData[customIndex].websiteUrl
                                      : "https://" +
                                        customData[customIndex].websiteUrl
                                  }&size=720`}
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="flex flex-col gap-4">
                              <InputField
                                label="Link Label *"
                                width="100%"
                                height="40px"
                                placeholder={customData[customIndex].label}
                                value={editLable}
                                onChange={(e) => {
                                  setEditLable(e.target.value);
                                }}
                              />
                              <InputField
                                label="Link/ URL *"
                                width="100%"
                                height="40px"
                                placeholder={customData[customIndex].websiteUrl}
                                value={editUrl}
                                onChange={(e) => {
                                  setEditUrl(e.target.value);
                                }}
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
                                  <Image
                                    className="mb-4 w-[48px] h-[48px]"
                                    src={require(".././BottomComponents/ModuleTabs/ProductsAndServices/Button-Icon.png")}
                                    alt="image"
                                  />
                                  <p className="image-text">
                                    Upload or Drag & drop Icon/Image{" "}
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div className="my-4 pb-[60px] md:pb-[10px] flex flex-col gap-y-4 ">
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
                                <div
                                  className="dots-icon"
                                  onClick={() => {
                                    if (isChecked) {
                                      setHighlightModal(true);
                                    }
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-more-vertical"
                                  >
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="12" cy="5" r="1"></circle>
                                    <circle cx="12" cy="19" r="1"></circle>
                                  </svg>
                                  <div
                                    className="dropdown-menu"
                                    style={{
                                      display: "none",
                                      top: "55px",
                                      width: "236px",
                                      zIndex: 990,
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <PrimaryButton
                                onClick={() =>
                                  handleLinkSave(
                                    customData[customIndex]._id,
                                    customIndex,
                                    animation
                                  )
                                }
                                width="100%"
                                text={"Update Link"}
                              />
                            </div>
                            <CenterModal
                              onModal={highlightModal}
                              onClick={() => setHighlightModal(false)}
                              borderTopWidth="0px"
                              marginTop="0.8rem"
                              marginBottom="-0.3rem"
                              text="Animate this link"
                            >
                                <div className="grid grid-cols-3 sm2:ml-12 gap-4 md:gap-8 lg:gap-12  p-4 bg-white shadow-lg rounded-xl w-full max-w-md">
                                {animations.map((anim,index) => {
                                  const isSelected =
                                    animations.indexOf(animation) === index;
                                  return (
                                    <button
                                      key={anim}
                                      onClick={() => {
                                        setAnimation(anim);
                                        setHighlightModal(false);

                                        handleLinkSave(
                                          customData[customIndex]._id,
                                          customIndex,
                                          anim
                                        );
                                      }}
                                     className={`h-12 rounded-md border font-semibold text-sm transition-all flex items-center justify-center
        ${anim !== "none" ? anim : ""}
        ${
          isSelected
            ? "border-2 border-amber-500 bg-black text-white"
            : "bg-gray-200 hover:bg-black hover:text-white"
        }
      `}
                                    >
                                     {anim.replace(/1$/, "").toUpperCase()}
                                    </button>
                                  );
                                })}
                              </div>
                            </CenterModal>
                          </NewModal>
                        )}

                        <div className="grid min-[640px]:grid-cols-2 md:grid-cols-1 min-[850px]:grid-cols-2 gap-4">
                          {customData.map((off, index) => {
                            let url = off.websiteUrl;
                            if (
                              !url.startsWith("http://") &&
                              !url.startsWith("https://")
                            ) {
                              url = "https://" + url;
                            }
                            return (
                              <div
                                key={off._id}
                                style={{
                                  border: "1px solid #FAFAFA",
                                }}
                                className="relative w-full min-w-[250px] min-[640px]:max-w-[300px] lg:max-w-[350px] 2xl:max-w-full  h-[64px] rounded-[12px] mb-[8px] gap-[8px] px-1.5 py-[16px] xsm:p-[16px] bg-white shadow-md  "
                              >
                                <div className="w-full h-[32px] p-0 flex justify-between items-center">
                                  <div className="flex">
                                    {off.customLinkImage !== "null" ? (
                                      <img
                                        className="w-8 h-8 rounded-full "
                                        src={off.customLinkImage}
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        className="w-8 h-8 rounded-full "
                                        src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=256`}
                                        alt=""
                                      />
                                    )}
                                    <div className="flex flex-col  gap-1 h-[32px] ml-[8px] text-[14px] poppins leading-[14px] ">
                                      <div className=" font-normal text-[#A7A7A7] text-[12px]">
                                        Custom Link
                                      </div>
                                      <div className="font-medium text-[#1A1A1A] text-[14px]">
                                        {windowWidth < 1440
                                          ? limitWord(off.label, 7)
                                          : limitWord(off.label, 14)}
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className={`flex h-[24px] md2:gap-[10px] xsm:gap-[10px] gap-[5px]`}
                                  >
                                    {index >= customLinkCount && (
                                      <div className="flex items-center">
                                        <ProtagLarge />
                                      </div>
                                    )}
                                    <Switch
                                      checked={
                                        index >= customLinkCount
                                          ? false
                                          : off.isOn
                                      }
                                      onChange={(value) => {
                                        index < customLinkCount &&
                                          handleToggleCustom(index, value);
                                        index >= customLinkCount &&
                                          setShowModal(true);
                                      }}
                                      onColor="#12A26E"
                                      offColor="#A7A7A7"
                                      checkedIcon={false}
                                      uncheckedIcon={false}
                                      width={44}
                                      height={24}
                                    />

                                    <div
                                      className="dots-icon"
                                      ref={(ref) =>
                                        (doticon2refs.current[index] = ref)
                                      }
                                      onClick={() => {
                                        const dropDownOtherItems =
                                          document.querySelectorAll(
                                            ".dropdown-menucustom"
                                          );
                                        dropDownOtherItems.forEach((item) => {
                                          if (
                                            item.id !==
                                            `dropdown-menucustom-${index}`
                                          ) {
                                            item.style.display = "none";
                                          } else {
                                            if (item.style.display === "none") {
                                              item.style.display = "block";
                                            } else {
                                              item.style.display = "none";
                                            }
                                          }
                                        });
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-more-vertical"
                                      >
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="12" cy="5" r="1"></circle>
                                        <circle cx="12" cy="19" r="1"></circle>
                                      </svg>

                                      <div
                                        className="dropdown-menucustom"
                                        style={{
                                          display: "none",
                                          top: "55px",
                                          width: "236px",
                                          zIndex: 990,
                                        }}
                                        id={`dropdown-menucustom-${index}`}
                                        ref={(ref) =>
                                          (dropdown2Refs.current[index] = ref)
                                        }
                                      >
                                        <ul>
                                          <li
                                            onClick={() => {
                                              handleEditCustom(index);
                                              setCustomModal(true);
                                              setEditClicked(true);
                                              setAppIndex(index);
                                            }}
                                          >
                                            {" "}
                                            Edit
                                          </li>
                                        </ul>
                                        <ul>
                                          <li
                                            onClick={() =>
                                              handleDeleteCustom(index)
                                            }
                                          >
                                            {" "}
                                            Delete
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    </div>
                  </>
                </div>
              </Accordian>

              <Accordian text="Videos" show={true}>
                <div className="mb-11">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <p className="text-sm sm:text-base">
                      Add your videos to showcase on your QviqSite
                    </p>
                    <LinkButtons2
                      text="Add Videos"
                      onClick={() => {
                        setPropsActiveCategory("video");
                        setPTab("Qviq Link Store");
                        toggleModal();
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    {/* <p className="text-sm md:text-base font-medium">
                        Your videos
                      </p> */}
                    {/* <div className="w-full mb-9 flex justify-center sm:justify-start"> */}
                    <Video
                      profile={profile}
                      type={type}
                      record={videoData}
                      setRecord={setVideo}
                      setPropsActiveCategory={setPropsActiveCategory}
                      toggleModal={toggleModal}
                      setDummyState={setDummyState}
                      pro={pro}
                      basic={basic}
                    />
                    {/* </div> */}
                    {/* <div className="flex flex-col gap-2 xsm:flex-row xsm:gap-0 justify-between pt-3">
                        <p className=" font-medium ">Your Content</p>
                        <LinkButtons text="Edit Content" icon={<HiOutlinePencil />} />
                      </div> */}
                  </div>
                </div>
              </Accordian>
            </>
          )}

          {showTab === "Upload media" && (
            <>
              <div className="flex xsm3:flex-row flex-col xsm3:justify-between gap-[1rem] w-full">
                <div className="flex flex-row justify-start items-center gap-4 w-full">
                  <p className="text-lg font-semibold">
                    Upload images & documents
                  </p>
                </div>
                <div className="w-full flex xsm3:flex-col flex-row xsm3:justify-center items-end">
                  <PrimaryButton
                    width={"fit-content"}
                    icon={<HiOutlineUpload />}
                    className={
                      "xsm1:!h-[40px] md:!h-[48px] md:!text-[16px]  xsm1:!text-[12px] !h-[40px] !text-[11px]"
                    }
                    text="Upload media"
                    onClick={toggleUploadMediadModal}
                  />
                </div>
              </div>
              {imgData.length > 0 && (
                <>
                  <h1 className="font-semibold text-[18px] mt-[32px] mb-[20px]">
                    My Images
                  </h1>
                  <div className="grid grid-cols-4 gap-[16px]">
                    {imgData.map((imageData, index) => {
                      return (
                        <div className="relative">
                          <img
                            className="aspect-square rounded-[16px]"
                            src={imageData.image}
                            alt=""
                          />
                          <div
                            className="absolute md:top-[12px] md:right-[12px] top-[6px] right-[6px] rounded-full cursor-pointer"
                            onClick={() => {
                              handleDeleteImage(imageData._id);
                            }}
                          >
                            <IoIosClose className="text-black md:text-[32px] text-[15px] bg-white rounded-full shadow-md" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {pdfData.length > 0 && (
                <div className="mt-[48px] mb-[20px]">
                  <h1 className="font-semibold text-[18px]">My Documents</h1>
                  <div className="pb-9">
                    {pdfData.length === 0 ? (
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        {/* <p className="text-sm sm:text-base">
                      Add your Documents to showcase on your QviqSite
                    </p> */}
                      </div>
                    ) : (
                      <>
                        <Delete
                          open={openPDF}
                          profile={profile}
                          type={type}
                          id={id}
                          platform={platform}
                          setOpen={setOpenPDF}
                          toggleStates={pdfData}
                          setToggleStates={setpdfData}
                        />
                        <div className="grid mt-[20px] min-[640px]:grid-cols-2 md:grid-cols-1 min-[850px]:grid-cols-2 gap-4">
                          {pdfData.map((off, index) => {
                            return (
                              <div
                                key={off._id}
                                style={{
                                  border: "1px solid #FAFAFA",
                                }}
                                className="relative w-full min-w-[250px] min-[640px]:max-w-[300px] lg:max-w-[350px] 2xl:max-w-full  h-[64px] rounded-[12px] mb-[8px] gap-[8px] px-1.5 py-[16px] xsm:p-[16px] bg-white shadow-md  "
                              >
                                <div className="w-auto h-[32px] p-0 flex justify-between items-center  ">
                                  <div className="flex">
                                    <Image
                                      className="w-8 h-8 rounded-sm "
                                      src={require(`../../Logos/FileFormatLogos/${off.pdfname
                                        .split(".")
                                        .pop()}.png`)}
                                      alt="logo"
                                    />
                                    {/* {//console.log(off.pdfname.split(".").pop())} */}
                                    <div className="flex flex-col justify-center gap-1 h-[32px] ml-[8px] text-[14px] poppins leading-[14px] ">
                                      <div className="font-medium text-[#1A1A1A]  text-[14px]">
                                        {limitWord(off.pdfname, 15)}
                                      </div>
                                    </div>
                                    {!pro && index >= pdfCount && (
                                      <div className="px-8">
                                        <ProtagLarge />
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex xsm:w-[76px] h-[24px] xsm:gap-[12px] ">
                                    <Switch
                                      checked={
                                        !pro && index >= pdfCount
                                          ? false
                                          : off.isOn
                                      }
                                      onChange={(value) => {
                                        (pro || index < pdfCount) &&
                                          handleTogglePdf(index, value);
                                        !pro &&
                                          index >= pdfCount &&
                                          setShowModal(true);
                                      }}
                                      onColor="#12A26E"
                                      offColor="#A7A7A7"
                                      checkedIcon={false}
                                      uncheckedIcon={false}
                                      width={44}
                                      height={24}
                                    />

                                    <div
                                      className="dots-icon"
                                      ref={(ref) =>
                                        (doticon3refs.current[index] = ref)
                                      }
                                      onClick={() => {
                                        const dropDownOtherItems =
                                          document.querySelectorAll(
                                            ".dropdown-menupdf"
                                          );
                                        dropDownOtherItems.forEach((item) => {
                                          if (
                                            item.id !==
                                            `dropdown-menupdf-${index}`
                                          ) {
                                            item.style.display = "none";
                                          } else {
                                            if (item.style.display === "none") {
                                              item.style.display = "block";
                                            } else {
                                              item.style.display = "none";
                                            }
                                          }
                                        });
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-more-vertical"
                                      >
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="12" cy="5" r="1"></circle>
                                        <circle cx="12" cy="19" r="1"></circle>
                                      </svg>

                                      <div
                                        className="dropdown-menupdf"
                                        style={{
                                          display: "none",
                                          top: "55px",
                                          width: "236px",
                                          zIndex: 990,
                                        }}
                                        id={`dropdown-menupdf-${index}`}
                                        ref={(ref) =>
                                          (dropdown3Refs.current[index] = ref)
                                        }
                                      >
                                        <ul>
                                          <li
                                            onClick={() =>
                                              handleDeletePdf(index)
                                            }
                                          >
                                            {" "}
                                            Delete
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {pdfData.length === 0 && imgData.length === 0 && (
                <>
                  <div className="flex flex-col items-center justify-center gap-[20px] py-24">
                    <Image
                      src={uploadMedia}
                      className="w-auto h-[150px] sm:h-[200px]"
                      alt="image"
                    />

                    <div className="w-full">
                      <p className="text-[16px] sm:text-[18px] font-[500] text-[#817C7C] text-center break">
                        You haven’t added any images or documents yet. <br />
                        Add image gallery and documents to your Qviq-site
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
            // <>
            //   {/* 3rd accordian  */}
            // <Accordian text="Documents" show={true}>
            //   <div className="pb-9">
            //     <p className="text-sm text-cGrey">DOCUMENTS</p>
            //     <div className="w-full flex justify-between">
            //     <div className="flex flex-col w-full sm:flex-row justify-between gap-4">
            //       <p className="text-sm sm:text-base">
            //           Add your Documents to showcase on your QviqSite
            //         </p>
            //         <LinkButtons2
            //           text="Add Documents"
            //           onClick={() => {
            //             setPropsActiveCategory("content");
            //             toggleModal();
            //           }}
            //         />
            //       </div>

            //         </div>
            //     {pdfData.length === 0 ? (
            //       <div className="flex flex-col sm:flex-row justify-between gap-4">
            //       {/* <p className="text-sm sm:text-base">
            //           Add your Documents to showcase on your QviqSite
            //         </p> */}

            //       </div>
            //     ) : (
            //       <>
            //         <Delete
            //           open={openPDF}
            //           profile={profile}
            //           type={type}
            //           id={id}
            //           platform={platform}
            //           setOpen={setOpenPDF}
            //           toggleStates={pdfData}
            //           setToggleStates={setpdfData}
            //         />
            //         <div className="grid mt-[16px] min-[640px]:grid-cols-2 md:grid-cols-1 min-[850px]:grid-cols-2 gap-4">
            //           {pdfData.map((off, index) => {
            //             return (
            //               <div
            //                 key={off._id}
            //                 style={{
            //                   border: "1px solid #FAFAFA",
            //                 }}
            //                 className="relative w-full min-w-[250px] min-[640px]:max-w-[300px] lg:max-w-[350px] 2xl:max-w-full  h-[64px] rounded-[12px] mb-[8px] gap-[8px] px-1.5 py-[16px] xsm:p-[16px] bg-white shadow-md  "
            //               >
            //                 <div className="w-auto h-[32px] p-0 flex justify-between items-center  ">
            //                   <div className="flex">
            //                     <Image
            //                       className="w-8 h-8 rounded-sm "
            //                       src={require(`../../Logos/FileFormatLogos/${off.pdfname
            //                         .split(".")
            //                         .pop()}.png`)}
            //                       alt=""
            //                     />

            //                     <div className="flex flex-col justify-center gap-1 h-[32px] ml-[8px] text-[14px] poppins leading-[14px] ">
            //                       <div className="font-medium text-[#1A1A1A]  text-[14px]">
            //                         {limitWord(off.pdfname, 15)}
            //                       </div>
            //                     </div>
            //                     {!pro && index >= pdfCount && (
            //                       <div className="px-8">
            //                         <ProtagLarge />
            //                       </div>
            //                     )}
            //                   </div>

            //                   <div className="flex xsm:w-[76px] h-[24px] xsm:gap-[12px] ">
            //                     <Switch
            //                       checked={
            //                         !pro && index >= pdfCount ? false : off.isOn
            //                       }
            //                       onChange={(value) => {
            //                         (pro || index < pdfCount) &&
            //                           handleTogglePdf(index, value);
            //                         !pro && index >= pdfCount && setShowModal(true);
            //                       }}
            //                       onColor="#12A26E"
            //                       offColor="#A7A7A7"
            //                       checkedIcon={false}
            //                       uncheckedIcon={false}
            //                       width={44}
            //                       height={24}
            //                     />

            //                     <div
            //                       className="dots-icon"
            //                       ref={(ref) =>
            //                         (doticon3refs.current[index] = ref)
            //                       }
            //                       onClick={() => {
            //                         const dropDownOtherItems =
            //                           document.querySelectorAll(
            //                             ".dropdown-menupdf"
            //                           );
            //                         dropDownOtherItems.forEach((item) => {
            //                           if (
            //                             item.id !==
            //                             `dropdown-menupdf-${index}`
            //                           ) {
            //                             item.style.display = "none";
            //                           } else {
            //                             if (item.style.display === "none") {
            //                               item.style.display = "block";
            //                             } else {
            //                               item.style.display = "none";
            //                             }
            //                           }
            //                         });
            //                       }}
            //                     >
            //                       <svg
            //                         xmlns="http://www.w3.org/2000/svg"
            //                         width="24"
            //                         height="24"
            //                         viewBox="0 0 24 24"
            //                         fill="none"
            //                         stroke="currentColor"
            //                         strokeWidth="2"
            //                         strokeLinecap="round"
            //                         strokeLinejoin="round"
            //                         className="feather feather-more-vertical"
            //                       >
            //                         <circle cx="12" cy="12" r="1"></circle>
            //                         <circle cx="12" cy="5" r="1"></circle>
            //                         <circle cx="12" cy="19" r="1"></circle>
            //                       </svg>

            //                       <div
            //                         className="dropdown-menupdf"
            //                         style={{
            //                           display: "none",
            //                           top: "55px",
            //                           width: "236px",
            //                           zIndex: 990,
            //                         }}
            //                         id={`dropdown-menupdf-${index}`}
            //                         ref={(ref) =>
            //                           (dropdown3Refs.current[index] = ref)
            //                         }
            //                       >
            //                         <ul>
            //                           <li
            //                             onClick={() => handleDeletePdf(index)}
            //                           >
            //                             {" "}
            //                             Delete
            //                           </li>
            //                         </ul>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //               </div>
            //             );
            //           })}
            //         </div>
            //       </>
            //     )}

            //   </div>
            //  </Accordian>

            //   {/* 4th accordian */}
            // <Accordian text="Images" show={true}>
            //   <div className="pb-9">
            //     <p className="text-sm text-cGrey">IMAGES</p>
            //     <div className="flex flex-col sm:flex-row justify-between gap-4">
            //         <p className="text-sm sm:text-base">
            //           Add your Images to showcase on your QviqSite
            //         </p>
            //         <LinkButtons2
            //           text="Add Images"
            //           onClick={() => {
            //             setPropsActiveCategory("content");
            //             toggleModal();
            //           }}
            //         />
            //       </div>
            //     {imgData.length === 0 ? (
            //       <div className="flex flex-col sm:flex-row justify-between gap-4">
            //         {/* <p className="text-sm sm:text-base">
            //           Add your Images to showcase on your QviqSite
            //         </p>
            //         <LinkButtons2
            //           text="Add Images"
            //           onClick={() => {
            //             setPropsActiveCategory("content");
            //             toggleModal();
            //           }}
            //         /> */}
            //       </div>
            //     ) : (
            //       <>
            //         {" "}
            //         <div className="flex items-center gap-3 mt-4 w-full flex-wrap">
            //           {showModal && (
            //             <ProModal
            //               profile={profile}
            //               showModal={showModal}
            //               setShowModal={setShowModal}
            //             />
            //           )}
            //           {imgData.map((item, index) => (
            //             <div className="relative">
            //               {index >= count && (
            //                 <div
            //                   onClick={() => setShowModal(true)}
            //                   className="cursor-pointer z-[1] absolute top-0 rounded-lg w-full h-full flex justify-center items-center bg-[#aba5a554] backdrop-blur-[2px]"
            //                 >
            //                   <RiLock2Line
            //                     style={{
            //                       width: 30,
            //                       height: 30,
            //                       // color: "#A9A9A9",
            //                     }}
            //                   />
            //                 </div>
            //               )}
            //               <Picture
            //                 key={index}
            //                 profile={profile}
            //                 item={item}
            //                 setDummyState={setDummyState}
            //               />
            //             </div>
            //           ))}
            //         </div>
            //       </>
            //     )}
            //   </div>
            // </Accordian>

            //   {/* 5th accordian  */}
            //   <Accordian text="Videos" show={true}>
            //     <div className="mb-11">
            //       {videoData.length === 0 ? (
            //         <div className="flex flex-col sm:flex-row justify-between gap-4">
            //           <p className="text-sm sm:text-base">
            //             Add your videos to showcase on your QviqSite
            //           </p>
            //           <LinkButtons2
            //             text="Add Videos"
            //             onClick={() => {
            //               setPropsActiveCategory("video");
            //               setPTab("Qviq Link Store")
            //               toggleModal();
            //             }}
            //           />
            //         </div>
            //       ) : (
            //         <div className="flex flex-col">
            //           <p className="text-sm md:text-base font-medium">
            //             Your videos
            //           </p>
            //           {/* <div className="w-full mb-9 flex justify-center sm:justify-start"> */}
            //           <Video
            //             profile={profile}
            //             type={type}
            //             record={videoData}
            //             setRecord={setVideo}
            //             setPropsActiveCategory={setPropsActiveCategory}
            //             toggleModal={toggleModal}
            //             setDummyState={setDummyState}
            //             pro={pro}
            //             basic={basic}
            //           />
            //           {/* </div> */}
            //           {/* <div className="flex flex-col gap-2 xsm:flex-row xsm:gap-0 justify-between pt-3">
            //             <p className=" font-medium ">Your Content</p>
            //             <LinkButtons text="Edit Content" icon={<HiOutlinePencil />} />
            //           </div> */}
            //         </div>
            //       )}
            //     </div>
            //   </Accordian>
            // </>
          )}
        </div>
      </div>
      {openUploadMediadModal && (
        <NewModal
          onModal={openUploadMediadModal}
          onClick={toggleUploadMediadModal}
          text={"Upload Media"}
          children={
            <UploadMediaModalContent
              profile={profile}
              type={type}
              pro={pro}
              starter={starter}
              basic={basic}
              toggleModal={toggleUploadMediadModal}
              toggleStates={toggleStates}
              setDummyState={setDummyState}
              customData={customData}
              videoData={videoData}
            />
          }
        />
      )}

      {/* modal starts here  */}
      {modal && (
        <Modal
          label="Add Links: Qviq Link Store"
          // showSpan={true}
          onClick={toggleModal}
        >
          <ModalBasic
            setPTab={setPTab}
            ptab={ptab}
            profile={profile}
            type={type}
            pro={pro}
            starter={starter}
            basic={basic}
            toggleModal={toggleModal}
            propsActiveCategory={propsActiveCategory}
            setPropsActiveCategory={setPropsActiveCategory}
            toggleStates={toggleStates}
            setToggleStates={setToggleStates}
            setDummyState={setDummyState}
            videoData={videoData}
            customData={customData}
            setcustomData={setcustomData}
            setShowtMessage={setShowtMessage}
            setMessage={setMessage}
            setLoading={setLoading}
          />
        </Modal>
      )}

      {/* right-container */}

      {/* <Iphone
          toggleStates={toggleStates}
          profile={profile}
          template={type}
          templateName={templateName}
          customData={customData}
          videoData={videoData}
          imgData={imgData}
          pdfData={pdfData}
          backgroundColor={backgroundColor}
          buttonStyle={buttonStyle}
          buttonColor={buttonColor}
          fontColor={fontColor}
          color1={color1}
          color2={color2}
          bgImage={bgImage}
        /> */}

      <NewToast open={showMessage} message={message} />
      {isLoading && (
        <>
          <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-black/30 z-[9999]">
            <div className="flex flex-col justify-center relative items-center w-[3rem] h-[3rem]">
              <img
                src={require("../../Image/Tapop logo black.png").default.src}
                alt=""
                className="object-contain"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center">
              <LoadingAnimation />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageMedia;
