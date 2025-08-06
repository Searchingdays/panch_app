import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import UserInfo from './components/userinfo';


function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/login" element={<Login />} />
        <Route path='/api/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;








