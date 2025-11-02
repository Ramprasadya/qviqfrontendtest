import React from 'react'
import Button from '../Button/Button';

const Appointments = (props) => {
    const style = props.style;
    //console.log(style.background);

    return (
        <div className='w-full h-[194px] flex justify-center items-center relative px-4 xl:px-0' style={{ background: style.background , borderRadius: style.radius}}>
            <div className="max-w-[1182px] w-full px-5 flex flex-col gap-5 z-10">
                <p style={style.para}>Got a question? <br />Schedule an appoinment</p>
                <Button text='Book an appoinment' style={props.buttonStyle} onClick={props.onClick}/>
            </div>
            <span className="absolute -bottom-5 left-[40%]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path d="M52.5 0L60.174 33.9732L89.6231 15.3769L71.0268 44.826L105 52.5L71.0268 60.174L89.6231 89.6231L60.174 71.0268L52.5 105L44.826 71.0268L15.3769 89.6231L33.9732 60.174L0 52.5L33.9732 44.826L15.3769 15.3769L44.826 33.9732L52.5 0Z" fill={props.starFill} />
                </svg>
            </span>
            <span className="absolute top-0 left-[55%]">
                <svg xmlns="http://www.w3.org/2000/svg" width="105" height="76" viewBox="0 0 105 76" fill="none">
                    <path d="M52.5 -29L60.174 4.97324L89.6231 -13.6231L71.0268 15.826L105 23.5L71.0268 31.174L89.6231 60.6231L60.174 42.0268L52.5 76L44.826 42.0268L15.3769 60.6231L33.9732 31.174L0 23.5L33.9732 15.826L15.3769 -13.6231L44.826 4.97324L52.5 -29Z" fill={props.starFill} />
                </svg>
            </span>
            <span className="absolute bottom-[2%] right-[1%]">
                <svg xmlns="http://www.w3.org/2000/svg" width="165" height="164" viewBox="0 0 165 164" fill="none">
                    <path d="M82.5 0L94.5592 53.3865L140.836 24.1637L111.613 70.4408L165 82.5L111.613 94.5592L140.836 140.836L94.5592 111.613L82.5 165L70.4408 111.613L24.1637 140.836L53.3865 94.5592L0 82.5L53.3865 70.4408L24.1637 24.1637L70.4408 53.3865L82.5 0Z" fill={props.starFill} />
                </svg>
            </span>
        </div>
    )
}

export default Appointments
