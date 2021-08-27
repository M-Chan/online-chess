import Square from "./Square.js"
import Pawn  from "./Pieces/Pawn.js";
import { Queen } from "./Pieces/Queen.js";
import Bishop from "./Pieces/Bishop.js";
import Knight from "./Pieces/Knight.js";
import Rook from "./Pieces/Rook.js";
import { King } from "./Pieces/King.js";

export default class ChessBoard {
    
    numMoves = 0
    activeSquare = null //this will be the square object that a user has clicked on

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
            this.board[1][i].addPiece(new Pawn(i, 1, "black")) 
            this.board[6][i].addPiece(new Pawn(i, 6, "white")) 
            
            if (i==0 || i==7) { //make new rooks
                this.board[0][i].addPiece(new Rook(i, 0, "black")) 
                this.board[7][i].addPiece(new Rook(i, 0, "white")) 
            }
            else if (i==1 || i==6) { //make new knights
                this.board[0][i].addPiece(new Knight(i, 0, "black"))
                this.board[7][i].addPiece(new Knight(i, 0, "white"))
            }

            else if (i==2 || i==5) { //make new bishops
                this.board[0][i].addPiece(new Bishop(i, 0, "black"))
                this.board[7][i].addPiece(new Bishop(i, 0, "white"))
            }

            else if (i==3) { //make a new Queen 
                this.board[0][i].addPiece(new Queen(i, 0, "black"))
                this.board[7][i].addPiece(new Queen(i, 0, "white"))
            }

            else { //make a new King here
                this.board[0][i].addPiece(new King(i, 0, "black")) 
                this.board[7][i].addPiece(new King(i, 0, "white")) 
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