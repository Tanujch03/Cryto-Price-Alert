const express = require('express');
const { connectDB } = require('./config/db'); // Database connection
const userRoutes = require('./routes/userController');
const alertRoutes = require('./routes/alertController');
const { startConsumer } = require('./services/rabbitMQService');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle CORS headers manually
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://9a3942ae.cryto-price-alert.pages.dev');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Respond to preflight with no content
  }

  next();
});

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/alerts', alertRoutes);

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
