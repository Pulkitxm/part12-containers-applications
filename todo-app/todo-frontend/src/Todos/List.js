import React from 'react'
import { v4 as uuid } from 'uuid'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo,idx) => {
        return <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} key={uuid()} />;
      }).reduce((acc, cur) => [...acc, <hr key={uuid()} />, cur], [])}
    </>
  )
}

export default TodoList
