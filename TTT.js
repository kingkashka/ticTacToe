let activePlayer = "X";

// THIS ARRAY STORES AN ARRAY OF MOVES. WE USE THIS TO DETERMINE CONDITIONS.
let selectedSquares = [];

// THIS FUNCTION IS FOR PLACING X OR O IN A BOX

function placeXorO(position) {
  if (!selectedSquares.some((e) => e.includes(position))) {
    // THIS ELEMENT RETRIEVES THE HTML ELEMENT THAT WAS PICKED!!
    let select = document.getElementById(`${position}`);
    // THIS CONDITION CHECKS FOR WHO TURN IT IS
    if (activePlayer === "X") {
      select.style.backgroundImage = "url(images/x.png)";
    } else {
      // IF ACTIVE PLAYER IS EQUAL TO "O", THE O.PNG IS PLACED IN HTML
      select.style.backgroundImage = "url(images/o.png)";
    }
    //   SQUARENUMBER AND ACTIVEPLAYER ARE CONCATENATED TOGETHER AND ADDED TO ARRAY
    selectedSquares.push(position + activePlayer);
    // THIS FUNCTION CHECKS FOR ANY WIN CONDITIONS
    checkWinConditions();
    // THIS CONDITION IS FOR CHANGING THE ACTIVE PLAYER
    if (activePlayer === "X") {
      // IF ACTIVE PLAYER IS X CHANGE IT TO O
      activePlayer = "O";
    } else {
      // CHANGES ACTIVE PLAYER TO X
      activePlayer = "X";
    }
    // THIS FUNCTION PLAYS A PLACEMENT SOUND
    playSound("./media/place.mp3");
    // THIS CONDITION CHECKS TO SEE IF ITS THE COMPUTERS TURN
    if (activePlayer === "O") {
      // THIS FUNCTION DISABLES CLICKING FOR COMPPUTERS TURN
      disableClick();
      // THIS FUNCTION WAITS ONE SECOND BEFORE THE COMPUTER PLACES AN IMAGE AND ENABLES CLICK
      setTimeout(function () {
        computersTurn();
      }, 1000);
    }
    // RETURNING TRUE IS NEEDED FOR OUR COMPUTERSTURN() FUNCTION TO WORK
    return true;

    // THIS FUNCTION RESULTS IN A RANDOM SQUARE BEING SELECTED BY THE COMPUTER.
    function computersTurn() {
      //     // THIS BOOLEAN IS NEEDED FOR OUR WHILE LOOP
      let success = false;
      // THIS VARIABLE STORES A RANDOM NUMBER 0-8
      let pickASquare;
      // THIS CONDITION ALLOWS OUR WHILE LOOP TO KEEP TRYING IF A SQUARE IS SELECTED ALREADY.
      while (!success) {
        // A RANDOM NUMBER BETWEEN 0 AND 8 IS SELECTED
        pickASquare = String(Math.floor(Math.random() * 9));
        // IF THE RANDOM NUMBER EVALUATED RETURNS TRUE, THE SQUARE HASNT BEEN SELECTED YET
        if (!selectedSquares.some((e) => e.includes(pickASquare))) {
          // THIS LINE CALLS THE FUNCTION
          placeXorO(pickASquare);
          // THIS CHANGES OUR BOOLEAN AND ENDS THE LOOP
          success = true;
        }
      }
    }
  }
}
function checkWinConditions() {
  if (arrayIncludes("0X", "1X", "2X")) {
    drawWinLine(50, 100, 558, 100);
  } else if (arrayIncludes("3X", "4X", "5X")) {
    drawWinLine(50, 304, 558, 304);
  } else if (arrayIncludes("0X", "3X", "6X")) {
    drawWinLine(100, 50, 100, 558);
  } else if (arrayIncludes("1X", "4X", "7X")) {
    drawWinLine(304, 50, 304, 558);
  } else if (arrayIncludes("2X", "5X", "8X")) {
    drawWinLine(508, 50, 508, 558);
  } else if (arrayIncludes("6X", "4X", "2X")) {
    drawWinLine(100, 508, 510, 90);
  } else if (arrayIncludes("0X", "4X", "8X")) {
    drawWinLine(100, 100, 520, 520);
  } else if (arrayIncludes("0O", "1O", "2O")) {
    drawWinLine(50, 100, 558, 100);
  } else if (arrayIncludes("6O", "7O", "8O")) {
    drawWinLine(50, 508, 558, 508);
  } else if (arrayIncludes("0O", "3O", "6O")) {
    drawWinLine(100, 50, 100, 558);
  } else if (arrayIncludes("1O", "4O", "7O")) {
    drawWinLine(304, 50, 304, 558);
  } else if (arrayIncludes("2O", "5O", "8O")) {
    drawWinLine(508, 50, 508, 558);
  } else if (arrayIncludes("6O", "4O", "2O")) {
    drawWinLine(100, 508, 510, 90);
  } else if (arrayIncludes("0O", "4O", "8O")) {
    drawWinLine(100, 100, 520, 520);
  } else if (selectedSquares.length >= 9) {
    // Play tie sound and reset game after a short delay
    playSound("./media/tie.mp3");
    setTimeout(() => {
      resetGame();
    }, 500);
  }

  // THIS FUNCTION CHECKS IF AN ARRAY INCLUDES 3 STRINGS. IT IS USED TO CHECK FOR EACH WIN CONDITION
  function arrayIncludes(squareA, squareB, squareC) {
    // THESE 3 VARIABLES WILL BE USED TO CHECK FOR 3 IN A ROW
    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);
    // IF THE 3 VARIABLES WE PASS ARE ALL INC;UDED IN OUR ARRAY THEN
    // TRUE IS RETURNED AND OUR ELSE IF CONDITION EXECUTES THE DRAWLINE() FUNCTION
    if (a === true && b === true && c === true) {
      return true;
    }
  }
}
function disableClick() {
  document.body.style.pointerEvents = "none";
  setTimeout(() => {
    document.body.style.pointerEvents = "auto";
  }, 1000);
}

