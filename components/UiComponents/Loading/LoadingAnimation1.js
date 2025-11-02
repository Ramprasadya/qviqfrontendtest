import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';

const LoadingAnimation1 = () => {
    const animationData = require('./Loading1.json');
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const animation = Lottie.loadAnimation({
                container: containerRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
            });

            return () => {
                animation.destroy();
            };
        }
    }, [animationData]);

    return <div ref={containerRef} className='w-[14rem] h-[14rem]'/>;
};

export default LoadingAnimation1;
