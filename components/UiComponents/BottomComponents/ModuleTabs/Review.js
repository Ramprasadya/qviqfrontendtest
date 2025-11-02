import React, { useState, useEffect, useContext, useRef } from "react";
import LinkButtons2 from "../../LinkButtons2";
import "./review.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Switch from "react-switch";
import PrimaryButton2 from "../../PrimaryButton2";
import InputFIeldTextArea from "../../InputFIeldTextArea";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineDocumentDuplicate,
} from "react-icons/hi";
import axios from "axios";
import InputField from "../../InputField";
import { clientUrl, serverUrl } from "../../../../config";
import ReviewFromUser from "./ReviewFromUser";
import AddReviewToProfile from "./AddReviewToProfile";
import modalBanner from "../../modal.png";
import NewModal from "../../NewModal/Newmodal3";
import { UserContext } from "../../../Contexts/context";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { getCookie, SafeLocalStorage } from "@/components/utils";
import NewToast from "../../NewToast";
import { Rating } from "@mui/material";
import Tapop from "../../../Image/tapop.png";
import { HiArrowDownTray } from "react-icons/hi2";
import TapopQrModal from "@/components/Dashboard/TapopQrModal";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import QRCodeStyling from "qr-code-styling";
import LoadingAnimation from "../../Loading/LoadingAnimation";

