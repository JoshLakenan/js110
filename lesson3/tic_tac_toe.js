/**
 * Description of the game
 * Tic Tac Toe is a 2-player game played on a 3x3 grid called the board. 
 * Each player takes a turn and marks a square on the board. The first 
 * player to get 3 squares in a row–horizontal, vertical, or diagonal–wins. 
 * If all 9 squares are filled and neither player has 3 in a row, the game is a tie.
 * 
 * 
 * 
 * 
 * Display the initial empty 3x3 board.
Ask the user to mark a square.
Computer marks a square.
Display the updated board state.
If it's a winning board, display the winner.
If the board is full, display tie.
If neither player won and the board is not full, go to #2
Play again?
If yes, go to #1
Goodbye!



*/
const GAMES_TO_WIN = 3;
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER  = 'O';
const POSITIONS = ['Top Left', 'Top Center', 'Top Right',
                   'Middle Left', 'Middle Center', 'Middle Right',
                   'Bottom Left', 'Bottom Center', 'Bottom Right']

const WINNING_INDICES = [
  [0, 1, 2], //top row
  [3, 4, 5], //middle row
  [6, 7, 8], //bottom row
  [0, 4, 8], //top left to bottom right diagonal
  [2, 4, 6], //top right to bottom left diagonal
  [0, 3, 6], //left column
  [1, 4, 7], //middle column
  [2, 5, 8]  //right column
];

const SQUARES_PER_ROW = 3;

const rls = require('readline-sync');

function prompt (str) {
  return `=> ${str}`;
}

function greetUser () {
  console.clear();
  console.log(prompt('Welcome to Tic Tac Toe! First to three in a row wins!\n'));
  rls.question(prompt('Press enter to start!'));
}

function initializeBoard () {
  let board = [];
  for(let i = 0; i < POSITIONS.length; i++) {
    board[i] = INITIAL_MARKER;
  }
  board.positionsRemaining = POSITIONS.slice();
  return board;
}

function initializeMatch () {
  return {userWinCount : 0, computerWinCount : 0};
}

function updateMatchScore (match, gameResult) {
  if(gameResult === "You won the game!") match.userWinCount += 1;
  else if (gameResult === "The Computer won the game.") match.computerWinCount += 1;
}

function matchOver (match) {
  if(match.userWinCount === 3) return prompt("You won the match!");
  else if(match.computerWinCount === 3) return prompt("The Computer won the match!");
}

function gameOver (board) {

  if(WINNING_INDICES.some(subArr => subArr.every(square => board[square] === COMPUTER_MARKER))) {
    return "The Computer won the game.";
  } else if (WINNING_INDICES.some(subArr => subArr.every(square => board[square] === HUMAN_MARKER))) {
    return "You won the game!";
  } else if (WINNING_INDICES.every(subArr => subArr.every(square => board[square] !== INITIAL_MARKER))) {
    return "It's a tie.";
  }
  

  //old version
  // let currentBoardStatus = getBoardStatus(board);

  // if(currentBoardStatus.some(subArr => subArr.every(square => square === COMPUTER_MARKER))) {
  //   return "The Computer won the game.";
  // } else if (currentBoardStatus.some(subArr => subArr.every(square => square === HUMAN_MARKER))) {
  //   return "You won the game!";
  // } else if (currentBoardStatus.every(subArr => subArr.every(square => square !== INITIAL_MARKER))) {
  //   return "It's a tie.";
  // }
}


