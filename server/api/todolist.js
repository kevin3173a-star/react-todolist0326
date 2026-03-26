//실제 처리하는 곳(get.post.delete...)

const express = require("express") 
const {getDB} = require('../db/db_todolist.js');
const { ObjectId } = require("mongodb");
const todolist = express.Router(); //#3. 페이지가 분할->Router->todolist가 Router역할

//let data=[{id:1,name:"홍길동"}]//몽고디비에 데이터 저장

//#4. index.js에서 ctrl x로 가져와서 app을 todolist로 
todolist.get('/', async(req, res) => {//소분류 (프로젝트안에서의 일의 명칭) ~4000/todo/일(get,delete...)
  
  //몽5. 실데이터가 들어 있는 콜렉션 조회(getDB의 콜렉션(기능요소) 중 test내용을 find로 가져와서 배열의 형태로)
  const data = await getDB().collection('todos').find().toArray();
  res.send(data)//클라이언트쪽으로 data에 담에 보내줌
})


//api서버쪽에서 받아서 저장
todolist.post('/', async(req, res) => {
  try{
    const result= await getDB().collection('todos').insertOne(req.body);//***중요 */
    console.log(result)
    console.log(req.body)//밑에 server터미널 창에 뜸
    const data={...req.body, _id:result.insertedId}
    res.send({success:true,data})//data:data
  }
  catch(err){
    res.send({success:false,msg:err.message})
  }
})

//삭제
todolist.delete('/', async(req,res)=>{
  const {id}=req.query
  console.log(id)
  try{
    const result=await getDB().collection('todos').deleteOne({_id:new ObjectId(id)});
    //몽고디비에 _id:ObjectId('')이렇게 id가 저장되있으므로 
    res.send({success:true});
  }
  catch(err){
    res.send({success:false});
  }
}) 

//수정
todolist.put('/state', async(req,res)=>{
  const {id}=req.query
  const {body}=req.body
  console.log(id,body)
  try{
    const result=await getDB().collection('todos')
    .updateOne({_id:new ObjectId(id)},
                {$set:req.body});
    //몽고디비에 _id:ObjectId('')이렇게 id가 저장되있으므로 
    res.send({success:true});
  }
  catch(err){
    res.send({success:false});
  }
}) 

//sort(분류)
todolist.get('/completed', async(req, res) => {
  const sort=req.query.sort;
  let filter;
  switch(sort){
    case 'all':filter={}; break;
    case 'true':filter={isdone:true}; break;
    default:filter={isdone:false}
  }
  //몽5. 실데이터가 들어 있는 콜렉션 조회(getDB의 콜렉션(기능요소) 중 test내용을 find로 가져와서 배열의 형태로)
  const data = await getDB().collection('todos').find(filter).toArray();
  //find({isdone:true})자리에 filter변수를 넣어서 3가지 경우 다 들어오게 함
  res.send(data)

})

module.exports = todolist; 

