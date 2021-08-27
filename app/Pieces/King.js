import Pawn from "./Pawn.js"

export class King extends Pawn {

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