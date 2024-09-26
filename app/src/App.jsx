
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

import PriceAlert from './components/PriceAlertForm';

import Home from './components/Home.jsx';
import History from './components/History';
import Scroll from './Scroll';
//import Navbar from './components/Navbar'
function App() {



  return (
    <div>
      <Router>
      <div className="App">
       
        
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricealert" element={<PriceAlert />} />
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/currentprice" element={<Scroll />}/>
        </Routes>
        
      </div>
    </Router>
    </div>
  );
}

export default App;
