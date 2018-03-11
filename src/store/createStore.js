import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSocketIoMiddleware from 'redux-socket.io';

import io from 'socket.io-client/dist/socket.io';

let socket = io('http://localhost:3000', { jsonp: false });
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const log = createLogger({ diff: true, collapsed: true });
const middlewares = [thunk, log, socketIoMiddleware];

const configureStore = (initialState = {}) => {
  const store = createStore(
    rootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
};

export default configureStore;
