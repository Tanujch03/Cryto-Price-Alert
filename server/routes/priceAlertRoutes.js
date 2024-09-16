import express from 'express';
import  PriceAlert  from '../models/PriceAlert.js';
import { getCurrentPrice, publishToQueue } from '../helpers/priceAlert.js';

const router = express.Router();
const QUEUE_NAME = 'price_alerts';

// Set price alert
router.post('/set-alert', async (req, res) => {
    const { coinId, targetPrice, email } = req.body;
    const currentPrice = await getCurrentPrice(coinId);

    if (!targetPrice || isNaN(targetPrice)) {
        return res.status(400).json({ message: "Invalid target price." });
    }
    if (currentPrice === null) {
        return res.status(500).json({ message: "Unable to fetch current price." });
    }

    const newAlert = new PriceAlert({
        coinId,
        targetPrice: parseFloat(targetPrice),
        email,
        currentPrice,
        status: 'pending',
        time: new Date(),
    });

    await newAlert.save();
    const task = { coinId, targetPrice: parseFloat(targetPrice), email, currentPrice, time: newAlert.time };

    await publishToQueue(QUEUE_NAME, task);
    res.json({ message: 'Price alert set successfully!' });
});

// Get alerts history
router.get('/alerts-history', async (req, res) => {
    try {
        const alerts = await PriceAlert.find().sort({ createdAt: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        console.error('Error fetching alerts history:', error);
        res.status(500).json({ error: 'Failed to fetch alerts history' });
    }
});

export default router;
