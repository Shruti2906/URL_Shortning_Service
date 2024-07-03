const express = require('express');
const router = express.Router();

const {generateShortUrl, handleGetAnalytics, redirectToURL} = require('../controller/url.controller');

router.post("/", generateShortUrl);
router.get("/:shortId", redirectToURL);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;