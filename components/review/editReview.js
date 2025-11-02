import React, { useState,useEffect } from "react";
import Switch from "react-switch";
import axios from "axios";
import { EditText } from "react-edit-text";
import Radio from "@mui/material/Radio/Radio";
import { serverUrl } from "../../config";
import { useParams } from "next/navigation";

const EditReview = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [option, setOption] = useState("");
  const [checked, setChecked] = useState("");
  const [type,setType] = useState("");
  const profile = useParams().userName;

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/profile/profiletype/${profile}`
      );
      if (res.data.length > 0) {
        setType(res.data[0]._id);
      }
    } catch (error) {
      //console.log(error?.response?.data?.error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const save = (e) => {
    const { data } = axios.post(
      `${serverUrl}/review/editReview/${type}/${profile.profile}`,
      {
        name: name,
        title: title,
        email: email,
        message: message,
        profile: profile,
        option: option,
      }
    );
    setTitle("");
    setName("");
    setEmail("");
    setMessage("");
    setOption("");
    if (data) {
      
    }
  };

  const cancel = () => {
    setName(" ");
    setTitle(" ");
    setEmail(" ");
    setMessage(" ");
  };

  const handleOption = (e) => {
    setOption(e.target.value);
  };

  const handleToggle = (value) => {
    setChecked(value);
  };

  return (
    <div>
      <div>
        <EditText
          inline="true"
          showEditButton="true"
          defaultValue="Review"
          editButtonContent="edit"
        />
      </div>
      <div>
        <Switch
          checked={checked}
          onChange={handleToggle}
          onColor="#52c41a"
          offColor="#f5222d"
          checkedIcon={false}
          uncheckedIcon={false}
          width={50}
        />
      </div>
      <div>
        <h4>Heading</h4>
        <input
          placeholder="Enter a Tiltle for Review Heading"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <h4>Name</h4>
        <input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <h4>Email</h4>
        <input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <h4>Message</h4>
        <input
          placeholder="Enter a Title for Review Message"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        <h4>Select a Rating Style</h4>
        <div>
          <h5>How was your experience with us?</h5>
          <p></p>
          {/* rating style1 */}
          <Radio
            value="option1"
            checked={option === "option1"}
            onChange={handleOption}
          />
          Option 1
        </div>
        <div>
          <h5>Leave Your Feedback</h5>
          <p>Tap a Star to give your rating</p>
          {/* rating style 2 */}
          <Radio
            value="option2"
            checked={option === "option2"}
            onChange={handleOption}
          />
          Option 2
        </div>
        <div>
          <h5>How would you rate this product?</h5>
          <p>Tap an emoji to give your rating</p>
          {/* rating style 3 */}
          <Radio
            value="option3"
            checked={option === "option3"}
            onChange={handleOption}
          />
          Option 3
        </div>
      </div>
      <div>
        <button
          type="reset"
          className="btn-secondary rounded-full"
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
      <div>
        <button className="btn" onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditReview;

//refer to this for react edit text package
//https://www.npmjs.com/package/react-edit-text
