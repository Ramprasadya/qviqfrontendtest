// import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Connect from "./Component/Connections/Connect";
import Home from "./Component/SocialLinks/Home";
import Profile from "./Component/SocialLinks/Profile";
import ConnectTable from "./Component/Connections/ConnectTable";
import Review from "./Component/review/review";
import ShowReview from "./Component/review/ShowReview";
import EditReview from "./Component/review/editReview";
// import SideBarNew from "./Component/UiComponents/SideBarNew";
import ProductandServices from "./Component/Product and Services/ProductandServices";
//  --------------User-------------->
// import ProColorQr from "./Component/Page/Pro/ColourQr";
// import ColorQr from "./Component/Page/free/ColorQr";
// --------------Login------------->
// import Succes from "./Component/Page/Login/Succes";
// import Login from "./Component/Page/Login/Login";
// -------------Meeting-------------->
import Appointement from "./Component/UiComponents/BottomComponents/Meeting/Appointement";
// import Busisseshour from "./Component/Page/Meeting/Busisseshour";
// import Month from "./Component/Page/Meeting/Month";
// ---------------Graph-------------->
// import Graph from "./Component/Page/Graph/Graph";
// import Linegraph from "./Component/Page/Graph/Linegraph";
// import Line from "./Component/Page/Graph/Line";
// --------------Id---------------->
import Test from "./Component/Page/Test/Test";

// import Table from "./Component/Page/TableId/Table";
// import DummyDataTable from "./Component/Page/TableId/DummyDataTable";
// import Home2 from "./Component/Page/Home2";
import Signup from "./Component/Login/Signup";
import UsernamePage from "./Component/Login/Username";
import First from "./Component/Login/First";
import LoginPage from "./Component/Login/LoginPage";
import SelectProfile from "./Component/ProfileCategory/SelectProfile";
import ChooseProfile from "./Component/ProfileCategory/ChooseProfile";
import Businesshour from "./Component/UiComponents/BottomComponents/Meeting/Hour";
import Devices from "./Component/Devices/Devices";
import CustomDomain from "./Component/CustomDomain/CustomDomain";
import ProfileManager from "./Component/SocialLinks/ProfileManager";
import ViewProfile1 from "./Component/Profile/ViewProfile1";
import Analytics from "./Component/Analytics/Analytics";
import ChoosePlan from "./Component/ProfileCategory/ChoosePlan";
import Admin from "./Component/Admin/Admin";
import ProPlan from "./Component/ProfileCategory/ProPlan";
import Dashboard from "./Component/Dashboard/dashboard";
import VerifyEmail from "./Component/Login/VerifyEmail";
import HelpCenter from "./Component/Help Center/helpCenter";
import MyAccount from "./Component/AccountSettings/MyAccount";
import ManageSubscription from "./Component/AccountSettings/ManageSubscription";
import ViewProfile from "./Component/Profile/Profile";
import Redirect from "./Redirect";
import QRScanCounter from "./Component/UiComponents/BottomComponents/QRScanCounter";
import HomePage from "./Component/Website/Home/HomePage";
import Product from "./Component/Website/Products/Product";
import ScanQR from "./Component/DeviceQR/deviceQR";
import ProductDetail from "./Component/Website/Products/ProductDetail";
import CustomizeProduct from "./Component/Website/Products/CustomizeProduct";
// import Cart from "./Component/Website/Cart/cart";
// import Address from "./Component/Website/Cart/Address";
// import Payment from "./Component/Website/Cart/Payment";
// import Success from "./Component/Website/Cart/Success";
import About from "./Component/Website/About";
import Learn from "./Component/Website/Learn";
import Contact from "./Component/Website/Contact";
import Pricing from "./Component/Website/Pricing";
import Error from "./Component/Website/Cart/Error";
import UserDetail from "./Component/Login/UserDetail";
import ThanksForSignUp from "./Component/UiComponents/SignupThankyou";
import Error404 from "./Component/UiComponents/Error404";
import OrderDetails from "./Component/Admin/OrderDetails";
import ProductAnalytics from "./Component/Admin/ProductAnalytics";
import AllOrders from "./Component/Admin/AllOrders";
import UserDetails from "./Component/Admin/UserDetails";
import UpdatePricing from "./Component/Admin/UpdatePricing";
import ManageProducts from "./Component/Admin/ManageProducts";
import ProductForm from "./Component/Admin/ProductForm";
import Template6Mobile from "./Component/ProfileTemplates/Template6Mobile/Template6Mobile";
import Template6 from "./Component/ProfileTemplates/Template6/Template6";
import { hostname } from "./config";
import CouponForm from "./Component/Admin/CouponForm";
import CouponList from "./Component/Admin/CouponList";
import ContactUs from "./Component/Admin/ContactUs";
import GenerateQRcode from "./Component/Admin/GenerateQRcode";

