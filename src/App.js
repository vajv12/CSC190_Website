import './App.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Locations from './pages/Locations.jsx';
import Rocklin from './pages/Rocklin.jsx';


import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Contact from './pages/Contact.jsx';


const App = () => {
  return (
    <div className="App">
      <Router>
       <Navbar />
      <Routes>
        <Route path="/pages/Home" element={<Home />}/>
        <Route path="/pages/About" element={<About />}/>
        <Route path="/pages/Contact" element={<Contact />}/>  
        <Route path="/pages/Login" element={<Login />}/>
        <Route path="/pages/Locations" element={<Locations />}/>
        <Route path="/pages/Rocklin" element ={<Rocklin />}/>
  
  
      </Routes>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
