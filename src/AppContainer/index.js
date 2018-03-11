// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-native-router-flux';

import scenes from '../routes/scenes';

type Props = {
  store: {}
};

class AppContainer extends Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router scenes={scenes} />
      </Provider>
    );
  }
}
