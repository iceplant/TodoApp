import * as React from 'react'
import './App.css';
import { TodoListItemInterface, TodoListListInterface } from './interfaces';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

const TodoListList = (props:TodoListListInterface) => {
  const {titles, openTodoList} = props
  console.log("REACHED TODO LIST LIST!!!!")
  console.log(titles)
  return (
    <div className="todo-list-list">
      {titles.length === 0 && "There are no saved lists"}
      <ul>
        {titles.map((title:string)=>(
          <li>
            <TodoListItem
              title={title}
              openTodoList={props.openTodoList}
              // handleTodoListRemove={props.handleTodoListRemove(title)}
              // blur?
            />
            {/* <Link to="/current" onClick={event=>openTodoList(title)}>{title}</Link> */}
          </li>
        ))}
      </ul>
    </div>
  )
}


const TodoListItem = (props: TodoListItemInterface) => {
  const {title, openTodoList, handleTodoListRemove, handleTodoListBlur} = props
  return (
    <div className='todo-list-item'>
      <Link to="/current" onClick={event=>openTodoList(title)}>{title}</Link>
      {/* <div className='item-remove' onClick={() => props.handleTodoListRemove(title)}>
      x
      </div> */}
    </div>
  )
}

export default TodoListList