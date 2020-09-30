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

app.get(API.history.url, async (req, res) => {
    await sleep(1000);
    res.status(200);
    res.json({ text: 'Hello Nuxt' });
    // res.status(500);
    // res.end();
});

app.get(API.drawRange.url, async (req, res) => {
    await sleep(1000);
    res.status(200);
    res.json({
        draw: true,
        share: false
    });
    // res.status(500);
    // res.end();
});

app.get(API.share.url, async (req, res) => {
    await sleep(1000);
    res.status(200);
    res.json({ text: 'Hello Nuxt' });
    // res.status(500);
    // res.end();
});

app.get(API.draw.url, async (req, res) => {
    await sleep(1000);
    res.status(200);
    res.json({
        reward: '獎項名稱',
        status: 'win'
    });
    // res.status(500);
    // res.end();
});

// 登入後導向
app.get('/', async (req, res) => {
    await sleep(1000);
    res.redirect('/');
});

module.exports = app;
