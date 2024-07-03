const { nanoid } = require("nanoid");
const url = require('../model/url.model');
require('dotenv').config();

const generateShortUrl = async (req, res) => {
    const deployedURL = process.env.deployedURL;
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }
    const shortId = nanoid(8);
    await url.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
    })
    return res.status(200).json({ url: ` ${deployedURL}/${shortId}` });

}

const redirectToURL = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await url.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    });

    res.redirect(entry.redirectURL);
}

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await url.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    generateShortUrl,
    handleGetAnalytics,
    redirectToURL
}