/**
 * Problem - Build a game of 21
 * Input - User Input
 * Output - Printed winning 
 * Rules - get as close to 21 as possible without going over. If you go over 21
 *         it's a "bust" and you lose.
 *       - Player always goes first
 * 
 * 
 * Examples / test cases
 * 
 * Data structure
 * 
 * Algorithm
 *  
 * Code with Intent
 * 
 * NOTES
 * Deck - possibly an object with each type of card and how many there are?
 *      - Suits: Hearts, Diamonds, Clubs, Spades
 *      - Values: 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace
 *          - Face cards are each worth 10,
 *          - Ace is worth 1 or 11 depending on circumstances
 * 
 * Two players - Dealer and Player
 * 
 * Hand - 2 cards. Player can see both of their cards, but only 1 of the dealer cards
 * 
 * ******CONSTANTS*********
 * BUST_VALUE = 21
 * STARTING_CARDS_PER_HAND = 2
 * DEALER_HIT_UNTIL = 17
 * SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
 * VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace ]
 * PLAYERS = ['Player', 'Dealer'];
 * 
 * *****FUNCTIONS******
 * 
 * initializeDeck - create and return an deck of all possible card objects.
 *                    - create a deck deck with all 52 card objects
 *                    - shuffleDeck(deck)
 *                    - return deck
 * 
 * dealHand - remove last two card objects from the deck deck and return them as an array
 * 
 * displayCards - takes a turn object as input and display's appropriate cards.
 *              - if turn.playerOrDealer is player
 *                  - Display the first of the dealer's two cards
 *                  - Display both of the Player's cards
 *              - if turn.playerOrDealer is dealer
 *                  - display the player's cards
 *                  - display the dealer's cards
 * 
 * initializeTurn - takes a hand, and player string as args and 
 *                  Creates new Turn object and returns it.
 *                    - playerOrDealer = player/dealer arg passed
 *                    - hand : hand passed as argument
 *                    - handValue : getHandValue(this.hand),
 *                    - stay : Boolean default to false and flip to true if the player stays
 *               
 * 
 * executeTurn - takes a turn, deck, playerHand, dealerHand as arguments and executes a turn
 *    - Loop while true
 *    - DisplayCards(turn, playerHand, dealerHand)
 *    - Hit or Stay(turn, deck)
 *    - If (turn.stay === true || turn.bust === true) break
 * 
 * getWinner - checks one, or two turn objects
 *    - declare winner variable
 *    
 *    - if only one turn object is passed in, 
 *      - check if the player/dealer's turn resulted in a bust
 *          - if it was a bust, set winner to 'dealer'
 * 
 *    - if two turn object's are passed in, 
 *      - Check the if the second turn was a bust
 *         - if it was a bust, set winner to 'player'
 *    
 *    - set winner to the return value of highestHandValue passing both hand objects 
 *      as arguments.
 * 
 *    - return winner
 *
 * 
 * displayGameWinner - takes a string as an argument and outputs the winner / tie status
 * 
 * highestHandValue - takes two turn objects as arguments and returns the player/dealer
 *                     of the higher handValue object, or 'Tie'
 * 
 * hitOrStay - takes a turn object a input and either calls the hit method, or the stay method
 *             mutating the turn object
 *              - if turn.playerOrDealer is player
 *                - get user decision from console, and use that to hit or stay
 *              - if turn.playerOrDealer is Dealer
 *                - if turn.handValue is < DEALER_HIT_UNTIL
 *                    - hit
 *                - else
 *                    - stay
 * 
 * hit - pop a card object from the deck and add to the turn object's hand array, AND update the turn.handValue
 * 
 * stay - set turn object's stay property to true
 * 
 * shuffleDeck - takes a deck deck and shuffles it, mutating the deck in place.
 * 
 * getHandValue - calculates the total value of the cards in a given player's hand
 * 
 *    * getAceValue - determines the value of an ace given the current circumstances
 *    - if the hand contains a 2, an Ace, and a 5, then the total value of the hand is 18. 
 *      In this case, the Ace is worth 11 because the sum of the hand (2 + 11 + 5) doesn't 
 *      exceed 21.
 *    - An ace's default value is 11. It changes to 1, only if that change would prevent
 *      the hand total value from being over 21. Each new ace that enters your hand must
 *      have the value determined.
 * 
 * is turn bust - checks if hand's value is over 21 and returns true or false
 * 
 * 
 * - pseudocode - 2 hours 
 */

