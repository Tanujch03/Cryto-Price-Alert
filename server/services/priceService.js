const axios = require('axios');

const getCurrentPrice = async (coinId) => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=ma`;
    const params = { vs_currency: 'usd', ids: coinId };

    try 
    {
        const response = await axios.get(url, { params });
        return response.data[0].current_price;
    } 
    catch (error) 
    {
        console.error('Error fetching price:', error);
        return null;
    }
};

module.exports = {
    getCurrentPrice,
  };