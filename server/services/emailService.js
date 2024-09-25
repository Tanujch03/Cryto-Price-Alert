const nodemailer = require('nodemailer');
const dotenv = require("dotenv")
dotenv.config()
// Configure the email transporter with Gmail service and authentication
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER ,  // Your Gmail address
        pass: process.env.EMAIL_PASS,       // Your Gmail app-specific password (ensure it's secure)
    },
});

// Function to send an email notification
const sendEmail = async (email, coinId, currentPrice, targetPrice, type) => {
    // Define the email subject and message body based on the type ('above' or 'below' target price)
    const subject = `Price Alert: ${coinId.toUpperCase()} has ${type === 'above' ? 'reached or exceeded' : 'dropped below'} your target price!`;
    const text = `The current price of ${coinId.toUpperCase()} is $${currentPrice}, which has ${type === 'above' ? 'reached' : 'dropped below'} your target price of $${targetPrice}.`;

    try {
        // Send the email
        await transporter.sendMail({
            from: 'tanujchaganti@gmail.com',  // Sender email address
            to: email,                        // Recipient email address
            subject,                          // Email subject
            text,                             // Email message body
        });
        console.log('Email sent successfully to', email);
    } catch (error) {
        // Handle any errors that occur during the email sending process
        console.error('Error sending email:', error);
    }
};

// Export the sendEmail function so it can be used in other parts of the application
module.exports = {
    sendEmail,
};
