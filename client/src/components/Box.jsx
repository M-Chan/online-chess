import React from 'react';
import Piece from './Piece';
import "./Box.css";

const Box = ({ isDark, id, pieceType }) => {
    const colorClass = isDark ? "darkBox" : "lightBox";
    return (
        <div className={`box ${colorClass}`}>
            <Piece id={id} pieceType={pieceType}/>
        </div>
    )
}

export default Box
