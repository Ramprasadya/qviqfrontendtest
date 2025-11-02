import React, { useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import AppItem from './AppItem';
function useDefaultProps(props){
    let newProps = {...props};
    Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
    return {...defaultProps,...newProps};
  }
const Apps = (props) => {props = useDefaultProps(props);
    const data = props.data;
    const moreAppsAvailable = data.length > props.noOfApps ? true : false;
    const [showMoreApps, setShowMoreApps] = useState(false);
    const style = props.style;

    return (
        <div className={`${moreAppsAvailable && 'mb-[20px]'} w-full flex justify-center relative ${style.background}`}>
            
            <div className={`flex flex-wrap justify-center gap-6 max-w-[870px] px-3 py-8 ${style.div}`}>
                {(moreAppsAvailable ? data.slice(0, props.noOfApps) : data).map((app, index) => {
                    return (
                        <div key={index}>
                            <AppItem app={app} style={style} dummy={props.dummy} templateId={props.templateId} username={props.username} fromRedirect={props.fromRedirect}/>
                        </div>
                    )
                })}
                {showMoreApps && data.slice(props.noOfApps).map((app, index) => {
                    return (
                        <div key={index}>
                            <AppItem app={app} style={style} dummy={props.dummy} templateId={props.templateId} username={props.username} fromRedirect={props.fromRedirect}/>
                        </div>
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
    noOfApps: 12,
}

export default Apps