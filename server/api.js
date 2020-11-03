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
            reward: 'reward1',
            number: 'FUL5XCO3',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward2',
            number: 'KLIRSSDJ',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: true
        },
        {
            reward: 'reward3',
            number: 'ZWHZTSLM',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: true
        },
        {
            reward: 'reward4',
            number: '6LEJMDUI',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward5',
            number: '4VMIQEER',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        }
    ]);
    // res.json([]);

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

app.post(API.memberID.url, async (req, res) => {
    await sleep(500);
    const formData = req.body;
    console.log(formData);
    res.status(200);
    res.send('Tuy0bS');
    // res.status(400);
    // res.end();
});

module.exports = app;
