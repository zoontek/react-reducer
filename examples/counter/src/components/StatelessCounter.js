// @flow

import * as React from 'react';
import * as Reducer from 'react-reducer';

type State = number;

type Action =
  | {| type: 'INCREMENT', step: number |}
  | {| type: 'DECREMENT', step: number |}
  | {| type: 'RESET' |};

const initialState: State = 0;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.step;
    case 'DECREMENT':
      return state - action.step;
    case 'RESET':
      return initialState;

    default:
      Reducer.checkExhaustiveness(action);
      return state;
  }
};

const Counter = () => (
  <Reducer.Component
    initialState={initialState}
    reducer={reducer}
    render={({ state, send }) => (
      <div>
        <h2>Count: {state}</h2>

        <div>
          <button onClick={() => send({ type: 'DECREMENT', step: 1 })}>
            -
          </button>

          <button onClick={() => send({ type: 'INCREMENT', step: 1 })}>
            +
          </button>

          <button onClick={() => send({ type: 'RESET' })}>reset</button>
        </div>
      </div>
    )}
  />
);

export default Counter;
