import ChessBoard from "./Chessboard.js"

const chessBoard = new ChessBoard();

// all the global variables used in this program
let activeSquare;
let movedTo;
let chessPiece; //for en passant it is the piece that has been moved
let chessPiece2; //for en passant, it is the captured piece
let chessPiece3; //the piece we are moving
let availableMoveLocations;
let HTMLElement;
let piece;
let description;
let result;
let whoseTurn;
let pieceObj;
let lastActiveSquares = [];

let legalMoves = 0
let checkmate = false;

const piecesClass =   ["whitePawn", "blackPawn", "whiteRook", "blackRook", "whiteKing", "blackKing", "whiteQueen", "blackQueen", "whiteBishop", "blackBishop","whiteKnight", "blackKnight"];
                   
const turnElement =  document.getElementById("turn");

let availableSquareDiv = document.createElement("div");
availableSquareDiv.classList.add("availableSquares");


function removeAvailableSquares() {

    availableMoveLocations.forEach(element => {
        document.getElementById(`${element[0]}${element[1]}`).classList.remove("pieceInDanger", "enPassant", "castle");

        try {
            document
            .getElementById(`${element[0]}${element[1]}`)
            .removeChild(document
              .getElementById(`${element[0]}${element[1]}`).firstChild);
            }
        catch (error) {}
    })

    // document.querySelectorAll('.availableSquares').forEach(item => {
    //     item.classList.remove("availableSquares", "pieceInDanger", "enPassant");

    // })

    document.querySelectorAll('.availableSquares').forEach(item => {
        item.classList.remove("availableSquares", "pieceInDanger", "enPassant")
    })
}

// if the piece is a pawn and it has made over 5 moves then check it has reached the edge of the board and call the upgrade method
function checkPawnUpgrade(item, chessObj) { //item is a HTML DOM element and the second is a string describing the piece

    piece = chessBoard.getPiece(item.id); //find out what the piece is
    
    // check that the piece is a pawn that has reached the end of board
    if (((piece.description === "whitePawn") && (piece.oI === 0)) || ((piece.description === "blackPawn") && (piece.oI === 7))) { 
        
        result = piece.upgrade();  //NOTE: result only contains the first character of the string returned

        //to reflect this change in the 2D array on the actual chessboard
        switch(result) {
            case "k":
                description = chessBoard.makeNewKnight(piece.oI, piece.iI, piece.colour);         
                break;

            case "b":
                description = chessBoard.makeNewBishop(piece.oI, piece.iI, piece.colour);
                break;

            case "r":
                description = chessBoard.makeNewRook(piece.oI, piece.iI, piece.colour);
                break;

            case "q":
                description = chessBoard.makeNewQueen(piece.oI, piece.iI, piece.colour);
                break;

            default:
                checkPawnUpgrade(item, chessObj); //calling recursively until a valid input is given
        }
        
        //reflecting this change on output chessboard (what the user / player sees)
        item.classList.remove(chessObj);
        item.classList.add(description);
    }
    else return //if the piece is not a pawn then we don't want to do anything
}

function updateChessPiece(item) {

    lastActiveSquares.unshift(activeSquare);

    try {
        lastActiveSquares[0].classList.add("lastLocation");
        lastActiveSquares[1].classList.remove("lastLocation");
    }
    catch (error) {}

    while (lastActiveSquares.length > 2) {
        lastActiveSquares.pop();
    }

    availableMoveLocations=[];
    pieceObj = chessBoard.getPiece(activeSquare.id);
    pieceObj.increaseMoves();
    pieceObj.updateLocation(Number(item.id.charAt(0)), Number(item.id.charAt(1)));

    //this method updates the 2D array so that whatever the user has done is reflected in the data structure
    whoseTurn = chessBoard.movePiece(activeSquare.id.charAt(0), activeSquare.id.charAt(1), item.id.charAt(0), item.id.charAt(1));
    document.getElementById("turn").innerText = whoseTurn; //tells the user whose turn it is
}


function deactivateActiveSquare() {
    activeSquare.classList.remove("activeSquare");
    removeAvailableSquares();
}


