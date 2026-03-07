// let first_no = 2
// first_no++
// console.log(first_no) // 3
// first_no = first_no + 1 
// console.log(first_no) // 4
// first_no--
// console.log(first_no) // 3
// console.log(`First no  is ${first_no}+1`)
// console.log(`First no  is` , first_no + 1 )
// let text1 = "John";
// let text2 = "Doe";
// let text3 = text1 + "" + text2
// console.log(text3)

let value1 = 10 
let value2 = 20 

console.log(value1 > value2) // false
console.log(value2 < value1 )// false
console.log(value1 <= value2) // true
console.log(value2 >= value1) // true
console.log(value1 == value2) // false
console.log(value1 != value2) // true

// true , false -> boolean data type
console.log(value1 > value2 && value2 < value1) //false
console.log(value1 < value2 || value2 < value1) // true
let value3 = value1 > value2 && value2 < value1
console.log(!value3)