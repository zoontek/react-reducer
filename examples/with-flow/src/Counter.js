// @flow

import * as React from 'react';
import * as ReactReducer from 'react-reducer';

type State = number;

type Action =
  | {| type: 'INCREMENT' |}
  | {| type: 'DECREMENT' |}
  | {| type: 'RESET' |};

const initialState: State = 0;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return ReactReducer.update(state + 1);
    case 'DECREMENT':
      return ReactReducer.updateWithSideEffects(state - 1, state => {
        console.log(`New state is ${state}`);
      });
    case 'RESET':
      return ReactReducer.update(initialState);
    default:
      return ReactReducer.noUpdate(action);
  }
};

export default () => (
  <ReactReducer.Component
    initialState={initialState}
    reducer={reducer}
    render={({ state, send }) => (
      <div>
        <h2>Count: {state}</h2>

        <div>
          <button onClick={() => send({ type: 'DECREMENT' })}>-</button>
          <button onClick={() => send({ type: 'INCREMENT' })}>+</button>
          <button onClick={() => send({ type: 'RESET' })}>reset</button>
        </div>
      </div>
    )}
  />
);
