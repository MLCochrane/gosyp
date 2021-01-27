import React from 'react';
import {
  AppBar,
  Toolbar,
  Divider,
  Drawer,
  IconButton,
  Hidden,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons'
import Details from './details/DetailWidget';
import Burger from './Burger';

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
      background: `linear-gradient(0, transparent, ${ theme.palette.background.paper })`,
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

const Sidebar = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (hasButton: boolean) => {
    return (
      <>
        <div className={ classes.toolbar }>
          {
            hasButton
            ? (
            <IconButton
              color="inherit"
              aria-label="close drawer"
              edge="start"
              onClick={ handleDrawerToggle }
              className={ classes.closeButton }
            >
              <Close />
            </IconButton>
            )
            : null
          }
        </div>
        <Divider />
        <Details />
      </>
    )
  };

  return (
    <>
      <AppBar
        elevation={ 0 }
        position="fixed"
        className={ classes.appBar }
      >
        <Toolbar>
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
      <nav className={ classes.drawer } aria-label="mailbox folders">
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
            { drawer(true) }
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={ {
              paper: classes.drawerPaper,
            } }
            variant="permanent"
            open
          >
            { drawer(false) }
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};
export default Sidebar;
