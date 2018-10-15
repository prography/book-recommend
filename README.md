# 책 추천 서버 공식문서

# 서버리스프레임워크

- serverless-http 모듈을 사용하여 express api를 wrapping하여 aws lambda function으로 deploy
- 인증방식은 현재 cognito를 생각하고 있음

# 구조

RDS인스턴스를 terraform 으로 띄우고 RDS 인스턴스에 lambda function이 db에 접근함

[Terraform](./docs/Terraform-7b12b9d3-cd3b-458c-8496-877a0baf915d.md)

- API GATE WAY
    - aws lambda function  — VPC 내부에 위치 - 이래야 lambda의 ip가 고정이 되므로

    > 기본적으로 lambda function은 lambda용 public 인터넷을 통해
    리소스에 접근함

    ⇒ Database와 같은 리소스는 public access로 접근할 수 있게 하면 안됨

    ⇒ 참고 : 

    [Amazon VPC에서 리소스에 액세스하도록 Lambda 함수 구성 - AWS Lambda](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/vpc.html)

    ⇒ VPC내에 위치해 있는 lambda function에 접근하기 위해서 NAT gateway 구축 필요

교보문고 scrapping server는 간단히 lambda function에 크론을 돌려서 구성할 예정

[교보문고 scrapper](./docs/scrapper-c7218d7d-bc3b-444f-a0cd-66f97fa5b138.md)

RDS 인스턴스 설정은 일단 커넥션 풀 3000개로 두고 함

# 배포

- sls deploy : 실제 배포
- sls offline start : 운영환경과 동일하게 테스트
    - 안드로이드 개발시에 해당 script로 로컬에서 테스트하면됨
- nodemon등 express srcript run으로 테스트 : 개발환경에서의 테스트
- ./node_modules/.bin/eslint 파일명 : eslint 테스트
    - 해당 기능으로 문법오류나 쓰지 않는 변수등 발견 가능

# Swagger

- API 구축후 배포 예정
