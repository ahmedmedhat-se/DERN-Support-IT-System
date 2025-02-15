const db = require('../config/db');

const User = {
    create: (userData, callback) => {
        const { name, email, phone, role, password } = userData;
        const query = 'INSERT INTO users (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [name, email, phone, role, password], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    }
};

module.exports = User;