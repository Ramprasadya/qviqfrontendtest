"use client";
import React, { useState, useEffect, useRef } from "react";
import { Chip, Stack } from "@mui/material";
import Navbar from "../header/Navbar";
import PrimaryButton from "../../UiComponents/PrimaryButton";
import { HiOutlineChevronDown, HiX } from "react-icons/hi";
import Footer from "../Footer";
import ProductCard from "../../UiComponents/ProductCard";
import { serverUrl } from "../../../config";
import "../../Connections/connection.css";
import useOutsideClick from "../../Utils/useOutsideClick";
import PrimaryButton2 from "@/components/UiComponents/PrimaryButton2";
import svg1 from "./images/Profile1.svg";
import svg2 from "./images/Group2.svg";
import svg3 from "./images/Group3.svg";
import svg4 from "./images/Group4.svg";
import svg5 from "./images/Back 1.svg";
import svg6 from "./images/Right image.svg";
import svg7 from "./images/R img 2.svg";
import svg8 from "./images/R img 3.svg";
import arrow from "./images/arrow.svg";
import hero from "./images/Hero image.svg";
import hero2 from "./images/Hero image 2.svg";
import Image from "next/image";
import { GoCheckCircleFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import HowToSection from "./HowToSection";
import HybridProductModal from "./HybridProductModal";
import { useRouter } from "next/navigation";
import LeftRightScrollBtn from "@/components/Utils/LeftRightScrollBtn";
import Link from "next/link";

// this is a child component of qviqtap.js
const ProductComponent = (props) => {
  const navigate = useRouter();
  const miniInfoContainer = useRef(null);

  const [clickedOption, setClickedOption] = useState(0);

  return (
    <div className="w-full flex flex-col sm:gap-[40px] gap-[20px] lg:px-[80px] md:px-[40px] px-[20px] relative overflow-hidden">
      <div className="w-full flex flex-row justify-between">
        <p className="text-[#0A0003] sm:text-[40px] text-[24px] sm:font-[800] font-[700]">
          {props.title}
        </p>

        <button
          className="hidden sm:flex items-center justify-center font-[700] text-[18px] rounded-[100px] px-[24px] h-[56px] border-[2px] text-linear-gradient active:scale-[90%] transition-[300ms]"
          style={{
            border: "2px solid #FB6609",
          }}
          onClick={props.buttonClick}
        >
          View all <FaArrowRightLong className="ml-[8px] text-[#FB6609]" />
        </button>
      </div>

      <div className="sm:w-full w-[90vw] flex flex-row sm:gap-[20px] gap-[8px] overflow-scroll">
        {props.optionArr.map((item, index) => (
          <button
            key={index}
            className={`rounded-full sm:h-[48px] h-[40px] sm:text-[16px] text-[14px] text-center sm:font-[600] font-[400] flex flex-col justify-center items-center px-[20px] transition-[300ms] ${
              clickedOption === index
                ? "bg-black text-white"
                : "active:sm:scale-[90%] hover:sm:shadow-md"
            }`}
            style={{
              border: `${
                clickedOption === index ? "none" : "1px solid #A7A7A7"
              }`,
              whiteSpace: "nowrap",
            }}
            onClick={() => {
              setClickedOption(index);
              props.optionFunction(props.btnProp[index]);
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div
        className="w-[90vw] flex flex-row gap-[21px] overflow-scroll"
        ref={miniInfoContainer}
      >
        {props.productArr.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-[12px]"
            onClick={() => {
              if (item.material == "hybrid") {
                props.setSelectedProduct(item);
                props.setShowHybridModal(true);
              } else {
                navigate.push(`/products/${item._id}`);
              }
            }}
          >
            <div className="sm:w-[303px] sm:h-[348px] w-[156px] h-[240px] rounded-[12px] flex flex-col justify-center items-center bg-[#FAFAFA]">
              {props.title != "Premium metal cards" ? (
                <Image
                  alt="product image"
                  src={item?.coverimages[0]}
                  width="300"
                  height="300"
                  className="h-full w-full object-contain sm:p-[40px] p-[20px] hover:scale-[105%] transition-[300ms]"
                />
              ) : (
                <Image
                  alt="product image"
                  src={item?.[`${props.btnProp[clickedOption]}Images`]?.[0]}
                  width="300"
                  height="300"
                  className="h-full w-full object-contain sm:p-[40px] p-[20px] hover:scale-[105%] transition-[300ms]"
                />
              )}
            </div>
            <p className="w-full text-[16px] font-[500]">{item.title}</p>
            <p className="w-full text-[18px] font-[700]">₹ {item.price}</p>
          </div>
        ))}
      </div>

      <button
        className="sm:hidden flex items-center justify-center font-[600] text-[16px] rounded-[100px] px-[24px] h-[48px] border-[2px] text-linear-gradient active:scale-[90%] transition-[300ms]"
        style={{
          border: "2px solid #FB6609",
        }}
        onClick={props.buttonClick}
      >
        View all <FaArrowRightLong className="ml-[8px] text-[#FB6609]" />
      </button>

      <LeftRightScrollBtn
        refrence={miniInfoContainer}
        scrollLength={250}
        classStyle="absolute sm:w-[64px] w-[40px] sm:h-[64px] h-[40px] flex justify-center items-center p-1 rounded-full bg-white text-[22px] shadow-[0_2px_8px_0_rgba(171,181,217,0.14)]"
        leftPosition={{
          left: "4px",
          top: "58%",
          transform: "translateY(-50%)",
        }}
        rightPosition={{
          right: "4px",
          top: "58%",
          transform: "translateY(-50%)",
        }}
        style={{ border: "none", boxShadow: "0 10px 10px #0000001F" }}
      />
    </div>
  );
};

const QviqTap = ({ defaultProducts }) => {
  const navigate = useRouter();
  const [data, setData] = useState(defaultProducts);
  const [sortOption, setSortOption] = useState("default");
  const [dummyState, setDummyState] = useState(true);
  const [showHybridModal, setShowHybridModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedMaterials, setSelectedMaterials] = useState("hybrid");
  const [selectedMetal, setSelectedMetal] = useState("black");

  useEffect(() => {
    getProducts();
  }, [sortOption, dummyState]);

  const getProducts = async () => {
    const response = await fetch(
      `${serverUrl}/product/getProducts/${sortOption}`
    );
    const allProducts = await response.json();
    // console.log(allProducts);
    setData(allProducts);
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterials(material);
  };
  const handleMetalChange = (color) => {
    setSelectedMetal(color);
  };
  const filteredMaterialProducts = data.filter((product) => {
    if (selectedMaterials == "") {
      return product.isCustomizable;
    } else {
      return selectedMaterials == product.material;
    }
  });
  const filteredMetalProducts = data.filter((product) => {
    return product.material == "metal" && product[`${selectedMetal}Images`];
  });

  const [filteredByAlign, setFilteredByAlign] = useState([]);

  useEffect(() => {
    setFilteredByAlign(
      data.filter((product) => product.horizontal && !product.isCustomizable)
    );
  }, []);

  const handleOrientationFilter = (orientation) => {
    setFilteredByAlign(
      data.filter((product) => product[orientation] && !product.isCustomizable)
    );
  };

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="Plus-Jakarta-Sans-font-div bg-white overflow-x-hidden">
      <Navbar showCart={true} background="#FFFF" thisPage="qviqtap" />
      <div className="md:pt-[96px] pt-0 w-full flex flex-col sm:gap-[112px] gap-[64px]">
        {/* section 1 */}
        <div className="flex flex-col md:items-start items-center sm:gap-[52px] gap-[32px] w-full max-h-[800px] lg:mt-[140px] md:mt-[80px] sm:mt-[40px] mt-[20px] lg:mb-[90px] mb-[20px] relative">
          <div className="flex flex-col md:items-start items-center sm:gap-[28px] gap-[16px] xl:max-w-[599px] lg:max-w-[540px] md:max-w-[480px] max-w-full z-[1] lg:mx-[80px] md:mx-[40px] mx-[20px]">
            <p
              className={`lg:text-[48px] md:text-[40px] sm:text-[34px] xsm:text-[24px] text-[18px] font-[800] w-full md:text-left text-center`}
            >
              Unlock connections instantly with{" "}
              <span
                className={`text-linear-gradient lg:text-[48px] md:text-[40px] sm:text-[34px] xsm:text-[24px] text-[18px] font-[800] w-full md:text-left text-center`}
              >
                &nbsp;QviqTap
              </span>{" "}
              smart cards
            </p>

            <p className="text-[#0A0003B8] sm:text-[18px] text-[14px] font-[400] md:text-left text-center w-full">
              Revolutionize networking with our QviqTap Cards!{" "}
              {windowWidth > 568 && <br />}
              Simply tap to share your Qviq-site on both iOS and Android
              devices.
            </p>
          </div>

          <div className="lg:pl-[80px] md:pl-[40px] pl-[20px] relative">
            <Link href={"/products"}>
              <PrimaryButton2
                width="fit-content"
                text="Explore QviqTap cards"
                onClick={() => navigate.push("/products")}
              />
            </Link>

            <Image
              src={arrow}
              alt="arrow"
              className="absolute md:flex hidden top-[15%] left-[120%]"
              style={{ transform: "translate(-50%, -50%)" }}
            />
          </div>

          <Image
            src={hero2}
            alt="card"
            className="md:flex hidden absolute z-[0] 2xl:h-[185%] xl:h-[170%] md4:h-[140%] h-[120%] w-auto top-[56%] left-[80%]"
            style={{ transform: "translate(-50%, -50%)" }}
          />

          <div className="w-[300%] xsm:h-[200px] h-[145px] flex md:hidden flex-col justify-center items-center relative">
            <Image
              src={hero}
              alt="card"
              className="absolute md:w-[45%] sm:w-[30%] xsm2:w-[30%] xsm:w-[45%] w-[45%] md:top-[42%] sm:top-[68%] xsm2:top-[62%] xsm:top-[62%] top-[62%] left-[50%]"
              style={{ transform: "translate(-50%, -50%)" }}
            />
          </div>
        </div>

        {/* section 2 */}
        <div className="w-full flex flex-col gap-[20px]  lg:px-[80px] md:px-[40px] px-[20px]">
          <div className="w-full flex sm:flex-row flex-col gap-[20px]">
            <div className="sm:w-[50%] w-full sm:h-[375px] h-[331px] sm:rounded-[36px] rounded-[20px] bg-[#f6f6f6] flex flex-col sm:items-start items-center gap-[12px] sm:p-[48px] p-[20px] overflow-hidden relative">
              <p className="max-w-[336px] xl:w-full lg:w-[70%] md:w-[60%] w-full sm:text-[24px] text-[16px] font-[700]">
                Instant Qviq-site access
              </p>
              <p className="max-w-[336px] xl:w-full lg:w-[50%] md:w-[60%] w-full sm:text-[14px] text-[12px] font-[500]">
                Tap the card to seamlessly open your qviq-site on any
                NFC-enabled Android or iOS device, making networking effortless.
              </p>

              <Image
                alt="image"
                src={svg1}
                className="lg:w-[283px] md3:w-[230px] xsm:w-[190px] w-[170px] h-auto absolute xsm:bottom-[-15%] bottom-[-20%] sm:right-0"
              />
            </div>

            <div className="sm:w-[50%] w-full sm:h-[375px] h-[331px] sm:rounded-[36px] rounded-[20px] bg-[#f6f6f6] flex flex-col sm:items-start items-center gap-[12px] sm:p-[48px] p-[20px] overflow-hidden relative">
              <p className="max-w-[336px] w-full sm:text-[24px] text-[16px] font-[700]">
                Customizable design{" "}
              </p>
              <p className="max-w-[336px] w-full sm:text-[14px] text-[12px] font-[500]">
                Personalize your card with your name, designation, and logo,
                creating a professional and unique representation of yourself or
                your business.
              </p>
              <Image
                alt="image"
                src={svg2}
                className="sm:w-[390px] xsm:w-[322px] min-w-[280px] h-auto absolute bottom-[-55%] sm:right-[-5%]"
              />
            </div>
          </div>

          <div className="w-full flex sm:flex-row flex-col gap-[20px]">
            <div className="sm:w-1/3 w-full sm:h-[375px] h-[248px] sm:py-[30px] lg:py-[40px] sm:px-[30px] lg:px-[60px] p-[20px] sm:rounded-[36px] rounded-[20px] bg-[#f6f6f6] flex flex-col justify-start items-center overflow-hidden relative">
              <p className="w-full sm:text-[20px] text-[16px] font-[700] text-center">
                Multiple material options
              </p>
              <Image
                alt="image"
                src={svg3}
                className="sm:min-w-[405px] xsm:max-w-[340px] max-w-[300px] h-auto absolute sm:bottom-[-15%] bottom-[-30%]"
              />
            </div>

            <div className="sm:w-1/3 w-full sm:h-[375px] h-[248px] sm:py-[30px] lg:py-[40px] sm:px-[30px] lg:px-[60px] p-[20px] sm:rounded-[36px] rounded-[20px] bg-[#f6f6f6] flex flex-col justify-start items-center overflow-hidden relative">
              <p className="w-full sm:text-[20px] text-[16px] font-[700] text-center">
                Compatible with all android & IOS devices
              </p>
              <Image
                alt="image"
                src={svg4}
                className="sm:w-[283px] w-[200px] h-auto absolute sm:bottom-[-23%] bottom-[-28%]"
              />
            </div>

            <div className="sm:w-1/3 w-full sm:h-[375px] h-[248px] sm:py-[30px] lg:py-[40px] sm:px-[30px] lg:px-[60px] p-[20px] sm:rounded-[36px] rounded-[20px] bg-[#f6f6f6] flex flex-col justify-start items-center overflow-hidden relative">
              <p className="w-full sm:text-[20px] text-[16px] font-[700] text-center">
                Get your own QR code & share quickly
              </p>
              <Image
                alt="image"
                src={svg5}
                className="w-[365px] h-auto absolute sm:bottom-[-12%] xsm:bottom-[-24%] bottom-[-15%]"
              />
            </div>
          </div>
        </div>

        <ProductComponent
          title="Best sellers"
          buttonClick={() => navigate.push("/products")}
          optionArr={[
            "Fully Customizable cards",
            "Customisable cards",
            "PVC cards",
            // "Metal cards",
          ]}
          setShowHybridModal={setShowHybridModal}
          setSelectedProduct={setSelectedProduct}
          btnProp={["hybrid", "", "pvc", "metal"]}
          optionFunction={handleMaterialChange}
          productArr={filteredMaterialProducts}
        />

        {/* section 3 */}
        <HowToSection />

        {/* <ProductComponent
          title="Premium metal cards"
          buttonClick={() => navigate.push("/products")}
          optionArr={["Black", "Gold", "Silver"]}
          btnProp={["black", "gold", "silver"]}
          optionFunction={handleMetalChange}
          productArr={filteredMetalProducts}
        /> */}

        <ProductComponent
          title="Our standard cards"
          buttonClick={() => navigate.push("/products")}
          optionArr={["Horizontal orientation", "Vertical orientation"]}
          btnProp={["horizontal", "vertical"]}
          optionFunction={handleOrientationFilter}
          productArr={filteredByAlign}
        />

        {/* section 4 */}
        <div className="bg-[#0A0003] md:py-[72px] py-[40px] lg:px-[80px] md:px-[40px] px-[20px] flex flex-col gap-[56px] items-center">
          <p className="sm:text-[40px] text-[24px] font-[700] text-[#fafafa] text-center">
            Share your Qviq-site instantly
          </p>

          <div className="flex md3:flex-row flex-col-reverse md3:items-start items-center sm:gap-[0px] gap-[40px] w-full relative">
            <div className="rounded-[20px] md3:w-[50%] w-full lg:px-[56px] sm:px-[40px] px-[16px] lg:py-[56px] sm:py-[40px] py-[32px] lg:pb-[93px] bg-[#FFFFFF1A] flex flex-col sm:gap-[40px] gap-[32px] z-[1]">
              <div className="w-full flex flex-row gap-[12px]">
                <div
                  className="sm:min-w-[32px] sm:min-h-[32px] sm:w-[32px] sm:h-[32px] min-w-[24px] min-h-[24px] w-[24px] h-[24px] flex flex-col justify-center items-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(-90deg, #fb6609 0%, #e40849 100%)",
                  }}
                >
                  <IoCheckmark className="text-white sm:text-[22px] text-[16px]" />
                </div>
                <p className="text-white sm:text-[16px] text-[14px] font-[400]">
                  The other person needs to have NFC enabled from the
                  notification bar/settings
                </p>
              </div>

              <div className="w-full flex flex-row gap-[12px]">
                <div
                  className="sm:min-w-[32px] sm:min-h-[32px] sm:w-[32px] sm:h-[32px] min-w-[24px] min-h-[24px] w-[24px] h-[24px] flex flex-col justify-center items-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(-90deg, #fb6609 0%, #e40849 100%)",
                  }}
                >
                  <IoCheckmark className="text-white sm:text-[22px] text-[16px]" />
                </div>

                <div className="w-full flex flex-col gap-[32px]">
                  <div className="w-full flex flex-col">
                    <p className="sm:text-[16px] text-[14px] font-[700] text-[#FB6609]">
                      For Android
                    </p>
                    <p className="text-white sm:text-[16px] text-[14px] font-[400]">
                      Tap your Qviq card on the middle back or upper back side
                      of any Android smartphone
                    </p>
                  </div>
                  <div className="w-full flex flex-col">
                    <p className="sm:text-[16px] text-[14px] font-[700] text-[#FB6609]">
                      For iphone
                    </p>
                    <p className="text-white sm:text-[16px] text-[14px] font-[400]">
                      Tap your Qviq card on the upper front or back side of an
                      iPhone. (iPhone models XR & later have NFC enabled by
                      default, while for iPhone 8 and X, you must enable NFC in
                      settings.)
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-row gap-[12px]">
                <div
                  className="sm:min-w-[32px] sm:min-h-[32px] sm:w-[32px] sm:h-[32px] min-w-[24px] min-h-[24px] w-[24px] h-[24px] flex flex-col justify-center items-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(-90deg, #fb6609 0%, #e40849 100%)",
                  }}
                >
                  <IoCheckmark className="text-white sm:text-[22px] text-[16px]" />
                </div>

                <p className="text-white sm:text-[16px] text-[14px] font-[400]">
                  Your Qviqsite will appear in another user's browser
                </p>
              </div>

              <div className="w-full flex flex-row gap-[12px]">
                <div
                  className="sm:min-w-[32px] sm:min-h-[32px] sm:w-[32px] sm:h-[32px] min-w-[24px] min-h-[24px] w-[24px] h-[24px] flex flex-col justify-center items-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(-90deg, #fb6609 0%, #e40849 100%)",
                  }}
                >
                  <IoCheckmark className="text-white sm:text-[22px] text-[16px]" />
                </div>

                <p className="text-white sm:text-[16px] text-[14px] font-[400]">
                  Prompt them to tap the 'Contact' button to save and share
                  contact information.
                </p>
              </div>
            </div>

            <div className="z-[0] md3:w-[50%] w-[80%] flex flex-col justify-center items-center md3:pl-[80px] pl-0">
              <Image
                alt="image"
                src={svg6}
                className="w-full max-w-[566px] z-[1]"
              />
              <div
                className="w-[120px] h-[260px] rotate-[-113deg] rounded-full absolute z-[0] blur-[100px]"
                style={{
                  background:
                    "linear-gradient(-90deg, #fb6609 0%, #e40849 100%)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {showHybridModal && selectedProduct && (
        <>
          <div className="fixed overflow-hidden top-0 left-0 bg-black opacity-30 h-screen w-screen z-[1000]"></div>
          <div
            className="fixed bg-white p-6 w-full h-[85vh] md:w-[710px] md:h-[650px] max-h-full rounded-b-none rounded-t-3xl  md:rounded-3xl border border-gray-200 md:top-1/2 md:left-1/2 bottom-0  md:-translate-x-1/2 md:-translate-y-1/2 z-[9999] overflow-hidden"
            style={{ boxShadow: "4px 10px 20px #0000003d" }}
          >
            <HybridProductModal
              setShowHybridModal={setShowHybridModal}
              productId={selectedProduct._id}
            />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default QviqTap;
