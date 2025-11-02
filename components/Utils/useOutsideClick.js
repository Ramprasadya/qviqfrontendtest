import { useEffect, useRef } from 'react';

const useOutsideClick = (ref, onOutsideClick) => {
    const savedCallback = useRef(onOutsideClick);

    useEffect(() => {
        savedCallback.current = onOutsideClick;
    }, [onOutsideClick]);

    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                savedCallback.current();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [ref]);
};

export default useOutsideClick;