- # API Guide

  ### 1. Auth(/auth)

  - 가. /register : 회원가입
    - post
  - 나. /login : 로그인
    - post
  - 다. /update : 수정
    - post
  - 라. /validate : 유저검증
    - post

  

  ### 2. Book(/books)

  - 가. /listwithtag/:tags : 태그가 포함된 책 리스트
    - get
    - return: [{"isbn":"9787501220779","tags":";11;1;","book_name":"상도","author":"최인호","country":"국내소설"}]
  - 나. /listwithsearch/:search : 책이름으로 책 검색
    - get
    - return : [{"isbn":"9788937460753","tags":";4;7;6;29;23;30;20;","book_name":"위대한 개츠비","author":"스콧 피츠제럴드","country":"영미소설","contents":"20세기의 가장 뛰어난 미국 소설로 꼽히는 스콧 피츠제럴드의 작품 『위대한 개츠비』. 1991년 영국 케임브리지 대학교 출판부에서 출간한 ‘결정판’ 텍스트를 바탕으로 완역한 책이다. ‘재즈의 시대’였던 1920년대 미국을 배경으로 무너져 가는 아메리칸 드림을 예리한 필치로 그려냈다. 이 작품은 2013년 레오나르도 디카프리오 주연의 영화로 개봉되며 다시 한 번 뜨거운 관심을 받고 있는데, 3D로 제작된 영화는 제66회 칸 국제영화제 개막작으로 선정되기","thumbnail":"https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540841%3Ftimestamp%3D20190123173033"}]
  - 다. /read/:user_id : 사용자가 읽은 책 리스트
    - get
    - return : [{"isbn":"9788937460753","tags":";4;7;6;29;23;30;20;","book_name":"위대한 개츠비","author":"스콧 피츠제럴드","country":"영미소설"}]
  - 라. /interest/:user_id : 사용자가 관심있는 책 리스트
    - get
    - return  : [{"isbn":"9788937460753","tags":";4;7;6;29;23;30;20;","book_name":"위대한 개츠비","author":"스콧 피츠제럴드","country":"영미소설"}]
  - 마. /:isbn : ISBN으로 책 검색
    - get
    - return : [{"isbn":"9788937460753","tags":";4;7;6;29;23;30;20;","book_name":"위대한 개츠비","author":"스콧 피츠제럴드","country":"영미소설","contents":"20세기의 가장 뛰어난 미국 소설로 꼽히는 스콧 피츠제럴드의 작품 『위대한 개츠비』. 1991년 영국 케임브리지 대학교 출판부에서 출간한 ‘결정판’ 텍스트를 바탕으로 완역한 책이다. ‘재즈의 시대’였던 1920년대 미국을 배경으로 무너져 가는 아메리칸 드림을 예리한 필치로 그려냈다. 이 작품은 2013년 레오나르도 디카프리오 주연의 영화로 개봉되며 다시 한 번 뜨거운 관심을 받고 있는데, 3D로 제작된 영화는 제66회 칸 국제영화제 개막작으로 선정","thumbnail":"https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540841%3Ftimestamp%3D20190123173033"}]

  

  ### 3. Tag(/tags)

  - 가. / : 태그 종류 출력
    - get
    - return : [ { "tag_id": 1, "tag_name": "흥미진진" }, ... ]

  

  ### 4. User(/user)

  - 가.  /selected/:user_id : 유저가 고른 태그 출력
    - get
    - return : [{"tags":";1;2;3;"}]
  - 나. /status/tag/:tag/:user_id : 유저가 고른 태그 저장
    - post
  - 다. /status/tag/:tag/:user_id : 유저가 고른 태그 추가
    - put
  - 라. /delete/tag/:user_id : 유저가 고른 태그 삭제
    - delete
  - 마. /status/book/:isbn/:user_id : 유저가 ISBN값의 책과 관련된 flag값들(읽었어요/좋아요) 출력
    - get
    - return : [{"had_read":1,"be_interested":1}]
  - 바. /status/book/:isbn/:user_id : 유저에 ISBN값의 책에 flag(읽었어요/좋아요) 정보 저장
    - post
  - 사. /book/:user_id : 유저에 등록된 책리스트 출력
    - get
    - return : [{"isbn":"9788937460753","tags":";4;7;6;29;23;30;20;","book_name":"위대한 개츠비","author":"스콧 피츠제럴드","country":"영미소설"}]