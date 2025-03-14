const express = require('express');
const { createShortURL, retrieveShortURL, updateShortURL, deleteShortURL, getURLStatistics } = require('./service');

const router = express.Router();

router.post('/shorten', createShortURL);
router.get('/shorten/:shortURLParams', retrieveShortURL);
router.put('/shorten/:shortURLParams', updateShortURL);
router.delete('/shorten/:shortURLParams', deleteShortURL);
router.get('/shorten/:shortURLParams/stats', getURLStatistics);

module.exports = router;
