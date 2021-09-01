import React, { useState } from 'react'
import "./Chessboard.css"
import Box from "./Box";

const generateBoxes = () => {
    let isDark = false;
    const res = []
    for (let i = 1; i <= 62; i++) {
        res.push(<Box isDark={isDark} />);
        isDark = !isDark;
        if (i%8===0){
            isDark = !isDark;
        }
    }
    return res;
};

const Chessboard = () => {
    const boxes = generateBoxes();

    return (
        <div className="chessboard">
            {boxes}
            <Box isDark={true} id="f8" pieceType="blackKing" />
            <Box isDark={false} id="h8" pieceType="whiteKing" />
        </div>
    )
}

export default Chessboard
