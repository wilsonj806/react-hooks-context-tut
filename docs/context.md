# Context notes

## Description

General notes on the React Context.

- [React Context API docs](https://reactjs.org/docs/context.html)

## Context

The React Context API serves as a way to simplify how a React app passes data. Usually you pass data from parent to child via props, but this gets unwieldly and harder to maintain as your app gets more complex(referred to as prop drilling).

In the words of the React docs, Context is built to share data that's considered "global" for a tree of React components. It inverts control of data from the child to the parent, which can be helpful but also needs to be applied carefully as you might need to make the lower level children more flexible to account for your higher level components being more complex.