/*
python args

book_list: 유저가 선정한 책들의 목록
tag_list: 유저가 선정한 tag들의 목록
author_score_rate, country_score_rate, tag_score_rate: score 방식에 영향을 주는 parameter
topn: output으로 상위 몇 개를 가져올 것인가 결정
book_path: "book.json" 파일의 경로*
*/ 

import request from 'request'
const CallPython = (book_list, tag_list) => {
    request.post({
        url:'http://django-env.muwpiqpbhd.ap-northeast-2.elasticbeanstalk.com/books/',
        //url:'http://localhost:8000/books/',
        form: {
                book_list:book_list, 
                tag_list:tag_list
        }
    }, function(err, response, body){
        console.log(err)
        if(err) return err 
        const data = body
        console.log(data)
        return data
    })
}

export default CallPython
