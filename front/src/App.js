import { useEffect } from 'react';
import './App.css';
import TodoHead from './comp/TodoHead';
import TodoInsert from './comp/TodoInsert';
import TodoList from './comp/TodoList';
import TodoStore from './store/TodoStore';

function App() {
  const {get}=TodoStore();
  useEffect(()=>{
    get();
  },[])
   return (
    <div className="App">
      <TodoHead/>
      <TodoList/>
      <TodoInsert/>
    </div>
  );
}

export default App;
