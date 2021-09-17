import ChessBoard from "./Chessboard.js";

const chessBoard = new ChessBoard();

// all the global variables used in this program
let activeSquare;
let chessPiece; //for en passant it is the piece that has been moved
let chessPiece2; //for en passant, it is the captured piece
let availableMoveLocations;
let HTMLElement;
let piece;
let description;
let result;
let whoseTurn;
let pieceObj;
let lastActiveSquares = [];
let legalMoves = 0;
let checkmate = false;
let rookSquareToMove;
let rookSquareToMoveTo;

const turnElement = document.getElementById("turn");

const piecesClass = [
  "whitePawn",
  "blackPawn",
  "whiteRook",
  "blackRook",
  "whiteKing",
  "blackKing",
  "whiteQueen",
  "blackQueen",
  "whiteBishop",
  "blackBishop",
  "whiteKnight",
  "blackKnight",
];

availableSquareDiv = document.createElement("div");
availableSquareDiv.classList.add("availableSquares");

function removeAvailableSquares() {
  availableMoveLocations.forEach((element) => {
    document
      .getElementById(`${element[0]}${element[1]}`)
      .classList.remove("availableSquares", "pieceInDanger", "enPassant", "castle");
  });
}

// if the piece is a pawn and it has made over 5 moves then check it has reached the edge of the board and call the upgrade method
function checkPawnUpgrade(item, chessObj) {
  //item is a HTML DOM element and the second is a string describing the piece
  piece = chessBoard.getPiece(item.id); //find out what the piece is

  // check that the piece is a pawn that has reached the end of board
  if ((piece.description === "whitePawn" && piece.oI === 0) || (piece.description === "blackPawn" && piece.oI === 7)) {
    result = piece.upgrade(); //NOTE: result only contains the first character of the string returned

    //to reflect this change in the 2D array on the actual chessboard
    switch (result) {
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
  } else return; //if the piece is not a pawn then we don't want to do anything
}

function updateChessPiece(item) {
  //updates chess piece and also the chessboard object
  lastActiveSquares.unshift(activeSquare);

  try {
    lastActiveSquares[0].classList.add("lastLocation");
    lastActiveSquares[1].classList.remove("lastLocation");
  } catch (error) {}

  while (lastActiveSquares.length > 2) {
    lastActiveSquares.pop();
  }

  availableMoveLocations = [];
  pieceObj = chessBoard.getPiece(activeSquare.id);
  pieceObj.increaseMoves();
  pieceObj.updateLocation(Number(item.id.charAt(0)), Number(item.id.charAt(1)));

  //this method updates the 2D array so that whatever the user has done is reflected in the data structure
  whoseTurn = chessBoard.movePiece(
    activeSquare.id.charAt(0),
    activeSquare.id.charAt(1),
    item.id.charAt(0),
    item.id.charAt(1)
  );
  document.getElementById("turn").innerText = whoseTurn; //tells the user whose turn it is
}

function deactivateActiveSquare() {
  activeSquare.classList.remove("activeSquare");
  removeAvailableSquares();
}

////////////////////////////////////////////////////////////////////////////////////////TingTing's Functions

function updateThreatenedPositions() {
  const squares = document.querySelectorAll(".piece"); //creates an array of all the squares on the chessboard

  //document.querySelectorAll(".kingInCheck").classList.remove("kingInCheck");

  squares.forEach((item) => {
    //unthreatening every square --> no more check
    chessBoard.getSquare(item.id).unthreaten();
    document.getElementById(item.id).parentElement.classList.remove("kingInCheck");
    try {
      chessBoard.getPiece(item.id).unCheck();
    } catch (error) {}
  });

  document.getElementById("checkText").classList.add("is--hidden");

  squares.forEach((item) => {
    //threaten the squares in line of attack
    try {
      chessBoard.getPiece(item.id).threaten();
    } catch (error) {}
  });

  updateLegalMoves();

  squares.forEach((item) => {
    //checking for check
    //console.log(chessBoard.getSquare(item.id).threatenedByBlack);

    try {
      if (
        (chessBoard.getPiece(item.id).description === "whiteKing" && chessBoard.getSquare(item.id).threatenedByBlack) ||
        (chessBoard.getPiece(item.id).description === "blackKing" && chessBoard.getSquare(item.id).threatenedByWhite)
      ) {
        document.getElementById("checkText").classList.remove("is--hidden"); //tell the user / player that check has occured
        document.getElementById(item.id).parentElement.classList.add("kingInCheck"); //tell the user / player which king is in check

        try {
          if (legalMoves === 0) {
            //checkmate
            checkmate = true; // declares checkmate as true and stops stalemate from showing
            chessBoard.isCheckMate(chessBoard.getPiece(item.id).colour); //calls checkmate function in the Chessboard.js file
          } else {
            //check
            chessBoard.getPiece(item.id).inCheck(); //calls check function in the King.js file
            chessBoard.isCheck(); //calls check function in the Chessboard.js file
          }
        } catch (error) {
          console.log("there was an error");
        }
      }
    } catch (error) {}
  });

  if (legalMoves === 0 && !checkmate) {
    // stalemate
    console.log("stalemate");
    chessBoard.isStaleMate(); //calls stalemate function in the Chessboard.js file
  }
}

function updateLegalMoves() {
  //checking for pinned pieces - we can't move a piece if that results in check
  legalMoves = 0;

  document.querySelectorAll(".piece").forEach((item) => {
    // looks for legal moves
    try {
      chessBoard.getPiece(item.id).testCanMove(); // this is probably not needed
      legalMoves += chessBoard.getPiece(item.id).testCanMove();
      //console.log(chessBoard.getPiece(item.id).testCanMove()); // access returned legalMovesNo
    } catch (error) {
      //console.log("there was an error finding legal moves");
    }
  });

  console.log("legal moves:", legalMoves);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function getPiecefromHTMLElement(square) {
  //the argument is a HTMLElement (as the name suggests)
  return $(square)
    .attr("class")
    .split(/\s+/)
    .filter((value) => piecesClass.includes(value))
    .toString(); //captured piece

  // the jQuery code ABOVE returns an array but we need a string and hence the .toString() method is used
}

function castling(piece) {
  rookSquareToMove.classList.remove(piece);
  rookSquareToMove.classList.add("empty");
  rookSquareToMoveTo.classList.remove("empty");
  rookSquareToMoveTo.classList.add(piece);
}

function enPassantSquares(colour) {
  //shows the squares that can moved to using en passant
  if (colour == "white") {
    if (chessPiece.enPassantRight) {
      document
        .getElementById(`${Number(activeSquare.id.charAt(0)) - 1}${Number(activeSquare.id.charAt(1)) + 1}`)
        .classList.add("enPassant");
    } else if (chessPiece.enPassantLeft) {
      document
        .getElementById(`${Number(activeSquare.id.charAt(0)) - 1}${Number(activeSquare.id.charAt(1)) - 1}`)
        .classList.add("enPassant");
    }
  } else {
    if (chessPiece.enPassantRight) {
      document
        .getElementById(`${Number(activeSquare.id.charAt(0)) + 1}${Number(activeSquare.id.charAt(1)) + 1}`)
        .classList.add("enPassant");
    } else if (chessPiece.enPassantLeft) {
      document
        .getElementById(`${Number(activeSquare.id.charAt(0)) + 1}${Number(activeSquare.id.charAt(1)) - 1}`)
        .classList.add("enPassant");
    }
  }
}

function castlingSquares(colour) {
  //shows the squares that can moved to using en passant
  if (colour == "white") {
    if (chessPiece.castlingQueen) {
      document
        .getElementById(`${Number(activeSquare.id.charAt(0))}${Number(activeSquare.id.charAt(1)) - 3}`)
        .classList.add("castle");
    } else if (chessPiece.castlingKing) {
      document
        .getElementById(`${Number(activeSquare.id.charAt(0))}${Number(activeSquare.id.charAt(1)) + 2}`)
        .classList.add("castle");
    }
  } else {
    if (chessPiece.castlingQueen) {
      document
        .getElementById(`${Number(activeSquare.id.charAt(0))}${Number(activeSquare.id.charAt(1)) - 3}`)
        .classList.add("castle");
    } else if (chessPiece.castlingKing) {
      document
        .getElementById(`${Number(activeSquare.id.charAt(0))}${Number(activeSquare.id.charAt(1)) + 2}`)
        .classList.add("castle");
    }
  }
}

/* THIS IS WHERE THE ACTUAL GAME LOGIC TAKES PLACE*/

document.querySelectorAll(".piece").forEach((item) => {
  item.addEventListener("click", () => {
    //whatever is here is executed whenever a square is clicked

    whoseTurn = chessBoard.whoseTurn().substring(0, 5).toLocaleLowerCase(); // is equal to either "white" or "black"

    //when activeSquare is defined and the other square has a piece (i.e. a capture)
    if (!item.classList.contains("empty") && item.classList.contains("availableSquares")) {
      //colour of the piece we want to capture must be different to the piece we want to move

      if (chessBoard.getPiece(activeSquare.id).getColour() !== chessBoard.getPiece(item.id).getColour()) {
        chessPiece = getPiecefromHTMLElement(item); //captured piece
        chessPiece2 = getPiecefromHTMLElement(activeSquare); //captured piece

        //reflect the capture in terms of ui and what the user / player sees
        item.classList.remove(chessPiece);
        activeSquare.classList.remove(chessPiece2, "activeSquare");
        activeSquare.classList.add("empty");
        item.classList.add(chessPiece2);

        removeAvailableSquares();
        updateChessPiece(item);

        //check if the piece is a pawn and if it is eligible to be upgraded
        checkPawnUpgrade(item, chessPiece2);
        //after the move we don't want any piece to be active
        activeSquare = undefined;
      }
    }

    // moving to empty square - //if empty and active square is defined - can only move to a valid square
    else if (item.classList.contains("empty") && activeSquare !== undefined) {
      if (item.classList.contains("availableSquares")) {
        chessPiece = getPiecefromHTMLElement(activeSquare);

        //reflect the move in terms of UI and what the user / player sees
        item.classList.remove("empty");
        activeSquare.classList.remove(chessPiece, "activeSquare");
        activeSquare.classList.add("empty");
        item.classList.add(chessPiece);

        //for en passant captures
        if (item.classList.contains("enPassant")) {
          if (chessPiece === "whitePawn") {
            //the square below which contains the black pawn
            HTMLElement = document.getElementById(`${Number(item.id.charAt(0)) + 1}${item.id.charAt(1)}`);
          } else {
            HTMLElement = document.getElementById(`${Number(item.id.charAt(0)) - 1}${item.id.charAt(1)}`);
          }

          //updating UI and the array
          chessPiece2 = getPiecefromHTMLElement(HTMLElement);
          HTMLElement.classList.remove(chessPiece2);
          chessBoard.clearSquare(HTMLElement.id); //we also update the 2D array to reflect that this en-passant capture
          HTMLElement.classList.add("empty");
        }

        //for castling...
        if (item.classList.contains("castle")) {
          if (chessPiece.castlingQueen) {
            //for queen-side castling
            if (chessPiece === "whiteKing") {
              //for white player castling
              rookSquareToMove = document.getElementById("70");
              rookSquareToMoveTo = document.getElementById("73");

              castling("whiteRook");
              //update the 2D array to reflect the castling
              chessBoard.clearSquare(rookSquareToMove.id);
              chessBoard.makeNewRook(7, 3, "white");
            } else {
              //for black player castling
              rookSquareToMove = document.getElementById("00");
              rookSquareToMoveTo = document.getElementById("03");

              castling("blackRook");
              chessBoard.clearSquare(rookSquareToMove.id);
              chessBoard.makeNewRook(0, 3, "black");
            }
          } else {
            //for king-side castling
            if (chessPiece === "whiteKing") {
              //for white player castling
              rookSquareToMove = document.getElementById("77");
              rookSquareToMoveTo = document.getElementById("75");

              castling("whiteRook");
              //update the 2D array to reflect the castling
              chessBoard.clearSquare(rookSquareToMove.id);
              chessBoard.makeNewRook(7, 5, "white");
            } else {
              //for black player castling
              rookSquareToMove = document.getElementById("07");
              rookSquareToMoveTo = document.getElementById("05");

              castling("blackRook");
              chessBoard.clearSquare(rookSquareToMove.id);
              chessBoard.makeNewRook(0, 5, "black");
            }
          }
        }

        removeAvailableSquares();
        updateChessPiece(item);

        //check if the piece is a pawn and if it is eligible to be upgraded
        checkPawnUpgrade(item, chessPiece);

        //update which squares are under attack after the movement and check if the move causes the opponent to be in check

        //updateThreatenedPositions();

        //console.log("updating threatened positions");

        //after the move we don't want any piece to be active
        activeSquare = undefined;
      } else {
        activeSquare.classList.remove("activeSquare");
        activeSquare = undefined;
        removeAvailableSquares();
      }
    }

    //selecting the active square - when it hasn't been selected yet
    else if (!item.classList.contains("empty")) {
      // if not empty then make it active square

      if (chessBoard.getPiece(item.id).getColour() == whoseTurn) {
        turnElement.classList.remove("wrongTurn"); //because there is no error if trying to remove a class that's not present

        // clicking the same square twice "deactivates it"
        if (item.classList.contains("activeSquare")) {
          deactivateActiveSquare();
          return;
        } else if (activeSquare !== undefined) {
          //stops activating multiple pieces
          deactivateActiveSquare();
        }

        activeSquare = item;
        activeSquare.classList.add("activeSquare");

        //getting all the locations that the this piece is able to move to
        availableMoveLocations = chessBoard.getPiece(activeSquare.id).move();

        //this is the actual piece object that the user is interested in moving
        chessPiece = chessBoard.getPiece(activeSquare.id);

        availableMoveLocations.forEach((element) => {
          HTMLElement = document.getElementById(`${element[0]}${element[1]}`);

          //if there's a piece then we make it red to show that it can be captured
          if (!HTMLElement.classList.contains("empty")) {
            HTMLElement.classList.add("pieceInDanger");
          }

          enPassantSquares(chessPiece.colour);
          castlingSquares(chessPiece.colour);

          console.log(chessBoard.board[1]);

          //marking all these locations on the chessboard with the "availableSquares class so they are marked with a green circle in them"
          HTMLElement.classList.add("availableSquares");
        });
      } else {
        // if the wrong player is trying to move...
        turnElement.className = "wrongTurn";
      }
    }
  });
});
