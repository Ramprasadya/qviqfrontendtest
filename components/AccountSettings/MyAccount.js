"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import SideBar from "../navbar/SideBar";
import NavBar from "../navbar/NavBar";
import PrimaryButton from "../UiComponents/PrimaryButton";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import { HiOutlineBolt } from "react-icons/hi2";
import InputField from "../UiComponents/InputField";
// import { ToastContainer, toast } from "react-toastify";
import NewToast from "../UiComponents/NewToast";
import {
  HiExclamationCircle,
  HiOutlineDocumentDuplicate,
  HiOutlineX,
} from "react-icons/hi";
import { serverUrl } from "../../config";
import ProtagLarge from "../UiComponents/ProtagLarge";
import { UserContext } from "../Contexts/context";
import modalBanner from "../UiComponents/modal.png";
import NewModal from "../UiComponents/NewModal/Newmodal3";
import Image from "next/image";
import { userNameList } from "../userNameList";
import { getCookie, SafeLocalStorage } from "../utils";
import Switch from "react-switch";

const MyAccount = () => {
  const profile = { profile: useParams().userName };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [whatsappNotification, setWhatsappNotification] = useState(true);

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pro, setPro] = useState();
  const [starter, setStarter] = useState();
  const [basic, setBasic] = useState();
  const [id, setID] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowtMessage] = useState(false);
  const [showUpdateNameMessage, setShowUpdateNametMessage] = useState(false);
  const [updateNameMessage, setUpdateNameMessage] = useState("");
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [password, setPassword] = useState(); //stste for storing the actual password from databse
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNew, setConfirmNew] = useState();
  // state for username alert
  const [updateProfile, setUpdateProfile] = useState(profile.profile);
  const [showAlert1, setShowALert1] = useState(false);
  const [alert1Msg, setAlert1Msg] = useState("");
  const router = useRouter();
  const navigate = (page) => {
    router.push(page);
  };
  const { copyToClipboard, userFirstName, userLastName, checkVariable } =
    useContext(UserContext);
  const { username, userSignOut } = useContext(UserContext);
  // return only numbers and characters
  const giveOnlyNumNChar = (e) => {
    const regex = /^[a-zA-Z0-9]*$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      setUpdateProfile(e.target.value.toLowerCase());
    }
  };

  const handleFirstNameChange = (event) => {
    const inputValue = event.target.value;
    const onlyAlphabets = /^[A-Za-z\s]*$/;

    if (onlyAlphabets.test(inputValue) || inputValue === "") {
      setFirstName(event.target.value);
      setFirstNameErrorMessage("");
    } else {
      setFirstNameErrorMessage("Please enter valid value");
    }
  };
  const handleLastNameChange = (event) => {
    const inputValue = event.target.value;
    const onlyAlphabets = /^[A-Za-z\s]*$/;

    if (onlyAlphabets.test(inputValue) || inputValue === "") {
      setLastName(event.target.value);
      setLastNameErrorMessage("");
    } else {
      setLastNameErrorMessage("Please enter valid value");
    }
  };

  const handleUpdateNameSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(
        `${serverUrl}/tapopuser/tapopuser/update-name/${profile.profile}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            firstName: firstName,
            lastName: lastName,
          }),
        }
      );

      const userData = await result.json();

      if (result.ok) {
        setUpdateNameMessage("Account Name Updated successfully");
        setShowUpdateNametMessage(true);
        setTimeout(() => {
          setShowUpdateNametMessage(false);
        }, 3000);
      } else {
        console.error("Failed to update name:", userData.error);
      }
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  // console.log(profile);
  

   useEffect(()=>{
      const fetchData =async()=>{
        const response = await axios.get(`${serverUrl}/whatsapp/getstatus/${profile.profile}`)
        if(response?.data[0]?.sendMessage === undefined){
          setWhatsappNotification(true)
         await axios.post(
        `${serverUrl}/whatsapp/status/${profile.profile}`,
        {
          sendMessage: true,
          profile:profile.profile
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
        }
      );
        }else{
          setWhatsappNotification(response?.data[0]?.sendMessage)
        }
        console.log(whatsappNotification);
      }
      fetchData()
    },[])

  const handleWhatsappToggle = async () => {
    const newWhatsappNotificationState = !whatsappNotification;
   
    try {
      const response = await axios.post(
        `${serverUrl}/whatsapp/status/${profile.profile}`,
        {
          sendMessage: newWhatsappNotificationState,
          profile:profile.profile
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
        }
      );
    
      setWhatsappNotification(newWhatsappNotificationState);
      // setMessage("")
    } catch (error) {
      console.error("Error updating whatsapp message", error);
    }
    
  };

  const [showModal, setShowModal] = useState(false);
  const { userType } = useContext(UserContext);
  useEffect(() => {
    async function getData() {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      try {
        const result = await axios.get(
          `${serverUrl}/account/info/${profile.profile}`,
          config
        );
        setID(result.data[0]._id);
        setName(result.data[0].name);
        setFirstName(result.data[0].firstName);
        setLastName(result.data[0].lastName);
        setUserName(result.data[0].userName);
        setEmail(result.data[0].email);
        setPro(result.data[0].pro);
        // //console.log(result.data[0].pro);
        setStarter(result.data[0].starter);
        setBasic(result.data[0].basic);
        setPassword(result.data[0].password);
      } catch (error) {
        //console.log(error?.response?.data?.error);
        // navigate("/login");
      }
    }
    getData();
  }, []);

  const [formChanged, setFormChanged] = useState(false);

  function handleNameChange(event) {
    setNewName(event.target.value);
    setFormChanged(true);
  }

  function handleEmailChange(event) {
    setNewEmail(event.target.value);
    setFormChanged(true);
  }

  const handleSave = () => {
    const data = {
      name: newName !== "" ? newName : name,
      email: newEmail !== "" ? newEmail : email,
      profile: profile.profile,
    };
    try {
      fetch(`${serverUrl}/account/update/` + profile.profile, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => setMessage(data.error));
      setShowtMessage(true);
      setTimeout(() => {
        setShowtMessage(false);
      }, 3000);
    } catch (err) {
      //console.log(err);
      setMessage("Failed to update profile info");
      setShowtMessage(true);
      setTimeout(() => {
        setShowtMessage(false);
      }, 3000);
    }
  };

  const handleDelete = () => {
    try {
      const res = fetch(
        `${serverUrl}/account/delete/${id}/${profile.profile}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: id,
          profile: profile.profile,
        }
      );
      setShowModal2(false);
      setMessage("Profile Deleted Succesfully");
      setShowtMessage(true);
      setTimeout(() => {
        setShowtMessage(false);
      }, 3000);
      userSignOut();
      navigate("/login");
    } catch (err) {
      //console.log(err);
      setMessage("Couldn't Delete Profile");
      setShowtMessage(true);
      setTimeout(() => {
        setShowtMessage(false);
      }, 3000);
    }
  };

  const handleReset = () => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (password !== currentPassword) {
      alert("Current password does not match!");
    } else if (newPassword !== confirmNew) {
      alert("New Passord does not match!");
    } else if (newPassword.length < 8 || !newPassword.match(passwordRegex)) {
      alert(
        "Password should have at least 8 characters, 1 upper case, 1 lower case, and 1 special character"
      );
    } else {
      const data = {
        password: newPassword,
      };
      try {
        fetch(`${serverUrl}/account/updatepassword/` + profile.profile, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {});
        setShowModal1(false);
        setMessage("Password changed successfully!");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      } catch (err) {
        //console.log(err);
        setShowModal1(false);
        setMessage("Failed to change password");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      }
    }
  };

  const handleUserNameUpdate = async () => {
    if (updateProfile === "") {
      setAlert1Msg("Please enter a username.");
      setShowALert1(true);
      setTimeout(() => {
        setShowALert1(false);
        setAlert1Msg("");
      }, 3000);
      return;
    } else if (updateProfile === profile) {
      setAlert1Msg("Please enter a different username.");
      setShowALert1(true);
      setTimeout(() => {
        setShowALert1(false);
        setAlert1Msg("");
      }, 3000);
      return;
    } else if (userNameList.includes(updateProfile)) {
      setAlert1Msg("Please enter a different username.");
      setShowALert1(true);
      setTimeout(() => {
        setShowALert1(false);
        setAlert1Msg("");
      }, 3000);
      return;
    }

    // Check if the any letter of updateProfile is capitalized
    if (/[A-Z]/.test(updateProfile)) {
      setAlert1Msg("Avoid using capital latters.");
      setShowALert1(true);
      setTimeout(() => {
        setShowALert1(false);
        setAlert1Msg("");
      }, 3000);
      return;
    }

    if (
      updateProfile === "" ||
      /^[wW]+$/.test(updateProfile) ||
      /^\d+$/.test(updateProfile)
    ) {
      setAlert1Msg("Please enter a different username.");
      setShowALert1(true);
      setTimeout(() => {
        setShowALert1(false);
        setAlert1Msg("");
      }, 3000);
      return;
    }

    try {
      const response = await fetch(
        `${serverUrl}/tapopuser/updateProfile/${profile.profile}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify({ updateProfile }),
        }
      );

      const data = await response.json();
      if (data.error) {
        setAlert1Msg("This username is not available. Please try another one.");
        setShowALert1(true);
        setTimeout(() => {
          setShowALert1(false);
          setAlert1Msg("");
        }, 3000);
      } else {
        setShowALert1(false);
        setAlert1Msg("");
        navigate(`/myaccount/${updateProfile}`);
      }
    } catch (error) {
      console.error(error);
    }

    const currentProfileData = JSON.parse(SafeLocalStorage.getItem("user")); // Parse JSON string to object
    if (currentProfileData) {
      const updatedProfileData = {
        ...currentProfileData,
        userName: updateProfile,
      };

      SafeLocalStorage.setItem("user", JSON.stringify(updatedProfileData)); // Save as string
      //console.log("Updated profile data:", JSON.stringify(updatedProfileData)); // Log for debugging
    } else {
      console.error("No profile data found in SafeLocalStorage.");
      return;
    }
  };

  return (
    <div className="flex h-screen w-full first-container">
      <div className="h-full">
        <SideBar />
      </div>
      <div className=" custom-scrollbar w-full overflow-auto">
        <NavBar text={"My Account"} />
        <div className="flex my-6 xsm:my-7 xl:my-[52px] text-[#1A1A1A] xl:text-[24px] font-semibold justify-center items-center xsm:text-[20px]">
          <h2>My Account </h2>
        </div>

        {/* User Full name Update */}
        <div className="flex justify-center">
          <div className="p-[10px] mx-5 w-full mb-[20px] rounded-[8px] xsm:mb-[28px] bg-white xl:mb-[51px] md:w-[450px] xl:px-[32px] xl:py-[28px] flex flex-col lg:w-[690px] xsm:p-[20px] xl:w-[788px]">
            <h3 className="text-[16px] font-semibold xsm:text-[18px] text-[#1A1A1A] xl:mb-[32px] xsm:mb-[28px] mb-[15px] w-full flex justify-between">
              Edit Your Name
            </h3>
            <div className="flex flex-col gap-y-5">
              <div className="w-full">
                <InputField
                  width={"100%"}
                  height={40}
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />

                {firstNameErrorMessage && (
                  <p className="text-[#FE7171] mt-[8px] ml-[10px]">
                    {firstNameErrorMessage}
                  </p>
                )}
              </div>

              <div className="w-full">
                <div className="flex flex-col">
                  <InputField
                    width={"100%"}
                    height={40}
                    label="Last Name"
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                  {lastNameErrorMessage && (
                    <p className="text-[#FE7171] mt-[8px] ml-[10px]">
                      {lastNameErrorMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center mt-7">
              <PrimaryButton2
                onClick={handleUpdateNameSubmit}
                text="Save changes "
              />
            </div>
          </div>
        </div>
        {/* Custom Domain */}
        <div className="flex justify-center">
          <div className="p-[10px] mx-5 w-full mb-[20px] rounded-[8px] xsm:mb-[28px] bg-white xl:mb-[51px] md:w-[450px] xl:px-[32px] xl:py-[28px] flex flex-col lg:w-[690px] xsm:p-[20px] xl:w-[788px]">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-semibold xsm:text-[18px] text-[#1A1A1A] xl:mb-[32px] xsm:mb-[28px] mb-[15px] w-full flex justify-between">
                Domain Settings
                <NewModal
                  text="Upgrade to PRO"
                  onModal={showModal}
                  onClick={setShowModal}
                >
                  <Image
                    src={modalBanner}
                    alt="modal banner"
                    className="pt-[48px]"
                  />
                  <p className="mt-[24px] sm:mt[32px] text-[#817C7C] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                    By becoming a pro member, you can expand your network,
                    unlock and add more media links, and analyse your profile
                    visits and audience.
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
                        Unlock additional media links and add them to your
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
                        You can include multiple custom links, pdf files, and
                        additional images.
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
                        Add appointment slots and receive appointments through
                        your profile.
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
              </h3>
            </div>
            <p className="text-sm text-cGrey font-medium">
              Choose your own username to personalise your link.
            </p>

            <div className="flex items-center mt-7">
              <InputField
                width={"100%"}
                height={40}
                label="Edit Qviq Username"
                placeholder="set your domain name"
                type="text"
                value={updateProfile}
                onChange={(e) => {
                  giveOnlyNumNChar(e);
                }}
              />
            </div>

            {showAlert1 && (
              <div
                style={{ color: "#CF2828" }}
                className=" text-sm flex items-center gap-1 pt-4"
              >
                <HiExclamationCircle />
                {alert1Msg}
              </div>
            )}

            <div className="flex flex-wrap items-center pt-6">
              <span className="text-cGrey font-medium">
                Your Qviq link will be : &nbsp;
              </span>
              <span className="font-medium" style={{ wordBreak: "break-all" }}>
                https://{updateProfile}.qviq.io
              </span>
              <span
                onClick={() => {
                  copyToClipboard(`https://${updateProfile}.qviq.io`);
                }}
                className="text-xl ml-2 hover:cursor-pointer active:scale-90 duration-100"
                title="Copy Link"
              >
                <HiOutlineDocumentDuplicate />
              </span>
            </div>

            <div className="pt-8">
              <PrimaryButton2
                text="Save Changes"
                isDisabled={
                  /^[wW]+$/.test(updateProfile) ||
                  updateProfile === "www" ||
                  updateProfile === ""
                    ? true
                    : false
                }
                color={
                  /^[wW]+$/.test(updateProfile) ||
                  updateProfile === "www" ||
                  updateProfile === ""
                    ? "#F7B2C7"
                    : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                }
                onClick={handleUserNameUpdate}
              />
            </div>
          </div>
        </div>

        <div className=" flex items-center justify-center">
          <div className="p-[10px] mx-5 w-full h-[370px] mb-[20px] rounded-[8px] xsm:mb-[28px] bg-white xl:mb-[51px] md:w-[450px] sm:h-[540px] xl:px-[32px] xl:py-[28px] flex flex-col lg:w-[690px] xsm:h-[520px] xsm:p-[20px] xl:w-[788px] xl:h-[614px]   ">
            <h3 className="text-[16px] font-semibold xsm:text-[18px] text-[#1A1A1A] xl:mb-[32px] xsm:mb-[28px] mb-[15px]">
              Account Details
            </h3>
            <div className="flex divide-x">
              <div className="xl:mr-[289px] xsm:mr-[124px] mr-[50px]">
                <p className="xl:text-[14px]  font-normal mb-[8px] text-[12px] ">
                  Username
                </p>
                <p className="xsm:text-[16px] text-[14px] font-semibold">
                  {userName}
                </p>
              </div>

              <div>
                <p className=" ml-[8px] xl:text-[16px] text-[12px] xl:ml-[40px]  mb-[8px] xsm:ml-[12px] ">
                  Plan
                </p>
                {pro && (
                  <p className="text-[14px] ml-[8px] font-semibold xl:ml-[40px] xsm:ml-[12px]  xsm:text-[16px]">
                    Pro
                  </p>
                )}
                {starter && (
                  <p className="text-[14px] ml-[8px] font-semibold xl:ml-[40px] xsm:ml-[12px] xsm:text-[16px]">
                    Starter
                  </p>
                )}
                {basic && (
                  <p className="text-[14px] ml-[8px] font-semibold xl:ml-[40px] xsm:ml-[12px] xsm:text-[16px]">
                    Free
                  </p>
                )}
              </div>
            </div>
            <div className="xl:mt-[32px] mt-[15px] xsm:mt-[28px] xsm:mb-[32px] xl:mb-[40px] mb-[15px]">
              {(pro || starter) && (
                <button
                  className=" xl:h-[48px] xl:w-[158px] xsm:w-[280px] xsm:h-[40px] py-[5px] xsm:text-[16px] h-[30px] w-[220px] text-[12px] font-semibold md:w-[220px] bg-white rounded-[64px] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:border-none hover:text-white"
                  onClick={() => {
                    navigate(`/managesubscription/${profile.profile}`);
                  }}
                >
                  Billing Details
                </button>
              )}
              {basic && (
                <PrimaryButton
                  icon={<HiOutlineBolt />}
                  text="Upgrade"
                  onClick={() => {
                    navigate(`/plan/${username}`);
                  }}
                />
              )}
            </div>
            <hr></hr>
            <h3 className="mt-[15px] mb-[15px]  xl:mt-[40px] xsm:mt-[32px] text-[18px] font-semibold text-[#1A1A1A] xl:mb-[32px] xsm:mb-[28px]">
              Account Actions
            </h3>
            <div className="text-[#1A1A1A]  ">
              <button
                className=" h-[30px] w-[220px] xl:h-[48px] xl:w-[160px] xsm:w-[280px] xsm:h-[40px]  text-[14px] font-semibold md:w-[220px]  bg-white rounded-[64px] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:border-none hover:text-white"
                onClick={() => setShowModal1(true)}
              >
                Reset Password
              </button>
            </div>
            {showModal1 && (
              <div className="container " style={{ zIndex: "998" }}>
                <div className="modal-wrapper" style={{ zIndex: "998" }}></div>

                <div
                  className="flex flex-col  bg-white fixed bottom-0 md:bottom-1/2 md:translate-y-1/2 left-1/2 -translate-x-1/2 h-fit rounded-t-2xl md:rounded-2xl md:w-[640px] w-full "
                  style={{ zIndex: "998", height: "fit-content" }}
                >
                  <div className="flex justify-between items-center px-3 py-3 xsm:px-5 xsm:py-4 md:px-6">
                    <p className="text-lg md:text-xl text-black tracking-normal font-semibold">
                      Reset Password
                    </p>
                    <span
                      className="text-2xl text-black logo-fill"
                      style={{ cursor: "pointer", padding: "0" }}
                      onClick={() => setShowModal1(false)}
                    >
                      <HiOutlineX />
                    </span>
                  </div>
                  <div className="mx-3 xsm:mx-5 md:mx-6 pt-2 md:pt-6 border-t h-full overflow-auto ">
                    <label className=" text-[14px] font-medium text-[#1A1A1A]">
                      Current Password
                    </label>

                    <InputField
                      text="Enter Current Password"
                      type="password"
                      placeholder="Enter Current Password"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      width="100%"
                      height="40px"
                      fontSize="14px"
                    />
                    <div className="xl:mt-[24px] mt-[15px]">
                      <label className=" text-[14px] font-medium text-[#1A1A1A]">
                        New Password
                      </label>
                      <InputField
                        text="Enter New Password"
                        type="password"
                        placeholder="Enter New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        width="100%"
                        height="40px"
                        fontSize="14px"
                      />
                    </div>
                    <div className=" mt-[15px] xl:mt-[24px]">
                      <label className=" text-[14px] font-medium text-[#1A1A1A]">
                        Confirm New Password
                      </label>
                      <InputField
                        text="Confirm New Password"
                        type="password"
                        placeholder="Confirm New Password"
                        onChange={(e) => setConfirmNew(e.target.value)}
                        width="100%"
                        height="40px"
                        fontSize="14px"
                        marginBottom="32px"
                      />
                    </div>
                    <div className="mb-[24px] flex w-full justify-center items-center">
                      <PrimaryButton
                        icon=""
                        text="Continue"
                        onClick={handleReset}
                        width="50%"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <hr className="xl:mt-[40px] xsm:mt-[32px] mt-[15px]"></hr>
            <div className="flex items-center justify-between" >
              <div>
              <h3 className=" font-semibold xl:text-[18px] xsm:mt-[32px] xl:mt-[40px] mt-[15px]  ">Get updates on whatsapp</h3>
              </div>
              <div className="flex items-center xsm:mt-[32px] xl:mt-[40px] mt-[15px]">
                <Switch
                  checked={whatsappNotification}
                  onChange={handleWhatsappToggle}
                  onColor="#12A26E"
                  offColor="#A7A7A7"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={24}
                  width={44}
                  // disabled={isUpdating}
                />
              </div>
            </div>
            <hr className="xl:mt-[40px] xsm:mt-[32px] mt-[15px]"></hr>
            <div className="mb-[10px] ">
 <h3 className="font-semibold xl:text-[18px] xsm:mt-[20px] xl:mt-[24px] mt-[16px] ml-4">
  Delete Account
</h3>
            <button
              onClick={() => setShowModal2(true)}
              className=" text-[16px] h-[30px] w-[220px] xl:h-[48px] xl:w-[172px] xsm:w-[280px] xsm:h-[40px] xl:py-[12px] xl:px-[24px] xsm:mt-[28px] mt-[15px] xl:mt-[32px] md:w-[220px] xsm:py-[9px] bg-[linear-gradient(255deg,rgba(251,102,9)0%,rgba(228,8,73)100%)] rounded-[64px] text-white hover:shadow-lg hover:shadow-[0px 10px 20px 0px rgba(228,8,73,0.40)] "
            >
              Delete Account
            </button>
             <div className="h-[50px]"></div>
            </div>
            {showModal2 && (
              <div className=" ">
                <div className="container" style={{ zIndex: "998" }}>
                  <div
                    className="modal-wrapper"
                    style={{ zIndex: "998" }}
                  ></div>

                  <div
                    className="flex flex-col  bg-white fixed bottom-0 md:bottom-1/2 md:translate-y-1/2 left-1/2 -translate-x-1/2 h-fit rounded-t-2xl md:rounded-2xl  md:w-[640px] w-full "
                    style={{ zIndex: "998", height: "fit-content" }}
                  >
                    <div className="flex justify-between items-center px-3 xsm:px-5 py-3 ">
                      <p className="text-lg md:text-xl text-black tracking-normal font-semibold  ">
                        Delete Account
                      </p>
                      <span
                        // onClick={props.onClick}
                        onClick={() => setShowModal2(false)}
                        className="text-2xl text-black logo-fill"
                        style={{ cursor: "pointer", padding: "0" }}
                      >
                        <HiOutlineX />
                      </span>
                    </div>
                    <div className="mx-3 xsm:mx-5 md:mx-6 border-t h-fit overflow-auto ">
                      <p className="mt-[24px] xsm:text-[14px] md:text-[16px] font-normal text-[#1A1A1A]">
                        Please note that if you proceed, all your connections,
                        reviews, and profile information will be permanently
                        deleted. This means that your Tapop link will no longer
                        be visible to anyone and your profile will be
                        unpublished.
                      </p>
                      <div className="mt-[32px] flex justify-end items-end mb-[24px]">
                        <button
                          className="mb-[10px] xsm:mt-[0px] xsm:w-[152px] text-center  text-[16px]  md:mr-[36px] font-semibold text-[#817C7C] "
                          onClick={() => setShowModal2(false)}
                        >
                          Cancel
                        </button>
                        <div className="w-[100px] ml-[20px] xsm:ml-[0px] md:w-[123px] xsm:w-[152px]">
                          <PrimaryButton2
                            text="Continue"
                            color="linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                            onClick={handleDelete}
                            width="100%"
                            padding="12px 0px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
      <NewToast open={showMessage} message={message} />
      <NewToast open={showUpdateNameMessage} message={updateNameMessage} />
    </div>
  );
};

export default MyAccount;
