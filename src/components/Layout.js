import React, { memo, useContext } from 'react';
import { AppBar, Toolbar, Typography, Paper } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

import { ThemeContext }from '../contexts/theme-context';
/**
 * Notes
 * ==============================================
 * The layout component only renders a toolbar with our App name and can recieve children
 *
 * React.memo checks to make sure that any input props are different before deciding to rerender stuff
 *  - it's an optimization available to pure components
 * General overview on components:
 *  - Appbar and Paper are defined in Material UI as Surface components
 *  - AppBar gives content and actions related to the current screen(used for branding, screen
 *     titles, navigation and actions)
 *  - Paper acts as a background for your app that you can build ontop of
 *    - tries to mimic paper's ability to be re-sized, shuffled, and bound together
 *  - Typography is Material UI's component for centralizing typographic components(p,
 *     h1-h6, etc)
 */



const Layout = memo(props => {
  const value = useContext(ThemeContext);
  const { isLight, themeToUse, toggleHandler } = value;
  const styles = Object.assign({}, { height: 64 }, themeToUse.styles);
  return (
    <Paper
      elevation={0}
      style={{ padding: 0, margin: 0, backgroundColor: '#fafafa'}}
    >
      <AppBar
        color="primary"
        position="static"
        style={styles}
        classes={{
          root: themeToUse.color
        }}
      >
        <Toolbar
          style={{ height: 64 }}
        >
          <Typography color="inherit">TODO App</Typography>
          <Switch
            color={ props.color }
            checked={ isLight }
            onChange={ toggleHandler }
          />
        </Toolbar>
      </AppBar>
      { props.children }
    </Paper>
  )
});

export default Layout;