function updateThreatenedPositions() {
    const squares = document.querySelectorAll('.piece'); //creates an array of all the squares on the chessboard
    
    squares.forEach(item => { //unthreatening every square --> no more check
        chessBoard.getSquare(item.id).unthreaten();
        document.getElementById(item.id).parentElement.classList.remove("kingInCheck")
        try {chessBoard.getPiece(item.id).unCheck()}
        catch (error) {}
    })

    document.getElementById("checkText").classList.add("is--hidden");

    squares.forEach(item => { 
        //threaten the squares in line of attack
        try {
            chessBoard.getPiece(item.id).threaten(); 
        }
        catch (error) {}
    })

    updateLegalMoves()

    squares.forEach(item => { //checking for check
        //console.log(chessBoard.getSquare(item.id).threatenedByBlack);
        
        try {
            if (((chessBoard.getPiece(item.id).description === "whiteKing") && (chessBoard.getSquare(item.id).threatenedByBlack)) || ((chessBoard.getPiece(item.id).description === "blackKing") && (chessBoard.getSquare(item.id).threatenedByWhite))) {
                document.getElementById("checkText").classList.remove("is--hidden"); //tell the user / player that check has occured
                document.getElementById(item.id).parentElement.classList.add("kingInCheck"); //tell the user / player which king is in check
                
                try {
                    if (legalMoves === 0) { //checkmate
                        checkmate = true; // declares checkmate as true and stops stalemate from showing
                        chessBoard.isCheckMate(chessBoard.getPiece(item.id).colour); //calls checkmate function in the Chessboard.js file
                    }
                    else { //check
                        chessBoard.getPiece(item.id).inCheck(); //calls check function in the King.js file
                        chessBoard.isCheck(); //calls check function in the Chessboard.js file
                    }
                }
                catch (error) {
                    console.log("there was an error");
                }
            } 
        }
        catch (error) {}
    })

    if (legalMoves === 0 && !checkmate) {// stalemate
        console.log("stalemate");
        chessBoard.isStaleMate(); //calls stalemate function in the Chessboard.js file
    }
}   

function updateLegalMoves() {
    legalMoves = 30;

    document.querySelectorAll('.piece').forEach(item => { 
        // looks for legal moves
        try {
            chessBoard.getPiece(item.id).testCanMove(); // this is probably not needed
            legalMoves += chessBoard.getPiece(item.id).testCanMove();
            //console.log(chessBoard.getPiece(item.id).testCanMove()); // access returned legalMovesNo
        }
        catch (error) {
            //console.log("there was an error finding legal moves");
        }
    })

    console.log("legal moves:", legalMoves)
}


