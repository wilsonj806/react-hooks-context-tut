import React, { memo } from 'react';
import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

/**
 * Notes
 * ==============================================
 * TodoListItem renders a list item wrapping a checkbox
 *
 */
const TodoListItem = memo(props => (
  <ListItem divider={ props.divider }>
    <Checkbox
      onClick={ props.onCheckBoxToggle }
      checked={ props.checked }
      disableRipple
    />
    <ListItemText primary={ props.text }/>
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete Todo" onClick={ props.onButtonClick }>
        <DeleteOutlined/>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
));

export default TodoListItem;
