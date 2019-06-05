import React from 'react';
import { storiesOf } from '@storybook/react';

import AddTodo from '../components/AddTodo';
import TodoListItem from '../components/TodoListItem';
import Layout from '../components/Layout';

storiesOf('Core components', module)
.add('Layout', () => <Layout/>);

storiesOf('Core components', module)
  .add('AddTodo', () => <AddTodo/>);

storiesOf('Core components', module)
  .add('TodoListItem', () => <TodoListItem text="Hello World"/>);
