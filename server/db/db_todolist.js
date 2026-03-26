//몽고디비 접근

const { MongoClient } = require('mongodb');//몽1

//몽2
//const url = "mongodb+srv://kevin3173a_db_user:20505112ax~@cluster0.6ilf3fm.mongodb.net/?appName=Cluster0"; //나중에 배포할땐 이걸로 배포
const url = "mongodb://kevin3173a_db_user:20505112ax~@ac-46rthb6-shard-00-00.6ilf3fm.mongodb.net:27017,ac-46rthb6-shard-00-01.6ilf3fm.mongodb.net:27017,ac-46rthb6-shard-00-02.6ilf3fm.mongodb.net:27017/?ssl=true&replicaSet=atlas-cn8zow-shard-0&authSource=admin&appName=Cluster0";
const client = new MongoClient(url);

let db;
async function connectDB(){
    try{
        await client.connect(); //몽3. 몽고 접속
          db = client.db('todolist');//몽4. ***프로젝트db 활성화***(제일 중요)
          console.log('접속완료') 
    }
    catch(err){
        console.log(err)
    }
}
function getDB(){//connectDB가 비동기라 값이 언제 들어올지 몰라서 사용하려는 시점에 db에 값이 들어있으려면 
    //connectDB가 끝난후에 getDB가 실행할것이므로 그때 db값 가져오기
    return db;
}
module.exports={connectDB, getDB}