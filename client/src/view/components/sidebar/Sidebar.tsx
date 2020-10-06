import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Drawer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Details from './details/DetailWidget';

const drawerWidth = 400;
const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    // background: 'none',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  return (
    <>
      <AppBar
        elevation={ 0 }
        position="fixed"
        className={ `${open ? classes.appBarShift : ''} ${classes.appBar}` }
      >
        <Toolbar>
          { /* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ handleDrawerOpen }
            edge="start"
            className={ clsx(classes.menuButton, open && classes.hide) }
          >
            <MenuIcon />
          </IconButton> */ }
        </Toolbar>
      </AppBar>
      <Drawer
        className={ classes.drawer }
        variant="persistent"
        anchor="left"
        open={ open }
        classes={ {
          paper: classes.drawerPaper,
        } }
      >
        <div className={ classes.drawerHeader }>
          <Typography variant="h6" component="h1" noWrap>
            GOSYP
          </Typography>
          { /* <IconButton onClick={ handleDrawerClose }>
            { theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
          </IconButton> */ }
        </div>
        <Divider />
        <Details />
      </Drawer>
    </>
  );
};
export default Sidebar;
