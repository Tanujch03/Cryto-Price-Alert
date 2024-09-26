import { useState, useEffect, useRef } from 'react';

const PriceAlertHistory = () => {
  const [history, setHistory] = useState([]);
  const [visibleItems, setVisibleItems] = useState(10); // Start by showing 10 items
  const loaderRef = useRef(null); // To observe the loader for infinite scrolling

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('https://cryto-price-alert.vercel.app/api/alerts/history');
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching alert history:', error);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10); // Load 10 more items
      }
    }, { threshold: 1 });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-white">Price Alert History</h1>
      {history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {history.slice(0, visibleItems).map((alert) => (
            <div
              key={alert.id}
              className="bg-gray-800 p-6 rounded-lg transition transform hover:scale-105 hover:shadow-xl duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 text-white">{alert.coinId}</h2>
              <p className="text-gray-400"><strong>Target Price:</strong> ${alert.targetPrice}</p>
              <p className="text-gray-400"><strong>Email:</strong> {alert.email}</p>
              <p className="text-gray-500 text-sm"><strong>Date:</strong> {new Date(alert.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No alert history found.</p>
      )}
      
      {/* Loader Spinner */}
      {visibleItems < history.length && (
        <div ref={loaderRef} className="flex justify-center mt-6">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default PriceAlertHistory;
