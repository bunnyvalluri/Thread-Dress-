/**
 * THREAD & FORM — Concierge Routes
 */
const express = require('express');
const router = express.Router();
const conciergeController = require('../controllers/conciergeController');

router.post('/chat', conciergeController.chat);

module.exports = router;
