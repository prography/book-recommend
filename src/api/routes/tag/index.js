// npm install express request urlencode
import express from 'express'
import request from 'request'
import urlencode from 'urlencode' // 한글을 UTF-8로 변경(URL Encode)
import sqlquery from 'db/model/book.sql.js'
import Singleton from 'db'

const router = express.Router();
const connection = new Singleton();

router.get('/', function(req, res) {        // /tags
    let sql = "select * from tag";

    connection.query(sql, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});

export default router;
