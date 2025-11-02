import React from 'react'
import CustomizedCardBack from './CustomizedCardBack'
import CustomizedCardFront from './CustomizedCardFront'
function useDefaultProps(props){
    let newProps = {...props};
    Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
    return {...defaultProps,...newProps};
  }
const CustomizedCardBoth = (props) => {props = useDefaultProps(props);
    const width = window.screen.width > 768 ? props.width : props.mobilewidth;
    const height = window.screen.width > 768 ? props.height : props.mobileheight;
    const parentwidth = window.screen.width > 768 ? props.parentwidth : props.mobileparentwidth;
    const parentheight = window.screen.width > 768 ? props.parentheight : props.mobileparentheight;
    const blurdiv = window.screen.width > 768 ? "100px" : "55px";
    const blurdiv2 = window.screen.width > 768 ? "100px" : "35px";

    return (
        <div className='relative' style={{ width: parentwidth, height: parentheight }}>
            <div className='absolute top-9 left-6' style={{ transform: 'matrix(0.97, -0.26, 0.33, 0.94, 0, 0)', width: width, height: height }}>
                <CustomizedCardBack width={width} height={height} blurdiv={blurdiv2} />
            </div>
            <div className='absolute bottom-0 right-0 border rounded-[12px]' style={{ transform: 'matrix(1, 0, 0.08, 1, 0, 0)', width: width, height: height }}>
                <CustomizedCardFront width={width} height={height} centerlogo={true} blurdiv={blurdiv} />
            </div>
        </div>
    )
}

const defaultProps = {
    parentwidth: "438px",
    parentheight: "322px",
    mobileparentwidth: "216px",
    mobileparentheight: "160px",
    width: "328px",
    height: "188px",
    mobilewidth: "162px",
    mobileheight: "92px"
}

export default CustomizedCardBoth
