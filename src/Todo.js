import React, { useState, useRef, useEffect } from 'react'
import "./Todo.css"
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";



export default function Todo() {

  const [todo, setTodo] = useState()
  const [todos, setTodos] = useState([])
  const [editID, setEditID] = useState([])


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const addTodo = () =>{
  if(todo !=='')
  {
    setTodos([...todos, { task: todo, id: Date.now(), status: false }]);
    console.log(todos);
    setTodo('');
  }
  if(editID){
    const editTodo=todos.find((todo)=>todo.id === editID)
    const updateTodo=todos.map((list)=>list.id === editTodo.id
    ? (list={id:list.id, task:todo})
    : (list={id:list.id, task:list.task}))
    setTodos(updateTodo);
    setEditID(0);
    setTodo('')
  }
};

  const inputRef = useRef(null);
 useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onDelete = (id) => {
    setTodos(todos.filter((list) => list.id !== id))
  }
  const onComplete = (id) => {
    let complete = todos.map((task) => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setTodos(complete)
  }

  const onEdit = (id) => {

    const editTodo = todos.find((list) => list.id === id)
    setTodo(editTodo.task)
      setEditID(editTodo.id)

  }

  return (
    <div>
      <div>
        <h2 className='head'>TODO APP</h2>
        <form className='form-group' onSubmit={handleSubmit}>
          <input className='in' type='text' value={todo} placeholder='Add a task' ref={inputRef} onChange={(e) => setTodo(e.target.value)}></input>
          <button className='but' onClick={addTodo} >{editID ? 'EDIT' :'ADD'}</button>
        </form>
        <div className='list'>
          <ul>
            {todos.map((list) => (
              <li>
                <div className='list-item-list' id={list.status ? 'list-item' : ""}>{list.task}</div>
                <span>
                  <IoMdDoneAll className='list-item-icons' id="done" title='Done' onClick={() => onComplete(list.id)} />
                  <FiEdit className='list-item-icons' id="edit" title='Edit' onClick={() => onEdit(list.id)} />
                  <MdDelete className='list-item-icons' id="delete" title='Delete' onClick={() => onDelete(list.id)} />
                </span>
              </li>
            ))}


          </ul>
        </div>
      </div>
    </div>
  )
}
