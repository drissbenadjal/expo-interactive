import React, { useState, useEffect, useRef } from 'react';
import './Loader.css';

export const Loader = ({ loading }) => {


    const [display, setDisplay] = useState(true);

    const loaderTopRef = useRef(null);
    const loaderBottomRef = useRef(null);

    useEffect(() => {
        if (!loading) {
            // Faire une transition qui fait baisser la height du loader
            for (let i = 0; i < 51; i++) {
                setTimeout(() => {
                    loaderTopRef.current.style.height = `${50 - i}vh`;
                }, i * 6);
            }
            for (let i = 0; i < 60; i++) {
                setTimeout(() => {
                    loaderBottomRef.current.style.height = `${50 - i}vh`;
                }, i * 6);
            }

            setTimeout(() => {
                setDisplay(false);
            }, 500);
        }
    }, [loading]);

    if (display) {
        return (
            <div className="loader">
                <div className="loader__top" ref={loaderTopRef}></div>
                <div className="loader__bottom" ref={loaderBottomRef}></div>
            </div>
        )
    } else {
        return null;
    }
}