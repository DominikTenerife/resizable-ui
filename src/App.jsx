import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom"
import Home from "../pages/Home"
import Layout from "../components/Layout"
import Example1 from "../pages/Example1"
import Example2 from "../pages/Example2"
import Example3 from "../pages/Example3"
import Example4 from "../pages/Example4"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="example1" element={<Example1 />} />
          <Route path="example2" element={<Example2 />} />
          <Route path="example3" element={<Example3 />} />
          <Route path="example4" element={<Example4 />} />
                    
        </Route>
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
