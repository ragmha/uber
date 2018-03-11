import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-native-router-flux';
import createStore from './store/createStore';

import scenes from './routes/scenes';

class Root extends Component {
  state = {
    store: createStore(window.__INITIAL_STATE__)
  };

  renderApp() {
    const { store } = this.state;

    return (
      <Provider store={store}>
        <Router scenes={scenes} />
      </Provider>
    );
  }

  render() {
    return this.renderApp();
  }
}

export default Root;
