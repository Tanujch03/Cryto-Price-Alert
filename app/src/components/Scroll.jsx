

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react'

export default function Scroll() {
  const [cryptoData, setCryptoData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=ma'
        )
        const data = await response.json()
        setCryptoData(data)
      } catch (error) {
        console.error('Error fetching crypto prices:', error)
      }
    }

    fetchCryptoPrices()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cryptoData.length)
    }, 5000) // Rotate every 5 seconds

    return () => clearInterval(timer)
  }, [cryptoData.length])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cryptoData.length) % cryptoData.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cryptoData.length)
  }

  if (cryptoData.length === 0) {
    return (
      <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  const currentCoin = cryptoData[currentIndex]

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          aria-label="Previous cryptocurrency"
          className="p-2 hover:bg-gray-700 rounded-full"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">{currentCoin.name}</h2>
          <div className="flex items-center justify-center mb-2">
            <img src={currentCoin.image} alt={currentCoin.name} className="w-8 h-8 mr-2" />
            <p className="text-3xl font-semibold text-blue-400">
              ${currentCoin.current_price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-center">
            {currentCoin.price_change_percentage_24h >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <p
              className={`text-sm ${
                currentCoin.price_change_percentage_24h >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {currentCoin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>
        <button
          onClick={handleNext}
          aria-label="Next cryptocurrency"
          className="p-2 hover:bg-gray-700 rounded-full"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-400">Market Cap: ${currentCoin.market_cap.toLocaleString()}</p>
        <p className="text-sm text-gray-400">24h Volume: ${currentCoin.total_volume.toLocaleString()}</p>
      </div>
    </div>
  )
}
