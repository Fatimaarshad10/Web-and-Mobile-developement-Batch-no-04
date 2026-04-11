// array
// let student_list = ['amna', 'maryam', 'ayesha', 'noor']
// console.log(student_list.length)
// // push , pop , shift , unshift

// student_list.push(12)
// student_list.shift()
// student_list.unshift('fatima')
// student_list.pop()
// student_list.shift()

// console.log(student_list)
// console.log(student_list[2] - 1)
// console.log(student_list.join("-"))
// delete student_list[1]
// console.log(student_list)






// fatima , maryam , ayesha , 12 
// fatima , maryam , ayesha , noor 
// fatima , maryam , ayesha 
// ayesha , noor
// maryam ,ayesha , noor
// amna , maryam , ayesha , noor


// noor -1 


// const even_no = [2, 3, 4, 5, 6, 7, 8, 9]
// let save_even_no = []
// for(let i = 0 ; i < even_no.length ; i++){
//     if(even_no[i] % 2 === 0){
//         save_even_no.push(even_no[i])
//     }
// }
// console.log(save_even_no)




// let students = ['amna' , 'fatima']
// let roll_no = [23 , 34] 
// let city = ['faisalabad' , 'lahore'] 

// const new_array = students.concat(roll_no , city)
// console.log(new_array)


// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// console.log(fruits.copyWithin(2, 0))

// const myArr = [[0,2],[3,4],[5,6]];
// const newArr = myArr.flat();
// console.log(newArr)



// dom manipulation
const data = document.createElement("h1")
// data.append("hello world")
document.body.append('hello world')
console.log(document)