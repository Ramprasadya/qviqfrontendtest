import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';

const LoadingAnimation = () => {
    const animationData = require('./Loading.json');
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

    return <div ref={containerRef} className='w-24 h-24'/>;
};

export default LoadingAnimation;
