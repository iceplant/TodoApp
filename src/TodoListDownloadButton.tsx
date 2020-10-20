
import * as React from 'react';
import './App.css';
import { TodoInterface } from './interfaces';


//https://jsfiddle.net/UselessCode/qm5AG/
//https://stackoverflow.com/questions/55075740/property-does-not-exist-on-type-intrinsicattributes
//(props: {todos: TodoInterface[]})
const TodoListDownloadButton = (props: {todos: TodoInterface[]}) => {
  function createTextFile(todos:TodoInterface[]) {
    var text:string = '#My Todo List \n\n';
    for (let todo of todos) {
      if (todo.isCompleted) {
        text = text +  "- [x] " + todo.text + "\n";
      } else {
        text = text +  "- [ ] " + todo.text + "\n";
      }
    };
    return text
  }

  function downloadTextFile(text:string) {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "todo_list.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div className="todo-list-download-button"
      onClick={()=>{
        //console.log("reached onClick function")
        downloadTextFile(createTextFile(props.todos));
      }}>
        Download Todo List
    </div>
  )
}

export default TodoListDownloadButton