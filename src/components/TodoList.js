import React, { memo } from 'react';
import { List, Paper, Grid } from '@material-ui/core';

import TodoListItem from './TodoListItem';

const TodoList = memo(props => (
  <>
    { props.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: 'scroll' }}>
          { props.items.map((todo, index) => (
            <TodoListItem
              { ...todo }
              key={ `TodoItem.${index}` }
              divider={ index !== props.items.length - 1 }
              onButtonClick={ () => props.onItemRemove(index) }
              onCheckBoxToggle={ () => props.onItemCheck(index) }
              />
          ))}
        </List>
      </Paper>
    )}
  </>
));

export default TodoList;