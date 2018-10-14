const express = require('express');
const serverless = require('serverless-http');
const app = express();
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.json({"hello serverless":true});
});

app.listen(3000,() => {
    console.log('listen 3000');
});
module.exports.handler = serverless(app);
