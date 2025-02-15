const Admin = require('../models/AdminModel');

const getAllUsers = (req, res) => {
    Admin.getAllUsers((err, users) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json(users);
    });
};

const getUserById = (req, res) => {
    const { id } = req.params;
    Admin.findById(id, (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    });
};

const createUser = (req, res) => {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    Admin.create({ name, email, phone, role: role ?? 'user', password }, (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(201).json({ message: 'User created successfully', id: results.insertId });
    });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, role, password } = req.body;

    Admin.update(id, { name, email, phone, role, password }, (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json({ message: 'User updated successfully' });
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;

    Admin.delete(id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };