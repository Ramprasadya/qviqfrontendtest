import react, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Bowser from "bowser";
import { saveAs } from "file-saver";
import { serverUrl } from "../../config";
import { getCookie } from "../utils";

function ViewProfile1() {
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [browser, setBrowser] = useState("");
  const [platform, setplatform] = useState();
  const [os, setos] = useState("");
  const [vendor, setVendor] = useState("");
  // const[engine,setEngine] = useState();
  const [type, setType] = useState("");

  const profile = useParams();

  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        setIp(response.data.ip);
        setLocation(response.data);
        
      })
      .catch((error) => console.error(error));
    
    setBrowser(Bowser.getParser(window.navigator.userAgent).getBrowserName());
    setos(Bowser.getParser(window.navigator.userAgent).getOSVersion());
    setVendor(
      Bowser.getParser(window.navigator.userAgent).getPlatform().vendor
    );
    setType(Bowser.getParser(window.navigator.userAgent).getPlatform().type);
    setplatform(navigator.platform);
    
    
    //   postdata();
  }, []);

  

  const postdata = () => {
    try {
      const { data } = axios.post(
        `${serverUrl}/analytics/profileview/${profile.type}/${profile.profile}`,
        {
          ip: ip,
          country: location.country_name,
          countryCode: location.country_code,
          state: location.region,
          city: location.city,
          browser: browser,
          platform: platform,
          profile: profile.profile,
          device: type,
        }
      );
      const { analyticsToggle } = axios.post(
        `${serverUrl}/tapopuser/toggle/analytics/${profile.profile}`
      );
      
    } catch (err) {
      //console.log(err);
    }
  };

  const [apps, setApps] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      try {
        const result = await axios.get(
          `${serverUrl}/getData/data/${profile.type}/${profile.profile}`,
          config
        );
        setApps(result.data.apps);
      } catch (error) {
        //console.log(error?.response?.data?.error);
        navigate("/login");
      }
    }
    getData();
  }, []);

  // useEffect(() => {
  //   postdata();
  // });

  const handleLink = (platform) => {
    
    try {
      const { data } = axios.post(
        `${serverUrl}/analytics/${profile.type}/${profile.profile}/${platform}`,
        {
          profile: profile.profile,
          country:location.country_name,
          countryCode:location.country_code
        }
      );
      // //console.log(data);
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <h1>Your IP address: {ip}</h1>
        <h1>Your location:</h1>
        <p>Country: {location.country_name}</p>
        <p>City: {location.city}</p>
        <p>state: {location.region}</p>
        <p>Country Code : {location.country_code}</p>
        {/* <p>Latitude: {location.latitude}</p>
        <p>Longitude: {location.longitude}</p> */}
      </div>
      <div>
        <p>Browser:- : {browser}</p>
        <p>platform : - {platform}</p>
        <p>OS :- {os}</p>
        <p>Type:- {type}</p>
        <p>Vendor: {vendor}</p>
        {/* <p>Engine:{engine}</p> */}
      </div>
      <div>
        <button className="btn" onClick={postdata}>
          Post
        </button>
      </div>
      <div>
        {apps.map((obj, value) => (
          <div key={value}>
            <button onClick={() => handleLink(obj.platform)}>
              {obj.platform}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewProfile1;
