import { BrowserRouter,Route,Routes } from "react-router-dom";
import {Signup} from './pages/Signup'
import {Signin} from './pages/Signin'
import { Blogs } from "./pages/Blogs";
import './App.css'

import { Blog } from "./pages/Blog";
import { Publish } from "./pages/Publish";
function App() {

 

  return (
    <>
    <div className="bg-black">
  <BrowserRouter>
  <Routes>
    <Route path = "/" element = {<Signup/>}/>
    <Route path = "/signin" element = {<Signin/>}/>
    <Route path="/blogs" element={<Blogs />} />



    <Route path = "/blog/:id" element = {<Blog/>}/>
    <Route path = "/publish" element = {<Publish/>}/>
  </Routes>
  </BrowserRouter>
  </div>
     </>
      
  )
}

export default App;