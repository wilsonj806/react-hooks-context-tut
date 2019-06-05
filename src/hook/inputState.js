import { useState } from 'react';
/**
 * Notes
 * ==============================================
 * - this is a custom React Hook
 * - we still use useState() here but we return an object with the state value, and a whole bunch of callbacks
 * - has a single value that's a string type
 * - return functions that handle change, reset, and input events
 *
 */

export const useInputValue = (initialValue = '') => {
  const [ inputValue, setInputValue ] = useState(initialValue);

  return {
    inputValue,
    changeInput: event => setInputValue(event.target.value),
    clearInput: () => setInputValue(''),
    keyInput: (event, callbackFn) => {
      if (event.which === 13 || event.keyCode === 13) {
        callbackFn(inputValue);
        return true;
      }

      return false;
    },
  };
};