import express from 'express'
import request from 'request'
import urlencode from 'urlencode' // 한글을 UTF-8로 변경(URL Encode)
import sqlquery from 'db/model/book.sql.js'
import Singleton from 'db'

const router = express.Router();
const connection = new Singleton();

router.get('/listwithtag/:tags', function(req, res) {    // /books?tags=;1;3;
    // return : 1또는3또는5의 tag가 포함된 책들 list 반환
    const tags = req.params.tags;
    console.log(tags)
    const tagArr = tags.split(';');
    console.log(tagArr)
    
    let sql = "select * from book where ";

    for(let i=0; i<tagArr.length; i++) {
        if(i == 0) {
            sql += "tags like '%;" + tagArr[i] +";%' "
        } else {
            sql += "or tags like '%;" + tagArr[i] + ";%'"; 
        }
    }

    connection.query(sql, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log("확인되었습니다.");
            res.send(result);
        }
    });
});

router.get('/listwithsearch/:search', function(req, res) {    // /books?title=위대한 개츠비
    let urlencodekey = urlencode(req.params.search);
    let options = {
        url : 'https://dapi.kakao.com/v3/search/book?query=' + urlencodekey + '&page=1&size=1',
        headers : {
            "Authorization" : process.env.APIKEY
        }
    };

    request(options, function(error, response, html) {
        if(error) {
            throw error;
        }

        const params = [req.params.search, req.params.search];
        let sql = "select * from book where book_name like '%" + req.params.search + "%' or author like '%" + req.params.search + "%'";
        connection.query(sql, function(error, result) {
            if(error) {
                console.log(error);
                res.status(500).send('Internal Server Error');
            } else {
                const obj = JSON.parse(html);   // String -> object

                const resultArray = result;

                for(let i=0; i<result.length; i++) {
                    resultArray[i]['contents'] = obj.documents[0].contents;
                    resultArray[i]['thumbnail'] = obj.documents[0].thumbnail;
                }
                res.send(resultArray);
            }
        });
    });
});

router.get('/read/:user_id', function(req, res) {    // /books/read
    // 사용자가 읽은 책들의 list
    const user_id = req.params.user_id;
    let sql = "select * from book where isbn in (select isbn from user_book where had_read = 1 and user_id = ?);";

    connection.query(sql, user_id, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});

router.get('/interest/:user_id', function(req, res) {    // /books/interest
    // 사용자가 관심있는 책들의 list
    const user_id = req.params.user_id;
    let sql = "select * from book where isbn in (select isbn from user_book where be_interested = 1 and user_id = ?);";

    connection.query(sql, user_id, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});

router.get('/:isbn', function(req, res) {       // /books/9788937460753
    // isbn값에 대한 책정보 반환
    const isbn = req.params.isbn;
    const params = [isbn];
    let sql = "select * from book where isbn = ?";
    
    connection.query(sql, params, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});

router.get('/:isbn/status', function(req, res) {    // books/9788937460753/status
    // return : isbn값의 책과 관련된 flag 값들(읽었어요/좋아요) 가져옴
    // {flat_r=0, flat_i=1}
    const isbn = req.params.isbn;
    const params = [isbn];
    let sql = "select had_read, be_interested from user_book where isbn = ?";
    
    connection.query(sql, params, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});

router.post('/:isbn/status', function(req, res) {
    // return : isbn값의 책에 flag들(읽었어요/좋아요) 정보를 저장
    const user_id = req.body.user_id;
    const isbn = req.params.isbn;
    const flag_r = req.body.flag_r;
    const flag_i = req.body.flag_i;
    let params = [user_id, isbn, flag_r, flag_i];

    let sql = "insert into user_book (user_id, isbn, had_read, be_interested) values (?, ?, ?, ?)";
    
    connection.query(sql, params, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).send('created');
        }
    });
});

export default router;
