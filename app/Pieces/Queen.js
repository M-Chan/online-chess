import Pawn from "./Pawn.js"

export class Queen extends Pawn {

    constructor(oI, iI, colour, chessBoard) {
        super(oI, iI, colour, chessBoard)
        this.description = `${colour} queen`
    }

    move(){

        this.aML = []

        let colour
        let square

        for (let i=0; i<8; i++){ //starting from the top and rotating clockwise
            
            let inner = this.iI
            let outer = this.oI
            
            if (i === 0) outer--
            else if (i === 1){ inner++; outer-- } 
            else if (i === 2) inner++
            else if (i === 3){ inner++; outer++ } 
            else if (i === 4) outer++
            else if (i === 5){ outer++; inner--; }
            else if (i === 6) inner--
            else if (i === 7){ inner--; outer-- } 


            while ((inner <= 7) && (outer <= 7) && (inner >= 0) && (outer >= 0)){ //starting from the top and rotating clockwise

                square = this.chessBoard[outer][inner]
                colour = square.whichColourPiece()

                if (colour === this.colour){ //if it contains the same colour piece
                    break
                }
                
                else if(colour !== "empty" && colour !== this.colour){ //when it contains an enemy piece
                    this.aML.push([outer,inner])
                    break;
                }

                else { //when the square is empty
                    this.aML.push([outer,inner])
                    
                    if (i === 0) outer--
                    else if (i === 1){ inner++; outer-- } 
                    else if (i === 2) inner++
                    else if (i === 3){ inner++; outer++ } 
                    else if (i === 4) outer++
                    else if (i === 5){ outer++; inner--; }
                    else if (i === 6) inner--
                    else if (i === 7){ inner--; outer-- } 
                }
            }

        }

        return this.aML

    }

}