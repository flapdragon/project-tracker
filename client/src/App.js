import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import "./App.css"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
