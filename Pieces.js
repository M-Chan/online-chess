class ChessBoard {
    
    constructor() {
        this.board = [  [null,null,null,null,null,null,null,null], //top-left is [0][0]
                        [null,null,null,null,null,null,null,null], //black
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null], ]; //white
    }

    moveWhite() {

    }


    moveBlack() {

    }

    isCheckMate() {
        
    }

    isCheck() {

    }

    isStaleMate() {

    }

}          

let chessboard = new ChessBoard();


class Pawn {

    constructor(Xcoord,Ycoord, colour) {
        this.Xcoord = Xcoord;
        this.Ycoord = Ycoord;
        this.colour = colour;
        this.moves = 0; //number of moves that a piece has done
        this.description = `${colour} pawn`;
        this.availableMoves = 2;
    }

    upgrade() {

        if (this.colour === "black") {
            if (this.Xcoord === 7) {
                //upgrade this to a new piece
            }
        }


        else if (this.colour === 'white') { 
            if (this.Xcoord === 0) {
                //upgrade this to a new piece
            }        
        }

        else {
            continue
        }

    }

    move() {

        if (this.colour === "white") {
            if (this.moves === 0){
                //move up by two positions
                if (chessboard[this.Ycoord - 1] === null) {  //directly in front of the pawn
                    if(chessboard[this.Ycoord - 2] === null) {
                        
                    }
                }
                
            }

            else if ((chessboard[this.Ycoord -1][this.Xcoord - 1] != null) || (chessboard[this.Ycoord -1][this.Xcoord + 1] != null)) {
                // includes white movement and movement through capturing black pieces

                //check if those pieces are the opposite colour

            }

            else {
                
            }
        }
        

        else { //if the chess piece is black
            if (this.moves === 0){
                //move up by two positions
                if (chessboard[this.Ycoord + 1] === null || chessboard[this.Ycoord + 2] === null) {
                    
                }

                else {

                }
            }
        }

    
        this.upgrade();
    }
}

class King extends Pawn {

    constructor(Xcoord,Ycoord,colour) {
        super(Xcoord,Ycoord,colour);
        this.description = `${colour} King`;
        this.availableMoves = 0;
        this.check = false;

    }
    
    move(){

    }
    
    castle() {
        if (this.moves === 0 && !this.check) {
        // moves has to be 0, no check between king and rook, can't be in check
        }
    }
}


class Bishop {

}

class Knight {

}


class Rook extends Pawn {

}


class Queen extends Rook {

}