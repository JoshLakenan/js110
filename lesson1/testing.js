let statement = "The Flintstones Rock";

function charFrequency (str) {
  let arr = str.split('');
  
  let result = {};
  
  arr.forEach(char => {
    result[char] = result[char] + 1 || 1;
  })
  
  delete result[' '];
  
  return result;
}

console.log(charFrequency(statement));