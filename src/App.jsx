import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom"
import Home from "../pages/Home"
import Layout from "../components/Layout"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
                    
        </Route>
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
