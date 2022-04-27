# API docs 작성 요령
1. ```back/api_docs/swagger.yaml``` 파일의 ```servers: - url``` 부분을 자신의 개발 환경에 맞게 수정한다.
2. ```back/api_docs``` 디렉토리 하위에 MVP 이름으로 된 디렉토리를 생성한다.
3. 각 endpoint별로 yaml파일을 따로 작성해서 1.에서 만든 디렉토리 하위에 추가한다.
4. ```back/api_docs/swagger.yaml``` 파일에서 paths property 밑에 endpoint를 기입하고, 다시 endpoint 하위에 $ref property를 추가한 뒤 yaml파일의 경로를 입력한다.
5. ```npx swagger-cli bundle ./api_docs/swagger.yaml --outfile ./api_docs/build/bundle.yaml --type yaml``` 명령어를 실행해서 ```back/api_docs/build``` 디렉토리에 통합된 yaml파일을 작성한다.
6. ```localhost:{포트번호}/docs```에 접속하면 API 명세를 확인할 수 있다.
