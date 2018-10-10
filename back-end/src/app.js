const express = require("express");

const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/author', function(res,req){
    const result = {
        author: "이상은",
        age: "25"
    }
    res.json(result);
})

app.get('/blist', function(res,req) {
    const result = {
        author: "안녕",
        age: 1
    }
    res.json(result);
});

export default app;

