import React, { useState, useEffect, useContext } from "react";
import LinkButtons2 from "../../LinkButtons2";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import SwitchAndPlus2 from "../../SwitchAndPlus2";
import Switch from "react-switch";
import DropdownTimeBussinessH from "../../DropdownTimeBussinessH";
import TertiaryButton from "../../TertiaryButton";
import PrimaryButton2 from "../../PrimaryButton2";
import InputField from "../../InputField";
import { serverUrl } from "../../../../config";
import axios from "axios";
import { UserContext } from "../../../Contexts/context";
import NewToast from "../../NewToast";
import { useParams } from "next/navigation";
import { getCookie } from "@/components/utils";
function BuisnessHours(props) {
  const [changeButton, setChangeButton] = useState("Business Hours");
  const { updateCheckVariable, dummyState, setDummyState } =
    useContext(UserContext);
  // state for upper
  const [checked, setChecked] = useState(true);
  // const timer = [];
  const [montimer1, setmonday1] = useState("");
  const [montimer2, setmonday2] = useState("");
  const [tuetimer1, settueday1] = useState("");
  const [tuetimer2, settueday2] = useState("");
  const [wedtimer1, setwedday1] = useState("");
  const [wedtimer2, setwedday2] = useState("");
  const [thrustimer1, setthrusday1] = useState("");
  const [thrustimer2, setthrusday2] = useState("");
  const [fritimer1, setfriday1] = useState("");
  const [fritimer2, setfriday2] = useState("");
  const [sattimer1, setsatday1] = useState("");
  const [sattimer2, setsatday2] = useState("");
  const [suntimer1, setsunday1] = useState("");
  const [suntimer2, setsunday2] = useState("");

  const [monChecked, setmonChecked] = useState(false);
  const [tueChecked, setueChecked] = useState(false);
  const [wedChecked, setwedChecked] = useState(false);
  const [thusChecked, setthusChecked] = useState(false);
  const [friChecked, setfriChecked] = useState(false);
  const [saturChecked, setsaturChecked] = useState(false);
  const [sunChecked, setsunChecked] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  // upper toggle
  const [deleteToggle, setDeleteToggle] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const mondayChange = () => {
    setmonChecked((prev) => !prev);
  };
  const tuedayChange = () => {
    setueChecked((prev) => !prev);
  };
  const weddayChange = () => {
    setwedChecked((prev) => !prev);
  };
  const thursdayChange = () => {
    setthusChecked((prev) => !prev);
  };
  const fridayChange = () => {
    setfriChecked((prev) => !prev);
  };
  const saturdayChange = () => {
    setsaturChecked((prev) => !prev);
  };
  const sundayChange = () => {
    setsunChecked((prev) => !prev);
  };
  // timer.push(
  //   changeButton,
  //   "monday",
  //   montimer1,
  //   montimer2,
  //   monChecked,
  //   "tueday",
  //   tuetimer1,
  //   tuetimer2,
  //   tueChecked,
  //   "wednesday",
  //   wedtimer1,
  //   wedtimer2,
  //   "thursday",
  //   thrustimer1,
  //   thrustimer2,
  //   thusChecked,
  //   "friday",
  //   fritimer1,
  //   fritimer2,
  //   friChecked,
  //   "saturday",
  //   sattimer1,
  //   sattimer2,
  //   saturChecked,
  //   "Sunday",
  //   suntimer1,
  //   suntimer2
  // );
  // timer.push(montimer2)
  // timer.push("");
  // //console.log(timer);
  const profile = {
    profile: useParams().userName,
    type: useParams().templateId,
  };
  const [message, setMessage] = useState("");
  const [showMessage, setShowtMessage] = useState(false);

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
          `${serverUrl}/businessHours/getLabel/${profile.type}/${profile.profile}`,
          config
        )
        .then((response) => {
          const businessHoursLabel =
            response.data[0]?.businessHoursLabel || "Business Hours";

          setChangeButton(businessHoursLabel);
        });
      axios
        .get(
          `${serverUrl}/businessHours/getBusinessHoursArray/${profile.type}/${profile.profile}`,
          config
        )
        .then((response) => {
          const businessHoursLabelList = response.data[0]
            ?.businessHoursLabelList || [
            "Business Hours",
            "Working Hours",
            "Business time",
          ];

          setLabels(businessHoursLabelList);
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
          `${serverUrl}/businessHours/updateLabels/${profile.type}/${profile.profile}`,
          {
            businessHoursLabelList: limitedLabels,
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
            handleBusinessHoursLabel(newLabel);
          } else {
            console.error("Label update failed");
          }
        });
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    fetch(
      `${serverUrl}/businessHours/getBusinessHours/${profile.profile}/${profile.type}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.businessHours) {
          const businessHours = data.businessHours;
          setmonChecked(businessHours.businessHours.monday.checked);
          setueChecked(businessHours.businessHours.tuesday.checked);
          setwedChecked(businessHours.businessHours.wednesday.checked);
          setthusChecked(businessHours.businessHours.thursday.checked);
          setfriChecked(businessHours.businessHours.friday.checked);
          setsaturChecked(businessHours.businessHours.saturday.checked);
          setsunChecked(businessHours.businessHours.sunday.checked);

          setmonday1(businessHours.businessHours.monday.timer1);
          setmonday2(businessHours.businessHours.monday.timer2);
          settueday1(businessHours.businessHours.tuesday.timer1);
          settueday2(businessHours.businessHours.tuesday.timer2);
          setwedday1(businessHours.businessHours.wednesday.timer1);
          setwedday2(businessHours.businessHours.wednesday.timer2);
          setthrusday1(businessHours.businessHours.thursday.timer1);
          setthrusday2(businessHours.businessHours.thursday.timer2);
          setfriday1(businessHours.businessHours.friday.timer1);
          setfriday2(businessHours.businessHours.friday.timer2);
          setsatday1(businessHours.businessHours.saturday.timer1);
          setsatday2(businessHours.businessHours.saturday.timer2);
          setsunday1(businessHours.businessHours.sunday.timer1);
          setsunday2(businessHours.businessHours.sunday.timer2);
        }
      })
      .catch((error) => {
        console.error("Error fetching business hours:", error);
      });
  }, []);
  const saveBusinessHours = () => {
    const businessHoursData = {
      monday: {
        checked: monChecked,
        timer1: montimer1,
        timer2: montimer2,
      },
      tuesday: {
        checked: tueChecked,
        timer1: tuetimer1,
        timer2: tuetimer2,
      },
      wednesday: {
        checked: wedChecked,
        timer1: wedtimer1,
        timer2: wedtimer2,
      },
      thursday: {
        checked: thusChecked,
        timer1: thrustimer1,
        timer2: thrustimer2,
      },
      friday: {
        checked: friChecked,
        timer1: fritimer1,
        timer2: fritimer2,
      },
      saturday: {
        checked: saturChecked,
        timer1: sattimer1,
        timer2: sattimer2,
      },
      sunday: {
        checked: sunChecked,
        timer1: suntimer1,
        timer2: suntimer2,
      },
    };

    fetch(
      `${serverUrl}/businessHours/storeBusinessHours/${profile.profile}/${profile.type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ businessHours: businessHoursData }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          //console.log(data.error);
        } else {
          setMessage("Business Hours saved successfully");
          setShowtMessage(true);
          updateCheckVariable();
          setTimeout(() => {
            setShowtMessage(false);
          }, 3000);
          setDummyState(!dummyState);
        }
      })

      .catch((error) => {
        console.error("Error saving business hours:", error);
      });
  };
  const handleBusinessHoursLabel = async (value) => {
    setChangeButton(value);
    await axios.put(
      `${serverUrl}/businessHours/businessHoursLabel/${profile.type}/${profile.profile}`,
      {
        businessHoursLabel: value,
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
  const handleToggle = async (index, value) => {
    const newSwitchStates = [...props.switchStates];
    newSwitchStates[index].businessHoursSwitch = value;
    props.setSwitchStates(newSwitchStates);
    await saveToggleState(index, value);
  };

  const saveToggleState = async (index, value) => {
    await axios.put(
      `${serverUrl}/businessHours/businessHoursToggle/${profile.type}/${profile.profile}`,
      {
        businessHoursSwitch: value,
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
  const handleDeleteDay = async (day) => {
    // Clear the selected times for the specified day

    let businessHoursData;
    switch (day) {
      case "monday":
        setmonday1("");
        setmonday2("");
        setmonChecked(false);
        businessHoursData = {
          monday: {
            checked: false,
            timer1: "",
            timer2: "",
          },
          tuesday: {
            checked: tueChecked,
            timer1: tuetimer1,
            timer2: tuetimer2,
          },
          wednesday: {
            checked: wedChecked,
            timer1: wedtimer1,
            timer2: wedtimer2,
          },
          thursday: {
            checked: thusChecked,
            timer1: thrustimer1,
            timer2: thrustimer2,
          },
          friday: {
            checked: friChecked,
            timer1: fritimer1,
            timer2: fritimer2,
          },
          saturday: {
            checked: saturChecked,
            timer1: sattimer1,
            timer2: sattimer2,
          },
          sunday: {
            checked: sunChecked,
            timer1: suntimer1,
            timer2: suntimer2,
          },
        };

        break;
      case "tuesday":
        settueday1("");
        settueday2("");
        setueChecked(false);
        businessHoursData = {
          monday: {
            checked: monChecked,
            timer1: montimer1,
            timer2: montimer2,
          },
          tuesday: {
            checked: false,
            timer1: "",
            timer2: "",
          },
          wednesday: {
            checked: wedChecked,
            timer1: wedtimer1,
            timer2: wedtimer2,
          },
          thursday: {
            checked: thusChecked,
            timer1: thrustimer1,
            timer2: thrustimer2,
          },
          friday: {
            checked: friChecked,
            timer1: fritimer1,
            timer2: fritimer2,
          },
          saturday: {
            checked: saturChecked,
            timer1: sattimer1,
            timer2: sattimer2,
          },
          sunday: {
            checked: sunChecked,
            timer1: suntimer1,
            timer2: suntimer2,
          },
        };

        break;
      case "wednesday":
        setwedday1("");
        setwedday2("");
        setwedChecked(false);
        businessHoursData = {
          monday: {
            checked: monChecked,
            timer1: montimer1,
            timer2: montimer2,
          },
          tuesday: {
            checked: tueChecked,
            timer1: tuetimer1,
            timer2: tuetimer2,
          },
          wednesday: {
            checked: false,
            timer1: "",
            timer2: "",
          },
          thursday: {
            checked: thusChecked,
            timer1: thrustimer1,
            timer2: thrustimer2,
          },
          friday: {
            checked: friChecked,
            timer1: fritimer1,
            timer2: fritimer2,
          },
          saturday: {
            checked: saturChecked,
            timer1: sattimer1,
            timer2: sattimer2,
          },
          sunday: {
            checked: sunChecked,
            timer1: suntimer1,
            timer2: suntimer2,
          },
        };

        break;
      case "thursday":
        setthrusday1("");
        setthrusday2("");
        setthusChecked(false);
        businessHoursData = {
          monday: {
            checked: monChecked,
            timer1: montimer1,
            timer2: montimer2,
          },
          tuesday: {
            checked: tueChecked,
            timer1: tuetimer1,
            timer2: tuetimer2,
          },
          wednesday: {
            checked: wedChecked,
            timer1: wedtimer1,
            timer2: wedtimer2,
          },
          thursday: {
            checked: false,
            timer1: "",
            timer2: "",
          },
          friday: {
            checked: friChecked,
            timer1: fritimer1,
            timer2: fritimer2,
          },
          saturday: {
            checked: saturChecked,
            timer1: sattimer1,
            timer2: sattimer2,
          },
          sunday: {
            checked: sunChecked,
            timer1: suntimer1,
            timer2: suntimer2,
          },
        };

        break;
      case "friday":
        setfriday1("");
        setfriday2("");
        setfriChecked(false);

        businessHoursData = {
          monday: {
            checked: monChecked,
            timer1: montimer1,
            timer2: montimer2,
          },
          tuesday: {
            checked: tueChecked,
            timer1: tuetimer1,
            timer2: tuetimer2,
          },
          wednesday: {
            checked: wedChecked,
            timer1: wedtimer1,
            timer2: wedtimer2,
          },
          thursday: {
            checked: thusChecked,
            timer1: thrustimer1,
            timer2: thrustimer2,
          },
          friday: {
            checked: false,
            timer1: "",
            timer2: "",
          },
          saturday: {
            checked: saturChecked,
            timer1: sattimer1,
            timer2: sattimer2,
          },
          sunday: {
            checked: sunChecked,
            timer1: suntimer1,
            timer2: suntimer2,
          },
        };

        break;
      case "saturday":
        setsatday1("");
        setsatday2("");
        setsaturChecked(false);
        businessHoursData = {
          monday: {
            checked: monChecked,
            timer1: montimer1,
            timer2: montimer2,
          },
          tuesday: {
            checked: tueChecked,
            timer1: tuetimer1,
            timer2: tuetimer2,
          },
          wednesday: {
            checked: wedChecked,
            timer1: wedtimer1,
            timer2: wedtimer2,
          },
          thursday: {
            checked: thusChecked,
            timer1: thrustimer1,
            timer2: thrustimer2,
          },
          friday: {
            checked: friChecked,
            timer1: fritimer1,
            timer2: fritimer2,
          },
          saturday: {
            checked: false,
            timer1: "",
            timer2: "",
          },
          sunday: {
            checked: sunChecked,
            timer1: suntimer1,
            timer2: suntimer2,
          },
        };

        break;
      case "sunday":
        setsunday1("");
        setsunday2("");
        setsunChecked(false);
        businessHoursData = {
          monday: {
            checked: monChecked,
            timer1: montimer1,
            timer2: montimer2,
          },
          tuesday: {
            checked: tueChecked,
            timer1: tuetimer1,
            timer2: tuetimer2,
          },
          wednesday: {
            checked: wedChecked,
            timer1: wedtimer1,
            timer2: wedtimer2,
          },
          thursday: {
            checked: thusChecked,
            timer1: thrustimer1,
            timer2: thrustimer2,
          },
          friday: {
            checked: friChecked,
            timer1: fritimer1,
            timer2: fritimer2,
          },
          saturday: {
            checked: saturChecked,
            timer1: sattimer1,
            timer2: sattimer2,
          },
          sunday: {
            checked: false,
            timer1: "",
            timer2: "",
          },
        };

        break;
      default:
        break;
    }
    fetch(
      `${serverUrl}/businessHours/storeBusinessHours/${profile.profile}/${profile.type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ businessHours: businessHoursData }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          //console.log(data.error);
        } else {
          setMessage("Business Hours saved successfully");
          setShowtMessage(true);
          updateCheckVariable();
          setTimeout(() => {
            setShowtMessage(false);
          }, 3000);
          setDummyState(!dummyState);
        }
      })
      .catch((error) => {
        console.error("Error saving business hours:", error);
      });
    setDeleteToggle((prev) => !prev);
  };
  // useEffect(() => {
  //   saveBusinessHours();
  // }, [deleteToggle]);
  return (
    <div
      className={props.showTab === "Business Hours" ? "text-yellow" : "hidden"}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-base sm:text-lg font-semibold min-w-fit">
            {changeButton}
          </p>
          {/* <ProtagSmall /> */}
        </div>

        {props.switchStates.map((off, index) => (
          <Switch
            key={index}
            checked={off.businessHoursSwitch}
            onChange={(value) => handleToggle(index, value)}
            onColor="#12A26E"
            offColor="#A7A7A7"
            checkedIcon={false}
            uncheckedIcon={false}
            height={24}
            width={44}
          />
        ))}
      </div>
      <div
        style={{
          opacity: props.switchStates[0]?.businessHoursSwitch ? "1" : "0.5",
          pointerEvents: props.switchStates[0]?.businessHoursSwitch
            ? "auto"
            : "none",
        }}
      >
        <p className="pt-6 text-sm text-cGrey font-medium">
          Select a label for Business hours
        </p>

        {/* using same class for buttons from appointments buttons  */}

        <div className="pt-4 flex gap-3 text-[0.875rem] sm:text-[1rem] overflow-x-auto">
          {labels.map((label) => (
            <button
              key={label}
              onClick={() => handleBusinessHoursLabel(label)}
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
              label="Add label for Business Hours"
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />

            <div className="sm:ml-[3.125rem]">
              <PrimaryButton2
                color="black"
                text="Save"
                onClick={handleSaveLabel}
              />
            </div>
          </div>
        )}

        <div className="pt-11 xsm2:pb-2 flex justify-between items-center">
          <div>
            <p className=" text-sm text-cGrey font-medium">
              Set your Business hours
            </p>
          </div>
          <div className=" hidden xsm2:flex justify-center sm:justify-end ">
            {/* <TertiaryButton width={152} text="Cancel" /> */}
            <PrimaryButton2
              width={152}
              text="Save"
              onClick={saveBusinessHours}
            />
          </div>
        </div>
        {/* monday  */}
        <div className=" appt-box mt-4">
          <SwitchAndPlus2
            text="MON"
            checked={!monChecked}
            dayChange={() => {
              mondayChange(monChecked);
            }}
          />
          <div hidden={!monChecked}>
            <div className="py-2">
              <div className="pt-6">
                <DropdownTimeBussinessH
                  userSelected1={montimer1}
                  setUserSelected1={setmonday1}
                  userSelected2={montimer2}
                  setUserSelected2={setmonday2}
                  selectedDay="monday"
                  onDelete={handleDeleteDay}
                />
              </div>
            </div>
          </div>
        </div>
        {/* tuesday */}
        <div className=" appt-box mt-4">
          <SwitchAndPlus2
            text="TUE"
            checked={!tueChecked}
            dayChange={() => {
              tuedayChange(tueChecked);
            }}
          />
          <div hidden={!tueChecked}>
            <div className="py-2">
              <div className="pt-6">
                <DropdownTimeBussinessH
                  userSelected1={tuetimer1}
                  setUserSelected1={settueday1}
                  userSelected2={tuetimer2}
                  setUserSelected2={settueday2}
                  selectedDay="tuesday"
                  onDelete={handleDeleteDay}
                />
              </div>
            </div>
          </div>
        </div>
        {/* wednesday */}
        <div className="appt-box mt-4">
          <SwitchAndPlus2
            text="WED"
            checked={!wedChecked}
            dayChange={() => {
              weddayChange(wedChecked);
            }}
          />
          <div hidden={!wedChecked}>
            <div className="py-2">
              <div className="pt-6">
                <DropdownTimeBussinessH
                  userSelected1={wedtimer1}
                  setUserSelected1={setwedday1}
                  userSelected2={wedtimer2}
                  setUserSelected2={setwedday2}
                  selectedDay="wednesday"
                  onDelete={handleDeleteDay}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Thrusday */}
        <div className="appt-box mt-4">
          <SwitchAndPlus2
            text="THURS"
            checked={!thusChecked}
            dayChange={() => {
              thursdayChange(thusChecked);
            }}
          />
          <div hidden={!thusChecked}>
            <div className="py-2">
              <div className="pt-6">
                <DropdownTimeBussinessH
                  userSelected1={thrustimer1}
                  setUserSelected1={setthrusday1}
                  userSelected2={thrustimer2}
                  setUserSelected2={setthrusday2}
                  selectedDay="thursday"
                  onDelete={handleDeleteDay}
                />
              </div>
            </div>
          </div>
        </div>
        {/* friday */}
        <div className="appt-box mt-4">
          <SwitchAndPlus2
            text="FRI"
            checked={!friChecked}
            dayChange={() => {
              fridayChange(friChecked);
            }}
          />
          <div hidden={!friChecked}>
            <div className="py-2">
              <div className="pt-6">
                <DropdownTimeBussinessH
                  userSelected1={fritimer1}
                  setUserSelected1={setfriday1}
                  userSelected2={fritimer2}
                  setUserSelected2={setfriday2}
                  selectedDay="friday"
                  onDelete={handleDeleteDay}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Saturaday */}
        <div className=" appt-box mt-4">
          <SwitchAndPlus2
            text="SAT"
            checked={!saturChecked}
            dayChange={() => {
              saturdayChange(saturChecked);
            }}
          />
          <div hidden={!saturChecked}>
            <div className="py-2">
              <div className="pt-6">
                <DropdownTimeBussinessH
                  userSelected1={sattimer1}
                  setUserSelected1={setsatday1}
                  userSelected2={sattimer2}
                  setUserSelected2={setsatday2}
                  selectedDay="saturday"
                  onDelete={handleDeleteDay}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Sunday */}
        <div className="appt-box mt-4">
          <SwitchAndPlus2
            text="SUN"
            checked={!sunChecked}
            dayChange={() => {
              sundayChange(sunChecked);
            }}
          />
          <div hidden={!sunChecked}>
            <div className="py-2">
              <div className="pt-6">
                <DropdownTimeBussinessH
                  userSelected1={suntimer1}
                  setUserSelected1={setsunday1}
                  userSelected2={suntimer2}
                  setUserSelected2={setsunday2}
                  selectedDay="sunday"
                  onDelete={handleDeleteDay}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex xsm2:hidden justify-center sm:justify-end mt-[2rem] mb-[6rem] md:mb-[4.5rem] gap-[1rem]">
          {/* <TertiaryButton width={152} text="Cancel" /> */}
          <PrimaryButton2 width={152} text="Save" onClick={saveBusinessHours} />
        </div>
      </div>
      <NewToast open={showMessage} message={message} />
    </div>
  );
}

export default BuisnessHours;
