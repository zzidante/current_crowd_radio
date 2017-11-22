import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Routes />, div);
});
