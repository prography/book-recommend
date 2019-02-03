/*
python args

book_list: 유저가 선정한 책들의 목록
tag_list: 유저가 선정한 tag들의 목록
author_score_rate, country_score_rate, tag_score_rate: score 방식에 영향을 주는 parameter
topn: output으로 상위 몇 개를 가져올 것인가 결정
book_path: "book.json" 파일의 경로*
*/ 

import request_sync from 'sync-request'

const CallPython = (book_list, tag_list) => {
    console.log('dltkddms ajdcjddl')
    const res = request_sync('POST', 'http://django-env.muwpiqpbhd.ap-northeast-2.elasticbeanstalk.com/books/',
        {"book_list":book_list},
        {"tag_list":tag_list}
    )
    return res.getBody('utf8')
}
export default CallPython
