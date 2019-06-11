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

### The useReducer method

This looks like Redux because it basically is Redux(facebook hired the guy who made Redux).

Syntax below:
```js
  const reducerFn = (state, action) => {
    switch(action.type) {
      case "FOO":
        { ...state, doStuff: action.payload }
      case "BAR":
        { ...state, doStuff: action.payload }
      default:
        return { ...state };
    }
  }
  const SampleComponent = props => {
    const [state, dispatch] = useReducer(reducerFn, initialState);
    const actionFoo = {
      type: 'foo',
      payload: 'Try plunging attack!'
    };
    const actionBar = {
      type: 'bar',
      payload: 'Is this the work of the enemy Stand???'
    }
    return (
      <div
        { state }
      >
        <p>I did some stuff</p>
        <button onClick={() => dispatch(actionFoo) }>Click me lmao</button>
        <button onClick={() => dispatch(actionBar) }>Click me lmao</button>
      </div>
    )
  }
```

`useReducer()` takes in two args, a reducer function, and the initial state for the particular piece of state you're managing. It returns state and a dispatch function to initiate a state change. The dispatch function ends up calling the reducer function, so you'll end up dispatching state changes by passing in actions like in Redux. Said actions look like below, based on the above reducer:
```js
  const actionFoo = {
      type: 'foo',
      payload: 'Try plunging attack!'
    };
```

## Custom hooks

See the [React Docs](https://reactjs.org/docs/hooks-custom.html) on building a custom hook for more.

We can also build our own custom hooks if our state ends up needing to do multiple things(e.g add, delete, update operations). These are literally just functions that can do and provide more state handling for you if your app needs it. It can also perform side effects and subscribe to anything that requires side effects.

Given the below component:
```js
function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

But let's say we also have a general contact list component and we want to render online users in green. We could copy the state in the above component and paste it in but that's not great(DRY, and etc).
```js
function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

React gives us the ability to create our own hooks, which means state handling can be easily shared now. For this portion of the app's state, it'd look like the below:
```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

export default useFriendStatus
```

First note that our custom hook starts with `use`. React prefers that you start your custom hook with `use` otherwise it can't check your custom hook for any formatting errors and such. We've also moved our side effect handling out and we've returned `isOnline` out for consumption as well.

Note: If we needed to, we can define additional functions to handle state and we can return an object with a bunch of keys instead.

Now that we've done that, our components now look like:
```js
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

This is a lot slicker than the above and way more reusable. We've also used less lines of code in our component as we can just import the relevant hook instead of writing it all out in the component itself. Groovy!

## Context API and hooks

See the below references/ docs for more:
- [React Context Docs](https://reactjs.org/docs/context.html#reactcreatecontext)
- [React `useContext()` doc](https://reactjs.org/docs/hooks-reference.html#usecontext)
- []

Contexts can be used by pure components using the `useContext()` method. Looks like so:
```js
  const initialState = { access_code: 1234, data: 'shoot the flagship' };
  const SampleContext = React.createContext(initialState);

  const SampleProvider = props => {
    // Reducer gets initialState passed in
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <SampleContext.Provider value={{ state, dispatch }}>
        { props.children }
      </SampleContext.Provider>
    )
  }

  const SampleComponent = props => {
    const { state, dispatch, access_code, data } = useContext(SampleContext);
    doStuffWithState(state);
    const handleClick = e => dispatch(e);
    return (
      <div>
        I did some stuff
      </div>
    )
  }

  const App = props => {
    return (
      <SampleProvider>
        <SampleComponent/>
      </SampleProvider>
    )
  }
```
Note that when we consume the context in our pure component, `SampleComponent`, we use the `useContext()` method and pass in the **entire** `SampleContext` object. Also note that making the context provider into it's own component is a fairly standard design pattern, the above looks cleaner than returning `<SampleContext.Provider>` directly.