const BUST_VALUE = 21;
const STARTING_CARDS_PER_HAND = 2;
const DEALER_HIT_UNTIL = 17;
const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];;
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace' ];
const FACE_CARDS = ['Jack', 'Queen', 'King'];
const FACE_CARD_VALUE = 10;
const ACE_VALUES = [11, 1];
const PLAYERS = ['Player', 'Dealer'];
const RLS = require('readline-sync');
const ACTIONS = ['Hit', 'Stay'];
const GAMES_TO_WIN = 3;

// ********* SETUP FUNCTIONS ********* //
// Create and return a "deck" array all 52 card objects
function initializeDeck () {
  function shuffleDeck (deck) {
    for (let index = deck.length - 1; index > 0; index--) {
      let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
      [deck[index], deck[otherIndex]] = [deck[otherIndex], deck[index]]; // swap elements
    }
  }
  function getValue (cardValueStr) {
    if(Number(cardValueStr)) return Number(cardValueStr);
    else if(FACE_CARDS.includes(cardValueStr)) return FACE_CARD_VALUE;
    else return ACE_VALUES[0];
  
  };
  //create deck array
  let deck = [];

  //fill deck array with all 52 card objects
  SUITS.forEach(suit => VALUES.forEach(strValue => {
    deck.push({cardName : `${strValue} of ${suit}`, cardValue : getValue(strValue)})
  }));

  //shuffle the deck
  shuffleDeck(deck);

  //return the deck
  return deck;
}

function adjustAceValues (hand) {
  hand.forEach((card, idx) => {
    if((card.cardValue === ACE_VALUES[0]) &&
       (idx > 1)) {
      if(getHandValue(hand) > BUST_VALUE) {
        card.cardValue = ACE_VALUES[1];
      }
    }
  });
}

// Remove last two card objects from the argument deck and return them as an array
function dealHand (deck) {
  let hand = deck.splice(deck.length - STARTING_CARDS_PER_HAND);

  //handle double ace hands 
  if(hand.every(card => card.cardValue === ACE_VALUES[0])) {
    hand[1].cardValue = ACE_VALUES[1];
  }
  return hand;
}
// Returns the sum total value cardValue's of the input hand array
function getHandValue (hand) {
  return hand.reduce((total, current) => total + current.cardValue, 0);
}

// /takes a hand array and player string as arguments returns a new Turn object and returns it.
function initializeTurn (argHand, argPlayer) {
  return {player : argPlayer, 
          hand : argHand, 
          handValue : getHandValue(argHand),
          stay : false,
          bust : false};
}

// takes a turn object, and both hands as arguments and displays the appropriate cards, based on the player
function displayCards (turn, playerHand, dealerHand) {
  //player's turn
  if(turn.player === PLAYERS[0]) { 
    //display dealer's first card
    console.log(`The Dealer's visible card is: ${dealerHand[0].cardName}.\n`);

    //display player hand data
    console.log(`Your Hand: \n`);
    playerHand.forEach(card => console.log(`${card.cardName}, Value: ${card.cardValue}`));
    console.log(`\nYour total hand value is: ${getHandValue(playerHand)}\n`);

  //Dealer's turn
  } else if (turn.player === PLAYERS[1]) {
    //display player hand data
    console.log(`Your Hand: \n`);
    playerHand.forEach(card => console.log(`${card.cardName}, Value: ${card.cardValue}`));
    console.log(`\nYour total hand value is: ${getHandValue(playerHand)}\n`);

    //Display Dealer Hand data
    console.log(`Dealer Hand: \n`);
    dealerHand.forEach(card => console.log(`${card.cardName}, Value: ${card.cardValue}`));
    console.log(`\nDealer total hand value is: ${getHandValue(dealerHand)}\n`);
  }
}

