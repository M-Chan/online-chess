import Square from "./Square.js";
import Pawn  from "./Pieces/Pawn.js";
import { Queen } from "./Pieces/Queen.js";
import Bishop from "./Pieces/Bishop.js";
import Knight from "./Pieces/Knight.js";
import Rook from "./Pieces/Rook.js";
import { King } from "./Pieces/King.js";

export default class ChessBoard {
    
    turn = "White's turn"

    constructor() {

        //making the actual chessboard array
        this.board = [...Array(8)].map((x, j) => {
            return Array(8).fill(null).map((y, i) => {
                return new Square(`${j}${i}`); //initialising all the square objects with their identifiers - these match with the ids of the divs
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

        for (let i=0; i<8; i++) { //making the initial pieces
            this.board[1][i].addPiece(new Pawn(1, i, "black", this.board));
            this.board[6][i].addPiece(new Pawn(6, i, "white", this.board));
            
            if (i==0 || i==7) { //make new rooks
                this.board[0][i].addPiece(new Rook(0, i, "black", this.board));
                this.board[7][i].addPiece(new Rook(7, i, "white", this.board)); 
            }
            else if (i==1 || i==6) { //make new knights
                this.board[0][i].addPiece(new Knight(0, i, "black", this.board));
                this.board[7][i].addPiece(new Knight(7, i, "white", this.board));
            }

            else if (i==2 || i==5) { //make new bishops
                this.board[0][i].addPiece(new Bishop(0, i, "black", this.board));
                this.board[7][i].addPiece(new Bishop(7, i, "white", this.board));
            }

            else if (i==3) { //make a new Queen 
                this.board[0][i].addPiece(new Queen(0, i, "black", this.board));
                this.board[7][i].addPiece(new Queen(7, i, "white", this.board));
            }

            else { //make a new King here
                this.board[0][i].addPiece(new King(0, i, "black", this.board)); 
                this.board[7][i].addPiece(new King(7, i, "white", this.board)); 
            }
        }

    }


    movePiece(s1,s2,d1,d2) { // d1 & d2 are destination coordinates and s1 & s2 are the source coordinates
        this.board[d1][d2].setPiece(this.board[s1][s2].removePiece());
        

        //after each move, the current turn changes
        if (this.turn === "White's turn") {
            this.turn = "Black's turn";
        }

        else {
            this.turn = "White's turn";
        }

        return this.turn;
    }

    clearSquare(id) {
        this.board[id.charAt(0)][id.charAt(1)].removePieceNoReturn();
    }

    whoseTurn() {
        return this.turn;
    }

    getSquare(id) {
        return this.board[id.charAt(0)][id.charAt(1)];
    }

    getBoard() {
        return this.board;
    }

    getPiece(id) {
        return this.board[id.charAt(0)][id.charAt(1)].getPiece();
    }


    //below is to make the new pieces when a pawn is promoted
    makeNewQueen(oI, iI, colour) {
        this.board[oI][iI].setPiece(new Queen(oI, iI, colour, this.board));
        return `${colour}Queen`;
    }

    makeNewKnight(oI, iI, colour) {
        this.board[oI][iI].setPiece(new Knight(oI, iI, colour, this.board));
        return `${colour}Knight`;
    }

    makeNewBishop(oI, iI, colour) {
        this.board[oI][iI].setPiece(new Bishop(oI, iI, colour, this.board));
        return `${colour}Bishop`;
    }

    makeNewRook(oI, iI, colour) {
        this.board[oI][iI].setPiece(new Rook(oI, iI, colour, this.board));
        return `${colour}Rook`;
    }


    // these 3 methods need to be done later on
    isCheckMate(colour) {
        //end the game and declare the winner

        if(colour === white) { //white wins
            document.getElementById("whiteWins").classList.remove("is--hidden");
        }

        else { //black wins
            document.getElementById("blackWins").classList.remove("is--hidden");
        }

        //stop all moves from working

    }

    isCheck() {
        //occurs when 'piece in danger' is a king (black or white) (logic written in Chess.js)

        //acknowledges that king is in check
        console.log("check function is correctly called"); //for testing to see if this is referred to correctly
        check(); // something doesn't work here

        //only allow moves that 'protect' the king
    }

    isStaleMate() {
        //end the game and declare it as a draw
        document.getElementById("drawStalemate").classList.remove("is--hidden");

        //stop all moves from working

    }
}          