const express = require('express');
const { hashPassword, comparePassword } = require('../helpers/auth');
const Usercred = require('../models/Usercred');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validation
        if (!name || !password || password.length < 6) {
            return res.status(400).json({ error: "Invalid input" });
        }
        const exists = await Usercred.findOne({ email });
        if (exists) return res.status(400).json({ error: "Email already taken" });
        
        const hashedPassword = await hashPassword(password);
        const user = await Usercred.create({ name, email, password: hashedPassword });
        return res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usercred.findOne({ email });
        if (!user || !await comparePassword(password, user.password)) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        const token = jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
