import About from "./about"
import Contact from "./contact"
import Product from "./product"
import Card from "./cards"
import { BrowserRouter, Routes, Route ,Link } from "react-router-dom"

function App() {


  return (
    <>
      <BrowserRouter>
      <nav>
       <Link to="/about">About</Link>
       <Link to="/product">Product</Link>
       <Link to="/contact">Contact</Link>
      </nav>
      <Card/>

        <Routes>
          <Route path="/about" element={<About/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
