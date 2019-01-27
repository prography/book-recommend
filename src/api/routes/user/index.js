import express from 'express'
import request from 'request'
import urlencode from 'urlencode' // 한글을 UTF-8로 변경(URL Encode)
import sqlquery from 'db/model/book.sql.js'
import Singleton from 'db'
import CallPython from 'util/index.js'

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

router.post('/status/tag/:tag/:user_id', function(req, res) {
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

router.put('/status/tag/:tag/:user_id', function(req, res) {
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

router.get('/status/book/:isbn/:user_id', function(req, res) {
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

router.post('/status/book/:isbn/:user_id', function(req, res) {
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



router.get('/recommend/:user_id', function(req, res) {
    // user의 태그와 관심있는 책 기반으로 추천
    const user_id = req.params.user_id;
    const params = [1, user_id];
    let data1;
    let sql1 = "select book_name from book where isbn in (select isbn from user_book where be_interested = ? and user_id = ?)";
    connection.query(sql1, params, function(error, result1) {
        if(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log("sql1 확인되었습니다.--------------");
            data1 = result1;
            console.log(result1)
            console.log(result1[0].book_name)
            // res.send(result1);

            let sql2 = "select tags from user_tag where user_id = ?";
            connection.query(sql2, user_id, function(error, result2) {
                if(error) {
                    console.log(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log("sql2 확인되었습니다.--------------");
                    console.log(result2[0].tags);
                    const tagsArr = result2[0].tags.split(';');
                    console.log(tagsArr);

                    let sql3 = "select tag_name from tag where tag_id = "                
                    for(let i=1; i<tagsArr.length-1; i++) {
                        if(i == 1) {
                            sql3 += + tagsArr[1]  
                        } else {
                            sql3 += " or tag_id = "+ tagsArr[i]
                        }
                    }
                    console.log(sql3)
                    connection.query(sql3, function(error, result3){
                        if(error){
                            console.log(error)
                            res.status(500).send('Internal Server Error');
                        } else{
                            console.log("sql3 확인되었습니다.--------------");
                            const booklist = []
                            for(let i=0; i<data1.length; i++) {
                                booklist[i] = data1[i].book_name;
                            }
                            const taglist = []
                            for(let i=0; i<result3.length; i++) {
                                taglist[i] = result3[i].tag_name;
                            }
                            console.log(booklist)
                            console.log(taglist)
                            console.log("============================")
                            request.post({
                                url:'http://django-env.muwpiqpbhd.ap-northeast-2.elasticbeanstalk.com/books/',
                                //url:'http://localhost:8000/books/',
                                form: {
                                        book_list:booklist, 
                                        tag_list:taglist
                                }
                            }, function(err, response, body){
                                // console.log(err)
                                if(err) return err 
                                let scoredbook = body 
                                console.log(scoredbook)
                                scoredbook = scoredbook.substring(1,scoredbook.length-1).replace(/\"/gi,'\'')
                                const params = [scoredbook]

                                let sql4 = "select isbn from book where book_name in ("+scoredbook +")"             
                                connection.query(sql4, null, function(error, result4){
                                    if(error){
                                        console.log(error)
                                        res.status(500).send('Internal Server Error');
                                    } else{
                                        console.log("result4------------------")
                                        console.log(sql4)
                                        console.log(result4)
                                    }
                                })
                            })
                            //위에꺼대신 아래껄로 콜백 넘어올때 받을 수 있게 해줘야함.
                            // const rec = CallPython({'books':booklist},{'tags':taglist})
                            // console.log(rec)
                        }
                    });
                }
            });
        }
    });
});

/*
router.get('/recommend/:user_id', function(req, res) {
        // user의 태그와 관심있는 책 기반으로 추천
        const user_id = req.params.user_id;
        const params = [1, user_id];
        let data;
        let sql1 = "select book_name from book where isbn in (select isbn from user_book where be_interested = ? and user_id = ?)";
        connection.query_promise(sql1, params)
            .then(result1 => {
                data = result1;
                console.log("sql1 확인되었습니다.--------------");
                console.log(result1)
                console.log(result1[0].book_name)
                res.send(result1);

                let sql2 = "select tags from user_tag where user_id = ?";
                return connection.query(sql2, user_id);
            })
            .then(result2 =>{
                console.log("sql2 확인되었습니다.--------------");
                console.log(result2)
                console.log(result2[0].tags);
                
                // const tagsArr = result2[0].tags.split(';');
                // console.log(tagsArr);
                
                // let sql3;
                    
                // for(let i=1; i<tagsArr.length-1; i++) {
                //     sql3 = "select tag_name from tag where tag_id = ?"
                //     connection.query(sql, tagsArr[i], function(err, result3){
                //         if(error){
                //             console.log(error)
                //             res.status(500).send('Internal Server Error');
                //         } else{
                //             console.log("sql3 확인되었습니다.--------------");
                //             console.log()
                //         }
                //     });
                // }
                res.send(result2);
            }, err => {
                console.log("result2에러-==================")
                console.log(error);
                res.status(500).send('Internal Server Error');
            })
            // .then( result3 => {

            // })
            .then( () => {
                console.log("데이터처리----------");
                console.log(data);
            })
            .catch( err => {
                console.log(error);
                res.status(500).send('Internal Server Error');
            })
        
        // const rec = CallPython({'books':result},{'tags':tagArr})
    });
*/
    


export default router;
