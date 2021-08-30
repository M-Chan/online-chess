export default class Pawn {

    constructor(oI, iI, colour, chessBoard) {
        this.oI = oI; //outer index
        this.iI = iI; //inner index
        this.colour = colour;
        this.moves = 0;  //number of moves that a piece has done
        this.chessBoard = chessBoard  //pass in the chessBoard object
        this.aML = []  //aML = availableMoveLocations

        // this.description = `${colour} pawn`;
        // this.availableMoves = 2;
        // this.active = false;
    }

    upgrade() {
        if (this.colour === "black" && this.oI === 7) {
            let newPiece = prompt("Which piece would you like to upgrade to, enter 'k' 'b' 'r' or 'q'?", "q").toLowerCase();
            //upgrade this to a new piece

            //remove this piece array[y][x] = null
                
            //make new knight/bishop/rook/queen at this location
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

    updateLocation(oI, iI) {
        this.oI = oI;
        this.iI = iI;
    }

    increaseMoves() {
        this.moves++;
     }

    // [ [00, 01, 02, 03, 04, 05, 06, 07],      top-left is [0][0] = A8, bottom right is[7][7] = H1
    //   [10, 11, 12, 13, 14, 15, 16, 17],      black side
    //   [20, 21, 22, 23, 24, 25, 26, 27],
    //   [30, 31, 32, 33, 34, 35, 36, 37],
    //   [40, 41, 42, 43, 44, 45, 46, 47],
    //   [50, 51, 52, 53, 54, 55, 56, 57],
    //   [60, 61, 62, 63, 64, 65, 66, 67],      white side
    //   [70, 71, 72, 73, 74, 75, 76, 77]  ]


    possibleCaptures() {
        if (this.colour === "white"){
            try {
                if ((this.chessBoard[this.oI-1][this.iI-1]).containsBlack()) { //"capturable" position (top left)
                    this.aML.push([this.oI-1,this.iI-1])
                } 
            }
            catch (error) {}

            try {
                if((this.chessBoard[this.oI-1][this.iI+1]).containsBlack()) { //"capturable" position (top right)
                    this.aML.push([this.oI-1,this.iI+1])
                }
            } 
            catch (error) {}
        }

        else { //for black
            try {
                if ((this.chessBoard[this.oI+1][this.iI-1]).containsWhite()) { //"capturable" position (top left)
                    this.aML.push([this.oI+1,this.iI-1])
                }
            }
            catch (error) {}

            try {
                if((this.chessBoard[this.oI+1][this.iI+1]).containsWhite()) { //"capturable" position (top right)
                    this.aML.push([this.oI+1,this.iI+1])
                }
            }
            catch (error) {}
        }
    }
    

    firstMove(){
        if (this.colour === "white"){
            if (this.chessBoard[this.oI-1][this.iI].isEmpty()){      //one square ahead
                this.aML.push([this.oI-1,this.iI])


                if ((this.chessBoard[this.oI-2][this.iI]).isEmpty()) { //two squares ahead
                    this.aML.push([this.oI-2,this.iI])
                    //console.log("two moves")
                }
            }
        }

        else { //when it's a black pawn

            if ((this.chessBoard[this.oI+1][this.iI]).isEmpty()){      //one square ahead
                this.aML.push([this.oI+1,this.iI])

                if ((this.chessBoard[this.oI+2][this.iI]).isEmpty()) { //two squares ahead
                    this.aML.push([this.oI+2,this.iI])
                }
            }
        }

        //console.log(this.aML)
        this.possibleCaptures()
        //console.log("sent the array to chess.js")
        return this.aML
    }

    move() { //this method also incorporates capture
        //console.log(`${this.oI}${this.iI}`)
        this.aML = []

        if (this.moves === 0){
            //console.log("first move")
            return this.firstMove()
        }

        else { // second move onwards
            this.possibleCaptures();

            if (this.colour === "white") {
                if ((this.chessBoard[this.oI-1][this.iI]).isEmpty()) { //one square ahead
                    this.aML.push([this.oI-1,this.iI])
                }
            }

            else { //if the chess piece is black
                if ((this.chessBoard[this.oI+1][this.iI]).isEmpty()) { //one square ahead (downwards according to ui)
                    this.aML.push([this.oI+1,this.iI])
                }
            }
            return this.aML;
        }
    }



}