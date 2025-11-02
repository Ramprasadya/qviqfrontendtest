import React, { useRef, useState } from 'react'
import LeftRightScrollBtn from '../../../Utils/LeftRightScrollBtn'
import ResourceCard from './ResourceCard';
import FilePreview from '../FilePreview/FilePreview';

const Resources = (props) => {
    const resourcesRef = useRef(null);
    const data = props.data;
    const [preview, setPreview] = useState(false);
    const [pdf, setPdf] = useState('');

    const handleClick = (item)=>{
        const btn = document.createElement('a');
        btn.href = item.docs;
        btn.download = item.pdfname;
        btn.target = "_blank";
        btn.click();
    };

    return (
        <div className='w-full'>
            {props.heading}
            <div className="relative">
                <div className="overflow-scroll" ref={resourcesRef}>
                    <div className='flex flex-row gap-3'>
                        {data.map((item, index) => {
                            return (
                                <ResourceCard 
                                    key={index}
                                    templateId={props.templateId} 
                                    username={props.username}
                                    style={props.style}
                                    item={item} 
                                    index={index} 
                                    handleClick={handleClick}
                                    dummy={props.dummy}
                                    onClick={() => { 
                                        // !props.dummy && setPdf(item.docs); 
                                        // !props.dummy && setPreview(true);
                                        !props.dummy && handleClick(item);
                                    }} />
                            )
                        })
                        }
                    </div>
                </div>
                <LeftRightScrollBtn  refrence={resourcesRef} scrollLength={300} style={props.scrollBtn.style} leftPosition={props.scrollBtn.leftPosition} rightPosition={props.scrollBtn.rightPosition} />
            </div>
            {preview &&
                <FilePreview pdf={pdf} onClick={() => { setPreview(false) }} />
            }
        </div>
    )
}

export default Resources
