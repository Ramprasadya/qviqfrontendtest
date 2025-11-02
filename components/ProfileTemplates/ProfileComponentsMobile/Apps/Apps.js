import React, { useEffect, useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import AppItem from './AppItem';
function useDefaultProps(props){
    let newProps = {...props};
    Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
    return {...defaultProps,...newProps};
  }
const Apps = (props) => {props = useDefaultProps(props);
    const data = props.data;
    const position = props.position;
    const moreAppsAvailable = data.length > (position.width > 330 ? props.noOfApps : (props.noOfApps - 2)) ? true : false;
    const [showMoreApps, setShowMoreApps] = useState(false);
    const style = props.style;
// console.log(style.background);

    return (
        <div className={`w-full mb-[12px] flex justify-center relative ${style.background}`}>
            <div className={`flex flex-wrap justify-center max-w-[400px] gap-4 px-3 py-6 ${style.div}`}>
                {(moreAppsAvailable ? data.slice(0, position.width > 330 ? props.noOfApps : (props.noOfApps - 2)) : data).map((app, index) => {
                    return (
                        <AppItem key={index} app={app} style={style} dummy={props.dummy} templateId={props.templateId} username={props.username} fromRedirect={props.fromRedirect}/>
                    )
                })}
                {showMoreApps && data.slice(position.width > 330 ? props.noOfApps : (props.noOfApps - 2)).map((app, index) => {
                    return (
                        <AppItem key={index} app={app} style={style} dummy={props.dummy} templateId={props.templateId} username={props.username} fromRedirect={props.fromRedirect}/>
                    )
                })}
            </div>
            {moreAppsAvailable && <>
                {
                    showMoreApps ?
                        < div className={`bg-white flex justify-center items-center rounded-full hover:cursor-pointer active:scale-95 duration-150 ${style.arrow}`} onClick={() => { setShowMoreApps(false) }}>
                            <HiChevronUp />
                        </div>
                        :
                        < div className={`bg-white flex justify-center items-center rounded-full hover:cursor-pointer active:scale-95 duration-150 ${style.arrow}`} onClick={() => setShowMoreApps(true)}>
                            <HiChevronDown />
                        </div>
                }
            </>}

        </div>
    )
}

const defaultProps = {
    noOfApps: 8,
}

export default Apps