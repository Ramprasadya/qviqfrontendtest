import React, { useRef, useState } from "react";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import ResourceCard from "./ResourceCard";
import FilePreview from "../FilePreview/FilePreview";

const Resources = (props) => {
  const resourcesRef = useRef(null);
  const data = props.data;
  const [preview, setPreview] = useState(false);
  const [pdf, setPdf] = useState("");
  const templateId = props.templateId;
  const username = props.username;
  return (
    <div className="w-full">
      {props.heading}
      <div className="relative">
        <div className="overflow-scroll" ref={resourcesRef}>
          <div className="flex flex-row gap-5">
            {data.map((item, index) => {
              return (
                <ResourceCard
                  key={index}
                  templateId={templateId}
                  username={username}
                  style={props.style}
                  item={item}
                  index={index}
                  dummy={props.dummy}
                  setPdf={setPdf}
                  setPreview={setPreview}
                />
              );
            })}
          </div>
        </div>
        <LeftRightScrollBtn
          refrence={resourcesRef}
          scrollLength={600}
          style={props.scrollBtn.style}
          leftPosition={props.scrollBtn.leftPosition}
          rightPosition={props.scrollBtn.rightPosition}
        />
      </div>
      {preview && (
        <FilePreview
          pdf={pdf}
          onClick={() => {
            setPreview(false);
          }}
        />
      )}
    </div>
  );
};

export default Resources;
