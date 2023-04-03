//4
/*let arr1 = [1, [2, 3], 4];

arr1[1][1] = 4;
console.log(arr1);

let arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];

arr2[2] = 4;
console.log(arr2);

let obj1 = { first: [1, 2, [3]] };

obj1.first[2][0] = 4;
console.log(obj1);

let obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
obj2.a.a[2] = 4;
console.log(obj2);*/

//5
/*let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

console.log(Object.values(munsters)
                  .filter(value => value.gender === 'male')
                  .map(value => value.age)
                  .reduce((a, c) => a + c));*/

//6 - Use object.entries if you need both key and values.
/*let munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};

for(let key in munsters) {
  console.log(`${key} is a ${munsters[key].age}-year-old ${munsters[key].gender}.`);
}*/

//7
/*let a = 2;
let b = [5, 8];
let arr = [a, b]; //[4, [3, 8]]

arr[0] += 2;
arr[1][0] -= a;

console.log(a); //2
console.log(b); //[3, 8]*/

//8
/*let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

Object.values(obj).forEach(value => value.forEach(element => {
  console.log(element.split('')
                     .filter(char => ['a', 'e', 'i', 'o', 'u'].includes(char))
                     .join(''));
}));*/

//9
/*let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

let result = arr.map(array => {
  if(typeof array[0] === 'string') return array.sort();
  else return array.sort((a, b) => a - b);
});

console.log(result);*/

//10

/*let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

let result = arr.map(array => {
  if(typeof array[0] === 'string') return array.sort().reverse();
  else return array.sort((a, b) => b - a);
  
/*  arr.map(subArr => {
  return subArr.slice().sort((a, b) => {
    if (typeof a === 'number') {
      return b - a;
    }

    if (a < b) {
      return 1
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
});*/

//11
/*let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

let result = arr.map(element => Object.fromEntries(Object.entries(element).map(key => [key[0], key[1] + 1])));

console.log(result);

console.log(arr);*/

//12 return a new array identical in structure to the original, but 
//   containing only the numbers that are multiples of 3.
/*let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

console.log(arr.map(arr => arr.filter(num => num % 3 === 0)));*/

//13. Given the following data structure, sort the array so that the sub-arrays 
//are ordered based on the sum of the odd numbers that they contain.
/*let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

let sumOdd = (acc, curr) => curr % 2 !== 0 ? acc + curr : acc;

arr.sort((a, b) => a.reduce(sumOdd, 0) - b.reduce(sumOdd, 0));

console.log(arr);
*/

//14. Given the following data structure write some code to return an array 
//containing the colors of the fruits and the sizes of the vegetables. 
//The sizes should be uppercase, and the colors should be capitalized.
/*
let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

let capitalize = str => str[0].toUpperCase() + str.slice(1);

console.log(Object.values(obj).map(element => element.type === 'fruit' ? 
                                               element.colors.map(capitalize) : 
                                               element.size.toUpperCase()));
*/

//15
/*let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

let isEven = num => num % 2 === 0;

let result = arr.filter(obj => {
  let values = Object.values(obj);
  let allEven = true;
  values.forEach(list => {
    if(!list.every(isEven)) allEven = false;
  });
  return allEven;
});

console.log(result)*/

//16 
/*let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];

// expected value of object
// { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }

console.log(Object.fromEntries(arr));
*/

//17

function getUUID () {
  let chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  
  let rand = () => Math.floor(Math.random() * (chars.length));
  
  let dashIndices = [8, 13, 18, 23];
  
  let uuid = '';
  
  for(let i = 0; i < 36; i++) {
    uuid += dashIndices.includes(i) ? '-' : chars[rand()];
  }
  
  return uuid;
}

function iterativeGetUUID () {
  let chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let rand = () => Math.floor(Math.random() * (chars.length));
  let sections = [8, 4, 4, 4, 12];
  let uuid = '';
  
  sections.forEach((number, idx) => {
    for (let i = 0; i <= number; i ++) {
      if (i < number) uuid += chars[rand()];
      else if (i === 12) break;
      else uuid += '-'
    }
  });
  
  return uuid;
}

console.log(iterativeGetUUID());
console.log(iterativeGetUUID());
console.log(iterativeGetUUID());
console.log(iterativeGetUUID());

console.log(getUUID());
console.log(getUUID());
console.log(getUUID());
console.log(getUUID());

