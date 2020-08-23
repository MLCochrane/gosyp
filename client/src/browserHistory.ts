import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const unlisten = history.listen(({ action, location }) => {
  // if (action === 'POP') store.dispatch(updateHistory(location.pathname));
});

export { history, unlisten };
