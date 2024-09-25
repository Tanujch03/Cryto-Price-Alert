const amqp = require('amqplib');
const { sendEmail } = require('./emailService');
const { getCurrentPrice } = require('./priceService');
const dotenv = require("dotenv")
dotenv.config()
const QUEUE_NAME = process.env.QUEUE_NAME;

const publishToQueue = async (queue, message) => {
    try {
        const connection = await amqp.connect(process.env.RABBIT_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log('Task sent to queue:', message);
        setTimeout(() => connection.close(), 500);
    } catch (error) {
        console.error('Error publishing to RabbitMQ:', error);
    }
};

const checkPriceAndSendAlert = async (task) => {
    const { coinId, targetPrice, email } = task;
    const updatedPrice = await getCurrentPrice(coinId);

    if (updatedPrice === null) {
        console.log('Error fetching updated price for', coinId);
        return;
    }

    const type = updatedPrice >= targetPrice ? 'above' : 'below';
    if (type === 'above' && updatedPrice >= targetPrice) {
        await sendEmail(email, coinId, updatedPrice, targetPrice, type);
    }
};

const startConsumer = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBIT_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg) {
                const task = JSON.parse(msg.content.toString());
                await checkPriceAndSendAlert(task);
                channel.ack(msg);
            }
        });

        console.log('Waiting for price alert tasks...');
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = { publishToQueue, startConsumer };
