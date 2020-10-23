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
      background: 'none',
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
  // necessary for content to be below app bar
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
  const drawer = (
    <div>
      <div className={ classes.toolbar } />
      <Divider />
      <Details />
    </div>
  );

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
        { /* The implementation can be swapped with js to avoid SEO duplication of links. */ }
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
              keepMounted: true, // Better open performance on mobile.
            } }
          >
            { drawer }
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
            { drawer }
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};
export default Sidebar;
