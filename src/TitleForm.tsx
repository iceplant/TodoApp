import React from 'react';
import { TitleFormInterface } from './interfaces';
import { useHistory } from "react-router-dom";



const TitleForm = (props: TitleFormInterface) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [formState, setFormState] = React.useState('')
  const history = useHistory();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState(event.target.value)
  }

  function handleInputEnter(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      const title: string = formState
      props.clearCurrentTodoList()
      props.handleTitleCreate(title)
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
      history.push("/current");
    }
  }

  return (
    <div>
      <h1>Welcome to Rocky's Todo list app</h1>
      <h2>What would you like to call your new list?</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder='List Name'
        onChange={event => handleInputChange(event)}
        onKeyPress={event => handleInputEnter(event)}
      />
    </div>
  )
}

export default TitleForm;