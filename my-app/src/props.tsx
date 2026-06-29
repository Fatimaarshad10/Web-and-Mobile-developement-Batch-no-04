

export default function Props() {

  // let isData = false 
  // const data1 = prompt("Tell me your name")
  // console.log(data1)
  // if(data1){
  //   isData = true
  // }


  const Cards1 = [{
    id: 0,
    title: 'The Coldest Sunset',
    description: "Lorem ipsum dolor sit amet, consectetur",
    tags: "#travel"
  },
  {
    id: 1,
    title: 'The Coldest Photography',
    description: "Lorem ipsum dolor sit amet, consectetur",
    tags: "#photography"
  },
  {
    id: 2,
    title: 'The Coldest Winter',
    description: "Lorem ipsum dolor sit amet, consectetur",
    tags: "#winter"
  },
  {
    id: 3,
    title: 'The Coldest Winter 1',
    description: "Lorem ipsum dolor sit amet, consectetur",
    tags: "#html"
  }
  ]
  return (
    <>
      {/* {isData ? <h1>Yes, it's true </h1> : <h2>Not, True </h2>} */}
      {Cards1.map((data, key) => (
        <div key={key}>
          <div className="max-w-sm rounded overflow-hidden shadow-lg" >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{data.title}</div>
              <p className="text-gray-700 text-base">
                {data.description}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              {data.experience === 5 ? <>
              </> : <>
              {data}
              </>}
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.tags}</span>
            </div>
          </div>
        </div>
      ))}






    </>
  );
}

// destructing


// home username
// about
// contact

// import about from '/about'
// import Contact from "./contact";
// <home>
//     <About>

//         <Contact></Contact>
//     </About>
// </home>
