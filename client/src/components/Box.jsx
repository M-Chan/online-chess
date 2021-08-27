import React from 'react';
import "./Box.css";

const Box = ({ isDark }) => {
    const colorClass = isDark ? "darkBox" : "lightBox";
    return (
        <div 
            className={`box ${colorClass}`}
        />
    )
}

export default Box
