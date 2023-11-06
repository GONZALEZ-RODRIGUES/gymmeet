import HomePage from './components/HomePage';
import CreateAcc from './components/CreateAcc';
import UserHome from './components/UserHome';
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
          <Route path="/home" element={<UserHome />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>

      </div>
    </>
  )
}

export default App
