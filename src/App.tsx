import * as React from 'react';
import './App.css';
import { render } from '@testing-library/react';
import TodoListApp from './TodoListApp'
//import './styles/styles.css'

function App() {
  return (
    <TodoListApp />
  );
}

export default App;



// const rootElement = document.getElementById('root')
// render(<TodoListApp />, rootElement)