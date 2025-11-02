import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Input, Button } from "reactstrap";
import StarPicker from "react-star-ratings";
import Rating from "@mui/material/Rating";
// import Toast from "../pages/Toast/toast"
// import ToastContainer from "../pages/Toast/toastContai";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { serverUrl } from "../../config";

const Review = () => {
  // const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [reviewFormat, setReviewFormat] = useState([]);

  const profile = useParams();

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
  // const onChange = (value) => {
  // 	setRating(value);
  // }

  const [value, setValue] = React.useState(0);
  const putFeedback = async () => {
    try {
      const { data } = axios.post(
        `${serverUrl}/review/review/${type}/${profile.profile}`,
        {
          name: name,
          email: email,
          stars: value,
          title: title,
          review: review,
          profile: profile.profile,
        }
      );
      // Toast.success("Review Added!");
      setTitle(" ");
      setEmail(" ");
      setName(" ");
      setReview(" ");
      setValue(" ");
      if (data) {
        
      }
    } catch (err) {
      //console.log(err);
    }
  };

  const reviewForm = async () => {
    const { data } = await axios.get(
      `${serverUrl}/review/reviewForm/${type}/${profile.profile}`
    );
    
    setReviewFormat(data);
  };

  useEffect(() => {
    if(type!="")reviewForm();
  }, [type]);

  return (
    <div>
      {/* <ToastContainer position="bottom-center" limit={1}/> */}
      {reviewFormat.length != 0 ? (
        <>
          {reviewFormat.map((obj, index) => (
            <div
              key={index}
              className="container mt-5 mb-5"
              style={{
                display: "flex",
                flexFlow: "column",
                padding: "1.25rem",
                border: "0.9375rem solid #03203C ",
                height: "max-content",
                backgroundColor: "#35BDD0",
              }}
            >
              <h4 className="text-center m-3">
                {/* It will be helpful if you share your Experience */}
                {obj.title}
              </h4>
              <Row style={{ justifyContent: "center" }}>
                <h3>{obj.option}</h3>
                <Rating
                  name="half-rating"
                  value={value}
                  size="large"
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Row>
              <Row className="m-3">
                <Input
                  placeholder={obj.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Row>
              <Row className="m-3">
                <Input
                  placeholder={obj.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Row>
              <Row className="m-3">
                <Input
                  placeholder="Feel Free to Share your Experience"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Row>
              <Row className="m-3">
                <Input
                  type="textarea"
                  placeholder={obj.message}
                  style={{ height: "30vh" }}
                  onChange={(e) => setReview(e.target.value)}
                />
              </Row>

              <Row
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "1.25rem 0rem",
                }}
              >
                <Button typecolor="warning" type="submit" onClick={putFeedback}>
                  Sumbit
                </Button>
              </Row>
            </div>
          ))}
        </>
      ) : (
        <>
          <div
            className="container mt-5 mb-5"
            style={{
              display: "flex",
              flexFlow: "column",
              padding: "1.25rem",
              border: "0.9375rem solid #03203C ",
              height: "max-content",
              backgroundColor: "#35BDD0",
            }}
          >
            <h4 className="text-center m-3">
              It will be helpful if you share your Experience
              {/* {obj.title} */}
            </h4>
            <Row style={{ justifyContent: "center" }}>
              {/* <h3>{obj.option}</h3> */}
              <Rating
                name="half-rating"
                value={value}
                size="large"
                precision={0.5}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Row>
            <Row className="m-3">
              <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Row>
            <Row className="m-3">
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Row>
            <Row className="m-3">
              <Input
                placeholder="Feel Free to Share your Experience"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Row>
            <Row className="m-3">
              <Input
                type="textarea"
                placeholder="Please write some message"
                style={{ height: "30vh" }}
                onChange={(e) => setReview(e.target.value)}
              />
            </Row>

            <Row
              style={{
                display: "flex",
                justifyContent: "space-around",
                padding: "1.25rem 0rem",
              }}
            >
              <Button typecolor="warning" type="submit" onClick={putFeedback}>
                Sumbit
              </Button>
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default Review;
