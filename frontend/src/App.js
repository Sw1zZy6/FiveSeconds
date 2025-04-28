import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/welcome';
import Signup from './pages/signup';
import Login from './pages/login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>

  );
}

export default App;
