import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProtagSmall from "../../../ProtagSmall";
import Switch from "react-switch";
import LinkButtons2 from "../../../LinkButtons2";
import modalBanner from "../../../modal.png";
import {
  HiChevronDown,
  HiChevronUp,
  HiXCircle,
  HiOutlineUpload,
} from "react-icons/hi";
import ModalContent from "./ModalContent";
import "./productsAndServices.css";
import PrimaryButton from "../../../PrimaryButton";
import PrimaryButton2 from "../../../PrimaryButton2";
import NewModal from "../../../NewModal/NewModal";
import NewModal3 from "../../../NewModal/Newmodal3";
import CardPS from "../../../CardPS";
import ServicesModal from "./ServicesModal";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Storage from "../../../../Login/firebaseconfig";
import InputField from "../../../InputField";
import { serverUrl } from "../../../../../config";
import DeleteModalContent from "./DeleteModalContent";
import { UserContext } from "../../../../Contexts/context";
import { RiLock2Line } from "react-icons/ri";
import ProModal from "../../ProModal";
import { useParams } from "next/navigation";
import Image from "next/image";
import ProductModalContent from "@/components/ProfileTemplates/ProfileComponents/ModalContent/ProductModalContent";
import productImg from "./product.svg";
import serviceImg from "./service.svg";
import { getCookie } from "@/components/utils";
import ServiceModalContent from "@/components/ProfileTemplates/ProfileComponents/ModalContent/ServiceModalContent";

