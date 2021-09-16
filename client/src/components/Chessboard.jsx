import React, { useRef, useState } from 'react';
import "./Chessboard.css";
import Box from "./Box";
import { initialBoardState, samePosition } from '../utils/constants';

const VERTICAL_SIZE = 8;
const HORIZONTAL_SIZE = 8;

const Chessboard = () => {
    const chessboardRef = useRef(null);
    const [activePiece, setActivePiece] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [pieces, setPieces] = useState(initialBoardState);
    const board = [];
    for (let y = VERTICAL_SIZE - 1; y >= 0; y--) {
        for (let x = 0; x < HORIZONTAL_SIZE; x++) {
            const isDark = (x + y + 2) % 2 === 0;
            const piece = pieces.find(p =>
                samePosition(p.position, {x, y})
            )

            board.push(<Box isDark={isDark} pieceType={piece ? piece.type : "empty"} />);
        }
    }

    const handleClick = (e) => {
        if (activePiece) {
            movePiece(e);
        } else {
            selectPiece(e);
        }
    };

    const selectPiece = (e) => {
        const element = e.target;
        if (!element.classList.contains("empty")) {
            setActivePiece(element);
            console.log(element.classList)
        }
    };
    
    const movePiece = (e) => {
        const element = e.target;
        setActivePiece(null);
    };

    return (
        <div 
            id="chessboard"
            ref={chessboardRef}
            onClick={(e) => handleClick(e)}
        >
            {board}
        </div>
    )
}

export default Chessboard
