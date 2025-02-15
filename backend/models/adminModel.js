const db = require('../config/db');

const Admin = {
    create: (userData, callback) => {
        const { name, email, phone, role, password } = userData;
        const query = 'INSERT INTO users (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [name, email, phone, role, password], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    
    getAllUsers: (callback) => {
        const query = 'SELECT * FROM users';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE user_id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results.length ? results[0] : null);
        });
    },

    update: (id, userData, callback) => {
        const { name, email, phone, role, password } = userData;
        const query = 'UPDATE users SET name = ?, email = ?, phone = ?, role = ?, password = ? WHERE user_id = ?';
        db.query(query, [name, email, phone, role, password, id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE user_id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Admin;