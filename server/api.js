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

app.post(API.history.url, upload.array(), async (req, res) => {
    await sleep(500);

    const formData = req.body;
    console.log(formData);

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

app.post(API.drawRange.url, upload.array(), async (req, res) => {
    await sleep(500);

    const formData = req.body;
    console.log(formData);

    res.status(200);
    res.json({
        draw: true,
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

app.post(API.draw.url, upload.array(), async (req, res) => {
    await sleep(500);

    const formData = req.body;
    console.log(formData);

    res.status(200);
    const status = ['win', 'normal', 'lose'];
    const statusIdx = Math.floor(Math.random() * status.length);
    let reward = '';
    if (statusIdx === 0) {
        const rewardNum = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        reward = `reward${rewardNum}`;
    }
    res.json({
        reward,
        status: status[statusIdx]
    });
    // res.status(400);
    // res.end();
});

module.exports = app;
