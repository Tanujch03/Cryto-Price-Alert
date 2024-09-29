const express = require('express');
const { connectDB } = require('./config/db'); 
const userRoutes = require('./routes/userController');
const alertRoutes = require('./routes/alertController');
const { startConsumer } = require('./services/rabbitMQService');
const cors = require('cors');
const dotenv = require("dotenv");
const compression = require('compression');
const redis = require('redis');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Redis client connection
const redisClient = redis.createClient({
  url: 'redis://127.0.0.1:6379',  // Assuming Redis is running locally
});

redisClient.connect()
  .then(() => {
    console.log('Connected to Redis successfully');
  })
  .catch((err) => {
    console.error('Could not connect to Redis:', err);
  });

// Proper Redis error handling
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Middleware for CORS and compression
app.use(cors({ origin: 'https://cryto-price-alert.pages.dev' }));
app.use(compression()); // Compress responses
app.use(express.json({ limit: '100kb' })); // Limit JSON payload size

// Caching middleware with better error handling
const cacheMiddleware = async (req, res, next) => {
  try {
    const key = `${req.method}:${req.originalUrl}`;
    const data = await redisClient.get(key);

    if (data) {
      console.log(`Cache hit for ${key}`);
      return res.json(JSON.parse(data)); // Return cached response
    }
    console.log(`Cache miss for ${key}`);
    next(); // Proceed if no cache found
  } catch (err) {
    console.error('Redis error in cache middleware:', err);
    next(); // Proceed to next middleware even if Redis fails
  }
};

// Routes with caching
app.use('/api/users', userRoutes);
app.use('/api/alerts', cacheMiddleware, alertRoutes);

// Test route
app.get("/work", (req, res) => {
  res.json({ message: "working" });
});

// Connect to the database
connectDB();

// Start RabbitMQ consumer
startConsumer();

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
