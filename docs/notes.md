# Notes

## Description

Notes on the content being learned.

## Hooks

### Overview

Hooks are part of a new API in React that allows you to track and use State in a functional component. They allow you to reuse stateful logic between components by giving a way to split components into smaller components based on what pieces are related.
- it's kinda similar to how Redux handles state where you have reducer functions for handling pieces of state, only they're stored inside the component

### The useState method

To start using hooks you'll need to import the below:
  ```js
    import React, { useState } from 'react';
  ```

Then you set up state in your **Pure Component** like so:
  ```js
    const Example = () => {
      const [count, setCount] = useState(0);
    }
  ```

- the `useState()` method here takes an initial value for state, and then returns an array with two elements
- the two elements returned by `useState()` are the current state, and a function for updating the state
- so for this example, `useState()` returns *count*, which is 0, and *setCount* which is the function for updating *count*

The above is largely equivalent to the below:
```js
  class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      }
    }
  }
```

If we wanted to display state in our **Example** component we'd just do the below:
  ```js
    const Example = () => {
      const [count, setCount] = useState(0);

      return (
        <p>This is the current count: { count }</p>
      );
    }
  ```

- this is a contrast to class components, where you'd have to use `this.setState()` with either an object with the new state, or a callback function to update our state

To update our component we can add the below:
  ```js
    const Example = () => {
      const [count, setCount] = useState(0);

      return (
        <p>This is the current count: { count }</p>
        <button onClick={ () => setCount(count + 1) }>Click me!</button>
      );
    }
  ```
- note that because `setCount` is by nature a callback function already, we don't have to declare a new callback function to handle the `onClick` event handler
  - looks much cleaner too, and if we needed more complex logic, we can do it if we wanted to

### The useEffect method

- [React docs reference](https://reactjs.org/docs/hooks-reference.html#useeffect)

First things first, what does `useEffect()` do? `useEffect()` tells the React component that it needs to do stuff after the component renders.

`useEffect()` is called after performing DOM updates, so component lifecycle-wise, we go from the below:
```
  Initialization => componentWillMount => componentDidMount => Component Updates => shouldComponentUpdate => componentWillUpdate =>
    componentDidUpdate
  Component Unmount => componentWillUnmount => Rerender Component
```
To this:
  ```
    Initialization => useState => Render Component => useEffect
    Component Unmount => useEffect
  ```
`useEffect()` is the equivalent of `componentDidMount()`, `componentDidUpdate()`, `componentWillUnmount()` and is where we'd make HTTP requests, or subscribe to an API feed or something like that.
- the above being actions that have side effects
- as a quick review, side effects in computer science are operations that modifies a state variable alongside of returning a value

See below for a contrived example of `useEffects`
  ```js
    const Example = () => {
      const [count, setCount] = useState(0);

      useEffect(() => {
        document.title = `You clicked ${count} times`;
      });

      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      );
    }
  ```

We can also add a second argument to the `useEffect()` method. This is functionally the same as using `prevProps` in `componentDidUpdate()` as seen below:
  ```js
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      // clean up and tear down our subscription to the Chat API
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  }, [props.friend.id]); // Only re-subscribe if props.friend.id changes
  ```
- note that we actually pass in an array as the second argument
  - this lets us watch as many variables as needed
  - we can also run an effect and clean it up once by passing in an empty array as an argument(see the api reference on `useEffect` for more)

In addition, `useEffect()` can also return a function as seen above. This function runs when the component unmounts and serves as the teardown for the effect.

The other thing that distinguishes `useEffect()` from other lifecycle methods is that you can call `useEffect()` multiple times in a component to handle different parts of your state