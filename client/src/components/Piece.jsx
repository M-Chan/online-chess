import React from 'react';
import './Piece.css';

const Piece = ({ id, pieceType }) => {
    return (
        <div id={id} className={`piece ${pieceType}`} />
    );
};

export default Piece;
