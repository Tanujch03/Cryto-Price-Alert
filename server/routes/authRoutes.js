import express from 'express';
import hashPassword from '../helpers/auth.js';
import comparePassword from '../helpers/auth.js'
import jwt from 'jsonwebtoken';
import Usercred from '../models/Usercred.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name) return res.json({ error: "Name required" });
        if (!password || password.length < 6) return res.json({ error: "Password must be at least 6 characters" });

        const exists = await Usercred.findOne({ email });
        if (exists) return res.json({ error: "Email taken" });

        const hashedPassword = await hashPassword(password);

        const user = await Usercred.create({ name, email, password: hashedPassword });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usercred.findOne({ email });

        if (!user) return res.json({ error: "No user found" });

        const match = await comparePassword(password, user.password);

        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }).json(user);
            });
        } else {
            res.json({ error: "Password mismatch" });
        }
    } catch (error) {
        console.log(error);
    }
});
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie('connect.sid');
            res.redirect('http://localhost:3000');
        });
    });
});
// Export the router
export default router;
