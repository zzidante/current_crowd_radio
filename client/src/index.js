import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.jsx';
import registerServiceWorker from './registerServiceWorker';
import store  from './store'

export const getState = () => store.state;
export const setState = newState => {
  store.state = { ...store.state, ...newState };
  ReactDOM.render((
    <Routes />
  ), document.getElementById('root'));
};
export const resetState = () => {
  setState(store.defaultState)
}

resetState()
registerServiceWorker();