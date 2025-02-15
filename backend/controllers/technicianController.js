const Technician = require('../models/technicianModel');

const getAllTechnicians = (req, res) => {
    Technician.findAll((err, technicians) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json(technicians);
    });
};

const getTechnicianById = (req, res) => {
    const { id } = req.params;
    Technician.findById(id, (err, technician) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        if (!technician) return res.status(404).json({ message: 'Technician not found' });
        res.status(200).json(technician);
    });
};

const createTechnician = (req, res) => {
    const { name, email, phone, skillset, availability } = req.body;
    if (!name || !email || !skillset) {
        return res.status(400).json({ message: 'Name, email, and skillset are required' });
    }

    Technician.create({ name, email, phone, skillset, availability: availability ?? 1 }, (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(201).json({ message: 'Technician created successfully', id: results.insertId });
    });
};

const updateTechnician = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, skillset, availability } = req.body;

    Technician.update(id, { name, email, phone, skillset, availability }, (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json({ message: 'Technician updated successfully' });
    });
};

const deleteTechnician = (req, res) => {
    const { id } = req.params;

    Technician.delete(id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json({ message: 'Technician deleted successfully' });
    });
};

module.exports = { getAllTechnicians, getTechnicianById, createTechnician, updateTechnician, deleteTechnician };