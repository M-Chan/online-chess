import Square from "./Square"
import Pawn  from "./Pieces/Pawn";
import { Queen } from "./Pieces/Queen";
import Bishop from "./Pieces/Bishop";
import Knight from "./Pieces/Knight";
import Rook from "./Pieces/Rook";
import { King } from "./Pieces/King";

export default class ChessBoard {
    
    numMoves = 0;
    files = ["a", "b", "c", "d", "e", "f", "g", "h"]
    activeSquare = null; //this will be the square object that a user has clicked on

    constructor() {

        //making the actual chessboard array
        this.board = [...Array(8)].map((x, j) => {
            return Array(8).fill(null).map((y, i) => {
                return new Square(`${String.fromCharCode(65 + i)}${8 - j}`) //initialising all the square objects with their identifiers
            })
        })

        // [ [A8, B8, C8, D8, E8, F8, G8, H8],      top-left is [0][0] = A8
        //   [A7, B7, C7, D7, E7, F7, G7, H7],      black side
        //   [A6, B6, C6, D6, E6, F6, G6, H6],
        //   [A5, B5, C5, D5, E5, F5, G5, H5],
        //   [A4, B4, C4, D4, E4, F4, G4, H4],
        //   [A3, B3, C3, D3, E3, F3, G3, H3],
        //   [A2, B2, C2, D2, E2, F2, G2, H2],      white side
        //   [A1, B1, C1, D1, E1, F1, G1, H1]  ]

        for (let i=0; i<8; i++) {
            board[1][i].addPiece(Pawn(i, 1, "black")) 
            board[6][i].addPiece(Pawn(i, 6, "white")) 
            
            if (i==0 || i==7) { //make new rooks
                board[0][i].addPiece(Rook(i, 0, "black")) 
                board[7][i].addPiece(Rook(i, 0, "white")) 
            }
            else if (i==1 || i==6) { //make new knights
                board[0][i].addPiece(Knight(i, 0, "black"))
                board[7][i].addPiece(Knight(i, 0, "white"))
            }

            else if (i==2 || i==5) { //make new bishops
                board[0][i].addPiece(Bishop(i, 0, "black"))
                board[7][i].addPiece(Bishop(i, 0, "white"))
            }

            else if (i==3) { //make a new Queen 
                board[0][i].addPiece(Queen(i, 0, "black"))
                board[7][i].addPiece(Queen(i, 0, "white"))
            }

            else { //make a new King here
                board[0][i].addPiece(King(i, 0, "black")) 
                board[7][i].addPiece(King(i, 0, "white")) 
            }
        }

    }

    getBoard() {
        return this.board;
    }

    
   
    moveWhite() {

    }

    moveBlack() {

    }

    playMove() {
        numMoves++
    }

    isCheckMate() {
        
    }

    isCheck() {

    }

    isStaleMate() {

    }

    resign(){

    }

}          