// import PaymentStatus from "./Component/Website/Cart/PaymentStatus";
import ErrorLockedProfile from "./Component/Profile/ErrorLockedProfile";
import Toast from "./Component/UiComponents/Toast";
import { useContext } from "react";
import { UserContext } from "./Component/Contexts/context";
import ManageProductsByMaterial from "./Component/Admin/ManageProductsByMaterial";
import BasicUserDetails from "./Component/Admin/BasicUserDetails";

import { Helmet } from "react-helmet";

function App() {
  const isDifferentPage =
    window.navigator.userAgent != "ReactSnap" &&
    window.location.host !== hostname &&
    window.location.hostname.split(".")[0] !== "www";
  //console.log("isDifferentPage", isDifferentPage, window.location.host);

  // data from context
  const { showToastContext, toastMessageContext } = useContext(UserContext);

  return (
    <>
      <Helmet>
        <title>Qviq - Create Share Connect</title>
      </Helmet>
      <div className="flex h-screen w-full first-container">
        <div className="w-full overflow-y-auto" id="hidescroll">
          {/* if there is subdomain then redirect to redirect page otherwise login page  */}
          {isDifferentPage ? (
            <Routes>
              {/* <Route exact path="/" element={<Redirect />} />
              <Route path="*" element={<Error404 />} /> */}
            </Routes>
          ) : (
            <Routes>
              {/* <Route path="/err" element={<Error404 />} /> */}
              {/* <Route path="*" element={<Error404 />} /> */}
              {/* <Route path="/lockedprofile" element={<ErrorLockedProfile />} /> */}
              {/* <Route path="/" element={<First />} /> */}

              {/* if there is subdomain then redirect to redirect page otherwise login page  */}
              {/* <Route path="/" element={isDifferentPage ? <Redirect /> : <HomePage />} /> */}
              {/* <Route exact path="/" element={<HomePage />} /> */}
              {/* <Route path="/signup" element={<Signup />} /> */}
              {/* <Route path="/verifyemail/:id" element={<VerifyEmail />} /> */}
              {/* <Route path="/login" element={<LoginPage />} /> */}
              {/* <Route path="/appointement/:profile" element={<Appointement />} /> */}
              {/* <Route path="/admin" element={<Admin />} /> */}
              {/* <Route path="/user/:id" element={<UserDetail />} /> */}
              {/* <Route
                path="/selectprofile/:profile"
                element={<SelectProfile />}
              /> */}
              {/* <Route
                path="/chooseprofile/:profile"
                element={<ChooseProfile />}
              /> */}
              {/* <Route path="/:type/dashboard/:profile" element={<Home />} /> */}
              {/* <Route path="/contact" element={<Contacts />} /> */}
              {/* <Route path="/connect/:profile" element={<Connect />} />
              <Route path="/myprofile/:profile" element={<Profile />} /> */}
              {/* <Route path="/connectTable/:profile" element={<ConnectTable />} /> */}
              {/* <Route path="/review/:profile" element={<Review />} /> */}
              {/* <Route path="/showreview/:profile" element={<ShowReview />} /> */}
              {/* <Route path="/editReview/:profile" element={<EditReview />} /> */}
              {/* <Route path="/help/:profile" element={<Contact />} /> */}
              {/* <Route path="/:type" element={<ViewProfile />} /> */}
              <Route exact path="/profile" element={<Redirect />} />
              {/* <Route exact path="/about" element={<About />} /> */}
              {/* <Route exact path="/learn" element={<Learn />} /> */}
              {/* <Route exact path="/products" element={<Product />} /> */}
              {/* <Route exact path="/contact" element={<Contact />} /> */}
              {/* <Route exact path="/pricing" element={<Pricing />} /> */}
              {/* <Route path="/qrscan/:id" element={<ScanQR />} /> */}
              {/* <Route exact path="/products/:id" element={<ProductDetail />} /> */}
              {/* <Route exact path="/cart" element={<Cart />} /> */}
              {/* <Route exact path="/address" element={<Address />} />
              <Route exact path="/payment" element={<Payment />} />
              <Route exact path="/success" element={<Success />} /> */}
              {/* <Route exact path="/error" element={<Error />} /> */}
              {/* <Route path="/customize" element={<CustomizeProduct />} /> */}
              {/* <Route path="/signup_success" element={<ThanksForSignUp />} /> */}
              {/* <Route
                path="/productandservices/:type/:profile"
                element={<ProductandServices />}
              /> */}
              {/* <Route path="/username" element={<UsernamePage />} /> */}
              {/* <Route path="/devices/:profile" element={<Devices />} /> */}
              {/* <Route path="/customdomain/:profile" element={<CustomDomain />} /> */}
              {/* <Route path="/myaccount/:profile" element={<MyAccount />} /> */}
              {/* <Route
                path="/managesubscription/:profile"
                element={<ManageSubscription />}
              /> */}
              {/* <Route path="/analytics/:profile" element={<Analytics />} /> */}
              {/* <Route path="/dashboard/:profile" element={<Dashboard />} /> */}
              {/* <Route path="/devices/:profile" element={<Devices />} /> */}
              {/* <Route path="/customdomain/:profile" element={<CustomDomain />} /> */}
              {/* <Route
                path="/:type/viewprofile/:profile"
                element={<ViewProfile1 />}
              /> */}
              <Route
                path="/qrscan/:type/:profile"
                element={<QRScanCounter />}
              />
              {/* <Route path="/plan/:profile" element={<ChoosePlan />} /> */}
              {/* <Route path="/proplan/:profile" element={<ProPlan />} /> */}
              {/* <Route
                path="/dashboard/profilemanager"
                element={<ProfileManager />}
              /> */}
              {/* <Route path="/orderDetails" element={<OrderDetails />} /> */}
              {/* <Route path="/allOrderDetails" element={<AllOrders />} /> */}
              {/* <Route path="/productAnalytics" element={<ProductAnalytics />} /> */}
              {/* <Route path="/userDetails" element={<UserDetails />} /> */}
              {/* <Route path="/basicUserDetails" element={<BasicUserDetails />} /> */}

              {/* no need to login bug here */}
              {/* <Route path="/updatePricing" element={<UpdatePricing />} /> */}
              {/* <Route
                path="/manageProducts/:material"
                element={<ManageProducts />}
              /> */}
              {/* <Route path="/addProduct" element={<ProductForm />} /> */}
              <Route path="/editProduct/:id" element={<ProductForm />} />
              <Route path="/addCoupon" element={<CouponForm />} />
              <Route path="/couponList" element={<CouponList />} />
              {/* <Route path="/adminContacts" element={<ContactUs />} /> */}
              {/* <Route path="/generateqrcode" element={<GenerateQRcode />} /> */}

              {/* no need to login bug here */}
              <Route
                path="/productsbymaterial"
                element={<ManageProductsByMaterial />}
              />

              {/* <Route
                path="/redirect/paymentStatus/:mtId"
                element={<PaymentStatus />}
              /> */}
            </Routes>
          )}
          {/* <Routes>
            <Route path="/sentsms" element={<Test />} />
          </Routes> */}
          {/* redirect 
          <Route exact path="/" render={() => (
            <Redirect to={`/${activeProfileType}`} />
          )} /> */}
        </div>
        {showToastContext && (
          <div
            className="w-[96%] max-w-[500px] flex justify-center items-center fixed bottom-10 left-1/2 -translate-x-1/2"
            style={{ zIndex: "999" }}
          >
            <Toast text={toastMessageContext} backgroundColor={"#121212"} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
