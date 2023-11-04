import { useState } from 'react'
import HomePage from './components/HomePage';
import CreateAcc from './components/CreateAcc';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {

  return (
    <>
      <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<CreateAcc />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      </div>
    </>
  )
}

export default App
