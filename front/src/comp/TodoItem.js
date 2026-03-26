import React, { useState } from 'react'
import TodoStore from '../store/TodoStore'

function TodoItem({item}) {
  const {del,completeTodo,update}=TodoStore();

  //수정 상태 저장(수정버튼 누르면 input입력창으로 바뀌며 수정가능)
  let [editId, setEditId]=useState('');//클릭한 해당 item의 id값(item._id)을 저장시킬 변수 선언
  let [editText, setEditText]=useState(item.content);//수정한 value값을 저장시킬 변수와

  return (
    <li style={{color:item.isdone && "red"}} className={item.isdone ? 'todoitem success':'todoitem'}>
      {//3항연산자를 이용해 수정할 id값과 같으면 입력창 input으로 변경, 아니면 기존 값 그대로
        editId==item._id ? //form태그에 onsubmit으로 e.preventDefault()를 걸어 새로고침을 막고 update()안에서 사용할 매개변수를 가지고 호출
           <form onSubmit={e=>{e.preventDefault(); update(item._id, editText, setEditId);}}>
             <input autoFocus type="text" value={editText}  onChange={(e)=>setEditText(e.target.value)}/>
             {/* defaultValue를 기존 할일(item.content)로 설정하고 onChange로 현재 입력값을 editText를 바꿔주는 setEditText에 넣어줌*/}
             <button>저장</button>
           </form>
           :
           item.content
      }
      <div>
        {
          //수정 버튼 누르면 비활성화
          editId == item._id ?//3항연산자를 이용해 editid(클릭한곳의 _id)가 item._id(해당 item의 _id)와 같다면
          //버튼을 비활성화 (button 태그에 속성으로 disabled를 넣어줌)
          //다르다면 (클릭하지 않으면 editid는 null(초기값))원래 있어야할 버튼 그대로
          <button disabled>수정</button>
          :
          <button onClick={()=>setEditId(item._id)}>{/* 클릭시 editid에 해당 item._id값 저장 */}
            수정
          </button>
        }
        
        <button onClick={()=>del(item._id)}>삭제</button>
        <button onClick={()=>completeTodo(item._id)}>완료</button>
      </div>  
    </li>
  )
}

export default TodoItem