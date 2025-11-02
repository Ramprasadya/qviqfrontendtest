import React, { useEffect } from "react";

export default function Shipping() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="mb-[50px] mx-[20px] flex flex-col gap-[10px]">
      <h1 className="text-[22px] font-[600] ">Shipping & Delivery Policy</h1>
      <div className="h-[4px] bg-slate-500 w-[40px] mb-[30px]"></div>
      <p className="mb-[10px]">Last updated on Jan 2nd 2024</p>
      <p>
        For International buyers, orders are shipped and delivered through
        registered international courier companies and/or International speed
        post only. For domestic buyers, orders are shipped through registered
        domestic courier companies and/or speed post only. Orders are shipped
        within or as per the delivery date agreed at the time of order
        confirmation and delivering of the shipment subject to Courier
        Company/post office norms TAPOP SMART TECH PRIVATE LIMITED is not liable
        for any delay in delivery by the courier company/postal authorities and
        only guarantees to hand over the consignment to the courier company or
        postal authorities within from the date of the order and payment or as
        per the delivery date agreed at the time of order confirmation. Delivery
        of all orders will be to the address provided by the buyer. Delivery of
        our services will be confirmed on your mail ID as specified during
        registration. For any issues in utilizing our services you may contact
        our helpdesk on or support@qvia.lo
      </p>
    </div>
  );
}
