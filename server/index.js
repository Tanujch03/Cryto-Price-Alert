const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {connectDB}= require('./config/db'); // Database connection
const userRoutes = require('./routes/userController');
const alertRoutes = require('./routes/alertController');
const { startConsumer } = require('./services/rabbitMQService');

const dotenv = require("dotenv")
dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'https://9a3942ae.cryto-price-alert.pages.dev/'
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/alerts', alertRoutes);
app.get("/work",(req,res)=>{
    res.json({message:"working"})
})
connectDB();
// Start RabbitMQ consumer
startConsumer();

// Start server
app.listen(port, () => {
   console.log(`Server running on http://localhost:${process.env.PORT}`);
});

