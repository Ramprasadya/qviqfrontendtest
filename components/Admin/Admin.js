"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
import { QRCode } from "react-qrcode-logo";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { clientUrl, serverUrl } from "../../config";
import {
  HiOutlineQrcode,
  HiCurrencyRupee,
  HiOutlineTruck,
  HiOutlineUsers,
  HiOutlineShoppingCart,
  HiOutlineDocumentAdd,
  HiDocumentText,
  HiOutlineTrendingUp,
  HiUser,
} from "react-icons/hi";
import Link from "next/link";
import { UserContext } from "../Contexts/context";
import { SafeLocalStorage, getCookie, setCookie } from "../utils";

const Admin = () => {
  const { adminSignOut } = useContext(UserContext);

  const [qrValue, setQRValue] = useState("");
  const qrCodeRef = useRef(null);

  const generateQRCode = () => {
    const uniqueId = Math.floor(Math.random() * 1000000); // Generate a random unique ID
    const qrValue = `${clientUrl}/qrscan/${uniqueId}`;
    setQRValue(qrValue);
  };

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    const qrCodeUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qrCode.png";
    link.click();
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setLoggedIn(getCookie("jwt_token_admin") ? true : false);
  }, []);

  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${serverUrl}/tapopuser/adminlogin`, {
        username,
        password,
      });

      if (response.data.success) {
        setCookie("jwt_token_admin", response.data.token, 3);
        setLoggedIn(true);
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Server error");
    }
  };

  const handleLogout = () => {
    adminSignOut();
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  // call modal api to get data and update data on button click
  const [showModal, setShowModal] = useState(false);
  const getModal = async () => {
    try {
      const response = await axios.get(`${serverUrl}/admin/offer/offerModal`);
      console.log(response);
      console.log(showModal);
      console.log(showModal == true ? "Active" : "Inactive");
      if (response) {
        setShowModal(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateModal = async () => { 
    setShowModal(!showModal);
    try {
      console.log(showModal);
      console.log(showModal == true ? "Active" : "Inactive");

      const response = await axios.post(`${serverUrl}/admin/offer/offerModal`, {
        modal: showModal,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getModal();
  }, []);

  const [activeTab, setActiveTab] = useState("orders");
  useEffect(() => {
    if (SafeLocalStorage.getItem("adminActiveTab") != null) {
      setActiveTab(SafeLocalStorage.getItem("adminActiveTab"));
    }
  }, []);

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
    SafeLocalStorage.setItem("adminActiveTab", tab);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  if (loggedIn) {
    return (
      <div>
        <Container maxWidth="md">
          <Typography variant="h3" align="center" mt={4}>
            Admin Page
          </Typography>
          <div className="flex justify-around pt-8">
            <div
              onClick={() => handleActiveTab("orders")}
              className="border-2 rounded-md p-2 cursor-pointer"
            >
              Orders
            </div>
            <div
              onClick={() => handleActiveTab("productsandplan")}
              className="border-2 rounded-md p-2 cursor-pointer"
            >
              Products and Plans
            </div>
            <div
              onClick={() => handleActiveTab("userDetails")}
              className="border-2 rounded-md p-2 cursor-pointer"
            >
              Users Details
            </div>
            <div
              onClick={() => handleActiveTab("viewcontacts")}
              className="border-2 rounded-md p-2 cursor-pointer"
            >
              View contacts
            </div>
            <div
              onClick={() => handleActiveTab("createnewaccount")}
              className="border-2 rounded-md p-2 cursor-pointer"
            >
              Create New Account
            </div>
          </div>
          <Grid container justifyContent="center" mt={4} spacing={2}>
            {activeTab === "orders" && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiOutlineTruck />
                      <Typography variant="h5">All Order Details</Typography>
                      <Typography variant="body2">
                        View all orders placed by users.
                      </Typography>
                      <Button
                        component={Link}
                        href="/allOrderDetails"
                        variant="contained"
                        color="primary"
                      >
                        Go to Orders
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiOutlineTruck />
                      <Typography variant="h5">
                        Order Details for Vendors
                      </Typography>
                      <Typography variant="body2">
                        View all orders placed by users.
                      </Typography>
                      <Button
                        component={Link}
                        href="/orderDetails"
                        variant="contained"
                        color="primary"
                      >
                        Go to Orders
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}
            {activeTab === "productsandplan" && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiOutlineShoppingCart />
                      <Typography variant="h5">Manage Products</Typography>
                      <Typography variant="body2">
                        Add, Edit ,Delete Products.
                      </Typography>
                      <Button
                        component={Link}
                        href="/productsbymaterial"
                        variant="contained"
                        color="primary"
                      >
                        Manage Products
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiOutlineTrendingUp />
                      <Typography variant="h5">Product Analytics</Typography>
                      <Typography variant="body2">
                        View product analytics.
                      </Typography>
                      <Button
                        component={Link}
                        href="/productAnalytics"
                        variant="contained"
                        color="primary"
                      >
                        Go to Analytics
                      </Button>
                    </CardContent>
                  </Card>
                </Grid> */}
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiOutlineDocumentAdd />
                      <Typography variant="h5">Add Coupon</Typography>
                      <Typography variant="body2">
                        Add a new Coupon .
                      </Typography>
                      <Button
                        component={Link}
                        href="/addCoupon"
                        variant="contained"
                        color="primary"
                      >
                        Add Coupon
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiDocumentText />
                      <Typography variant="h5">View Coupons</Typography>

                      <Button
                        component={Link}
                        href="/couponList"
                        variant="contained"
                        color="primary"
                      >
                        View Coupons
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiOutlineDocumentAdd />
                      <Typography variant="h5">Add Combo Offers</Typography>
                      <Typography variant="body2">
                        Add a new Combo Offer
                      </Typography>
                      <Button
                        component={Link}
                        href="/addOffer"
                        variant="contained"
                        color="primary"
                      >
                        Add Offer
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiDocumentText />
                      <Typography variant="h5">View Offers</Typography>

                      <Button
                        component={Link}
                        href="/offerList"
                        variant="contained"
                        color="primary"
                      >
                        View Offers
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiDocumentText />
                      <Typography variant="h5">Offer Modal</Typography>

                      <Button
                        // component={Link}
                        // href="/offerList"
                        onClick={updateModal}
                        variant="contained"
                        color={showModal == true ? "success" : "error"}
                      >
                        {showModal == true ? "Active" : "Inactive"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiCurrencyRupee />
                      <Typography variant="h5">Plan Pricing</Typography>
                      <Typography variant="body2">
                        Update Plan Pricing .
                      </Typography>
                      <Button
                        component={Link}
                        href="/updatePricing"
                        variant="contained"
                        color="primary"
                      >
                        Pricing
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiCurrencyRupee />
                      <Typography variant="h5">Add Affiliate Link</Typography>
                      <Button
                        component={Link}
                        href="/addAffiliateLink"
                        variant="contained"
                        color="primary"
                      >
                        Add
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiCurrencyRupee />
                      <Typography variant="h5">Show Affiliate Link</Typography>
                      <Button
                        component={Link}
                        href="/showAffiliatesDetails"
                        variant="contained"
                        color="primary"
                      >
                        Show Affiliates
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}

            {activeTab === "userDetails" && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiOutlineUsers />
                      <Typography variant="h5">All Users</Typography>
                      <Typography variant="body2">
                        Manage and view user accounts.
                      </Typography>
                      <Button
                        component={Link}
                        href="/userDetails"
                        variant="contained"
                        color="primary"
                      >
                        Go to Users
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiOutlineQrcode />
                      <Typography variant="h5">Generate QR</Typography>
                      <Typography variant="body2">
                        Generate a new QR .
                      </Typography>
                      <Button
                        //
                        component={Link}
                        href="/generateqrcode"
                        variant="contained"
                        color="primary"
                      >
                        Generate QR
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiOutlineQrcode />
                      <Typography variant="h5">Show User Analytics</Typography>
                      <Typography variant="body2">
                        Show User Analytics
                      </Typography>
                      <Button
                        component={Link}
                        href="/userAnalytics"
                        variant="contained"
                        color="primary"
                      >
                        User Analytics
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiOutlineQrcode />
                      <Typography variant="h5">Errors Reporting</Typography>
                      <Button
                        component={Link}
                        href="/errorReporting"
                        variant="contained"
                        color="primary"
                      >
                        View
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}
            {activeTab === "viewcontacts" && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiDocumentText />
                      <Typography variant="h5">View contacts</Typography>

                      <Button
                        component={Link}
                        href="/adminContacts"
                        variant="contained"
                        color="primary"
                      >
                        View contacts
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiUser />
                      <Typography variant="h5">Basic Details</Typography>

                      <Button
                        component={Link}
                        href="/basicUserDetails"
                        variant="contained"
                        color="primary"
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}
            {activeTab === "createnewaccount" && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiDocumentText />
                      <Typography variant="h5">Create New Account</Typography>

                      <Button
                        component={Link}
                        href="/createNewAccount"
                        variant="contained"
                        color="primary"
                      >
                        Create New Account
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <HiUser />
                      <Typography variant="h5">Basic Details</Typography>

                      <Button
                        component={Link}
                        href="/basicUserDetails"
                        variant="contained"
                        color="primary"
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid> */}
              </>
            )}
          </Grid>
        </Container>

        <div>
          {qrValue && (
            <div ref={qrCodeRef}>
              <QRCode
                value={qrValue}
                size={200} // Set the desired size of the QR code
                logoWidth={50} // Set the desired width of the logo (optional)
                // logoImage={logoImage} // Provide your logo image (optional)
              />
              <button onClick={downloadQRCode}>Download QR code</button>
              <h1>{qrValue}</h1>
            </div>
          )}
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4} textAlign="center">
        <Typography variant="h2">Login</Typography>
        <form onSubmit={handleLogin}>
          <Box mt={4}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mt={4}>
            <Button
              className="bg-[#1976d2]"
              variant="contained"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </Box>
          {errorMessage && (
            <Typography variant="body1" color="error" mt={2}>
              {errorMessage}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default Admin;
