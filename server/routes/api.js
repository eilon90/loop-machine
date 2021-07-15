const express = require('express');
const router = express.Router();
const moment = require('moment');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

const Recording = require('../models/Recording');

router.post('/record', async function(req, res) {
    const r1 = new Recording({...req.body});
    await r1.save();
    const records = await Recording.find({});
    res.send(records);
})

router.get('/records', async function(req, res) {
    const records = await Recording.find({});
    res.send(records);
})

module.exports = router;