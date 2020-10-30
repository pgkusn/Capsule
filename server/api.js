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
            reward: 'reward1',
            number: 'KLIRSSDJ',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward1',
            number: 'ZWHZTSLM',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward1',
            number: '6LEJMDUI',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward1',
            number: '4VMIQEER',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward1',
            number: 'R0EJUNTK',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward1',
            number: 'ZKPOM75B',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward1',
            number: 'H26L74TS',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward1',
            number: 'QIL5V9BK',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward1',
            number: 'KOZVQXIZ',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward1',
            number: '0K7YTLAX',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward4',
            number: 'YZAV2DNS',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward5',
            number: 'QPA5WXLD',
            url: 'https://vidol.tv/payments/dmlkb2xfMTA0Mw==',
            exchange: false
        },
        {
            reward: 'reward5',
            number: 'TYN4SHZA',
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
        reward: '',
        status: 'lose'
    });
    // res.status(400);
    // res.end();
});

module.exports = app;
