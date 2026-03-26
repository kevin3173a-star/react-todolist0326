import React from 'react'
import todoStore from '../store/TodoStore';

function TodoHead() {
  const {sort}=todoStore();
  return (
    <div className='head'>
        <h2>TodoList</h2>
        <div>
            <div>할일(5) / 완료(2)</div>
            <div className='headBtn'>
                <button onClick={e=>sort("all")}>전체</button>
                <button onClick={e=>sort(false)}>진행중</button>
                <button onClick={e=>sort(true)}>완료</button>
            </div>
        </div>
    </div>
  )
}

export default TodoHead