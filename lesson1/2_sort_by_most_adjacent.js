/**
 * Problem
 * 
 *  Inputs - Array of strings
 *  Outputs - a new array the the input arg strings sorted
 *  Rules - sort returned array by highest number of adjacent consonants
 *        - Adjascent = 'next to each other in the same word' or 'There is a space between two consonants in adjascent words?????
 *        - If two strings have the same number of adj consonants, they should keep their positions relative to one another.
 *        - Implicit - Strings can contain multiple words divided by spaces.
 *                   - Sort in descending numerical order of adjasent consonants.
 *                   - None of the strings will be empty for the provided test cases.
 *                   - Not all strings will contain multiple words
 *        - 
 *        - questions - what does space between two adjascent words mean?
 *                         - 'salt pan' has 3, "ltp" 
 *                    - Sort in ascending or descending order?
 *                    - How will the strings be composed?
 *        
 *    
 *        
 * 
 * Examples
 * 

console.log(sortStringsByConsonants(['aa', 'baa', 'ccaa', 'dddaa'])); // ['dddaa', 'ccaa', 'aa', 'baa']
console.log(sortStringsByConsonants(['can can', 'toucan', 'batman', 'salt pan'])); // ['salt pan', 'can can', 'batman', 'toucan']
console.log(sortStringsByConsonants(['bar', 'car', 'far', 'jar'])); // ['bar', 'car', 'far', 'jar']
console.log(sortStringsByConsonants(['day', 'week', 'month', 'year'])); // ['month', 'day', 'week', 'year']
 * 
 * Data Structure : Array
 * 
 * Algorithm
 * 
 * Declare a function, "adjascentSort" with 1 parameter
 * 
 * Declare const CONSONANTS 'qwrtypsdfghjklzxcvbnm'
 * 
 * Declare a result variable and assign to a shallow copy of the argument array
 * 
 * invoke the sort method on the result array and with a callback function to achieve
 * the desired sort
 * 
 *    Sort callback a and b 
 *      return b count minus a count to sort the arguments in descending order
 * 
 *    adjascent count function
 *      1 - remove spaces from argument string
 *          - split using the ' ' seperator and join using the '' separater
 *      2 - declare count variable and initialize to 0.
 *      3 - Split the string into an array of characters and iterate through the argument string
 *          - if current character is a consonant, and then next character is a consonant, increment count variable
 *      4 - return count + 1 if count is not zero, or 0 otherwise. 
 * 
 * Return the result array
 */

const CONSONANTS = 'qwrtypsdfghjklzxcvbnm';

function sortStringsByConsonants (arrOfStrings) {
  let resultArr = arrOfStrings.slice();

  resultArr.sort((a, b) => countMaxAdjacentConsonants(b) - countMaxAdjacentConsonants(a));

  return resultArr;
}

function countMaxAdjacentConsonants (str) {
  let adjacentConsonantCount = 0;
  let noSpaceString = str.split(' ').join('').toLowerCase();

  noSpaceString.split('').forEach((char, idx, arr) => {
    if(CONSONANTS.includes(char) && CONSONANTS.includes(arr[idx + 1])) {
      adjacentConsonantCount += 1;
    }
  });

  return adjacentConsonantCount ? adjacentConsonantCount + 1 : 0;
}

console.log(sortStringsByConsonants(['aa', 'baa', 'ccaa', 'dddaa'])); // ['dddaa', 'ccaa', 'aa', 'baa']
console.log(sortStringsByConsonants(['can can', 'toucan', 'batman', 'salt pan'])); // ['salt pan', 'can can', 'batman', 'toucan']
console.log(sortStringsByConsonants(['bar', 'car', 'far', 'jar'])); // ['bar', 'car', 'far', 'jar']
console.log(sortStringsByConsonants(['day', 'week', 'month', 'year'])); // ['month', 'day', 'week', 'year']