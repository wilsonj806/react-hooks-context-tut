import { useState } from 'react';
/**
 * Notes
 * ==============================================
 * - this is a custom React Hook
 * - we still use useState() here but we return an object with the state value, and a whole bunch of callbacks
 * - has a single value that's an array
 * - has functions to handle adding, checking, and removing todos
 */

export const useTodos = (initialValue = []) => {
  const [todos, setTodos] = useState(initialValue);

  return {
    todos,
    addTodo: text=> {
      if (text !== '') {
        setTodos(
          todos.concat({
            text,
            check: false,
          })
        );
      }
    },
    checkTodo: index => {
      setTodos(
        todos.map((todo, indexState) => {
          if (index === indexState) {
            todo.checked = !todo.checked;
          }
          return todo;
        })
      );
    },
    removeTodo: index => {
      setTodos(todos.filter((todo, indexState) => index !== indexState));
    }
  }
}