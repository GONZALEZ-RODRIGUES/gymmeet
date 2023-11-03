import { useState } from 'react'
import HomePage from './components/HomePage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {

  return (
    <>
      <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
      </div>
    </>
  )
}

export default App