function Review(props) {
  const [ptab, setPTab] = useState("Get reviews from viewers");
  const { userType,updateCheckVariable } = useContext(UserContext);
  const [changeButton, setChangeButton] = useState();
  const [showMessage, setShowMessage] = useState("");
  const [showMessagaeState, setShowMessageState] = useState(false);
  // console.log(props.switchStates);
  // console.log(props.switchStates[0].reviewButtonSwitch);
    //Tapop qr modal states
  const [showQRModal, setShowQRModal] = useState(false);
    const profile = {
    profile: useParams().userName,
    type: useParams().templateId,
  };
  const [gtab, setGTab] = useState("Review");
    const [QRcolor, setQRcolor] = useState("#000000");
  const [QRlogo, setQRlogo] = useState(Tapop?.src);
  const [urlData, setUrlData] = useState(
    `https://${profile.profile}.qviq.io/?source=qr`
  );

  const [starValue, setStarValue] = useState(0);
  const [reviewUrl, setReviewUrl] = useState("");
  const [googleReviewValue, setGoogleReviewValue] = useState({});
  const [starError, setStarError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [isLoading, setisLoading] = useState(false)

  // state for switch 1
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  // state for switch 2
  const [checked2, setChecked2] = useState(false);
  const handleChange2 = () => {
    setChecked2((prev) => !prev);
  };



  const { copyToClipboard } = useContext(UserContext);

  // const [labels, setLabels] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(
  //         `${serverUrl}/review/getLabels/${profile.type}/${profile.profile}`
  //       );
  //       setLabels(response.data);
  //       //console.log(response.data);
  //     } catch (error) {
  //       //console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, [profile]);

  const fetchGoogleReview = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/review/getGoogleReviewData/${profile.profile}`
      );
      if (res.data) {
        // console.log(res.data.star);
        setGoogleReviewValue(res.data);
        setStarValue(res.data.starValue || 0);
        setReviewUrl(res.data.reviewUrl || "");
        setReviewMessage(
          res.data.reviewMessage || "Sorry for the inconvenience"
        );
      } else {
        console.log("No Review found");
      }
    } catch (error) {
      console.log(error);
    }
  };



  // state for toggling label
  const [showLabel, setShowLabel] = useState(false);
  //handling label
  const handleLabel = async () => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/review/addLabel/${profile.type}/${profile.profile}`,
        {
          label: changeButton,
          profile: profile,
        }
      );
    } catch (error) {
      //console.log(error);
    }
  };

  // handling save
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const save = () => {
    try {
      const { data } = axios.post(
        `${serverUrl}/review/editReview/${profile.type}/${profile.profile}`,
        {
          name: name,
          email: email,
          message: message,
          profile: profile,
          // option:option
        }
      );
      setName("");
      setEmail("");
      setMessage("");
      // setOption('');
      if (data) {
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const handleToggle = async (index, value) => {
    const newSwitchStates = [...props.switchStates];
    newSwitchStates[index].reviewSwitch = value;
    props.setSwitchStates(newSwitchStates);
    await saveToggleState(index, value);
  };

  const handleSaveGReview = async () => {
    try {
      const response = await axios.put(
        `${serverUrl}/review/updateGoogleReviewData/${profile.type}/${profile.profile}`,
        {
          starValue,
          reviewUrl,
          reviewMessage: reviewMessage.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
        }
      );

      if (response.status === 200) {
        // console.log("Review added successfully");
        setShowMessage("Review added successfully");
        setShowMessageState(true);
        setTimeout(() => {
          setShowMessageState(false);
        }, 3000);
        return { success: true, message: response.data.message };
      } else {
        setShowMessage("Failed to add review data");
        setShowMessageState(true);
        setTimeout(() => {
          setShowMessageState(false);
        }, 3000);
        return { success: false, message: "Failed to add review data" };
      }
    } catch (error) {
      console.error("Error adding review data:", error);
      return { success: false, message: error.message };
    }
  };

  const saveToggleState = async (index, value) => {
    await axios.put(
      `${serverUrl}/review/reviewToggle/${profile.type}/${profile.profile}`,
      {
        reviewSwitch: value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      }
    );
    props.updateTemplateDataHandler();
  };
  const handleStarToggle = async (index, value) => {
    const newSwitchStates = [...props.switchStates];
    newSwitchStates[index].starSwitch = value;
    props.setSwitchStates(newSwitchStates);
    await saveStarToggleState(index, value);
  };

  const saveStarToggleState = async (index, value) => {
    await axios.put(
      `${serverUrl}/review/starToggle/${profile.type}/${profile.profile}`,
      {
        starSwitch: value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      }
    );
    props.updateTemplateDataHandler();
  };
  // console.log(props.switchStates);

  const handleToggleReviewButton = (index, value) => {
    const newSwitchStates = [...props.switchStates];

    newSwitchStates[index].reviewButtonSwitch = value;

    if (value) {
      newSwitchStates[index].googleReviewButtonSwitch = false;
    }
    props.setSwitchStates(newSwitchStates);
    (async () => {
      if (value) {
        await saveToggleStateGoogleReviewButton(index, false);
      }
      await saveToggleStateReviewButton(index, value);
    })();
  };

  const handleToggleGoogleReviewButton = (index, value) => {
    const newSwitchStates = [...props.switchStates];

    newSwitchStates[index].googleReviewButtonSwitch = value;

    if (value) {
      newSwitchStates[index].reviewButtonSwitch = false;
    }
    props.setSwitchStates(newSwitchStates);

    (async () => {
      if (value) {
        await saveToggleStateReviewButton(index, false);
      }
      await saveToggleStateGoogleReviewButton(index, value);
    })();
  };

  const saveToggleStateReviewButton = async (index, value) => {
    await axios.put(
      `${serverUrl}/review/reviewButtonToggle/${profile.type}/${profile.profile}`,
      {
        reviewButtonSwitch: value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      }
    );
    props.updateTemplateDataHandler();
  };
  const saveToggleStateGoogleReviewButton = async (index, value) => {
    await axios.put(
      `${serverUrl}/review/reviewButtonToggle/${profile.type}/${profile.profile}`,
      {
        googleReviewButtonSwitch: value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      }
    );
    props.updateTemplateDataHandler();
  };
  const [data, setData] = useState([]);

  const navigate = useRouter();

  const [dummyState, setDummyState] = useState(0);

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const response = await fetch(
        `${serverUrl}/review/getReview/${profile.type}/${profile.profile}`,
        config
      );
      if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      //console.log(error);
      navigate.push("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, [dummyState]);
  const [labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState("");
  useEffect(() => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      axios
        .get(
          `${serverUrl}/review/getLabel/${profile.type}/${profile.profile}`,
          config
        )
        .then((response) => {
          const reviewLabel = response.data[0]?.reviewLabel || "Review";

          setChangeButton(reviewLabel);
        });
      axios
        .get(
          `${serverUrl}/review/getReviewArray/${profile.type}/${profile.profile}`,
          config
        )
        .then((response) => {
          const reviewLabelList = response.data[0]?.reviewLabelList || [
            "Review",
            "Ratings",
            "Feedback",
          ];

          setLabels(reviewLabelList);
        });
    } catch (error) {
      //console.log(error);
    }
  }, []);
  const handleSaveLabel = () => {
    const updatedLabels = [...labels, newLabel];

    const limitedLabels =
      updatedLabels.length <= 4
        ? updatedLabels
        : [...updatedLabels.slice(0, 3), newLabel];

    try {
      axios
        .put(
          `${serverUrl}/review/updateLabels/${profile.type}/${profile.profile}`,
          {
            reviewLabelList: limitedLabels,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getCookie("jwt_token"),
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setLabels(limitedLabels);

            setNewLabel("");
            handleReviewLabel(newLabel);
          } else {
            console.error("Label update failed");
          }
        });
    } catch (error) {
      //console.log(error);
    }
  };

  const handleReviewLabel = async (value) => {
    setChangeButton(value);
    await axios.put(
      `${serverUrl}/review/reviewLabel/${profile.type}/${profile.profile}`,
      {
        reviewLabel: value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      }
    );
    props.updateTemplateDataHandler();
  };
  const [showModal, setShowModal] = useState(false);

  const validateUrl = (value) => {
    const urlRegex = /^(https?:\/\/)?([^\s.]+\.\S{2,}|localhost[:?\d]*)\S*$/;
    if (!urlRegex.test(value)) {
      setUrlError("Please enter a valid URL");
    } else {
      setUrlError("");
    }
    setReviewUrl(value);
  };

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sharelink = `Check out my profile on Qviq http://${profile.profile}.qviq.io`;
  // qrcode
  const [color, setbackendColor] = useState("#000000");
  const [img, setImage] = useState(Tapop?.src);

  // ---------------------------------



  const qrCodeOptions = {
    width: 720,
    height: 720,
    margin: 40,
    dotsOptions: {
      color: QRcolor,
      type: "rounded",
    },
    imageOptions: {
      hideBackgroundDots: true,
      crossOrigin: "anonymous",
      margin: 20,
      imageSize: 0.5,
    },
    backgroundOptions: {
      round: 0.04,
      color: "#fff",
    },
    data: urlData,
    image: QRlogo,
  };

  let qrCode = new QRCodeStyling(qrCodeOptions);

  const QRref = useRef(null);

  // To get the person data from backend
  const getQRcode = async () => {
    try {
      // console.log(`Attempting to fetch: ${serverUrl}/person/gget/${profile.profile}`)

      // Change 'sget' to 'gget'
      let res = await axios.get(`${serverUrl}/person/gget/${profile.profile}`);

      // If no data found, make POST request and get the new data
      if (!res.data || res.data.length === 0) {
        // console.log("No data found, making POST request...")

        try {
          // Change 'spost' to 'gpost'
          await axios.post(`${serverUrl}/person/gpost/${profile.profile}`);
          // console.log("POST request successful, fetching data again...")

          // Get the data again after POST - change 'sget' to 'gget'
          res = await axios.get(`${serverUrl}/person/gget/${profile.profile}`);
        } catch (postError) {
          // console.error("Error in POST request:", postError)
          throw new Error("Failed to create data via POST request");
        }
      }

      // Rest of your code remains the same...
      if (!res.data || res.data.length === 0) {
        // console.log("No data available after POST request")
        return;
      }

      if (res.data === "error") {
        // console.log("Server returned error response")
        throw new Error("Server returned error response");
      }

      const data = res.data[0];
      setbackendColor(data.colour);
      setQRcolor(data.colour);

      if (data.image && data.image !== "") {
        setQRlogo(data.image);
      }

      if (data.image !== "" && data.colour !== "") {
        qrCode.append(QRref.current);
      }
    } catch (error) {
      console.error("Error in getQRcode:", error);
    }
  };

  useEffect(() => {
    qrCode.append(QRref.current);
  }, [gtab,updateCheckVariable,isLoading,QRref,QRcolor,QRlogo]);

  useEffect(() => {
    qrCode.append(QRref.current);
    //console.log(urlData, QRlogo, QRcolor);
  }, [dummyState, QRcolor, QRlogo, urlData, gtab,updateCheckVariable,isLoading]);

  useEffect(() => {
    qrCode.update({
      data: urlData,
      image: QRlogo,
      dotsOptions: {
        color: QRcolor,
      },
    });
  }, [QRcolor, QRlogo, urlData]);

  const onDownloadClick = () => {
    qrCode.download({
      extension: "png",
    });
  };

  //  Redendering the component at once
  useEffect(() => {
    getQRcode();
  }, [dummyState, gtab]);

  // -------------------------


  // show qr code as image function
  const qrCodeRef = useRef(null);

  const showQrCodeFunction = (qrCodeRef, width, img, color) => {
    const QrCodeWithLogo = require("qrcode-with-logos").default;
    const qrcode = new QrCodeWithLogo({
      content: `https://${profile}.qviq.io/?source=qr}`,
      width: width,
      image: qrCodeRef.current,
      logo: {
        src: img,
        logoSize: 0.25,
        bgColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderSize: 0.06,
        borderRadius: 0,
      },
      nodeQrCodeOptions: {
        color: { dark: color },
        errorCorrectionLevel: "Q",
        margin: 3,
      },
    });

    // qrcode.toImage().then(() => {});
  };

  useEffect(() => {
    if (qrCodeRef && qrCodeRef.current && type !== "") {
      showQrCodeFunction(qrCodeRef, 130, img, color);
    }
  }, [qrCodeRef, dummyState, color, img, profile.type, gtab]);

    useEffect(() => {
    if (props.switchStates[0].googleReviewButtonSwitch) {
      fetchGoogleReview();
    }
    if (props.switchStates[0].reviewButtonSwitch) {
      setGTab("Review");
    } else {
      setGTab("Google Review");
    }
  }, [gtab,updateCheckVariable,isLoading,QRref,QRcolor,QRlogo]);

  return (
    <div className={props.showTab === "Reviews" ? "text-yellow" : "hidden"}>
      <div className="flex items-center gap-3">
        {/* <p className="text-base sm:text-lg font-semibold min-w-fit">
          {changeButton}
        </p> */}
        <NewModal
          text="Upgrade to PRO"
          onModal={showModal}
          onClick={setShowModal}
        >
          <Image src={modalBanner} alt="modal banner" className="pt-[48px]" />
          <p className="mt-[24px] sm:mt[32px] text-[#817C7C] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
            By becoming a pro member, you can expand your network, unlock and
            add more media links, and analyse your profile visits and audience.
          </p>

          <div className="py-[32px]">
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                Unlock additional media links and add them to your profile.
              </div>
            </div>
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                You can include multiple custom links, pdf files, and additional
                images.
              </div>
            </div>
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                Add appointment slots and receive appointments through your
                profile.
              </div>
            </div>
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                Domain customization
              </div>
            </div>
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                Get more Templates & Themes for your profiles
              </div>
            </div>
            <div className="flex flex-row justify-start items-center py-[5px]">
              <div
                className="w-[8px] h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                }}
              ></div>
              <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                Multiple Qviq profiles can be created and managed.
              </div>
            </div>
          </div>
        </NewModal>
        {userType != "Pro" && (
          <button
            onClick={setShowModal}
            type="button"
            className="pro-tag-large text-white font-medium rounded-full hover:cursor-default"
          >
            Pro
          </button>
        )}
      </div>

      <div className="flex items-center relative mt-3 p-1 rounded-full productBackground text-center">
        <p
          onClick={() => {
            setGTab("Review");
          }}
          className={
            gtab === "Review"
              ? "productTabActive rounded-full"
              : "productTabNotActive rounded-full"
          }
        >
          Review
        </p>

        <p
          onClick={() => {
            setGTab("Google Review");
          }}
          className={
            gtab === "Google Review"
              ? "productTabActive rounded-full"
              : "productTabNotActive rounded-full"
          }
        >
          Get Google Review
        </p>

        <div className="absolute  right-[17px] top-[-14px]">
          <span className="inline-block w-[60px] text-[13px] py-[2px] px-[5px] bg-red-100 text-red-600 font-medium rounded-full ">
            Beta
          </span>
        </div>
      </div>

      {gtab === "Review" && (
        <>
          <div className="flex items-center py-7 gap-4">
            <p className="text-lg font-semibold">Get Qviq Review</p>
            {props.switchStates.map((off, index) => (
              <Switch
                key={index}
                checked={off.reviewButtonSwitch}
                onChange={(value) => handleToggleReviewButton(index, value)}
                onColor="#12A26E"
                offColor="#A7A7A7"
                checkedIcon={false}
                uncheckedIcon={false}
                height={24}
                width={44}
                disabled={userType != "Pro" ? true : false}
              />
            ))}
          </div>

          <p className="pt-6 text-sm text-cGrey font-medium">
            Select a label for your review section/button
          </p>

          {/* using same class for buttons from appointments buttons  */}

          <div className="pt-4 flex gap-3 overflow-x-auto">
            {labels.map((label) => (
              <button
                key={label}
                onClick={() => handleReviewLabel(label)}
                className={
                  changeButton === label ? "appnt-btn" : "appnt-btn-unselected"
                }
              >
                {label}
              </button>
            ))}
          </div>
          <div className="pt-6" onClick={() => setShowLabel((prev) => !prev)}>
            <LinkButtons2
              icon={showLabel ? <HiChevronUp /> : <HiChevronDown />}
              text="Add New Label"
            />
          </div>

          {showLabel && (
            <div className="pt-4 gap-3 flex flex-col sm:flex-row sm:items-end">
              <InputField
                width={"100%"}
                height={40}
                placeholder="Type here.."
                label="Add label for Reviews"
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
              />

              <div className="sm:ml-[3.125rem]">
                <PrimaryButton2
                  isDisabled={userType != "Pro" ? true : false}
                  color="black"
                  text="Save"
                  onClick={handleSaveLabel}
                />
              </div>
            </div>
          )}
        </>
      )}

      {gtab === "Google Review" && (
        <>
          <div className="flex justify-between ">
            <div className="flex items-center py-7 gap-4">
              <p className="text-lg font-semibold">Get Google Review</p>
              {props.switchStates.map((off, index) => (
                <Switch
                  key={index}
                  checked={off.googleReviewButtonSwitch}
                  onChange={(value) =>
                    handleToggleGoogleReviewButton(index, value)
                  }
                  onColor="#12A26E"
                  offColor="#A7A7A7"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={24}
                  width={44}
                  disabled={userType != "Pro" ? true : false}
                />
              ))}
            </div>
            <div className=" hidden xsm2:flex w-[120px] h-[50px]  sm:mr-[3rem] xl:mt-6 mt-[20px]">
              <PrimaryButton2
                isDisabled={userType !== "Pro" || starError || urlError}
                color="black"
                text="Save"
                onClick={handleSaveGReview}
              />
            </div>
          </div>

          <div className="flex flex-col mt-3">
            <div className="xl:mt-6 mt-[15px]">
              <label className="text-[14px] font-medium">
                Google Review Url
              </label>
              <InputField
                type="text"
                placeholder="Enter google review url"
                value={reviewUrl}
                onChange={(e) => validateUrl(e.target.value)}
                width={`${windowWidth > 568 ? "50%" : "100%"}`}
                height="40px"
                fontSize="14px"
                borderRadius={props.square ? "0px" : "8px"}
              />
              {urlError && (
                <p className="text-red-500 text-sm mt-1">{urlError}</p>
              )}
            </div>

            <div className="xl:mt-6 mt-[15px] flex flex-col gap-y-2 ">
              <label className="text-[14px] font-medium">Bad Star Rating</label>
              <Rating
                name="full-review"
                value={starValue}
                size="large"
                onChange={async (event, newValue) => {
                  setStarValue(newValue);
                }}
              />
            </div>

            <div className="mt-[24px]">
              <InputFIeldTextArea
                placeholder="Enter Message"
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
                label="Feedback Form Heading"
                width={`${windowWidth > 568 ? "50%" : "100%"}`}
                height="40px"
                fontSize="14px"
                borderRadius={props.square ? "0px" : "8px"}
                color="black"
              />
            </div>

            <div className="grid  mt-4 md:mt-12 grid-cols-1 xsm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 md:gap-6">
              {/* QrCode */}
              <div
                className="p-4 md:p-5 rounded-lg relative"
                style={{
                  boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
                }}
              >
                <h2 className="text-base md:text-lg mb-3 font-semibold">
                  Scan the QR Code
                </h2>
                <div
                  className="absolute p-2 rounded-full right-5 top-4"
                  style={{
                    boxShadow: "0px 2px 8px rgba(171, 181, 217, 0.24)",
                    cursor: "pointer",
                  }}
                  onClick={onDownloadClick}
                >
                  <span className="text-[#F54040]">
                    <HiArrowDownTray />
                  </span>
                </div>

                {/* <img src="" alt="" ref={qrCodeRef} /> */}
                <div className="w-full pt-[10px] flex flex-col justify-center items-center">
                  <div
                    className="qrDiv rounded-[12px] w-[180px] h-[180px] overflow-hidden"
                    style={{
                      boxShadow:
                        "4px 2px 10px #abb5d93d, -1px -2px 6px #dce0ec3d",
                    }}
                    ref={QRref}
                  />
                </div>

                <p
                  className="flex text-sm add-icon font-medium items-center gap-1.5 mx-auto w-fit mt-5"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowQRModal(true);
                  }}
                >
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
                        stroke="url(#paint0_linear_2144_1464)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2144_1464"
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
                  </span>{" "}
                  Customize Qviq QR
                </p>
              </div>
              {/* QR Modal */}
              {showQRModal && (
                <TapopQrModal
                  onClick={() => {
                    setShowQRModal(false);
                  }}
                  googleQr={true}
                  dummyState1={dummyState}
                  setDummyState1={setDummyState}
                  templateId={profile.type}
                  showQrCodeFunction={showQrCodeFunction}
                  setisLoading={setisLoading}
                />
              )}

              {/* Share your tapop  */}
              <div
                className="p-4 md:p-5 rounded-lg"
                style={{
                  boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
                }}
              >
                <h2 className="text-base md:text-lg mb-3 font-semibold">
                  Share your Google Review
                </h2>
                <h2 className="text-[#817C7C] text-xs mb-4 md:mb-5">
                  Copy your page URL and share with anyone
                </h2>
                <div className="flex justify-between items-center h-fit break-all border border-[#1A1A1A] border-dotted rounded-lg px-1 [@media(min-width:300px)]:px-3 py-2.5 mb-6 md:mb-8">
                  <p className="text-xs font-medium">
                    https://{profile.profile}.qviq.io
                  </p>
                  <button
                    className="add-icon text-2xl active:scale-90 duration-150"
                    title="Copy URL"
                    onClick={() => {
                      copyToClipboard(
                        `https://${profile.profile}.qviq.io/?source=qr`
                      );
                    }}
                  >
                    <HiOutlineDocumentDuplicate />
                  </button>
                </div>

                <h2 className="mb-3">Share to your socials</h2>
                <div className="flex gap-5 mb-6 md:mb-0 flex-wrap">
                  <FacebookShareButton
                    url={sharelink}
                    quote={"qviq"}
                    hashtag={"#rightforu"}
                  >
                    <FacebookIcon size={40} borderRadius={12} />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={sharelink}
                    quote={"qviq"}
                    hashtag={"#rightforu"}
                  >
                    <WhatsappIcon size={40} borderRadius={12} />
                  </WhatsappShareButton>
                  <LinkedinShareButton
                    url={sharelink}
                    quote={"qviq"}
                    hashtag={"#rightforu"}
                  >
                    <LinkedinIcon size={40} borderRadius={12} />
                  </LinkedinShareButton>
                  <TwitterShareButton
                    url={sharelink}
                    quote={"qviq"}
                    hashtag={"#rightforu"}
                  >
                    {/* <TwitterIcon size={40} borderRadius={12} /> */}
                    <img
                      src={
                        require("../../../Logos/SocialMediaLogos/twitter.png")
                          .default.src
                      }
                      style={{
                        borderRadius: "12px",
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  </TwitterShareButton>
                </div>
              </div>

              {/* review  */}
              {/* {reviewLength !== 0 && (
                            <div
                              className="p-4 md:p-5 rounded-lg min-h-[186px] md:min-h-[284px]"
                              style={{
                                boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
                              }}
                            >
                              <div className="flex flex-col justify-between h-full">
                                <div>
                                  <h2 className="text-base md:text-lg mb-3 md:mb-4 font-semibold">
                                    Reviews
                                  </h2>
                                  <p className="text-[#817C7C] text-xs mb-2 md:mb-7">
                                    Total reviews received
                                  </p>
                                  <h1 className="text-[44px] font-semibold">
                                    {reviewLength}
                                  </h1>
                                </div>
                                <Link
                                  href={`/showreview/${profile}`}
                                  className="text-[#F54040] flex items-center gap-1.5 w-fit text-xs xsm:text-base"
                                >
                                  View Reviews <HiArrowRight />
                                </Link>
                              </div>
                            </div>
                          )} */}

              {/* Appointment  */}
              {/* <div
                            className="p-4 md:p-5 rounded-lg min-h-[204px] md:min-h-[284px]"
                            style={{
                              boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
                            }}
                          >
                            <div className="flex flex-col justify-between h-full">
                              <div>
                                <h2 className="text-base md:text-lg mb-3 md:mb-4 font-semibold">
                                  Appointments
                                </h2>
                                <p className="text-[#817C7C] text-xs mb-2 md:mb-7">
                                  Number of appointments scheduled in this week
                                </p>
                                <h1 className="text-[44px] font-semibold">05</h1>
                              </div>
                              <Link
                                href={`/appointement/${profile}`}
                                className="text-[#F54040] flex items-center gap-1.5 w-fit text-xs xsm:text-base"
                              >
                                Go to Appointments <HiArrowRight />
                              </Link>
                            </div>
                          </div> */}

              {/* Get Device  */}
              {/* <div
                            className="p-4 md:p-5 rounded-lg flex flex-col items-center"
                            style={{
                              boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
                            }}
                          >
                            <img
                              width={200}
                              height={120}
                              src={tapopcard}
                              className="lg:pb-4"
                              alt=""
                            />
                            <h2 className="text-base font-semibold mb-1">Get Devices</h2>
                            <p className="text-sm text-[#817C7C] mb-5 md:mb-[18px]">
                              Don’t have any devices?
                            </p>
                            <PrimaryButton2
                              text={"Get Device"}
                              onClick={() => {
                                navigate.push(`/products`);
                              }}
                            />
                          </div> */}
            </div>

            <div className=" flex xsm2:hidden xl:mt-6 justify-center mb-[6rem] md:mb-[4.5rem] mt-[15px]">
              <PrimaryButton2
                isDisabled={userType !== "Pro" || starError || urlError}
                color="black"
                text="Save"
                onClick={handleSaveGReview}
              />
            </div>
          </div>
        </>
      )}
      {gtab === "Review" && (
        <>
          <div className="flex items-center mt-6 p-1 rounded-full productBackground text-center">
            <p
              onClick={() => setPTab("Get reviews from viewers")}
              className={
                ptab === "Get reviews from viewers"
                  ? "productTabActive rounded-full"
                  : "productTabNotActive rounded-full"
              }
            >
              Get reviews from viewers
            </p>
            <p
              onClick={() => setPTab("Add reviews to profile")}
              className={
                ptab === "Add reviews to profile"
                  ? "productTabActive rounded-full"
                  : "productTabNotActive rounded-full"
              }
            >
              Add reviews to profile
            </p>
          </div>
          {ptab === "Get reviews from viewers" ? (
            <>
              <ReviewFromUser
                handleChange={handleChange}
                checked={checked}
                handleChange2={handleChange2}
                checked2={checked2}
                save={save}
                name={name}
                email={email}
                message={message}
                setName={setName}
                setEmail={setEmail}
                setMessage={setMessage}
                profile={profile.profile}
                type={profile.type}
                switchStates={props.switchStates}
                setSwitchStates={props.setSwitchStates}
                updateTemplateDataHandler={props.updateTemplateDataHandler}
                handleToggle={handleToggle}
                handleStarToggle={handleStarToggle}
              />
            </>
          ) : (
            <>
              <AddReviewToProfile
                handleChange={handleChange}
                checked={checked}
                switchStates={props.switchStates}
                setSwitchStates={props.setSwitchStates}
                updateTemplateDataHandler={props.updateTemplateDataHandler}
                data={data}
                type={profile.type}
                handleToggle={handleToggle}
              />
            </>
          )}
        </>
      )}
      <NewToast open={showMessagaeState} message={showMessage} />
      {isLoading && (
              <>
                <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-black/30 z-[9999]">
                  <div className="flex flex-col justify-center relative items-center w-[3rem] h-[3rem]">
                    <img
                      src={require("../../../Image/Tapop logo black.png").default.src}
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
}

export default Review;
