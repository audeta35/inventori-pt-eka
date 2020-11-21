import React, { Fragment } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function NavBar(props) {
  return (
    <Fragment>
      {/* navbar */}
      <AppBar
        position="fixed"
        color="primary"
        className={clsx(props.classes.appBar, {
          [props.classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <b>
              Sistem Inventori
            </b>
          </Typography>
        </Toolbar>
      </AppBar>
      {/* navbar */}
    </Fragment>
  );
}
