import React, { useState, useEffect } from "react";
import * as hi from "react-icons/hi";
import Switch from "react-switch";
import Axios from "axios";
import { serverUrl } from "../../config";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function SwitchText(props) {props = useDefaultProps(props);
  const [checked, setChecked] = useState(false);
  // const profile=useParams();
  const [toggleStates, setToggleStates] = useState([]);
  const navigate = useRouter();
  const fetchreview = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await Axios.get(
        `${serverUrl}/getUser/getUser/mustali`,
        config
      );
      setToggleStates(data);
      
    } catch (error) {
      //console.log(error);
      navigate.push("/login");
    }
  };

  useEffect(() => {
    fetchreview();
  }, []);
  function handleChange() {
    setChecked((prev) => !prev);
  }

  return (
    <div className="flex items-center gap-3">
      <p className=" font-light s-color ">{props.state}</p>
      <span className="s-color cursor-pointer">
        <hi.HiOutlineInformationCircle />
      </span>
      {toggleStates.map((off,index) => (
        <>
          <Switch
            key={index}
            checked={off.contactForm}
            onChange={handleChange}
            onColor="#12A26E"
            offColor="#A7A7A7"
            checkedIcon={false}
            uncheckedIcon={false}
            height={24}
            width={44}
          />
        </>
      ))}
    </div>
  );
}

const defaultProps = {
  text: "Allow lead capture",
  showSpan: true,
};

export default SwitchText;
