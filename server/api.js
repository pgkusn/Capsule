const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};
const express = require('express');
const multer = require('multer');
const API = require('../api');
const app = express();

app.use(express.json()); // 接收 json 資料
app.use(express.urlencoded({ extended: false })); // 接收 form urlencoded 的資料

const upload = multer();

app.post(API.history.url, async (req, res) => {
    await sleep(500);
    res.status(200);
    res.json([
        {
            reward: '獎項1',
            number: '獎項序號',
            exchange: true,
            url: 'https://'
        },
        {
            reward: '獎項2',
            number: '獎項序號2',
            exchange: true,
            url: 'https://'
        }
    ]);
    // res.status(400);
    // res.end();
});

app.post(API.drawRange.url, async (req, res) => {
    await sleep(500);
    const formData = req.body;
    console.log(formData);
    res.status(200);
    res.json({
        draw: false,
        share: false
    });
    // res.status(400);
    // res.end();
});

app.post(API.share.url, upload.array(), async (req, res) => {
    await sleep(500);
    const formData = req.body;
    console.log(formData);
    res.status(200);
    // res.status(400);
    res.end();
});

app.post(API.draw.url, async (req, res) => {
    await sleep(500);
    const formData = req.body;
    console.log(formData);
    res.status(200);
    res.json({
        reward: 'reward1',
        status: 'win'
    });
    // res.status(400);
    // res.end();
});

module.exports = app;
