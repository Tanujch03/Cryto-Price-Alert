import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import Scroll from '../Scroll'; // Assuming Scroll is imported correctly
import { AlertCircle, History, ArrowUpDown } from 'lucide-react';

export default function Component() {
  const [coinId, setCoinId] = useState('');
  const [cryptoData, setCryptoData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('alerts');
  const [alertHistory, setAlertHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc'
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };

    fetchCryptoPrices();
  }, []);

  useEffect(() => {
    if (coinId) {
      const filteredSuggestions = cryptoData
        .filter((coin) => coin.name.toLowerCase().includes(coinId.toLowerCase()))
        .map((coin) => coin.id)
        .sort();
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [coinId, cryptoData]);

  const handleSuggestionClick = (id) => {
    setCoinId(id);
    setShowSuggestions(false);
  };

  const handleSubmit = async () => {
    if (targetPrice && email && coinId) {
      try {
        const response = await fetch('https://cryto-price-alert.vercel.app/api/alerts/set-alert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ coinId, targetPrice, email }),
        });
        const data = await response.json();
        toast.success(data.message);
        setIsModalOpen(false);
        setAlertHistory([
          ...alertHistory,
          { coinId, targetPrice, email, date: new Date().toLocaleString() },
        ]);
      } catch (error) {
        console.error('Error setting alert:', error);
        toast.error('Failed to set price alert.');
      }
    } else {
      toast.error('Please fill out all fields.');
    }
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'alerts':
        return (
          <div className="flex flex-col items-center space-y-4 m-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Set New Price Alert
            </button>
          </div>
        );
      case 'history':
        return (
          <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Alert History</h2>
            {alertHistory.length > 0 ? (
              <ul className="space-y-4">
                {alertHistory.map((alert, index) => (
                  <li key={index} className="bg-gray-700 p-4 rounded-lg">
                    <p><strong>Coin:</strong> {alert.coinId}</p>
                    <p><strong>Target Price:</strong> ${alert.targetPrice}</p>
                    <p><strong>Email:</strong> {alert.email}</p>
                    <p><strong>Date Set:</strong> {alert.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No alerts have been set yet.</p>
            )}
          </div>
        );
      case 'scroll':
        return (
          <div className="flex flex-col items-center">
            <Scroll />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      <nav className="w-full bg-gray-800 py-4 fixed top-0 left-0 z-50 shadow-xl flex justify-center space-x-4">
        <button
          onClick={() => setActiveView('alerts')}
          className={`${
            activeView === 'alerts' ? 'bg-blue-600' : 'bg-gray-700'
          } hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Set Alerts</span>
        </button>
        <button
          onClick={() => setActiveView('history')}
          className={`${
            activeView === 'history' ? 'bg-purple-600' : 'bg-gray-700'
          } hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2`}
        >
          <History className="w-4 h-4" />
          <span>Alert History</span>
        </button>
        <button
          onClick={() => setActiveView('scroll')}
          className={`${
            activeView === 'scroll' ? 'bg-green-600' : 'bg-gray-700'
          } hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2`}
        >
          <ArrowUpDown className="w-4 h-4" />
          <span>Price Scroll</span>
        </button>
      </nav>

      <div className="pt-24 flex justify-center">
        {renderContent()}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Set Price Alert</h2>
            <div className="relative mb-6">
              <input
                type="text"
                value={coinId}
                onChange={(e) => setCoinId(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                ref={inputRef}
                className="px-4 py-3 w-full border border-gray-700 rounded-full bg-gray-900 text-white focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none transition duration-300"
                placeholder="Search cryptocurrency..."
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full mt-2 w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
                  {suggestions.map((id) => (
                    <li
                      key={id}
                      onClick={() => handleSuggestionClick(id)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-600 text-white"
                    >
                      {id}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-6">
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                className="px-4 py-3 w-full border border-gray-700 rounded-full bg-gray-900 text-white focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none transition duration-300"
                placeholder="Target Price (e.g. 50000)"
              />
            </div>

            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 w-full border border-gray-700 rounded-full bg-gray-900 text-white focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none transition duration-300"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Submit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
