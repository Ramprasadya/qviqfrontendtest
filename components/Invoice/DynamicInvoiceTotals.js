import React from "react";

const DynamicInvoiceTotals = ({ cart = [] }) => {
  if (!cart || cart.length === 0) {
    return <p>No items in the cart</p>;
  }

  // Calculate totals
  const taxableAmount = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
  const cgstRate = 0.09; // 9%
  const sgstRate = 0.09; // 9%
  const cgstAmount = taxableAmount * cgstRate;
  const sgstAmount = taxableAmount * sgstRate;
  const totalAmount = taxableAmount + cgstAmount + sgstAmount;

  // Function to convert number to words
  const numberToWords = (num) => {
    // Implement or use a library for number to words conversion
    // This is a placeholder function
    return `${num.toFixed(2)} Rupees Only`;
  };

  // Calculate total quantity
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="flex justify-end mb-4">
        <table>
          <tbody>
            <tr className="text-[6px] sm:text-sm font-semibold">
              <td className="text-right pr-[20px] sm:pr-24">
                Total Taxable Amount
              </td>
              <td className="text-right">
                ₹
                {taxableAmount.toFixed(2) -
                  (taxableAmount.toFixed(2) * 18) / 100}
              </td>
            </tr>
            <tr className="text-[6px] sm:text-sm font-semibold">
              <td className="text-right pr-[20px] sm:pr-24">
                CGST {cgstRate * 100}%
              </td>
              <td className="text-right">₹{cgstAmount.toFixed(2)}</td>
            </tr>
            <tr className="text-[6px] sm:text-sm font-semibold">
              <td className="text-right pr-[20px] sm:pr-24">
                SGST {sgstRate * 100}%
              </td>
              <td className="text-right">₹{sgstAmount.toFixed(2)}</td>
            </tr>
            <tr className="border-b-[1px] border-b-[#000000]">
              <td className="p-2"></td>
            </tr>
            <tr className="text-[8px] sm:text-lg font-semibold">
              <td className="text-right pr-[20px] sm:pr-24">Total</td>
              <td className="text-right">₹{taxableAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-[4px] sm:text-xs flex justify-between pb-1 mb-1">
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total amount (in words): INR {numberToWords(totalAmount)}</p>
      </div>
      <div className="border-b-[1px] border-b-[#1c6bff] pb-1 mb-1"></div>
      <div className="flex justify-end mb-6">
        <table>
          <tbody>
            <tr className="text-[6px] sm:text-sm font-semibold">
              <td className="text-right pr-[20px] sm:pr-24">Amount Payable:</td>
              <td className="text-right">₹{taxableAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DynamicInvoiceTotals;
