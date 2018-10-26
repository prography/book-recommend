'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    const boooook = {
	book: "hi",
	author: "lee"
    };
    res.json(boooook);
    
});

export const book = serverless(app);
