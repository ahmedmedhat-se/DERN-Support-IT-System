const express = require('express');
const { getAllTechnicians, getTechnicianById, createTechnician, updateTechnician, deleteTechnician } = require('../controllers/technicianController');

const router = express.Router();

router.get('/', getAllTechnicians);
router.get('/:id', getTechnicianById);
router.post('/', createTechnician);
router.put('/:id', updateTechnician);
router.delete('/:id', deleteTechnician);

module.exports = router;
