const express = require('express');
const { createShortURL, retrieveShortURL, updateShortURL, deleteShortURL } = require('./service');

const router = express.Router();

router.post('/shorten', createShortURL);
router.get('/shorten/:shortURLParams', retrieveShortURL);
router.put('/shorten/:shortURLParams', updateShortURL);
router.delete('/shorten/:shortURLParams', deleteShortURL);

module.exports = router;
