// Todo interface
export interface TodoInterface {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface TitleFormInterface {
  handleTitleCreate: (title : string) => void;
  clearCurrentTodoList: () => void,
}

// Todo form interface
export interface TodoFormInterface {
  todos: TodoInterface[];
  handleTodoCreate: (todo: TodoInterface) => void;
}

// Todo list interface
export interface TodoListInterface {
  handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleTodoRemove: (id: string) => void;
  handleTodoComplete: (id: string) => void;
  handleTodoBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  todos: TodoInterface[]
}

// Todo item interface
export interface TodoItemInterface {
  handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleTodoRemove: (id: string) => void;
  handleTodoComplete: (id: string) => void;
  handleTodoBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  todo: TodoInterface;
}

export interface TodoListDownloadButtonInterface {
  todos: TodoInterface[];
}

export interface TodoListListInterface {
  titles: string[];
  openTodoList: (title: string) => void;
}

export interface TodoListItemInterface {
  title: string;
  openTodoList: (title: string) => void;
  handleTodoListRemove?: (id: string) => void;
  handleTodoListBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}