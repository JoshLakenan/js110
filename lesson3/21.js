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
 * initializeDeck - create and return an array of all possible card objects.
 *                    - create a deck array with all 52 card objects
 *                    - shuffleDeck(deck)
 *                    - return deck
 * 
 * dealHand - remove last two card objects from the deck array and return them as an array
 * 
 * displayCards - takes a turn object as input and display's appropriate cards.
 *              - if turn.playerOrDealer is player
 *                  - Display the first of the dealer's two cards
 *                  - Display both of the Player's cards
 *              - if turn.playerOrDealer is dealer
 *                  - display the player's cards
 *                  - display the dealer's cards
 * 
 * initializeTurn - takes a hand array, and player/dealer string as input and 
 *                  Creates new Turn object and returns it.
 *                    - playerOrDealer = player/dealer arg passed
 *                    - hand : dealHand (array of 2 card objects initially),
 *                    - handValue : getHandValue(this.hand),
 *                    - stay : Boolean default to false and flip to true if the player stays
 *               
 * 
 * executeTurn - takes a player as input and returns a turn object
 *    - initializle turn (player)
 *    - Loop while true
 *    - DisplayCards(turn)
 *    - Hit or Stay(turn)
 *    - If turn.stay === true || handIsBust(turn.handValue) break
 *            
          * playerTurn - returns turn object
          *    - initialize turn
          *    - Loop
          *        - Display Hand
          *        - Hit or stay
          *        - Turn is over (break) when the player either "stays", or "busts"
          * 
          * dealerTurn - returns turn object
          *    - initialize turn
          *    - Loop
          *      - Check hand value compared to DEALER_HIT_UNTIL
          *        - Hit or Stay
          *      - Turn is over (break) when the player either "stays", or "busts"
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
 * displayWinner - takes a string as an argument and outputs the winner / tie status
 * 
 * highestHandValue - takes two turn objects as arguments and returns the player/dealer
 *                     of the higher handValue object, or 'Tie'
 * 
 * hitOrStay - takes a turn object as input and either calls the hit method, or the stay method
 *             mutating the turn object
 *              - if turn.playerOrDealer is player
 *                - get user decision from console, and use that to hit or stay
 *              - if turn.playerOrDealer is Dealer
 *                - if turn.handValue is < DEALER_HIT_UNTIL
 *                    - hit
 *                - else
 *                    - stay
 * 
 * hit - remove a random card object from the deck array and add to the specified player's 
 *       turn object's hand array.
 * 
 * stay - set turn object's stay property to true
 * 
 * shuffleDeck - takes a deck array and shuffles it, mutating the array in place.
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
 * handIsBust - checks if hand's value is over 21 and returns true or false
 * 
 * 
 * 
 */

/**
 * Problem
 * Input - 
 * Output - 
 * Rules - 
 * 
 * DS - 
 * 
 * Alg - 
 */