// takes a turn object and deck object as arguments either calls the hit method, or the stay method
// mutating the turn object based on who's turn it is.
function callHitOrStay (turn, deck) {
  function hit (turn, deck) {
    //pop a card object from the deck and add to the turn object's hand array, 
    //update the turn.handValue, update the bust property

    function bust (turn) {
      // checks if turn's hand's value is over 21 and updates the bust property of the turn argument
      turn.bust = turn.handValue > BUST_VALUE ? true : false;
    }
    turn.hand.push(deck.pop());
    console.log(`\n${turn.player === PLAYERS[0] ? 'You' : 'The dealer'} drew: ${turn.hand[turn.hand.length - 1].cardName}\n`);
    adjustAceValues(turn.hand);
    turn.handValue = getHandValue(turn.hand);
    bust(turn);
  }
  function stay (turn) {
    turn.stay = true;
    console.log(`\n${turn.player === PLAYERS[0] ? 'You' : 'The dealer'} stayed.\n`);
    RLS.question(`\nHit Enter to begin continue.`);
  }

  //player's turn?
  if(turn.player === PLAYERS[0]) {
    let choice = ACTIONS[RLS.keyInSelect(ACTIONS, "Chose Wisely...")];
    console.log(choice);
    if(choice === ACTIONS[0]) hit(turn, deck);
    else if (choice === ACTIONS[1]) stay(turn);
  //Dealer's turn?
  } else {
    if(turn.handValue < DEALER_HIT_UNTIL) hit(turn, deck);
    else stay(turn);
  }
}
// takes a turn, deck, playerHand, dealerHand as arguments and executes a turn
function executeTurn (turn, deck, playerHand, dealerHand) {
  console.clear();
  while(true) {
    if(turn.player === PLAYERS[0]) console.log(`\nIt's your turn.\n`);
    else console.log(`\nIt's the Dealer's turn.\n`)
    displayCards(turn, playerHand, dealerHand);
    callHitOrStay(turn, deck);
    if(turn.stay === true || turn.bust === true) break;
    RLS.question('Hit enter to continue.');
    console.clear();
  }
}
// compares two turn objects, and returns the winner as a string
function getWinner (turns) {
  function getHighestHandValue (playerTurn, dealerTurn) {
    //takes two turn objects as arguments and returns the player/dealer
    //of the higher handValue object, or 'Tie'
    if(playerTurn.handValue > dealerTurn.handValue) return PLAYERS[0];
    else if (playerTurn.handValue < dealerTurn.handValue) return PLAYERS[1];
    else return 'Tie';
  }

  let winner;

  //turns array contains only 1 turn, so only return a truthy winner if the 
  //first player busted, otherwise return winner with the initial value of undefined.
  if(turns.length === 1) {
    if(turns[0].bust === true) winner = PLAYERS[1];
    //return winner;
  }
  //turns array contains two turns
  else {
    if(turns[1].bust === true) {
      winner = PLAYERS[0];
      //return winner;
    }
    else {
      //if no busts, assign winner to the player / dealer with the highest hand value
      winner = getHighestHandValue(turns[0], turns[1]);
      //return winner;
    }
  }
  return winner;
}

function displayGameWinner (winner, turns, match) {
  if(winner === PLAYERS[0]) {
    if(turns[1].bust) console.log(`\nThe ${turns[1].player} BUSTED!`);
    else console.log(`Your score was ${turns[0].handValue} and the dealer's score was ${turns[1].handValue}.`);
    console.log(`\nYou won! Congrats!\n`);
  }
  else if(winner === PLAYERS[1]) {
    if(turns[0].bust) console.log(`\nYou BUSTED!`);
    else console.log(`Your score was ${turns[0].handValue} and the dealer's score was ${turns[1].handValue}.`);
    console.log(`\nThe Dealer won. Better luck next time.\n`);
  }
  else console.log(`\nIt was a tie!\n`);

  console.log(`\nThe current score is:
    Player: ${match.playerWinCount}
    Dealer: ${match.dealerWinCount}\n`);
}

