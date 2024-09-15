import mongoose from "mongoose"


const alertSchema = new mongoose.Schema({
    coinId: {
        type: String,
        required: true,   
        trim: true        
    },
    targetPrice: {
        type: Number,
        required: true,   
        min: 0            
    },
    email: {
        type: String,
        required: true,   
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'] 
    },
    currentPrice: {
        type: Number,
        required: true,   
        min: 0            
    },
    status: {
        type: String,
        enum: ['pending', 'triggered'],  
        default: 'pending',             
        required: true                   
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    time: {
        type: Date,
        default: Date.now  
    }
});


const PriceAlert = mongoose.model('PriceAlert', alertSchema);

export default PriceAlert;