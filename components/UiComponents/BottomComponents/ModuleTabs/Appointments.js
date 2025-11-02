import React, { useState } from "react";
import ProtagSmall from "../../ProtagSmall";
import DropdownTime from "../../DropdownTime";
import Switch from "react-switch";
import LinkButtons2 from "../../LinkButtons2";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import SwitchAndPlus from "../../SwitchAndPlus";
import PrimaryButton2 from "../../PrimaryButton2";
import "./appointments.css";
import TertiaryButton from "../../TertiaryButton";
import InputField from "../../InputField";
import { serverUrl, clientUrl } from "../../../../config";
import { useEffect, useContext } from "react";
import axios from "axios";
import NewToast from "../../NewToast";
import { useParams, usePathname } from "next/navigation";
import { UserContext } from "../../../Contexts/context";
import { getCookie } from "@/components/utils";

function Appointments(props) {
  //console.log("props", props);
  const maxSlotCount = 3;
  const currentPath = usePathname();
  const [changeButton, setChangeButton] = useState("Available slots");
  const profile = {
    profile: useParams().userName,
    type: useParams().templateId,
  };

  const { userType } = useContext(UserContext);

  const [showMessage, setShowtMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [slotInterval, setSlotInterval] = useState(30);

  // state for day checked on off
  const [monChecked, setmonChecked] = useState(true);
  const [tueChecked, setueChecked] = useState(true);
  const [wedChecked, setwedChecked] = useState(true);
  const [thusChecked, setthusChecked] = useState(true);
  const [friChecked, setfriChecked] = useState(true);
  const [saturChecked, setsaturChecked] = useState(true);
  const [sunChecked, setsunChecked] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const mondayChange = () => {
    if (monComponents.length == 0 && monChecked) {
      setmonComponents([
        {
          id: randomUniqueId(monComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ]);
    }
    setmonChecked((prev) => !prev);
  };
  const tuedayChange = () => {
    if (tueComponents.length == 0 && tueChecked) {
      settueComponents([
        {
          id: randomUniqueId(tueComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ]);
    }
    setueChecked((prev) => !prev);
  };
  const weddayChange = () => {
    if (wedComponents.length == 0 && wedChecked) {
      setwedComponents([
        {
          id: randomUniqueId(wedComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ]);
    }
    setwedChecked((prev) => !prev);
  };
  const thursdayChange = () => {
    if (thursComponents.length == 0 && thusChecked) {
      setthursComponents([
        {
          id: randomUniqueId(thursComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ]);
    }
    setthusChecked((prev) => !prev);
  };
  const fridayChange = () => {
    if (friComponents.length == 0 && friChecked) {
      setfriComponents([
        {
          id: randomUniqueId(friComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ]);
    }
    setfriChecked((prev) => !prev);
  };
  const saturdayChange = () => {
    if (saturComponents.length == 0 && saturChecked) {
      setsaturComponents([
        {
          id: randomUniqueId(saturComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ]);
    }
    setsaturChecked((prev) => !prev);
  };
  const sundayChange = () => {
    if (sunComponents.length == 0 && sunChecked) {
      setsunComponents([
        {
          id: randomUniqueId(sunComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ]);
    }
    setsunChecked((prev) => !prev);
  };

  // state for toggling label
  const [showLabel, setShowLabel] = useState(false);
  ///////////////////////////////////////////////////
  // Add Day component
  const [monComponents, setmonComponents] = useState([]);
  const [tueComponents, settueComponents] = useState([]);
  const [wedComponents, setwedComponents] = useState([]);
  const [thursComponents, setthursComponents] = useState([]);
  const [friComponents, setfriComponents] = useState([]);
  const [saturComponents, setsaturComponents] = useState([]);
  const [sunComponents, setsunComponents] = useState([]);
  const [labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState("");
  const [syncedWithGoogle, setSyncedWithGoogle] = useState(false);

  useEffect(() => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      axios
        .get(
          `${serverUrl}/availability/getLabel/${profile.type}/${profile.profile}`,
          config
        )
        .then((response) => {
          const availabilityLabel =
            response.data[0]?.availabilityLabel || "Available slots";

          setChangeButton(availabilityLabel);
        });
      axios
        .get(
          `${serverUrl}/availability/getAvailabilityArray/${profile.type}/${profile.profile}`,
          config
        )
        .then((response) => {
          const availabilityLabelList = response.data[0]
            ?.availabilityLabelList || [
            "Available slots",
            "Appointments",
            "Availability",
          ];

          setLabels(availabilityLabelList);
        });
      axios
        .get(`${serverUrl}/account/info/${profile.profile}`, config)
        .then((response) => {
          setSyncedWithGoogle(
            response?.data?.at(0).googleTokens ? true : false
          );
        });
    } catch (error) {
      //console.log(error);
    }
  }, []);

  const handleSyncWithGoogle = async () => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/tapopuser/getGoogleAuthUrl/${profile.profile}`,
        {
          fromPage: `${clientUrl + currentPath}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
        }
      );
      window.location.href = data.url;
    } catch (e) {
      //console.log(e);
    }
  };

  const handleAvailabilityLabel = async (value) => {
    setChangeButton(value);
    await axios.put(
      `${serverUrl}/availability/availabilityLabel/${profile.type}/${profile.profile}`,
      {
        availabilityLabel: value,
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

  const handleSaveLabel = () => {
    const updatedLabels = [...labels, newLabel];
    const limitedLabels =
      updatedLabels.length <= 4
        ? updatedLabels
        : [...updatedLabels.slice(0, 3), newLabel];

    try {
      axios
        .put(
          `${serverUrl}/availability/updateLabels/${profile.type}/${profile.profile}`,
          {
            availabilityLabelList: limitedLabels,
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
            handleAvailabilityLabel(newLabel);
          } else {
            console.error("Label update failed");
          }
        });
    } catch (error) {
      //console.log(error);
    }
  };

  const handleToggle = async (index, value) => {
    const newSwitchStates = [...props.switchStates];
    newSwitchStates[index].availabilitySwitch = value;
    props.setSwitchStates(newSwitchStates);
    await saveToggleState(index, value);
  };

  const saveToggleState = async (index, value) => {
    await axios.put(
      `${serverUrl}/availability/availabilityToggle/${profile.type}/${profile.profile}`,
      {
        availabilitySwitch: value,
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

  const getSlots = async () => {
    const res = await fetch(
      `${serverUrl}/availability/getslots/${profile.type}/${profile.profile}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      }
    );

    let data = await res.json();
    //console.log(data);
    //console.log(`${profile.type}/${profile.profile}`);

    if (data && data.monday && data.monday.component) {
      const insertId = (data) => {
        let comp = [];
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          comp.push({
            id: randomUniqueId(comp),
            userSelected1: item.from,
            userSelected2: item.to,
          });
        }
        return comp;
      };

      setSlotInterval(data.slotInterval);

      setmonChecked(data.monday.checked);
      setueChecked(data.tuesday.checked);
      setwedChecked(data.wednesday.checked);
      setthusChecked(data.thursday.checked);
      setfriChecked(data.friday.checked);
      setsaturChecked(data.saturday.checked);
      setsunChecked(data.sunday.checked);

      setmonComponents(insertId(data.monday.component));
      settueComponents(insertId(data.tuesday.component));
      setwedComponents(insertId(data.wednesday.component));
      setthursComponents(insertId(data.thursday.component));
      setfriComponents(insertId(data.friday.component));
      setsaturComponents(insertId(data.saturday.component));
      setsunComponents(insertId(data.sunday.component));
    }
  };

  useEffect(() => {
    getSlots();
  }, []);

  const filterSlots = (arr) => {
    let tmp = arr
      .map((item) => {
        return { from: item.userSelected1, to: item.userSelected2 };
      })
      .filter(
        (item) =>
          new Date("1/1/2000 " + item.from).getTime() <
          new Date("1/1/2000 " + item.to).getTime()
      );

    tmp.sort(
      (a, b) =>
        new Date("1/1/2000 " + a.from).getTime() -
        new Date("1/1/2000 " + b.from).getTime()
    );
    let res = [];
    for (let i = 0; i < tmp.length; i++) {
      if (i == 0) {
        res.push(tmp[i]);
        continue;
      }
      if (tmp[i].from == tmp[i - 1].from && tmp[i].to == tmp[i - 1].to)
        continue;
      res.push(tmp[i]);
    }
    return res;
  };

  const handleSave = async (e) => {
    let monday = { checked: monChecked, component: filterSlots(monComponents) };
    let tuesday = {
      checked: tueChecked,
      component: filterSlots(tueComponents),
    };
    let wednesday = {
      checked: wedChecked,
      component: filterSlots(wedComponents),
    };
    let thursday = {
      checked: thusChecked,
      component: filterSlots(thursComponents),
    };
    let friday = { checked: friChecked, component: filterSlots(friComponents) };
    let saturday = {
      checked: saturChecked,
      component: filterSlots(saturComponents),
    };
    let sunday = { checked: sunChecked, component: filterSlots(sunComponents) };

    await fetch(
      `${serverUrl}/availability/updateslots/${profile.type}/${profile.profile}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
        body: JSON.stringify({
          label: changeButton,
          slotInterval: slotInterval,
          availability: {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday,
          },
        }),
      }
    ).then((data) => {
      if (data.error) {
        //console.log(data.error);
      } else {
        setMessage("Appointments saved successfully");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      }
    });
  };

  const handleDuplicateBtn = (from, to) => {
    let fromCom = "";
    let fromChecked = "";
    if (from == "Mon") {
      fromCom = [...monComponents];
      fromChecked = monChecked;
    }
    if (from == "Tue") {
      fromCom = [...tueComponents];
      fromChecked = tueChecked;
    }
    if (from == "Wed") {
      fromCom = [...wedComponents];
      fromChecked = wedChecked;
    }
    if (from == "Thurs") {
      fromCom = [...thursComponents];
      fromChecked = thusChecked;
    }
    if (from == "Fri") {
      fromCom = [...friComponents];
      fromChecked = friChecked;
    }
    if (from == "Sat") {
      fromCom = [...saturComponents];
      fromChecked = saturChecked;
    }
    if (from == "Sun") {
      fromCom = [...sunComponents];
      fromChecked = sunChecked;
    }

    if (to == "Mon") {
      setmonChecked(fromChecked);
      setmonComponents(fromCom);
    }
    if (to == "Tue") {
      setueChecked(fromChecked);
      settueComponents(fromCom);
    }
    if (to == "Wed") {
      setwedChecked(fromChecked);
      setwedComponents(fromCom);
    }
    if (to == "Thurs") {
      setthusChecked(fromChecked);
      setthursComponents(fromCom);
    }
    if (to == "Fri") {
      setfriChecked(fromChecked);
      setfriComponents(fromCom);
    }
    if (to == "Sat") {
      setsaturChecked(fromChecked);
      setsaturComponents(fromCom);
    }
    if (to == "Sun") {
      setsunChecked(fromChecked);
      setsunComponents(fromCom);
    }
  };

  const randomUniqueId = (components) => {
    let id = Math.floor(Math.random() * 1000000);
    let flag = true;
    while (flag) {
      flag = false;
      id = Math.floor(Math.random() * 1000000);
      components.forEach((element) => {
        if (element.idx == id) flag = true;
      });
    }
    return id;
  };
  function newAddComponentMonday() {
    if (
      monComponents.length != 0 &&
      (monComponents[monComponents.length - 1].userSelected1 == "" ||
        monComponents[monComponents.length - 1].userSelected2 == "")
    )
      return;
    if (monComponents.length < maxSlotCount) {
      const newComponents = [
        ...monComponents,

        {
          id: randomUniqueId(monComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ];

      setmonComponents(newComponents);
    }
  }
  //  Delete the mon Component
  function deletemonComponent(id) {
    let newComponents = [];
    for (let idx = 0; idx < monComponents.length; idx++) {
      if (monComponents[idx].id == id) continue;
      newComponents.push(monComponents[idx]);
    }
    if (newComponents.length == 0) mondayChange();
    setmonComponents(newComponents);
  }

  //  Tuesday mapping component
  function newAddComponentTueday() {
    if (
      tueComponents.length != 0 &&
      (tueComponents[tueComponents.length - 1].userSelected1 == "" ||
        tueComponents[tueComponents.length - 1].userSelected2 == "")
    )
      return;
    if (tueComponents.length < maxSlotCount) {
      const newComponents = [
        ...tueComponents,

        {
          id: randomUniqueId(tueComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ];

      settueComponents(newComponents);
    }
  }
  //  Delete the tue Component
  function deletetueComponent(id) {
    let newComponents = [];
    for (let idx = 0; idx < tueComponents.length; idx++) {
      if (tueComponents[idx].id == id) continue;
      newComponents.push(tueComponents[idx]);
    }
    if (newComponents.length == 0) tuedayChange();
    settueComponents(newComponents);
  }

  // Wednesday add component
  function newAddComponentWednesday() {
    if (
      wedComponents.length != 0 &&
      (wedComponents[wedComponents.length - 1].userSelected1 == "" ||
        wedComponents[wedComponents.length - 1].userSelected2 == "")
    )
      return;
    if (wedComponents.length < maxSlotCount) {
      const newComponents = [
        ...wedComponents,

        {
          id: randomUniqueId(wedComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ];

      setwedComponents(newComponents);
    }
  }
  //  Delete the wed Component
  function deletewedComponent(id) {
    let newComponents = [];
    for (let idx = 0; idx < wedComponents.length; idx++) {
      if (wedComponents[idx].id == id) continue;
      newComponents.push(wedComponents[idx]);
    }
    if (newComponents.length == 0) weddayChange();
    setwedComponents(newComponents);
  }
  // thursday add component
  function newAddComponentThursday() {
    if (
      thursComponents.length != 0 &&
      (thursComponents[thursComponents.length - 1].userSelected1 == "" ||
        thursComponents[thursComponents.length - 1].userSelected2 == "")
    )
      return;
    if (thursComponents.length < maxSlotCount) {
      const newComponents = [
        ...thursComponents,

        {
          id: randomUniqueId(thursComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ];

      setthursComponents(newComponents);
    }
  }

  //  Delete the  thurs Component
  function deletethursComponent(id) {
    let newComponents = [];
    for (let idx = 0; idx < thursComponents.length; idx++) {
      if (thursComponents[idx].id == id) continue;
      newComponents.push(thursComponents[idx]);
    }
    if (newComponents.length == 0) thursdayChange();
    setthursComponents(newComponents);
  }
  //  Delete the fri Component
  function deletefriComponent(id) {
    let newComponents = [];
    for (let idx = 0; idx < friComponents.length; idx++) {
      if (friComponents[idx].id == id) continue;
      newComponents.push(friComponents[idx]);
    }
    if (newComponents.length == 0) fridayChange();
    setfriComponents(newComponents);
  }
  function newAddComponentFriday() {
    if (
      friComponents.length != 0 &&
      (friComponents[friComponents.length - 1].userSelected1 == "" ||
        friComponents[friComponents.length - 1].userSelected2 == "")
    )
      return;
    if (friComponents.length < maxSlotCount) {
      const newComponents = [
        ...friComponents,

        {
          id: randomUniqueId(friComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ];

      setfriComponents(newComponents);
    }
  }
  // Saturday

  function newAddComponentSaturday() {
    if (
      saturComponents.length != 0 &&
      (saturComponents[saturComponents.length - 1].userSelected1 == "" ||
        saturComponents[saturComponents.length - 1].userSelected2 == "")
    )
      return;
    if (saturComponents.length < maxSlotCount) {
      const newComponents = [
        ...saturComponents,

        {
          id: randomUniqueId(saturComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ];

      setsaturComponents(newComponents);
    }
  } //  Delete the Sat Component
  function deletesaturComponent(id) {
    let newComponents = [];
    for (let idx = 0; idx < saturComponents.length; idx++) {
      if (saturComponents[idx].id == id) continue;
      newComponents.push(saturComponents[idx]);
    }
    if (newComponents.length == 0) saturdayChange();
    setsaturComponents(newComponents);
  }
  // Sunday

  function newAddComponentSunday() {
    if (
      sunComponents.length != 0 &&
      (sunComponents[sunComponents.length - 1].userSelected1 == "" ||
        sunComponents[sunComponents.length - 1].userSelected2 == "")
    )
      return;
    if (sunComponents.length < maxSlotCount) {
      const newComponents = [
        ...sunComponents,

        {
          id: randomUniqueId(sunComponents),
          userSelected1: "",
          userSelected2: "",
        },
      ];

      setsunComponents(newComponents);
    }
  }
  //  Delete the Sun Component
  function deletesunComponent(id) {
    let newComponents = [];
    for (let idx = 0; idx < sunComponents.length; idx++) {
      if (sunComponents[idx].id == id) continue;
      newComponents.push(sunComponents[idx]);
    }
    if (newComponents.length == 0) sundayChange();
    setsunComponents(newComponents);
  }

  return (
    <div
      className={
        props.showTab === "Appointments" ? "overflow-x-auto" : "hidden"
      }
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-base sm:text-lg font-semibold min-w-fit">
            {changeButton}
          </p>
          {userType != "Pro" && <ProtagSmall />}
        </div>

        {props.switchStates.map((off, index) => (
          <Switch
            key={index}
            checked={off.availabilitySwitch}
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
          opacity: props.switchStates[0]?.availabilitySwitch ? "1" : "0.5",
          pointerEvents: props.switchStates[0]?.availabilitySwitch
            ? "auto"
            : "none",
        }}
      >
        <p className="pt-6 text-sm text-cGrey font-medium">
          Select a label for your appointments
        </p>
        {/* using same class for buttons from appointments buttons  */}
        <div className="pt-4 flex gap-3 text-[0.875rem] sm:text-[1rem] overflow-x-auto">
          {labels.map((label) => (
            <button
              key={label}
              onClick={() => handleAvailabilityLabel(label)}
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
              label="Add label for Appointments"
              type="text"
              value={newLabel}
              onChange={(e) => {
                setNewLabel(e.target.value);
                setIsTyping(true);
              }}
            />

            <div
              className={`sm:ml-[3.125rem] ${
                isTyping && newLabel.length >= 2 ? "visible" : "invisible"
              } `}
            >
              <PrimaryButton2
                color="black"
                text="Save"
                onClick={() => {
                  handleSaveLabel();
                  setIsTyping(false);
                }}
              />
            </div>
          </div>
        )}

        <div className="flex pt-5">
          <PrimaryButton2
            color="black"
            text={`Sync${syncedWithGoogle ? "ed" : ""} With Google`}
            isDisabled={syncedWithGoogle}
            onClick={handleSyncWithGoogle}
          />
        </div>

        {/* <div className="pt-11">
          <p className=" text-sm text-cGrey font-medium">
            Select Slots Interval
          </p>
        </div>
        <div className="mt-1 p-3">
          <select
            className=" bg-gray-100 py-2 px-3 rounded-xl text-sm"
            value={slotInterval}
            onChange={(e) => setSlotInterval(e.target.value)}
          >
            <option value={5}>5 min</option>
            <option value={10}>10 min</option>
            <option value={15}>15 min</option>
            <option value={20}>20 min</option>
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>1 hr</option>
          </select>
        </div> */}

        <div className="pt-11 xsm2:pb-2 flex justify-between items-center">
          <div>
            <p className=" text-sm text-cGrey font-medium">
              Select your availability
            </p>
          </div>
          <div className=" hidden xsm2:flex justify-center sm:justify-end ">
            {/* <TertiaryButton width={152} text="Cancel" /> */}
            <PrimaryButton2 width={152} text="Save" onClick={handleSave} />
          </div>
        </div>

        <div className="mt-[1rem] w-[100%] flex flex-col items-center gap-[28px]">
          {/* monday  */}
          <div className="appt-box">
            <SwitchAndPlus
              text="Mon"
              checked={monChecked}
              dayChange={() => {
                mondayChange();
              }}
              handleDuplicateBtn={handleDuplicateBtn}
              AddDay={(e) => newAddComponentMonday(e)}
            />

            <div hidden={monChecked}>
              {monComponents.map((item, index) => (
                <div className="pb-2 pt-4" key={index}>
                  <DropdownTime
                    userSelected1={item.userSelected1}
                    userSelected2={item.userSelected2}
                    setComponents={setmonComponents}
                    components={monComponents}
                    onDelete={deletemonComponent}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* <button onClick={() => deletemonComponent()}>dvfferg</button> */}
          {/* tuesday */}
          <div className="appt-box">
            <SwitchAndPlus
              text="Tue"
              checked={tueChecked}
              dayChange={() => {
                tuedayChange();
              }}
              handleDuplicateBtn={handleDuplicateBtn}
              AddDay={(e) => newAddComponentTueday(e)}
            />
            <div hidden={tueChecked}>
              {tueComponents.map((item, index) => (
                <div className="pb-2 pt-4" key={index}>
                  <DropdownTime
                    userSelected1={item.userSelected1}
                    userSelected2={item.userSelected2}
                    setComponents={settueComponents}
                    components={tueComponents}
                    onDelete={deletetueComponent}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* wednesday */}
          <div className="appt-box">
            <SwitchAndPlus
              text="Wed"
              checked={wedChecked}
              dayChange={() => {
                weddayChange();
              }}
              handleDuplicateBtn={handleDuplicateBtn}
              AddDay={(e) => newAddComponentWednesday(e)}
            />
            <div hidden={wedChecked}>
              {wedComponents.map((item, index) => (
                <div className="pb-2 pt-4" key={index}>
                  <DropdownTime
                    userSelected1={item.userSelected1}
                    userSelected2={item.userSelected2}
                    setComponents={setwedComponents}
                    components={wedComponents}
                    onDelete={deletewedComponent}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* thursday */}
          <div className="appt-box">
            <SwitchAndPlus
              text="Thurs"
              checked={thusChecked}
              dayChange={() => {
                thursdayChange();
              }}
              handleDuplicateBtn={handleDuplicateBtn}
              AddDay={(e) => newAddComponentThursday(e)}
            />
            <div hidden={thusChecked}>
              {thursComponents.map((item, index) => (
                <div className="pb-2 pt-4" key={index}>
                  <DropdownTime
                    userSelected1={item.userSelected1}
                    userSelected2={item.userSelected2}
                    setComponents={setthursComponents}
                    components={thursComponents}
                    onDelete={deletethursComponent}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* friday */}
          <div className="appt-box">
            <SwitchAndPlus
              text="Fri"
              checked={friChecked}
              dayChange={() => {
                fridayChange();
              }}
              handleDuplicateBtn={handleDuplicateBtn}
              AddDay={(e) => newAddComponentFriday(e)}
            />
            <div hidden={friChecked}>
              {friComponents.map((item, index) => (
                <div className="pb-2 pt-4" key={index}>
                  <DropdownTime
                    userSelected1={item.userSelected1}
                    userSelected2={item.userSelected2}
                    setComponents={setfriComponents}
                    components={friComponents}
                    onDelete={deletefriComponent}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Saturday */}
          <div className="appt-box">
            <SwitchAndPlus
              text="Sat"
              checked={saturChecked}
              dayChange={() => {
                saturdayChange();
              }}
              handleDuplicateBtn={handleDuplicateBtn}
              AddDay={(e) => newAddComponentSaturday(e)}
            />
            <div hidden={saturChecked}>
              {saturComponents.map((item, index) => (
                <div className="pb-2 pt-4" key={index}>
                  <DropdownTime
                    userSelected1={item.userSelected1}
                    userSelected2={item.userSelected2}
                    setComponents={setsaturComponents}
                    components={saturComponents}
                    onDelete={deletesaturComponent}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* sunday */}
          <div className="appt-box">
            <SwitchAndPlus
              text="Sun"
              checked={sunChecked}
              dayChange={() => {
                sundayChange();
              }}
              handleDuplicateBtn={handleDuplicateBtn}
              AddDay={(e) => newAddComponentSunday(e)}
            />
            <div hidden={sunChecked}>
              {sunComponents.map((item, index) => (
                <div className="pt-4" key={index}>
                  <DropdownTime
                    userSelected1={item.userSelected1}
                    userSelected2={item.userSelected2}
                    setComponents={setsunComponents}
                    components={sunComponents}
                    onDelete={deletesunComponent}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex xsm2:hidden justify-center sm:justify-end mt-[2rem] gap-[1rem] mb-[6rem] md:mb-[4.5rem] w-full">
            {/* <TertiaryButton width={152} text="Cancel" /> */}
            <PrimaryButton2 width={152} text="Save" onClick={handleSave} />
          </div>
        </div>
      </div>

      <NewToast open={showMessage} message={message} />
    </div>
  );
}

export default Appointments;
