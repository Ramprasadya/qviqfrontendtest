import React from 'react'
import { ReactComponent as QRcode } from './qrcode.svg';
import centerlogo from '../../Images/tapopLogo.png';
function useDefaultProps(props){
    let newProps = {...props};
    Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
    return {...defaultProps,...newProps};
  }
const CustomizedDot = (props) => {props = useDefaultProps(props);
    return (
        <div className={`rounded-full bg-[${props.bg}] relative overflow-hidden`} style={{ width: `${props.width}`, height: `${props.height}`, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.16)' }}>
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[90px] h-[90px]" style={{ background: "linear-gradient(221.7deg, #F2B108 11.7%, #F54040 45.9%, #5940F5 74.4%)", filter: 'blur(33.2307px)' }} />
            <div className="absolute left-1/2 bottom-[50px] w-[50px] h-[50px]" style={{ transform: 'matrix(1, 0, 0.08, 1, 0, 0) translateX(-50%)' }}>
                <QRcode className='w-[50px] h-[50px]' />
            </div>
            <div className="absolute left-[66px] top-[58px] w-[65px] h-[18px]">
                <img src={centerlogo} alt="" className='w-[65px] h-[18px]' />
            </div>
        </div>
    )
}

const defaultProps = {
    width: "229px",
    height: "229px",
    bg: "#1A1A1A",
}

export default CustomizedDot
