"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { serverUrl } from "../../config";
import { useParams } from "next/navigation";

const styles = {
  container: {
    paddingTop: "1rem",
  },
  header: {
    marginBottom: "0.5rem",
  },
  card: {
    marginBottom: "0.5rem",
  },
  divider: {
    margin: "1rem 0",
    height: "3px",
    backgroundColor: "#000",
  },
};

const UserDetail = ({ searchParams }) => {
  const id = useParams().userId;
  const profile = searchParams.profile;
  const [userGroups, setUserGroups] = useState({});

  useEffect(() => {
    fetch(`${serverUrl}/profile/user/${profile}`)
      .then((response) => response.json())
      .then((data) => {
        const groupedUsers = groupUsersByType(data);
        setUserGroups(groupedUsers);
      })
      .catch((error) => console.log(error));
  }, [profile]);

  // Group the users based on type
  const groupUsersByType = (users) => {
    const groupedUsers = {};
    users.forEach((user) => {
      if (groupedUsers[user.type]) {
        groupedUsers[user.type].push(user);
      } else {
        groupedUsers[user.type] = [user];
      }
    });
    return groupedUsers;
  };

  const renderContent = (user, index) => {
    switch (user.header) {
      case "img":
        const isMultipleUsers = userGroups[user.type]?.length > 1;
        return (
          <div
            key={user._id}
            style={isMultipleUsers ? { display: "inline-block" } : {}}
          >
            <Typography variant="h6"> Image</Typography>
            <img
              src={user.image}
              alt={user.header}
              className="w-20 h-20 rounded-lg block"
            />
          </div>
        );
      case "pdf":
        return (
          <>
            <Typography variant="h6"> PDF</Typography>
            <Typography variant="body1">
              <a href={user.docs} target="_blank" rel="noopener noreferrer">
                {user.pdfname}
              </a>
            </Typography>
          </>
        );
      case "app":
        return (
          <>
            <Typography variant="h6">App Details</Typography>
            <Typography variant="body1">Platform: {user.platform}</Typography>
            <Typography variant="body1">App Type: {user.apptype}</Typography>
            <Typography variant="body1">User Name: {user.userName}</Typography>
            <Typography variant="body1">Label: {user.label}</Typography>
            <Typography variant="body1">
              Link: {user.link}
              {user.userName}
            </Typography>
          </>
        );
      case "basicdetail":
        return (
          <>
            <Typography variant="h6">Basic Details</Typography>
            <Typography variant="body1">
              First Name: {user.firstName}
            </Typography>
            <Typography variant="body1">Last Name: {user.lastName}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">
              Mobile Number: {user.mobileNumber}
            </Typography>
            <Typography variant="body1">Job Title: {user.jobTitle}</Typography>
          </>
        );

      case "reviewLabel":
        return (
          <>
            <Typography variant="h6">Review Label</Typography>
            {user.label.map((item, index) => (
              <Typography key={index} variant="body1">
                {item}
              </Typography>
            ))}
          </>
        );
      case "reviewFormat":
        return (
          <>
            <Typography variant="h6">Review Format</Typography>
            <Typography variant="body1">Name: {user.name}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Message: {user.message}</Typography>
          </>
        );
      case "product":
        return (
          <>
            <Typography variant="h6">Product Details</Typography>
            <Typography variant="body1">
              Product Name: {user.productName}
            </Typography>
            <Typography variant="body1">
              Product Price: {user.productPrice}
            </Typography>
            <Typography variant="body1">
              Product Description: {user.productDescription}
            </Typography>
            <img
              src={user.image}
              alt="Product Image"
              className="w-20 h-20 rounded-lg block"
            />
            <Typography variant="body1">Label: {user.label}</Typography>
          </>
        );
      case "video":
        return (
          <div>
            <Typography variant="h6">Video</Typography>
            <Typography variant="body1">Label: {user.label}</Typography>
            <iframe
              title="Video Player"
              width="150"
              height="150"
              src={`https://www.youtube.com/embed/${user.userName}`}
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        );
      case "custom":
        return (
          <>
            <Typography variant="h6">Custom Content</Typography>
            <Typography variant="body1">
              Website URL: {user.websiteUrl}
            </Typography>
            <Typography variant="body1">Label: {user.label}</Typography>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Container style={styles.container}>
      {Object.entries(userGroups).map(([type, users]) => {
        if (
          type === "template1" ||
          type === "template2" ||
          type === "undefined"
        ) {
          return null;
        }
        return (
          <Container key={type} style={styles.container}>
            <Typography variant="h6" style={styles.header}>
              ProfileID: {type}
            </Typography>
            {users.map((user, index) => (
              <div key={user._id}>
                <Card style={styles.card}>
                  <CardContent>{renderContent(user, index)}</CardContent>
                </Card>
              </div>
            ))}
            <Divider style={styles.divider} />{" "}
          </Container>
        );
      })}
    </Container>
  );
};

export default UserDetail;
