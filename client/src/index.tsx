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
    text: {
      primary: '#000',
    },
    primary: {
      main: '#EF476F',
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={ theme }>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
