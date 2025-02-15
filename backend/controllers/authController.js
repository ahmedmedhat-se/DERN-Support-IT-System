const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const auth = (req, res) => {
    const { action, name, email, phone, role, password } = req.body;

    if (req.method === 'POST') {
        if (action === 'register') {
            if (!name || !email || !password || !role) {
                return res.status(400).json({ message: 'Name, email, password, and role are required!' });
            }

            User.findByEmail(email, (err, existingUser) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error', error: err });
                }
                if (existingUser) {
                    return res.status(409).json({ message: 'Email already registered!' });
                }

                const hashedPassword = bcrypt.hashSync(password, 10);

                User.create({ name, email, phone, role, password: hashedPassword }, (err, results) => {
                    if (err) {
                        return res.status(500).json({ message: 'Database error', error: err });
                    }
                    res.status(201).json({ 
                        message: 'User registered successfully', 
                        user: { id: results.insertId, name, email, phone, role }
                    });
                });
            });
        } else if (action === 'login') {
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required.' });
            }

            User.findByEmail(email, (err, user) => {
                if (err || !user) {
                    return res.status(401).json({ message: 'Invalid email or password.' });
                }

                const isPasswordValid = bcrypt.compareSync(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid email or password.' });
                }

                res.status(200).json({
                    message: 'Login successful',
                    user: { id: user.user_id, name: user.name, email: user.email, phone: user.phone, role: user.role }
                });
            });
        } else {
            res.status(400).json({ message: 'Invalid action' });
        }
    } else if (req.method === 'GET') {
        const user = req.body || null; 
        if (user) {
            res.status(200).json({ message: 'User is authenticated', user });
        } else {
            res.status(401).json({ message: 'User not authenticated' });
        }
    } else {
        res.status(400).json({ message: 'Invalid request method' });
    }
};

module.exports = { auth };