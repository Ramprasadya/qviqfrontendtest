import React, { useState, useRef } from "react";
import ReviewTable from "./ReviewTable";
import ManualReview from "./ManualReview";
function AddReviewModal(props) {
  const [ptab, setPTab] = useState("Add from Qviq reviews");

  return (
    <div className="h-[75vh]">
      <div className="flex items-center mt-6 p-1 rounded-full productBackground text-center">
        <p
          onClick={() => setPTab("Add from Qviq reviews")}
          className={
            ptab === "Add from Qviq reviews"
              ? "productTabActive rounded-full w-full overflow-hidden "
              : "productTabNotActive rounded-full"
          }
        >
          Add from Qviq reviews
        </p>
        <p
          onClick={() => setPTab("Enter manually")}
          className={
            ptab === "Enter manually"
              ? "productTabActive rounded-full"
              : "productTabNotActive rounded-full"
          }
        >
          Enter manually
        </p>
      </div>
      {ptab === "Add from Qviq reviews" ? (
        <>
          <ReviewTable ptab={ptab} />
        </>
      ) : (
        <>
          <ManualReview ptab={ptab} />
        </>
      )}
    </div>
  );
}

export default AddReviewModal;
