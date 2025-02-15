const db = require('../config/db');

const Technician = {
    create: (technicianData, callback) => {
        const { name, email, phone, skillset, availability } = technicianData;
        const query = 'INSERT INTO technicians (name, email, phone, skillset, availability) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [name, email, phone, skillset, availability], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    findAll: (callback) => {
        const query = 'SELECT * FROM technicians';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    findById: (technician_id, callback) => {
        const query = 'SELECT * FROM technicians WHERE technician_id = ?';
        db.query(query, [technician_id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    update: (technician_id, technicianData, callback) => {
        const { name, email, phone, skillset, availability } = technicianData;
        const query = 'UPDATE technicians SET name = ?, email = ?, phone = ?, skillset = ?, availability = ? WHERE technician_id = ?';
        db.query(query, [name, email, phone, skillset, availability, technician_id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    delete: (technician_id, callback) => {
        const query = 'DELETE FROM technicians WHERE technician_id = ?';
        db.query(query, [technician_id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Technician;