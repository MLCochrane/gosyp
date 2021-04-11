import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import store from './store';
import App from './view/App';

import './scss/theme.scss';

const theme = responsiveFontSizes(createMuiTheme({
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
    h6: {
      fontFamily: 't26-carbon',
    },
    body1: {
      fontFamily: 't26-carbon',
    },
    subtitle1: {
      fontFamily: 't26-carbon',
    },
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
}));

ReactDOM.render(
  <MuiThemeProvider theme={ theme }>
    <Provider store={ store }>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
