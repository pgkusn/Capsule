const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};
const express = require('express');
const multer = require('multer');
const API = require('../api');
const app = express();
// eslint-disable-next-line no-unused-vars
const upload = multer();

app.get(API.getJsonData.url, async (req, res) => {
    await sleep(2000);
    res.status(200);
    res.json({ text: 'Hello Nuxt' });
});

module.exports = app;
