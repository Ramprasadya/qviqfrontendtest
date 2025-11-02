import React from 'react'
function useDefaultProps(props){
    let newProps = {...props};
    Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
    return {...defaultProps,...newProps};
  }
const Button = (props) => {props = useDefaultProps(props);
    return (
        <button disabled={props.disabled} className={`font-bold text-sm py-[13px] px-[24px] w-fit flex justify-center items-center gap-2 duration-150 z-50 ${props.style} ${props.disabled ? '' : 'active:scale-95'}`} style={{ cursor: `${props.disabled ? 'not-allowed' : 'pointer'}` }} onClick={props.onClick}>
            {props.text}
            {props.icon && <span className='text-base'>{props.icon}</span>}
        </button>
    )
}

export default Button;

const defaultProps = {
    icon: null,
}