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
    await sleep(1000);
    res.status(200);
    res.json({ text: 'Hello Nuxt' });
    // res.status(500);
    // res.end();
});

// 登入後導向
app.get('/', async (req, res) => {
    await sleep(1000);
    res.redirect('/');
});

module.exports = app;
