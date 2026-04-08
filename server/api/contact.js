//실제 처리하는 곳(get.post.delete...)

const express = require("express") 
const {getContactDB} = require('../db/db_todolist.js');
const { ObjectId } = require("mongodb");
const contact = express.Router(); 


contact.get('/', async(req, res) => {//소분류 (프로젝트안에서의 일의 명칭) ~4000/todo/일(get,delete...)
 
  const data = await getContactDB().collection('contact').find().toArray();
  res.send(data)//클라이언트쪽으로 data에 담에 보내줌
})


//api서버쪽에서 받아서 저장
contact.post('/', async(req, res) => {
  try{
    const result= await getContactDB().collection('contact').insertOne(req.body);//***중요 */
    const data={...req.body, _id:result.insertedId}
    res.send({success:true,data})//data:data
  }
  catch(err){
    res.send({success:false,msg:err.message})
  }
})


module.exports = contact; 

