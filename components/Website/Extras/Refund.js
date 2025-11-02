import React, { useEffect } from "react";

export default function Refund() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="mb-[50px] xsm2:mx-[20px] mx-[10px] flex flex-col gap-[10px] text-wrap font-[400] text-[16px] leading-[24px]">
      <h1 className="text-[22px] font-[600] ">Qviq Return and Refund policy</h1>
      <div className="h-[4px] bg-slate-500 w-[40px] mb-[30px]"></div>
      <p>
        Thank you for choosing Qviq. We understand that sometimes circumstances
        change, and you may need to request a refund. Here's our refund policy
        to guide you through the process:
      </p>
      <ul className="ml-[20px]">
        <li className="font-[400] ">
          <span className="font-bold  ">30-Day Money-Back Guarantee:</span>-
          Qviq offers a 30-day money-back guarantee on all our products. If
          you're not satisfied with your purchase for any reason, contact our
          support team within 30 days from the date of purchase for a full
          refund.
        </li>
        <li className="font-[400] ">
          <span className="font-bold  ">Eligibility Criteria:</span>- To be
          eligible for a refund, you must have purchased the Qviq product
          directly from our official website. Products purchased through
          third-party platforms are subject to their respective refund policies.
        </li>
        <li className="font-[400] ">
          <span className="font-bold  ">Refund Process:</span>- To initiate a
          refund, please contact our customer support team at [support@qviq.io]
          with your purchase details and the reason for the refund request. We
          may require additional information to process your request.
        </li>
        <li className="font-[400] ">
          <span className="font-bold  ">Refund Timeline:</span>- Once your
          refund request is approved, the refund will be processed within 7-10
          business days. Please note that it may take additional time for the
          refund to reflect in your bank or credit card statement.
        </li>
        <li className="font-[400] ">
          <span className="font-bold  ">Non-Refundable Items:</span>- Certain
          Qviq products, such as customized or personalized items, are
          non-refundable unless they arrive damaged or defective. In such cases,
          please contact our support team immediately to arrange for a
          replacement.
        </li>
        <li className="font-[400] ">
          <span className="font-bold  ">Contact Information:</span>- If you have
          any questions about our refund policy, please contact us at
          [support@qviq.io]
        </li>
      </ul>
      <p className="mt-6">
        Qviq reserves the right to amend this refund policy at any time without
        prior notice. Any changes to the policy will be effective immediately
        upon posting on our website.
      </p>
      <p className="mt-6 mb-8 ">
        Thank you for your understanding and cooperation.
      </p>
    </div>
  );
}
