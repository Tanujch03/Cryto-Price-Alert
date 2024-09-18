import { useState } from 'react';
import { AlertCircle, History, ArrowUpDown } from "lucide-react";

export default function Navbar() {
  const [activeView, setActiveView] = useState('alerts');

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-xl">
      <nav className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveView('alerts')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold transition-colors duration-300 ${
            activeView === 'alerts' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-400 border border-gray-600'
          } hover:bg-blue-500 hover:text-white`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Set Alerts</span>
        </button>

        <button
          onClick={() => setActiveView('history')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold transition-colors duration-300 ${
            activeView === 'history' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-400 border border-gray-600'
          } hover:bg-blue-500 hover:text-white`}
        >
          <History className="w-4 h-4" />
          <span>Alert History</span>
        </button>

        <button
          onClick={() => setActiveView('scroll')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold transition-colors duration-300 ${
            activeView === 'scroll' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-400 border border-gray-600'
          } hover:bg-blue-500 hover:text-white`}
        >
          <ArrowUpDown className="w-4 h-4" />
          <span>Price Scroll</span>
        </button>
      </nav>

      <div className="mt-8">
        {activeView === 'alerts' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Set New Price Alert</h2>
            <button
              onClick={() => console.log('Open modal to set alert')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Set New Price Alert
            </button>
          </div>
        )}

        {activeView === 'history' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Alert History</h2>
            <p className="text-gray-300">Your alert history will be displayed here.</p>
          </div>
        )}

        {activeView === 'scroll' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Price Scroll</h2>
            <p className="text-gray-300">The price scroll component will be rendered here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