document.querySelectorAll('.piece').forEach(item => {item.addEventListener('click', () => {
    //whatever is here is executed whenever a square is clicked

    whoseTurn = chessBoard.whoseTurn().substring(0,5).toLocaleLowerCase(); // is equal to either "white" or "black"

    //when activeSquare is defined and the other square has a piece (i.e. a capture)
    if (!item.classList.contains("empty") && item.hasChildNodes()) { 
        
        //console.log("capture")

        //colour of the piece we want to capture must be different to the piece we want to move
        if (chessBoard.getPiece(activeSquare.id).getColour() !== chessBoard.getPiece(item.id).getColour()) {
            chessPiece = ($(item).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)).toString(); //captured piece
            chessPiece2 = ($(activeSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)).toString(); //capturing piece
            // the jQuery code ABOVE returns an array but we need a string and hence the .toString() method is used 

            //reflect the capture in terms of ui and what the user / player sees
            item.classList.remove(chessPiece);
            activeSquare.classList.remove(chessPiece2);
            activeSquare.classList.remove("activeSquare");
            activeSquare.classList.add("empty");
            item.classList.add(chessPiece2);

            removeAvailableSquares();
            updateChessPiece(item);

            //check if the piece is a pawn and if it is eligible to be upgraded
            checkPawnUpgrade(item, chessPiece2)

            //after the move we don't want any piece to be active
            activeSquare = undefined;
            movedTo = undefined;
        }
    }

    // making the move - //if empty and active square is defined - can only move to a valid square
    else if (item.classList.contains("empty") && activeSquare !== undefined) { 

        if (item.hasChildNodes()) {
            //console.log("moving to empty square");
            chessPiece = ($(activeSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)).toString();
            // the jQuery code ABOVE returns an array but we need a string and hence the .toString() method is used 
            
            movedTo = item;

            //reflect the move in terms of ui and what the user / player sees
            item.classList.remove("empty");
            activeSquare.classList.remove(chessPiece);
            activeSquare.classList.remove("activeSquare");
            activeSquare.classList.add("empty");
            item.classList.add(chessPiece);

            //for en passant captures
            if (item.classList.contains("enPassant")) {
                
                if (chessPiece === "whitePawn") {
                    let belowActiveSquare = document.getElementById(`${Number(item.id.charAt(0))+1}${item.id.charAt(1)}`);
                    chessPiece2 = ($(belowActiveSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)).toString();

                    //console.log(chessPiece);
                    //console.log("2", chessPiece2);

                    belowActiveSquare.classList.remove(chessPiece2);
                    chessBoard.clearSquare(belowActiveSquare.id); //we also update the 2D array to reflect that this en-passant capture
                    belowActiveSquare.classList.add("empty");
                }

                else { //must be a black piece then
                    let aboveActiveSquare = document.getElementById(`${Number(item.id.charAt(0))-1}${item.id.charAt(1)}`);
                    chessPiece2 = ($(aboveActiveSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)).toString();
                    aboveActiveSquare.classList.remove(chessPiece2);
                    chessBoard.clearSquare(aboveActiveSquare.id); //we also update the 2D array to reflect that this en-passant capture
                    aboveActiveSquare.classList.add("empty");
                }
            }

            //for castling...
            if(item.classList.contains("castle")) {
                if (chessPiece3.castlingQueen && chessPiece3.castlingKing) { //when both castling options are available
                    console.log("can castle both sides")

                    if ((movedTo.id === "02") || (movedTo.id === "72")) {
                        QueenCastle();
                    }
                    else KingCastle();
                }

                else if (chessPiece3.castlingQueen) { //for queen-side castling only
                    QueenCastle();
                }

                else { //for king-side castling only
                    KingCastle();
                }  

                function QueenCastle() {
                    //console.log(activeSquare, movedTo)
                    if (chessPiece === "whiteKing") { //for white player castling
                        let rookSquareToMove = document.getElementById("70");
                        let rookSquareToMoveTo = document.getElementById("73");
                        rookSquareToMove.classList.remove("whiteRook");
                        // console.log(rookSquareToMove.id);
                        // console.log(rookSquareToMove);
                        rookSquareToMove.classList.add("empty");
                        rookSquareToMoveTo.classList.remove("empty");
                        rookSquareToMoveTo.classList.add("whiteRook");

                        //update the 2D array to reflect the castling
                        chessBoard.clearSquare(rookSquareToMove.id); 
                        chessBoard.makeNewRook(7, 3, 'white');
                    }

                    else { //for black player castling
                        let rookSquareToMove = document.getElementById("00");
                        let rookSquareToMoveTo = document.getElementById("03");

                        rookSquareToMove.classList.remove("blackRook");
                        rookSquareToMove.classList.add("empty");
                        rookSquareToMoveTo.classList.remove("empty");
                        rookSquareToMoveTo.classList.add("blackRook");

                        chessBoard.clearSquare(rookSquareToMove.id); 
                        chessBoard.makeNewRook(0, 3, 'black');
                    }
                }  

                function KingCastle() { //for king-side castling only
                    if (chessPiece === "whiteKing") { //for white player castling
                        let rookSquareToMove = document.getElementById("77");
                        let rookSquareToMoveTo = document.getElementById("75");
                        rookSquareToMove.classList.remove("whiteRook");
                        // console.log(rookSquareToMove.id);
                        // console.log(rookSquareToMove);
                        rookSquareToMove.classList.add("empty");
                        rookSquareToMoveTo.classList.remove("empty");
                        rookSquareToMoveTo.classList.add("whiteRook");

                        //update the 2D array to reflect the castling
                        chessBoard.clearSquare(rookSquareToMove.id);
                        chessBoard.makeNewRook(7, 5, 'white');
                    }

                    else { //for black player castling
                        let rookSquareToMove = document.getElementById("07");
                        let rookSquareToMoveTo = document.getElementById("05");

                        rookSquareToMove.classList.remove("blackRook");
                        rookSquareToMove.classList.add("empty");
                        rookSquareToMoveTo.classList.remove("empty");
                        rookSquareToMoveTo.classList.add("blackRook");

                        chessBoard.clearSquare(rookSquareToMove.id); 
                        chessBoard.makeNewRook(0, 5, 'black');
                    }
                }

                //for testing...
                // console.log(chessPiece);
                // console.log(chessPiece2);
                // console.log(chessPiece3);
            }

            removeAvailableSquares();
            updateChessPiece(item);
            
            //check if the piece is a pawn and if it is eligible to be upgraded
            checkPawnUpgrade(item, chessPiece);
            
            //update which squares are under attack after the movement and check if the move causes the opponent to be in check
            updateThreatenedPositions();
            //console.log("updating threatened positions");

            //after the move we don't want any piece to be active
            activeSquare = undefined;
            movedTo = undefined;
        }

        else {
            activeSquare.classList.remove("activeSquare");
            activeSquare = undefined;
            movedTo = undefined;
            removeAvailableSquares();
        }
    }

    //selecting the active square
    else if (!item.classList.contains("empty")) { //not empty then make it active square
        
        // console.log(chessBoard.getPiece(item.id).description === "whitePawn");
        // console.log(chessBoard.getPiece(item.id));
        // console.log(item.id);

        if (chessBoard.getPiece(item.id).getColour() == whoseTurn) {
        
            turnElement.classList.remove("wrongTurn");
        
            if (item.classList.contains("activeSquare")) {
                deactivateActiveSquare();
                return;
            }
            
            else if (activeSquare !== undefined) {
                deactivateActiveSquare();
            }

            activeSquare = item;
            activeSquare.classList.add("activeSquare");
            
            //getting all the locations that the this piece is able to move to
            availableMoveLocations = chessBoard.getPiece(activeSquare.id).move();
            
            //this is the actual piece object that the user is interested in moving
            chessPiece3 = chessBoard.getPiece(activeSquare.id);
    
            //marking all these locations on the chessboard with the "availableSquares class so they are marked with a green circle in them"
            availableMoveLocations.forEach(element => {
                HTMLElement = document.getElementById(`${element[0]}${element[1]}`);

                
                if (!HTMLElement.classList.contains("empty")){
                    HTMLElement.classList.add("pieceInDanger"); //if there's a piece then we make it red to show that it can be captured
                }

                else if (chessPiece3.colour === "white") {
                    // show that en passant can occur
                    if (chessPiece3.enPassantRight) {
                        document.getElementById(`${Number(activeSquare.id.charAt(0))-1}${Number(activeSquare.id.charAt(1))+1}`).classList.add("enPassant");
                    }
                    else if (chessPiece3.enPassantLeft) {
                        document.getElementById(`${Number(activeSquare.id.charAt(0))-1}${Number(activeSquare.id.charAt(1))-1}`).classList.add("enPassant");
                    }

                    // show that castling can occur
                    else if (chessPiece3.castlingQueen) {
                        document.getElementById(`${Number(activeSquare.id.charAt(0))}${Number(activeSquare.id.charAt(1))-2}`).classList.add("castle");
                        if (chessPiece3.castlingKing) { //Both Queen AND King side castling available
                            document.getElementById(`${Number(activeSquare.id.charAt(0))}${Number(activeSquare.id.charAt(1))+2}`).classList.add("castle");
                        }
                    }
                    else if (chessPiece3.castlingKing) {
                        document.getElementById(`${Number(activeSquare.id.charAt(0))}${Number(activeSquare.id.charAt(1))+2}`).classList.add("castle");
                    }
                }

                //if it's a black chess piece
                else { 
                    if (chessPiece3.enPassantRight) {
                        document.getElementById(`${Number(activeSquare.id.charAt(0))+1}${Number(activeSquare.id.charAt(1))+1}`).classList.add("enPassant");
                    }
                    else if(chessPiece3.enPassantLeft) {
                        document.getElementById(`${Number(activeSquare.id.charAt(0))+1}${Number(activeSquare.id.charAt(1))-1}`).classList.add("enPassant");
                    }

                    else if (chessPiece3.castlingQueen) {
                        document.getElementById(`${Number(activeSquare.id.charAt(0))}${Number(activeSquare.id.charAt(1))-2}`).classList.add("castle");
                        if (chessPiece3.castlingKing) { //Both Queen AND King side castling available
                            document.getElementById(`${Number(activeSquare.id.charAt(0))}${Number(activeSquare.id.charAt(1))+2}`).classList.add("castle");
                        }
                    }
                    else if (chessPiece3.castlingKing) {
                        document.getElementById(`${Number(activeSquare.id.charAt(0))}${Number(activeSquare.id.charAt(1))+2}`).classList.add("castle");
                    }
                }
                HTMLElement.appendChild(availableSquareDiv.cloneNode(true));
            })
        }

        else {
            // if the worng player is trying to move...
            turnElement.className = "wrongTurn";
        }
    }
})})