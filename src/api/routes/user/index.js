import express from 'express'
import request from 'request'
import urlencode from 'urlencode' // 한글을 UTF-8로 변경(URL Encode)
import sqlquery from 'db/model/book.sql.js'
import Singleton from 'db'

const router = express.Router();
const connection = new Singleton();

router.get('/selected/:user_id', function(req, res) {
    // user가 고른 태그 출력(1;2;5)
    const user_id = req.params.user_id;

    let sql = "select tags from user_tag where user_id = ?";
    connection.query(sql, user_id, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log("확인되었습니다.");
            res.send(result);
        }
    });
});

router.post('/status/:tag/:user_id', function(req, res) {
    // user가 고른 태그 저장
    const tag = ";" + req.params.tag + ";";
    const user_id = req.params.user_id;
    const params = [user_id, tag];

    let sql = "insert into user_tag (user_id, tags) values (?, ?);";
    connection.query(sql, params, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log("확인되었습니다.");
            res.status(201).send('created');
        }
    });
});

router.put('/status/:tag/:user_id', function(req, res) {
    // user가 고른 태그 추가(업데이트)
    const tag = req.params.tag + ";";
    const user_id = req.params.user_id;

    let sql = "select tags from user_tag where user_id = ?";
    connection.query(sql, user_id, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            // tag 중복제거 필요
            const params = [result[0]['tags'] + tag, user_id];

            sql = "update user_tag set tags = ? where user_id = ?";
            connection.query(sql, params, function(error, result) {
                if(error) {
                    console.log(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log("추가되었습니다.");
                    res.status(200).send('updated');
                }
            });
        }
    });
});

router.delete('/delete/tag/:user_id', function(req, res) {
    // user가 고른 tag 삭제(user의 row 제거)
    const user_id = req.params.user_id;

    let sql = "delete from user_tag where user_id = ?";
    connection.query(sql, user_id, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log("제거되었습니다.");
            res.status(200).send('deleted');
        }
    });
});

router.get('/status/:isbn/:user_id', function(req, res) {
    // user가 isbn값의 책과 관련된 flag 값들(읽었어요/좋아요) 가져옴
    const user_id = req.params.user_id;
    const isbn = req.params.isbn;
    const params = [isbn, user_id];
    let sql = "select had_read, be_interested from user_book where isbn = ? and user_id = ?";
    
    connection.query(sql, params, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});

router.post('/status/:isbn/:user_id', function(req, res) {
    // user에 isbn값의 책에 flag들(읽었어요/좋아요) 정보를 저장
    const user_id = req.params.user_id;
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

router.get('/book/:user_id', function(req, res) {
    // user가 user_book 테이블에 등록된 isbn을 토대로 모든 책정보 반환
    const user_id = req.params.user_id;

    let sql = "select * from book where isbn = any (select isbn from user_book where user_id = ?)";
    
    connection.query(sql, user_id, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log("확인되었습니다.");
            res.send(result);
        }
    });
});

export default router;
