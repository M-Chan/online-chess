class Square {

    active = false

    constructor(piece,identifier) {
        this.piece = piece  //the actual pawn object
        this.identifier = identifier
    }

    addPiece(piece) {
        this.piece = piece
    }

    removePiece(){
        this.piece = null
    }

    setActive() {
        this.active = true
    }

    setUnActive(){
        this.active = false
    }

}


class ChessBoard {
    
    numMoves = 0;
    files = ["a", "b", "c", "d", "e", "f", "g", "h"]
    
    constructor() {
        this.board = [  [null,null,null,null,null,null,null,null], //top-left is [0][0] = a8
                        [null,null,null,null,null,null,null,null], //black
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null]  ]; //white

    for (let i=0; i<8; i++) {
        board[1][i] = new Square(Pawn(i, 1, "black"), files[i] + "7")
        board[6][i] = new Square(Pawn(i, 6, "white"), files[i] + "2")
        
        if (i==0 || i==7) { //make a new rook
            board[0][i] = newSquare(Rook(i, 0, "black"), files[i] + "8")
            board[7][i] = newSquare(Rook(i, 0, "white"), files[i] + "1")
        }
        else if (i==1 || i==6) { //make a new knight
            board[0][i] = newSquare(Knight(i, 0, "black"), files[i] + "8")
            board[7][i] = newSquare(Knight(i, 0, "white"), files[i] + "1")
        }

        else if (i==2 || i==5) { //make a new bishop
            board[0][i] = newSquare(Bishop(i, 0, "black"), files[i] + "8")
            board[7][i] = newSquare(Bishop(i, 0, "white"), (files[i] + "1"))
        }

        else if (i==3) { //make a new Queen here
            board[0][i] = newSquare(Queen(i, 0, "black"), (files[i] + "8"))
            board[7][i] = newSquare(Queen(i, 0, "white"), (files[i] + "1"))
        }

        else { //make a new King here
            board[0][i] = newSquare(King(i, 0, "black"), (files[i] + "8"))
            board[7][i] = newSquare(King(i, 0, "white"), (files[i] + "1"))
        }
    }


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
        this.active = false;
    }

    canMoveTo() {

    }

    upgrade() {

        if (this.colour === "black") {
            if (this.Xcoord === 7) {
                //upgrade this to a new piece

                //remove this piece array[y][x] = null
                
                //make new knight/bishop/rook/queen at this location
                let newPiece = prompt("Which piece would you like to upgrade to, enter 'k' 'b' 'r' or 'q'?", "q");

                switch(newPiece) {
                    case k:
                        //knight
                        break;
                    case b:
                        //bishop
                        break;
                    case r:
                        //rook
                        break;
                    case q:
                        //queen
                        break;
                    default:
                        //queen
                }

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

    move() { //this method also incorporates capture

        if (this.colour === "white") {
            if (this.moves === 0){
                //move up by two positions
                if (chessboard[this.Ycoord - 1] === null) {  //directly in front of the pawn
                    if(chessboard[this.Ycoord - 2] === null) {
                        //pawn could move 2 spaces forward - we have to ask user if they want to move 1 or 2 ahead

                        //input - where the user clicks

                        //check the logic of it (i.e. cannot move three to the right)

                        // if (this.canMoveTo(x,y)){
                            
                        
                    }
                }
                
            }

            else if ((chessboard[this.Ycoord -1][this.Xcoord - 1] != null) || (chessboard[this.Ycoord -1][this.Xcoord + 1] != null)) {
                // includes white movement and movement through capturing black pieces
                //en passante
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
    constructor(Xcoord,Ycoord, colour) {
        this.Xcoord = Xcoord;
        this.Ycoord = Ycoord;
        this.colour = colour;
        this.moves = 0; //number of moves that a piece has done
        this.description = `${colour} knight`;
        this.availableMoves = 2;
    }


    move() {

        if (this.colour === "white") {
            if ((chessboard[this.Ycoord - 2][this.Xcoord - 1] === null) || (chessboard[this.Ycoord - 2][this.Xcoord + 1] === null)){
                    
                }
                
        }
        

        else { //if the chess piece is black
            
        }

    }
}


class Rook extends Pawn {
    
    constructor(Xcoord,Ycoord,colour) {
        super(Xcoord,Ycoord,colour);
        this.description = `${colour} Rook`;
        this.availableMoves = 0;

    }
    
    move(){

    }

}


class Queen extends Rook {

}