import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import amqp from 'amqplib';
import nodemailer from 'nodemailer';
import priceAlertRoutes from './routes/priceAlertRoutes.js'
dotenv.config();

const app = express();

app.use(bodyParser.json()); // Converts the encoded URL to JavaScript object
app.use(express.static('public'));
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Mongoose connected");
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Import and use routes
app.use('/auth', authRoutes);
app.use('/alerts', priceAlertRoutes);

// Start the server
const startServer = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running successfully at http://localhost:${process.env.PORT}`);
    });
};

// Define the RabbitMQ consumer function
const startConsumer = async () => {
    const QUEUE_NAME = 'price_alerts';
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const sendEmail = async (email, coinId, currentPrice, targetPrice, type) => {
        const subject = `Price Alert: ${coinId.toUpperCase()} has ${type === 'above' ? 'reached or exceeded' : 'dropped below'} your target price!`;
        const text = `The current price of ${coinId.toUpperCase()} is $${currentPrice}, which has ${type === 'above' ? 'reached' : 'dropped below'} your target price of $${targetPrice}.`;

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject,
                text,
            });
            console.log('Email sent successfully to', email);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const getCurrentPrice = async (coinId) => {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=${coinId}`;
        try {
            const response = await axios.get(url);
            return response.data[0].current_price;
        } catch (error) {
            console.error('Error fetching price:', error);
            return null;
        }
    };

    const checkPriceAndSendAlert = async (task) => {
        const { coinId, targetPrice, email, currentPrice } = task;
        const updatedPrice = await getCurrentPrice(coinId);

        if (updatedPrice === null) {
            console.log('Error fetching updated price for', coinId);
            return;
        }

        const type = updatedPrice >= targetPrice ? 'above' : 'below';
        if ((type === 'above' && updatedPrice >= targetPrice) || (type === 'below' && updatedPrice < targetPrice)) {
            await sendEmail(email, coinId, updatedPrice, targetPrice, type);
        }
    };

    try {
        const connection = await amqp.connect(process.env.RABBIT);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                const task = JSON.parse(msg.content.toString());
                await checkPriceAndSendAlert(task);

                // Acknowledge the message
                channel.ack(msg);
            }
        });

        console.log('Waiting for price alert tasks...');
    } catch (error) {
        console.error('Error:', error);
    }
};

// Start server and consumer
startServer();
startConsumer();
