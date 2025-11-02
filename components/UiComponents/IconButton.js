import React from "react";
import { HiOutlinePlus  , HiOutlineUpload} from "react-icons/hi";
import ImageUploading from "react-images-uploading";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function IconButton(props) {props = useDefaultProps(props);
  return (
    <>
    {/* <button
      type="button"
      disabled={props.isDisabled}
      onChange={props.onChange}
      className="icon-btn text-white font-medium  rounded-full"
    >
      {props.icon}
    </button> */} <ImageUploading
        
        value={props.image}
        onChange={props.onChangeImage}
       
        dataURLKey="data_url"
        // acceptType={["png"]}
      >
        {({
          imageList,
          onImageUpload,
          // onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
         
          <div className="upload__image-wrapper">
            
             <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
              className="icon-btn text-white font-medium  rounded-full"
            >
              {props.icon}
            </button> 
            
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

    </>
    
    
  );
}
const defaultProps = {
  isDisabled: false,
  icon: <HiOutlinePlus/>
};

export default IconButton;