function ProductsAndServices(props) {
  const [dummyState, setDummyState] = useState(true);

  const [openProductModal, setOpenProductModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [openedProduct, setOpenedProduct] = useState({});
  const [openedService, setOpenedService] = useState({});
  const [productImgArr, setProductImgArr] = useState([]);
  const [serviceImgArr, setServiceImgArr] = useState([]);

  // state for switching button in products
  const [changeButton, setChangeButton] = useState("My Store");

  // state for switching button in services
  const [servicesChangeButton, setServicesChangeButton] =
    useState("My offerings");

  // state for toggling label in products
  const [showLabel, setShowLabel] = useState(false);

  // state for toggling label in services
  const [showLabel2, setShowLabel2] = useState(false);

  // state for react-switch component
  const [checked, setChecked] = useState(false);

  const { username, userType } = useContext(UserContext);

  const handleToggle = (index, value) => {
    const newswitchStates = [...props.switchStates];
    newswitchStates[index].productSwitch = value;
    props.setSwitchStates(newswitchStates);
    saveToggleState(index, value); // Save the toggle state to MongoDB
  };

  const saveToggleState = async (index, value) => {
    await axios.put(
      `${serverUrl}/productsandservices/productToggle/${profile.type}/${profile.profile}`,
      {
        productSwitch: value,
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

  // console.log(props.switchStates)

  const handleProductLabel = async (value) => {
    setChangeButton(value);
    await axios.put(
      `${serverUrl}/productsandservices/productLabel/${profile.type}/${profile.profile}`,
      {
        productLabel: value,
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

  const handleToggleService = (index, value) => {
    const newswitchStates = [...props.switchStates];
    newswitchStates[index].serviceSwitch = value;
    props.setSwitchStates(newswitchStates);
    saveToggleStateService(index, value); // Save the toggle state to MongoDB
  };

  const saveToggleStateService = async (index, value) => {
    await axios.put(
      `${serverUrl}/productsandservices/serviceToggle/${profile.type}/${profile.profile}`,
      {
        serviceSwitch: value,
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

  const handleServiceLabel = async (value) => {
    setServicesChangeButton(value);
    await axios.put(
      `${serverUrl}/productsandservices/serviceLabel/${profile.type}/${profile.profile}`,
      {
        serviceLabel: value,
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

  // state for tab change
  const [ptab, setPTab] = useState("Products");

  // state for cards show cards in products . if present, show cards div else show paragraph div
  const [productsCards, setProductsCards] = useState([]);
  // console.log("Product Cards Data" , productsCards )
  // state for cards show cards in service . if present, show cards div else show paragraph div
  const [serviceCards, setServiceCards] = useState([]);

  // state for toggling modal 1
  const [showModal, setShowModal] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showEditModal, setShowEditModal] = useState({ show: false, id: null });
  const [showDeleteModal, setShowDeleteModal] = useState({
    show: false,
    id: null,
  });
  const [showEditModalService, setShowEditModalService] = useState({
    show: false,
    id: null,
  });
  const [showDeleteModalService, setShowDeleteModalService] = useState({
    show: false,
    id: null,
  });
  function toggleModal() {
    setShowModal((prev) => !prev);
  }
  // state for toggling modal 2
  const [showModal2, setShowModal2] = useState(false);
  function toggleModal2() {
    setShowModal2((prev) => !prev);
  }
  //getting products and services
  const profile = {
    profile: useParams().userName,
    type: useParams().templateId,
  };

  const productInfo = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/productsandservices/getproduct/pro/${profile.type}/${profile.profile}`
      );
      // console.log(data);
      setProductsCards(data);
      // console.log(productData);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    productInfo();
  }, [dummyState]);

  const serviceInfo = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/productsandservices/getservice/pro/${profile.type}/${profile.profile}`
      );
      // console.log(data);
      setServiceCards(data);
      // console.log(serviceCards);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    serviceInfo();
  }, [dummyState]);

  const [record, setRecord] = useState([]);
  const [pro, setPro] = useState("");
  const [starter, setStarter] = useState("");
  const [basic, setBasic] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      try {
        const res = await axios.get(
          `${serverUrl}/getUser/getUser/${profile.profile}`,
          config
        );
        setRecord(res.data);
        setPro(res.data[0].pro);
        setStarter(res.data[0].starter);
        setBasic(res.data[0].basic);
      } catch (error) {
        //console.log(error);
      }
    };
    if (username != "") {
      fetchData();
    }
  }, [dummyState]);

  const [productCount, setProCount] = useState(0);
  const [serviceCount, setSerCount] = useState(0);
  useEffect(() => {
    // Fetch data from backend API and set it to the state
    const getCount = async () => {
      const response = await fetch(
        `${serverUrl}/productsandservices/getcount/${profile.type}/${profile.profile}`
      );
      const result = await response.json();
      setProCount(result[0].productCount);
      setSerCount(result[0].serviceCount);
    };
    if (username != "") {
      getCount();
    }
  }, []);

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
          `${serverUrl}/productsandservices/getProductLabel/${profile.type}/${profile.profile}`,
          config
        )
        .then((response) => {
          const productLabel = response.data[0]?.productLabel || "My Store";

          setChangeButton(productLabel);
        });
      axios
        .get(
          `${serverUrl}/productsandservices/getProductArray/${profile.type}/${profile.profile}`,
          config
        )
        .then((response) => {
          const productLabelList = response.data[0]?.productLabelList || [
            "My Store",
            "Products",
            "Resources and assets",
          ];

          setLabels(productLabelList);
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
          `${serverUrl}/productsandservices/updateProductLabels/${profile.type}/${profile.profile}`,
          {
            productLabelList: limitedLabels,
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
            handleProductLabel(newLabel)
          } else {
            console.error("Label update failed");
          }
        });
    } catch (error) {
      //console.log(error);
    }
  };
  const [servicelabels, setServiceLabels] = useState([]);
  const [newServiceLabel, setNewServiceLabel] = useState("");
  useEffect(() => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      axios
        .get(
          `${serverUrl}/productsandservices/getServiceLabel/${profile.type}/${profile.profile}`,
          config
        )
        .then((response) => {
          const serviceLabel = response.data[0]?.serviceLabel || "My offerings";

          setServicesChangeButton(serviceLabel);
        });
      axios
        .get(
          `${serverUrl}/productsandservices/getServiceArray/${profile.type}/${profile.profile}`,
          config
        )
        .then((response) => {
          const serviceLabelList = response.data[0]?.serviceLabelList || [
            "My offerings",
            "Services we provide",
            "Specialities",
          ];

          setServiceLabels(serviceLabelList);
        });
    } catch (error) {
      //console.log(error);
    }
  }, []);

  const handleSaveLabelService = () => {
    const updatedLabels = [...servicelabels, newServiceLabel];

    const limitedLabels =
      updatedLabels.length <= 4
        ? updatedLabels
        : [...updatedLabels.slice(0, 3), newServiceLabel];
    try {
      axios
        .put(
          `${serverUrl}/productsandservices/updateServiceLabels/${profile.type}/${profile.profile}`,
          {
            serviceLabelList: limitedLabels,
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
            setServiceLabels(limitedLabels);

            setNewServiceLabel("");
            handleServiceLabel(newServiceLabel)
          } else {
            console.error("Label update failed");
          }
        });
    } catch (error) {
      //console.log(error);
    }
  };

  const [cropOpen, setCropOpen] = useState(false);
  const [ModalTitle, setModalTitle] = useState("Add Product");
  useEffect(() => {
    cropOpen ? setModalTitle("Add Image") : setModalTitle("Add Product");
  }, [cropOpen]);

  // states and methods for locking functionalities
  const [proModal, setProModal] = useState(false);
  let serviceLength = 0;
  if (pro) {
    serviceLength = serviceCards.length;
  } else if (basic) {
    serviceLength = 1;
  } else {
    serviceLength = 5;
  }

  let productLength = 0;
  if (pro) {
    productLength = productsCards.length;
  } else if (basic) {
    productLength = 4;
  } else {
    productLength = 5;
  }

  const handleEscPress = (event) => {
    if (event.key === "Escape") {
      setShowEditModal(false);
      setShowModal(false);
      setShowModal2(false);
      setShowEditModalService(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscPress);

    return () => {
      window.removeEventListener("keydown", handleEscPress);
    };
  }, []);

  return (
    <div
      className={
        props.showTab === "Add products" || props.showTab === "Add services"
          ? "overflow-y-auto w-full max-w-[90vw] mb-16 md:mb-0"
          : "hidden"
      }
    >
      <ProModal
        profile={profile}
        setShowModal={setProModal}
        showModal={proModal}
      />
      <div className="flex flex-col justify-start items-start gap-3 w-full">
        {/* <p className="text-base sm:text-lg font-semibold min-w-fit">
          Products and Services
        </p> */}

        {/* {userType != "pro" && (
          <button
            onClick={setShowModal3}
            type="button"
            className="pro-tag-large text-white font-medium rounded-full hover:cursor-default"
          >
            Pro
          </button>
        )} */}

        {props.showTab === "Add products" && (
          <div className="flex xsm3:flex-row flex-col xsm3:justify-between gap-[1rem] w-full">
            <div className="flex flex-row justify-start items-center gap-4 w-full">
              <p className="text-lg font-semibold">{changeButton}</p>
              {props.switchStates.map((off, index) => (
                <Switch
                  key={index}
                  checked={off.productSwitch}
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
            <div className="w-full flex xsm3:flex-col flex-row xsm3:justify-center items-end">
              <PrimaryButton
                width={"fit-content"}
                className={"xsm1:!h-[40px] md:!h-[48px] md:!text-[16px]  xsm1:!text-[13px] !h-[40px] !text-[11px]"}
                text="Add Products"
                onClick={toggleModal}
                isDisabled={
                  (basic && productCount + serviceCount >= 4) ||
                  (starter && productCount + serviceCount >= 10) ||
                  (props.switchStates.length != 0 &&
                    !props.switchStates[0].productSwitch)
                }
              />
            </div>
          </div>
        )}

        {props.showTab === "Add services" && (
          <div className="flex flex-row justify-between gap-[1rem] w-full">
            <div className="flex flex-row justify-start items-center gap-4 w-full">
              <div className="text-lg font-semibold">
                {servicesChangeButton}
              </div>
              {props.switchStates.map((off, index) => (
                <Switch
                  key={index}
                  checked={off.serviceSwitch}
                  onChange={(value) => handleToggleService(index, value)}
                  onColor="#12A26E"
                  offColor="#A7A7A7"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={24}
                  width={44}
                />
              ))}
            </div>
            <div className="w-full flex flex-col justify-center items-end">
              <PrimaryButton
                width={"fit-content"}
                className={"xsm1:!h-[40px] md:!h-[48px] md:!text-[16px]  xsm1:!text-[13px] !h-[40px] !text-[11px]"}
                text="Add Services"
                onClick={toggleModal2}
                isDisabled={
                  (basic && productCount + serviceCount >= 4) ||
                  (starter && productCount + serviceCount >= 10) ||
                  (props.switchStates.length != 0 &&
                    !props.switchStates[0].serviceSwitch)
                }
              />
            </div>
          </div>
        )}
      </div>

      {props.showTab === "Add products" && (
        // products
        <>
          <p className="pt-6 text-sm text-cGrey font-medium">
            Select a label for your products
          </p>
          <div className="pt-4 flex gap-3 overflow-x-auto">
            {labels.map((label) => (
              <button
                key={label}
                onClick={() => handleProductLabel(label)}
                className={
                  changeButton === label ? "appnt-btn" : "appnt-btn-unselected"
                }
              >
                {label}
              </button>
            ))}
          </div>
          <div
            className="pt-6 ml-[0.5rem]"
            onClick={() => setShowLabel((prev) => !prev)}
          >
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
                label="Add label for products"
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

          {productsCards.length !== 0 ? (
            <div className="flex pb-5 flex-wrap justify-center sm:justify-start mt-7 gap-7 overflow-scroll md:overflow-visible">
              {productsCards.map((obj, index) => (
                <div
                  key={index}
                  className="relative"
                  onClick={() => {
                    // setOpenProductModal(true);
                    setOpenedProduct({
                      name: obj.productName,
                      description: obj.productDescription,
                      price: obj.productPrice,
                      btn: obj.productButton,
                      btnType: "custom",
                      btnLabel: obj.label,
                      btnStyle: "card-btn rounded-full",
                      customLink: obj.customLink,
                      link: obj.link,
                      id: obj._id,
                    });
                    typeof obj.image == "string"
                      ? setProductImgArr(obj.image.split(" "))
                      : setProductImgArr(obj.image);
                  }}
                >
                  {/* {console.log(obj._id)} */}
                {/* { console.log("Details of  product object",obj)} */}
                  <CardPS
                    usedIn="product"
                    setOpenProductModal={setOpenProductModal}
                    setOpenedProduct={setOpenedProduct}
                    setProductImgArr={setProductImgArr}
                    setShowEditModal={setShowEditModal}
                    setShowDeleteModal={setShowDeleteModal}
                    key={obj._id}
                    id={obj._id}
                    data={obj}
                    title={obj.productName}
                    description={obj.productDescription}
                    price={obj.productPrice}
                    label={obj.label}
                    productButton={obj.productButton}
                    toggleModal={toggleModal}
                    setDummyState={setDummyState}
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center gap-[20px] py-24">
                <Image
                alt="image"
                  src={productImg}
                  className="w-auto h-[150px] sm:h-[200px]"
                />
                <div className="w-full">
                  <p className="text-[16px] sm:text-[18px] font-[500] text-[#817C7C] text-center break">
                    Your store is empty!
                    <br /> Add products and showcase them on your Qviq
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {props.showTab === "Add services" && (
        // services
        <>
          <p className="pt-6 text-sm text-cGrey font-medium">
            Select a label for your services
          </p>
          <div className="pt-4 flex gap-3 overflow-x-auto">
            {servicelabels.map((label) => (
              <button
                key={label}
                onClick={() => handleServiceLabel(label)}
                className={
                  servicesChangeButton === label
                    ? "appnt-btn"
                    : "appnt-btn-unselected"
                }
              >
                {label}
              </button>
            ))}
          </div>
          <div
            className="pt-6 ml-[0.5rem]"
            onClick={() => setShowLabel2((prev) => !prev)}
          >
            <LinkButtons2
              icon={showLabel2 ? <HiChevronUp /> : <HiChevronDown />}
              text="Add New Label"
            />
          </div>

          {showLabel2 && (
            <div className="pt-4 gap-3 flex flex-col sm:flex-row sm:items-end">
              <InputField
                width={"100%"}
                height={40}
                placeholder="Type here.."
                label="Add label for services"
                type="text"
                value={newServiceLabel}
                onChange={(e) => setNewServiceLabel(e.target.value)}
              />

              <div className="sm:ml-[3.125rem]">
                <PrimaryButton2
                  color="black"
                  text="Save"
                  onClick={handleSaveLabelService}
                />
              </div>
            </div>
          )}

          {serviceCards.length !== 0 ? (
            <div className="flex flex-nowrap pb-5 md:flex-wrap mt-7 gap-7 overflow-scroll md:overflow-visible">
              {serviceCards.map((obj, index) => (
                <div key={index} className="relative"
                  onClick={() => {
                    // console.log("Details of services",obj)
                    setOpenedService({
                      name: obj.serviceName,
                      description: obj.serviceDescription,
                      price: obj.productPrice,
                      btn: obj.serviceButton,
                      btnType: "custom",
                      btnLabel: obj.label,
                      btnStyle: "card-btn rounded-full",
                      customLink: obj.customLink,
                      link: obj.link,
                      id: obj._id,
                    });
                    typeof obj.image == "string"
                      ? setServiceImgArr(obj.image.split(" "))
                      : setServiceImgArr(obj.image);
                  }}
                
                >
                 
                  {index >= serviceLength && (
                    <div
                      // onClick={() => setProModal(true)}
                      className="cursor-pointer z-[1] absolute top-0 rounded-lg w-full h-full flex justify-center items-center bg-[#aba5a554] backdrop-blur-[2px]"
                    >
                      <RiLock2Line
                        style={{
                          width: 60,
                          height: 60,
                          // color: "#A9A9A9",
                        }}
                      />
                    </div>
                  )}
                  <CardPS
                    setShowEditModal={setShowEditModalService}
                    setShowDeleteModal={setShowDeleteModalService}
                    openServiceModal = {openServiceModal}
                    setOpenServiceModal={setOpenServiceModal}
                    key={obj._id}
                    id={obj._id}
                    data={obj}
                    title={obj.serviceName}
                    description={obj.serviceDescription}
                    label={obj.label}
                    serviceButton={obj.serviceButton}
                    price={obj.servicePrice}
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center gap-[20px] py-24">
                <Image
                alt="image"
                  src={serviceImg}
                  className="w-auto h-[150px] sm:h-[200px]"
                />

                <div className="w-full">
                  <p className="text-[16px] sm:text-[18px] font-[500] text-[#817C7C] text-center break">
                    You haven't added any services yet!
                    <br /> Add Services and showcase them on your Qviq profile
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Product Details modal */}

      {openProductModal && (
        <NewModal
          onModal={openProductModal}
          onClick={setOpenProductModal}
          text={"Product Details"}
          children={
            <ProductModalContent
              setOpenProductModal={setOpenProductModal}
              setShowEditModal={setShowEditModal}
              setShowDeleteModal={setShowDeleteModal}
              isDashboard={true}
              openedProduct={openedProduct}
              productImgArr={productImgArr}
            />
          }
        />
      )}

      {/* product modals */}

      <NewModal onModal={showModal} onClick={setShowModal} text={ModalTitle}>
        <ModalContent
          onModal={showModal}
          setCropOpen={setCropOpen}
          toggleModal={toggleModal}
          setDummyState={setDummyState}
          updateTemplateDataHandler={props.updateTemplateDataHandler}
          dummyState={dummyState}
          setProCount={setProCount}
          isBasic={basic}
        />
      </NewModal>

      <NewModal
        onModal={showEditModal.show}
        onClick={() =>
          setShowEditModal((prev) => ({ ...prev, show: !prev.show }))
        }
        text="Edit Product"
      >
        <ModalContent
          editModal={showEditModal.show}
          setCropOpen={setCropOpen}
          toggleModal={toggleModal}
          setDummyState={setDummyState}
          dummyState={dummyState}
          productId={showEditModal.id}
          updateTemplateDataHandler={props.updateTemplateDataHandler}
          setShowEditModal={setShowEditModal}
          isBasic={basic}
        />
      </NewModal>

      <DeleteModalContent
        setOpenProductModal={setOpenProductModal}
        setDummyState={setDummyState}
        dummyState={dummyState}
        profile={profile.profile}
        id={showDeleteModal.id}
        setOpen={setShowDeleteModal}
        open={showDeleteModal.show}
        productsCards={productsCards}
        setProductsCards={setProductsCards}
        content="Product"
        setProCount={setProCount}
        setSerCount={setSerCount}
        updateTemplateDataHandler={props.updateTemplateDataHandler}
        type={profile.type}
      />


      {/* Service modal details */}

      {openServiceModal && (
        <NewModal
          onModal={openServiceModal}
          onClick={setOpenServiceModal}
          text={"Service Details"}
          children={
            <ServiceModalContent
              setOpenServiceModal={setOpenServiceModal}
              setShowEditModalService={setShowEditModalService}
              setShowDeleteModal={setShowDeleteModalService}
              isDashboard={true}
              openedService={openedService}
              serviceImgArr={serviceImgArr}
            />
          }
        />
      )}

      {/* service modals */}



      <NewModal
        onModal={showModal2}
        onClick={setShowModal2}
        text={!cropOpen ? "Add Services" : "Add Image"}
      >
        <ServicesModal
          onModal={showModal2}
          setCropOpen={setCropOpen}
          toggleModal2={toggleModal2}
          setDummyState={setDummyState}
          dummyState={dummyState}
          setSerCount={setSerCount}
          updateTemplateDataHandler={props.updateTemplateDataHandler}
        />
      </NewModal>
      <NewModal
        onModal={showEditModalService.show}
        onClick={() =>
          setShowEditModalService((prev) => ({
            ...prev,
            show: !prev.show,
          }))
        }
        text="Edit Service"
      >
        <ServicesModal
          editModal={showEditModalService.show}
          toggleModal2={toggleModal2}
          setDummyState={setDummyState}
          dummyState={dummyState}
          serviceId={showEditModalService.id}
          setShowEditModal={setShowEditModalService}
          updateTemplateDataHandler={props.updateTemplateDataHandler}
        />
      </NewModal>
      <DeleteModalContent
        setOpenServiceModal={setOpenServiceModal}
        setDummyState={setDummyState}
        dummyState={dummyState}
        profile={profile.profile}
        id={showDeleteModalService.id}
        setOpen={setShowDeleteModalService}
        open={showDeleteModalService.show}
        productsCards={serviceCards}
        setProductsCards={setServiceCards}
        content="Service"
        setSerCount={setSerCount}
        setProCount={setProCount}
        updateTemplateDataHandler={props.updateTemplateDataHandler}
        type={profile.type}
      />

      {/* pro modal */}
      <NewModal3
        text="Upgrade to PRO"
        onModal={showModal3}
        onClick={setShowModal3}
      >
        <Image src={modalBanner} alt="modal banner" className="pt-[48px]" />
        <p className="mt-[24px] sm:mt[32px] text-[#817C7C] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
          By becoming a pro member, you can expand your network, unlock and add
          more media links, and analyse your profile visits and audience.
        </p>

        <div className="py-[32px]">
          <div className="flex flex-row justify-start items-center py-[5px]">
            <div
              className="w-[8px] h-[8px] rounded-full"
              style={{
                background: "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
              }}
            ></div>
            <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
              Unlock additional media links and add them to your profile.
            </div>
          </div>
          <div className="flex flex-row justify-start items-center py-[5px]">
            <div
              className="w-[8px] h-[8px] rounded-full"
              style={{
                background: "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
              }}
            ></div>
            <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
              You can include multiple custom links, pdf files, and additional
              images.
            </div>
          </div>
          <div className="flex flex-row justify-start items-center py-[5px]">
            <div
              className="w-[8px] h-[8px] rounded-full"
              style={{
                background: "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
              }}
            ></div>
            <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
              Add appointment slots and receive appointments through your
              profile.
            </div>
          </div>
          <div className="flex flex-row justify-start items-center py-[5px]">
            <div
              className="w-[8px] h-[8px] rounded-full"
              style={{
                background: "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
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
                background: "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
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
                background: "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
              }}
            ></div>
            <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
              Multiple Qviq profiles can be created and managed.
            </div>
          </div>
        </div>
      </NewModal3>
    </div>
  );
}

export default ProductsAndServices;
