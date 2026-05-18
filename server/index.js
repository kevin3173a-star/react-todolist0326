//몽고디비를 위한 준비작업?
//#1. npm 에서 코드 복붙
const express = require("express")//#2. 이걸로 바꿔야 인식
const cors = require('cors');//cors오류 1
const bodyParser = require('body-parser')

const todolist = require('./api/todolist.js')//#6. 분리된 js가져와서
const contact = require('./api/contact.js')//#6. 분리된 js가져와서
const {connectDB} = require('./db/db_todolist.js')
const app = express()
const news = require('./api/news.js')//뉴스 api 연결 05.14

app.use(cors());//cors오류 2( use: 내가 가진 모듈을 사용)
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

async function serverStart(){
  await connectDB();//connectDB가 끝나기전까진 밑에 실행x(db활성화된 후에 밑에 실행)
  app.use('/todo',todolist)//#7. 가져온 js 사용방법
  app.use('/contact',contact)//#7. 가져온 js 사용방법
  // "/todo":요청 url(대분류(프로젝트명)) (~4000/todo)
  app.use('/news',news);//뉴스 api 연결 05.14

  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000')
  })
}
serverStart();


