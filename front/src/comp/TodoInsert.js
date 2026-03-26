import React, { useState } from 'react'
import todoStore from '../store/TodoStore';

function TodoInsert() {
    const {save}= todoStore();
    const [ip,setIp]=useState('')
    function handleSubmit(e){
        e.preventDefault();
        if(!ip){
            alert("글을 작성하세요!")
            return;
        }
        const today=new Date();
        const date = new Intl.DateTimeFormat("ko-KR",{
            year:"numeric",
            month:"2-digit",
            day:"2-digit",
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'
        }).format(today).replace(/[가-힣]+/,"T").replaceAll(' ','');
        //console.log(date.format(today))
        save({content:ip,date, isdone:false})//save함수로 보내줘
        .then(()=>{
            setIp("");
            alert("저장완료!");
        })
        //console.log(today.toISOString())
        
    }
  return (
    <div className='insertBtn'>
        <form onSubmit={e=>handleSubmit(e)}>
            <input type="text" value={ip} onChange={e=>setIp(e.target.value)}/>
            <button>추가</button>
        </form>
    </div>
  )
}

export default TodoInsert