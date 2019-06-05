import React, { memo } from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';

/**
 * Notes
 * ==============================================
 * AddTodo component renders a Paper component which wraps an input and button, both of which recieve
 *   event handlers passed as props
 *
 * React.memo checks to make sure that any input props are different before deciding to rerender stuff
 *  - it's an optimization available to pure components
 * General overview on components:
 * - Grid produces a responsive layout grid based on Bootstrap's implementation of their grid
 *   - as a result it uses Flexbox
 *   - note that we specify "container" and "item" where "container" Grids are the parent with
 *     { display: flex }
 * - TextField are user input components for forms and such
 *   - it's really composed of smaller components(FormControl, Input, FilledInput, InputLabel,
 *     OutlinedInput, and FormHelperText)
 */

const AddTodo = memo(props => (
  <Paper style={{ margin: 16, padding: 16 }}>
    <Grid container>
      <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
        <TextField
          placeholder="Add Todo here"
          value={ props.inputValue }
          onChange={ props.onInputChange }
          onKeyPress={ props.onInputKeyPress }
          fullWidth
        />
      </Grid>
      <Grid xs={2} md={1} item>
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          onClick={ props.onButtonClick }
        >
          Add
        </Button>
      </Grid>
    </Grid>
  </Paper>
));

export default AddTodo;