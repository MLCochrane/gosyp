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
    subtitle1: {
      fontFamily: 't26-carbon',
    }
  },
  palette: {
    type: 'dark',
    secondary: {
      light: '#ff7c9d',
      main: '#ef476f',
      dark: '#b70044',
    },
    primary: {
      light: '#63ffd1',
      main: '#06D6A0',
      dark: '#00a371',
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={ theme }>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
