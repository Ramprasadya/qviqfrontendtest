import React from "react";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function SearchBar(props) {props = useDefaultProps(props);
  return (
    <div className="linear-bg search-bar rounded-2xl text-white">
      <p>{props.text}</p>
    </div>
  );
}
const defaultProps = {
  text: "Type here...",
};

export default SearchBar;
