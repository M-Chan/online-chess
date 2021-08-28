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
                //return new Square(`${String.fromCharCode(65 + i)}${8 - j}`) 
                return new Square(`${j}${i}`) //initialising all the square objects with their identifiers - these match with the ids of the divs
            })
        })

        // [ [00, 01, 02, 03, 04, 05, 06, 07],      top-left is [0][0] = A8, bottom right is[7][7] = H1
        //   [10, 11, 12, 13, 14, 15, 16, 17],      black side
        //   [20, 21, 22, 23, 24, 25, 26, 27],
        //   [30, 31, 32, 33, 34, 35, 36, 37],
        //   [40, 41, 42, 43, 44, 45, 46, 47],
        //   [50, 51, 52, 53, 54, 55, 56, 57],
        //   [60, 61, 62, 63, 64, 65, 66, 67],      white side
        //   [70, 71, 72, 73, 74, 75, 76, 77]  ]

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


    movePiece(s1,s2,d1,d2) { // d1 & d2 are destination coordinates and s1 & s2 are the source coordinates
        this.board[d1][d2].setPiece(this.board[s1][s2].removePiece())
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