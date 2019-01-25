import express from 'express'
import request from 'request'
import urlencode from 'urlencode' // 한글을 UTF-8로 변경(URL Encode)
import sqlquery from 'db/model/book.sql.js'
import Singleton from 'db'
import request_sync from 'sync-request'

const router = express.Router();
const connection = new Singleton();

router.get('/listwithtag/:tags', function(req, res) {    // /books?tags=;1;3;
    // return : 1또는3또는5의 tag가 포함된 책들 list 반환
    const tags = req.params.tags;
    const tagArr = tags.split(';');

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
            const resultArray = result;

            for(let i=0; i<resultArray.length; i++) {
                const headers = {
                        "Authorization" : process.env.APIKEY
                    }
                const getdata = request_sync('GET','https://dapi.kakao.com/v3/search/book?query=' + resultArray[i]['isbn']+ '&page=1&size=1',{headers})
                //console.log(getdata.body.toString('utf-8'))
                const obj = JSON.parse(getdata.body.toString('utf-8'))
                //console.log(obj.documents)
                resultArray[i]['contents'] = obj.documents[0].contents;
                resultArray[i]['thumbnail'] = obj.documents[0].thumbnail;
            }
            return res.send(resultArray)


        }
    });
});

router.get('/listwithsearch/:search', function(req, res) {    // /books?title=위대한 개츠비
    const urlencodekey = urlencode(req.params.search);
    const options = {
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
                res.status(500).send('Internal Server Error : '+error);
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
            const resultArray = result;

            for(let i=0; i<resultArray.length; i++) {
                const headers = {
                        "Authorization" : process.env.APIKEY
                    }
                const getdata = request_sync('GET','https://dapi.kakao.com/v3/search/book?query=' + resultArray[i]['isbn']+ '&page=1&size=1',{headers})
                //console.log(getdata.body.toString('utf-8'))
                const obj = JSON.parse(getdata.body.toString('utf-8'))
                //console.log(obj.documents)
                resultArray[i]['contents'] = obj.documents[0].contents;
                resultArray[i]['thumbnail'] = obj.documents[0].thumbnail;
            }
            return res.send(resultArray)
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
            const resultArray = result;

            for(let i=0; i<resultArray.length; i++) {
                const headers = {
                        "Authorization" : process.env.APIKEY
                    }
                const getdata = request_sync('GET','https://dapi.kakao.com/v3/search/book?query=' + resultArray[i]['isbn']+ '&page=1&size=1',{headers})
                //console.log(getdata.body.toString('utf-8'))
                const obj = JSON.parse(getdata.body.toString('utf-8'))
                //console.log(obj.documents)
                resultArray[i]['contents'] = obj.documents[0].contents;
                resultArray[i]['thumbnail'] = obj.documents[0].thumbnail;
            }
            return res.send(resultArray)
        }
    });
});

router.get('/:isbn', function(req, res) {       // /books/9788937460753
    // isbn값에 대한 책정보 반환
    const isbn = req.params.isbn;
    const params = [isbn];
    let sql = "select * from book where isbn = ?";
     
    const options = {
        url : 'https://dapi.kakao.com/v3/search/book?query=' + isbn+ '&page=1&size=1',
        headers : {
            "Authorization" : process.env.APIKEY
        }
    };

    connection.query(sql,params, function(error, result) {
        if(error) throw error;
        request(options, function(error, response, html) {
            if(error) {
                throw error;
            } else {
                const obj = JSON.parse(html);   // string -> object
                const resultArray = result;

                for(let i=0; i<resultArray.length; i++) {
                    resultArray[i]['contents'] = obj.documents[0].contents;
                    resultArray[i]['thumbnail'] = obj.documents[0].thumbnail;
                }
                res.send(resultArray);
            }
        });
    });
});

export default router;
