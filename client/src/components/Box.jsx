import React from 'react';
import "./Box.css";
import "./Piece.css";

const Box = ({ isDark, id, pieceType }) => {
    const colorClass = isDark ? "darkBox" : "lightBox";
    return (
        <div className={`box ${colorClass}`}>
            <div id={id} className={`piece ${pieceType}`} />
        </div>
    )
}

export default Box
