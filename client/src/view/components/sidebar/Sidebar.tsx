import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Divider,
  Drawer,
  IconButton,
  Hidden,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import Details from './details/DetailWidget';
import Burger from './Burger';
import TitleBar from './TitleBar';

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      background: theme.palette.background.default,
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  closeButton: {
    display: 'block',
    marginLeft: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    padding: theme.spacing(2),
    background: theme.palette.background.default,
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Sidebar = (): JSX.Element => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        elevation={ 1 }
        position="fixed"
        className={ classes.appBar }
      >
        <Toolbar>
          <TitleBar />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={ handleDrawerToggle }
            className={ classes.menuButton }
          >
            <Burger />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Hidden lgUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={ mobileOpen }
          onClose={ handleDrawerToggle }
          classes={ {
            paper: classes.drawerPaper,
          } }
          ModalProps={ {
            keepMounted: true,
          } }
        >
          <div className={ classes.toolbar }>
            <IconButton
              color="inherit"
              aria-label="close drawer"
              edge="start"
              onClick={ handleDrawerToggle }
              className={ classes.closeButton }
            >
              <Close />
            </IconButton>
          </div>
          <Divider />
          <Details />
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <div className={ classes.drawer }>
          <Drawer
            classes={ {
              paper: classes.drawerPaper,
            } }
            variant="permanent"
            open
          >
            <Divider />
            <Details />
          </Drawer>
        </div>
      </Hidden>
    </>
  );
};
export default Sidebar;
