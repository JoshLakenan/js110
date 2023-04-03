

/*Question 4  - question 9 

let obj = {x : "hey", y : "sup"}

let objChild = Object.create(obj);

objChild.z = "yoooo";

if (objChild['x']) {
  console.log('It works!');
}else console.log('Nope...');

console.log(objChild);

console.log(obj);*/

/*let arr = [42, 50, null, 90];

let obj = {1 : 1, 2 : 2, 3 : 3};

arr.forEach(e => {
  arr.length = 2;
  console.log(e);
})

console.log(arr.map(e => {
  return e + 100;
}));

console.log(arr);*/

const obj = { a: 'able', b: 'baker', c: 'charley' };
let result = Object.values(obj).map(value => value.toUpperCase());
// => [ 'ABLE', 'BAKER', 'CHARLEY' ]

console.log(result);