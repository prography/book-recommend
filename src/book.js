'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.json({"hello serverless book":true});
});

export const book = serverless(app);
