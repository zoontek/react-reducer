// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Reducer, checkExhaustiveness } from 'react-reducer';

type State = {|
  count: number,
|};

type Action =
  | {| type: 'increment', step: number |}
  | {| type: 'decrement', step: number |}
  | {| type: 'reset' |};

class Counter extends React.Component<{}> {
  initialState = {
    count: 0,
  };

  reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'increment':
        return { ...state, count: state.count + action.step };
      case 'decrement':
        return { ...state, count: state.count - action.step };
      case 'reset':
        return { ...state, count: this.initialState.count };

      default:
        checkExhaustiveness(action);
        return state;
    }
  };

  render() {
    return (
      <Reducer
        initialState={this.initialState}
        reducer={this.reducer}
        render={({ state, send }) => (
          <React.Fragment>
            <h2>Count: {state.count}</h2>

            <div>
              <button onClick={() => send({ type: 'decrement', step: 1 })}>
                -
              </button>

              <button onClick={() => send({ type: 'increment', step: 1 })}>
                +
              </button>

              <button onClick={() => send({ type: 'reset' })}>Reset</button>
            </div>
          </React.Fragment>
        )}
      />
    );
  }
}

const root = document.getElementById('root');
root && ReactDOM.render(<Counter />, root);
