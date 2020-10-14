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

// eslint-disable-next-line no-unused-vars
const upload = multer();

app.post(API.history.url, async (req, res) => {
    await sleep(1000);
    res.status(200);
    res.json({ text: 'Hello Nuxt' });
    // res.status(400);
    // res.end();
});

app.post(API.drawRange.url, async (req, res) => {
    await sleep(1000);
    res.status(200);
    res.json({
        draw: false,
        share: false
    });
    // res.status(400);
    // res.end();
});

app.post(API.share.url, async (req, res) => {
    await sleep(1000);
    res.status(200);
    console.log(req.body);
    res.json(
        {
            code: 'S0000000',
            message: ''
        }
        // {
        //     code: 'E0600005',
        //     message: 'user_not_login'
        // }
    );
    // res.status(400);
    // res.end();
});

app.post(API.draw.url, async (req, res) => {
    await sleep(1000);
    res.status(200);
    res.json({
        reward: '獎項名稱',
        status: 'win'
    });
    // res.status(400);
    // res.end();
});

// 登入後導向
app.get('/', async (req, res) => {
    await sleep(1000);
    res.redirect('/');
});

module.exports = app;
