import React, { useContext } from "react";
import PrimaryButton3 from "../../UiComponents/PrimaryButton3";
import {
  HiArrowRight,
  HiOutlineShoppingCart,
  HiOutlineX,
  HiShoppingCart,
  HiXCircle,
} from "react-icons/hi";
import { TfiClose } from "react-icons/tfi";
import { UserContext } from "../../Contexts/context";
import { HiOutlineXMark } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import find from "../assets/find.png";
import PrimaryButton2 from "../../UiComponents/PrimaryButton2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createQueryString } from "@/components/utils";

function ModalCart(props) {
  const navigate = useRouter();
  const { username } = useContext(UserContext);

  const checkUser = () => {
    if (username === "") {
      navigate.push("/signup?" + createQueryString(["fromPage"], ["cart"]));
    } else {
      navigate.push("/address");
    }
  };

  // the function for the cart
  const { cart, handleAdd, handleDel, handleQuantityChange } =
    useContext(UserContext);

  const getProductQuantity = (productId) => {
    const cartItem = cart.find((item) => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const addToCart = (product) => {
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

  const calculateSubtotal = () => {
    let subtotal = 0;
    cart.forEach((product) => {
      subtotal += parseFloat(product.quantity) * parseFloat(product.price);
    });
    //console.log(subtotal);
    return subtotal;
  };

  const calculateTax = () => {
    const taxRate = 0.1;
    const subtotal = calculateSubtotal();
    const tax = subtotal * taxRate;
    return tax.toFixed(2);
  };

  const calculateDeliveryCharge = () => {
    const deliveryCharge = 99;
    return deliveryCharge.toFixed(2);
  };

  const calculateTotal = () => {
    // Calculate total amount including subtotal, tax, and delivery charge
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const deliveryCharge = calculateDeliveryCharge();
    const total = subtotal + parseFloat(tax) + parseFloat(deliveryCharge);
    return total.toFixed(2);
  };

  //console.log(cart);

  //cart proudcts section
  const CartItems = (product) => {
    return (
      <div
        className="flex w-full sm:bg-white p-[8px] sm:p-[12px] justify-between rounded-[12px]"
        style={{
          boxShadow: "3px 3px 8px #00000012",
          border: "1px solid #dfdbd8",
        }}
      >
        <div className="flex flex-col gap-[8px] sm:gap-[10px]">
          <p className="font-[500] text-[14px] leading-[18px] sm:text-[16px] sm:leading-[32px]">
            {product.product.title}
          </p>

          <div className="w-fit h-fit bg-[#F3F3F3] flex justify-center items-center rounded-[4.5px]">
            {!product.product.vertical && (
              <Image
                // className="w-[68px] h-[50px]"
                width={68}
                height={50}
                // src={product.product.images}
                src={
                  product?.product?.[product.product.color]?.at(0)
                    ? product?.product?.[product.product.color]?.at(0)
                    : product?.product?.["images"]?.at(0)
                }
                alt="product"
              />
            )}
            {product.product.vertical && (
              <Image
                // className="w-[50px] h-[68px]"
                width={50}
                height={68}
                // src={product.product.images}
                src={
                  product?.product?.[product.product.color]?.at(0)
                    ? product?.product?.[product.product.color]?.at(0)
                    : product?.product?.["images"]?.at(0)
                }
                alt="product"
              />
            )}
          </div>

          <p className="font-[700] text-[14px] leading-[18px] sm:text-[20px] sm:leading-[32px]">
            {" "}
            ₹ {product.product.price}
          </p>
        </div>

        <div className="flex flex-col justify-between items-end">
          <div className="flex flex-col justify-center items-center bg-[#fafafa] rounded-full w-[40px] h-[40px] ">
            {/* <HiOutlineXMark /> */}
            {/* quantity */}
            {/* {getProductQuantity(product.product.productId)} */}
            <div className="mb-8 flex mt-[16px] w-[100px] border-[1px] border-[#817C7C] rounded-[64px] px-[16px]  items-center justify-between font-[500] text-[14px] mr-12 leading-[32px]">
              <button
                className=""
                onClick={() => decreaseQuantity(product.product)}
              >
                -
              </button>
              <p>{getProductQuantity(product.product.productId)}</p>

              <button onClick={() => increaseQuantity(product.product)}>
                +
              </button>
            </div>
          </div>
          <button
            className="flex justify-center items-center mb-[5px] gap-2 text-[12px] sm:text-[16px]"
            onClick={() => handleDel(product.product)}
          >
            <RiDeleteBin6Line className="text-[12px] sm:text-[16px]" />
            Remove
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed z-[999] inset-0 flex items-center justify-center backdrop-blur-md backdrop-brightness-50">
      {cart.length == 0 && (
        <div className="fixed z-[999] right-0 top-0 bg-[#FFFFFF] md:w-[45%] h-screen px-[20px] flex justify-center flex-col items-center rounded-tl-[28px] rounded-bl-[28px] gap-10">
          <div
            className="absolute right-[48px] top-[44px] cursor-pointer"
            onClick={() => props.changeOpenModalCart()}
          >
            <HiOutlineX />
          </div>
          <Image src={find} className="w-[216px] h-[208px]" alt="image" />
          <div className="flex flex-col justify-start items-center gap-6">
            <div className="text-[32px] font-[700] text-center">
              Your shopping Cart is empty
            </div>
            <div className="text-[20px] font-[500] text-[#817C7C] text-center">
              Looks like you haven't added anything to your cart yet.
            </div>
          </div>
          <Link href="/products">
            <PrimaryButton3
              text="Start Shopping"
              icon={<HiOutlineShoppingCart />}
            />
          </Link>
        </div>
      )}
      {cart.length != 0 && (
        <div className="fixed z-[999] right-0 top-0 bg-[#FFFFFF] h-screen w-fit flex flex-col justify-start items-start rounded-tl-[28px] rounded-bl-[28px] overflow-hidden">
          <div className="relative flex flex-col h-[100vh] w-full">
            <div className="h-full w-fit pl-[20px] pt-[44px] gap-6 flex flex-col justify-start relative">
              <div className="absolute top-0 right-0 flex w-full justify-between px-[30px] py-[20px] bg-[#FFFFFF] border-b-[1px] border-[#F3F3F3]">
                <div className="font-[700] text-[32px]">Your Cart</div>
                <div
                  className="cursor-pointer flex flex-col justify-center items-center"
                  onClick={() => props.changeOpenModalCart()}
                >
                  <TfiClose />
                </div>
              </div>

              <div
                className="flex w-full h-full pb-[230px] pt-[65px] pl-[20px] pr-[40px] mr-[20px] flex-col gap-6 overflow-y-scroll"
                style={{ overflowY: "scroll" }}
              >
                {cart.map((product) => (
                  <CartItems product={product} />
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 right-0 w-full h-[200px] border-t-[1px] border-[#F3F3F3] py-[20px] px-[48px] bg-white">
              <div className="flex justify-between">
                <div className="font-[700] text-[20px]">Total</div>
                <div className="font-[700] text-[20px]">
                  ₹{calculateSubtotal()}
                </div>
              </div>
              <div>
                <h1 className="font-[400] text-[14px]">
                  Taxes and shipping calculated at checkout
                </h1>
              </div>
              <div className="mt-10">
                <PrimaryButton3 width={"100%"} onClick={checkUser} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalCart;
