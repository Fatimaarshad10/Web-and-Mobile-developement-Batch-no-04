import {useState} from react

function Hook() {
    const [count , setCount] = useState(0)
    // const digit = 0 
    // function increase (){
    //     digit++
    //     console.log(digit)
    // }
    //  function decrease (){
    //     digit--
    //     console.log(digit)
    // }



  return (
    <>
    {/* With simple variable and function */}
    {/* <h1>{digit}</h1>
    <button onClick={increase}>Increment</button>
    <button onClick={increase}>decrement</button> */}

{/* With useState Hook */}
 <h1>{count}</h1>
 <button className="bg-dark text-white" onClick={()=> setCount(count + 1 )}>Increment</button>
    <button className="bg-pink-300 "  onClick={()=> setCount(count - 1 )}>decrement</button>
    </>
  )
}

export default Hook
