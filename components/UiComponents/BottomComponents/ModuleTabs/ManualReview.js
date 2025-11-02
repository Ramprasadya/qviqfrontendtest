import React, { useState, useRef, useContext } from "react";
import Switch from "react-switch";
import axios from "axios";
import {
  HiInformationCircle,
  HiXCircle,
  HiOutlineUpload,
  HiChevronDown,
  HiChevronUp,
  HiOutlineChevronDown,
} from "react-icons/hi";
import InputFIeldTextArea from "../../InputFIeldTextArea";
import InputField from "../../InputField";
import IconButton from "../../IconButton";
import PrimaryButton2 from "../../PrimaryButton2";
import TertiaryButton from "../../TertiaryButton";
import LinkButtons2 from "../../LinkButtons2";
import useOutsideClick from "../../../Utils/useOutsideClick";
import ManualReviewCard from "./ManualReviewCard";
import { UserContext } from "../../../Contexts/context";
import NewToast from "../../NewToast";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../Login/firebaseconfig";
import { serverUrl } from "../../../../config";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { getCookie } from "@/components/utils";

function ManualReview(props) {
  const [dropdown, setDropdown] = useState(false);
  const [rating, setRating] = useState(0);
  const { userType } = useContext(UserContext);

  // state for file imageField
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState([]);
  const navigate = useRouter();
  // removing files from image fileArray
  const removeFile = () => {
    setFileName([]);
    setFile([]);
  };
  // mapping array for files
  const mArray = fileName.map((item, index) => (
    <div key={index} className="upload-content rounded-full">
      <p>{item.name}</p>
      <span onClick={removeFile}>{item.icon}</span>
    </div>
  ));

  //   switch toggling state

  const profile = {
    profile: useParams().userName,
    type: useParams().templateId,
  };

  const [reviewerName, setReviewerName] = useState("");
  const [message, setMessage] = useState("");
  const [imageName, setImageName] = useState("");
  const [productImage, setProductImage] = useState("");

  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };
  const [data, setData] = useState([]);

  const [dummyState, setDummyState] = useState(0);
  const [showMessage, setShowtMessage] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const response = await fetch(
        `${serverUrl}/review/getManualReview/${profile.type}/${profile.profile}`,
        config
      );
      if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized");
      }
      const result = await response.json();
      setData(result);
      // console.log(data);
    } catch (error) {
      // console.log(error);
      navigate.push("/login");
    }
  };

  const [refetchOnDelete, setRefetchOnDelete] = useState(true);

  useEffect(() => {
    fetchData();
  }, [dummyState, refetchOnDelete, props.ptab]);

  //upload Image to firebase
  const handleFileInputChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      setImageName(image.name);
      const imageRef = ref(storage, `/images/${image.name}`);
      uploadBytes(imageRef, image)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              // Once image is uploaded, get the download URL

              setProductImage(downloadURL);
            })
            .catch((err) => {
              console.error("Error getting download URL from Firebase", err);
            });
        })
        .catch((err) => {
          console.error("Error uploading image to Firebase Storage", err);
        });
    }
  };

  const handleSubmit = async () => {
    // {console.log("gggggg",productImage)}
    try {
      const { data } = axios.post(
        `${serverUrl}/review/review/${profile.type}/${profile.profile}`,
        {
          name: reviewerName,
          stars: rating,
          review: message,
          profile: profile.profile,
          image: productImage,
          manual: true,
          isOn: false,
        }
      );
      // Toast.success("Review Added!");
      setToastMessage("Review Added!");
      setShowtMessage(true);
      setTimeout(() => {
        setShowtMessage(false);
      }, 3000);
      setReviewerName(" ");
      setMessage(" ");
      setDummyState((prevState) => prevState + 1);

      if (data) {
      }
    } catch (err) {
      // console.log(err);
    }
  };
  const dropdownRef = useRef(null);
  const [showInput, setShowInput] = useState(false);
  useOutsideClick(dropdownRef, () => setDropdown(false));
  const [editedReview, setEditedReview] = useState(null);
  const handleEdit = (reviewData) => {
    setEditedReview(reviewData);
  };
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${serverUrl}/review/update/${editedReview._id}/${profile.profile}`,
        editedReview
      );

      setEditedReview(null);
      fetchData();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };
  return (
    <div className="pb-[20px]">
      {data.length == 0 || showInput ? (
        <>
          <div className="pt-6">
            <InputField
              label="Reviewer Name"
              placeholder="Name..."
              width="100%"
              value={reviewerName}
              onChange={(e) => {
                setReviewerName(e.target.value);
              }}
            />
          </div>
          <div className="pt-9 ">
            <InputFIeldTextArea
              label="Message"
              placeholder="Type or paste message here..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <p className="pt-2 text-sm text-cGrey font-medium">
              Type or paste up to 100 words
            </p>
          </div>
          <div className="flex flex-col justify-center mt-[25px]">
            <div className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
              Star Rating
            </div>
            <div className=" relative" ref={dropdownRef}>
              <div
                className="w-fit flex flex-row justify-center items-center hover:cursor-pointer pr-[10px]"
                onClick={(e) => {
                  setDropdown(!dropdown);
                }}
              >
                <input
                  type="number"
                  className="w-[250px] rounded-[8px] text-[13px] h-[30px] p-[6px] xl:w-[724px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md:w-[400px] lg:w-[600px] border border-[#DFDBD8]  xsm:py-[9px]  xsm:pl-[12px] xl:pl-[8px] mt-[4px] font-normal "
                  required
                  
                  value={rating}
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                />
                <span className="h-[30px] flex flex-col justify-center items-center ml-[-30px]">
                  <HiChevronDown />
                </span>
              </div>

              {dropdown && (
                <div
                  className="left-[0.1rem] w-[220px] max-h-[300px] overflow-scroll absolute xsm:left-[0.3rem] xsm:top-[3rem] top-[2.3rem] text-[14px] md3:text-[14px] bg-[#ffffff]  xsm:w-[16.875rem] md:w-[18.875rem] p-[0.5rem] rounded-[0.5rem] z-[2] "
                  style={{
                    boxShadow:
                      "0.5rem 0.5rem 2.5rem 0.0625rem rgba(171, 181, 217, 0.32)",
                  }}
                >
                  <div
                    className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                    value="0"
                    name="country"
                    onClick={(e) => {
                      setRating(0);
                      setDropdown(!dropdown);
                    }}
                  >
                    0
                  </div>

                  <div
                    className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                    value="1"
                    name="country"
                    onClick={(e) => {
                      setRating(1);
                      setDropdown(!dropdown);
                    }}
                  >
                    1
                  </div>
                  <div
                    className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                    value="2"
                    name="country"
                    onClick={(e) => {
                      setRating(2);
                      setDropdown(!dropdown);
                    }}
                  >
                    2
                  </div>
                  <div
                    className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                    value="3"
                    name="country"
                    onClick={(e) => {
                      setRating(3);
                      setDropdown(!dropdown);
                    }}
                  >
                    3
                  </div>
                  <div
                    className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                    value="4"
                    name="country"
                    onClick={(e) => {
                      setRating(4);
                      setDropdown(!dropdown);
                    }}
                  >
                    4
                  </div>
                  <div
                    className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                    value="5"
                    name="country"
                    onClick={(e) => {
                      setRating(5);
                      setDropdown(!dropdown);
                    }}
                  >
                    5
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-8">
            <h1 className="label-field">Reviewer photo</h1>
          </div>

          {/* image input-1 starts here  */}
          <div
            className="add-image px-5 flex relative gap-3"
            style={{ cursor: "pointer" }}
            onClick={handleButtonClick}
          >
            <button type="button" onClick={handleButtonClick}>
              <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
                hidden
              ></input>
            </button>
            <Image
              src={require("./ProductsAndServices/Button-Icon.png")}
              alt="logo"
            />
            <p className="text-xs md:text-sm text-center">
              Upload or Drag & drop a Service image/Icon
            </p>
            <div>
              {productImage ? (
                <div className="absolute w-full h-full bg-white top-0 left-0 flex flex-col justify-center items-center">
                  <Image width={48} height={48}
                    style={{ width: "auto", height: "100%" }}
                    src={productImage}
                    alt={imageName}
                  />
                  {/* <p>{imageName}</p> */}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <p className="pt-2 text-xs md:text-sm text-[#817C7C] font-medium">
            Supports .PNG, .JPG, .JPEG & .svg file- up to 800KB
          </p>
          {/* image storing div  */}

          <div className="flex items-center">{mArray}</div>

          <div className="flex justify-end gap-4 pb-4">
            <TertiaryButton
              onClick={(e) => {
                setShowInput(false);
              }}
              text="Cancel"
              type="Delete"
            />
            <PrimaryButton2
              isDisabled={userType != "Pro" ? true : false}
              text="Save"
              onClick={() => {
                handleSubmit();
                setShowInput(false);
              }}
            />
          </div>
        </>
      ) : editedReview ? (
        <>
          <div className="pt-6">
            <InputField
              label="Reviewer Name"
              placeholder="Name..."
              width="100%"
              value={editedReview.name}
              onChange={(e) => {
                setEditedReview({ ...editedReview, name: e.target.value });
              }}
            />
          </div>
          <div className="pt-9 ">
            <InputFIeldTextArea
              label="Message"
              placeholder="Type or paste message here..."
              value={editedReview.review}
              onChange={(e) => {
                setEditedReview({
                  ...editedReview,
                  review: e.target.value,
                });
              }}
            />
            <p className="pt-2 text-sm text-cGrey font-medium">
              Type or paste up to 100 words
            </p>
          </div>
          <div className="flex flex-col">
            <div className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
              Star Rating
            </div>
            <div className=" relative flex items-center " ref={dropdownRef}>
              <div
                className="w-[235px] xsm:w-full flex items-center hover:cursor-pointer pr-[10px]"
                onClick={(e) => {
                  setDropdown(!dropdown);
                }}
              >
                <input
                  type="text"
                  className="w-[250px] rounded-[8px] text-[13px] mb-[32px]  h-[30px] p-[6px] xl:w-[724px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md:w-[400px] lg:w-[600px] border border-[#DFDBD8]  xsm:py-[9px]  xsm:pl-[12px] xl:pl-[8px] mt-[4px] font-normal "
                  required
                  name="country"
                  value={editedReview.stars}
                  onChange={(e) => {
                    setEditedReview({
                      ...editedReview,
                      stars: e.target.value,
                    });
                  }}
                />
                <span className="ml-[-20px] mt-[-25px]">
                  <HiChevronDown />
                </span>
              </div>

              {dropdown && (
                <div
                  className="left-[0.1rem] w-[220px] max-h-[300px] overflow-scroll absolute xsm:left-[0.3rem] xsm:top-[3rem] top-[2.3rem] text-[14px] md3:text-[14px] bg-[#ffffff]  xsm:w-[16.875rem] md:w-[18.875rem] p-[0.5rem] rounded-[0.5rem] z-[2] "
                  style={{
                    boxShadow:
                      "0.5rem 0.5rem 2.5rem 0.0625rem rgba(171, 181, 217, 0.32)",
                  }}
                >
                  <div
                    className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                    value="0"
                    name="country"
                    onClick={(e) => {
                      setEditedReview({ ...editedReview, stars: 0 });

                      setDropdown(!dropdown);
                    }}
                  >
                    0
                  </div>

                  <div
                    className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                    value="1"
                    name="country"
                    onClick={(e) => {
                      setEditedReview({ ...editedReview, stars: 1 });

                      setDropdown(!dropdown);
                    }}
                  >
                    1
                  </div>
                  <div
                    className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                    value="2"
                    name="country"
                    onClick={(e) => {
                      setEditedReview({ ...editedReview, stars: 2 });

                      setDropdown(!dropdown);
                    }}
                  >
                    2
                  </div>
                  <div
                    className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                    value="3"
                    name="country"
                    onClick={(e) => {
                      setEditedReview({ ...editedReview, stars: 3 });

                      setDropdown(!dropdown);
                    }}
                  >
                    3
                  </div>
                  <div
                    className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                    value="4"
                    name="country"
                    onClick={(e) => {
                      setEditedReview({ ...editedReview, stars: 4 });

                      setDropdown(!dropdown);
                    }}
                  >
                    4
                  </div>
                  <div
                    className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                    value="5"
                    name="country"
                    onClick={(e) => {
                      setEditedReview({ ...editedReview, stars: 5 });

                      setDropdown(!dropdown);
                    }}
                  >
                    5
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-8">
            <h1 className="label-field">Reviewer photo</h1>
          </div>

          {/* image input-1 starts here  */}
          <div
            className="add-image px-5 flex relative gap-3"
            style={{ cursor: "pointer" }}
            onClick={handleButtonClick}
          >
            <button type="button" onClick={handleButtonClick}>
              <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
                hidden
              ></input>
            </button>
            <Image width={48}
              src={require("./ProductsAndServices/Button-Icon.png")}
              alt="logo"
            />
            <p className="text-xs md:text-sm text-center">
              Upload or Drag & drop a Service image/Icon
            </p>
            <div>
              {productImage ? (
                <div className="absolute w-full h-full bg-white top-0 left-0 flex flex-col justify-center items-center">
                  <Image
                    style={{ width: "auto", height: "100%" }}
                    src={productImage}
                    alt={imageName}
                  />
                  {/* <p>{imageName}</p> */}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <p className="pt-2 text-xs md:text-sm text-[#817C7C] font-medium">
            Supports .PNG, .JPG, .JPEG & .svg file- up to 800KB
          </p>
          {/* image storing div  */}

          <div className="flex items-center">{mArray}</div>

          <div className="flex justify-end gap-4 pb-4">
            <TertiaryButton
              onClick={(e) => {
                setShowInput(false);
                setEditedReview(null);
              }}
              text="Cancel"
              type="Delete"
            />
            <PrimaryButton2
              text="Update"
              onClick={() => {
                handleUpdate();
                setShowInput(false);
              }}
            />
          </div>
        </>
      ) : (
        <>
          <p className="text-lg mt-[30px] font-semibold">
            Your Reviews ({data.length})
          </p>
          <p className="text-sm text-cGrey font-medium mt-[10px]">
            You can add {5 - data.length} more reviews
          </p>
          <div className="w-full mt-8 ">
            {data?.map((off, index) => (
              <div key={index}>
                <p className="text-lg mt-[24px] font-semibold">
                  Review {index + 1}
                </p>
                <ManualReviewCard
                  setRefetchOnDelete={setRefetchOnDelete}
                  refetchOnDelete={refetchOnDelete}
                  off={off}
                  profile={profile.profile}
                  onEdit={handleEdit}
                />
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col justify-center items-center my-8 ">
            {data.length <= 5 && (
              <>
                <PrimaryButton2
                  text="+ Add Another Review"
                  color="linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                  onClick={() => {
                    setShowInput(true);
                    setRefetchOnDelete((prev) => !prev)
                  }}
                />
                <br />
                <div className="mt-[20px] py-[20px] sm:py-[0px]"></div>
              </>
            )}
          </div>
        </>
      )}
      <NewToast open={showMessage} message={toastMessage} />
    </div>
  );
}

export default ManualReview;
