// @flow

import React from 'react';
import * as Reducer from 'react-reducer';

type State = number;

type Action =
  | {| type: 'INCREMENT', step: number |}
  | {| type: 'DECREMENT', step: number |}
  | {| type: 'RESET' |};

class Counter extends React.Component<{}> {
  initialState: State = 0;

  reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + action.step;
      case 'DECREMENT':
        return state - action.step;
      case 'RESET':
        return this.initialState;

      default:
        Reducer.checkExhaustiveness(action);
        return state;
    }
  };

  render() {
    return (
      <Reducer.Component
        initialState={this.initialState}
        reducer={this.reducer}
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
  }
}

export default Counter;
