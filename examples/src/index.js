// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter';
import ObjectStateCounter from './components/ObjectStateCounter';
import StatelessCounter from './components/StatelessCounter';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <React.Fragment>
      <h1>Counter</h1>
      <Counter />
      <hr />

      <h1>Counter with object state</h1>
      <ObjectStateCounter />
      <hr />

      <h1>Stateless Functional Counter</h1>
      <StatelessCounter />
    </React.Fragment>,
    root,
  );
}
