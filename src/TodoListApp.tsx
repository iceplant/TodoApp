import * as React from 'react'
import './App.css';
import TitleForm from './TitleForm';
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { TodoInterface } from './interfaces'
import TodoListDownloadButton from './TodoListDownloadButton';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import TodoListList from './TodoListList';

// Import styles
//import './styles/styles.css'

const TodoListApp = () => {
  const [todos, setTodos] = React.useState<TodoInterface[]>([])
  const [title, setTitle] = React.useState('')
  const history = useHistory();
  //localStorage.setItem("titles", JSON.stringify([]))

  function addTitle(title:string) {
    //console.log("adding a title")
    var titles = JSON.parse(String(localStorage.getItem("titles")))
    //console.log("titles so far: " + titles)
    if (titles === null) {
      titles = []
    }
    if (!(titles.includes(title))) {
      titles.push(title)
    }
    //console.log(titles)
    localStorage.setItem("titles", JSON.stringify(titles))
    // console.log(JSON.parse(String(localStorage.getItem("titles"))))
    // console.log(getTitles())
  }

  function removeTitle(title:string) { //removes a title if it is present
    const titles = JSON.parse(String(localStorage.getItem("titles")))
    const index = titles.indexOf(title);
    if (index > -1) {
      titles.splice(index, 1);
    }
    localStorage.setItem("titles", JSON.stringify(titles))
  }

  function getTitles() {
    const rtn = JSON.parse(String(localStorage.getItem("titles")))
    if (rtn === null) {
      return []
    }
    return rtn
  }


  function handleTodoCreate(todo:TodoInterface) {
    const newTodoState: TodoInterface[] = [...todos]
    newTodoState.push(todo)
    setTodos(newTodoState)
  }

  function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id:string) {
    const newTodoState: TodoInterface[] = [...todos]
    newTodoState.find((todo:TodoInterface) => todo.id === id)!.text = event.target.value
    setTodos(newTodoState)
  }

  function handleTodoRemove(id:string) {
    const newTodoState:TodoInterface[] = todos.filter((todo:TodoInterface) => todo.id !== id)
    setTodos(newTodoState)
  }

  function handleTodoComplete(id:string) {
    const newTodoState:TodoInterface[] = [...todos]
    newTodoState.find((todo : TodoInterface)=>todo.id === id)!.isCompleted = !newTodoState.find((todo : TodoInterface)=>todo.id === id)!.isCompleted
    setTodos(newTodoState)
  }

  function handleTodoBlur(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      event.target.classList.add('todo-input-error')
    } else {
      event.target.classList.remove('todo-input-error')
    }
  }

  React.useEffect(() => {
    const parsedTitle = JSON.parse(String((localStorage.getItem("currentTitle"))))
    console.log(parsedTitle)
    if (parsedTitle === null) {
      setTitle('')
    } else {
      setTitle(parsedTitle)
    }
    const parsedTodos = JSON.parse(String((localStorage.getItem(title))))
    if (parsedTodos === null || parsedTodos === '') {
      setTodos([])
    } else {
      setTodos(parsedTodos)
    }
  }, [])

  // React.useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos))
  //   localStorage.setItem("title", JSON.stringify(title))
  // }, [todos, title])

  const saveCurrentTodoList = () => {
    localStorage.setItem(title, JSON.stringify(todos))
    addTitle(title)
    refresh() //this might be more aggressive than necessary
  }

  const deleteCurrentTodoList = () => {
    removeTitle(title)
    localStorage.setItem(title, JSON.stringify(null)) //SANITIZE DATA!!! THIS WILL BREAK IF A USER HAS TITLE "TITLES"!!!
    setTitle('')
    setTodos([])
    refresh()
    //history.push('/new') //Fix this
  }

  const unsaveSpecificTodoList = (titleToDelete:string) => {
    removeTitle(titleToDelete)
    localStorage.setItem(titleToDelete, JSON.stringify(null))
  }

  const clearCurrentTodoList = () => {
    setTitle('')
    setTodos([])
  }

  const deleteEverything = () => {
    localStorage.clear();
    clearCurrentTodoList()
    refresh()

    //Do it this way eventually to avoid clearing other things
    // const titles = getTitles()
    // titles.forEach((titleToDelete:string)=>{
    //   unsaveTodoList(titleToDelete)
    // })
    // clearCurrentTodoList()
  }

  const openTodoList = (titleToOpen:string) => {
    console.log(titleToOpen)
    JSON.parse(String((localStorage.getItem(titleToOpen))))
    setTitle(titleToOpen)
    setTodos(JSON.parse(String((localStorage.getItem(titleToOpen)))))
    //history.push('/current')
  }

  function refresh() {
    window.location.reload(false);
  }

//New, current, old
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/new">new</Link>
            </li>
            <li>
              <Link to="/current">current</Link>
            </li>
            <li>
              <Link to="/old">old</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/"><Redirect to="/new"></Redirect></Route> */}
          <Route path="/new">
            <TitleForm handleTitleCreate={setTitle} clearCurrentTodoList={clearCurrentTodoList}/>
          </Route>
          <Route path="/current">
            <div className="todo-list-app">
              {(title === null || title === '') && "No current list"}
              <h2>{title}</h2>
              {!(title === null || title === '') && 
                <div>
                  <TodoForm 
                    todos={todos}
                    handleTodoCreate={handleTodoCreate}
                  />
                  <TodoList
                    todos={todos}
                    handleTodoUpdate={handleTodoUpdate}
                    handleTodoRemove={handleTodoRemove}
                    handleTodoComplete={handleTodoComplete}
                    handleTodoBlur={handleTodoBlur}
                  />
                  <TodoListDownloadButton todos={todos}/>
                  <button onClick={saveCurrentTodoList}>Save Todo List</button>
                  <button onClick={deleteCurrentTodoList}>Delete Todo </button>
              </div>}
              <button onClick={deleteEverything}>Delete Everything </button>
            </div>
          </Route>
          <Route path="/old">
            <TodoListList titles={getTitles()} openTodoList={openTodoList} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default TodoListApp