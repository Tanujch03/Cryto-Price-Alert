import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true, // Removes leading/trailing spaces
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true, // Converts the email to lowercase
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Basic email validation
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Usercred = model('Usercred', userSchema);

export default Usercred;
