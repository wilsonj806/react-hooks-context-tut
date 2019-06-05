import React, { memo } from 'react';
import Layout from './components/Layout';
import { useInputValue } from './hook/inputState';
import { useTodos } from './hook/todoState';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';


const App = memo(props => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo } = useTodos();

  const clearInputAndAddTodo = _ => {
    clearInput();
    addTodo(inputValue);
  }

  return (
    <div className="App">
      <Layout>
        <AddTodo
          inputValue={ inputValue }
          onInputChange={ changeInput }
          onButtonClick={ clearInputAndAddTodo }
          onInputKeyPress={ event => keyInput(event, clearInputAndAddTodo) }
        />
        <TodoList
          items={ todos }
          onItemCheck={ index => checkTodo(index) }
          onItemRemove={ index => removeTodo(index) }
        />
      </Layout>
    </div>
  );
})

export default App;
