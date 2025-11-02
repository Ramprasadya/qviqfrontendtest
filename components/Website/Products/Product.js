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
import Image from "next/image";
import { GoCheckCircleFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import HowToSection from "./HowToSection";
import { useRouter } from "next/navigation";
import LeftRightScrollBtn from "@/components/Utils/LeftRightScrollBtn";
import HybridProductModal from "./HybridProductModal";

const Product = ({ defaultProducts }) => {
  const navigate = useRouter();
  const [data, setData] = useState(defaultProducts);
  const [sortOption, setSortOption] = useState("newest");
  const [dummyState, setDummyState] = useState(true);

  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [showHybridModal, setShowHybridModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProducts();
  }, [sortOption, dummyState]);

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);
  const sortByRef = useRef(null);
  useOutsideClick(dropdownRef, () => setOpenDropdown(false));
  useOutsideClick(priceDropdownRef, () => setOpenPriceDropdown(false));
  useOutsideClick(sortByRef, () => setOpenSortBy(false));

  const getProducts = async () => {
    const response = await fetch(
      `${serverUrl}/product/getProducts/${sortOption}`
    );
    const allProducts = await response.json();
    // console.log(allProducts);
    setData(allProducts);
  };

  const handleMaterialChange = (material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(
        selectedMaterials.filter((item) => item !== material)
      );
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const handleDelete = (materialToDelete) => {
    setSelectedMaterials((prevMaterials) =>
      prevMaterials.filter((material) => material !== materialToDelete)
    );
  };
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [openPriceDropdown, setOpenPriceDropdown] = useState(false);
  const priceRanges = [
    { label: "0-399", min: 0, max: 399 },
    { label: "400-999", min: 400, max: 999 },
    { label: "1000-2999", min: 1000, max: 2999 },
  ];

  const handlePriceRangeChange = (range) => {
    if (selectedPriceRanges.includes(range)) {
      setSelectedPriceRanges(
        selectedPriceRanges.filter((item) => item !== range)
      );
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    }
  };

  const filteredProducts = data.filter((product) => {
    if (selectedMaterials.length === 0 && selectedPriceRanges.length === 0) {
      return true;
    }

    const isMaterialMatch =
      selectedMaterials.length === 0 ||
      selectedMaterials.includes(product.material);

    const isPriceRangeMatch =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((range) => {
        const { min, max } = priceRanges.find((pr) => pr.label === range);
        return product.price >= min && product.price <= max;
      });

    return isMaterialMatch && isPriceRangeMatch;
  });
  const handlePriceRangeDelete = (priceRangeToDelete) => {
    setSelectedPriceRanges((prevPriceRanges) =>
      prevPriceRanges.filter((range) => range !== priceRangeToDelete)
    );
  };

  const [openSortBy, setOpenSortBy] = useState(false);
  const onClickSortBy = () => {
    setOpenSortBy(!openSortBy);
    setOpenDropdown(false);
    setOpenPriceDropdown(false);
  };

  const onClickMaterial = () => {
    setOpenDropdown(!openDropdown);
    setOpenSortBy(false);
    setOpenPriceDropdown(false);
  };

  const onClickPrice = () => {
    setOpenPriceDropdown(!openPriceDropdown);
    setOpenDropdown(false);
    setOpenSortBy(false);
  };

  const setSortFunction = (value) => {
    setSortOption(value);
  };

  return (
    <div className="Plus-Jakarta-Sans-font-div bg-white">
      <Navbar showCart background="#FFFF" thisPage="qviqtap" />

      <div className="flex Plus-Jakarta-Sans-font-div flex-col relative overflow-hidden items-start gap-[24px] bg-[#0A0003] md:pt-[158px] py-[24px] sm:py-[62px] px-[20px] z-10 ">
        <div
          className=" absolute  h-[268.203px] w-[218.68px] right-0 top-[15rem] xsm:top-[7rem] xsm2:right-0 xsm2:top-[5rem] rounded-[268.203px] blur-[35px] sm:right-0 sm:top-[8rem] md:right-[-1rem] md:top-[11rem] md2:w-[786px] md2:left-[65%] md2:top-[5rem]  md2:h-[964px] md2:blur-[120px] shrink-0 bg-[linear-gradient(210deg,rgba(228,8,73,0.80)39.19%,rgba(251,102,9,0.80)78.88%)] md:rounded-[964px]  "
          style={{ transform: "rotate(105deg)" }}
        ></div>
        <p className="font-[800] relative lg:left-20  text-[40px] text-[#ffff] md:leading-[32px] sm:text-[40px] sm:leading-[56px] ">
          Qviq Smart NFC cards
        </p>
        <p className="font-[500] lg:left-20 relative   text-[20px] leading-[32px] sm:text-[20px] sm:leading-[32px] text-[#F3F3F3]">
          Share your Qviqsite instantly with anyone, anywhere using <br />{" "}
          customised Qviq NFC cards
        </p>
      </div>

      <div className="flex flex-col py-[40px] px-[20px] md:p-10 xl:p-[80px] w-full divide-y-2 gap-6 bg-white">
        <div className="flex items-center gap-[12px] md:gap-[20px] w-full">
          <div className="flex gap-[4px] md:gap-[20px] w-full relative">
            {/* start here */}
            <div
              className="dropDown hover:cursor-pointer"
              ref={sortByRef}
              onClick={() => onClickSortBy()}
            >
              <div className="review_label">Sort By</div>
              <span>
                <HiOutlineChevronDown />
              </span>

              {openSortBy && (
                <>
                  <div className="dropDown_popup hidden sm:block">
                    <label
                      className="dropDown_label cursor-pointer flex gap-[20px]"
                      onClick={() => setSortFunction("None")}
                    >
                      <input
                        type="checkbox"
                        value="None"
                        checked={sortOption === "default"}
                      />
                      None
                    </label>
                    <br />
                    <label
                      className="dropDown_label cursor-pointer flex gap-[20px]"
                      onClick={() => setSortFunction("lowtohigh")}
                    >
                      <input
                        type="checkbox"
                        value="lowtohigh"
                        checked={sortOption === "lowtohigh"}
                      />
                      Price: Low To High
                    </label>
                    <br />
                    <label
                      className="dropDown_label cursor-pointer flex gap-[20px]"
                      onClick={() => setSortFunction("hightolow")}
                    >
                      <input
                        type="checkbox"
                        value="hightolow"
                        checked={sortOption === "hightolow"}
                      />
                      Price: High To Low
                    </label>
                    <br />
                    <label
                      className="dropDown_label cursor-pointer flex gap-[20px]"
                      onClick={() => setSortFunction("newest")}
                    >
                      <input
                        type="checkbox"
                        value="newest"
                        checked={sortOption === "newest"}
                        onChange={() => setSortFunction("newest")}
                      />
                      Newest
                    </label>
                    <br />
                    <label
                      className="dropDown_label cursor-pointer flex gap-[20px]"
                      onClick={() => setSortFunction("customerrating")}
                    >
                      <input
                        type="checkbox"
                        value="customerrating"
                        checked={sortOption === "customerrating"}
                      />
                      Customer Rating
                    </label>
                    <br />
                    <label
                      className="dropDown_label cursor-pointer flex gap-[20px]"
                      onClick={() => setSortFunction("mostpopuler")}
                    >
                      <input
                        type="checkbox"
                        value="mostpopuler"
                        checked={sortOption === "mostpopuler"}
                        onChange={() => setSortFunction("mostpopuler")}
                      />
                      Most Popular
                    </label>
                  </div>
                  <div className="block sm:hidden">
                    <div
                      style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        backgroundColor: "#ffffff",
                        padding: "1.5rem",
                        boxShadow: "0px -3px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                      }}
                      className="h-[450px] overflow-scroll"
                    >
                      <div className="flex w-full justify-between pb-4 border-b-2">
                        <div className="text-[16px] font-semibold">Sort By</div>
                        <HiX
                          onClick={() => setOpenSortBy(false)}
                          style={{ width: "20px", height: "20px" }}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-[10px] mt-[20px] pl-[10px]">
                        <label
                          className="dropDown_label cursor-pointer flex flex-row gap-[20px]"
                          onClick={() => setSortFunction("None")}
                        >
                          <input
                            type="checkbox"
                            value="None"
                            checked={sortOption === "default"}
                          />
                          None
                        </label>

                        <label
                          className="dropDown_label cursor-pointer flex flex-row gap-[20px]"
                          onClick={() => setSortFunction("lowtohigh")}
                        >
                          <input
                            type="checkbox"
                            value="lowtohigh"
                            checked={sortOption === "lowtohigh"}
                          />
                          Price: Low To High
                        </label>

                        <label
                          className="dropDown_label cursor-pointer flex flex-row gap-[20px]"
                          onClick={() => setSortFunction("hightolow")}
                        >
                          <input
                            type="checkbox"
                            value="hightolow"
                            checked={sortOption === "hightolow"}
                          />
                          Price: High To Low
                        </label>

                        <label
                          className="dropDown_label cursor-pointer flex flex-row gap-[20px]"
                          onClick={() => setSortFunction("newest")}
                        >
                          <input
                            type="checkbox"
                            value="newest"
                            checked={sortOption === "newest"}
                            onChange={() => setSortFunction("newest")}
                          />
                          Newest
                        </label>

                        <label
                          className="dropDown_label cursor-pointer flex flex-row gap-[20px]"
                          onClick={() => setSortFunction("customerrating")}
                        >
                          <input
                            type="checkbox"
                            value="customerrating"
                            checked={sortOption === "customerrating"}
                          />
                          Customer Rating
                        </label>

                        <label
                          className="dropDown_label cursor-pointer flex flex-row gap-[20px]"
                          onClick={() => setSortFunction("mostpopuler")}
                        >
                          <input
                            type="checkbox"
                            value="mostpopuler"
                            checked={sortOption === "mostpopuler"}
                            onChange={() => setSortFunction("mostpopuler")}
                          />
                          Most Popular
                        </label>
                      </div>
                      <div className="mt-4 mb-32">
                        <PrimaryButton
                          icon={null}
                          width={"100%"}
                          text={"Apply"}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* end here */}
            {/* material dropdown start */}
            <div
              className="dropDown hover:cursor-pointer"
              ref={dropdownRef}
              onClick={() => onClickMaterial()}
            >
              <div className="review_label">Material</div>
              <span>
                <HiOutlineChevronDown />
              </span>

              {openDropdown && (
                <>
                  <div className="dropDown_popup hidden sm:block">
                    <label
                      className="dropDown_label cursor-pointer flex flex-row gap-[20px] "
                      onClick={() => handleMaterialChange("pvc")}
                    >
                      <input
                        type="checkbox"
                        value="pvc"
                        checked={selectedMaterials.includes("pvc")}
                      />
                      PVC
                    </label>
                    <br />
                    <label
                      className="dropDown_label cursor-pointer flex gap-[20px]"
                      onClick={() => handleMaterialChange("metal")}
                    >
                      <input
                        type="checkbox"
                        value="metal"
                        checked={selectedMaterials.includes("metal")}
                      />
                      Metal
                    </label>
                    <br />
                    <label
                      className="dropDown_label cursor-pointer flex gap-[20px]"
                      onClick={() => handleMaterialChange("hybrid")}
                    >
                      <input
                        type="checkbox"
                        value="hybrid"
                        checked={selectedMaterials.includes("hybrid")}
                      />
                      Fully Customized
                    </label>
                  </div>

                  <div className="block sm:hidden">
                    <div
                      style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        backgroundColor: "#ffffff",
                        padding: "1.5rem",
                        boxShadow: "0px -3px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                      }}
                      className="h-[300px] overflow-scroll "
                    >
                      <div className="flex w-full justify-between pb-4 border-b-2">
                        <div className="text-[16px] font-semibold">
                          Material
                        </div>
                        <HiX
                          onClick={() => setOpenSortBy(false)}
                          style={{ width: "20px", height: "20px" }}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-[10px] mt-[20px] pl-[10px]">
                        <label
                          className="dropDown_label cursor-pointer flex gap-[20px]"
                          onClick={() => handleMaterialChange("pvc")}
                        >
                          <input
                            type="checkbox"
                            value="pvc"
                            checked={selectedMaterials.includes("pvc")}
                          />
                          PVC
                        </label>

                        <label
                          className="dropDown_label cursor-pointer flex gap-[20px]"
                          onClick={() => handleMaterialChange("metal")}
                        >
                          <input
                            type="checkbox"
                            value="metal"
                            checked={selectedMaterials.includes("metal")}
                          />
                          Metal
                        </label>

                        <label
                          className="dropDown_label cursor-pointer flex gap-[20px]"
                          onClick={() => handleMaterialChange("hybrid")}
                        >
                          <input
                            type="checkbox"
                            value="hybrid"
                            checked={selectedMaterials.includes("hybrid")}
                          />
                          Fully Customized
                        </label>
                      </div>
                      <div className="mt-4 mb-32">
                        <PrimaryButton
                          icon={null}
                          width={"100%"}
                          text={"Apply"}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* material dropdown start */}
            {/* price dropdown start */}
            <div
              className="dropDown hover:cursor-pointer"
              ref={priceDropdownRef}
              onClick={() => onClickPrice()}
            >
              <div className="review_label">Price</div>
              <span>
                <HiOutlineChevronDown />
              </span>

              {openPriceDropdown && (
                <>
                  <div className="dropDown_popup hidden sm:block">
                    <label
                      className="dropDown_label cursor-pointer flex gap-[20px]"
                      onClick={() => handlePriceRangeChange("0-399")}
                    >
                      <input
                        type="checkbox"
                        value="0-399"
                        checked={selectedPriceRanges.includes("0-399")}
                      />
                      0-399
                    </label>
                    <br />
                    <label
                      className="dropDown_label cursor-pointer flex gap-[20px]"
                      onClick={() => handlePriceRangeChange("400-999")}
                    >
                      <input
                        type="checkbox"
                        value="400-999"
                        checked={selectedPriceRanges.includes("400-999")}
                      />
                      400-999
                    </label>
                    <br />
                    <label
                      className="dropDown_label cursor-pointer flex gap-[20px]"
                      onClick={() => handlePriceRangeChange("1000-2999")}
                    >
                      <input
                        type="checkbox"
                        value="1000-2999"
                        checked={selectedPriceRanges.includes("1000-2999")}
                      />
                      1000-2999
                    </label>
                  </div>
                  <div className="block sm:hidden">
                    <div
                      style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        backgroundColor: "#ffffff",
                        padding: "1.5rem",
                        boxShadow: "0px -3px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                      }}
                      className="h-[300px] overflow-scroll "
                    >
                      <div className="flex w-full justify-between pb-4 border-b-2">
                        <div className="text-[16px] font-semibold">Price</div>
                        <HiX
                          onClick={() => setOpenSortBy(false)}
                          style={{ width: "20px", height: "20px" }}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-[10px] mt-[20px] pl-[10px]">
                        <label
                          className="dropDown_label cursor-pointer flex gap-[20px]"
                          onClick={() => handlePriceRangeChange("0-399")}
                        >
                          <input
                            type="checkbox"
                            value="0-399"
                            checked={selectedPriceRanges.includes("0-399")}
                          />
                          0-399
                        </label>

                        <label
                          className="dropDown_label cursor-pointer flex gap-[20px]"
                          onClick={() => handlePriceRangeChange("400-999")}
                        >
                          <input
                            type="checkbox"
                            value="400-999"
                            checked={selectedPriceRanges.includes("400-999")}
                          />
                          400-999
                        </label>

                        <label
                          className="dropDown_label cursor-pointer flex gap-[20px]"
                          onClick={() => handlePriceRangeChange("1000-2999")}
                        >
                          <input
                            type="checkbox"
                            value="1000-2999"
                            checked={selectedPriceRanges.includes("1000-2999")}
                          />
                          1000-2999
                        </label>
                      </div>
                      <div className="mt-4 mb-32">
                        <PrimaryButton
                          icon={null}
                          width={"100%"}
                          text={"Apply"}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* price dropdown end */}
          </div>
          <div className="hidden md:block">
            <div className="flex gap-[1px]">
              <div className="text-[16px] font-[600]">
                {filteredProducts?.length}
              </div>
              <h1 className="text-[16px] font-[600]">items</h1>
            </div>
          </div>
        </div>

        <div className="py-6">
          <Stack direction="row" spacing={1}>
            {selectedMaterials &&
              selectedMaterials.map((material) => (
                <Chip
                  key={material}
                  label={material == "hybrid" ? "Fully Customized" : material}
                  variant="outlined"
                  onDelete={() => handleDelete(material)}
                />
              ))}

            {selectedPriceRanges &&
              selectedPriceRanges.map((price) => (
                <Chip
                  key={price}
                  label={price}
                  variant="outlined"
                  onDelete={() => handlePriceRangeDelete(price)}
                />
              ))}
          </Stack>

          <div className="grid max-[350px]:grid-cols-1 grid-cols-2 lg:grid-cols-3 min-[1700px]:grid-cols-4 min-[2100px]:grid-cols-5 w-full gap-[8px] md:gap-[20px] mt-[40px]  md:mt-[56px]">
            {filteredProducts.map((product) => (
              <ProductCard
                coverimages={product.coverimages[0]}
                key={product._id}
                product={product}
                setShowHybridModal={setShowHybridModal}
                setSelectedProduct={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </div>
      {showHybridModal && selectedProduct && (
        <>
          <div className="fixed overflow-hidden top-0 left-0 bg-black opacity-30 h-screen w-screen z-[1000]"></div>
          <div
            className="fixed bg-white p-6 w-full h-[85vh] md:w-[710px] md:h-[650px] max-h-full rounded-b-none rounded-t-3xl  md:rounded-3xl border border-gray-200 md:top-1/2 md:left-1/2 bottom-0  md:-translate-x-1/2 md:-translate-y-1/2 z-[1001] overflow-hidden"
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

export default Product;