function playSound(audioURL) {
  // WE CREATE A NEW AUDIO OBJECT AND WE PASS THE PATH AS A PARAMETER
  let audio = new Audio(audioURL);
  // PLAY METHOD PLAYS AUDIO SOUND
  audio.play();
}

function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
  const canvas = document.getElementById("win-lines");
  const c = canvas.getContext("2d");
  let x1 = coordX1,
    y1 = coordY1,
    x2 = coordX2,
    y2 = coordY2,
    x = x1,
    y = y1;

  function animateLineDrawing() {
    const animationLoop = requestAnimationFrame(animateLineDrawing);
    c.clearRect(0, 0, 608, 608); // Clear canvas
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x, y);
    c.lineWidth = 10;
    c.strokeStyle = "red";
    c.stroke();

    if (x1 <= x2 && y1 <= y2) {
      if (x < x2) {
        x += 10;
      }
      if (y < y2) {
        y += 10;
      }
      if (x >= x2 && y >= y2) {
        cancelAnimationFrame(animationLoop);
      }
    }

    if (x1 <= x2 && y1 >= y2) {
      if (x < x2) {
        x += 10;
      }
      if (y > y2) {
        y -= 10;
      }
      if (x >= x2 && y <= y2) {
        cancelAnimationFrame(animationLoop);
      }
    }
  }

  disableClick(); // Prevent clicking while drawing
  playSound("./media/winGame.mp3"); // Play win sound
  animateLineDrawing(); // Start drawing animation
  setTimeout(() => {
    clear();
    resetGame();
  }, 1000); // Clear and reset after 1 second
}

function clear() {
  // THIS LINE STARTS THE ANIMATION LOOP
  const animationLoop = requestAnimationFrame(clear);
  // THIS LINE CLEARS OUR CANVAS
  c.clearRect(0, 0, 608, 608);
  // THIS LINE STOPS OUR ANIMATION LOOP
  cancelAnimationFrame(animationLoop);
}

function resetGame(){
    for(let i = 0; i < 9; i++){
        // THIS ELEMENT GETS THE HTML ELEMENT I 
        let square = document.getElementById(String(i));
        // THIS REMOVES OUR ELEMENTS BACKGROUND IMAGE 
        square.style.backgroundImage = "";
    }
    // THIS RESETS OUR ARRAY SO ITS EMPTY AND WE CAN START OVER AGAIN 
    selectedSquares = []
}
