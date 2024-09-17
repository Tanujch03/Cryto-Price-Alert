
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Toaster from 'react-hot-toast';
import PriceAlert from './components/PriceAlertForm';

import Home from './components/Home';
import History from './components/History';

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
        </Routes>
        
      </div>
    </Router>
    </div>
  );
}

export default App;
