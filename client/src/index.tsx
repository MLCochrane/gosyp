import React from 'react';
import ReactDOM from 'react-dom';
import {
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import App from './view/App';

import './scss/theme.scss';

const theme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: 't26-carbon',
    },
    h2: {
      fontFamily: 't26-carbon',
    },
    h5: {
      fontFamily: 't26-carbon',
    },
  },
  palette: {
    type: 'dark',
    secondary: {
      light: '#67daff',
      main: '#03a9f4',
      dark: '#007ac1',
    },
    primary: {
      light: '#ffffff',
      main: '#e0f2f1',
      dark: '#aebfbe',
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={ theme }>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
