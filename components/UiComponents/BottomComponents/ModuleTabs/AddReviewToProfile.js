import React, { useState } from "react";
import NewModal from "../../NewModal/NewModal";
import AddReviewModal from "./AddReviewModal";
import Switch from "react-switch";
import LinkButtons2 from "../../LinkButtons2";
export default function AddReviewToProfile(props) {
  const [showModal, setShowModal] = useState(false);
  const [dummyState, setDummyState] = useState(true);

  function toggleModal() {
    setShowModal((prev) => !prev);
  }
  function handleSwitch(index, value) {
    props.handleChange();
    if (props.checked && props.data.length == 0) {
      setShowModal((prev) => !prev);
    }
    props.handleToggle(index, value);
  }
  return (
    <div className="py-[1.5rem]">
      {/* <div className="flex items-center py-7 gap-4">
        <p className="text-lg font-semibold">
          Add a review form to your profile
        </p>
        {props.switchStates.map((off, index) => (
          <>
            <Switch
              checked={off.reviewSwitch}
              onChange={(value) => handleSwitch(index, value)}
              onColor="#12A26E"
              offColor="#A7A7A7"
              checkedIcon={false}
              uncheckedIcon={false}
              height={24}
              width={44}
            />
          </>
        ))}
      </div> */}
      <p className="text-sm text-cGrey font-medium">
        You can add reviews gathered from Qviq profile or manually enter other
        reviews.
      </p>
      <NewModal onModal={showModal} onClick={setShowModal} text="Add Review">
        <AddReviewModal
          toggleModal={toggleModal}
          setDummyState={setDummyState}
          dummyState={dummyState}
        />
      </NewModal>
      <br />
      <br />
      <div
        className="flex flex-col sm:flex-row justify-between gap-4 mb-8 p-[20px] rounded-[8px]"
        style={{ border: "solid 1.5px #DFDBD8" }}
      >
        <p className="text-sm sm:text-base font-[600]">
          {props.data.length} Reviews added
        </p>
        <LinkButtons2
          weight="600"
          text="Manage Review"
          onClick={() => {
            setShowModal(true);
          }}
        />
      </div>
    </div>
  );
}
