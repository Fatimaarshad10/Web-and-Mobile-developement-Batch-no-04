import About from "./about"
import Contact from "./contact"
import Product from "./product"
import Card from "./cards"
import User from './user'
import Product1 from './useEffect'
import { BrowserRouter, Routes, Route ,Link } from "react-router-dom"

function App() {


  return (
    <>
      <BrowserRouter>
      <nav>
       <Link to="/about">About</Link>
       <Link to="/product">Product</Link>
       <Link to="/contact">Contact</Link>
       <Link to="/user">User</Link>
       <Link to="/useEffect">Products with useEffect</Link>


      </nav>
      <Card/>

        <Routes>
          <Route path="/about" element={<About/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/useEffect" element={<Product1/>}/>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
