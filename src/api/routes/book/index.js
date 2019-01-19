// npm install express request urlencode
import express from 'express'
import request from 'request'
import urlencode from 'urlencode' // 한글을 UTF-8로 변경(URL Encode)
import sqlquery from 'db/model/book.sql.js'
import config from 'config'
import Singleton from 'db'

const router = express.Router();
const connection = new Singleton();

router.get('/', function(req, res) {
    // 책 전체목록반환 , 대문 홈페이지 앞에 띄워줄거
    console.log("전체 목록 출력입니다.");
});

router.post('/', function(req, res) {
    // user_tag 테이블에 사용자가 선택한 tag insert
    let user_id = req.body.user_id;
    let tags = req.body.tags;       // 1;4;5

    let params = [user_id, tags];
    
    let sql = "insert into user_tag (user_id, tags) values (?, ?)";
    connection.query(sql, params, function(error, result) {
        console.log(result)
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }else{

            console.log("tags 입력되었습니다!");
        }
    });
});

router.get('/:title', function(req, res) {   //       /books/해를품은달
    // 책제목을 가지고 오면 json으로 책정보(작가, 내용, isbn)를 넘김
    let urlencodekey = urlencode(req.params.title);
    let options = {
        url : 'https://dapi.kakao.com/v3/search/book?query=' + urlencodekey + '&page=1&size=1',
        headers : {
            "Authorization" : config.apiKey
        }
    };

    request(options, function(error, response, html) {
        if(error) {
            throw error;
        }

        const obj = JSON.parse(html);   // String -> object

        const resultJSON = {
            title : req.params.title,
            authors : obj.documents[0].authors,
            contents : obj.documents[0].contents,
            thumbnail : obj.documents[0].thumbnail,
            isbn : obj.documents[0].isbn
        };

        res.json(resultJSON);
    });
});

router.post('/:title', function(req,res) {
    // 책제목 가지고 오면 isbn 결과 도출해서, flag값 가지고 온 걸 토대로 user_book 테이블에 상태값 insert
    let title = urlencode(req.params.title);
    let user_id = req.body.user_id;
    let isbn;// = req.body.isbn;       // isbn도 android에서 가지고 옴?

    let sql = "select isbn from book where book_name = ?";
    connection.query(sql, title, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            isbn = result;
            console.log("검색되었습니다!");
        }
    });

    // android : flag값(flag_r, flag_i)를 0 또는 1로 넘겨줌
    let flag_r = req.body.flag_r;
    let flag_i = req.body.flag_i;
    let params = [user_id, isbn, flag_r, flag_i];
    sql = "insert into user_book (user_id, isbn, had_read, be_interested) values (?, ?, ?, ?)";
    connection.query(sql, params, function(error, result) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log("입력되었습니다!");
        }
            
        // res.send('<h1>hola</h1>');
    });
});

router.put('/:title', function(req, res) {
    // 유저가 읽은 것 취소할건지, 관심있는거 취소할건지(flag에 따라 상태 변경)
    let title = req.params.title//urlencode(req.params.title);
    let user_id = req.body.user_id;
    let flag_r = req.body.flag_r;
    let flag_i = req.body.flag_i;
    let isbn;

    let sql = "select isbn from book where book_name = ?";
    connection.query(sql, title, function(error, result) {
        console.log(result);
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(result[0]['isbn']);
            isbn = result[0]['isbn'];
            let params = [flag_r, flag_i, isbn, user_id];
            sql = "update user_book set had_read = ?, be_interested = ? where isbn = ? and user_id = ?";
    

            connection.query(sql, params, function(error, result) {
                if(error) {
                    console.log(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log("업데이트 되었습니다!");
                }
            });
        }
    });

    
});

export default router;
