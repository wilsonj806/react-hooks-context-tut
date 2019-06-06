import React, { memo } from 'react';
import Layout from './components/Layout';
import { useInputValue } from './hook/inputState';
import { useTodos } from './hook/todoState';
import { useTheme } from './hook/themeState';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

import { ThemeContext, lightTheme, darkTheme } from './contexts/theme-context';

const App = memo(props => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo } = useTodos();
  const { isLight, toggleTheme } = useTheme();

  const clearInputAndAddTodo = _ => {
    clearInput();
    addTodo(inputValue);
  }

  const themeProps = {
    isLight,
    themeToUse: isLight === true ? lightTheme : darkTheme,
    toggleHandler: toggleTheme
  };

  return (
    <div className="App">
      <ThemeContext.Provider value={ themeProps }>
        <Layout>
          <AddTodo
            inputValue={ inputValue ? inputValue : "" }
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
      </ThemeContext.Provider>
    </div>
  );
})

export default App;
