import React, { useState } from 'react'
import "./Chessboard.css"
import Box from "./Box";

const generateBoxes = () => {
    let isDark = false;
    const res = []
    for (let i = 1; i <= 63; i++) {
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
            <Box isDark={true}></Box>
        </div>
    )
}

export default Chessboard
