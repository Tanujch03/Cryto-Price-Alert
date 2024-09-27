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
app.use(cors({
  origin: 'https://cryto-price-alert.pages.dev' // Allow only your frontend's domain
}));

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
