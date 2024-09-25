const express = require('express');
const PriceAlert = require('../models/PriceAlert');
const { getCurrentPrice } = require('../services/priceService');
const { publishToQueue } = require('../services/rabbitMQService');
const router = express.Router();

router.post('/set-alert', async (req, res) => {
    const { coinId, targetPrice, email } = req.body;
    const currentPrice = await getCurrentPrice(coinId);

    if (!targetPrice || isNaN(targetPrice)) {
        return res.status(400).json({ message: "Please set a valid target price." });
    }

    if (currentPrice === null) {
        return res.status(500).json({ message: "Unable to fetch the current price." });
    }

    const newAlert = new PriceAlert({
        coinId,
        targetPrice: parseFloat(targetPrice),
        email,
        currentPrice,
        status: 'pending',
    });

    await newAlert.save();
    const task = { coinId, targetPrice: parseFloat(targetPrice), email, currentPrice };
    await publishToQueue('price_alerts', task);
    res.json({ message: 'Price alert set successfully!' });
});

router.get('/history', async (req, res) => {
    try {
        const alerts = await PriceAlert.find().sort({ createdAt: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        console.error('Error fetching alerts history:', error);
        res.status(500).json({ error: 'Failed to fetch alerts history' });
    }
});

module.exports = router;
