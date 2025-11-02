import React, { useContext, useState, useEffect } from "react";
import { HiOutlinePencilSquare, HiOutlineShoppingCart } from "react-icons/hi2";
import PrimaryButton from "./PrimaryButton";
import { HiShoppingCart } from "react-icons/hi";
import { UserContext } from "../Contexts/context";
import CustomizeProduct from "../Website/Products/CustomizeProduct";
import NewToast from "./NewToast";
import { serverUrl } from "../../config";
import PrimaryButton4 from "./PrimaryButton4";
import Link from "next/link";
import Image from "next/image";
import { SafeLocalStorage } from "../utils";
import { useRouter } from "next/navigation";
import ModalCart from "../Website/Cart/ModalCart";

const ProductCard = (props) => {
  const [showMessage, setShowtMessage] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const product = props.product || {};
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("coverimages");
  const [customization, setCustomization] = useState({
    name: "John Doe",
    fontStyle: "Raleway",
    fontColor: "#FFFFFF",
    fontWeight: "400",
    designation: "CEO,Qviq",
    designationStyle: "Raleway",
    designationColor: "#FFFFFF",
    logo: "",
    cardColor: "#000000",
  });

  const { cart, handleAdd, handleDel, handleQuantityChange } =
    useContext(UserContext);

    //logic for modal cart
    const [openModalCart, setOpenModalCart] = useState(false);
    const changeOpenModalCart = () => {
      setOpenModalCart(false);
    };

  const getProductQuantity = (productId) => {
    const cartItem = cart.find((item) => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const addToCart = (product) => {
    
    if (product.horizontal && product.vertical) {
      product.horizontal = true;
      product.vertical = false;
    }
    handleAdd(product);
  };

  const decreaseQuantity = (product) => {
    const quantity = getProductQuantity(product.productId);
    if (quantity > 1) {
      handleQuantityChange(product, quantity - 1);
    } else {
      handleDel(product);
    }
  };

  const increaseQuantity = (product) => {
    handleQuantityChange(product, getProductQuantity(product.productId) + 1);
  };

  return (
    <div
      className="w-full Plus-Jakarta-Sans-font-div  xl:h-[550px]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={`/products/${product._id}`} 
        onClick={(e)=>{e.preventDefault();
            if(product.material == 'hybrid' && props.setShowHybridModal && props.setSelectedProduct){
              props.setShowHybridModal(true);
              props.setSelectedProduct(product);
            }else{
              // addToCart(product);
              router.push(`/products/${product._id}`);
            }
          }}>
        <div className="transition-all delay-75  flex flex-col justify-center items-center bg-[#FAFAFA] w-full h-[174px] p-[20px] sm:h-[250px] xl:h-[393px]  rounded-[12px]">
          <div className="relative w-full h-[140px] xsm:h-[120px] sm:h-[200px] xl:h-[230px]">
            {product?.coverimages?.at(0) ? (
              <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                content="true"
                className="object-contain"
                src={props.coverimages}
                alt="product"
                fill
              />
            ) : (
              <div className="object-contain bg-slate-400"></div>
            )}
          </div>
        </div>
      </Link>

      <div className="flex sm:flex-col flex-col-reverse ">
        <Link
          href={`/products/${product._id}`}
          onClick={(e)=>{e.preventDefault();
            if(product.material == 'hybrid' && props.setShowHybridModal && props.setSelectedProduct){
              props.setShowHybridModal(true);
              props.setSelectedProduct(product);
            }else if(product?.isCustomizable){
              router.push(`/products/${product._id}`);
            }else{
              setOpenModalCart(true);
            }
          }}
          style={{ textDecoration: "none", gap: "0px", marginTop: "0px" }}
          className="flex flex-col text-[12px] leading-[16px] sm:text-[18px]  smd:text-[20px] sm:leading-[32px] "
        >
          <div className="flex flex-row justify-between">
            <div>
              <div className={`font-[500] sm:w-[140px] sm2:w-full lg:w-[180px] lg2:w-full ${product.title.length > 20 ? "!w-[180px]" : "w-full" } text-[#0A0003] mt-[16px] mb-[8px]`}>
                {product.title}
              </div>
              <div className="font-[700] w-full text-[#0A0003] sm:mb-[16px]">
                ₹ {product.price}
              </div>
            </div>

            {/* CUSTOMIZE BUTTON */}
            {product?.isCustomizable && (
              <div className="mt-4 flex items-start w-fit h-full">
                <div className={` ${open ? "scale-[90%]" : "scale-0"} transition-[300ms] hidden sm:flex gap-[10px] font-[300] text-[12px] sm:text-[18px] leading-[20px] items-center text-[#FFFFFF] bg-gradient-to-r from-[#FB6609]  to-[#E40849] w-fit py-2 px-4 rounded-full`}>
                  <div className="text-[#FFFFFF]">
                    <HiOutlinePencilSquare />
                  </div>
                  <div className="hover:cursor-pointer ">Customize</div>
                </div>
              </div>
            )}
                      {/* ADD TO CART */}
          {!product?.isCustomizable && open && (
            <div
              className="mt-4"
              onClick={() => {
                if(product.material == 'hybrid' && props.setShowHybridModal && props.setSelectedProduct){
                  props.setShowHybridModal(true);
                  props.setSelectedProduct(product);
                }else{
                  addToCart(product);
                  //console.log("product",product)
                }
              }}
            >
              <div className="hidden sm:flex gap-[10px] font-[300] text-[12px] sm:text-[18px] leading-[20px] items-center text-[#FFFFFF] bg-gradient-to-r from-[#FB6609]  to-[#E40849] w-fit py-2 px-4 rounded-full">
                <p className="text-[#FFFFFF] hidden ">
                  <HiOutlinePencilSquare />
                </p>
                <p className="hover:cursor-pointer text-[16px] font-[500] ">Add to cart</p>
              </div>
            </div>
          )}
          </div>

          {/* COLOR UPDATION */}
          {(product?.blackCoverImages ||
            product?.goldCoverImages ||
            product?.silverCoverImages ||
            product?.roseCoverImages) && (
            <div className="">
              <div className="flex gap-[16px] mt-[16px]">
                {product?.blackCoverImages && (
                  <button
                    onMouseEnter={() => setSelectedColor("blackCoverImages")}
                    onMouseLeave={() => setSelectedColor("coverimages")}
                    onClick={() =>
                      SafeLocalStorage.setItem("selectedColor", "blackImages")
                    }
                    className="md:h-[52px] md:w-[52px] h-[36px] w-[36px] rounded-full bg-[#000] border-2 border-[#F3F3F3] shadow-[_0px_4px_8px_rgba(_151,_151,_151,_0.4)] "
                  ></button>
                )}
                {product?.goldCoverImages && (
                  <button
                    onMouseEnter={() => setSelectedColor("goldCoverImages")}
                    onMouseLeave={() => setSelectedColor("coverimages")}
                    onClick={() =>
                      SafeLocalStorage.setItem("selectedColor", "goldImages")
                    }
                    className="md:h-[52px] md:w-[52px] h-[36px] w-[36px] rounded-full bg-[#d7be57] border-2 border-[#DFDBD8]"
                  ></button>
                )}
                {product?.silverCoverImages && (
                  <button
                    onMouseEnter={() => setSelectedColor("silverCoverImages")}
                    onMouseLeave={() => setSelectedColor("coverimages")}
                    onClick={() =>
                      SafeLocalStorage.setItem("selectedColor", "silverImages")
                    }
                    className="md:h-[52px] md:w-[52px] h-[36px] w-[36px] rounded-full bg-[#adaeb2] border-2 border-[#F3F3F3]"
                  ></button>
                )}
                {product?.roseCoverImages && (
                  <button
                    onMouseEnter={() => setSelectedColor("roseCoverImages")}
                    onMouseLeave={() => setSelectedColor("coverimages")}
                    onClick={() =>
                      SafeLocalStorage.setItem("selectedColor", "roseImages")
                    }
                    className="md:h-[52px] md:w-[52px] h-[36px] w-[36px] rounded-full bg-[#da968d] border-2 border-[#F3F3F3]"
                  ></button>
                )}
              </div>
            </div>
          )}


        </Link>
      </div>
      {getProductQuantity(product.productId) === 0 ? (
        <>
          {/* <div className="hidden sm:block">
            <PrimaryButton4
              icon={<HiOutlineShoppingCart />}
              text="Add to Cart"
              color="#1a1a1a"
              onClick={() => {
                addToCart(product);
              }}
            />
          </div> */}
          {open ? (
            <div className="flex items-center justify-between">
              <div
                onClick={() => {
                  setIsCustomizing(true);
                }}
                className="sm:hidden flex gap-[10px] font-[600] items-center hover:text-[#F50100] text-[14px] md:text-[18px]"
              >
                <p className=" hover:cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-br hover:from-[#9747FF] hover:via-[#F50100] hover:to-[#FECA00]">
                  Customise
                </p>
                <p className="hover:text-[#F50100]">
                  <HiOutlinePencilSquare />
                </p>
              </div>
              <div
                onClick={() => {
                  addToCart(product);
                }}
                className="sm:hidden flex flex-col justify-center items-center w-[36px] h-[36px] rounded-full  bg-[#1a1a1a] text-white hover:bg-white hover:text-[#1a1a1a]"
              >
                <HiShoppingCart />
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              {/* <div
                onClick={() => {
                  addToCart(product);
                  setMessage("Qviq device added to your cart!");
                  setShowtMessage(true);
                  setTimeout(() => {
                    setShowtMessage(false);
                  }, 3000);
                }}
                className="sm:hidden flex flex-col justify-center items-center w-[36px] h-[36px] rounded-full  bg-[#1a1a1a] text-white hover:bg-white hover:text-[#1a1a1a]"
              >
                <HiShoppingCart />
              </div> */}
            </div>
          )}
        </>
      ) : (
        <div className="flex mt-[8px] w-full sm:w-[124px] border-[1px] border-[#1a1a1a] rounded-[64px]  items-center justify-between">
          <button
            className="flex flex-col justify-center items-center  w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] hover:bg-white rounded-full"
            onClick={() => decreaseQuantity(product)}
          >
            -
          </button>
          <p>{getProductQuantity(product.productId)}</p>
          <button
            className="flex flex-col justify-center items-center  w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] hover:bg-white rounded-full"
            onClick={() => increaseQuantity(product)}
          >
            +
          </button>
        </div>
      )}
      {isCustomizing && (
        <CustomizeProduct
          customization={customization}
          setCustomization={setCustomization}
          product={product}
          setIsCustomizing={setIsCustomizing}
        />
      )}
      {openModalCart && (
            <ModalCart
              changeOpenModalCart={changeOpenModalCart}
              product={product}
            />
          )}
      <NewToast open={showMessage} message={message} />
    </div>
  );
};

export default ProductCard;