function displayStatus (board, match) {
  console.clear();
  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}.`);
  console.log(` - Current Score - Human: ${match['userWinCount']} Computer: ${match['computerWinCount']}`);
  console.log('');
  console.log(`     |     |`);
  console.log(`  ${board['0']}  |  ${board['1']}  |  ${board['2']}`); 
  console.log(`     |     |`);
  console.log(`-----+-----+-----`);
  console.log(`     |     |`);
  console.log(`  ${board['3']}  |  ${board['4']}  |  ${board['5']}`);
  console.log(`     |     |`);
  console.log(`-----+-----+-----`);
  console.log(`     |     |`);
  console.log(`  ${board['6']}  |  ${board['7']}  |  ${board['8']}`);
  console.log(`     |     |`);
  console.log('');
}

function playerChoosesSquare (board, match) {
  let chosenSquare = rls.keyInSelect(board.positionsRemaining, prompt('Pick an open Square.'));

  //input ensure an available square is chosen
  while(!getAvailableSquares(board).includes(chosenSquare)) {
    displayStatus(board, match);
    console.log(prompt(`Error! Space ${chosenSquare + 1} is already taken. Try again!`));
    chosenSquare = rls.keyInSelect(board.positionsRemaining, prompt('Pick an open Square.'));
  }
  //update board marker and positions remaining
  board[chosenSquare] = HUMAN_MARKER;
  board.positionsRemaining[chosenSquare] = 'TAKEN';

  //display new board state
  displayStatus(board, match);
}

// Returns an array of board indexes showing which  squares are still empty
function getAvailableSquares  (board) {
  return board.map((square, idx) => square === INITIAL_MARKER ? idx : undefined).filter(element => element !== undefined);
}

function computerChoosesSquare (board, match) {
  // let computerChoice = getComputerRandomChoice(board);
  let computerChoice = getComputerDefenseAiChoice(board);

  //update board markers and positions remaining
  board[computerChoice] = COMPUTER_MARKER;
  board.positionsRemaining[computerChoice] = 'TAKEN';

  //display new board state
  displayStatus(board, match);
}

/**
 * AI Defence
 * Input - current board state
 * Output - mutate board to pick a defensive or random scquare
 * Rules - "immidiate threat" is when the user has 2 squares in a row
 *         with the third square unnoccupied
 *       - Computer should chose the square that would allow the user to win if
 *         there is an immidiate threat, or a random choice otherwise.
 * Examples / test cases
 *  - User has spaces 1, 2  -> computer should chose 3.
 *  - user has spaces 1, 9  -> computer should chose 5.
 *  - user has spaces 1, 6  -> computer should pick a random square
 * 
 * Data structure - Use array
 * Algorithm -     
 * 1 - If there is an immidiate threat ()
 *    - chose the square that blocks the threat
 *   - Else
 *    - chose a random available square
 *  
 * 
 * 1.1 Immidiate threat
 *  Input -  board array
 *  Output - A reference to position on the board to chose to block an immidiate threat.
 *  Algorithm 
 *    - Iterate through the elements of the outer array
 *    - Declare a variable for counting X's in each subArray
*     - Declare a variable for counting O's in each subArray
 *      - Iterate through the elements of the subarray
 *        - If current element is X, increment X variable, if O, increment O,
 *      - If  X count + O count is 2
 *        - Iterate through the elements of the subArray again
 *          - If current element is ' '(it is an avaiable square), and X count is 2
 *            - return a reference to the current index of the subarray
 *        
 */

function getComputerRandomChoice (board) {
  let availableSquares = getAvailableSquares(board);
  //generate random number between 0 availableSquares.length - 1  (since we are rounding down with Math.floor)
  let randomAvailableIndex = Math.floor(Math.random() * (availableSquares.length));

  return availableSquares[randomAvailableIndex];
}

function getComputerDefenseAiChoice (board) {

  function getImmidiateThreatSquare (board) {
    //iterate through the winning indexes array sub arrays
    for(let i = 0; i < WINNING_INDICES.length; i++) {
      //declare xCount and oCount variables
      let xCount = 0;
      let oCount = 0;

      //iterate through sub array's and incriment xCount and oCount as appropriate
      for(let j = 0; j < SQUARES_PER_ROW; j++) {
        if(board[WINNING_INDICES[i][j]] === HUMAN_MARKER) xCount += 1;
        else if(board[WINNING_INDICES[i][j]] === COMPUTER_MARKER) oCount += 1;
      }

      //check if user has 2 squares in the subarray, and computer has 0.
      if((xCount === SQUARES_PER_ROW - 1) && (oCount === 0)) {
        //iterate through the sub array again and return the WINNING_INDEX value as the imminent threat
        for(let j = 0; j <= WINNING_INDICES.length; j++) {
          if(board[WINNING_INDICES[i][j]] === INITIAL_MARKER) {
            //console.log(`AI Engaged! Row ${WINNING_INDICES[i]}** Index: ${WINNING_INDICES[i][j]}*******************************************`);
            return WINNING_INDICES[i][j];
          }
        }
      }
    }
  }

  //return immidiate threat index, or random choice if getImmidiateThreatSquare returns undefined
  return getImmidiateThreatSquare(board) !== undefined ? getImmidiateThreatSquare(board) : getComputerRandomChoice(board);
}

/**********************Testing************************/

// function initializeTestBoard () {
//   return ['X', 'O', ' ',
//           'X', ' ', 'O',
//           'O', ' ', 'X'];
// }

// let board = initializeBoard();

// board[1] = 'Hey there';

// let i = 0;

// let j = 1;

// console.log(board[WINNING_INDICES[i][j]]);

// console.log(WINNING_INDICES[0].length);

/**********************PLAY GAME************************/
greetUser();
//match loop
while(true) {
  let match = initializeMatch();

  //game loop
  while(true) {
    let board = initializeBoard();

    //turn loop
    while(true) {
      displayStatus(board, match);

      playerChoosesSquare(board, match);
      if(gameOver(board))break;
      
      computerChoosesSquare(board, match);
      if(gameOver(board)) break;
    }
    //display the game result
    console.log(gameOver(board));

    //update match status
    updateMatchScore(match, gameOver(board));
    if(matchOver(match)) break;

    //ask if they want to continue the match
    if(!rls.keyInYNStrict(prompt('Would you like to continue the match?'))) {
      break;
    }
  }
  //Display match result, unless the match was quit before a winner was determined
  if(matchOver(match)) console.log(matchOver(match));

  //ask if they want to play another match
  if(!rls.keyInYNStrict(prompt('Would you like to play another match?'))) {
    console.log(prompt('Thanks for Playing! Goodbye!'));
    break;
  }
}


//Show the final score /  display the new score along with the current game's result.


//typeerror. Figure out 