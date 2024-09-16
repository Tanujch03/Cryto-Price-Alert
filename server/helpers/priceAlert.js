import axios from 'axios';
import amqp from 'amqplib';

// Fetch current price from CoinGecko
export const getCurrentPrice = async (coinId) => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc';
    const params = { vs_currency: 'usd', ids: coinId };

    try {
        const response = await axios.get(url, { params });
        return response.data[0].current_price;
    } catch (error) {
        console.error('Error fetching price:', error);
        return null;
    }
};

// Publish to RabbitMQ
export const publishToQueue = async (queue, message) => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: true });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        setTimeout(() => connection.close(), 500);
    } catch (error) {
        console.error('Error publishing to RabbitMQ:', error);
    }
};
