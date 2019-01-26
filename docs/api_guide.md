# API Guide

### 1. Auth(/auth)

- 가. /register : 회원가입
- 나. /login : 로그인
- 다. /update : 수정
- 라. /validate : 유저검증



### 2. Book(/books)

- 가. /listwithtag/:tags : 태그가 포함된 책 리스트
- 나. /listwithsearch/:search : 책이름으로 책 검색
- 다. /read/:user_id : 사용자가 읽은 책 리스트
- 라. /interest/:user_id : 사용자가 관심있는 책 리스트
- 마. /:isbn : ISBN으로 책 검색



### 3. Tag(/tags)

- 가. / : 태그 종류 출력



### 4. User(/user)

- 가.  /selected/:user_id : 유저가 고른 태그 출력
- 나. /status/tag/:tag/:user_id : 유저가 고른 태그 저장
- 다. /status/tag/:tag/:user_id : 유저가 고른 태그 추가
- 라. /delete/tag/:user_id : 유저가 고른 태그 삭제
- 마. /status/book/:isbn/:user_id : 유저가 ISBN값의 책과 관련된 flag값들(읽었어요/좋아요) 출력
- 바. /status/book/:isbn/:user_id : 유저에 ISBN값의 책에 flag(읽었어요/좋아요) 정보 저장
- 사. /book/:user_id : 유저에 등록된 책리스트 출력