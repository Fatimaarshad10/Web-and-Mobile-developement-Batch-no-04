// function 
// parameter --> variable  
// argument  --> values



// CSS
// primary = "blue"
// var(primary)


// function Addition(){
//     console.log("Function called")
// }

// Addition()


// function Person(username , email , location){ // parameter 
//     console.log(username , email , location)
    
// }

// Person('fatima' , 'fatima@gmail.com' , 'faisalabad') // argument 
// Person('noor' , 'noor@gmail.com' , 'faisalabad') // argument 


function Addition(a , b ){
    // console.log("Sum of:" , a+b)
    return a+b;
}

// Addition(5, 10 )
// Addition(10, 10 )
// Addition(50, 10)

for(let i = 0 ; i < 5; i++){
    // console.log(i , i+1)
    const data = Addition(i , i+1)
    // console.log(data)
    // if(data === 3){
    //     break;
    // }
     if(data === 3){
        continue;
    }
    console.log(data)

     if(data === 7){
        break;
    }

    
}

// 1
// 3
// 5
// 7
// 9