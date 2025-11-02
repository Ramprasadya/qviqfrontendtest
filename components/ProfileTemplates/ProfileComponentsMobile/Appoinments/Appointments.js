import React from 'react'
import Button from '../Button/Button';

const Appointments = (props) => {
    const style = props.style;

    return (
        <div className='w-full h-[152px] flex justify-center items-center relative px-5 overflow-hidden' style={{ background: style.background }}>
            <div className="max-w-[1182px] w-full flex flex-col gap-3 xsm:gap-5 z-10">
                <p style={style.para}>Got a question? <br />Schedule an appoinment</p>
                <Button text='Book an appoinment' style={props.buttonStyle} onClick={props.onClick} />
            </div>
            {props.position.width > 330 &&
                <span className='absolute -bottom-1 -right-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="76" height="90" viewBox="0 0 76 90" fill="none">
                        <path d="M52.5 0L60.174 33.9732L89.6231 15.3769L71.0268 44.826L105 52.5L71.0268 60.174L89.6231 89.6231L60.174 71.0268L52.5 105L44.826 71.0268L15.3769 89.6231L33.9732 60.174L0 52.5L33.9732 44.826L15.3769 15.3769L44.826 33.9732L52.5 0Z" fill={props.starFill} />
                    </svg>
                </span>
            }
        </div>
    )
}

export default Appointments