function initializeMatch () {
  return {playerWinCount : 0, dealerWinCount : 0};
}

function updateMatchScore (match, winner) {
  if(winner === PLAYERS[0]) match.playerWinCount += 1;
  else if (winner === PLAYERS[1]) match.dealerWinCount += 1;
}

function matchOver (match) {
  if(match.playerWinCount === GAMES_TO_WIN) return "You won the match!";
  else if(match.dealerWinCount === GAMES_TO_WIN) return "The dealer won the match!";
}

function greet () {
  console.clear();
  console.log(`\n\nWelcome to 21!\nFirst to win 3 games wins the match!\n`);
  RLS.question('Hit enter to begin.');
}

// ***************TESTING****************//
// //get value test
// VALUES.forEach(value => console.log(getValue(value)));

// //initializeDeck test
// console.log('NEW TEST ****** NEW TEST ******* NEW TEST');
// let deckTest = initializeDeck();

// console.log(deck);
// console.log(deck.length);
// // //dealHand test
// let playerHandTest = dealHand(deckTest);
// let dealerHandTest = dealHand(deckTest);

// console.log(dealerHand);
// console.log(playerHand);
// console.log(deck);
// console.log(deck.length);

// //getHandValue test
// console.log(getHandValue(dealerHand));
// console.log(getHandValue(playerHand));

// //initializeTurn test
// let playerTurnTest = initializeTurn(playerHandTest, PLAYERS[0]);
// let dealerTurnTest = initializeTurn(dealerHandTest, PLAYERS[1]);
// console.log(playerTurn);
// console.log(dealerTurn);

//displayCards test
// displayCards(dealerTurn, playerHand, dealerHand);

// //hitOrStay test
// displayCards(dealerTurn, playerHand, dealerHand);
// callHitOrStay(dealerTurn, deck);
// displayCards(dealerTurn, playerHand, dealerHand);

// // handIsBust test
// console.log(playerTurn);
// console.log(handIsBust(playerHand));
// playerHand.handValue = 25;
// console.log(handIsBust(playerHand));

//executeTurn test




// //getWinner Test
// let turnsTest = [];
// turnsTest.push(playerTurnTest);
// executeTurn(turnsTest[0], deckTest, playerHandTest, dealerHandTest)
// console.log(getWinner(turnsTest));

// turnsTest.push(dealerTurnTest);
// executeTurn(turnsTest[1], deckTest, playerHandTest, dealerHandTest);
// console.log(getWinner(turnsTest));

// turnsTest.forEach(turn => console.log(turn));


// ***************Game****************//

//greet user, press enter to continue

/*****************GAME******************* */

greet();
while(true) { //match loop
  let match = initializeMatch();
  let matchWinner;
  while(true) { //game loop
    let turns = [];
    let gameWinner;
    let deck = initializeDeck();
    let playerHand = dealHand(deck);
    let dealerHand = dealHand(deck);
    while(true) { //turn loop
      turns.push(initializeTurn(playerHand, PLAYERS[0]));
      executeTurn(turns[0], deck, playerHand, dealerHand);
      gameWinner = getWinner(turns);
      if(gameWinner) break;
      
      turns.push(initializeTurn(dealerHand, PLAYERS[1]));
      executeTurn(turns[1], deck, playerHand, dealerHand);
      gameWinner = getWinner(turns);
      break;
    } //turn loop end
    updateMatchScore(match, gameWinner);
    displayGameWinner(gameWinner, turns, match);
    matchWinner = matchOver(match);
    if(matchWinner) break;
    if(!RLS.keyInYN('Would you like to continue the match?')) break;
  } //game Loop End
  console.log(matchWinner || ' ');
  if(!RLS.keyInYN('Would you like to play another match?')) break;
} //match loop end
console.log('\nGoodbye! Thanks for playing!\n');