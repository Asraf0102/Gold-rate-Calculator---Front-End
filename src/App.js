import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login.js';
import Intro from './components/Intro.js';
import { LoginProvider } from './components/Login/LoginContext.js';

function App() {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists in localStorage

  return (
    <LoginProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/intro" element={<Intro />} />
        </Routes>
      </Router>
    </LoginProvider>
  );
}

export default App;
