import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

export default function Scroll() {
  const [cryptoData, setCryptoData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=10'
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
    return null // Or a loading indicator
  }

  const currentCoin = cryptoData[currentIndex]

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 text-white shadow-lg rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <button
            className="p-2 rounded-full hover:bg-gray-700 focus:outline-none"
            onClick={handlePrev}
            aria-label="Previous cryptocurrency"
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{currentCoin.name}</h2>
            <p className="text-3xl font-semibold text-blue-400">
              ${currentCoin.current_price.toFixed(2)}
            </p>
            <p className="text-sm mt-2">
              24h Change: 
              <span className={currentCoin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                {currentCoin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </p>
          </div>
          <button
            className="p-2 rounded-full hover:bg-gray-700 focus:outline-none"
            onClick={handleNext}
            aria-label="Next cryptocurrency"
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
